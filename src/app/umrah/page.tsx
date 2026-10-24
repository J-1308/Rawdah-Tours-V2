import type { Metadata } from 'next'
import Link from 'next/link'
import { FaqSection, JourneyArc, PageHero, PeopleSection, RegisterSection, StepsSection } from '@/components/sections'
import { ButtonLink, Container, SectionHeading, TextLink, WhatsAppButton } from '@/components/ui'
import { UMRAH_FAQS } from '@/lib/faqs'
import { peopleFor } from '@/lib/people'
import { PHOTOS } from '@/lib/photos'
import { WHATSAPP_MESSAGES } from '@/lib/site'
import {
  DEMO_TRIP_SLUG,
  bookingDemoEnabled,
  formatDateRange,
  formatPence,
  getTrip,
  lastCompletedUmrah,
  lowestPrice,
  openUmrahTrips,
  type Trip,
} from '@/lib/trips'

export const metadata: Metadata = {
  title: 'Umrah',
  description:
    'Guided Umrah from the UK with Rawdah Tours: five nights in Madinah, five in Makkah, with students of knowledge and a group that looks after each other. Register for the next trip.',
  alternates: { canonical: '/umrah' },
}

function OpenTrip({ trip, demo = false }: { trip: Trip; demo?: boolean }) {
  const from = lowestPrice(trip)
  return (
    <article className="grid gap-6 rounded-[4px] border border-ajwa/15 bg-ihram p-6 sm:p-8 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-8">
        {demo ? (
          <p className="mb-4 inline-block rounded-sm bg-henna/10 px-2.5 py-1 text-sm font-semibold text-henna">
            Preview only: this shows how booking works, using the August 2026 trip. It can’t be booked on the live site.
          </p>
        ) : (
          <p className="mb-3 flex items-center gap-2.5 text-sm font-semibold text-palm">
            <span className="mark-confirmed !mt-0" /> Booking open
          </p>
        )}
        <h3 className="font-serif text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] leading-tight">{trip.name}</h3>
        <p className="mt-2 text-lg text-dust">
          {formatDateRange(trip.startDate, trip.endDate)}
          {from ? <>, from {formatPence(from)} per person</> : null}
        </p>
      </div>
      <div className="lg:col-span-4 lg:text-right">
        <ButtonLink href={`/umrah/book/${trip.slug}`}>Reserve your place</ButtonLink>
      </div>
    </article>
  )
}

