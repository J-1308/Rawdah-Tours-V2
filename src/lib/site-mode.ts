/**
 * One-page mode (Jibril, 19 Nov 2026): the site goes live with the Ramadan Umrah 2027 page only. The home page and
 * every other page redirect to it (307, not permanent, so the full site can come back); privacy, terms and cookies,
 * booking returns, the private pages and the API stay reachable. The header and footer show only this page.
 * Set ONE_PAGE to false to bring the full site back.
 */
export const ONE_PAGE = true

/** The one page. */
export const ONE_PAGE_HOME = '/trips/ramadan-umrah-2027'

/** Old addresses sent to the one page in one-page mode (next.config.ts). Never add /app-privacy, /app-terms or /support:
 * the Rawdah Tours app and App Store Connect link to them (HANDOFF.md). */
export const onePageRedirects = [
  '/',
  '/about',
  '/groups',
  '/private-umrah',
  '/trips',
  '/hajj',
  '/umrah',
  '/book',
  '/book/:path*',
  '/contact',
  '/register',
  '/family-booking',
  '/family-booking/:path*',
  '/journeys',
  '/journeys/:path*',
  // Every other trip page, and anything under it; the Ramadan page and its booking and preview pages stay.
  '/trips/:slug((?!ramadan-umrah-2027(?:/|$))[^/]+)',
  '/trips/:slug((?!ramadan-umrah-2027(?:/|$))[^/]+)/:rest*',
].map((source) => ({ source, destination: ONE_PAGE_HOME, permanent: false }))
