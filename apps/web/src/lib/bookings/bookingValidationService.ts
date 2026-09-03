import type { Payload } from 'payload'

export type BookingType = 'artist' | 'venue'
export type BookingTimeType = 'exact' | 'flexible' | 'full-day'

export type BookingValidationInput = {
  bookingType?: unknown
  artist?: unknown
  venue?: unknown
  requesterName?: unknown
  organizationName?: unknown
  email?: unknown
  phone?: unknown
  eventName?: unknown
  eventType?: unknown
  eventLocation?: unknown
  eventLocationNotes?: unknown
  startDateTime?: unknown
  endDateTime?: unknown
  timeType?: unknown
  expectedAudienceSize?: unknown
  budgetAmount?: unknown
  budgetNotes?: unknown
  specialRequirements?: unknown
  message?: unknown
  termsAccepted?: unknown
  privacyAccepted?: unknown
  sourcePage?: unknown
  idempotencyToken?: unknown
}

export type ValidatedBookingInput = {
  bookingType: BookingType
  artist?: string
  venue?: string
  requesterName: string
  organizationName?: string
  email: string
  phone: string
  eventName: string
  eventType: string
  eventLocation?: string
  eventLocationNotes?: string
  startDateTime: string
  endDateTime: string
  timeType: BookingTimeType
  expectedAudienceSize?: number
  budgetAmount?: number
  budgetNotes?: string
  specialRequirements?: string
  message?: string
  termsAccepted: true
  privacyAccepted: true
  sourcePage?: string
  idempotencyToken?: string
}

type BookableResource = {
  bookingEnabled?: boolean | null
  isActive?: boolean | null
  isPublished?: boolean | null
}

type PayloadForBookingValidation = Pick<Payload, 'findByID'>

type ValidateBookingInputArgs = {
  input: BookingValidationInput
  now?: Date
  payload: PayloadForBookingValidation
}

const IST_OFFSET_MINUTES = 330
const MAX_SHORT_TEXT_LENGTH = 200
const MAX_LONG_TEXT_LENGTH = 3000

const stripHTML = (value: string) => value.replace(/<[^>]*>/g, '')

const sanitizeText = (value: unknown, maxLength: number, field: string, required = false) => {
  if (typeof value !== 'string') {
    if (required) throw new Error(`${field} is required`)
    return undefined
  }

  const sanitized = stripHTML(value).replace(/\s+/g, ' ').trim()

  if (!sanitized) {
    if (required) throw new Error(`${field} is required`)
    return undefined
  }

  if (sanitized.length > maxLength) {
    throw new Error(`${field} must be ${maxLength} characters or fewer`)
  }

  return sanitized
}

const sanitizeRequiredText = (value: unknown, maxLength: number, field: string) => {
  const sanitized = sanitizeText(value, maxLength, field, true)

  if (!sanitized) {
    throw new Error(`${field} is required`)
  }

  return sanitized
}

const parseRequiredDate = (value: unknown, field: string) => {
  if (typeof value !== 'string' && !(value instanceof Date)) {
    throw new Error(`${field} is required`)
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    throw new Error(`${field} must be a valid date/time`)
  }

  return date
}

const getISTDateParts = (date: Date) => {
  const ist = new Date(date.getTime() + IST_OFFSET_MINUTES * 60 * 1000)

  return {
    day: ist.getUTCDate(),
    month: ist.getUTCMonth() + 1,
    year: ist.getUTCFullYear(),
  }
}

const getISTDayStartUTC = ({ day, month, year }: { day: number; month: number; year: number }) => {
  return new Date(Date.UTC(year, month - 1, day, 0, -IST_OFFSET_MINUTES, 0, 0))
}

const normalizeFullDayRange = (start: Date, end: Date) => {
  const startParts = getISTDateParts(start)
  const endParts = getISTDateParts(end)
  const normalizedStart = getISTDayStartUTC(startParts)
  const normalizedEndStart = getISTDayStartUTC(endParts)

  if (normalizedEndStart.getTime() < normalizedStart.getTime()) {
    throw new Error('endDateTime must not be before startDateTime')
  }

  const normalizedEnd = new Date(normalizedEndStart.getTime() + 24 * 60 * 60 * 1000)

  return {
    endDateTime: normalizedEnd.toISOString(),
    startDateTime: normalizedStart.toISOString(),
  }
}

const parseTimeType = (value: unknown): BookingTimeType => {
  if (value === 'exact' || value === 'flexible' || value === 'full-day') {
    return value
  }

  throw new Error('timeType must be exact, flexible, or full-day')
}

const parseBookingType = (value: unknown): BookingType => {
  if (value === 'artist' || value === 'venue') {
    return value
  }

  throw new Error('bookingType must be artist or venue')
}

const parseOptionalNumber = (value: unknown, field: string) => {
  if (value === undefined || value === null || value === '') return undefined

  const numberValue = typeof value === 'number' ? value : Number(value)

  if (!Number.isFinite(numberValue) || numberValue < 0) {
    throw new Error(`${field} must be a non-negative number`)
  }

  return numberValue
}

const parseRelationshipID = (value: unknown, field: string) => {
  if (typeof value === 'string' && value.trim()) {
    return value.trim()
  }

  if (typeof value === 'object' && value !== null && 'id' in value && typeof value.id === 'string') {
    return value.id
  }

  throw new Error(`${field} is required`)
}

