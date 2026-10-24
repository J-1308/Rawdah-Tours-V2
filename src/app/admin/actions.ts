'use server'

import { randomUUID } from 'node:crypto'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { isAdminRequest } from '@/lib/server/admin-auth'
import { getSupabase } from '@/lib/server/supabase'
import { sendDepositConfirmation } from '@/lib/server/email'
import { formatDateRange, getTrip } from '@/lib/trips'

/** Marks a bank-transfer deposit as received, confirms the booking and emails the traveller. */
export async function markTransferReceived(formData: FormData) {
  // Server actions are reachable directly, so check the login here too.
  if (!isAdminRequest((await headers()).get('authorization'))) throw new Error('Not authorised')

  const supabase = getSupabase()
  const id = String(formData.get('bookingId') ?? '')
  if (!supabase || !id) return

  const { data: b } = await supabase.from('bookings').select('*').eq('id', id).eq('payment_status', 'pending').eq('payment_method', 'bank_transfer').maybeSingle()
  if (!b) return

  const { error } = await supabase.from('payments').insert({
    booking_id: b.id,
    provider: 'manual',
    external_id: `manual-${randomUUID()}`,
    amount_pence: b.deposit_pence,
    note: 'Bank transfer marked as received in /admin',
  })
  if (error) throw new Error(error.message)

  await supabase.from('bookings').update({ payment_status: 'deposit_paid', booking_status: 'confirmed' }).eq('id', b.id)

  const trip = getTrip(b.trip_slug)
  await sendDepositConfirmation({
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
    paymentMethod: 'bank_transfer',
    emergencyContact: `${b.emergency_contact_name}, ${b.emergency_contact_phone}`,
    medicalInfo: b.medical_info,
  })

  revalidatePath('/admin')
}
