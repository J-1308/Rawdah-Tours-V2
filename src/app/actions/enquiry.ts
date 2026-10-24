'use server'

import { getSupabase } from '@/lib/server/supabase'
import { sendEnquiryAcknowledgement, sendEnquiryToOwner } from '@/lib/server/email'
import { whatsappLink } from '@/lib/site'
import { JOURNEY_LABELS, type EnquiryState, type EnquiryValues, type Journey } from '@/lib/enquiry'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function read(formData: FormData): EnquiryValues {
  const s = (k: string) => String(formData.get(k) ?? '').trim()
  const journey = s('journey') as Journey
  return {
    journey: journey in JOURNEY_LABELS ? journey : 'not-sure',
    fullName: s('fullName').slice(0, 120),
    email: s('email').toLowerCase().slice(0, 200),
    phone: s('phone').slice(0, 40),
    travellers: s('travellers') || '1',
    travellingFrom: s('travellingFrom').slice(0, 120),
    message: s('message').slice(0, 2000),
    marketingConsent: formData.get('marketingConsent') === 'on',
  }
}

function validate(v: EnquiryValues) {
  const errors: Partial<Record<keyof EnquiryValues, string>> = {}
  if (v.fullName.length < 2) errors.fullName = 'Enter your full name.'
  if (!EMAIL_RE.test(v.email)) errors.email = 'Enter an email address like name@example.com.'
  const digits = v.phone.replace(/\D/g, '')
  if (digits.length < 7 || digits.length > 15) errors.phone = 'Enter a phone or WhatsApp number, including the country code if you’re outside the UK.'
  const n = Number(v.travellers)
  if (!Number.isInteger(n) || n < 1 || n > 30) errors.travellers = 'Enter how many people are travelling, from 1 to 30.'
  return errors
}

function whatsappFallback(v: EnquiryValues) {
  const lines = [
    `Assalamu alaykum, I'd like to register my interest in ${JOURNEY_LABELS[v.journey]}.`,
    `Name: ${v.fullName}`,
    `Travellers: ${v.travellers}`,
    v.travellingFrom ? `Travelling from: ${v.travellingFrom}` : '',
    v.message ? `Message: ${v.message}` : '',
  ].filter(Boolean)
  return whatsappLink(lines.join('\n'))
}

export async function submitEnquiry(prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const key = prev.key + 1

  // Honeypot: real people never fill this hidden field.
  if (String(formData.get('website') ?? '').trim() !== '') {
    return { status: 'success', key, firstName: '', journeyLabel: '' }
  }

  const values = read(formData)
  const errors = validate(values)
  if (Object.keys(errors).length > 0) return { status: 'invalid', key, errors, values }

  const travellers = Number(values.travellers)
  const journeyLabel = JOURNEY_LABELS[values.journey]
  let delivered = false

  const supabase = getSupabase()
  if (supabase) {
    const { error } = await supabase.from('enquiries').insert({
      journey: values.journey,
      full_name: values.fullName,
      email: values.email,
      phone: values.phone,
      travellers,
      travelling_from: values.travellingFrom || null,
      message: values.message || null,
      marketing_consent: values.marketingConsent,
      page: String(formData.get('page') ?? '').slice(0, 200) || null,
    })
    if (error) console.error('[enquiry] insert failed:', error.message)
    else delivered = true
  }

  const emailData = { ...values, travellers, journeyLabel }
  const owner = await sendEnquiryToOwner(emailData)
  if (owner.ok) {
    delivered = true
    await sendEnquiryAcknowledgement(emailData)
  }

  if (!delivered) {
    return { status: 'unavailable', key, values, whatsapp: whatsappFallback(values) }
  }

  return { status: 'success', key, firstName: values.fullName.split(/\s+/)[0] ?? '', journeyLabel }
}
