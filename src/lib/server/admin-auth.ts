import { timingSafeEqual } from 'node:crypto'

function same(a: string, b: string) {
  const x = Buffer.from(a)
  const y = Buffer.from(b)
  return x.length === y.length && timingSafeEqual(x, y)
}

/** True when the Authorization header carries the /admin basic-auth login. */
export function isAdminRequest(authorization: string | null) {
  const password = process.env.ADMIN_PASSWORD
  if (!password || !authorization?.startsWith('Basic ')) return false
  const decoded = Buffer.from(authorization.slice(6), 'base64').toString('utf8')
  const sep = decoded.indexOf(':')
  if (sep < 0) return false
  return same(decoded.slice(0, sep), process.env.ADMIN_USER || 'rawdah') && same(decoded.slice(sep + 1), password)
}