const validateEmail = (email: string) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('email must be a valid email address')
  }
}

const validatePhone = (phone: string) => {
  if (!/^\+?[0-9][0-9\s\-()]{6,24}$/.test(phone)) {
    throw new Error('phone must be a valid phone number')
  }
}

const validateConsent = (value: unknown, field: string) => {
  if (value !== true) {
    throw new Error(`${field} must be accepted`)
  }
}

const assertBookableResource = async ({
  id,
  payload,
  type,
}: {
  id: string
  payload: PayloadForBookingValidation
  type: BookingType
}) => {
  const resource = (await payload.findByID({
    collection: type === 'artist' ? 'artists' : 'venues',
    id,
    overrideAccess: true,
  })) as BookableResource | null

  if (!resource) {
    throw new Error(`${type} was not found`)
  }

  if (resource.isPublished !== true || resource.isActive !== true || resource.bookingEnabled !== true) {
    throw new Error(`${type} is not currently bookable`)
  }
}

export const validateBookingInput = async ({
  input,
  now = new Date(),
  payload,
}: ValidateBookingInputArgs): Promise<ValidatedBookingInput> => {
  const bookingType = parseBookingType(input.bookingType)
  const hasArtist = Boolean(input.artist)
  const hasVenue = Boolean(input.venue)

  if (bookingType === 'artist' && (hasVenue || !hasArtist)) {
    throw new Error('artist bookings require exactly one artist and no venue')
  }

  if (bookingType === 'venue' && (hasArtist || !hasVenue)) {
    throw new Error('venue bookings require exactly one venue and no artist')
  }

  const timeType = parseTimeType(input.timeType)
  const start = parseRequiredDate(input.startDateTime, 'startDateTime')
  const end = parseRequiredDate(input.endDateTime, 'endDateTime')
  const normalizedDates =
    timeType === 'full-day'
      ? normalizeFullDayRange(start, end)
      : {
          endDateTime: end.toISOString(),
          startDateTime: start.toISOString(),
        }

  const normalizedStart = new Date(normalizedDates.startDateTime)
  const normalizedEnd = new Date(normalizedDates.endDateTime)

  if (normalizedStart.getTime() < now.getTime()) {
    throw new Error('startDateTime cannot be in the past')
  }

  if (timeType !== 'full-day' && normalizedEnd.getTime() <= normalizedStart.getTime()) {
    throw new Error('endDateTime must be after startDateTime')
  }

  const requesterName = sanitizeRequiredText(input.requesterName, MAX_SHORT_TEXT_LENGTH, 'requesterName')
  const email = sanitizeRequiredText(input.email, MAX_SHORT_TEXT_LENGTH, 'email').toLowerCase()
  const phone = sanitizeRequiredText(input.phone, MAX_SHORT_TEXT_LENGTH, 'phone')
  const eventName = sanitizeRequiredText(input.eventName, MAX_SHORT_TEXT_LENGTH, 'eventName')
  const eventType = sanitizeRequiredText(input.eventType, MAX_SHORT_TEXT_LENGTH, 'eventType')

  validateEmail(email)
  validatePhone(phone)
  validateConsent(input.termsAccepted, 'termsAccepted')
  validateConsent(input.privacyAccepted, 'privacyAccepted')

  const artist = bookingType === 'artist' ? parseRelationshipID(input.artist, 'artist') : undefined
  const venue = bookingType === 'venue' ? parseRelationshipID(input.venue, 'venue') : undefined

  await assertBookableResource({
    id: artist ?? venue ?? '',
    payload,
    type: bookingType,
  })

  const eventLocation =
    bookingType === 'artist' ? sanitizeRequiredText(input.eventLocation, MAX_LONG_TEXT_LENGTH, 'eventLocation') : undefined

  return {
    artist,
    bookingType,
    budgetAmount: parseOptionalNumber(input.budgetAmount, 'budgetAmount'),
    budgetNotes: sanitizeText(input.budgetNotes, MAX_LONG_TEXT_LENGTH, 'budgetNotes'),
    email,
    endDateTime: normalizedDates.endDateTime,
    eventLocation,
    eventLocationNotes: sanitizeText(input.eventLocationNotes, MAX_LONG_TEXT_LENGTH, 'eventLocationNotes'),
    eventName,
    eventType,
    expectedAudienceSize: parseOptionalNumber(input.expectedAudienceSize, 'expectedAudienceSize'),
    idempotencyToken: sanitizeText(input.idempotencyToken, MAX_SHORT_TEXT_LENGTH, 'idempotencyToken'),
    message: sanitizeText(input.message, MAX_LONG_TEXT_LENGTH, 'message'),
    organizationName: sanitizeText(input.organizationName, MAX_SHORT_TEXT_LENGTH, 'organizationName'),
    phone,
    privacyAccepted: true,
    requesterName,
    sourcePage: sanitizeText(input.sourcePage, MAX_SHORT_TEXT_LENGTH, 'sourcePage'),
    specialRequirements: sanitizeText(input.specialRequirements, MAX_LONG_TEXT_LENGTH, 'specialRequirements'),
    startDateTime: normalizedDates.startDateTime,
    termsAccepted: true,
    timeType,
    venue,
  }
}
