'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChatIcon } from './icons'
import { cx } from './ui'
import { WHATSAPP_MESSAGES, whatsappLink } from '@/lib/site'

/**
 * The two main actions, pinned to the bottom of the screen on phones once the
 * visitor has scrolled past the first screen. Hidden while the register form or
 * the footer is on screen, and on pages that are part of a booking.
 */
export function MobileActionBar() {
  const pathname = usePathname()
  const [pastFold, setPastFold] = useState(false)
  const [blocked, setBlocked] = useState(false)

  const hiddenHere = pathname.startsWith('/umrah/book') || pathname.startsWith('/booking') || pathname.startsWith('/admin') || pathname === '/register'

  useEffect(() => {
    const onScroll = () => setPastFold(window.scrollY > window.innerHeight * 0.75)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const targets = [document.getElementById('register'), document.querySelector('footer')].filter(Boolean) as Element[]
    const visible = new Set<Element>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target)
          else visible.delete(e.target)
        }
        setBlocked(visible.size > 0)
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    targets.forEach((t) => io.observe(t))
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [pathname])

  if (hiddenHere) return null
  const show = pastFold && !blocked

  const message = pathname.startsWith('/hajj') ? WHATSAPP_MESSAGES.hajj : pathname.startsWith('/umrah') ? WHATSAPP_MESSAGES.umrah : WHATSAPP_MESSAGES.general

  return (
    <div
      aria-hidden={!show}
      className={cx(
        'fixed inset-x-0 bottom-0 z-30 border-t border-ajwa/10 bg-ihram/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-300 lg:hidden',
        show ? 'translate-y-0' : 'pointer-events-none translate-y-full',
      )}
    >
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <a
          href="/register"
          onClick={(e) => {
            // On pages with their own form, scroll to it instead of leaving the page.
            const form = document.getElementById('register')
            if (form) {
              e.preventDefault()
              form.scrollIntoView({ behavior: 'smooth', block: 'start' })
              history.replaceState(null, '', '#register')
            }
          }}
          tabIndex={show ? 0 : -1}
          className="inline-flex min-h-12 items-center justify-center rounded-md bg-ajwa px-3 text-[0.9375rem] font-semibold text-ihram"
        >
          Register interest
        </a>
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={show ? 0 : -1}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-palm px-3 text-[0.9375rem] font-semibold text-ihram"
        >
          <ChatIcon /> WhatsApp
        </a>
      </div>
    </div>
  )
}
