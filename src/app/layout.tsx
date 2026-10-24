import './fonts.css'
import './globals.css'
import type { Metadata, Viewport } from 'next'
import { preload } from 'react-dom'
import { Analytics } from '@vercel/analytics/next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MobileActionBar } from '@/components/mobile-action-bar'
import { SITE_URL } from '@/lib/site'

const isProduction = process.env.VERCEL_ENV === 'production'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Rawdah Tours | Guided Umrah and Hajj from the UK',
    template: '%s | Rawdah Tours',
  },
  description:
    'Guided Umrah and Hajj journeys from the UK, with students of knowledge and a group that looks after each other. Register your interest for Hajj 2027.',
  openGraph: {
    type: 'website',
    siteName: 'Rawdah Tours',
    locale: 'en_GB',
  },
  // Preview deployments must never be indexed.
  robots: isProduction ? undefined : { index: false, follow: false },
}

export const viewport: Viewport = {
  themeColor: '#fbf9f5',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  preload('/fonts/eb-garamond-latin-wght-normal.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' })
  preload('/fonts/source-sans-3-latin-wght-normal.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' })

  return (
    <html lang="en-GB">
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ajwa focus:px-4 focus:py-3 focus:font-semibold focus:text-ihram"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileActionBar />
        <Analytics />
      </body>
    </html>
  )
}
