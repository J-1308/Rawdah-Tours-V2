import type { Metadata } from 'next'
import { NoticePage } from '@/components/notice-page'
import { WhatsAppButton } from '@/components/ui'
import { bankDetails } from '@/lib/server/config'
import { getSupabase } from '@/lib/server/supabase'
import { WHATSAPP_MESSAGES } from '@/lib/site'
import { formatPence } from '@/lib/trips'

export const metadata: Metadata = { title: 'Complete your bank transfer', robots: { index: false } }

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export default async function BankTransferPage({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const { ref } = await searchParams
  const bank = bankDetails()
  const supabase = getSupabase()

  let booking: { id: string; trip_name: string; deposit_pence: number; full_name: string } | null = null
  if (ref && UUID_RE.test(ref) && supabase) {
    const { data } = await supabase.from('bookings').select('id, trip_name, deposit_pence, full_name').eq('id', ref).maybeSingle()
    booking = data
  }

  return (
    <NoticePage
      title="Complete your deposit by bank transfer"
      status={
        <span className="inline-flex items-center gap-2.5 text-ink">
          <span className="size-2 rounded-full border border-gold" /> Waiting for your transfer
        </span>
      }
    >
      {booking ? (
        <p>
          Thank you, {booking.full_name.split(' ')[0]}. To reserve your place on {booking.trip_name}, transfer the deposit using these details. We’ve emailed
          them to you as well.
        </p>
      ) : (
        <p>Transfer the deposit using the details we’ve emailed you.</p>
      )}

      {bank && booking ? (
        <dl className="divide-y divide-ink/10 rounded-xl bg-canvas-warm px-5 text-ink">
          {[
            ['Amount', formatPence(booking.deposit_pence)],
            ['Account name', bank.accountName],
            ['Sort code', bank.sortCode],
            ['Account number', bank.accountNumber],
            ['Reference', booking.id.slice(0, 8).toUpperCase()],
          ].map(([k, val]) => (
            <div key={k} className="flex justify-between gap-6 py-3.5">
              <dt className="text-ink/68">{k}</dt>
              <dd className="text-right font-medium">{val}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <p>Use the reference so we can match your payment. Your place is reserved once we’ve received it and confirmed by email.</p>
      <div className="pt-2">
        <WhatsAppButton message={WHATSAPP_MESSAGES.booking} variant="outline" label="Questions? Message us" />
      </div>
    </NoticePage>
  )
}
