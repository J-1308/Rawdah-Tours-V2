import { createHash, timingSafeEqual } from 'node:crypto'

// A password over the whole site, for while it's kept private (Jibril, 1 Nov 2026). On only when SITE_PASSWORD is
// set in Vercel; remove the variable and redeploy to open the site again. Visitors type the password once on /gate
// and a cookie keeps them in for 30 days. Changing the password signs everyone out.

export const GATE_COOKIE = 'rawdah_gate'
export const GATE_MAX_AGE = 60 * 60 * 24 * 30

export const gateOn = () => Boolean(process.env.SITE_PASSWORD)

/** The cookie value: a hash of the password, so the password itself is never stored in the browser. */
export function gateToken() {
  return createHash('sha256').update(`rawdah-gate:${process.env.SITE_PASSWORD ?? ''}`).digest('hex')
}

function same(a: string, b: string) {
  const x = Buffer.from(a)
  const y = Buffer.from(b)
  return x.length === y.length && timingSafeEqual(x, y)
}

export const gatePasses = (cookie: string | undefined) => Boolean(cookie) && same(cookie as string, gateToken())
export const passwordMatches = (typed: string) => same(typed.trim(), (process.env.SITE_PASSWORD ?? '').trim())

/** Only ever send people back to a page on this site. */
export const safeNext = (next: unknown) => (typeof next === 'string' && next.startsWith('/') && !next.startsWith('//') ? next : '/')
