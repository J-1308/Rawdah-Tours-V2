import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  // Only the production site is indexed. Previews are hidden from search engines.
  if (process.env.VERCEL_ENV !== 'production') {
    return { rules: { userAgent: '*', disallow: '/' } }
  }
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/booking', '/umrah/book'] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
