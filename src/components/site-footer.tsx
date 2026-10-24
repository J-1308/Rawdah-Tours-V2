import Image from 'next/image'
import Link from 'next/link'
import { Container } from './ui'
import { COMPANY, CONTACT, NUSUK_HAJJ_URL, WHATSAPP_MESSAGES, whatsappLink } from '@/lib/site'

const columns = [
  {
    title: 'Journeys',
    links: [
      { href: '/hajj', label: 'Hajj 2027' },
      { href: '/umrah', label: 'Umrah' },
      { href: '/register', label: 'Register interest' },
    ],
  },
  {
    title: 'Rawdah',
    links: [
      { href: '/about', label: 'About us' },
      { href: '/contact', label: 'Contact' },
      { href: CONTACT.instagramUrl, label: `Instagram ${CONTACT.instagramHandle}` },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="on-dark bg-ajwa text-parchment">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Image src="/images/brand/logo-sand.png" alt="Rawdah Tours" width={1074} height={672} className="h-14 w-auto" />
            <p className="mt-6 max-w-[22rem] font-serif text-[1.375rem] leading-snug text-parchment">
              Guided Umrah and Hajj journeys from the UK, travelled in good company.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="text-sm font-semibold text-parchment-dim">{col.title}</h2>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      {l.href.startsWith('http') ? (
                        <a href={l.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} className="hover:underline">
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-sm font-semibold text-parchment-dim">Get in touch</h2>
              <ul className="mt-4 space-y-3">
                <li>
                  <a href={whatsappLink(WHATSAPP_MESSAGES.general)} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href={CONTACT.phoneHref} className="hover:underline">
                    {CONTACT.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${CONTACT.email}`} className="break-all hover:underline">
                    {CONTACT.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-parchment/15 pt-8 text-sm leading-relaxed text-parchment-dim">
          <p className="max-w-[46rem]">
            Hajj packages are booked and paid on the official{' '}
            <a href={NUSUK_HAJJ_URL} target="_blank" rel="noopener noreferrer" className="text-parchment underline underline-offset-4">
              Nusuk Hajj platform
            </a>
            . Rawdah Tours does not take payment for Hajj packages.
          </p>
          <p className="mt-3 max-w-[46rem]">
            {COMPANY.legalName}, registered in {COMPANY.registeredIn}. {COMPANY.address}.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} {COMPANY.legalName}</p>
            <ul className="flex gap-6">
              <li>
                <Link href="/privacy" className="hover:text-parchment hover:underline">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-parchment hover:underline">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-parchment hover:underline">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  )
}
