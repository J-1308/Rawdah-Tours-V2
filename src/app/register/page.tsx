import type { Metadata } from 'next'
import { EnquiryForm } from '@/components/enquiry-form'
import { Container, WhatsAppButton } from '@/components/ui'
import type { Journey } from '@/lib/enquiry'
import { CONTACT, WHATSAPP_MESSAGES } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Register your interest',
  description: 'Register your interest in Hajj 2027 or the next Rawdah Tours Umrah. It doesn’t reserve a place or commit you to anything.',
  alternates: { canonical: '/register' },
}

const NEXT_STEPS = [
  'Someone from Rawdah gets in touch to understand your plans.',
  'When dates and details are confirmed, you hear from us first.',
  'You decide then. Registering doesn’t commit you to anything.',
]

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ journey?: string }> }) {
  const { journey } = await searchParams
  const preset: Journey = journey === 'hajj-2027' || journey === 'umrah' ? journey : 'not-sure'

  return (
    <section className="bg-sand py-[var(--section-y)]">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <h1 className="font-serif text-[clamp(2.4rem,1.6rem+3vw,4rem)] leading-[1.04]">Register your interest</h1>
          <p className="mt-5 text-lg leading-relaxed text-dust">Tell us which journey you’re thinking about. It takes a couple of minutes.</p>
          <h2 className="mt-10 font-semibold">What happens next</h2>
          <ol className="mt-4 space-y-4">
            {NEXT_STEPS.map((s, i) => (
              <li key={s} className="grid grid-cols-[2rem_1fr] gap-2">
                <span aria-hidden className="font-serif text-[1.5rem] leading-none text-brass">
                  {i + 1}
                </span>
                <span className="text-dust">{s}</span>
              </li>
            ))}
          </ol>
          <div className="mt-10 border-t border-ajwa/15 pt-8">
            <p className="font-semibold">Rather talk first?</p>
            <p className="mt-1 text-dust">Message us on WhatsApp, or call {CONTACT.phoneDisplay}.</p>
            <WhatsAppButton message={WHATSAPP_MESSAGES.general} variant="outline" className="mt-4" />
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <EnquiryForm defaultJourney={preset} page="/register" />
        </div>
      </Container>
    </section>
  )
}
