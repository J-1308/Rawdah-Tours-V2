import Image from 'next/image'
import type { ReactNode } from 'react'
import { EnquiryForm } from './enquiry-form'
import { PlusIcon } from './icons'
import { PhotoSlot } from './photo'
import { Container, SectionHeading, StatusKey, StatusList, TextLink, WhatsAppButton, cx, type StatusItem } from './ui'
import type { Journey } from '@/lib/enquiry'
import type { Faq } from '@/lib/faqs'
import { initials, type Person } from '@/lib/people'
import { GALLERY, GALLERY_CAPTIONS, PHOTOS } from '@/lib/photos'
import { CONTACT, STATUS_CHECKED, WHATSAPP_MESSAGES } from '@/lib/site'

// ── Register interest ─────────────────────────────────────────────────────────

export function RegisterSection({
  journey = 'not-sure',
  page,
  title = 'Register your interest',
  intro,
}: {
  journey?: Journey
  page: string
  title?: string
  intro?: ReactNode
}) {
  const message = journey === 'hajj-2027' ? WHATSAPP_MESSAGES.hajj : journey === 'umrah' ? WHATSAPP_MESSAGES.umrah : WHATSAPP_MESSAGES.general
  return (
    <section id="register" aria-labelledby="register-title" className="scroll-mt-4 bg-sand py-[var(--section-y)]">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading
            id="register-title"
            title={title}
            intro={
              intro ?? (
                <p>
                  Tell us which journey you’re thinking about and someone from Rawdah will get back to you. Registering doesn’t reserve a place or commit you
                  to anything.
                </p>
              )
            }
          />
          <div className="mt-10 border-t border-ajwa/15 pt-8">
            <p className="font-semibold">Rather talk first?</p>
            <p className="mt-1 text-dust">Message us on WhatsApp, or call {CONTACT.phoneDisplay}.</p>
            <WhatsAppButton message={message} variant="outline" className="mt-4" />
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <EnquiryForm defaultJourney={journey} page={page} />
        </div>
      </Container>
    </section>
  )
}

// ── From Madinah to Makkah (the dark chapter) ─────────────────────────────────

const STAGES = [
  {
    ar: 'المدينة المنورة',
    title: 'Madinah',
    meta: 'Five nights',
    text: 'The journey begins near Masjid an-Nabawi. Lessons on the seerah and the history of the city, prayers in the Prophet’s Mosque ﷺ, and guided ziyarah to its sacred sites.',
    photo: PHOTOS.journeyMadinah,
    aspect: 'aspect-[4/5]',
  },
  {
    ar: null,
    title: 'The road to Makkah',
    meta: 'By coach, in ihram',
    text: 'Ihram at the miqat, then the coach to Makkah with your guides, using the road to prepare for what comes next.',
    photo: null,
    aspect: '',
  },
  {
    ar: 'مكة المكرمة',
    title: 'Makkah',
    meta: 'Five nights',
    text: 'Near Masjid al-Haram. Your guides take you through Umrah step by step: ihram, niyyah, tawaf, saʿi and tahallul.',
    photo: PHOTOS.journeyMakkah,
    aspect: 'aspect-[4/3]',
  },
]

export function JourneyArc({ intro, footer }: { intro?: ReactNode; footer?: ReactNode }) {
  return (
    <section aria-labelledby="journey-title" className="on-dark relative overflow-hidden bg-ajwa py-[var(--section-y)] text-parchment">
      <Container>
        <SectionHeading
          id="journey-title"
          tone="light"
          title="From Madinah to Makkah"
          intro={intro ?? <p>How our last Umrah, Path of Purity II, ran in August 2026. Each trip’s plan is confirmed when it’s announced.</p>}
        />

        <ol className="relative mt-16 lg:mt-24">
          {/* The path between the cities: draws as it scrolls into view */}
          <span aria-hidden className="journey-path absolute bottom-24 left-[0.95rem] top-3 w-px bg-brass lg:left-[1.45rem]" />
          {STAGES.map((s, i) => (
            <li key={s.title} className={cx('relative grid grid-cols-[2rem_1fr] gap-x-5 lg:grid-cols-12 lg:gap-x-10', i < STAGES.length - 1 && 'pb-16 lg:pb-24')}>
              <span
                aria-hidden
                className="relative z-10 flex size-8 items-center justify-center rounded-full border border-brass bg-ajwa font-serif text-lg text-parchment lg:col-span-1 lg:size-12 lg:text-2xl"
              >
                {i + 1}
              </span>
              <div className={cx('lg:col-span-5', !s.photo && 'lg:col-span-6')}>
                {s.ar ? (
                  <p lang="ar" className="ar mb-4 text-right text-[clamp(2.75rem,1.8rem+4.2vw,5.75rem)] leading-[1.15] text-parchment/90 lg:text-left">
                    {s.ar}
                  </p>
                ) : null}
                <h3 className="font-serif text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] leading-tight">{s.title}</h3>
                <p className="mt-1 text-sm font-semibold text-parchment-dim">{s.meta}</p>
                <p className="mt-4 max-w-[32rem] text-lg leading-relaxed text-parchment/90">{s.text}</p>
              </div>
              {s.photo ? (
                <div className={cx('col-start-2 mt-8 lg:col-span-6 lg:col-start-7 lg:mt-0', s.aspect)}>
                  <PhotoSlot photo={s.photo} sizes="(min-width: 1024px) 45vw, 85vw" tone="dark" className="rounded-[3px]" />
                </div>
              ) : null}
            </li>
          ))}
        </ol>
        {footer ? <div className="mt-16 lg:pl-[calc(100%/12)]">{footer}</div> : null}
      </Container>
    </section>
  )
}

