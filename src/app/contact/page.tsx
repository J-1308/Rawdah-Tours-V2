import type { Metadata } from 'next'
import { ChatIcon, InstagramIcon, MailIcon, PhoneIcon } from '@/components/icons'
import { RegisterSection } from '@/components/sections'
import { Container } from '@/components/ui'
import { COMPANY, CONTACT, WHATSAPP_MESSAGES, whatsappLink } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Rawdah Tours on WhatsApp, by phone or by email.',
  alternates: { canonical: '/contact' },
}

const METHODS = [
  {
    icon: ChatIcon,
    label: 'WhatsApp',
    value: 'Message us',
    note: 'The quickest way to reach us.',
    href: whatsappLink(WHATSAPP_MESSAGES.general),
    external: true,
  },
  { icon: PhoneIcon, label: 'Phone', value: CONTACT.phoneDisplay, note: null, href: CONTACT.phoneHref, external: false },
  { icon: MailIcon, label: 'Email', value: CONTACT.email, note: null, href: `mailto:${CONTACT.email}`, external: false },
  { icon: InstagramIcon, label: 'Instagram', value: CONTACT.instagramHandle, note: 'Photos and updates from our trips.', href: CONTACT.instagramUrl, external: true },
]

export default function ContactPage() {
  return (
    <>
      <section aria-labelledby="page-title" className="pb-[var(--section-y)] pt-12 lg:pt-20">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h1 id="page-title" className="font-serif text-[clamp(2.6rem,1.6rem+4vw,5rem)] leading-[1.03] tracking-[-0.015em]">
              Get in touch
            </h1>
            <p className="mt-6 max-w-[30rem] text-lg leading-relaxed text-dust sm:text-xl">
              Questions about Hajj 2027, the next Umrah, or a booking you’ve made? Message us and someone from the team will reply.
            </p>
          </div>
          <ul className="lg:col-span-6 lg:col-start-7">
            {METHODS.map((m) => (
              <li key={m.label} className="border-t border-ajwa/15 last:border-b">
                <a
                  href={m.href}
                  {...(m.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group grid grid-cols-[2.5rem_1fr] items-start gap-3 py-6"
                >
                  <m.icon className="mt-1 size-6 text-palm" />
                  <span>
                    <span className="block text-sm font-semibold text-dust">{m.label}</span>
                    <span className="mt-1 block break-all font-serif text-[1.625rem] leading-tight group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                      {m.value}
                    </span>
                    {m.note ? <span className="mt-1 block text-dust">{m.note}</span> : null}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
        <Container>
          <p className="mt-12 text-sm text-dust">
            {COMPANY.legalName}, registered in {COMPANY.registeredIn}. {COMPANY.address}.
          </p>
        </Container>
      </section>

      <RegisterSection page="/contact" />
    </>
  )
}
