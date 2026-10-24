'use client'

import Link from 'next/link'
import { useActionState, useEffect, useRef, useState } from 'react'
import type { BookingState, BookingValues } from '@/lib/booking'
import { ChatIcon } from '@/components/icons'
import { cx } from '@/components/ui'
import { WHATSAPP_MESSAGES, whatsappLink } from '@/lib/site'

type Room = { id: string; label: string; occupancy: number; price: string }

function Field({ id, label, hint, error, optional, children }: { id: string; label: string; hint?: string; error?: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block font-semibold">
        {label}
        {optional ? <span className="font-normal text-dust"> (optional)</span> : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-[0.9375rem] text-dust">
          {hint}
        </p>
      ) : null}
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-[0.9375rem] font-semibold text-henna">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-ajwa/15 pt-8">
      <legend className="float-left mb-6 w-full font-serif text-[1.75rem] leading-tight">{title}</legend>
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
          <div role="alert" className="rounded-md border border-henna/40 bg-ihram p-4 font-semibold text-henna">
            Check the highlighted details and try again.
          </div>
        ) : null}
        {state.status === 'blocked' || state.status === 'unavailable' ? (
          <div role="alert" className="rounded-md border border-ajwa/20 bg-ihram p-5">
            <p className="font-semibold">{state.message}</p>
            <a
              href={whatsappLink(WHATSAPP_MESSAGES.booking)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-12 items-center gap-2 rounded-md bg-palm px-5 py-3 font-semibold text-ihram hover:bg-palm-deep"
            >
              <ChatIcon /> Message us on WhatsApp
            </a>
          </div>
        ) : null}
      </div>

      <fieldset>
        <legend className="mb-2 font-serif text-[1.75rem] leading-tight">Room</legend>
        <p className="mb-5 text-dust">Prices are per person. Solo travellers share with travellers of the same gender.</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {rooms.map((r) => (
            <label
              key={r.id}
              className="flex cursor-pointer flex-col gap-1 rounded-md border border-ajwa/15 bg-ihram p-4 transition-colors hover:border-ajwa/40 has-[:checked]:border-palm has-[:checked]:shadow-[inset_0_0_0_1px_var(--color-palm)]"
            >
              <span className="flex items-center gap-3">
                <input type="radio" name="roomId" value={r.id} defaultChecked={v.roomId === r.id} className="choice" required />
                <span className="font-semibold">{r.label}</span>
              </span>
              <span className="pl-[1.875rem] text-dust">Sharing between {r.occupancy}</span>
              <span className="pl-[1.875rem] font-serif text-[1.5rem]">{r.price}</span>
            </label>
          ))}
        </div>
        {errors.roomId ? <p className="mt-2 text-[0.9375rem] font-semibold text-henna">{errors.roomId}</p> : null}
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
            <span className="block font-semibold" id="bk-gender-label">
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
            {errors.gender ? <p className="mt-2 text-[0.9375rem] font-semibold text-henna">{errors.gender}</p> : null}
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
          <label className="flex cursor-pointer items-start gap-3 rounded-md border border-ajwa/15 bg-ihram p-4 has-[:checked]:border-palm has-[:checked]:shadow-[inset_0_0_0_1px_var(--color-palm)]">
            <input type="radio" name="paymentMethod" value="card" checked={method === 'card'} onChange={() => setMethod('card')} className="choice mt-0.5" />
            <span>
              <span className="block font-semibold">Card, online now</span>
              <span className="mt-1 block text-dust">
                {depositWithFee} today ({deposit} deposit + {cardFee} card fee)
              </span>
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-3 rounded-md border border-ajwa/15 bg-ihram p-4 has-[:checked]:border-palm has-[:checked]:shadow-[inset_0_0_0_1px_var(--color-palm)]">
            <input
              type="radio"
              name="paymentMethod"
              value="bank_transfer"
              checked={method === 'bank_transfer'}
              onChange={() => setMethod('bank_transfer')}
              className="choice mt-0.5"
            />
            <span>
              <span className="block font-semibold">Bank transfer</span>
              <span className="mt-1 block text-dust">{deposit} deposit, no fee. We email you the details.</span>
            </span>
          </label>
        </div>

        <div className="space-y-4 pt-2">
          <label className="flex items-start gap-3">
            <input type="checkbox" name="accurate" defaultChecked={v.accurate} className="choice mt-1" aria-invalid={Boolean(errors.accurate)} />
            <span>My details are accurate and match my passport.</span>
          </label>
          {errors.accurate ? <p className="text-[0.9375rem] font-semibold text-henna">{errors.accurate}</p> : null}
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
          {errors.terms ? <p className="text-[0.9375rem] font-semibold text-henna">{errors.terms}</p> : null}
        </div>
      </Group>

      <div className="border-t border-ajwa/15 pt-8">
        <button
          type="submit"
          disabled={pending}
          className={cx(
            'inline-flex min-h-12 w-full items-center justify-center rounded-md bg-ajwa px-6 py-3 font-semibold text-ihram transition-colors hover:bg-ajwa-soft sm:w-auto',
            pending && 'cursor-wait opacity-70',
          )}
        >
          {pending ? 'Reserving…' : method === 'card' ? 'Continue to card payment' : 'Reserve and get bank details'}
        </button>
        <p className="mt-3 text-[0.9375rem] text-dust">
          {method === 'card'
            ? 'You’ll pay securely with Stripe. Your place is reserved once the payment goes through.'
            : 'Your place is reserved once we’ve received your transfer and confirmed it by email.'}
        </p>
      </div>
    </form>
  )
}
