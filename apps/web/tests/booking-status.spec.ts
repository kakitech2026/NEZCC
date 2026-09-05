import { expect, test } from '@playwright/test'

import {
  assertBookingTransitionAllowed,
  buildQuoteMetadata,
  calculateFinalPayableAmount,
  normalizeBookingWorkflow,
} from '../src/lib/bookings/bookingStatusService'

test.describe('booking status service', () => {
  test('calculates final payable amount from quote components', () => {
    expect(
      calculateFinalPayableAmount({
        additionalCharges: 500,
        baseQuoteAmount: 10_000,
        discount: 1_000,
        taxAmount: 1_800,
      }),
    ).toEqual({
      additionalCharges: 500,
      baseQuoteAmount: 10_000,
      discount: 1_000,
      finalPayableAmount: 11_300,
      taxAmount: 1_800,
    })
  })

  test('rejects negative quote inputs and negative final totals', () => {
    expect(() => calculateFinalPayableAmount({ baseQuoteAmount: -1 })).toThrow(
      'baseQuoteAmount must be a non-negative number',
    )

    expect(() => calculateFinalPayableAmount({ baseQuoteAmount: 100, discount: 200 })).toThrow(
      'finalPayableAmount cannot be negative',
    )
  })

  test('moves payable approvals to pending payment with pending payment status', () => {
    expect(
      normalizeBookingWorkflow({
        baseQuoteAmount: 10_000,
        bookingStatus: 'approved',
        originalBookingStatus: 'under-review',
        paymentStatus: 'not-required',
      }),
    ).toEqual(
      expect.objectContaining({
        bookingStatus: 'pending-payment',
        finalPayableAmount: 10_000,
        paymentStatus: 'pending',
      }),
    )
  })

  test('confirms zero-value approvals with not-required payment status', () => {
    expect(
      normalizeBookingWorkflow({
        baseQuoteAmount: 0,
        bookingStatus: 'approved',
        originalBookingStatus: 'under-review',
        paymentStatus: 'pending',
      }),
    ).toEqual(
      expect.objectContaining({
        bookingStatus: 'confirmed',
        finalPayableAmount: 0,
        paymentStatus: 'not-required',
      }),
    )
  })

  test('marks new manual payment links as link sent unless already paid', () => {
    expect(
      normalizeBookingWorkflow({
        bookingStatus: 'pending-payment',
        originalBookingStatus: 'approved',
        paymentLinkReference: 'https://payments.example/link',
        paymentStatus: 'pending',
      }),
    ).toEqual(
      expect.objectContaining({
        bookingStatus: 'pending-payment',
        paymentStatus: 'link-sent',
      }),
    )

    expect(
      normalizeBookingWorkflow({
        bookingStatus: 'confirmed',
        originalBookingStatus: 'pending-payment',
        paymentLinkReference: 'https://payments.example/link',
        paymentStatus: 'paid',
      }),
    ).toEqual(
      expect.objectContaining({
        bookingStatus: 'confirmed',
        paymentStatus: 'paid',
      }),
    )
  })

  test('enforces confirmed booking payment invariant', () => {
    expect(() =>
      normalizeBookingWorkflow({
        bookingStatus: 'confirmed',
        originalBookingStatus: 'pending-payment',
        paymentStatus: 'pending',
      }),
    ).toThrow('confirmed bookings require paid or not-required payment status')
  })

  test('allows documented booking status transitions', () => {
    expect(() =>
      assertBookingTransitionAllowed({
        from: 'new',
        to: 'under-review',
      }),
    ).not.toThrow()

    expect(() =>
      assertBookingTransitionAllowed({
        from: 'need-more-information',
        to: 'under-review',
      }),
    ).not.toThrow()
  })

  test('rejects undocumented booking status transitions without override', () => {
    expect(() =>
      assertBookingTransitionAllowed({
        from: 'new',
        to: 'confirmed',
      }),
    ).toThrow('bookingStatus transition from new to confirmed is not allowed')
  })

  test('requires a reason for deliberate transition overrides', () => {
    expect(() =>
      assertBookingTransitionAllowed({
        from: 'new',
        override: true,
        to: 'confirmed',
      }),
    ).toThrow('transitionOverrideReason is required for unusual bookingStatus transitions')
  })

  test('allows deliberate transition overrides with a reason', () => {
    expect(() =>
      assertBookingTransitionAllowed({
        from: 'new',
        override: true,
        reason: 'Correcting imported historical booking status.',
        to: 'confirmed',
      }),
    ).not.toThrow()
  })

  test('records quote metadata when an admin changes quote fields', () => {
    expect(
      buildQuoteMetadata(
        {
          baseQuoteAmount: 10_000,
          originalBaseQuoteAmount: 0,
          userId: 'admin-1',
        },
        new Date('2026-09-05T08:00:00.000Z'),
      ),
    ).toEqual({
      quoteCreatedAt: '2026-09-05T08:00:00.000Z',
      quotedBy: 'admin-1',
    })
  })

  test('preserves existing quote metadata when workflow changes without quote changes', () => {
    expect(
      buildQuoteMetadata({
        additionalCharges: 500,
        baseQuoteAmount: 10_000,
        discount: 0,
        originalAdditionalCharges: 500,
        originalBaseQuoteAmount: 10_000,
        originalDiscount: 0,
        originalQuoteCreatedAt: '2026-09-04T08:00:00.000Z',
        originalQuotedBy: 'admin-1',
        originalTaxAmount: 1800,
        taxAmount: 1800,
        userId: 'admin-2',
      }),
    ).toEqual({
      quoteCreatedAt: '2026-09-04T08:00:00.000Z',
      quotedBy: 'admin-1',
    })
  })
})
