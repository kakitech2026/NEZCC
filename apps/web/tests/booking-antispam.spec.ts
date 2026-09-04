import { expect, test } from '@playwright/test'

import {
  assertHoneypotEmpty,
  assertNoDuplicateIdempotencyToken,
  createRateLimitKey,
  enforceBookingRateLimit,
  findExistingBookingByIdempotencyToken,
  getClientAddressFromHeaders,
  normalizeIdempotencyToken,
} from '../src/lib/bookings/bookingAntiSpamService'

test.describe('booking anti-spam service', () => {
  test('normalizes and validates idempotency tokens', () => {
    expect(normalizeIdempotencyToken(' booking:request_123456 ')).toBe('booking:request_123456')
    expect(() => normalizeIdempotencyToken('short')).toThrow('idempotencyToken must be between')
    expect(() => normalizeIdempotencyToken('invalid token')).toThrow('idempotencyToken contains invalid characters')
  })

  test('detects existing bookings by idempotency token', async () => {
    const payload = {
      find: async () => ({
        docs: [{ id: 42, bookingReference: 'NEZCC-BKG-2026-000042' }],
      }),
    }

    await expect(
      findExistingBookingByIdempotencyToken({
        idempotencyToken: 'booking:request_123456',
        payload,
      }),
    ).resolves.toEqual({
      bookingReference: 'NEZCC-BKG-2026-000042',
      duplicate: true,
      existingBookingId: 42,
    })
  })

  test('rejects duplicate idempotency tokens', async () => {
    const payload = {
      find: async () => ({
        docs: [{ id: 42, bookingReference: 'NEZCC-BKG-2026-000042' }],
      }),
    }

    await expect(
      assertNoDuplicateIdempotencyToken({
        idempotencyToken: 'booking:request_123456',
        payload,
      }),
    ).rejects.toThrow('Duplicate booking request for idempotencyToken (NEZCC-BKG-2026-000042)')
  })

  test('enforces rate limits by hashed rate limit key', async () => {
    const payload = {
      find: async () => ({
        docs: [{ id: 1 }, { id: 2 }],
      }),
    }

    await expect(
      enforceBookingRateLimit({
        options: {
          maxRequests: 2,
          now: new Date('2026-09-04T08:00:00.000Z'),
          windowMs: 15 * 60 * 1000,
        },
        payload,
        rateLimitKey: 'hashed-key',
      }),
    ).rejects.toThrow('Too many booking requests were sent. Please try again later.')
  })

  test('allows requests below rate limit', async () => {
    const payload = {
      find: async () => ({
        docs: [{ id: 1 }],
      }),
    }

    await expect(
      enforceBookingRateLimit({
        options: { maxRequests: 2 },
        payload,
        rateLimitKey: 'hashed-key',
      }),
    ).resolves.toBeUndefined()
  })

  test('rejects filled honeypot fields', () => {
    expect(() => assertHoneypotEmpty('')).not.toThrow()
    expect(() => assertHoneypotEmpty('https://spam.example')).toThrow('website must be empty')
  })

  test('builds client address and hashed rate limit keys', () => {
    const headers = new Headers({
      'x-forwarded-for': '203.0.113.10, 198.51.100.20',
      'x-real-ip': '198.51.100.20',
    })

    expect(getClientAddressFromHeaders(headers)).toBe('203.0.113.10')
    expect(createRateLimitKey({ clientAddress: '203.0.113.10', secret: 'secret' })).toHaveLength(64)
    expect(createRateLimitKey({ clientAddress: '203.0.113.10', secret: 'secret' })).not.toBe(
      createRateLimitKey({ clientAddress: '203.0.113.10', scope: 'feedback', secret: 'secret' }),
    )
  })
})
