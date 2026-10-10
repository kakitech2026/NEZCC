import { expect, test } from '@playwright/test'

import { buildBookingAuditHistory } from '@nezcc/cms/bookings/bookingAuditService'

const now = new Date('2026-09-03T10:00:00.000Z')

test.describe('booking audit service', () => {
  test('creates a server-generated booking-created audit entry', () => {
    expect(
      buildBookingAuditHistory({
        data: { auditHistory: [{ eventType: 'manual-entry', changedAt: now.toISOString() }], bookingStatus: 'new', paymentStatus: 'not-required' },
        now,
        operation: 'create',
        user: { id: 7 },
      }),
    ).toEqual([
      {
        eventType: 'booking-created',
        previousValue: null,
        newValue: JSON.stringify({ bookingStatus: 'new', paymentStatus: 'not-required' }),
        note: null,
        changedBy: 7,
        changedAt: now.toISOString(),
      },
    ])
  })

  test('appends status and payment changes to existing audit history', () => {
    const previousEntry = {
      eventType: 'booking-created',
      changedAt: '2026-09-03T09:00:00.000Z',
    }

    expect(
      buildBookingAuditHistory({
        data: { bookingStatus: 'pending-payment', paymentStatus: 'pending' },
        now,
        operation: 'update',
        originalDoc: {
          auditHistory: [previousEntry],
          bookingStatus: 'under-review',
          paymentStatus: 'not-required',
        },
        user: { id: 9 },
      }),
    ).toEqual([
      previousEntry,
      {
        eventType: 'booking-status-changed',
        previousValue: 'under-review',
        newValue: 'pending-payment',
        note: null,
        changedBy: 9,
        changedAt: now.toISOString(),
      },
      {
        eventType: 'payment-status-changed',
        previousValue: 'not-required',
        newValue: 'pending',
        note: null,
        changedBy: 9,
        changedAt: now.toISOString(),
      },
    ])
  })

  test('records quote changes as one consolidated audit entry', () => {
    const history = buildBookingAuditHistory({
      data: {
        additionalCharges: 250,
        baseQuoteAmount: 1000,
        discount: 100,
        finalPayableAmount: 1150,
        taxAmount: 0,
      },
      now,
      operation: 'update',
      originalDoc: {
        additionalCharges: 0,
        baseQuoteAmount: 1000,
        discount: 0,
        finalPayableAmount: 1000,
        taxAmount: 0,
      },
    })

    expect(history).toHaveLength(1)
    expect(history[0]).toEqual(
      expect.objectContaining({
        eventType: 'quote-changed',
        previousValue: JSON.stringify({
          baseQuoteAmount: 1000,
          additionalCharges: 0,
          discount: 0,
          taxAmount: 0,
          finalPayableAmount: 1000,
        }),
        newValue: JSON.stringify({
          baseQuoteAmount: 1000,
          additionalCharges: 250,
          discount: 100,
          taxAmount: 0,
          finalPayableAmount: 1150,
        }),
      }),
    )
  })

  test('ignores manually submitted audit history and preserves original append-only history', () => {
    const originalEntry = {
      eventType: 'booking-created',
      changedAt: '2026-09-03T09:00:00.000Z',
    }

    expect(
      buildBookingAuditHistory({
        data: {
          auditHistory: [{ eventType: 'tampered', changedAt: now.toISOString() }],
          bookingStatus: 'under-review',
        },
        now,
        operation: 'update',
        originalDoc: {
          auditHistory: [originalEntry],
          bookingStatus: 'new',
        },
      }),
    ).toEqual([
      originalEntry,
      expect.objectContaining({
        eventType: 'booking-status-changed',
        previousValue: 'new',
        newValue: 'under-review',
      }),
    ])
  })

  test('records transition and warning overrides with admin reasons', () => {
    const history = buildBookingAuditHistory({
      data: {
        transitionOverride: true,
        transitionOverrideReason: 'Historical correction approved by director.',
        warningOverride: true,
        warningOverrideReason: 'Venue capacity reviewed manually.',
      },
      now,
      operation: 'update',
      originalDoc: {
        transitionOverride: false,
        warningOverride: false,
      },
      user: { id: 12 },
    })

    expect(history).toEqual([
      expect.objectContaining({
        eventType: 'transition-override-applied',
        note: 'Historical correction approved by director.',
        changedBy: 12,
      }),
      expect.objectContaining({
        eventType: 'warning-override-applied',
        note: 'Venue capacity reviewed manually.',
        changedBy: 12,
      }),
    ])
  })
})
