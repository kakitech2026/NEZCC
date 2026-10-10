export type BookingFormResource = {
  bookingType: 'artist' | 'venue'
  resourceId: string
  sourcePage: string
}

export const createBookingIdempotencyToken = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `booking-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

const toStringValue = (value: FormDataEntryValue | null) => (typeof value === 'string' ? value.trim() : '')

const toOptionalNumber = (value: string) => {
  if (!value) return undefined

  const numberValue = Number(value)

  return Number.isFinite(numberValue) ? numberValue : undefined
}

const toISODateTime = (value: string) => {
  if (!value) return ''

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return value

  return date.toISOString()
}

export const buildBookingSubmission = ({
  formData,
  idempotencyToken,
  resource,
}: {
  formData: FormData
  idempotencyToken: string
  resource: BookingFormResource
}) => {
  const timeType = toStringValue(formData.get('timeType')) || 'exact'
  const expectedAudienceSize = toOptionalNumber(toStringValue(formData.get('expectedAudienceSize')))
  const budgetAmount = toOptionalNumber(toStringValue(formData.get('budgetAmount')))

  return {
    bookingType: resource.bookingType,
    ...(resource.bookingType === 'artist' ? { artist: resource.resourceId } : { venue: resource.resourceId }),
    budgetAmount,
    budgetNotes: toStringValue(formData.get('budgetNotes')),
    email: toStringValue(formData.get('email')),
    endDateTime: toISODateTime(toStringValue(formData.get('endDateTime'))),
    eventLocation: resource.bookingType === 'artist' ? toStringValue(formData.get('eventLocation')) : undefined,
    eventLocationNotes: resource.bookingType === 'venue' ? toStringValue(formData.get('eventLocationNotes')) : undefined,
    eventName: toStringValue(formData.get('eventName')),
    eventType: toStringValue(formData.get('eventType')),
    expectedAudienceSize,
    idempotencyToken,
    message: toStringValue(formData.get('message')),
    organizationName: toStringValue(formData.get('organizationName')),
    phone: toStringValue(formData.get('phone')),
    privacyAccepted: formData.get('privacyAccepted') === 'true',
    requesterName: toStringValue(formData.get('requesterName')),
    sourcePage: resource.sourcePage,
    specialRequirements: toStringValue(formData.get('specialRequirements')),
    startDateTime: toISODateTime(toStringValue(formData.get('startDateTime'))),
    termsAccepted: formData.get('termsAccepted') === 'true',
    timeType,
    website: toStringValue(formData.get('website')),
  }
}
