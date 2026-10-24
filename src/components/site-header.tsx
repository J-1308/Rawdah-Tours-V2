import Image from 'next/image'
import Link from 'next/link'
import { ButtonLink, Container } from './ui'
import { ChatIcon } from './icons'
import { MobileMenu } from './mobile-menu'
import { WHATSAPP_MESSAGES, whatsappLink } from '@/lib/site'

export const NAV = [
  { href: '/hajj', label: 'Hajj 2027' },
  { href: '/umrah', label: 'Umrah' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  return (
    <header className="relative z-40 border-b border-ajwa/10 bg-ihram">
      <Container className="flex h-[4.5rem] items-center justify-between gap-6 lg:h-[5.25rem]">
        <Link href="/" className="-my-2 shrink-0 py-2" aria-label="Rawdah Tours, home">
          <Image src="/images/brand/logo-ajwa.png" alt="Rawdah Tours" width={1074} height={672} priority className="h-11 w-auto lg:h-[3.25rem]" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9 text-[1rem] font-semibold">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="py-2 text-ajwa underline-offset-[0.4em] decoration-brass decoration-1 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <a
            href={whatsappLink(WHATSAPP_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-palm underline-offset-[0.4em] hover:underline"
          >
            <ChatIcon /> WhatsApp
          </a>
          <ButtonLink href="/register" className="min-h-11 px-4 py-2.5">
            Register interest
          </ButtonLink>
        </div>

        <MobileMenu nav={NAV} />
      </Container>
    </header>
  )
}
