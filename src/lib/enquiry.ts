// Shared between the register-interest server action and the form.

export type Journey = 'hajj-2027' | 'umrah' | 'not-sure'

export const JOURNEY_LABELS: Record<Journey, string> = {
  'hajj-2027': 'Hajj 2027',
  umrah: 'Umrah',
  'not-sure': 'Not sure yet',
}

export type EnquiryValues = {
  journey: Journey
  fullName: string
  email: string
  phone: string
  travellers: string
  travellingFrom: string
  message: string
  marketingConsent: boolean
}

export type EnquiryState =
  | { status: 'idle'; key: number }
  | { status: 'invalid'; key: number; errors: Partial<Record<keyof EnquiryValues, string>>; values: EnquiryValues }
  | { status: 'unavailable'; key: number; values: EnquiryValues; whatsapp: string }
  | { status: 'success'; key: number; firstName: string; journeyLabel: string }
