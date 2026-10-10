import { expect, test } from '@playwright/test'

import {
  analyzeBookingWarnings,
  buildConflictQuery,
  timeRangesOverlap,
  validateAvailabilityBlock,
  validateWarningOverride,
} from '@nezcc/cms/bookings/bookingConflictService'

test.describe('booking conflict service', () => {
  test('uses strict overlap formula and allows back-to-back bookings', () => {
    expect(
      timeRangesOverlap({
        existingStart: '2026-10-10T10:00:00.000Z',
        existingEnd: '2026-10-10T12:00:00.000Z',
        newStart: '2026-10-10T11:00:00.000Z',
        newEnd: '2026-10-10T13:00:00.000Z',
      }),
    ).toBe(true)

    expect(
      timeRangesOverlap({
        existingStart: '2026-10-10T10:00:00.000Z',
        existingEnd: '2026-10-10T12:00:00.000Z',
        newStart: '2026-10-10T12:00:00.000Z',
        newEnd: '2026-10-10T13:00:00.000Z',
      }),
    ).toBe(false)
  })

  test('builds conflict queries with New as a conflict-relevant status', () => {
    expect(
      buildConflictQuery({
        artist: 12,
        bookingType: 'artist',
        endDateTime: '2026-10-10T12:00:00.000Z',
        id: 99,
        startDateTime: '2026-10-10T10:00:00.000Z',
      }),
    ).toEqual({
      and: [
        { bookingType: { equals: 'artist' } },
        { artist: { equals: 12 } },
        { bookingStatus: { in: ['new', 'under-review', 'need-more-information', 'approved', 'pending-payment', 'confirmed'] } },
        { startDateTime: { less_than: '2026-10-10T12:00:00.000Z' } },
        { endDateTime: { greater_than: '2026-10-10T10:00:00.000Z' } },
        { id: { not_equals: 99 } },
      ],
    })
  })

  test('returns booking and availability warnings without blocking submission', async () => {
    const payload = {
      find: async ({ collection }: { collection: string }) => ({
        docs:
          collection === 'booking-requests'
            ? [{ id: 1, bookingReference: 'NEZCC-BKG-2026-000001' }]
            : [{ id: 2, reason: 'Maintenance' }],
      }),
      findByID: async () => ({ capacity: 500 }),
    }

    await expect(
      analyzeBookingWarnings({
        booking: {
          bookingType: 'venue',
          endDateTime: '2026-10-10T12:00:00.000Z',
          expectedAudienceSize: 700,
          startDateTime: '2026-10-10T10:00:00.000Z',
          venue: 3,
        },
        payload,
      }),
    ).resolves.toEqual({
      availabilityBlocks: [2],
      availabilityBlockReasons: [{ reason: 'Maintenance' }],
      availabilityBlockWarning: true,
      capacityWarning: true,
      conflictType: 'booking-overlap',
      conflictingBookings: [1],
      conflictingBookingReferences: [{ reference: 'NEZCC-BKG-2026-000001' }],
      hasConflict: true,
      warningNotes: 'Overlapping booking request found. Overlapping availability block found. Expected audience exceeds venue capacity.',
    })
  })

  test('marks only capacity warnings for over-capacity venue requests', async () => {
    const payload = {
      find: async () => ({ docs: [] }),
      findByID: async () => ({ capacity: 100 }),
    }

    await expect(
      analyzeBookingWarnings({
        booking: {
          bookingType: 'venue',
          endDateTime: '2026-10-10T12:00:00.000Z',
          expectedAudienceSize: 125,
          startDateTime: '2026-10-10T10:00:00.000Z',
          venue: { id: 4 },
        },
        payload,
      }),
    ).resolves.toEqual(
      expect.objectContaining({
        capacityWarning: true,
        conflictType: 'capacity',
        hasConflict: false,
      }),
    )
  })

  test('requires a reason for warning overrides', () => {
    expect(() => validateWarningOverride({ warningOverride: true })).toThrow(
      'warningOverrideReason is required when overriding booking warnings',
    )

    expect(validateWarningOverride({ originalWarningOverride: false, warningOverride: true, warningOverrideReason: 'Reviewed by admin.' })).toBe(true)
    expect(validateWarningOverride({ originalWarningOverride: true, warningOverride: true, warningOverrideReason: 'Reviewed by admin.' })).toBe(false)
  })

  test('validates availability block resource and time rules', () => {
    expect(() =>
      validateAvailabilityBlock({
        endDateTime: '2026-10-10T12:00:00.000Z',
        resourceType: 'artist',
        startDateTime: '2026-10-10T10:00:00.000Z',
      }),
    ).toThrow('Artist availability blocks require an artist.')

    expect(() =>
      validateAvailabilityBlock({
        artist: 1,
        endDateTime: '2026-10-10T12:00:00.000Z',
        resourceType: 'venue',
        startDateTime: '2026-10-10T10:00:00.000Z',
        venue: 2,
      }),
    ).toThrow('Availability blocks can reference either an artist or a venue, not both.')

    expect(() =>
      validateAvailabilityBlock({
        endDateTime: '2026-10-10T10:00:00.000Z',
        resourceType: 'venue',
        startDateTime: '2026-10-10T10:00:00.000Z',
        venue: 2,
      }),
    ).toThrow('Availability block endDateTime must be after startDateTime.')

    expect(() =>
      validateAvailabilityBlock({
        artist: { id: 1 },
        endDateTime: '2026-10-10T12:00:00.000Z',
        resourceType: 'artist',
        startDateTime: '2026-10-10T10:00:00.000Z',
      }),
    ).not.toThrow()
  })
})
