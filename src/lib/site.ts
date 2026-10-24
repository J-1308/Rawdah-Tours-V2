// Single source for contact details and company facts.
// Sources: V1 lib/constants.ts and legal pages, the live Hajj page (Oct 2026),
// and the Path of Purity II poster (Instagram handle).

export const SITE_NAME = 'Rawdah Tours'

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rawdahtours.co.uk').replace(/\/$/, '')

export const CONTACT = {
  whatsappNumber: '447809281429',
  phoneDisplay: '+44 7809 281429',
  phoneHref: 'tel:+447809281429',
  email: 'rawdahtours@gmail.com',
  instagramHandle: '@rawdahtours',
  instagramUrl: 'https://www.instagram.com/rawdahtours/',
} as const

export const COMPANY = {
  legalName: 'Rawdah Tours Ltd',
  registeredIn: 'England and Wales',
  address: '5 Sir Denis Drive, Birmingham, England, B9 5DU',
} as const

export const NUSUK_HAJJ_URL = 'https://hajj.nusuk.sa/?language=en'

// The traveller onboarding app is a separate product. Shown only when set.
export const ONBOARDING_APP_URL = process.env.NEXT_PUBLIC_ONBOARDING_APP_URL || ''

/** wa.me link, optionally with a pre-filled first message. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${CONTACT.whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export const WHATSAPP_MESSAGES = {
  general: 'Assalamu alaykum, I have a question about travelling with Rawdah Tours.',
  hajj: 'Assalamu alaykum, I have a question about Hajj 2027 with Rawdah Tours.',
  umrah: 'Assalamu alaykum, I have a question about the next Umrah with Rawdah Tours.',
  booking: 'Assalamu alaykum, I need help with my booking.',
} as const

/** The date the "where things stand" notes were last checked. Update when facts change. */
export const STATUS_CHECKED = '24 October 2026'
