import type { ReactNode } from 'react'
import { Container } from './ui'

export function LegalPage({ title, updated, intro, children }: { title: string; updated: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <Container className="py-[var(--section-y)]">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
        <header className="lg:col-span-4">
          <h1 className="font-serif text-[clamp(2.4rem,1.6rem+3vw,4rem)] leading-[1.04]">{title}</h1>
          <p className="mt-4 text-sm text-dust">Last updated {updated}</p>
        </header>
        <div className="max-w-[42rem] lg:col-span-7 lg:col-start-6">
          {intro ? <div className="prose-serif mb-10">{intro}</div> : null}
          <div className="legal space-y-10">{children}</div>
        </div>
      </div>
    </Container>
  )
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-ajwa/15 pt-8">
      <h2 className="font-serif text-[1.625rem] leading-tight">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-ajwa/90 [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-2">{children}</div>
    </section>
  )
}
