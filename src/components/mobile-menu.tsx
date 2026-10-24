'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useState } from 'react'
import { CloseIcon, MenuIcon } from './icons'
import { ButtonLink, WhatsAppButton } from './ui'
import { WHATSAPP_MESSAGES } from '@/lib/site'

export function MobileMenu({ nav }: { nav: Array<{ href: string; label: string }> }) {
  const [open, setOpen] = useState(false)
  const [openedAt, setOpenedAt] = useState<string | null>(null)
  const pathname = usePathname()
  const panelId = useId()

  // Close when the route changes: the menu belongs to the page it was opened on.
  if (open && openedAt !== pathname) {
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          setOpenedAt(pathname)
          setOpen((v) => !v)
        }}
        className="-mr-2 inline-flex items-center gap-2 rounded-md px-2 py-2 font-semibold text-ajwa"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
        <span>{open ? 'Close' : 'Menu'}</span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-ajwa/10 bg-ihram px-[var(--gutter)] pb-8 pt-2 shadow-[0_24px_40px_-24px_rgba(46,32,32,0.35)]"
      >
        <nav aria-label="Main">
          <ul className="divide-y divide-ajwa/10">
            <li>
              <Link href="/" className="block py-4 font-serif text-[1.75rem] leading-none text-ajwa">
                Home
              </Link>
            </li>
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className="block py-4 font-serif text-[1.75rem] leading-none text-ajwa aria-[current=page]:text-palm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6 grid gap-3">
          <ButtonLink href="/register">Register interest</ButtonLink>
          <WhatsAppButton message={WHATSAPP_MESSAGES.general} />
        </div>
      </div>
    </div>
  )
}
