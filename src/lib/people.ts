// Only facts that have been published by Rawdah (V1 site, the Path of Purity II
// poster, or the live Hajj page). No invented biographies or quotes.

export type Person = {
  slug: string
  name: string
  role: string
  /** One line of fact, or null if nothing has been published beyond the role. */
  note: string | null
  photo: { src: string; position?: string } | null
  journeys: Array<'hajj' | 'umrah'>
}

export const PEOPLE: Person[] = [
  {
    slug: 'ayuub-mohamed-musa',
    name: 'Brother Ayuub Mohamed Musa',
    role: 'Group leader',
    note: 'Looks after the group from the first message to the flight home.',
    photo: { src: '/images/people/ayuub-mohamed-musa.jpg', position: '50% 30%' },
    journeys: ['hajj', 'umrah'],
  },
  {
    slug: 'abu-abdulaziz-ahmed',
    name: 'Ustadh Abu Abdulaziz Ahmed',
    role: 'Hajj guide',
    note: 'A graduate of King Saud University and a student of Shaykh Dr. Saʿd al-Shithri.',
    photo: null,
    journeys: ['hajj'],
  },
  {
    slug: 'issa-uthman',
    name: 'Ustadh Issa Uthman',
    role: 'Tour guide and teacher',
    note: 'Guided and taught on Path of Purity II, our August 2026 Umrah.',
    photo: { src: '/images/people/issa-uthman.jpg', position: '40% 35%' },
    journeys: ['umrah'],
  },
  {
    slug: 'abdulrahman-hassan',
    name: 'Ustadh Abdulrahman Hassan',
    role: 'Tour guide and teacher',
    note: 'Guided and taught on Path of Purity II, our August 2026 Umrah.',
    photo: { src: '/images/people/abdulrahman-hassan.jpg', position: '40% 40%' },
    journeys: ['umrah'],
  },
]

export function peopleFor(journey: 'hajj' | 'umrah') {
  return PEOPLE.filter((p) => p.journeys.includes(journey))
}

export function initials(name: string) {
  const parts = name.replace(/^(Brother|Ustadh|Shaykh)\s+/i, '').split(/\s+/)
  return (parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')
}
