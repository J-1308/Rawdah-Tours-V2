import { NextResponse, type NextRequest } from 'next/server'
import { isAdminRequest } from '@/lib/server/admin-auth'
import { GATE_COOKIE, gateOn, gatePasses } from '@/lib/server/site-gate'

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  // Basic-auth gate for /admin. If ADMIN_PASSWORD isn't set, /admin doesn't exist.
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    if (!process.env.ADMIN_PASSWORD) return new NextResponse('Not found', { status: 404 })
    if (isAdminRequest(request.headers.get('authorization'))) return NextResponse.next()
    return new NextResponse('Sign in required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Rawdah admin", charset="UTF-8"' },
    })
  }

  // The site password (src/lib/server/site-gate.ts). Off unless SITE_PASSWORD is set.
  if (!gateOn()) return NextResponse.next()
  if (pathname === '/robots.txt') {
    return new NextResponse('User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain' } })
  }
  if (pathname === '/gate' || pathname.startsWith('/api/stripe')) {
    const res = NextResponse.next()
    res.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return res
  }
  if (gatePasses(request.cookies.get(GATE_COOKIE)?.value)) return NextResponse.next()
  const to = new URL('/gate', request.url)
  if (pathname !== '/') to.searchParams.set('next', pathname + search)
  return NextResponse.redirect(to)
}

export const config = {
  // Everything except built files, fonts, photos and icons.
  matcher: ['/((?!_next/static|_next/image|fonts/|images/|icon.png|apple-icon.png|favicon.ico|opengraph-image).*)'],
}
