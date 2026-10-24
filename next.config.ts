import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Next 16 only allows quality 75 unless listed here.
    qualities: [75, 85],
  },
  /** The live site's addresses, so old links and search results land on the new pages. */
  async redirects() {
    return [
      { source: '/hajj', destination: '/trips/hajj-2027', permanent: true },
      { source: '/umrah', destination: '/trips/next-umrah', permanent: true },
      { source: '/book', destination: '/trips/next-umrah', permanent: false },
      { source: '/book/:path*', destination: '/trips/next-umrah', permanent: false },
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
}

export default nextConfig
