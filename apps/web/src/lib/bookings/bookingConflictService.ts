type RelationshipValue = number | string | { id?: number | string | null } | null | undefined

type PayloadLike = {
  find: (args: Record<string, unknown> & {
    collection: 'availability-blocks' | 'booking-requests'
    depth?: number
    limit?: number
    overrideAccess?: boolean
  }) => Promise<{ docs: unknown[] }>
  findByID: (args: Record<string, unknown> & {
    collection: 'venues'
    depth?: number
    id: number | string
    overrideAccess?: boolean
  }) => Promise<unknown>
}

export type BookingWarningInput = {
  bookingType?: 'artist' | 'venue' | null
  id?: number | string | null
  artist?: RelationshipValue
  venue?: RelationshipValue
  startDateTime?: string | null
  endDateTime?: string | null
  expectedAudienceSize?: number | null
  warningOverride?: boolean | null
  warningOverrideReason?: string | null
}

export type BookingWarnings = {
  availabilityBlocks: Array<number | string>
  availabilityBlockReasons: Array<{ reason: string }>
  availabilityBlockWarning: boolean
  capacityWarning: boolean
  conflictType: string | null
  conflictingBookings: Array<number | string>
  conflictingBookingReferences: Array<{ reference: string }>
  hasConflict: boolean
  warningNotes: string | null
}

export type AvailabilityBlockInput = {
  artist?: RelationshipValue
  endDateTime?: string | null
  resourceType?: 'artist' | 'venue' | null
  startDateTime?: string | null
  venue?: RelationshipValue
}

const conflictRelevantStatuses = ['new', 'under-review', 'need-more-information', 'approved', 'pending-payment', 'confirmed']

export const timeRangesOverlap = ({
  existingEnd,
  existingStart,
  newEnd,
  newStart,
}: {
  existingEnd: string | Date
  existingStart: string | Date
  newEnd: string | Date
  newStart: string | Date
}) => new Date(newStart).getTime() < new Date(existingEnd).getTime() && new Date(newEnd).getTime() > new Date(existingStart).getTime()

export const getRelationshipId = (value: RelationshipValue) => {
  if (!value) return null
  if (typeof value === 'object') return value.id ?? null

  return value
}

const asRecord = (value: unknown) => (value && typeof value === 'object' ? (value as Record<string, unknown>) : null)

const asString = (value: unknown) => (typeof value === 'string' && value.trim() ? value.trim() : null)

const asNumber = (value: unknown) => (typeof value === 'number' && Number.isFinite(value) ? value : null)

const idsFromDocs = (docs: unknown[]) =>
  docs
    .map((doc) => asRecord(doc)?.id)
    .filter((id): id is number | string => typeof id === 'number' || typeof id === 'string')

const warningNotes = ({
  availabilityBlockWarning,
  capacityWarning,
  hasConflict,
}: {
  availabilityBlockWarning: boolean
  capacityWarning: boolean
  hasConflict: boolean
}) => {
  const notes = []

  if (hasConflict) notes.push('Overlapping booking request found.')
  if (availabilityBlockWarning) notes.push('Overlapping availability block found.')
  if (capacityWarning) notes.push('Expected audience exceeds venue capacity.')

  return notes.length > 0 ? notes.join(' ') : null
}

export const buildConflictQuery = (booking: BookingWarningInput) => {
  const resourceId = booking.bookingType === 'artist' ? getRelationshipId(booking.artist) : getRelationshipId(booking.venue)
  const resourceField = booking.bookingType === 'artist' ? 'artist' : 'venue'

  if (!booking.bookingType || !resourceId || !booking.startDateTime || !booking.endDateTime) {
    return null
  }

  const and: Record<string, unknown>[] = [
    { bookingType: { equals: booking.bookingType } },
    { [resourceField]: { equals: resourceId } },
    { bookingStatus: { in: conflictRelevantStatuses } },
    { startDateTime: { less_than: booking.endDateTime } },
    { endDateTime: { greater_than: booking.startDateTime } },
  ]

  if (booking.id) {
    and.push({ id: { not_equals: booking.id } })
  }

  return { and }
}

