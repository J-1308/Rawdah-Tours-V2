import type { MetadataRoute } from 'next'

import { IS_LIVE, SITE_URL } from '@/lib/site'

// Closed everywhere except the live domain (see IS_LIVE). Booking, checkout and admin pages are never indexed.
export default function robots(): MetadataRoute.Robots {
  if (!IS_LIVE) return { rules: { userAgent: '*', disallow: '/' } }
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/booking', '/trips/*/book', '/api'] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
