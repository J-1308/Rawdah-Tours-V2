import type { Metadata } from 'next'
import { connection } from 'next/server'
import { Container } from '@/components/ui'
import { getSupabase } from '@/lib/server/supabase'
import { formatPence } from '@/lib/trips'
import { markTransferReceived } from './actions'

export const metadata: Metadata = { title: 'Bookings', robots: { index: false, follow: false } }

const STATUS_LABEL: Record<string, string> = {
  pending: 'Awaiting payment',
  deposit_paid: 'Deposit paid',
  expired: 'Checkout abandoned',
  failed: 'Payment failed',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
}

function when(iso: string) {
  return new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London' })
}

export default async function AdminPage() {
  await connection()
  const supabase = getSupabase()
  if (!supabase) {
    return (
      <Container className="py-16">
        <h1 className="font-serif text-4xl">Bookings</h1>
        <p className="mt-4 text-dust">Supabase isn’t connected yet. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to see bookings here.</p>
      </Container>
    )
  }

  const [{ data: bookings }, { data: enquiries }] = await Promise.all([
    supabase
      .from('bookings')
      .select('id, created_at, trip_name, full_name, email, phone, room_label, payment_method, payment_status, deposit_pence')
      .order('created_at', { ascending: false })
      .limit(200),
    supabase.from('enquiries').select('id, created_at, journey, full_name, email, phone, travellers, travelling_from, message').order('created_at', { ascending: false }).limit(200),
  ])

  return (
    <Container className="py-12">
      <h1 className="font-serif text-4xl">Bookings</h1>
      <p className="mt-2 text-dust">Latest 200. Bank transfers stay “Awaiting payment” until you mark them received here.</p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[56rem] text-left text-[0.9375rem]">
          <thead className="border-b border-ajwa/20 text-sm text-dust">
            <tr>
              <th className="py-2 pr-4 font-semibold">Date</th>
              <th className="py-2 pr-4 font-semibold">Traveller</th>
              <th className="py-2 pr-4 font-semibold">Trip and room</th>
              <th className="py-2 pr-4 font-semibold">Payment</th>
              <th className="py-2 pr-4 font-semibold">Status</th>
              <th className="py-2 font-semibold">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {(bookings ?? []).map((b) => (
              <tr key={b.id} className="border-b border-ajwa/10 align-top">
                <td className="py-3 pr-4 whitespace-nowrap">{when(b.created_at)}</td>
                <td className="py-3 pr-4">
                  <span className="block font-semibold">{b.full_name}</span>
                  <span className="block text-dust">{b.email}</span>
                  <span className="block text-dust">{b.phone}</span>
                </td>
                <td className="py-3 pr-4">
                  {b.trip_name}
                  <span className="block text-dust">{b.room_label}</span>
                </td>
                <td className="py-3 pr-4">
                  {b.payment_method === 'card' ? 'Card' : 'Bank transfer'}
                  <span className="block text-dust">{formatPence(b.deposit_pence)} deposit</span>
                </td>
                <td className="py-3 pr-4">{STATUS_LABEL[b.payment_status] ?? b.payment_status}</td>
                <td className="py-3">
                  {b.payment_method === 'bank_transfer' && b.payment_status === 'pending' ? (
                    <form action={markTransferReceived}>
                      <input type="hidden" name="bookingId" value={b.id} />
                      <button className="rounded-md bg-palm px-3 py-2 text-sm font-semibold text-ihram hover:bg-palm-deep">Mark transfer received</button>
                    </form>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!bookings?.length ? <p className="py-6 text-dust">No bookings yet.</p> : null}
      </div>

      <h2 className="mt-16 font-serif text-3xl">Registered interest</h2>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[56rem] text-left text-[0.9375rem]">
          <thead className="border-b border-ajwa/20 text-sm text-dust">
            <tr>
              <th className="py-2 pr-4 font-semibold">Date</th>
              <th className="py-2 pr-4 font-semibold">Journey</th>
              <th className="py-2 pr-4 font-semibold">Name and contact</th>
              <th className="py-2 pr-4 font-semibold">Travellers</th>
              <th className="py-2 font-semibold">Message</th>
            </tr>
          </thead>
          <tbody>
            {(enquiries ?? []).map((e) => (
              <tr key={e.id} className="border-b border-ajwa/10 align-top">
                <td className="py-3 pr-4 whitespace-nowrap">{when(e.created_at)}</td>
                <td className="py-3 pr-4">{e.journey === 'hajj-2027' ? 'Hajj 2027' : e.journey === 'umrah' ? 'Umrah' : 'Not sure'}</td>
                <td className="py-3 pr-4">
                  <span className="block font-semibold">{e.full_name}</span>
                  <span className="block text-dust">{e.email}</span>
                  <span className="block text-dust">{e.phone}</span>
                </td>
                <td className="py-3 pr-4">
                  {e.travellers}
                  {e.travelling_from ? <span className="block text-dust">from {e.travelling_from}</span> : null}
                </td>
                <td className="max-w-[24rem] py-3 text-dust">{e.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!enquiries?.length ? <p className="py-6 text-dust">No registrations yet.</p> : null}
      </div>
    </Container>
  )
}
