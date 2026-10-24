import type { Metadata } from 'next'
import { PageHero, PeopleSection, RegisterSection } from '@/components/sections'
import { ButtonLink, Container, SectionHeading, WhatsAppButton } from '@/components/ui'
import { PEOPLE } from '@/lib/people'
import { PHOTOS } from '@/lib/photos'
import { COMPANY, CONTACT, WHATSAPP_MESSAGES } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About us',
  description: 'Rawdah Tours is a UK company running guided Umrah trips with students of knowledge, and preparing a group for Hajj 2027.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Rawdah Tours"
        intro={
          <p>
            We’re a UK company that runs guided Umrah trips and is preparing a group for Hajj 2027. Every trip is built around worship, learning and good
            company.
          </p>
        }
        actions={
          <>
            <ButtonLink href="#register">Register interest</ButtonLink>
            <WhatsAppButton message={WHATSAPP_MESSAGES.general} />
          </>
        }
        photo={PHOTOS.aboutHero}
        photoCaption="A Rawdah group on ziyarah."
      />

      <section aria-labelledby="what-title" className="border-t border-ajwa/10 py-[var(--section-y)]">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <SectionHeading id="what-title" title="What we do" />
          </div>
          <div className="prose-serif max-w-[38rem] lg:col-span-7 lg:col-start-6">
            <p>
              We organise fully guided Umrah trips. Students of knowledge travel with the group from start to finish, not just on arrival and departure, and
              teach along the way: the seerah in Madinah, and the rites step by step in Makkah.
            </p>
            <p>We take care of the hotels, flights, visas and transfers, so you can give your attention to worship.</p>
            <p>
              For Hajj 2027, packages are booked through Nusuk, the official Saudi platform. Our part is to help you choose, prepare you before you travel, and
              be with the group throughout.
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="name-title" className="on-dark bg-ajwa py-[var(--section-y)] text-parchment">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-10">
          <p lang="ar" aria-hidden className="ar text-[clamp(5rem,3rem+9vw,10rem)] leading-none text-parchment/90 lg:col-span-5">
            روضة
          </p>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 id="name-title" className="font-serif text-[clamp(2rem,1.35rem+2.6vw,3.5rem)] leading-[1.06]">
              Why Rawdah
            </h2>
            <div className="prose-serif mt-6 text-parchment/90">
              <p>
                Rawdah means garden. In the Prophet’s Mosque in Madinah, the space between his house and his minbar is called al-Rawdah, and the Prophet ﷺ
                described it as a garden from the gardens of Paradise.
              </p>
            </div>
            <p className="mt-4 text-sm text-parchment-dim">The hadith is reported by al-Bukhari and Muslim.</p>
          </div>
        </Container>
      </section>

      <PeopleSection people={PEOPLE} title="The people behind the trips" />

      <section aria-labelledby="company-title" className="pb-[var(--section-y)]">
        <Container>
          <div className="grid gap-8 border-t border-ajwa/15 pt-10 lg:grid-cols-12 lg:gap-10">
            <h2 id="company-title" className="font-serif text-[1.75rem] leading-tight lg:col-span-4">
              Company details
            </h2>
            <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
              <div>
                <dt className="text-sm font-semibold text-dust">Company</dt>
                <dd className="mt-1">
                  {COMPANY.legalName}, registered in {COMPANY.registeredIn}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-dust">Registered address</dt>
                <dd className="mt-1">{COMPANY.address}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-dust">Phone and WhatsApp</dt>
                <dd className="mt-1">
                  <a href={CONTACT.phoneHref} className="underline underline-offset-4">
                    {CONTACT.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-dust">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${CONTACT.email}`} className="break-all underline underline-offset-4">
                    {CONTACT.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      <RegisterSection page="/about" />
    </>
  )
}
