import { createHash } from 'node:crypto'

import { Resend } from 'resend'

import { bankDetails, configured } from './config'
import { escapeHtml as esc } from './email'
import { COMPANY, CONTACT, SITE_URL, whatsappLink } from '@/lib/site'
import { formatDateRange, formatPence, TRIPS, type Trip } from '@/lib/trips'

/**
 * A booking request from the trip page's form (Ramadan Umrah 2027; Jibril, 19 Nov 2026). The structure follows the
 * best trip sites' flow: a reference for the booking, the visitor's confirmation (their booking, what it costs, the
 * deposit and how to pay it by bank transfer, what happens next) and the team's alert (everything, with one-tap
 * WhatsApp, call and email). Rawdah's own words and look. Payments are by bank transfer only: no card link.
 * Bank details come from BANK_ACCOUNT_NAME, BANK_SORT_CODE and BANK_ACCOUNT_NUMBER in Vercel, never the code; until
 * they are set, the confirmation says the details follow when the team confirms the place.
 */

export type BookingRequest = {
  id: string
  trip: string
  name: string
  whatsapp: string
  email: string
  answers: Record<string, string>
  came: string
}

/** A short reference people can quote, the same every time for one booking (from its id). */
export function bookingRef(id: string) {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const bytes = createHash('sha256').update(id).digest()
  return `RT-${Array.from(bytes.subarray(0, 6), (b) => alphabet[b % alphabet.length]).join('')}`
}

/** The trip and the chosen package, from the server's single price list (never the browser's figures). */
function priced(r: BookingRequest) {
  const trip: Trip | undefined = TRIPS.find((t) => t.name === r.trip || t.name.endsWith(`: ${r.trip}`))
  const rooms = trip?.pricing?.rooms ?? []
  const pkg = r.answers['Package'] ?? ''
  const room = rooms.find((x) => pkg.startsWith(`${x.label},`))
  const count = /^\d+$/.test(r.answers['Travellers'] ?? '') ? Number(r.answers['Travellers']) : null
  const deposit = trip?.pricing?.depositPence ?? null
  return { trip, room, count, deposit, travellers: r.answers['Travellers'] ?? '', sharing: r.answers['Sharing'] ?? '' }
}

const when = () => new Date().toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Europe/London' })
const first = (name: string) => name.trim().split(/\s+/)[0] ?? ''
const waTo = (phone: string) => {
  const d = phone.replace(/\D/g, '').replace(/^0(?=7)/, '44')
  return d.length >= 10 ? `https://wa.me/${d}` : ''
}

// ── The email's look: Rawdah's cocoa bar and logo, the poster's olive for buttons and the reference ─────────────────

const K = { page: '#F4F0E8', card: '#FFFFFF', ink: '#2E2020', body: '#4A3F3A', muted: '#7A6D66', line: '#E8E0D2', cocoa: '#2B1F1C', olive: '#545234', sand: '#F1ECDF' }
const SANS = "-apple-system,'Segoe UI',Helvetica,Arial,sans-serif"
const SERIF = "Georgia,'Times New Roman',serif"

type Section = { title: string; rows: [string, string][] }

