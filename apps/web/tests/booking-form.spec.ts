import { expect, test } from '@playwright/test'

import { buildBookingSubmission } from '@nezcc/cms/bookings/bookingFormService'

const buildFormData = (entries: Record<string, string>) => {
  const formData = new FormData()

  for (const [key, value] of Object.entries(entries)) {
    formData.set(key, value)
  }

  return formData
}

test.describe('booking form payload mapper', () => {
  test('builds artist booking submissions with required event location', () => {
    const submission = buildBookingSubmission({
      formData: buildFormData({
        budgetAmount: '5000',
        email: 'REQUESTER@EXAMPLE.COM',
        endDateTime: '2026-10-10T12:00',
        eventLocation: 'Dimapur, Nagaland',
        eventName: 'Cultural Evening',
        eventType: 'Festival',
        expectedAudienceSize: '200',
        phone: '+91 9876543210',
        privacyAccepted: 'true',
        requesterName: 'Test Requester',
        startDateTime: '2026-10-10T10:00',
        termsAccepted: 'true',
        timeType: 'exact',
      }),
      idempotencyToken: 'token-123',
      resource: {
        bookingType: 'artist',
        resourceId: 'artist-1',
        sourcePage: '/artists/test-artist',
      },
    })

    expect(submission).toEqual(
      expect.objectContaining({
        artist: 'artist-1',
        bookingType: 'artist',
        budgetAmount: 5000,
        eventLocation: 'Dimapur, Nagaland',
        expectedAudienceSize: 200,
        idempotencyToken: 'token-123',
        privacyAccepted: true,
        sourcePage: '/artists/test-artist',
        termsAccepted: true,
      }),
    )
    expect(submission).not.toHaveProperty('venue')
    expect(submission.startDateTime).toContain('2026-10-10T')
    expect(submission.endDateTime).toContain('2026-10-10T')
  })

  test('builds venue booking submissions with venue notes and no artist location', () => {
    const submission = buildBookingSubmission({
      formData: buildFormData({
        email: 'requester@example.com',
        endDateTime: '2026-11-01T17:00',
        eventLocation: 'Ignored public input',
        eventLocationNotes: 'Use the main hall',
        eventName: 'Workshop',
        eventType: 'Workshop',
        phone: '+91 9876543210',
        privacyAccepted: 'true',
        requesterName: 'Test Requester',
        startDateTime: '2026-11-01T14:00',
        termsAccepted: 'true',
        timeType: 'flexible',
      }),
      idempotencyToken: 'token-venue',
      resource: {
        bookingType: 'venue',
        resourceId: 'venue-1',
        sourcePage: '/venues/test-venue',
      },
    })

    expect(submission).toEqual(
      expect.objectContaining({
        bookingType: 'venue',
        eventLocation: undefined,
        eventLocationNotes: 'Use the main hall',
        idempotencyToken: 'token-venue',
        venue: 'venue-1',
      }),
    )
    expect(submission).not.toHaveProperty('artist')
  })
})
