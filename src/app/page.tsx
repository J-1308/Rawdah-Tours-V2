import type { Metadata } from 'next'
import { PhotoSlot } from '@/components/photo'
import { GallerySection, JourneyArc, PeopleSection, RegisterSection, WhereThingsStand } from '@/components/sections'
import { ButtonLink, Container, TextLink, WhatsAppButton } from '@/components/ui'
import { PEOPLE } from '@/lib/people'
import { PHOTOS } from '@/lib/photos'
import { COMPANY, CONTACT, SITE_URL, WHATSAPP_MESSAGES } from '@/lib/site'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Rawdah Tours',
  legalName: COMPANY.legalName,
  url: SITE_URL,
  telephone: CONTACT.phoneDisplay,
  email: CONTACT.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '5 Sir Denis Drive',
    addressLocality: 'Birmingham',
    postalCode: 'B9 5DU',
    addressCountry: 'GB',
  },
  sameAs: [CONTACT.instagramUrl],
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero: daylight, their own people, the two actions, and an honest status line */}
      <section aria-labelledby="hero-title">
        <Container className="grid gap-9 pb-[var(--section-y)] pt-0 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-14">
          <figure className="-mx-[var(--gutter)] lg:order-2 lg:col-span-7 lg:mx-0 lg:-mr-[var(--gutter)]">
            <div className="aspect-[4/3]">
              <PhotoSlot photo={PHOTOS.homeHero} priority sizes="(min-width: 1024px) 60vw, 100vw" />
            </div>
            <figcaption className="mt-3 px-[var(--gutter)] text-sm text-dust lg:px-0">A Rawdah group in ihram, before Umrah.</figcaption>
          </figure>

          <div className="lg:order-1 lg:col-span-5">
            <h1 id="hero-title" className="font-serif text-[clamp(2.75rem,1.55rem+4.7vw,5.5rem)] font-normal leading-[1.02] tracking-[-0.015em]">
              Umrah and Hajj, with people who know the way.
            </h1>
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-dust sm:text-xl">
              Rawdah Tours takes groups from the UK to Madinah and Makkah. Students of knowledge teach along the way, and a group leader looks after you from
              your first message to the flight home.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#register">Register interest</ButtonLink>
              <WhatsAppButton message={WHATSAPP_MESSAGES.general} />
            </div>
            <ul className="mt-10 grid gap-5 border-t border-ajwa/15 pt-6 sm:grid-cols-2">
              <li className="flex gap-3">
                <span className="mark-confirmed" />
                <span>
                  <span className="block font-semibold">Hajj 2027</span>
                  <span className="text-dust">Registering interest now</span>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mark-pending" />
                <span>
                  <span className="block font-semibold">Umrah</span>
                  <span className="text-dust">Next dates being finalised</span>
                </span>
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* The two journeys */}
      <section aria-label="Our journeys" className="pb-[var(--section-y)]">
        <Container className="grid gap-16 md:grid-cols-2 md:gap-10 lg:gap-16">
          <article>
            <div className="aspect-[4/3]">
              <PhotoSlot photo={PHOTOS.homeHajj} sizes="(min-width: 768px) 46vw, 100vw" className="rounded-[3px]" />
            </div>
            <p className="mt-6 flex items-center gap-2.5 text-sm font-semibold text-palm">
              <span className="mark-confirmed !mt-0" /> Registering interest now
            </p>
            <h2 className="mt-3 font-serif text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] leading-none">Hajj 2027</h2>
            <p className="mt-4 max-w-[30rem] text-lg leading-relaxed text-dust">
              Hajj packages are booked and paid on Nusuk, the official Saudi platform. We help you choose one, prepare you for the rites, and travel with you
              as a group.
            </p>
            <TextLink href="/hajj" className="mt-6">
              Hajj 2027 with Rawdah
            </TextLink>
          </article>

          <article className="md:mt-28">
            <div className="aspect-[4/3]">
              <PhotoSlot photo={PHOTOS.homeUmrah} sizes="(min-width: 768px) 46vw, 100vw" className="rounded-[3px]" />
            </div>
            <p className="mt-6 flex items-center gap-2.5 text-sm font-semibold text-henna">
              <span className="mark-pending !mt-0" /> Next dates being finalised
            </p>
            <h2 className="mt-3 font-serif text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] leading-none">Umrah</h2>
            <p className="mt-4 max-w-[30rem] text-lg leading-relaxed text-dust">
              Our last group travelled in August 2026: five nights in Madinah and five in Makkah, with lessons throughout. Dates for the next trip are being
              finalised.
            </p>
            <TextLink href="/umrah" className="mt-6">
              Umrah with Rawdah
            </TextLink>
          </article>
        </Container>
      </section>

      {/* What Rawdah means, and the three things every trip is built on */}
      <section aria-labelledby="meaning-title" className="border-t border-ajwa/10 py-[var(--section-y)]">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="aspect-square lg:col-span-5">
            <PhotoSlot photo={PHOTOS.meaning} sizes="(min-width: 1024px) 40vw, 100vw" className="rounded-[3px]" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p lang="ar" aria-hidden className="ar text-left text-[clamp(4.5rem,3rem+6vw,8.5rem)] leading-[1] text-brass">
              روضة
            </p>
            <h2 id="meaning-title" className="mt-6 font-serif text-[clamp(2rem,1.35rem+2.6vw,3.5rem)] leading-[1.06]">
              Rawdah means garden
            </h2>
            <div className="prose-serif mt-6 max-w-[34rem]">
              <p>
                In the Prophet’s Mosque in Madinah, the space between his house and his minbar is called al-Rawdah. The Prophet ﷺ described it as a garden from
                the gardens of Paradise.
              </p>
              <p>That’s the spirit we try to travel in.</p>
            </div>
            <p className="mt-4 text-sm text-dust">The hadith is reported by al-Bukhari and Muslim.</p>
          </div>
        </Container>

        <Container>
          <ul className="mt-20 grid gap-10 border-t border-ajwa/15 pt-10 md:grid-cols-3 md:gap-12">
            <li>
              <h3 className="font-serif text-[1.75rem] leading-tight">Worship first</h3>
              <p className="mt-3 leading-relaxed text-dust">Days are shaped around the prayers and time in the two Harams, and everything else fits around them.</p>
            </li>
            <li>
              <h3 className="font-serif text-[1.75rem] leading-tight">Learning throughout</h3>
              <p className="mt-3 leading-relaxed text-dust">
                Students of knowledge travel with the group: lessons on the seerah in Madinah, and the rites explained step by step in Makkah.
              </p>
            </li>
            <li>
              <h3 className="font-serif text-[1.75rem] leading-tight">Good company</h3>
              <p className="mt-3 leading-relaxed text-dust">You travel as one group, with a group leader and guides beside you. Nobody walks the journey alone.</p>
            </li>
          </ul>
        </Container>
      </section>

      <JourneyArc footer={<TextLink href="/umrah" tone="light">How our Umrah trips work</TextLink>} />

      <PeopleSection
        people={PEOPLE}
        title="The people you’ll travel with"
        intro={
          <p>
            Brother Ayuub leads Hajj 2027 with Ustadh Abu Abdulaziz Ahmed as guide. Ustadh Issa and Ustadh Abdulrahman guided our last Umrah. Who leads each
            trip is confirmed when it’s announced.
          </p>
        }
      />

      <GallerySection />

      <WhereThingsStand
        columns={[
          {
            title: 'Hajj 2027',
            items: [
              { state: 'confirmed', text: 'Registration of interest is open.' },
              { state: 'confirmed', text: 'Packages are booked and paid on Nusuk, not with Rawdah.' },
              { state: 'confirmed', text: 'Brother Ayuub Mohamed Musa leads the group; Ustadh Abu Abdulaziz Ahmed is the Hajj guide.' },
              { state: 'pending', text: 'Dates and length of the trip.' },
              { state: 'pending', text: 'Packages, prices and hotels, which will be published on Nusuk.' },
            ],
          },
          {
            title: 'Umrah',
            items: [
              { state: 'confirmed', text: 'Our last trip, Path of Purity II, ran from 4 to 15 August 2026.' },
              { state: 'confirmed', text: 'Places are reserved with a deposit, paid by card or bank transfer.' },
              { state: 'pending', text: 'Dates for the next group.' },
              { state: 'pending', text: 'Hotels, flights and prices for the next trip.' },
            ],
          },
        ]}
      />

      <RegisterSection page="/" />
    </>
  )
}