function emailHtml(o: {
  preheader: string
  kicker: string
  title: string
  intro: string[]
  ref?: { value: string; side?: [string, string] }
  buttons?: { label: string; href: string }[]
  bank?: [string, string][]
  sections: Section[]
  next?: string[]
}) {
  const p = (t: string) => `<p style="margin:0 0 14px;font-family:${SANS};font-size:16px;line-height:1.65;color:${K.body}">${esc(t)}</p>`
  const rows = (r: [string, string][]) =>
    r
      .filter(([, v]) => v)
      .map(
        ([k, v]) =>
          `<tr><td style="padding:10px 0;border-top:1px solid ${K.line};font-family:${SANS};font-size:13px;color:${K.muted};width:40%;vertical-align:top">${esc(k)}</td><td style="padding:10px 0 10px 14px;border-top:1px solid ${K.line};font-family:${SANS};font-size:15px;color:${K.ink};vertical-align:top;white-space:pre-wrap">${esc(v)}</td></tr>`,
      )
      .join('')
  const block = (title: string, inner: string) =>
    `<tr><td style="padding:6px 32px 22px"><p style="margin:0 0 6px;font-family:${SANS};font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:700;color:${K.olive}">${esc(title)}</p>${inner}</td></tr>`
  const table = (r: [string, string][]) => `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">${rows(r)}</table>`
  const button = (b: { label: string; href: string }, i: number) =>
    `<a href="${esc(b.href)}" style="display:inline-block;margin:0 6px 10px 0;padding:14px 22px;border-radius:10px;font-family:${SANS};font-size:15px;font-weight:600;text-decoration:none;${i === 0 ? `background:${K.olive};color:#F1EEE6` : `background:${K.card};color:${K.ink};border:1px solid ${K.line}`}">${esc(b.label)}</a>`

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><title>${esc(o.title)}</title></head>
<body style="margin:0;padding:0;background:${K.page}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(o.preheader)}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${K.page};padding:28px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:${K.card};border-radius:16px;overflow:hidden">
<tr><td style="background:${K.cocoa};padding:20px 32px">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr>
<td><img src="${SITE_URL}/images/brand/logo-cream.png" width="120" alt="Rawdah Tours" style="display:block;height:auto;border:0"></td>
<td align="right" style="font-family:${SANS};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#D9CFAE">${esc(o.kicker)}</td>
</tr></table></td></tr>
<tr><td style="padding:30px 32px 6px"><h1 style="margin:0 0 14px;font-family:${SERIF};font-size:28px;line-height:1.2;font-weight:normal;color:${K.ink}">${esc(o.title)}</h1>${o.intro.map(p).join('')}</td></tr>
${
  o.ref
    ? `<tr><td style="padding:4px 32px 18px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${K.sand};border-radius:12px"><tr>
<td style="padding:16px 18px"><p style="margin:0;font-family:${SANS};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${K.muted}">Reference</p><p style="margin:4px 0 0;font-family:${SANS};font-size:22px;font-weight:700;letter-spacing:1px;color:${K.olive}">${esc(o.ref.value)}</p></td>
${o.ref.side ? `<td align="right" style="padding:16px 18px"><p style="margin:0;font-family:${SANS};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${K.muted}">${esc(o.ref.side[0])}</p><p style="margin:4px 0 0;font-family:${SANS};font-size:22px;font-weight:700;color:${K.ink}">${esc(o.ref.side[1])}</p></td>` : ''}
</tr></table></td></tr>`
    : ''
}
${o.buttons?.length ? `<tr><td style="padding:0 32px 14px">${o.buttons.map(button).join('')}</td></tr>` : ''}
${o.bank ? block('Pay your deposit by bank transfer', table(o.bank)) : ''}
${o.sections.map((s) => block(s.title, table(s.rows))).join('')}
${o.next?.length ? block('What happens next', o.next.map((t, i) => `<p style="margin:0 0 10px;font-family:${SANS};font-size:15px;line-height:1.55;color:${K.body}"><strong style="color:${K.olive}">${i + 1}.</strong> ${esc(t)}</p>`).join('')) : ''}
<tr><td style="padding:18px 32px 26px;border-top:1px solid ${K.line};font-family:${SANS};font-size:13px;line-height:1.6;color:${K.muted}">
WhatsApp or call <a href="${CONTACT.phoneHref}" style="color:${K.ink}">${CONTACT.phoneDisplay}</a> · <a href="mailto:${CONTACT.email}" style="color:${K.ink}">${CONTACT.email}</a><br>
${esc(COMPANY.legalName)}, ${esc(COMPANY.address)}
</td></tr>
</table></td></tr></table></body></html>`
}

function text(o: { title: string; intro: string[]; ref?: string; bank?: [string, string][]; sections: Section[]; next?: string[] }) {
  const sec = (s: Section) => [s.title.toUpperCase(), ...s.rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`)].join('\n')
  return [
    o.title,
    '',
    ...o.intro,
    o.ref ? `\nReference: ${o.ref}` : '',
    o.bank ? `\nPAY YOUR DEPOSIT BY BANK TRANSFER\n${o.bank.map(([k, v]) => `${k}: ${v}`).join('\n')}` : '',
    '',
    ...o.sections.map(sec).join('\n\n').split('\n'),
    o.next?.length ? `\nWHAT HAPPENS NEXT\n${o.next.map((t, i) => `${i + 1}. ${t}`).join('\n')}` : '',
    '',
    `WhatsApp or call ${CONTACT.phoneDisplay} · ${CONTACT.email}`,
    `${COMPANY.legalName}, ${COMPANY.address}`,
  ].join('\n')
}

