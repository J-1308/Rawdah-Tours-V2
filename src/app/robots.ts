import type { MetadataRoute } from 'next'

// Nothing is indexed until launch (the root layout is noindex too). At launch,
// allow everything except /admin, /booking and the checkout pages, and add the sitemap.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', disallow: '/' } }
}
