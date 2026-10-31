'use server'

import { redirect } from 'next/navigation'
import type { BookingErrors, BookingState, BookingValues } from '@/lib/booking'
import { bankDetails, configured, siteOrigin } from '@/lib/server/config'
import { getSupabase } from '@/lib/server/supabase'
import { getStripe } from '@/lib/server/stripe'
import { sendBankTransferInstructions, sendBookingToOwner, type BookingEmail } from '@/lib/server/email'
import { formatDateRange, formatPence, getRoom, getTrip, isBookable } from '@/lib/trips'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function read(formData: FormData): BookingValues {
  const s = (k: string) => String(formData.get(k) ?? '').trim()
  return {
    roomId: s('roomId'),
    fullName: s('fullName').slice(0, 120),
    email: s('email').toLowerCase().slice(0, 200),
    phone: s('phone').slice(0, 40),
    gender: s('gender'),
    age: s('age'),
    citizenship: s('citizenship').slice(0, 80),
    emergencyContactName: s('emergencyContactName').slice(0, 120),
    emergencyContactPhone: s('emergencyContactPhone').slice(0, 40),
    medicalInfo: s('medicalInfo').slice(0, 2000),
    paymentMethod: s('paymentMethod') === 'bank_transfer' ? 'bank_transfer' : 'card',
    accurate: formData.get('accurate') === 'on',
    terms: formData.get('terms') === 'on',
  }
}

function validate(v: BookingValues, roomIds: string[]): BookingErrors {
  const e: BookingErrors = {}
  if (!roomIds.includes(v.roomId)) e.roomId = 'Choose a room type.'
  if (v.fullName.length < 2) e.fullName = 'Enter your full name as it appears on your passport.'
  if (!EMAIL_RE.test(v.email)) e.email = 'Enter an email address like name@example.com.'
  const digits = v.phone.replace(/\D/g, '')
  if (digits.length < 7 || digits.length > 15) e.phone = 'Enter a phone number, with the country code if you’re outside the UK.'
  if (v.gender !== 'male' && v.gender !== 'female') e.gender = 'Choose male or female, so we can arrange rooms.'
  const age = Number(v.age)
  if (!Number.isInteger(age) || age < 18 || age > 100) e.age = 'Online booking is for travellers aged 18 and over. For younger travellers, register a family request instead.'
  if (v.citizenship.length < 2) e.citizenship = 'Enter your citizenship, as shown on your passport.'
  if (v.emergencyContactName.length < 2) e.emergencyContactName = 'Enter the name of someone we can contact in an emergency.'
  const ecDigits = v.emergencyContactPhone.replace(/\D/g, '')
  if (ecDigits.length < 7 || ecDigits.length > 15) e.emergencyContactPhone = 'Enter your emergency contact’s phone number.'
  if (!v.accurate) e.accurate = 'Confirm your details are accurate.'
  if (!v.terms) e.terms = 'Accept the terms and privacy policy to book.'
  return e
}

