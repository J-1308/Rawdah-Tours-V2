import type { Metadata } from 'next'
import { NoticePage } from '@/components/notice-page'
import { ButtonLink, WhatsAppButton } from '@/components/ui'
import { WHATSAPP_MESSAGES } from '@/lib/site'
import { getTrip, isBookable } from '@/lib/trips'

export const metadata: Metadata = { title: 'Payment not completed', robots: { index: false } }

export default async function BookingCancelledPage({ searchParams }: { searchParams: Promise<{ trip?: string }> }) {
  const { trip: slug } = await searchParams
  const trip = slug ? getTrip(slug) : undefined
  const retry = trip && isBookable(trip) ? `/umrah/book/${trip.slug}` : '/umrah'

  return (
    <NoticePage title="Payment not completed">
      <p>You haven’t been charged, and your place hasn’t been reserved yet.</p>
      <p>You can try again, choose bank transfer instead, or message us and we’ll help you book.</p>
      <div className="flex flex-col gap-3 pt-4 sm:flex-row">
        <ButtonLink href={retry}>Try again</ButtonLink>
        <WhatsAppButton message={WHATSAPP_MESSAGES.booking} variant="outline" />
      </div>
    </NoticePage>
  )
}
