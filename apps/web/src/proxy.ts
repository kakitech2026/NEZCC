import { NextResponse, type NextRequest } from 'next/server.js'
import { isPublicAPIPath, normalizePublicPath } from './lib/public-routes'

export function proxy(request: NextRequest) {
  const pathname = normalizePublicPath(request.nextUrl.pathname)
  if (!pathname || pathname === '/admin' || pathname.startsWith('/admin/') ||
    pathname === '/graphql' || pathname.startsWith('/graphql/') ||
    pathname === '/graphql-playground' || pathname.startsWith('/graphql-playground/') ||
    (pathname.startsWith('/api') && !isPublicAPIPath(pathname, request.method))) {
    return new NextResponse('Not Found', { status: 404 })
  }
  return NextResponse.next()
}

export const config = { matcher: '/:path*' }
