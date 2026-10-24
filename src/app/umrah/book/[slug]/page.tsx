import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createBooking } from '@/app/actions/booking'
import { Container } from '@/components/ui'
import { formatDateRange, formatPence, getTrip, isBookable, isDemoBooking } from '@/lib/trips'
import { BookingForm } from './booking-form'

export const metadata: Metadata = {
  title: 'Reserve your place',
  robots: { index: false },
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const trip = getTrip(slug)
  if (!trip || !trip.pricing || !isBookable(trip)) notFound()

  const demo = isDemoBooking(trip)
  const { depositPence, cardFeePence, rooms, balancePlan } = trip.pricing

  return (
    <Container className="pb-[var(--section-y)] pt-10 lg:pt-14">
      <p className="text-[0.9375rem]">
        <Link href="/umrah" className="font-semibold text-palm underline underline-offset-4">
          Umrah
        </Link>
        <span className="text-dust"> / Reserve your place</span>
      </p>

      {demo ? (
        <div className="mt-6 rounded-md border border-henna/40 bg-henna/[0.06] p-4 text-[0.9375rem]">
          <strong>Preview only.</strong> This walks through booking using the August 2026 trip, which has already run. It isn’t available on the live site,
          and no payment is taken unless Stripe test keys are connected.
        </div>
      ) : null}

      <div className="mt-8 grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h1 className="font-serif text-[clamp(2.4rem,1.6rem+3vw,4rem)] leading-[1.04]">Reserve your place</h1>
          <p className="mt-4 max-w-[36rem] text-lg text-dust">
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
          <div className="rounded-[4px] bg-sand-soft p-6 lg:sticky lg:top-6">
            <h2 className="font-serif text-[1.75rem] leading-tight">{trip.name}</h2>
            <p className="mt-1 text-dust">{formatDateRange(trip.startDate, trip.endDate)}</p>
            <dl className="mt-6 space-y-3 text-[0.9375rem]">
              {rooms.map((r) => (
                <div key={r.id} className="flex justify-between gap-4 border-b border-ajwa/10 pb-3">
                  <dt>{r.label}</dt>
                  <dd className="font-semibold">{formatPence(r.pricePence)}</dd>
                </div>
              ))}
              <div className="flex justify-between gap-4 border-b border-ajwa/10 pb-3">
                <dt>Deposit to reserve</dt>
                <dd className="font-semibold">{formatPence(depositPence)}</dd>
              </div>
              <div className="flex justify-between gap-4 pb-1">
                <dt>Card fee</dt>
                <dd className="font-semibold">{formatPence(cardFeePence)}</dd>
              </div>
            </dl>
            <h3 className="mt-8 font-semibold">After your deposit</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-dust">{balancePlan}</p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-dust">
              You’ll get a confirmation email, then your payment schedule, packing list and visa steps.
            </p>
          </div>
        </aside>
      </div>
    </Container>
  )
}
