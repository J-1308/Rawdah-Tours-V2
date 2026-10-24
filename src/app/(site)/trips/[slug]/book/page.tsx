import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createBooking } from '@/app/actions/booking'
import { Container } from '@/components/ui'
import { formatDateRange, formatPence, getTrip, isBookable, isDemoBooking } from '@/lib/trips'
import { BookingForm } from './booking-form'

export const metadata: Metadata = {
  title: 'Book your place',
  robots: { index: false },
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const trip = getTrip(slug)
  if (!trip || !trip.pricing || !isBookable(trip)) notFound()

  const demo = isDemoBooking(trip)
  const { depositPence, cardFeePence, rooms, balancePlan } = trip.pricing

  return (
    <Container className="bg-canvas pb-[clamp(4rem,8vw,7rem)] pt-10 lg:pt-14">
      <p className="text-[0.9375rem]">
        <Link href={`/trips/${trip.slug}`} className="font-medium text-ink underline underline-offset-4">
          {trip.name}
        </Link>
        <span className="text-ink/65"> / Book your place</span>
      </p>

      {demo ? (
        <div className="mt-6 rounded-[3px] border border-dashed border-bronze/60 bg-canvas-warm p-4 text-[0.9375rem]">
          <strong>Preview only.</strong> This walks through booking using the August 2026 trip, which has already run. It isn’t available on the live site,
          and no payment is taken unless Stripe test keys are connected.
        </div>
      ) : null}

      <div className="mt-8 grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h1 className="display text-[clamp(2.4rem,1.6rem+3vw,4rem)]">Book your place</h1>
          <p className="mt-4 max-w-[36rem] text-lg text-ink/65">
            {trip.name}, {formatDateRange(trip.startDate, trip.endDate)}. Booking takes about five minutes. You’ll need your passport details to hand.
          </p>
          <div className="mt-10">
            <BookingForm
              action={createBooking.bind(null, trip.slug)}
              rooms={rooms.map((r) => ({ id: r.id, label: r.label, occupancy: r.occupancy, price: formatPence(r.pricePence) }))}
              deposit={formatPence(depositPence)}
              cardFee={formatPence(cardFeePence)}
              depositWithFee={formatPence(depositPence + cardFeePence)}
            />
          </div>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="rounded-[3px] border-2 border-ink bg-canvas p-6 shadow-[6px_6px_0_var(--color-gold-soft)] lg:sticky lg:top-28">
            <h2 className="display text-[1.75rem]">{trip.name}</h2>
            <p className="mt-1 text-ink/65">{formatDateRange(trip.startDate, trip.endDate)}</p>
            <dl className="mt-6 space-y-3 text-[0.9375rem]">
              {rooms.map((r) => (
                <div key={r.id} className="flex justify-between gap-4 border-b border-ink/10 pb-3">
                  <dt>{r.label}</dt>
                  <dd className="font-medium">{formatPence(r.pricePence)}</dd>
                </div>
              ))}
              <div className="flex justify-between gap-4 border-b border-ink/10 pb-3">
                <dt>Deposit to reserve</dt>
                <dd className="font-medium">{formatPence(depositPence)}</dd>
              </div>
              <div className="flex justify-between gap-4 pb-1">
                <dt>Card fee</dt>
                <dd className="font-medium">{formatPence(cardFeePence)}</dd>
              </div>
            </dl>
            <h3 className="mt-8 font-medium">After your deposit</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink/65">{balancePlan}</p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink/65">
              You’ll get a confirmation email, then your payment schedule, packing list and visa steps.
            </p>
          </div>
        </aside>
      </div>
    </Container>
  )
}
