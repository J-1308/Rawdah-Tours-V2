import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/site'
import { journeys } from '@/app/_site/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/trips', '/private-umrah', '/groups', '/about', '/privacy', '/terms', '/cookies']
  return [
    ...pages.map((path) => ({ url: `${SITE_URL}${path}`, changeFrequency: 'monthly' as const, priority: path === '' ? 1 : 0.7 })),
    ...journeys.filter((j) => j.state !== 'past').map((j) => ({ url: `${SITE_URL}/trips/${j.slug}`, changeFrequency: 'weekly' as const, priority: 0.9 })),
  ]
}
