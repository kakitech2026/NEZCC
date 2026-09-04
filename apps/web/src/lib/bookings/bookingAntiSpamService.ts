import { createHash } from 'node:crypto'

type PayloadLike = {
  find: (args: Record<string, unknown> & {
    collection: 'booking-requests'
    depth?: number
    limit?: number
    overrideAccess?: boolean
    pagination?: boolean
  }) => Promise<{ docs: unknown[]; totalDocs?: number }>
}

export type IdempotencyResult = {
  bookingReference?: string | null
  duplicate: boolean
  existingBookingId?: number | string | null
}

export type RateLimitOptions = {
  maxRequests?: number
  now?: Date
  windowMs?: number
}

export const BOOKING_RATE_LIMIT_MAX = 5
export const BOOKING_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
export const IDEMPOTENCY_TOKEN_MAX_LENGTH = 200
export const IDEMPOTENCY_TOKEN_MIN_LENGTH = 12

const asRecord = (value: unknown) => (value && typeof value === 'object' ? (value as Record<string, unknown>) : null)

const asString = (value: unknown) => (typeof value === 'string' && value.trim() ? value.trim() : null)

const asId = (value: unknown) => (typeof value === 'number' || typeof value === 'string' ? value : null)

export const normalizeIdempotencyToken = (value: unknown) => {
  if (typeof value !== 'string') {
    throw new Error('idempotencyToken is required')
  }

  const token = value.trim()

  if (token.length < IDEMPOTENCY_TOKEN_MIN_LENGTH || token.length > IDEMPOTENCY_TOKEN_MAX_LENGTH) {
    throw new Error(`idempotencyToken must be between ${IDEMPOTENCY_TOKEN_MIN_LENGTH} and ${IDEMPOTENCY_TOKEN_MAX_LENGTH} characters`)
  }

  if (!/^[a-zA-Z0-9._:-]+$/.test(token)) {
    throw new Error('idempotencyToken contains invalid characters')
  }

  return token
}

export const assertHoneypotEmpty = (value: unknown, fieldName = 'website') => {
  if (typeof value === 'string' && value.trim().length > 0) {
    throw new Error(`${fieldName} must be empty`)
  }
}

export const getClientAddressFromHeaders = (headers: Pick<Headers, 'get'>) => {
  const forwardedFor = headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwardedFor || headers.get('x-real-ip') || 'unknown'
}

export const createRateLimitKey = ({
  clientAddress,
  scope = 'booking',
  secret,
}: {
  clientAddress: string
  scope?: string
  secret: string
}) => createHash('sha256').update(`${scope}:${clientAddress}:${secret}`).digest('hex')

export const findExistingBookingByIdempotencyToken = async ({
  idempotencyToken,
  payload,
}: {
  idempotencyToken?: string | null
  payload: PayloadLike
}): Promise<IdempotencyResult> => {
  if (!idempotencyToken) {
    return { duplicate: false }
  }

  const existing = await payload.find({
    collection: 'booking-requests',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    pagination: false,
    where: {
      idempotencyToken: {
        equals: idempotencyToken,
      },
    },
  })
  const doc = asRecord(existing.docs[0])

  if (!doc) {
    return { duplicate: false }
  }

  return {
    bookingReference: asString(doc.bookingReference),
    duplicate: true,
    existingBookingId: asId(doc.id),
  }
}

export const assertNoDuplicateIdempotencyToken = async ({
  idempotencyToken,
  payload,
}: {
  idempotencyToken?: string | null
  payload: PayloadLike
}) => {
  const existing = await findExistingBookingByIdempotencyToken({ idempotencyToken, payload })

  if (existing.duplicate) {
    throw new Error(`Duplicate booking request for idempotencyToken${existing.bookingReference ? ` (${existing.bookingReference})` : ''}`)
  }
}

export const enforceBookingRateLimit = async ({
  options = {},
  payload,
  rateLimitKey,
}: {
  options?: RateLimitOptions
  payload: PayloadLike
  rateLimitKey?: string | null
}) => {
  if (!rateLimitKey) {
    return
  }

  const maxRequests = options.maxRequests ?? BOOKING_RATE_LIMIT_MAX
  const windowMs = options.windowMs ?? BOOKING_RATE_LIMIT_WINDOW_MS
  const now = options.now ?? new Date()
  const since = new Date(now.getTime() - windowMs).toISOString()
  const recent = await payload.find({
    collection: 'booking-requests',
    depth: 0,
    limit: maxRequests,
    overrideAccess: true,
    pagination: false,
    where: {
      and: [
        { rateLimitKey: { equals: rateLimitKey } },
        { createdAt: { greater_than: since } },
      ],
    },
  })

  if (recent.docs.length >= maxRequests) {
    throw new Error('Too many booking requests were sent. Please try again later.')
  }
}
