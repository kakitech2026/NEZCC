import type { BookingSetting } from '@/payload-types'

export type PublicBookingSettings = {
  approvalDisclaimer: string
  bookingEnabled: boolean
  bookingSupportEmail?: string
  bookingSupportPhone?: string
  cancellationPolicy?: string
  defaultCurrency: string
  paymentRefundPolicy?: string
  policyDate: string
  policyVersion: string
  privacyNotice: string
  publicBookingNotice: string
  termsAndConditions: string
}

type PayloadWithBookingSettings = {
  findGlobal: (args: { slug: 'booking-settings'; overrideAccess?: boolean }) => Promise<unknown>
}

const asBookingSettings = (value: unknown) => (value && typeof value === 'object' ? (value as Partial<BookingSetting>) : {})

const asString = (value: unknown, fallback = '') => (typeof value === 'string' && value.trim() ? value.trim() : fallback)

export const getPublicBookingSettings = async (payload: PayloadWithBookingSettings): Promise<PublicBookingSettings> => {
  const settings = asBookingSettings(
    await payload.findGlobal({
      slug: 'booking-settings',
    }),
  )

  return {
    approvalDisclaimer: asString(
      settings.approvalDisclaimer,
      'Submitting a request does not confirm a booking. NEZCC will confirm availability after review.',
    ),
    bookingEnabled: settings.bookingEnabled !== false,
    bookingSupportEmail: asString(settings.bookingSupportEmail) || undefined,
    bookingSupportPhone: asString(settings.bookingSupportPhone) || undefined,
    cancellationPolicy: asString(settings.cancellationPolicy) || undefined,
    defaultCurrency: asString(settings.defaultCurrency, 'INR'),
    paymentRefundPolicy: asString(settings.paymentRefundPolicy) || undefined,
    policyDate: asString(settings.policyDate, new Date().toISOString()),
    policyVersion: asString(settings.policyVersion, '1.0'),
    privacyNotice: asString(settings.privacyNotice, 'Requester information is collected for booking review and communication.'),
    publicBookingNotice: asString(
      settings.publicBookingNotice,
      'Bookings are subject to NEZCC approval and are confirmed only after approval and payment verification.',
    ),
    termsAndConditions: asString(settings.termsAndConditions, 'Booking requests are reviewed by NEZCC before confirmation.'),
  }
}

export const formatPolicyDate = (policyDate: string) => {
  const date = new Date(policyDate)

  if (Number.isNaN(date.getTime())) return policyDate

  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