export async function createBooking(tripSlug: string, prev: BookingState, formData: FormData): Promise<BookingState> {
  const key = prev.key + 1
  const values = read(formData)
  const trip = getTrip(tripSlug)

  if (!trip || !trip.pricing || !isBookable(trip)) {
    return { status: 'blocked', key, values, message: 'This trip isn’t open for booking. Message us on WhatsApp and we’ll help.' }
  }

  const errors = validate(
    values,
    trip.pricing.rooms.map((r) => r.id),
  )
  if (Object.keys(errors).length) return { status: 'invalid', key, errors, values }

  const supabase = getSupabase()
  const paymentReady = values.paymentMethod === 'card' ? configured.stripe() : configured.bank()
  if (!supabase || !paymentReady) {
    return {
      status: 'unavailable',
      key,
      values,
      message:
        values.paymentMethod === 'card'
          ? 'Card payments aren’t connected on this version of the site yet. Message us on WhatsApp and we’ll reserve your place with you.'
          : 'Bank transfer booking isn’t connected on this version of the site yet. Message us on WhatsApp and we’ll reserve your place with you.',
    }
  }

  const room = getRoom(trip, values.roomId)!
  const { depositPence, cardFeePence } = trip.pricing
  const totalPence = room.pricePence
  const balancePence = totalPence - depositPence

  // Capacity: count confirmed places plus bank transfers we're waiting on.
  if (trip.capacity) {
    const { count, error } = await supabase
      .from('bookings')
      .select('id', { count: 'exact', head: true })
      .eq('trip_slug', trip.slug)
      .or('payment_status.eq.deposit_paid,and(payment_method.eq.bank_transfer,payment_status.eq.pending)')
    if (error) console.error('[booking] capacity check failed:', error.message)
    if ((count ?? 0) >= trip.capacity) {
      return { status: 'blocked', key, values, message: 'This trip is now full. Register your interest and we’ll tell you about the next one.' }
    }
  }

  // Duplicate check: the same person (email and name) already holding a place on this trip.
  // Abandoned card checkouts don't count; they expire automatically.
  const { data: existing } = await supabase
    .from('bookings')
    .select('id, full_name')
    .eq('trip_slug', trip.slug)
    .eq('email', values.email)
    .or('payment_status.eq.deposit_paid,and(payment_method.eq.bank_transfer,payment_status.eq.pending)')
  if (existing?.some((b) => String(b.full_name).trim().toLowerCase() === values.fullName.toLowerCase())) {
    return {
      status: 'blocked',
      key,
      values,
      message: 'You already have a booking for this trip under this name and email. If you think that’s wrong, message us on WhatsApp.',
    }
  }

  const { data: booking, error: insertError } = await supabase
    .from('bookings')
    .insert({
      trip_slug: trip.slug,
      trip_name: trip.name,
      room_id: room.id,
      room_label: room.label,
      full_name: values.fullName,
      email: values.email,
      phone: values.phone,
      gender: values.gender,
      citizenship: values.citizenship,
      age: Number(values.age),
      emergency_contact_name: values.emergencyContactName,
      emergency_contact_phone: values.emergencyContactPhone,
      medical_info: values.medicalInfo || null,
      total_pence: totalPence,
      deposit_pence: depositPence,
      card_fee_pence: values.paymentMethod === 'card' ? cardFeePence : 0,
      balance_pence: balancePence,
      payment_method: values.paymentMethod,
      terms_accepted_at: new Date().toISOString(),
      privacy_accepted_at: new Date().toISOString(),
    })
    .select('id')
    .single()

  if (insertError || !booking) {
    console.error('[booking] insert failed:', insertError?.message)
    return { status: 'unavailable', key, values, message: 'We couldn’t save your booking just now. Try again, or message us on WhatsApp.' }
  }

  const emailData: BookingEmail = {
    bookingId: booking.id,
    tripName: trip.name,
    tripDates: formatDateRange(trip.startDate, trip.endDate),
    fullName: values.fullName,
    email: values.email,
    phone: values.phone,
    gender: values.gender,
    age: Number(values.age),
    citizenship: values.citizenship,
    roomLabel: room.label,
    totalPence,
    depositPence,
    balancePence,
    balancePlan: trip.pricing.balancePlan,
    paymentMethod: values.paymentMethod,
    emergencyContact: `${values.emergencyContactName}, ${values.emergencyContactPhone}`,
    medicalInfo: values.medicalInfo || null,
  }

  if (values.paymentMethod === 'bank_transfer') {
    await Promise.allSettled([sendBankTransferInstructions(emailData, bankDetails()!), sendBookingToOwner(emailData, 'awaiting-transfer')])
    redirect(`/booking/bank-transfer?ref=${booking.id}`)
  }

  const stripe = getStripe()!
  const origin = siteOrigin()
  let checkoutUrl: string | null = null
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: values.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'gbp',
            unit_amount: depositPence + cardFeePence,
            product_data: {
              name: `Deposit: ${trip.name}`,
              description: `${room.label}. ${formatPence(depositPence)} deposit + ${formatPence(cardFeePence)} card fee.`,
            },
          },
        },
      ],
      metadata: { bookingId: booking.id, tripSlug: trip.slug },
      payment_intent_data: { metadata: { bookingId: booking.id, tripSlug: trip.slug } },
      // Unpaid sessions expire after 30 minutes; the webhook then releases the booking.
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
      success_url: `${origin}/booking/confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/booking/cancelled?trip=${trip.slug}`,
    })
    checkoutUrl = session.url
    await supabase.from('bookings').update({ stripe_session_id: session.id }).eq('id', booking.id)
  } catch (err) {
    console.error('[booking] Stripe session failed:', err)
  }

  if (!checkoutUrl) {
    await supabase.from('bookings').update({ payment_status: 'failed', booking_status: 'cancelled' }).eq('id', booking.id)
    return { status: 'unavailable', key, values, message: 'We couldn’t start the card payment. Try again, choose bank transfer, or message us on WhatsApp.' }
  }

  redirect(checkoutUrl)
}
