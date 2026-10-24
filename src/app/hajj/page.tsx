import type { Metadata } from 'next'
import { PhotoSlot } from '@/components/photo'
import { FaqSection, PageHero, PeopleSection, RegisterSection, StepsSection, WhereThingsStand } from '@/components/sections'
import { ButtonLink, Container, SectionHeading, TextLink, WhatsAppButton } from '@/components/ui'
import { HAJJ_FAQS } from '@/lib/faqs'
import { peopleFor } from '@/lib/people'
import { PHOTOS } from '@/lib/photos'
import { NUSUK_HAJJ_URL, WHATSAPP_MESSAGES } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Hajj 2027',
  description:
    'Register your interest in Hajj 2027 with Rawdah Tours. Packages are booked and paid on Nusuk; we help you choose, prepare you for the rites, and travel with the group.',
  alternates: { canonical: '/hajj' },
}

const SUPPORT = [
  {
    title: 'Learning before you travel',
    text: 'Preparation before departure, so you understand the rites and reach them with confidence rather than uncertainty.',
  },
  {
    title: 'Help choosing a package',
    text: 'We talk through your priorities and help you compare suitable options on Nusuk. The choice is always yours.',
  },
  {
    title: 'Support throughout Hajj',
    text: 'The Rawdah team is with the group throughout, giving spiritual and practical support at each stage.',
  },
  {
    title: 'Travelling as a group',
    text: 'You go through Hajj alongside a group led by Brother Ayuub Mohamed Musa, with Ustadh Abu Abdulaziz Ahmed as guide.',
  },
]

const CHECK_ON_NUSUK = [
  'The price, and what the package includes and excludes',
  'Your eligibility, and which packages are open to you',
  'Accommodation, transport and other services',
  'Visa requirements',
  'Cancellation, refund and change terms',
  'Documents you’ll need, and the deadlines for them',
]

export default function HajjPage() {
  return (
    <>
      <PageHero
        eyebrow={
          <span className="inline-flex items-center gap-2.5">
            <span className="mark-confirmed !mt-0" /> Registering interest now
          </span>
        }
        title="Begin preparing for Hajj 2027."
        intro={
          <p>
            Register your interest now. When approved packages are published on Nusuk, we’ll help you choose one, prepare you for the rites, and be with the
            group throughout Hajj.
          </p>
        }
        actions={
          <>
            <ButtonLink href="#register">Register interest</ButtonLink>
            <WhatsAppButton message={WHATSAPP_MESSAGES.hajj} />
          </>
        }
        status={[
          { state: 'confirmed', text: 'Registering doesn’t reserve a place or commit you to anything.' },
          { state: 'confirmed', text: 'Hajj packages are booked and paid on Nusuk, not with Rawdah.' },
          { state: 'pending', text: 'Dates, packages and prices will be published on Nusuk.' },
        ]}
        photo={PHOTOS.hajjHero}
        photoCaption="A Rawdah group at the Haram."
      />

      <StepsSection
        tone="sand-soft"
        title="How booking Hajj works"
        intro={<p>Hajj packages are sold through Nusuk, the official Saudi platform. Here’s where Rawdah fits in.</p>}
        footer={<TextLink href={NUSUK_HAJJ_URL}>The official Nusuk Hajj platform</TextLink>}
        steps={[
          { title: 'Register your interest', text: 'Tell us about your plans. It takes a couple of minutes and commits you to nothing.' },
          { title: 'We get in touch', text: 'Someone from Rawdah contacts you to understand what you’re looking for.' },
          { title: 'Compare packages together', text: 'When options are published, we help you compare the ones that suit you.' },
          { title: 'Check the details on Nusuk', text: 'You review eligibility, prices, services and terms on Nusuk itself.' },
          { title: 'Book and pay on Nusuk', text: 'If you decide to go ahead, you book and pay directly on Nusuk.' },
        ]}
      />

      <section aria-labelledby="support-title" className="py-[var(--section-y)]">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading id="support-title" title="What Rawdah does for you" />
            <div className="mt-10 aspect-[4/3]">
              <PhotoSlot photo={PHOTOS.hajjPreparation} sizes="(min-width: 1024px) 40vw, 100vw" className="rounded-[3px]" />
            </div>
          </div>
          <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:self-center">
            {SUPPORT.map((s) => (
              <li key={s.title} className="border-t border-ajwa/15 pt-6">
                <h3 className="font-serif text-[1.625rem] leading-tight">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-dust">{s.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="check-title" className="on-dark bg-ajwa py-[var(--section-y)] text-parchment">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading
              id="check-title"
              tone="light"
              title="Before you book on Nusuk"
              intro={<p>Whichever package you choose, check these on Nusuk first. We’re happy to go through them with you.</p>}
            />
          </div>
          <ul className="lg:col-span-6 lg:col-start-7">
            {CHECK_ON_NUSUK.map((item) => (
              <li key={item} className="flex gap-4 border-t border-parchment/15 py-5 text-lg">
                <span aria-hidden className="mt-[0.7em] h-px w-5 shrink-0 bg-brass" />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <WhereThingsStand
        columns={[
          {
            title: 'Hajj 2027',
            items: [
              { state: 'confirmed', text: 'Hajj 2027 is Rawdah’s current Hajj campaign, and registration of interest is open.' },
              { state: 'confirmed', text: 'Brother Ayuub Mohamed Musa leads the group; Ustadh Abu Abdulaziz Ahmed is the Hajj guide.' },
              { state: 'confirmed', text: 'The Rawdah team supports the group throughout the journey.' },
              { state: 'confirmed', text: 'Packages are booked and paid on Nusuk. Rawdah does not take Hajj package payments.' },
              { state: 'pending', text: 'Dates and length of the journey.' },
              { state: 'pending', text: 'Packages, prices and terms, published on Nusuk.' },
              { state: 'pending', text: 'Hotels, transport and services for each package.' },
              { state: 'pending', text: 'Visa requirements, set out on Nusuk.' },
            ],
          },
        ]}
      />

      <PeopleSection people={peopleFor('hajj')} title="Who leads the group" intro={<p>The people named for Hajj 2027.</p>} />

      <FaqSection faqs={HAJJ_FAQS} title="Hajj questions" />

      <RegisterSection
        journey="hajj-2027"
        page="/hajj"
        title="Register for Hajj 2027"
        intro={
          <p>
            Tell us about your plans and we’ll be in touch. When packages are published, you’ll hear from us first. Registering doesn’t reserve a place or
            commit you to anything.
          </p>
        }
      />
    </>
  )
}
