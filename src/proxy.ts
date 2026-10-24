import { NextResponse, type NextRequest } from 'next/server'
import { isAdminRequest } from '@/lib/server/admin-auth'

// Basic-auth gate for /admin. If ADMIN_PASSWORD isn't set, /admin doesn't exist.
export function proxy(request: NextRequest) {
  if (!process.env.ADMIN_PASSWORD) return new NextResponse('Not found', { status: 404 })
  if (isAdminRequest(request.headers.get('authorization'))) return NextResponse.next()
  return new NextResponse('Sign in required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Rawdah admin", charset="UTF-8"' },
  })
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
