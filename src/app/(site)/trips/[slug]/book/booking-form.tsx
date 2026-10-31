'use client'

import Link from 'next/link'
import { useActionState, useEffect, useRef, useState } from 'react'
import type { BookingState, BookingValues } from '@/lib/booking'
import { WaGlyph } from '@/app/_site/whatsapp'
import { cx } from '@/components/ui'
import { WHATSAPP_MESSAGES, whatsappLink } from '@/lib/site'

type Room = { id: string; label: string; occupancy: number; price: string }

function Field({ id, label, hint, error, optional, children }: { id: string; label: string; hint?: string; error?: string; optional?: boolean; children: React.ReactNode }) {
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

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-ink/15 pt-8">
      <legend className="float-left mb-6 w-full font-editorial text-[1.75rem] leading-tight">{title}</legend>
      <div className="clear-both space-y-6">{children}</div>
    </fieldset>
  )
}

export function BookingForm({
  action,
  rooms,
  deposit,
  cardFee,
  depositWithFee,
}: {
  action: (state: BookingState, formData: FormData) => Promise<BookingState>
  rooms: Room[]
  deposit: string
  cardFee: string
  depositWithFee: string
}) {
  const [state, formAction, pending] = useActionState<BookingState, FormData>(action, { status: 'idle', key: 0 })
  const v: Partial<BookingValues> = state.status === 'idle' ? {} : state.values
  const errors = state.status === 'invalid' ? state.errors : {}
  const [method, setMethod] = useState<'card' | 'bank_transfer'>(v.paymentMethod ?? 'card')
  const summaryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (state.status !== 'idle') summaryRef.current?.focus()
  }, [state])

  const inv = (k: keyof BookingValues) => ({
    'aria-invalid': Boolean(errors[k]),
    'aria-describedby': errors[k] ? `bk-${k}-error` : undefined,
  })

  return (
    <form action={formAction} noValidate key={state.key} className="space-y-10">
      <div ref={summaryRef} tabIndex={-1} className="outline-none">
        {state.status === 'invalid' ? (
          <div role="alert" className="rounded-[0.95rem] border border-error/40 bg-canvas p-4 font-medium text-error">
            Check the highlighted details and try again.
          </div>
        ) : null}
        {state.status === 'blocked' || state.status === 'unavailable' ? (
          <div role="alert" className="rounded-[0.95rem] border border-ink/20 bg-canvas p-5">
            <p className="font-medium">{state.message}</p>
            <a
              href={whatsappLink(WHATSAPP_MESSAGES.booking)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-12 items-center gap-2 rounded-[0.95rem] bg-wa px-5 py-3 text-white hover:opacity-90"
            >
              <WaGlyph className="size-5" /> Message us on WhatsApp
            </a>
          </div>
        ) : null}
      </div>

      <fieldset>
        <legend className="mb-2 font-editorial text-[1.75rem] leading-tight">Room</legend>
        <p className="mb-5 text-ink/70">Prices are per person. Solo travellers share with travellers of the same gender.</p>
        <div className="grid gap-2 sm:grid-cols-3 sm:gap-3">
          {rooms.map((r) => (
            <label
              key={r.id}
              className="grid cursor-pointer grid-cols-[1fr_auto] items-center gap-x-3 gap-y-0.5 rounded-[0.95rem] border border-ink/10 bg-(--raise) p-4 sm:flex sm:flex-col sm:items-stretch sm:gap-1 transition-colors hover:border-ink/40 has-[:checked]:border-ink has-[:checked]:bg-(--raise-hi) has-[:checked]:shadow-[0_0_0_4px_rgb(216_195_161/0.35)]"
            >
              <span className="flex items-center gap-3">
                <input type="radio" name="roomId" value={r.id} defaultChecked={v.roomId === r.id} className="choice" required />
                <span className="font-medium">{r.label}</span>
              </span>
              <span className="col-start-1 row-start-2 pl-[1.875rem] text-[0.92rem] text-ink/70 sm:text-base">Sharing between {r.occupancy}</span>
              <span className="col-start-2 row-span-2 row-start-1 font-editorial text-[1.5rem] sm:pl-[1.875rem]">{r.price}</span>
            </label>
          ))}
        </div>
        {errors.roomId ? <p className="mt-2 text-[0.9375rem] font-medium text-error">{errors.roomId}</p> : null}
      </fieldset>

      <Group title="Your details">
        <Field id="bk-fullName" label="Full name" hint="As it appears on your passport." error={errors.fullName}>
          <input id="bk-fullName" name="fullName" autoComplete="name" defaultValue={v.fullName} className="field" {...inv('fullName')} />
        </Field>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="bk-email" label="Email" error={errors.email}>
            <input id="bk-email" name="email" type="email" autoComplete="email" defaultValue={v.email} className="field" {...inv('email')} />
          </Field>
          <Field id="bk-phone" label="Phone or WhatsApp" error={errors.phone}>
            <input id="bk-phone" name="phone" type="tel" autoComplete="tel" defaultValue={v.phone} className="field" {...inv('phone')} />
          </Field>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <span className="block font-medium" id="bk-gender-label">
              Gender
            </span>
            <div className="mt-2 flex gap-5" role="radiogroup" aria-labelledby="bk-gender-label">
              {[
                ['male', 'Male'],
                ['female', 'Female'],
              ].map(([value, label]) => (
                <label key={value} className="flex min-h-12 items-center gap-2.5">
                  <input type="radio" name="gender" value={value} defaultChecked={v.gender === value} className="choice" />
                  {label}
                </label>
              ))}
            </div>
            {errors.gender ? <p className="mt-2 text-[0.9375rem] font-medium text-error">{errors.gender}</p> : null}
          </div>
          <Field id="bk-age" label="Age" error={errors.age}>
            <input id="bk-age" name="age" type="number" inputMode="numeric" min={18} max={100} defaultValue={v.age} className="field" {...inv('age')} />
          </Field>
          <Field id="bk-citizenship" label="Citizenship" error={errors.citizenship}>
            <input id="bk-citizenship" name="citizenship" autoComplete="country-name" defaultValue={v.citizenship} className="field" {...inv('citizenship')} />
          </Field>
        </div>
      </Group>

      <Group title="Emergency contact">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="bk-emergencyContactName" label="Name" error={errors.emergencyContactName}>
            <input id="bk-emergencyContactName" name="emergencyContactName" defaultValue={v.emergencyContactName} className="field" {...inv('emergencyContactName')} />
          </Field>
          <Field id="bk-emergencyContactPhone" label="Phone" error={errors.emergencyContactPhone}>
            <input
              id="bk-emergencyContactPhone"
              name="emergencyContactPhone"
              type="tel"
              defaultValue={v.emergencyContactPhone}
              className="field"
              {...inv('emergencyContactPhone')}
            />
          </Field>
        </div>
        <Field id="bk-medicalInfo" label="Health or access needs" hint="Anything the group leaders should know. Only they see this." optional>
          <textarea id="bk-medicalInfo" name="medicalInfo" rows={3} defaultValue={v.medicalInfo} className="field resize-y" />
        </Field>
      </Group>

      <Group title="Payment">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex cursor-pointer items-start gap-3 rounded-[0.95rem] border border-ink/10 bg-(--raise) p-4 has-[:checked]:border-ink has-[:checked]:bg-(--raise-hi) has-[:checked]:shadow-[0_0_0_4px_rgb(216_195_161/0.35)]">
            <input type="radio" name="paymentMethod" value="card" checked={method === 'card'} onChange={() => setMethod('card')} className="choice mt-0.5" />
            <span>
              <span className="block font-medium">Card, online now</span>
              <span className="mt-1 block text-ink/70">
                {depositWithFee} today ({deposit} deposit + {cardFee} card fee)
              </span>
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-3 rounded-[0.95rem] border border-ink/10 bg-(--raise) p-4 has-[:checked]:border-ink has-[:checked]:bg-(--raise-hi) has-[:checked]:shadow-[0_0_0_4px_rgb(216_195_161/0.35)]">
            <input
              type="radio"
              name="paymentMethod"
              value="bank_transfer"
              checked={method === 'bank_transfer'}
              onChange={() => setMethod('bank_transfer')}
              className="choice mt-0.5"
            />
            <span>
              <span className="block font-medium">Bank transfer</span>
              <span className="mt-1 block text-ink/70">{deposit} deposit, no fee. We email you the details.</span>
            </span>
          </label>
        </div>

        <div className="space-y-4 pt-2">
          <label className="flex items-start gap-3">
            <input type="checkbox" name="accurate" defaultChecked={v.accurate} className="choice mt-1" aria-invalid={Boolean(errors.accurate)} />
            <span>My details are accurate and match my passport.</span>
          </label>
          {errors.accurate ? <p className="text-[0.9375rem] font-medium text-error">{errors.accurate}</p> : null}
          <label className="flex items-start gap-3">
            <input type="checkbox" name="terms" defaultChecked={v.terms} className="choice mt-1" aria-invalid={Boolean(errors.terms)} />
            <span>
              I accept the{' '}
              <Link href="/terms" target="_blank" className="underline underline-offset-4">
                terms
              </Link>{' '}
              and{' '}
              <Link href="/privacy" target="_blank" className="underline underline-offset-4">
                privacy policy
              </Link>
              .
            </span>
          </label>
          {errors.terms ? <p className="text-[0.9375rem] font-medium text-error">{errors.terms}</p> : null}
        </div>
      </Group>

      <div className="border-t border-ink/15 pt-8">
        <button
          type="submit"
          disabled={pending}
          className={cx(
            'inline-flex min-h-[3.25rem] w-full items-center justify-center btn-ink rounded-[0.95rem] px-7 py-3.5 font-medium text-canvas transition-colors hover:bg-ink-deep sm:w-auto',
            pending && 'cursor-wait opacity-70',
          )}
        >
          {pending ? 'Booking…' : method === 'card' ? 'Continue to card payment' : 'Book and get bank details'}
        </button>
        <p className="mt-3 text-[0.9375rem] text-ink/70">
          {method === 'card'
            ? 'You’ll pay securely with Stripe. Your place is reserved once the payment goes through.'
            : 'Your place is reserved once we’ve received your transfer and confirmed it by email.'}
        </p>
      </div>
    </form>
  )
}
