import { expect, test } from '@playwright/test'
import type { PayloadRequest } from 'payload'

import { formatBookingReference, generateBookingReference } from '@nezcc/cms/bookings/bookingReferenceService'

const createMockReq = () => {
  let sequence = 0
  const calls: unknown[] = []

  const req = {
    payload: {
      db: {
        collections: {
          'booking-reference-counters': {
            collection: {
              findOneAndUpdate: async (...args: unknown[]) => {
                calls.push(args)
                sequence += 1

                return {
                  key: 'booking-2026',
                  year: 2026,
                  sequence,
                }
              },
            },
          },
        },
      },
    },
  } as unknown as PayloadRequest

  return { calls, req }
}

test.describe('booking reference service', () => {
  test('formats booking references with six digit sequence padding', () => {
    expect(formatBookingReference(2026, 1)).toBe('NEZCC-BKG-2026-000001')
    expect(formatBookingReference(2026, 42)).toBe('NEZCC-BKG-2026-000042')
    expect(formatBookingReference(2026, 123456)).toBe('NEZCC-BKG-2026-123456')
  })

  test('uses an atomic increment operation for sequence generation', async () => {
    const { calls, req } = createMockReq()

    const reference = await generateBookingReference(req, new Date('2026-09-03T00:00:00.000Z'))

    expect(reference).toBe('NEZCC-BKG-2026-000001')
    expect(calls).toHaveLength(1)
    expect(calls[0]).toEqual([
      { key: 'booking-2026' },
      {
        $inc: { sequence: 1 },
        $setOnInsert: expect.objectContaining({
          key: 'booking-2026',
          year: 2026,
        }),
        $set: expect.objectContaining({
          updatedAt: expect.any(Date),
        }),
      },
      {
        returnDocument: 'after',
        upsert: true,
      },
    ])
  })

  test('returns unique references across concurrent calls', async () => {
    const { req } = createMockReq()

    const references = await Promise.all(
      Array.from({ length: 5 }, () => generateBookingReference(req, new Date('2026-09-03T00:00:00.000Z'))),
    )

    expect(new Set(references).size).toBe(5)
    expect(references).toEqual([
      'NEZCC-BKG-2026-000001',
      'NEZCC-BKG-2026-000002',
      'NEZCC-BKG-2026-000003',
      'NEZCC-BKG-2026-000004',
      'NEZCC-BKG-2026-000005',
    ])
  })
})
