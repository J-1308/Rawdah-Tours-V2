import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage, LegalSection } from '@/components/legal-page'

export const metadata: Metadata = {
  title: 'Cookies',
  description: 'How the Rawdah Tours website uses cookies.',
  alternates: { canonical: '/cookies' },
}

export default function CookiesPage() {
  return (
    <LegalPage title="Cookies" updated="October 2026" intro={<p>This website doesn’t use advertising or tracking cookies, so there’s nothing to accept.</p>}>
      <LegalSection title="Visit counts">
        <p>We count visits with Vercel Web Analytics, which works without cookies and doesn’t identify you.</p>
      </LegalSection>
      <LegalSection title="Card payments">
        <p>If you pay a deposit by card, Stripe may set cookies on its own checkout pages to keep payments secure and prevent fraud.</p>
      </LegalSection>
      <LegalSection title="More information">
        <p>
          Our{' '}
          <Link href="/privacy" className="underline underline-offset-4">
            privacy policy
          </Link>{' '}
          explains how we handle personal data.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
