import { NextResponse, type NextRequest } from 'next/server'

const ADMIN_ROUTE = '/admin'
const DEFAULT_ADMIN_HOST = 'admin.nezcc.in'
const PUBLIC_API_PATHS = new Set([
  '/api/bookings',
  '/api/contact',
  '/api/feedback',
  '/api/globals/site-settings',
  '/api/newsletter',
])
const PUBLIC_API_PREFIXES = ['/api/media/file/']
const PUBLIC_ASSET_PREFIXES = ['/_next', '/images']
const PUBLIC_ASSET_PATHS = new Set(['/favicon.ico', '/robots.txt', '/sitemap.xml'])

const normalizeHostname = (value?: string | null) => {
  const trimmed = value?.trim().toLowerCase()

  if (!trimmed) {
    return undefined
  }

  try {
    return new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`).hostname
  } catch {
    return trimmed.split('/')[0]?.split(':')[0]
  }
}

const getAdminHosts = () => {
  const configuredHosts = [
    DEFAULT_ADMIN_HOST,
    'admin.localhost',
    process.env.ADMIN_URL,
    process.env.NEXT_PUBLIC_ADMIN_URL,
    ...(process.env.ADMIN_HOSTS || '').split(','),
  ]

  return new Set(configuredHosts.map(normalizeHostname).filter((host): host is string => Boolean(host)))
}

const getRequestHost = (request: NextRequest) => {
  const forwardedHost = request.headers.get('x-forwarded-host')?.split(',')[0]

  return normalizeHostname(forwardedHost || request.headers.get('host'))
}

const isAdminPath = (pathname: string) => pathname === ADMIN_ROUTE || pathname.startsWith(`${ADMIN_ROUTE}/`)

const isGraphQLPath = (pathname: string) =>
  pathname === '/graphql' ||
  pathname.startsWith('/graphql/') ||
  pathname === '/graphql-playground' ||
  pathname.startsWith('/graphql-playground/')

const isPublicAssetPath = (pathname: string) =>
  PUBLIC_ASSET_PATHS.has(pathname) || PUBLIC_ASSET_PREFIXES.some((prefix) => pathname.startsWith(prefix))

const isPublicAPIPath = (pathname: string, method: string) => {
  if (PUBLIC_API_PATHS.has(pathname)) {
    return true
  }

  return (
    (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') &&
    PUBLIC_API_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  )
}

const notFound = () => new NextResponse('Not Found', { status: 404 })

export function proxy(request: NextRequest) {
  const { method, nextUrl } = request
  const { pathname } = nextUrl
  const isAdminHost = getAdminHosts().has(getRequestHost(request) || '')

  if (isAdminHost) {
    if (isPublicAssetPath(pathname) || pathname.startsWith('/api') || isGraphQLPath(pathname)) {
      return NextResponse.next()
    }

    if (isAdminPath(pathname)) {
      if (method === 'GET' || method === 'HEAD') {
        const cleanURL = nextUrl.clone()
        cleanURL.pathname = pathname.slice(ADMIN_ROUTE.length) || '/'

        return NextResponse.redirect(cleanURL, 308)
      }

      return NextResponse.next()
    }

    const adminURL = nextUrl.clone()
    adminURL.pathname = `${ADMIN_ROUTE}${pathname === '/' ? '' : pathname}`

    return NextResponse.rewrite(adminURL)
  }

  if (isAdminPath(pathname) || isGraphQLPath(pathname)) {
    return notFound()
  }

  if (pathname.startsWith('/api') && !isPublicAPIPath(pathname, method)) {
    return notFound()
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