// ── People ───────────────────────────────────────────────────────────────────

function Portrait({ person, sizes, className }: { person: Person; sizes: string; className?: string }) {
  if (!person.photo) {
    return (
      <div
        className={cx('relative flex items-end overflow-hidden bg-sand-soft p-4', className)}
        role="img"
        aria-label={`Photo of ${person.name} to come`}
      >
        <span aria-hidden className="absolute inset-0 flex items-center justify-center font-serif text-[clamp(2.5rem,6vw,4.5rem)] text-ajwa/25">
          {initials(person.name)}
        </span>
        <span className="relative text-[0.8125rem] font-semibold leading-tight text-dust">Photo to come</span>
      </div>
    )
  }
  return (
    <div className={cx('relative overflow-hidden bg-sand-soft', className)}>
      <Image src={person.photo.src} alt={person.name} fill sizes={sizes} className="object-cover" style={{ objectPosition: person.photo.position }} />
    </div>
  )
}

export function PeopleSection({ people, title, intro }: { people: Person[]; title: ReactNode; intro?: ReactNode }) {
  const [lead, ...rest] = people
  if (!lead) return null
  return (
    <section aria-labelledby="people-title" className="py-[var(--section-y)]">
      <Container>
        <SectionHeading id="people-title" title={title} intro={intro} />
        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <figure className="lg:col-span-5">
            <Portrait person={lead} sizes="(min-width: 1024px) 38vw, 92vw" className="aspect-[4/5] rounded-[3px]" />
            <figcaption className="mt-5">
              <p className="font-serif text-[1.75rem] leading-tight">{lead.name}</p>
              <p className="mt-1 font-semibold text-palm">{lead.role}</p>
              {lead.note ? <p className="mt-2 max-w-[28rem] text-dust">{lead.note}</p> : null}
            </figcaption>
          </figure>
          {rest.length ? (
            <ul className="space-y-10 lg:col-span-6 lg:col-start-7 lg:pt-16">
              {rest.map((p) => (
                <li key={p.slug} className="grid grid-cols-[6.5rem_1fr] items-start gap-5 border-t border-ajwa/10 pt-10 first:border-t-0 first:pt-0 sm:grid-cols-[8.5rem_1fr]">
                  <Portrait person={p} sizes="140px" className="aspect-[4/5] rounded-[3px]" />
                  <div>
                    <p className="font-serif text-[1.5rem] leading-tight">{p.name}</p>
                    <p className="mt-1 font-semibold text-palm">{p.role}</p>
                    {p.note ? <p className="mt-2 text-dust">{p.note}</p> : null}
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </section>
  )
}

// ── Gallery ───────────────────────────────────────────────────────────────────

export function GallerySection() {
  return (
    <section aria-labelledby="gallery-title" className="bg-sand-soft py-[var(--section-y)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="gallery-title" title="From previous journeys" intro={<p>Photos from Rawdah groups in Madinah and Makkah.</p>} />
          <TextLink href={CONTACT.instagramUrl}>More on Instagram</TextLink>
        </div>
      </Container>
      {/* Phones: a swipeable strip. Larger screens: columns. */}
      <ul className="strip mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-2 md:hidden">
        {GALLERY.map((photo, i) => (
          <li key={photo.src} className="w-[78vw] max-w-[22rem] shrink-0 snap-start">
            <div className="aspect-[4/5]">
              <PhotoSlot photo={photo} sizes="78vw" className="rounded-[3px]" />
            </div>
            <p className="mt-3 text-sm font-semibold text-dust">{GALLERY_CAPTIONS[i]}</p>
          </li>
        ))}
      </ul>
      <Container className="hidden md:block">
        <ul className="mt-14 columns-3 gap-6">
          {GALLERY.map((photo, i) => (
            <li key={photo.src} className="mb-8 break-inside-avoid">
              <div style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
                <PhotoSlot photo={photo} sizes="30vw" className="rounded-[3px]" />
              </div>
              <p className="mt-3 text-sm font-semibold text-dust">{GALLERY_CAPTIONS[i]}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

// ── Where things stand ────────────────────────────────────────────────────────

export function WhereThingsStand({ columns }: { columns: Array<{ title: string; items: StatusItem[] }> }) {
  return (
    <section aria-labelledby="status-title" className="py-[var(--section-y)]">
      <Container>
        <SectionHeading
          id="status-title"
          title="Where things stand"
          intro={<p>What’s confirmed and what isn’t yet, so you know exactly what you’re registering for. Last checked {STATUS_CHECKED}.</p>}
        />
        <StatusKey className="mt-6" />
        <div className={cx('mt-12 grid gap-12', columns.length > 1 && 'md:grid-cols-2 md:gap-16')}>
          {columns.map((c) => (
            <div key={c.title} className="border-t border-ajwa/15 pt-8">
              <h3 className="font-serif text-[1.75rem] leading-tight">{c.title}</h3>
              <StatusList items={c.items} className="mt-6 text-[1.0625rem]" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// ── Numbered steps (only for content that really is a sequence) ──────────────

export function StepsSection({
  title,
  intro,
  steps,
  footer,
  tone = 'ihram',
}: {
  title: ReactNode
  intro?: ReactNode
  steps: Array<{ title: string; text: ReactNode }>
  footer?: ReactNode
  tone?: 'ihram' | 'sand-soft'
}) {
  return (
    <section aria-labelledby="steps-title" className={cx('py-[var(--section-y)]', tone === 'sand-soft' && 'bg-sand-soft')}>
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading id="steps-title" title={title} intro={intro} />
          {footer ? <div className="mt-8">{footer}</div> : null}
        </div>
        <ol className="lg:col-span-7 lg:col-start-6">
          {steps.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-ajwa/15 py-7 sm:grid-cols-[4rem_1fr]">
              <span aria-hidden className="font-serif text-[2.25rem] leading-none text-brass">
                {i + 1}
              </span>
              <div>
                <h3 className="font-serif text-[1.5rem] leading-tight">{s.title}</h3>
                <div className="mt-2 leading-relaxed text-dust">{s.text}</div>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}

// ── Page hero for inner pages ─────────────────────────────────────────────────

export function PageHero({
  eyebrow,
  title,
  intro,
  actions,
  status,
  photo,
  photoCaption,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  intro?: ReactNode
  actions?: ReactNode
  status?: StatusItem[]
  photo?: (typeof PHOTOS)[keyof typeof PHOTOS]
  photoCaption?: string
}) {
  return (
    <section aria-labelledby="page-title">
      <Container className={cx('grid gap-9 pb-[var(--section-y)] lg:grid-cols-12 lg:items-center lg:gap-10', photo ? 'pt-0 lg:pt-14' : 'pt-12 lg:pt-20')}>
        {photo ? (
          <figure className="-mx-[var(--gutter)] lg:order-2 lg:col-span-5 lg:col-start-8 lg:mx-0">
            <div className="aspect-[4/3] lg:aspect-[4/5]">
              <PhotoSlot photo={photo} priority sizes="(min-width: 1024px) 40vw, 100vw" className="lg:rounded-[3px]" />
            </div>
            {photoCaption ? <figcaption className="mt-3 px-[var(--gutter)] text-sm text-dust lg:px-0">{photoCaption}</figcaption> : null}
          </figure>
        ) : null}
        <div className={cx('lg:order-1', photo ? 'lg:col-span-6' : 'lg:col-span-8')}>
          {eyebrow ? <div className="mb-5 text-[0.9375rem] font-semibold text-palm">{eyebrow}</div> : null}
          <h1 id="page-title" className="font-serif text-[clamp(2.6rem,1.6rem+4vw,5rem)] font-normal leading-[1.03] tracking-[-0.015em]">
            {title}
          </h1>
          {intro ? <div className="mt-6 max-w-[36rem] text-lg leading-relaxed text-dust sm:text-xl">{intro}</div> : null}
          {actions ? <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div> : null}
          {status ? <StatusList items={status} className="mt-10 border-t border-ajwa/15 pt-6" /> : null}
        </div>
      </Container>
    </section>
  )
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

export function FaqSection({ faqs, title = 'Questions people ask', intro }: { faqs: Faq[]; title?: string; intro?: ReactNode }) {
  return (
    <section aria-labelledby="faq-title" className="py-[var(--section-y)]">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-title" title={title} intro={intro} />
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <ul className="border-t border-ajwa/15">
            {faqs.map((f) => (
              <li key={f.q} className="border-b border-ajwa/15">
                <details className="faq group">
                  <summary className="flex items-start justify-between gap-6 py-6 font-serif text-[1.375rem] leading-snug">
                    <span>{f.q}</span>
                    <PlusIcon className="faq-icon mt-1 size-5 shrink-0 text-palm" />
                  </summary>
                  <p className="max-w-[40rem] pb-7 pr-10 text-[1.0625rem] leading-relaxed text-dust">{f.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
