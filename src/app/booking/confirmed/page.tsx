import type { Metadata } from 'next'
import { NoticePage } from '@/components/notice-page'
import { ButtonLink, WhatsAppButton } from '@/components/ui'
import { WHATSAPP_MESSAGES } from '@/lib/site'

export const metadata: Metadata = { title: 'Payment received', robots: { index: false } }

export default function BookingConfirmedPage() {
  return (
    <NoticePage
      title="Payment received"
      status={
        <span className="inline-flex items-center gap-2.5 text-palm">
          <span className="mark-confirmed !mt-0" /> Deposit paid
        </span>
      }
    >
      <p>Jazakum Allahu khayran. Your deposit has gone through and your place is reserved, in sha Allah.</p>
      <p>
        We’re sending a confirmation email now. If it hasn’t arrived in the next few minutes, check your spam folder, then message us and we’ll sort it.
      </p>
      <p>Next, we’ll send your payment schedule for the balance, along with preparation details and visa steps.</p>
      <div className="flex flex-col gap-3 pt-4 sm:flex-row">
        <ButtonLink href="/">Back to the homepage</ButtonLink>
        <WhatsAppButton message={WHATSAPP_MESSAGES.booking} variant="outline" />
      </div>
    </NoticePage>
  )
}