export default function UmrahPage() {
  const open = openUmrahTrips()
  const last = lastCompletedUmrah()
  const demoTrip = bookingDemoEnabled() ? getTrip(DEMO_TRIP_SLUG) : undefined

  return (
    <>
      <PageHero
        eyebrow={
          open.length ? (
            <span className="inline-flex items-center gap-2.5">
              <span className="mark-confirmed !mt-0" /> Booking open
            </span>
          ) : (
            <span className="inline-flex items-center gap-2.5 text-henna">
              <span className="mark-pending !mt-0" /> Next dates being finalised
            </span>
          )
        }
        title="Umrah, guided step by step."
        intro={
          <p>
            Five nights in Madinah, five in Makkah, with students of knowledge teaching along the way and a group leader looking after you throughout.
            {open.length ? '' : ' Dates for our next trip are being finalised.'}
          </p>
        }
        actions={
          <>
            <ButtonLink href={open.length ? '#trips' : '#register'}>{open.length ? 'See open trips' : 'Register interest'}</ButtonLink>
            <WhatsAppButton message={WHATSAPP_MESSAGES.umrah} />
          </>
        }
        photo={PHOTOS.umrahHero}
        photoCaption="Before Umrah, in ihram."
      />

      {open.length || demoTrip ? (
        <section id="trips" aria-labelledby="trips-title" className="scroll-mt-4 bg-sand-soft py-[var(--section-y)]">
          <Container>
            <SectionHeading id="trips-title" title={open.length ? 'Open for booking' : 'Booking'} />
            <div className="mt-10 space-y-6">
              {open.map((t) => (
                <OpenTrip key={t.slug} trip={t} />
              ))}
              {!open.length && demoTrip ? <OpenTrip trip={demoTrip} demo /> : null}
            </div>
          </Container>
        </section>
      ) : null}

      {last ? (
        <section aria-labelledby="last-title" className="py-[var(--section-y)]">
          <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <SectionHeading
                id="last-title"
                title="Our last Umrah"
                intro={
                  <p>
                    {last.name}, {formatDateRange(last.startDate, last.endDate)}. The next trip’s hotels, flights and prices will be confirmed when it’s
                    announced.
                  </p>
                }
              />
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <dl className="grid gap-x-8 sm:grid-cols-2">
                <div className="border-t border-ajwa/15 py-5">
                  <dt className="text-sm font-semibold text-dust">Dates</dt>
                  <dd className="mt-1 font-serif text-[1.5rem] leading-tight">{formatDateRange(last.startDate, last.endDate)}</dd>
                </div>
                {last.flights ? (
                  <div className="border-t border-ajwa/15 py-5">
                    <dt className="text-sm font-semibold text-dust">Flights</dt>
                    <dd className="mt-1 font-serif text-[1.5rem] leading-tight">{last.flights}</dd>
                  </div>
                ) : null}
                {last.stays?.map((s) => (
                  <div key={s.city} className="border-t border-ajwa/15 py-5">
                    <dt className="text-sm font-semibold text-dust">
                      {s.city}, {s.nights} nights
                    </dt>
                    <dd className="mt-1 font-serif text-[1.5rem] leading-tight">{s.hotel}</dd>
                    {s.note ? <dd className="mt-1 text-dust">{s.note}</dd> : null}
                  </div>
                ))}
              </dl>
              {last.inclusions ? (
                <>
                  <h3 className="mt-12 font-serif text-[1.75rem] leading-tight">What was included</h3>
                  <ul className="mt-5 space-y-3 text-[1.0625rem]">
                    {last.inclusions.map((item) => (
                      <li key={item} className="flex gap-4">
                        <span aria-hidden className="mt-[0.75em] h-px w-5 shrink-0 bg-brass" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          </Container>
        </section>
      ) : null}

      <JourneyArc />

      <StepsSection
        title="How booking works"
        intro={<p>When a trip opens, this is how you reserve a place.</p>}
        steps={[
          {
            title: 'Choose your trip and room',
            text: 'Pick a room type: sharing between four, three or two people. Solo travellers share with travellers of the same gender.',
          },
          {
            title: 'Reserve with a deposit',
            text: 'Pay online by card (a small card fee applies) or by bank transfer with no fee. On our last trip the deposit was £500.',
          },
          { title: 'Pay the balance in instalments', text: 'The rest is paid in instalments, with everything settled before departure. We send you the schedule.' },
          { title: 'Get ready together', text: 'Packing list, visa support and preparation for the rites, so you arrive ready.' },
        ]}
        footer={
          <p className="text-dust">
            Booking for a family or a group? <Link href="#register" className="font-semibold text-palm underline underline-offset-4">Register interest</Link> with the
            number of travellers and we’ll arrange it with you.
          </p>
        }
      />

      <section aria-label="Booking protection" className="pb-[var(--section-y)]">
        <Container>
          <div className="grid gap-4 border-t border-ajwa/15 pt-8 text-dust lg:grid-cols-12 lg:gap-10">
            <p className="font-semibold text-ajwa lg:col-span-4">Booking with confidence</p>
            <p className="lg:col-span-7 lg:col-start-6">
              On our last trip, flights and accommodation were arranged through ATOL-approved suppliers, with ATOL protection (no. 5311) provided by Polani
              Travel Ltd. Each trip’s protection is set out when you book. <TextLink href="/terms">Read our terms</TextLink>
            </p>
          </div>
        </Container>
      </section>

      <PeopleSection people={peopleFor('umrah')} title="Who leads our Umrah trips" intro={<p>Brother Ayuub leads the group. These teachers guided our last Umrah.</p>} />

      <FaqSection faqs={UMRAH_FAQS} title="Umrah questions" />

      <RegisterSection
        journey="umrah"
        page="/umrah"
        title="Register for the next Umrah"
        intro={<p>Tell us you’re interested and we’ll let you know as soon as the next dates are announced. It doesn’t commit you to anything.</p>}
      />
    </>
  )
}
