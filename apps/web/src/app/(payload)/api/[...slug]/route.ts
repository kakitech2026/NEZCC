import configPromise from '@payload-config'
import { REST_GET, REST_OPTIONS } from '@payloadcms/next/routes'
import { isPublicRESTRequest } from '@/lib/public-routes'

const publicHandler = (handler: ReturnType<typeof REST_GET>) =>
  (...args: Parameters<typeof handler>) => isPublicRESTRequest(args[0])
    ? handler(...args)
    : new Response('Not Found', { status: 404 })

export const GET = publicHandler(REST_GET(configPromise))
export const OPTIONS = publicHandler(REST_OPTIONS(configPromise))
