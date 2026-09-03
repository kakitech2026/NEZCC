import type { GlobalConfig } from 'payload'

export const BookingSettings: GlobalConfig = {
  slug: 'booking-settings',
  label: 'Booking Settings',
  admin: {
    group: 'Bookings',
    description: 'Manage public booking notices, support contacts, and booking policy text.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            { name: 'bookingEnabled', type: 'checkbox', defaultValue: true, required: true },
            {
              name: 'publicBookingNotice',
              type: 'textarea',
              defaultValue:
                'Bookings are subject to NEZCC approval and are confirmed only after approval and payment verification.',
            },
            { name: 'adminNotificationEmail', type: 'email' },
            { name: 'bookingSupportEmail', type: 'email' },
            { name: 'bookingSupportPhone', type: 'text' },
            { name: 'defaultCurrency', type: 'text', required: true, defaultValue: 'INR' },
          ],
        },
        {
          label: 'Policies',
          fields: [
            {
              name: 'termsAndConditions',
              type: 'textarea',
              required: true,
              defaultValue: 'Booking requests are reviewed by NEZCC before confirmation.',
            },
            {
              name: 'privacyNotice',
              type: 'textarea',
              required: true,
              defaultValue: 'Requester information is collected for booking review and communication.',
            },
            {
              name: 'cancellationPolicy',
              type: 'textarea',
              defaultValue: 'Cancellation requests are reviewed by NEZCC according to applicable booking rules.',
            },
            {
              name: 'paymentRefundPolicy',
              type: 'textarea',
              label: 'Payment/Refund Policy',
              defaultValue: 'Payment and refund rules will follow the confirmed NEZCC payment process.',
            },
            {
              name: 'approvalDisclaimer',
              type: 'textarea',
              defaultValue: 'Submitting a request does not confirm a booking. NEZCC will confirm availability after review.',
            },
            {
              name: 'policyVersion',
              type: 'text',
              required: true,
              defaultValue: '1.0',
            },
            {
              name: 'policyDate',
              type: 'date',
              required: true,
              defaultValue: () => new Date().toISOString(),
              admin: {
                date: {
                  pickerAppearance: 'dayOnly',
                },
              },
            },
          ],
        },
      ],
    },
  ],
}
