import { Resend } from 'resend'
import { configured } from './config'
import { CONTACT, SITE_NAME, whatsappLink } from '@/lib/site'
import { formatPence } from '@/lib/trips'

let resend: Resend | null = null
function getResend() {
  if (!configured.email()) return null
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY)
  return resend
}

const FROM = () => process.env.EMAIL_FROM || 'Rawdah Tours <noreply@rawdahtours.co.uk>'
const OWNER = () => process.env.EMAIL_OWNER_TO || CONTACT.email

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string)
}

function firstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0] ?? ''
}

// ── Layout ─────────────────────────────────────────────────────────────────────

const C = { ground: '#FBF9F5', text: '#2E2020', muted: '#6B5E57', rule: '#E6DCCB', palm: '#2D4A3A', sand: '#F3EBDD' }

function layout(title: string, body: string) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:${C.ground};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.ground};padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:${C.text};font-size:15px;line-height:1.65;">
<tr><td style="padding:0 0 24px;font-family:Georgia,'Times New Roman',serif;font-size:20px;letter-spacing:0.02em;">${SITE_NAME}</td></tr>
<tr><td style="padding:28px 0;border-top:1px solid ${C.rule};">${body}</td></tr>
<tr><td style="padding:20px 0 0;border-top:1px solid ${C.rule};font-size:13px;color:${C.muted};">
WhatsApp or call <a href="${CONTACT.phoneHref}" style="color:${C.text};">${CONTACT.phoneDisplay}</a> · <a href="mailto:${CONTACT.email}" style="color:${C.text};">${CONTACT.email}</a>
</td></tr>
</table></td></tr></table></body></html>`
}

function p(text: string) {
  return `<p style="margin:0 0 16px;">${text}</p>`
}

function table(rows: Array<[string, string | number | null | undefined]>) {
  const tr = rows
    .filter(([, v]) => v !== null && v !== undefined && v !== '')
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px 8px 0;border-bottom:1px solid ${C.rule};color:${C.muted};vertical-align:top;white-space:nowrap;">${escapeHtml(k)}</td><td style="padding:8px 0;border-bottom:1px solid ${C.rule};vertical-align:top;">${escapeHtml(String(v))}</td></tr>`,
    )
    .join('')
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 24px;font-size:14px;">${tr}</table>`
}

async function send(to: string, subject: string, html: string, replyTo?: string) {
  const client = getResend()
  if (!client) return { ok: false as const, reason: 'not-configured' as const }
  const { error } = await client.emails.send({ from: FROM(), to, subject, html, replyTo })
  if (error) {
    console.error('[email] send failed:', subject, error.message)
    return { ok: false as const, reason: 'failed' as const }
  }
  return { ok: true as const }
}

// ── Enquiries ──────────────────────────────────────────────────────────────────

export type EnquiryEmail = {
  journeyLabel: string
  fullName: string
  email: string
  phone: string
  travellers: number
  travellingFrom: string
  message: string
  marketingConsent: boolean
}

export function sendEnquiryToOwner(d: EnquiryEmail) {
  const body =
    p(`New interest registered for <strong>${escapeHtml(d.journeyLabel)}</strong>.`) +
    table([
      ['Name', d.fullName],
      ['Email', d.email],
      ['Phone', d.phone],
      ['Travellers', d.travellers],
      ['Travelling from', d.travellingFrom],
      ['Updates by email', d.marketingConsent ? 'Yes' : 'No'],
    ]) +
    (d.message ? p(`<strong>Message</strong><br>${escapeHtml(d.message).replace(/\n/g, '<br>')}`) : '') +
    p(`<a href="${whatsappLink()}" style="color:${C.palm};">Open WhatsApp</a>`)
  return send(OWNER(), `Interest: ${d.journeyLabel} — ${d.fullName}`, layout('New interest', body), d.email)
}

