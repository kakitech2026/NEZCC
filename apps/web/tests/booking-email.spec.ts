import { expect, test } from '@playwright/test'

import { sendBookingCreationEmails, sendBookingStatusChangeEmail } from '../src/lib/bookings/bookingEmailService'

const booking = {
  bookingReference: 'NEZCC-BKG-2026-000321',
  bookingStatus: 'new',
  bookingType: 'artist',
  email: 'requester@example.com',
  endDateTime: '2026-10-10T12:00:00.000Z',
  eventLocation: 'Dimapur',
  eventName: 'Cultural evening',
  eventType: 'Festival',
  paymentStatus: 'not-required',
  phone: '+91 9876543210',
  requesterName: 'Test Requester',
  startDateTime: '2026-10-10T10:00:00.000Z',
}

test.describe('booking email service', () => {
  test('sends requester acknowledgement and admin notification', async () => {
    const sent: { subject: string; to: string | string[] }[] = []

    await sendBookingCreationEmails({
      booking,
      payload: {
        sendEmail: async ({ subject, to }) => {
          sent.push({ subject, to })
        },
      },
      settings: {
        adminNotificationEmail: 'admin@example.com',
        bookingSupportEmail: 'support@example.com',
      },
    })

    expect(sent).toEqual([
      {
        subject: 'NEZCC booking request received: NEZCC-BKG-2026-000321',
        to: 'requester@example.com',
      },
      {
        subject: 'New NEZCC booking request: NEZCC-BKG-2026-000321',
        to: 'admin@example.com',
      },
    ])
  })

  test('logs email failures without throwing', async () => {
    await expect(
      sendBookingCreationEmails({
        booking,
        payload: {
          sendEmail: async () => {
            throw new Error('SMTP unavailable')
          },
        },
        settings: {
          adminNotificationEmail: 'admin@example.com',
        },
      }),
    ).resolves.toBeUndefined()
  })

  test('uses the need-more-information template for that status', async () => {
    const sent: { subject: string; text?: string }[] = []

    await sendBookingStatusChangeEmail({
      booking: {
        ...booking,
        adminNotes: 'Please confirm the event address and expected audience size.',
        bookingStatus: 'need-more-information',
      },
      payload: {
        sendEmail: async ({ subject, text }) => {
          sent.push({ subject, text })
        },
      },
      previousBookingStatus: 'under-review',
      previousPaymentStatus: 'not-required',
    })

    expect(sent).toHaveLength(1)
    expect(sent[0].subject).toBe('More information needed for NEZCC booking NEZCC-BKG-2026-000321')
    expect(sent[0].text).toContain('NEZCC needs more information')
    expect(sent[0].text).toContain('Please confirm the event address')
  })

  test('includes payment link/reference in status update emails when present', async () => {
    const sent: { text?: string }[] = []

    await sendBookingStatusChangeEmail({
      booking: {
        ...booking,
        bookingStatus: 'pending-payment',
        finalPayableAmount: 15000,
        paymentLinkReference: 'https://payments.example/nezcc-321',
        paymentStatus: 'link-sent',
      },
      payload: {
        sendEmail: async ({ text }) => {
          sent.push({ text })
        },
      },
      previousBookingStatus: 'approved',
      previousPaymentStatus: 'pending',
    })

    expect(sent[0].text).toContain('Payment link/reference: https://payments.example/nezcc-321')
    expect(sent[0].text).toContain('₹15,000')
  })
})