export const buildAvailabilityBlockQuery = (booking: BookingWarningInput) => {
  const resourceId = booking.bookingType === 'artist' ? getRelationshipId(booking.artist) : getRelationshipId(booking.venue)
  const resourceField = booking.bookingType === 'artist' ? 'artist' : 'venue'

  if (!booking.bookingType || !resourceId || !booking.startDateTime || !booking.endDateTime) {
    return null
  }

  return {
    and: [
      { resourceType: { equals: booking.bookingType } },
      { [resourceField]: { equals: resourceId } },
      { isActive: { equals: true } },
      { startDateTime: { less_than: booking.endDateTime } },
      { endDateTime: { greater_than: booking.startDateTime } },
    ],
  }
}

export const analyzeBookingWarnings = async ({
  booking,
  payload,
}: {
  booking: BookingWarningInput
  payload: PayloadLike
}): Promise<BookingWarnings> => {
  const conflictQuery = buildConflictQuery(booking)
  const availabilityBlockQuery = buildAvailabilityBlockQuery(booking)
  const venueId = getRelationshipId(booking.venue)
  const [bookingConflicts, availabilityConflicts, venue] = await Promise.all([
    conflictQuery
      ? payload.find({
          collection: 'booking-requests',
          depth: 0,
          limit: 50,
          overrideAccess: true,
          where: conflictQuery,
        })
      : Promise.resolve({ docs: [] }),
    availabilityBlockQuery
      ? payload.find({
          collection: 'availability-blocks',
          depth: 0,
          limit: 50,
          overrideAccess: true,
          where: availabilityBlockQuery,
        })
      : Promise.resolve({ docs: [] }),
    booking.bookingType === 'venue' && venueId
      ? payload.findByID({ collection: 'venues', depth: 0, id: venueId, overrideAccess: true })
      : Promise.resolve(null),
  ])

  const expectedAudienceSize = asNumber(booking.expectedAudienceSize)
  const capacity = asNumber(asRecord(venue)?.capacity)
  const hasConflict = bookingConflicts.docs.length > 0
  const availabilityBlockWarning = availabilityConflicts.docs.length > 0
  const capacityWarning =
    booking.bookingType === 'venue' && expectedAudienceSize !== null && capacity !== null && expectedAudienceSize > capacity

  return {
    availabilityBlocks: idsFromDocs(availabilityConflicts.docs),
    availabilityBlockReasons: availabilityConflicts.docs
      .map((doc) => asString(asRecord(doc)?.reason))
      .filter((reason): reason is string => Boolean(reason))
      .map((reason) => ({ reason })),
    availabilityBlockWarning,
    capacityWarning,
    conflictType: hasConflict ? 'booking-overlap' : availabilityBlockWarning ? 'availability-block' : capacityWarning ? 'capacity' : null,
    conflictingBookings: idsFromDocs(bookingConflicts.docs),
    conflictingBookingReferences: bookingConflicts.docs
      .map((doc) => asString(asRecord(doc)?.bookingReference))
      .filter((reference): reference is string => Boolean(reference))
      .map((reference) => ({ reference })),
    hasConflict,
    warningNotes: warningNotes({ availabilityBlockWarning, capacityWarning, hasConflict }),
  }
}

export const validateWarningOverride = ({
  originalWarningOverride,
  warningOverride,
  warningOverrideReason,
}: {
  originalWarningOverride?: boolean | null
  warningOverride?: boolean | null
  warningOverrideReason?: string | null
}) => {
  if (warningOverride && !warningOverrideReason?.trim()) {
    throw new Error('warningOverrideReason is required when overriding booking warnings')
  }

  return Boolean(warningOverride && !originalWarningOverride)
}

export const validateAvailabilityBlock = (block: AvailabilityBlockInput) => {
  const hasArtist = Boolean(getRelationshipId(block.artist))
  const hasVenue = Boolean(getRelationshipId(block.venue))

  if (block.resourceType === 'artist' && !hasArtist) {
    throw new Error('Artist availability blocks require an artist.')
  }

  if (block.resourceType === 'venue' && !hasVenue) {
    throw new Error('Venue availability blocks require a venue.')
  }

  if (hasArtist && hasVenue) {
    throw new Error('Availability blocks can reference either an artist or a venue, not both.')
  }

  if (block.startDateTime && block.endDateTime && new Date(block.endDateTime).getTime() <= new Date(block.startDateTime).getTime()) {
    throw new Error('Availability block endDateTime must be after startDateTime.')
  }
}