export function sendEnquiryAcknowledgement(d: EnquiryEmail) {
  const body =
    p('Assalamu alaykum ' + escapeHtml(firstName(d.fullName)) + ',') +
    p(
      `Thank you for registering your interest in <strong>${escapeHtml(d.journeyLabel)}</strong> with Rawdah Tours. Someone from the team will be in touch, in sha Allah.`,
    ) +
    p('Registering does not reserve a place or commit you to anything.') +
    p(`If you'd like to talk sooner, message us on <a href="${whatsappLink()}" style="color:${C.palm};">WhatsApp</a>.`) +
    p('Rawdah Tours')
  return send(d.email, 'We’ve received your interest — Rawdah Tours', layout('Interest received', body))
}

// ── Bookings ───────────────────────────────────────────────────────────────────

export type BookingEmail = {
  bookingId: string
  tripName: string
  tripDates: string
  fullName: string
  email: string
  phone: string
  gender: string
  age: number
  citizenship: string
  roomLabel: string
  totalPence: number
  depositPence: number
  balancePence: number
  balancePlan: string
  paymentMethod: 'card' | 'bank_transfer'
  emergencyContact: string
  medicalInfo: string | null
}

function bookingSummary(d: BookingEmail) {
  return table([
    ['Trip', d.tripName],
    ['Dates', d.tripDates],
    ['Room', d.roomLabel],
    ['Package price', formatPence(d.totalPence)],
    ['Deposit', formatPence(d.depositPence)],
    ['Balance after deposit', formatPence(d.balancePence)],
    ['Booking reference', d.bookingId.slice(0, 8).toUpperCase()],
  ])
}

export function sendDepositConfirmation(d: BookingEmail) {
  const body =
    p('Assalamu alaykum ' + escapeHtml(firstName(d.fullName)) + ',') +
    p(`We’ve received your deposit and your place on <strong>${escapeHtml(d.tripName)}</strong> is reserved, in sha Allah.`) +
    bookingSummary(d) +
    p(escapeHtml(d.balancePlan)) +
    p('We’ll be in touch with your payment schedule, preparation details and visa steps.') +
    p('Rawdah Tours')
  return send(d.email, `Your place is reserved — ${d.tripName}`, layout('Place reserved', body))
}

export function sendBankTransferInstructions(d: BookingEmail, bank: { accountName: string; sortCode: string; accountNumber: string }) {
  const ref = d.bookingId.slice(0, 8).toUpperCase()
  const body =
    p('Assalamu alaykum ' + escapeHtml(firstName(d.fullName)) + ',') +
    p(`Thank you for booking <strong>${escapeHtml(d.tripName)}</strong>. To reserve your place, transfer the deposit using the details below.`) +
    table([
      ['Amount', formatPence(d.depositPence)],
      ['Account name', bank.accountName],
      ['Sort code', bank.sortCode],
      ['Account number', bank.accountNumber],
      ['Reference', ref],
    ]) +
    p('Your place is reserved once we’ve received the transfer and confirmed it by email.') +
    bookingSummary(d) +
    p('Rawdah Tours')
  return send(d.email, `Complete your deposit — ${d.tripName}`, layout('Bank transfer details', body))
}

export function sendBookingToOwner(d: BookingEmail, kind: 'deposit-paid' | 'awaiting-transfer') {
  const heading = kind === 'deposit-paid' ? 'Deposit paid by card.' : 'Bank transfer booking, awaiting payment.'
  const body =
    p(`<strong>${heading}</strong>`) +
    table([
      ['Name', d.fullName],
      ['Email', d.email],
      ['Phone', d.phone],
      ['Gender', d.gender],
      ['Age', d.age],
      ['Citizenship', d.citizenship],
      ['Emergency contact', d.emergencyContact],
      ['Medical notes', d.medicalInfo ?? 'None given'],
    ]) +
    bookingSummary(d)
  const subject = kind === 'deposit-paid' ? `Booking confirmed — ${d.fullName}` : `Awaiting bank transfer — ${d.fullName}`
  return send(OWNER(), subject, layout('New booking', body), d.email)
}
