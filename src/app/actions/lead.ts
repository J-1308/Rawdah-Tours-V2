'use server'

import { sendLeadAcknowledgement, sendLeadToOwner } from '@/lib/server/email'
import { keepLead } from '@/lib/server/leads'
import { addToSheet } from '@/lib/server/sheet'
import { trackServer } from '@/lib/server/track'

/** One save of a step-by-step form (src/app/_site/step-form.tsx). Sent at step 1, after each step, and at the end. */
export type LeadInput = {
  id: string
  form: 'group' | 'private' | 'community' | 'hajj' | 'interest'
  trip: string
  step: number
  steps: number
  done: boolean
  name: string
  whatsapp: string
  email: string
  answers: Record<string, string>
  itinerary: boolean
  reminderOptOut: boolean
  marketing: boolean
  page: string
  source: Record<string, string>
  website?: string
}

export type LeadResult = { ok: boolean; errors?: Record<string, string> }

const FORM_LABEL: Record<LeadInput['form'], string> = {
  group: 'Group trip',
  private: 'Private Umrah',
  community: 'Community group',
  hajj: 'Hajj',
  interest: 'Register interest',
}

const clip = (v: unknown, n = 300) => String(v ?? '').trim().slice(0, n)
const digits = (v: string) => v.replace(/\D/g, '')

export async function saveLead(raw: LeadInput): Promise<LeadResult> {
  if (clip(raw.website)) return { ok: true } // honeypot
  const id = clip(raw.id, 64).replace(/[^a-zA-Z0-9-]/g, '')
  const form = raw.form in FORM_LABEL ? raw.form : 'interest'
  const name = clip(raw.name, 80)
  const whatsapp = clip(raw.whatsapp, 30)
  const email = clip(raw.email, 120).toLowerCase()

  const errors: Record<string, string> = {}
  if (!name) errors.name = 'Please tell us your first name.'
  if (!whatsapp && !email) errors.contact = 'Add a WhatsApp number or an email. One is enough.'
  if (whatsapp && digits(whatsapp).length < 10) errors.whatsapp = 'That number looks too short. Please check it.'
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'That email doesn’t look right. Please check it.'
  if (!id) errors.contact = errors.contact ?? 'Something went wrong. Please try again.'
  if (Object.keys(errors).length) return { ok: false, errors }

  const answers = Object.fromEntries(Object.entries(raw.answers ?? {}).slice(0, 20).map(([k, v]) => [clip(k, 40), clip(v, 400)]))
  const source = Object.fromEntries(['utm_source', 'utm_medium', 'utm_campaign', 'landing_page', 'referrer'].map((k) => [k, clip(raw.source?.[k])]))
  const trip = clip(raw.trip, 80)
  const step = Math.max(1, Math.min(10, Number(raw.step) || 1))
  const status = raw.done ? 'completed' : `step ${step} of ${raw.steps}`
  const lead = {
    id, form: FORM_LABEL[form], trip, status, updatedAt: new Date().toISOString(),
    name, whatsapp, email, answers,
    itinerary: Boolean(raw.itinerary), reminderOptOut: Boolean(raw.reminderOptOut), marketing: Boolean(raw.marketing),
    page: clip(raw.page, 200), source,
  }
  const kept = await keepLead(id, lead)

  const summary = Object.entries(answers).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n')
  const came = [source.utm_source, source.utm_medium, source.utm_campaign].filter(Boolean).join(' / ') || source.referrer || 'Direct or unknown'
  const sheetRow = {
    receivedAt: lead.updatedAt,
    journey: `${FORM_LABEL[form]}${trip ? `: ${trip}` : ''} (${raw.done ? 'completed' : 'started'})`,
    name, email, phone: whatsapp, travellers: answers['Travellers'] ?? answers['Pilgrims'] ?? answers['Adults'] ?? '',
    travellingFrom: answers['Flying from'] ?? '', message: summary, marketingConsent: lead.marketing, page: lead.page,
    utmSource: source.utm_source, utmMedium: source.utm_medium, utmCampaign: source.utm_campaign, landingPage: source.landing_page, referrer: source.referrer,
  }
  const rows: Array<[string, string]> = [
    ['Name', name], ['WhatsApp', whatsapp], ['Email', email], ...Object.entries(answers),
    ['Full itinerary requested', lead.itinerary ? 'Yes' : ''], ['Came from', came], ['First page', source.landing_page],
  ]

  // Step 1: the lead exists, so Rawdah hears straight away. The end: the full answers.
  if (step === 1 && !raw.done) {
    await trackServer('lead_started', { form, trip })
    await Promise.allSettled([
      addToSheet(sheetRow),
      sendLeadToOwner(`Started: ${FORM_LABEL[form]}${trip ? `, ${trip}` : ''}, ${name}`, `${name} has started the ${FORM_LABEL[form].toLowerCase()} form. They may finish it; if not, they're worth a message.`, rows, whatsapp, email || undefined),
    ])
  }
  if (raw.done) {
    await trackServer(form === 'hajj' || form === 'interest' ? 'interest_registered' : 'enquiry_sent', { form, trip })
    if (lead.itinerary) await trackServer('itinerary_requested', { trip })
    await Promise.allSettled([
      addToSheet(sheetRow),
      sendLeadToOwner(`Completed: ${FORM_LABEL[form]}${trip ? `, ${trip}` : ''}, ${name}`, `${name} finished the ${FORM_LABEL[form].toLowerCase()} form.${lead.itinerary ? ' They asked for the full itinerary.' : ''}`, rows, whatsapp, email || undefined),
      email ? sendLeadAcknowledgement(email, name, lead.itinerary ? 'Thank you. The Rawdah Tours team has your details and will send you the full itinerary shortly.' : 'Thank you. The Rawdah Tours team has your details and will be in touch soon.') : Promise.resolve(),
    ])
  }
  return { ok: kept.ok || true }
}
