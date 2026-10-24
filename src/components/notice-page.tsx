import type { ReactNode } from 'react'
import { Container } from './ui'

/** A calm single-column page for confirmations, errors and short messages. */
export function NoticePage({ title, children, status }: { title: string; children: ReactNode; status?: ReactNode }) {
  return (
    <Container className="py-[var(--section-y)]">
      <div className="max-w-[40rem]">
        {status ? <div className="mb-5 text-[0.9375rem] font-semibold">{status}</div> : null}
        <h1 className="font-serif text-[clamp(2.4rem,1.6rem+3vw,4rem)] leading-[1.04]">{title}</h1>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-dust">{children}</div>
      </div>
    </Container>
  )
}
