import { NextResponse, type NextRequest } from 'next/server.js'

const adminRoute = '/admin'
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname === '/api' || pathname.startsWith('/api/') || pathname.startsWith('/_next/') ||
    pathname.startsWith('/images/') || pathname === '/favicon.ico' || pathname === '/robots.txt') {
    return NextResponse.next()
  }
  if (pathname === adminRoute || pathname.startsWith(`${adminRoute}/`)) {
    if (request.method === 'GET' || request.method === 'HEAD') {
      const url = request.nextUrl.clone()
      url.pathname = pathname.slice(adminRoute.length) || '/'
      return NextResponse.redirect(url, 308)
    }
    return NextResponse.next()
  }
  const url = request.nextUrl.clone()
  url.pathname = `${adminRoute}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = { matcher: '/:path*' }
