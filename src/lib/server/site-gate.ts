import { createHash, timingSafeEqual } from 'node:crypto'

// A password over the whole site, for while it's kept private (Jibril, 1 Nov 2026). On only when SITE_PASSWORD is
// set in Vercel; remove the variable and redeploy to open the site again. Visitors type the password once on /gate
// and a cookie keeps them in for 30 days. Changing the password signs everyone out.

export const GATE_COOKIE = 'rawdah_gate'
export const GATE_MAX_AGE = 60 * 60 * 24 * 30

// Some pages stay private after the site opens (16 Nov 2026 review): the full Ramadan preview and Rawdah's
// questionnaire. With SITE_PASSWORD gone they need PRIVATE_PASSWORD, through the same /gate page; with neither set
// they don't exist (404), so they can never go public by accident.

export const gateOn = () => Boolean(process.env.SITE_PASSWORD)

/** The password /gate checks: the whole-site one while it's set, otherwise the private-pages one. */
export const gatePassword = () => process.env.SITE_PASSWORD || process.env.PRIVATE_PASSWORD || ''

export const isPrivatePath = (pathname: string) =>
  pathname === '/questionnaire' || pathname === '/questionnaire/' || /^\/trips\/[^/]+\/preview\/?$/.test(pathname)

/** The cookie value: a hash of the password, so the password itself is never stored in the browser. */
export function gateToken() {
  return createHash('sha256').update(`rawdah-gate:${gatePassword()}`).digest('hex')
}

function same(a: string, b: string) {
  const x = Buffer.from(a)
  const y = Buffer.from(b)
  return x.length === y.length && timingSafeEqual(x, y)
}

export const gatePasses = (cookie: string | undefined) => Boolean(gatePassword()) && Boolean(cookie) && same(cookie as string, gateToken())
export const passwordMatches = (typed: string) => Boolean(gatePassword().trim()) && same(typed.trim(), gatePassword().trim())

/** Only ever send people back to a page on this site. */
export const safeNext = (next: unknown) => (typeof next === 'string' && next.startsWith('/') && !next.startsWith('//') ? next : '/')
