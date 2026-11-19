import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/site'
import { journeys } from '@/app/_site/content'
import { ONE_PAGE, ONE_PAGE_HOME } from '@/lib/site-mode'

export default function sitemap(): MetadataRoute.Sitemap {
  if (ONE_PAGE) {
    return [
      { url: `${SITE_URL}${ONE_PAGE_HOME}`, changeFrequency: 'weekly', priority: 1 },
      ...['/privacy', '/terms', '/cookies'].map((path) => ({ url: `${SITE_URL}${path}`, changeFrequency: 'yearly' as const, priority: 0.3 })),
    ]
  }
  const pages = ['', '/trips', '/private-umrah', '/groups', '/about', '/privacy', '/terms', '/cookies']
  return [
    ...pages.map((path) => ({ url: `${SITE_URL}${path}`, changeFrequency: 'monthly' as const, priority: path === '' ? 1 : 0.7 })),
    ...journeys.filter((j) => j.state !== 'past').map((j) => ({ url: `${SITE_URL}/trips/${j.slug}`, changeFrequency: 'weekly' as const, priority: 0.9 })),
  ]
}
