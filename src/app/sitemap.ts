import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { openUmrahTrips } from '@/lib/trips'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/hajj', '/umrah', '/register', '/about', '/contact', '/privacy', '/terms', '/cookies']
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: 'weekly' as const, priority: p === '' ? 1 : 0.7 })),
    ...openUmrahTrips().map((t) => ({ url: `${SITE_URL}/umrah/book/${t.slug}`, changeFrequency: 'weekly' as const, priority: 0.6 })),
  ]
}
