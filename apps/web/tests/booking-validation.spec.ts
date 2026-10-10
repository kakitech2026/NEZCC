import { expect, test } from '@playwright/test'
import type { Payload } from 'payload'

import { validateBookingInput, type BookingValidationInput } from '@nezcc/cms/bookings/bookingValidationService'

const futureStart = '2026-10-10T10:00:00.000Z'
const futureEnd = '2026-10-10T12:00:00.000Z'
const now = new Date('2026-09-03T00:00:00.000Z')

const validArtistInput: BookingValidationInput = {
  artist: 'artist-1',
  bookingType: 'artist',
  email: 'USER@Example.com',
  endDateTime: futureEnd,
  eventLocation: 'Community Hall, Dimapur',
  eventName: 'Cultural Evening',
  eventType: 'Performance',
  phone: '+91 98765 43210',
  privacyAccepted: true,
  requesterName: 'Test User',
  startDateTime: futureStart,
  termsAccepted: true,
  timeType: 'exact',
}

const validVenueInput: BookingValidationInput = {
  bookingType: 'venue',
  email: 'venue@example.com',
  endDateTime: futureEnd,
  eventLocationNotes: 'Main stage preferred',
  eventName: 'Workshop',
  eventType: 'Training',
  phone: '+91 98765 43210',
  privacyAccepted: true,
  requesterName: 'Venue User',
  startDateTime: futureStart,
  termsAccepted: true,
  timeType: 'exact',
  venue: 'venue-1',
}

const createPayload = (
  resources: Record<string, { bookingEnabled?: boolean; isActive?: boolean; isPublished?: boolean } | null> = {},
) =>
  ({
    findByID: async ({ id }: { id: string }) =>
      resources[id] ?? {
        bookingEnabled: true,
        isActive: true,
        isPublished: true,
      },
  }) as unknown as Payload

test.describe('booking validation service', () => {
  test('normalizes and sanitizes valid artist bookings', async () => {
    const result = await validateBookingInput({
      input: {
        ...validArtistInput,
        eventName: '<strong>Cultural Evening</strong>',
        organizationName: '  NEZCC   Partner  ',
      },
      now,
      payload: createPayload(),
    })

    expect(result.bookingType).toBe('artist')
    expect(result.artist).toBe('artist-1')
    expect(result.venue).toBeUndefined()
    expect(result.email).toBe('user@example.com')
    expect(result.eventName).toBe('Cultural Evening')
    expect(result.organizationName).toBe('NEZCC Partner')
  })

  test('normalizes valid venue bookings without accepting artist location as authoritative', async () => {
    const result = await validateBookingInput({
      input: {
        ...validVenueInput,
        eventLocation: 'Different venue address',
      },
      now,
      payload: createPayload(),
    })

    expect(result.bookingType).toBe('venue')
    expect(result.venue).toBe('venue-1')
    expect(result.artist).toBeUndefined()
    expect(result.eventLocation).toBeUndefined()
    expect(result.eventLocationNotes).toBe('Main stage preferred')
  })

  test('rejects artist bookings with a venue or missing artist', async () => {
    await expect(
      validateBookingInput({
        input: {
          ...validArtistInput,
          venue: 'venue-1',
        },
        now,
        payload: createPayload(),
      }),
    ).rejects.toThrow('artist bookings require exactly one artist and no venue')

    await expect(
      validateBookingInput({
        input: {
          ...validArtistInput,
          artist: undefined,
        },
        now,
        payload: createPayload(),
      }),
    ).rejects.toThrow('artist bookings require exactly one artist and no venue')
  })

  test('rejects venue bookings with an artist or missing venue', async () => {
    await expect(
      validateBookingInput({
        input: {
          ...validVenueInput,
          artist: 'artist-1',
        },
        now,
        payload: createPayload(),
      }),
    ).rejects.toThrow('venue bookings require exactly one venue and no artist')

    await expect(
      validateBookingInput({
        input: {
          ...validVenueInput,
          venue: undefined,
        },
        now,
        payload: createPayload(),
      }),
    ).rejects.toThrow('venue bookings require exactly one venue and no artist')
  })

  test('rejects unpublished inactive or booking-disabled resources', async () => {
    await expect(
      validateBookingInput({
        input: validArtistInput,
        now,
        payload: createPayload({
          'artist-1': {
            bookingEnabled: false,
            isActive: true,
            isPublished: true,
          },
        }),
      }),
    ).rejects.toThrow('artist is not currently bookable')
  })

  test('rejects invalid exact and flexible ranges', async () => {
    for (const timeType of ['exact', 'flexible'] as const) {
      await expect(
        validateBookingInput({
          input: {
            ...validArtistInput,
            endDateTime: futureStart,
            timeType,
          },
          now,
          payload: createPayload(),
        }),
      ).rejects.toThrow('endDateTime must be after startDateTime')
    }
  })

  test('allows full-day bookings with the same IST calendar date', async () => {
    const result = await validateBookingInput({
      input: {
        ...validArtistInput,
        endDateTime: '2026-10-10T18:00:00.000Z',
        startDateTime: '2026-10-10T02:00:00.000Z',
        timeType: 'full-day',
      },
      now,
      payload: createPayload(),
    })

    expect(result.startDateTime).toBe('2026-10-09T18:30:00.000Z')
    expect(result.endDateTime).toBe('2026-10-10T18:30:00.000Z')
  })

  test('rejects past start date and missing consent', async () => {
    await expect(
      validateBookingInput({
        input: {
          ...validArtistInput,
          endDateTime: '2026-09-02T12:00:00.000Z',
          startDateTime: '2026-09-02T10:00:00.000Z',
        },
        now,
        payload: createPayload(),
      }),
    ).rejects.toThrow('startDateTime cannot be in the past')

    await expect(
      validateBookingInput({
        input: {
          ...validArtistInput,
          termsAccepted: false,
        },
        now,
        payload: createPayload(),
      }),
    ).rejects.toThrow('termsAccepted must be accepted')
  })

  test('rejects invalid email phone and negative numeric fields', async () => {
    await expect(
      validateBookingInput({
        input: {
          ...validArtistInput,
          email: 'bad-email',
        },
        now,
        payload: createPayload(),
      }),
    ).rejects.toThrow('email must be a valid email address')

    await expect(
      validateBookingInput({
        input: {
          ...validArtistInput,
          phone: 'abc',
        },
        now,
        payload: createPayload(),
      }),
    ).rejects.toThrow('phone must be a valid phone number')

    await expect(
      validateBookingInput({
        input: {
          ...validArtistInput,
          budgetAmount: -1,
        },
        now,
        payload: createPayload(),
      }),
    ).rejects.toThrow('budgetAmount must be a non-negative number')
  })
})
