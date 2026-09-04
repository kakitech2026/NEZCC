import {
  assertHoneypotEmpty,
  createRateLimitKey,
  findExistingBookingByIdempotencyToken,
  normalizeIdempotencyToken,
} from './bookingAntiSpamService'
import { validateBookingInput, type BookingValidationInput } from './bookingValidationService'

type BookingSettings = {
  approvalDisclaimer?: string | null
  bookingEnabled?: boolean | null
  policyDate?: string | null
  policyVersion?: string | null
  privacyNotice?: string | null
  publicBookingNotice?: string | null
  termsAndConditions?: string | null
}

type PayloadLike = {
  create: (args: Record<string, unknown> & {
    collection: 'booking-requests'
    data: Record<string, unknown>
    overrideAccess?: boolean
  }) => Promise<unknown>
  find: (args: Record<string, unknown> & {
    collection: 'booking-requests'
  }) => Promise<{ docs: unknown[] }>
  findByID: (args: Record<string, unknown>) => Promise<unknown>
  findGlobal: (args: Record<string, unknown> & {
    slug: 'booking-settings'
    overrideAccess?: boolean
  }) => Promise<unknown>
}

export type BookingCreationInput = BookingValidationInput & {
  clientAddress?: string | null
  honeypot?: unknown
}

export type BookingCreationResult = {
  bookingReference: string
  duplicate: boolean
  message: string
  status: 'received'
}

type CreateBookingArgs = {
  input: BookingCreationInput
  now?: Date
  payload: PayloadLike
  secret: string
}

const defaultSuccessMessage =
  'Your booking request has been received. NEZCC will review availability and contact you. This booking is confirmed only after approval and payment verification.'

const asSettings = (value: unknown) => (value && typeof value === 'object' ? (value as BookingSettings) : {})

const asRecord = (value: unknown) => (value && typeof value === 'object' ? (value as Record<string, unknown>) : {})

const asString = (value: unknown) => (typeof value === 'string' && value.trim() ? value.trim() : null)

export const createBookingRequest = async ({
  input,
  now = new Date(),
  payload,
  secret,
}: CreateBookingArgs): Promise<BookingCreationResult> => {
  assertHoneypotEmpty(input.honeypot)

  const settings = asSettings(
    await payload.findGlobal({
      slug: 'booking-settings',
      overrideAccess: true,
    }),
  )

  if (settings.bookingEnabled === false) {
    throw new Error('Bookings are currently disabled.')
  }

  const idempotencyToken = normalizeIdempotencyToken(input.idempotencyToken)
  const existing = await findExistingBookingByIdempotencyToken({ idempotencyToken, payload })

  if (existing.duplicate && existing.bookingReference) {
    return {
      bookingReference: existing.bookingReference,
      duplicate: true,
      message: defaultSuccessMessage,
      status: 'received',
    }
  }

  const validated = await validateBookingInput({
    input: {
      ...input,
      idempotencyToken,
    },
    now,
    payload: payload as never,
  })
  const timestamp = now.toISOString()
  const rateLimitKey = createRateLimitKey({
    clientAddress: input.clientAddress || 'unknown',
    secret,
  })
  const created = await payload.create({
    collection: 'booking-requests',
    overrideAccess: true,
    data: {
      ...validated,
      acceptedPolicyDate: settings.policyDate ?? timestamp,
      acceptedPolicyVersion: settings.policyVersion ?? '1.0',
      acceptedPrivacySnapshot: settings.privacyNotice ?? '',
      acceptedTermsSnapshot: settings.termsAndConditions ?? '',
      bookingStatus: 'new',
      idempotencyToken,
      paymentStatus: 'not-required',
      privacyAcceptedAt: timestamp,
      rateLimitKey,
      termsAcceptedAt: timestamp,
    },
  })
  const bookingReference = asString(asRecord(created).bookingReference)

  if (!bookingReference) {
    throw new Error('Booking request was created without a booking reference.')
  }

  return {
    bookingReference,
    duplicate: false,
    message: settings.publicBookingNotice || settings.approvalDisclaimer || defaultSuccessMessage,
    status: 'received',
  }
}
