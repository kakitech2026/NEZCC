const submissionPaths = new Set(['/api/bookings', '/api/contact', '/api/feedback', '/api/newsletter'])
const readMethods = new Set(['GET', 'HEAD', 'OPTIONS'])

export const normalizePublicPath = (pathname: string): string | undefined => {
  try {
    if (/%2f|%5c/i.test(pathname)) return undefined
    const decoded = decodeURIComponent(pathname)
    if (/[\\\0]/.test(decoded) || decoded.split('/').some((part) => part === '.' || part === '..')) return undefined
    return decoded.replace(/\/+$/, '') || '/'
  } catch {
    return undefined
  }
}

export const isPublicAPIPath = (pathname: string, method: string) =>
  submissionPaths.has(pathname) ||
  (readMethods.has(method) && (pathname === '/api/globals/site-settings' || pathname.startsWith('/api/media/file/')))

export const isPublicRESTRequest = (request: Request) => {
  const pathname = normalizePublicPath(new URL(request.url).pathname)
  return Boolean(pathname && !submissionPaths.has(pathname) && isPublicAPIPath(pathname, request.method))
}
