'use client'

import Link from 'next/link'
import { useActionState, useEffect, useId, useRef } from 'react'
import { submitEnquiry } from '@/app/actions/enquiry'
import type { EnquiryState, EnquiryValues, Journey } from '@/lib/enquiry'
import { WaGlyph } from '@/app/_site/whatsapp'

const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(' ')

const JOURNEY_OPTIONS: Array<{ value: Journey; label: string; hint: string }> = [
  { value: 'hajj-2027', label: 'Hajj 2027', hint: 'Registering interest now' },
  { value: 'umrah', label: 'Umrah', hint: 'Dates coming soon' },
  { value: 'not-sure', label: 'Not sure yet', hint: 'We’ll talk it through' },
]

function Field({
  id,
  label,
  hint,
  error,
  children,
  optional,
}: {
  id: string
  label: string
  hint?: string
  error?: string
  optional?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-medium">
        {label}
        {optional ? <span className="font-normal text-ink/70"> (optional)</span> : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-[0.9375rem] text-ink/70">
          {hint}
        </p>
      ) : null}
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-[0.9375rem] font-medium text-error">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function RegisterForm({ defaultJourney = 'not-sure', page }: { defaultJourney?: Journey; page: string }) {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(submitEnquiry, { status: 'idle', key: 0 })
  const uid = useId()
  const summaryRef = useRef<HTMLDivElement>(null)
  const id = (name: string) => `${uid}-${name}`

  useEffect(() => {
    if (state.status !== 'idle') summaryRef.current?.focus()
  }, [state])

  if (state.status === 'success') {
    return (
      <div ref={summaryRef} tabIndex={-1} role="status" className="rounded-[0.95rem] border border-ink/20 bg-canvas p-6 outline-none sm:p-8">
        <p className="display text-[1.9rem]">Interest registered</p>
        <p className="mt-3 text-lg">
          {state.firstName ? `Thank you, ${state.firstName}. ` : 'Thank you. '}
          Someone from Rawdah will be in touch about {state.journeyLabel || 'your trip'}, in sha Allah. We’ve sent a copy to your email.
        </p>
        <p className="mt-4 text-ink/70">Registering doesn’t reserve a place or commit you to anything.</p>
        <p className="mt-6">
          <Link href="/" className="font-medium text-ink underline underline-offset-4">
            Back to the homepage
          </Link>
        </p>
      </div>
    )
  }

  const values: Partial<EnquiryValues> = state.status === 'invalid' || state.status === 'unavailable' ? state.values : {}
  const errors = state.status === 'invalid' ? state.errors : {}
  const journey = values.journey ?? defaultJourney
  const describedBy = (name: keyof EnquiryValues, hint = false) =>
    [hint ? `${id(name)}-hint` : null, errors[name] ? `${id(name)}-error` : null].filter(Boolean).join(' ') || undefined

  return (
    <form action={action} noValidate className="space-y-7" key={state.key}>
      <div ref={summaryRef} tabIndex={-1} className="outline-none">
        {state.status === 'invalid' ? (
          <div role="alert" className="rounded-[0.95rem] border border-error/40 bg-canvas p-4">
            <p className="font-medium text-error">Check the highlighted details and send again.</p>
          </div>
        ) : null}
        {state.status === 'unavailable' ? (
          <div role="alert" className="rounded-[0.95rem] border border-ink/20 bg-canvas p-5">
            <p className="font-medium">Your details couldn’t be sent from the website just now.</p>
            <p className="mt-1 text-ink/70">Send them to us on WhatsApp instead. We’ve written the message for you.</p>
            <a
              href={state.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-12 items-center gap-2 rounded-[0.95rem] bg-wa px-5 py-3 text-white hover:opacity-90"
            >
              <WaGlyph className="size-5" /> Send on WhatsApp
            </a>
          </div>
        ) : null}
      </div>

      <fieldset>
        <legend className="font-medium">Which trip are you interested in?</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {JOURNEY_OPTIONS.map((o) => (
            <label
              key={o.value}
              className="flex cursor-pointer items-start gap-3 rounded-[0.95rem] border border-ink/10 bg-white/55 p-4 transition-colors hover:border-ink/40 has-[:checked]:border-ink has-[:checked]:bg-white has-[:checked]:shadow-[0_0_0_4px_rgb(216_195_161/0.35)]"
            >
              <input type="radio" name="journey" value={o.value} defaultChecked={journey === o.value} className="choice mt-0.5" />
              <span>
                <span className="block font-medium leading-tight">{o.label}</span>
                <span className="mt-1 block text-[0.9375rem] leading-snug text-ink/70">{o.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={id('fullName')} label="Full name" error={errors.fullName}>
          <input
            id={id('fullName')}
            name="fullName"
            autoComplete="name"
            required
            defaultValue={values.fullName}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={describedBy('fullName')}
            className="field"
          />
        </Field>
        <Field id={id('email')} label="Email" error={errors.email}>
          <input
            id={id('email')}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            defaultValue={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('email')}
            className="field"
          />
        </Field>
        <Field id={id('phone')} label="Phone or WhatsApp" error={errors.phone}>
          <input
            id={id('phone')}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            defaultValue={values.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy('phone')}
            className="field"
          />
        </Field>
        <Field id={id('travellers')} label="How many people are travelling?" error={errors.travellers}>
          <input
            id={id('travellers')}
            name="travellers"
            type="number"
            min={1}
            max={30}
            inputMode="numeric"
            defaultValue={values.travellers ?? '1'}
            aria-invalid={Boolean(errors.travellers)}
            aria-describedby={describedBy('travellers')}
            className="field"
          />
        </Field>
      </div>

      <Field id={id('travellingFrom')} label="Where would you travel from?" hint="Your town or city, so we can plan departures." optional>
        <input
          id={id('travellingFrom')}
          name="travellingFrom"
          autoComplete="address-level2"
          defaultValue={values.travellingFrom}
          aria-describedby={describedBy('travellingFrom', true)}
          className="field"
        />
      </Field>

      <Field id={id('message')} label="Anything you’d like us to know?" optional>
        <textarea id={id('message')} name="message" rows={4} defaultValue={values.message} className="field resize-y" />
      </Field>

      <label className="flex items-start gap-3">
        <input type="checkbox" name="marketingConsent" defaultChecked={values.marketingConsent} className="choice mt-1" />
        <span>Email me about future Rawdah trips. You can stop these at any time.</span>
      </label>

      {/* Honeypot for bots. Hidden from people and screen readers. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="page" value={page} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[28rem] text-[0.9375rem] text-ink/70">
          We use these details to reply to you. Registering doesn’t reserve a place. See our{' '}
          <Link href="/privacy" className="underline underline-offset-4">
            privacy policy
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={pending}
          className={cx(
            'inline-flex min-h-[3.25rem] shrink-0 items-center justify-center btn-ink rounded-[0.95rem] px-7 py-3.5 font-medium text-canvas transition-colors hover:bg-ink-deep',
            pending && 'cursor-wait opacity-70',
          )}
        >
          {pending ? 'Registering…' : 'Register interest'}
        </button>
      </div>
    </form>
  )
}
