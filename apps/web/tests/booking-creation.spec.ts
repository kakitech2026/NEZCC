import { expect, test } from '@playwright/test'

import { createBookingRequest } from '../src/lib/bookings/bookingCreationService'

const validInput = {
  artist: 'artist-1',
  bookingType: 'artist',
  email: 'requester@example.com',
  endDateTime: '2026-10-10T12:00:00.000Z',
  eventLocation: 'Dimapur, Nagaland',
  eventName: 'Cultural evening',
  eventType: 'Festival',
  idempotencyToken: 'booking-request-123456',
  phone: '+91 9876543210',
  privacyAccepted: true,
  requesterName: 'Test Requester',
  startDateTime: '2026-10-10T10:00:00.000Z',
  termsAccepted: true,
  timeType: 'exact',
} as const

const createPayload = ({
  bookingEnabled = true,
  existingDocs = [],
}: {
  bookingEnabled?: boolean
  existingDocs?: unknown[]
} = {}) => ({
  create: async () => ({
    bookingReference: 'NEZCC-BKG-2026-000123',
  }),
  find: async () => ({
    docs: existingDocs,
  }),
  findByID: async () => ({
    bookingEnabled: true,
    isActive: true,
    isPublished: true,
  }),
  findGlobal: async () => ({
    bookingEnabled,
    policyDate: '2026-09-04T00:00:00.000Z',
    policyVersion: '1.0',
    privacyNotice: 'Privacy snapshot',
    publicBookingNotice: 'Custom public notice',
    termsAndConditions: 'Terms snapshot',
  }),
})

test.describe('booking creation service', () => {
  test('creates a booking through the trusted server path and returns a safe response', async () => {
    let createdData: Record<string, unknown> = {}
    const payload = {
      ...createPayload(),
      create: async ({ data }: { data: Record<string, unknown> }) => {
        createdData = data
        return { bookingReference: 'NEZCC-BKG-2026-000123' }
      },
    }

    await expect(
      createBookingRequest({
        input: validInput,
        now: new Date('2026-09-04T10:00:00.000Z'),
        payload,
        secret: 'secret',
      }),
    ).resolves.toEqual({
      bookingReference: 'NEZCC-BKG-2026-000123',
      duplicate: false,
      message: 'Custom public notice',
      status: 'received',
    })

    expect(createdData).toEqual(
      expect.objectContaining({
        acceptedPolicyVersion: '1.0',
        acceptedPrivacySnapshot: 'Privacy snapshot',
        acceptedTermsSnapshot: 'Terms snapshot',
        bookingStatus: 'new',
        idempotencyToken: 'booking-request-123456',
        paymentStatus: 'not-required',
        privacyAcceptedAt: '2026-09-04T10:00:00.000Z',
        termsAcceptedAt: '2026-09-04T10:00:00.000Z',
      }),
    )
    expect(createdData.rateLimitKey).toEqual(expect.any(String))
  })

  test('returns the original reference for duplicate idempotency retries', async () => {
    const payload = createPayload({
      existingDocs: [{ id: 1, bookingReference: 'NEZCC-BKG-2026-000001' }],
    })

    await expect(
      createBookingRequest({
        input: validInput,
        payload,
        secret: 'secret',
      }),
    ).resolves.toEqual({
      bookingReference: 'NEZCC-BKG-2026-000001',
      duplicate: true,
      message:
        'Your booking request has been received. NEZCC will review availability and contact you. This booking is confirmed only after approval and payment verification.',
      status: 'received',
    })
  })

  test('rejects disabled booking settings and honeypot submissions', async () => {
    await expect(
      createBookingRequest({
        input: validInput,
        payload: createPayload({ bookingEnabled: false }),
        secret: 'secret',
      }),
    ).rejects.toThrow('Bookings are currently disabled.')

    await expect(
      createBookingRequest({
        input: { ...validInput, honeypot: 'spam' },
        payload: createPayload(),
        secret: 'secret',
      }),
    ).rejects.toThrow('website must be empty')
  })

  test('rejects invalid booking payloads before creating records', async () => {
    let createCalled = false
    const payload = {
      ...createPayload(),
      create: async () => {
        createCalled = true
        return { bookingReference: 'NEZCC-BKG-2026-000123' }
      },
    }

    await expect(
      createBookingRequest({
        input: {
          ...validInput,
          artist: undefined,
        },
        payload,
        secret: 'secret',
      }),
    ).rejects.toThrow('artist bookings require exactly one artist and no venue')

    expect(createCalled).toBe(false)
  })
})
