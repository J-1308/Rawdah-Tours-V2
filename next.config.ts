import { readdirSync } from 'node:fs'
import { join, relative } from 'node:path'

import type { NextConfig } from 'next'

/** Photos dropped into public/images/slots/, read once at build time (see src/app/_site/slots.ts). */
const slotFiles = (() => {
  try {
    return readdirSync('public/images/slots').filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).join(',')
  } catch {
    return ''
  }
})()

/**
 * Every photo's shape (width / height), read once at build time, so frames on the phone can follow the photo
 * instead of cutting a wide group photo down to its middle (see photoRatio in src/app/_site/slots.ts).
 */
async function photoRatios() {
  // sharp ships with Next for image optimisation; if it's ever missing, frames fall back to their default shape.
  const sharp = (await import('sharp').catch(() => null))?.default
  if (!sharp) return ''
  const root = 'public/images'
  const out: string[] = []
  const walk = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : /\.(jpe?g|png|webp)$/i.test(e.name) ? [join(dir, e.name)] : []))
  for (const f of walk(root)) {
    try {
      const m = await sharp(f).metadata()
      const turned = (m.orientation ?? 1) >= 5
      const w = turned ? m.height : m.width
      const h = turned ? m.width : m.height
      if (w && h) out.push(`${relative(root, f)}:${(w / h).toFixed(3)}`)
    } catch {
      // Not a photo sharp can read: it just keeps the frame's default shape.
    }
  }
  return out.join(';')
}

const nextConfig = async (): Promise<NextConfig> => ({
  env: { SLOT_FILES: slotFiles, PHOTO_RATIOS: await photoRatios() },
  images: {
    // Next 16 only allows quality 75 unless listed here.
    qualities: [75, 85],
  },
  /** The live site's addresses, so old links and search results land on the new pages. */
  async redirects() {
    return [
      { source: '/hajj', destination: '/trips/hajj-2027', permanent: true },
      { source: '/umrah', destination: '/trips/ramadan-umrah-2027', permanent: false },
      { source: '/book', destination: '/trips/ramadan-umrah-2027', permanent: false },
      { source: '/book/:path*', destination: '/trips/ramadan-umrah-2027', permanent: false },
      // The last trip no longer has a page: it lives on the home page.
      { source: '/trips/path-of-purity-ii', destination: '/#last-trip', permanent: false },
      // The next trip's page before it had dates (shared in October 2026).
      { source: '/trips/next-umrah', destination: '/trips/ramadan-umrah-2027', permanent: false },
      { source: '/family-booking', destination: '/private-umrah', permanent: true },
      { source: '/family-booking/:path*', destination: '/private-umrah', permanent: true },
      { source: '/contact', destination: '/about#contact', permanent: true },
      { source: '/register', destination: '/trips/hajj-2027#register-interest', permanent: false },
      { source: '/journeys', destination: '/trips', permanent: true },
      { source: '/journeys/:path*', destination: '/trips/:path*', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
})

export default nextConfig