// ── Sending ────────────────────────────────────────────────────────────────────────────────────────────────────────

let client: Resend | null = null
const FROM = () => process.env.EMAIL_FROM || 'Rawdah Tours <bookings@rawdahtours.co.uk>'
const OWNER = () => process.env.EMAIL_OWNER_TO || CONTACT.email

async function send(m: { to: string; subject: string; html: string; text: string; replyTo?: string; key: string }) {
  if (!configured.email()) return { ok: false as const }
  client ??= new Resend(process.env.RESEND_API_KEY)
  // The key stops a retried submit sending the same email twice.
  const { error } = await client.emails.send({ from: FROM(), to: m.to, subject: m.subject, html: m.html, text: m.text, replyTo: m.replyTo }, { idempotencyKey: m.key })
  if (error) {
    console.error('[booking-request] send failed:', m.subject, error.message)
    return { ok: false as const }
  }
  return { ok: true as const }
}

/** The pieces both emails share. */
function bookingSections(r: BookingRequest, ref: string) {
  const { trip, room, count, deposit, travellers, sharing } = priced(r)
  const each = room ? formatPence(room.pricePence) : ''
  const total = room && count ? formatPence(room.pricePence * count) : ''
  const depositEach = deposit ? formatPence(deposit) : ''
  const depositTotal = deposit && count ? formatPence(deposit * count) : depositEach
  const dates = trip ? formatDateRange(trip.startDate, trip.endDate) : ''
  const schedule = (room?.schedule ?? []).map(({ due, pence }) => [due.replace(/, final$/i, ' (final)'), `${formatPence(pence)} per person`] as [string, string])
  const booking: Section = {
    title: 'Your booking',
    rows: [
      ['Trip', r.trip],
      ['Dates', dates],
      ['Package', room?.label ?? (r.answers['Package'] || 'Not sure yet')],
      ['Price per person', each],
      ['Travellers', travellers],
      ['Total', total],
      ['Sharing a room with', sharing],
      ['Reference', ref],
    ],
  }
  const paying: Section = {
    title: 'Paying',
    rows: [['Deposit', count && count > 1 ? `${depositEach} per person (${depositTotal})` : depositEach], ...schedule.filter(([k]) => !/^deposit/i.test(k))],
  }
  return { booking, paying, depositTotal, depositEach, label: room?.label ?? '', count, dates, summary: trip?.summary ?? '' }
}

