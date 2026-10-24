// Single source of truth for trips, dates and prices.
//
// To open bookings for a new Umrah: add a trip with status 'open' and its real
// prices, dates and deposit. Prices are only ever read on the server; the
// checkout never trusts a price sent from the browser.
//
// All money is in pence (GBP).

export type RoomOption = {
  id: string
  label: string
  /** People sharing the room */
  occupancy: number
  /** Per person, in pence */
  pricePence: number
}

export type TripStatus =
  | 'interest' // registering interest; no booking
  | 'open' // bookable on this site with a deposit
  | 'full' // was open, no places left
  | 'completed' // has run; kept for reference

export type Trip = {
  slug: string
  kind: 'umrah' | 'hajj'
  name: string
  status: TripStatus
  /** ISO dates (YYYY-MM-DD), or null if not confirmed */
  startDate: string | null
  endDate: string | null
  summary: string
  stays?: Array<{ city: 'Madinah' | 'Makkah'; nights: number; hotel: string; note?: string }>
  flights?: string
  inclusions?: string[]
  pricing?: {
    rooms: RoomOption[]
    depositPence: number
    /** Added to card payments only */
    cardFeePence: number
    /** Plain-language payment plan shown at booking and in emails */
    balancePlan: string
  }
  /** Maximum confirmed travellers. Undefined = no limit enforced by the site. */
  capacity?: number
}

export const TRIPS: Trip[] = [
  {
    slug: 'hajj-2027',
    kind: 'hajj',
    name: 'Hajj 2027',
    status: 'interest',
    startDate: null,
    endDate: null,
    summary:
      'Registering interest. Packages, prices and dates are published on the official Nusuk Hajj platform, where travellers book and pay directly.',
  },
  {
    // Source: V1 lib/pricing.ts, V1 terms (April 2026) and the trip poster.
    slug: 'path-of-purity-ii',
    kind: 'umrah',
    name: 'Path of Purity II: Summer Edition',
    status: 'completed',
    startDate: '2026-08-04',
    endDate: '2026-08-15',
    summary: 'Five nights in Madinah and five in Makkah with students of knowledge, flying from London Heathrow.',
    stays: [
      { city: 'Madinah', nights: 5, hotel: 'Peninsula Worth Hotel', note: 'A few minutes’ walk from Masjid an-Nabawi, breakfast included' },
      { city: 'Makkah', nights: 5, hotel: 'Address Jabal Omar', note: 'A few minutes’ walk from Masjid al-Haram, breakfast included' },
    ],
    flights: 'Return flights with Qatar Airways from London Heathrow',
    inclusions: [
      '5-star hotels in Madinah and Makkah, with breakfast',
      'Return flights with Qatar Airways from Heathrow',
      'Umrah visa and documentation support',
      'VIP coach transfers between the cities',
      'Guided ziyarah in Madinah and Makkah',
      'Umrah guided step by step, with ihram and a handbook provided',
      'Daily lessons and reminders from students of knowledge',
    ],
    pricing: {
      rooms: [
        { id: 'quad', label: 'Quad room', occupancy: 4, pricePence: 179900 },
        { id: 'triple', label: 'Triple room', occupancy: 3, pricePence: 183500 },
        { id: 'double', label: 'Double room', occupancy: 2, pricePence: 202500 },
      ],
      depositPence: 50000,
      cardFeePence: 800,
      balancePlan:
        'The balance was paid in instalments on 1 May, 1 June and 25 June 2026, with everything settled 40 days before departure.',
    },
  },
]

export function getTrip(slug: string) {
  return TRIPS.find((t) => t.slug === slug)
}

/**
 * Demo booking: on preview deployments and locally, the August 2026 trip can be
 * walked through the booking form so the flow can be reviewed. Never in production.
 */
export function bookingDemoEnabled() {
  if (process.env.VERCEL_ENV === 'production') return false
  return process.env.BOOKING_DEMO === 'true' || process.env.NODE_ENV === 'development'
}

export const DEMO_TRIP_SLUG = 'path-of-purity-ii'

/** Whether this trip can be booked on the site right now. */
export function isBookable(trip: Trip) {
  if (!trip.pricing) return false
  if (trip.status === 'open') return true
  return trip.slug === DEMO_TRIP_SLUG && bookingDemoEnabled()
}

export function isDemoBooking(trip: Trip) {
  return trip.status !== 'open' && trip.slug === DEMO_TRIP_SLUG && bookingDemoEnabled()
}

export function openUmrahTrips() {
  return TRIPS.filter((t) => t.kind === 'umrah' && t.status === 'open')
}

export function lastCompletedUmrah() {
  return [...TRIPS]
    .filter((t) => t.kind === 'umrah' && t.status === 'completed')
    .sort((a, b) => (b.startDate ?? '').localeCompare(a.startDate ?? ''))[0]
}

export function getRoom(trip: Trip, roomId: string) {
  return trip.pricing?.rooms.find((r) => r.id === roomId)
}

export function lowestPrice(trip: Trip) {
  const rooms = trip.pricing?.rooms ?? []
  return rooms.length ? Math.min(...rooms.map((r) => r.pricePence)) : null
}

export function formatPence(pence: number) {
  const pounds = pence / 100
  return `£${pounds.toLocaleString('en-GB', {
    minimumFractionDigits: pounds % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`
}

export function formatDateRange(start: string | null, end: string | null) {
  if (!start || !end) return 'Dates to be confirmed'
  const s = new Date(`${start}T12:00:00Z`)
  const e = new Date(`${end}T12:00:00Z`)
  const sameMonth = s.getUTCMonth() === e.getUTCMonth() && s.getUTCFullYear() === e.getUTCFullYear()
  const day = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', timeZone: 'UTC' })
  const full = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
  return sameMonth ? `${day(s)}–${full(e)}` : `${full(s)} – ${full(e)}`
}

export function tripLengthDays(trip: Trip) {
  if (!trip.startDate || !trip.endDate) return null
  const ms = new Date(`${trip.endDate}T12:00:00Z`).getTime() - new Date(`${trip.startDate}T12:00:00Z`).getTime()
  return Math.round(ms / 86_400_000) + 1
}
