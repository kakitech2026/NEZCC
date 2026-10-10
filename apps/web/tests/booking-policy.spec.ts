import { expect, test } from '@playwright/test'

import { getPublicBookingSettings } from '@nezcc/cms/bookings/bookingSettingsService'

test.describe('booking policy settings', () => {
  test('normalizes public booking settings for policy display and consent forms', async () => {
    const payload = {
      findGlobal: async () => ({
        approvalDisclaimer: 'Approval disclaimer',
        bookingEnabled: false,
        bookingSupportEmail: 'bookings@example.com',
        bookingSupportPhone: '+91 3862 243557',
        cancellationPolicy: 'Cancellation policy',
        defaultCurrency: 'INR',
        paymentRefundPolicy: 'Payment policy',
        policyDate: '2026-09-04T00:00:00.000Z',
        policyVersion: '2.0',
        privacyNotice: 'Privacy notice',
        publicBookingNotice: 'Public notice',
        termsAndConditions: 'Terms text',
      }),
    }

    await expect(getPublicBookingSettings(payload)).resolves.toEqual({
      approvalDisclaimer: 'Approval disclaimer',
      bookingEnabled: false,
      bookingSupportEmail: 'bookings@example.com',
      bookingSupportPhone: '+91 3862 243557',
      cancellationPolicy: 'Cancellation policy',
      defaultCurrency: 'INR',
      paymentRefundPolicy: 'Payment policy',
      policyDate: '2026-09-04T00:00:00.000Z',
      policyVersion: '2.0',
      privacyNotice: 'Privacy notice',
      publicBookingNotice: 'Public notice',
      termsAndConditions: 'Terms text',
    })
  })

  test('uses safe defaults when policy settings are missing', async () => {
    const payload = {
      findGlobal: async () => ({}),
    }
    const settings = await getPublicBookingSettings(payload)

    expect(settings.bookingEnabled).toBe(true)
    expect(settings.defaultCurrency).toBe('INR')
    expect(settings.policyVersion).toBe('1.0')
    expect(settings.termsAndConditions).toContain('Booking requests are reviewed')
    expect(settings.privacyNotice).toContain('Requester information')
  })
})