/** The visitor's confirmation. Sent only when they gave an email. */
export function buildBookingConfirmation(r: BookingRequest) {
  const ref = bookingRef(r.id)
  const { booking, paying, depositTotal, dates, summary } = bookingSections(r, ref)
  const bank = bankDetails()
  const name = first(r.name)
  const title = name ? `Thank you, ${name}. We have your booking request.` : 'Thank you. We have your booking request.'
  const intro = [
    name ? `Assalamu alaykum ${name},` : 'Assalamu alaykum,',
    `You’ve asked to book ${r.trip}${dates ? `, ${dates}` : ''}.${summary ? ` ${summary}` : ''}`,
    bank
      ? `Your ${depositTotal} deposit holds your place. Pay it by bank transfer with the details below, using ${ref} as the reference. Deposits are non-refundable.`
      : `The Rawdah Tours team will confirm your place and send the bank details for your ${depositTotal} deposit. Deposits are non-refundable.`,
  ]
  const bankRows: [string, string][] | undefined = bank
    ? [['Account name', bank.accountName], ['Sort code', bank.sortCode], ['Account number', bank.accountNumber], ['Reference', ref], ['Amount', depositTotal]]
    : undefined
  const next = [
    'We’ll message or call you to confirm your place and answer any questions.',
    bank ? `Pay the ${depositTotal} deposit by bank transfer, with ${ref} as the reference.` : `Pay the ${depositTotal} deposit by bank transfer once we send the details.`,
    'Pay the rest on the dates above, all before you fly.',
  ]
  const sections = [booking, paying, { title: 'Your details', rows: [['Name', r.name], ['WhatsApp', r.whatsapp], ['Email', r.email]] as [string, string][] }]
  return {
    to: r.email,
    subject: `Your ${r.trip} booking request (${ref})`,
    html: emailHtml({
      preheader: `Reference ${ref}. ${bank ? `Your ${depositTotal} deposit holds your place.` : 'We’ll confirm your place and how to pay the deposit.'}`,
      kicker: r.trip,
      title,
      intro,
      ref: { value: ref, side: ['Deposit', depositTotal] },
      buttons: [{ label: 'Message us on WhatsApp', href: whatsappLink(`Assalamu alaykum, it’s about my ${r.trip} booking, ${ref}.`) }],
      bank: bankRows,
      sections,
      next,
    }),
    text: text({ title, intro, ref, bank: bankRows, sections, next }),
    replyTo: OWNER(),
    key: `${r.id}-confirmation`,
  }
}

export const sendBookingConfirmation = (r: BookingRequest) => send(buildBookingConfirmation(r))

/** The team's alert: everything, the reference, and one tap to WhatsApp, call or email them. */
export function buildBookingToTeam(r: BookingRequest) {
  const ref = bookingRef(r.id)
  const { booking, paying, depositTotal, label, count } = bookingSections(r, ref)
  const title = `New booking request: ${r.name}`
  const intro = [
    `${r.name} asked to book ${r.trip} on ${when()}: ${count ?? r.answers['Travellers'] ?? '?'} × ${label || r.answers['Package'] || 'package not chosen'}. Reference ${ref}.`,
    `Next: confirm their place and the ${depositTotal} deposit${bankDetails() ? ' (their email has the bank details)' : ' and send the bank details'}.`,
  ]
  const wa = waTo(r.whatsapp)
  const buttons = [
    ...(wa ? [{ label: 'WhatsApp them', href: wa }] : []),
    ...(r.whatsapp ? [{ label: 'Call them', href: `tel:${r.whatsapp.replace(/[^\d+]/g, '')}` }] : []),
    ...(r.email ? [{ label: 'Email them', href: `mailto:${r.email}?subject=${encodeURIComponent(`Your ${r.trip} booking, ${ref}`)}` }] : []),
  ]
  const others = Object.entries(r.answers).filter(([k, v]) => v && !['Package', 'Travellers', 'Sharing'].includes(k)) as [string, string][]
  const sections: Section[] = [
    { title: 'Contact', rows: [['Name', r.name], ['WhatsApp', r.whatsapp], ['Email', r.email || 'Not given']] },
    booking,
    paying,
    ...(others.length ? [{ title: 'Their other answers', rows: others }] : []),
    { title: 'Came from', rows: [['Source', r.came]] },
  ]
  return {
    to: OWNER(),
    subject: `Booking request ${ref}: ${r.name}, ${count ?? r.answers['Travellers'] ?? '?'} × ${label || 'package not chosen'}`,
    html: emailHtml({ preheader: `${r.name}, ${label}. Confirm their place and the deposit.`, kicker: 'Booking request', title, intro, ref: { value: ref, side: ['Deposit due', depositTotal] }, buttons, sections }),
    text: text({ title, intro, ref, sections }),
    replyTo: r.email || undefined,
    key: `${r.id}-team`,
  }
}

export const sendBookingToTeam = (r: BookingRequest) => send(buildBookingToTeam(r))
