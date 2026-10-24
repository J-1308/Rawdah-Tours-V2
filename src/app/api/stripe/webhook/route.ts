import type Stripe from 'stripe'
import { configured } from '@/lib/server/config'
import { getStripe } from '@/lib/server/stripe'
import { getSupabase } from '@/lib/server/supabase'
import { sendBookingToOwner, sendDepositConfirmation, type BookingEmail } from '@/lib/server/email'
import { formatDateRange, getTrip } from '@/lib/trips'

// Stripe calls this after checkout. Handles:
//   checkout.session.completed  deposit paid: confirm the booking and email both sides (once)
//   checkout.session.expired    abandoned checkout: release the booking so the person can try again

export async function POST(req: Request) {
  const stripe = getStripe()
  const supabase = getSupabase()
  if (!stripe || !supabase || !configured.stripeWebhook()) {
    return Response.json({ error: 'Webhook not configured.' }, { status: 503 })
  }

  const signature = req.headers.get('stripe-signature')
  if (!signature) return Response.json({ error: 'Missing signature.' }, { status: 400 })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(await req.text(), signature, process.env.STRIPE_WEBHOOK_SECRET as string)
  } catch (err) {
    console.error('[webhook] signature verification failed:', err)
    return Response.json({ error: 'Invalid signature.' }, { status: 400 })
  }

  if (event.type === 'checkout.session.expired') {
    const session = event.data.object as Stripe.Checkout.Session
    const bookingId = session.metadata?.bookingId
    if (bookingId) {
      await supabase
        .from('bookings')
        .update({ payment_status: 'expired', booking_status: 'cancelled' })
        .eq('id', bookingId)
        .eq('payment_status', 'pending')
    }
    return Response.json({ received: true })
  }

  if (event.type !== 'checkout.session.completed') return Response.json({ received: true })

  const session = event.data.object as Stripe.Checkout.Session
  const bookingId = session.metadata?.bookingId
  if (!bookingId) {
    console.error('[webhook] no bookingId on session', session.id)
    return Response.json({ received: true })
  }
  if (session.payment_status !== 'paid') return Response.json({ received: true })

  // The payment row is the idempotency guard: its external_id is unique, so a
  // retried event fails here and nothing is sent twice.
  const { error: paymentError } = await supabase.from('payments').insert({
    booking_id: bookingId,
    provider: 'stripe',
    external_id: event.id,
    amount_pence: session.amount_total ?? 0,
    currency: session.currency ?? 'gbp',
    note: `Checkout session ${session.id}`,
  })
  if (paymentError) {
    if (paymentError.code === '23505') return Response.json({ received: true })
    console.error('[webhook] payment insert failed:', paymentError.message)
    return Response.json({ error: 'Could not record payment.' }, { status: 500 })
  }

  const { data: b, error: updateError } = await supabase
    .from('bookings')
    .update({
      payment_status: 'deposit_paid',
      booking_status: 'confirmed',
      stripe_payment_intent_id: typeof session.payment_intent === 'string' ? session.payment_intent : null,
    })
    .eq('id', bookingId)
    .select()
    .single()

  if (updateError || !b) {
    console.error('[webhook] booking update failed:', updateError?.message)
    return Response.json({ error: 'Could not update booking.' }, { status: 500 })
  }

  const trip = getTrip(b.trip_slug)
  const data: BookingEmail = {
    bookingId: b.id,
    tripName: b.trip_name,
    tripDates: trip ? formatDateRange(trip.startDate, trip.endDate) : '',
    fullName: b.full_name,
    email: b.email,
    phone: b.phone,
    gender: b.gender,
    age: b.age,
    citizenship: b.citizenship,
    roomLabel: b.room_label,
    totalPence: b.total_pence,
    depositPence: b.deposit_pence,
    balancePence: b.balance_pence,
    balancePlan: trip?.pricing?.balancePlan ?? '',
    paymentMethod: 'card',
    emergencyContact: `${b.emergency_contact_name}, ${b.emergency_contact_phone}`,
    medicalInfo: b.medical_info,
  }
  await Promise.allSettled([sendDepositConfirmation(data), sendBookingToOwner(data, 'deposit-paid')])

  return Response.json({ received: true })
}
