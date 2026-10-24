import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { ChatIcon, ExternalIcon } from './icons'
import { whatsappLink } from '@/lib/site'

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx('mx-auto w-full max-w-[84rem] px-[var(--gutter)]', className)}>{children}</div>
}

type Variant = 'primary' | 'palm' | 'outline' | 'light' | 'outline-light'

const variants: Record<Variant, string> = {
  primary: 'bg-ajwa text-ihram hover:bg-ajwa-soft',
  palm: 'bg-palm text-ihram hover:bg-palm-deep',
  outline: 'border border-ajwa/25 text-ajwa hover:border-ajwa/60 hover:bg-ajwa/[0.03]',
  light: 'bg-parchment text-ajwa hover:bg-ihram',
  'outline-light': 'border border-parchment/35 text-parchment hover:border-parchment/70 hover:bg-parchment/[0.06]',
}

const base =
  'inline-flex min-h-12 items-center justify-center gap-2.5 rounded-md px-5 py-3 text-[1rem] font-semibold leading-tight tracking-[0.005em] transition-colors duration-150 text-center'

export function ButtonLink({
  href,
  variant = 'primary',
  className,
  children,
  ...rest
}: { href: string; variant?: Variant; className?: string; children: ReactNode } & Omit<ComponentProps<'a'>, 'href'>) {
  const isExternal = /^(https?:|mailto:|tel:)/.test(href)
  if (isExternal) {
    return (
      <a href={href} className={cx(base, variants[variant], className)} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={cx(base, variants[variant], className)} {...rest}>
      {children}
    </Link>
  )
}

export function WhatsAppButton({
  message,
  variant = 'palm',
  className,
  label = 'Chat on WhatsApp',
}: {
  message?: string
  variant?: Variant
  className?: string
  label?: string
}) {
  return (
    <ButtonLink href={whatsappLink(message)} variant={variant} className={className} target="_blank" rel="noopener noreferrer">
      <ChatIcon />
      {label}
    </ButtonLink>
  )
}

/** Underlined text link. External links get an icon so people know they're leaving. */
export function TextLink({
  href,
  children,
  className,
  tone = 'dark',
}: {
  href: string
  children: ReactNode
  className?: string
  tone?: 'dark' | 'light'
}) {
  const isExternal = /^https?:/.test(href)
  const cls = cx(
    'inline-flex items-baseline gap-1.5 font-semibold underline decoration-1 underline-offset-[0.3em] transition-colors',
    tone === 'dark' ? 'text-palm decoration-palm/35 hover:decoration-palm' : 'text-parchment decoration-parchment/40 hover:decoration-parchment',
    className,
  )
  if (isExternal) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
        <ExternalIcon className="size-[0.85em] translate-y-[0.1em]" />
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}

export type StatusItem = { state: 'confirmed' | 'pending'; text: ReactNode }

/** Filled marker = confirmed. Ring = not confirmed yet. Used everywhere the site states a fact about a trip. */
export function StatusList({ items, className }: { items: StatusItem[]; className?: string }) {
  return (
    <ul className={cx('space-y-3', className)}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className={item.state === 'confirmed' ? 'mark-confirmed' : 'mark-pending'} />
          <span>
            <span className="sr-only">{item.state === 'confirmed' ? 'Confirmed: ' : 'Not confirmed yet: '}</span>
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  )
}

export function StatusKey({ className, tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  return (
    <p className={cx('flex flex-wrap items-center gap-x-5 gap-y-2 text-sm', tone === 'dark' ? 'text-dust' : 'text-parchment-dim', className)} aria-hidden>
      <span className="inline-flex items-center gap-2">
        <span className="mark-confirmed !mt-0" /> Confirmed
      </span>
      <span className="inline-flex items-center gap-2">
        <span className="mark-pending !mt-0" /> Not confirmed yet
      </span>
    </p>
  )
}

export function SectionHeading({
  id,
  title,
  intro,
  className,
  tone = 'dark',
  as: Tag = 'h2',
}: {
  id?: string
  title: ReactNode
  intro?: ReactNode
  className?: string
  tone?: 'dark' | 'light'
  as?: 'h1' | 'h2' | 'h3'
}) {
  return (
    <div className={cx('max-w-[40rem]', className)}>
      <Tag id={id} className="font-serif text-[clamp(2rem,1.35rem+2.6vw,3.5rem)] font-normal leading-[1.06] tracking-[-0.01em]">
        {title}
      </Tag>
      {intro ? (
        <div className={cx('mt-5 text-[1.0625rem] leading-relaxed sm:text-lg', tone === 'dark' ? 'text-dust' : 'text-parchment-dim')}>{intro}</div>
      ) : null}
    </div>
  )
}
