import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { createBookingRequest } from '@nezcc/cms/bookings/bookingCreationService'
import { getClientAddressFromHeaders } from '@nezcc/cms/bookings/bookingAntiSpamService'

const MAX_BODY_BYTES = 30_000

const badRequestMessages = [
  'artist bookings require exactly one artist and no venue',
  'bookingType must be artist or venue',
  'endDateTime must be after startDateTime',
  'endDateTime must not be before startDateTime',
  'honeypot',
  'idempotencyToken',
  'privacyAccepted must be accepted',
  'startDateTime cannot be in the past',
  'termsAccepted must be accepted',
  'timeType must be exact, flexible, or full-day',
  'venue bookings require exactly one venue and no artist',
  'website must be empty',
]

const getErrorMessage = (error: unknown) => (error instanceof Error ? error.message : 'Unable to submit booking request.')

const statusForError = (message: string) => {
  if (message === 'Bookings are currently disabled.') return 503
  if (message.includes('Too many booking requests')) return 429
  if (message.includes('not currently bookable') || message.includes('was not found')) return 400
  if (badRequestMessages.some((badRequestMessage) => message.includes(badRequestMessage))) return 400

  return 500
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ message: 'The booking request is too large.' }, { status: 413 })
  }

  const origin = request.headers.get('origin')
  if (origin && new URL(origin).host !== request.nextUrl.host) {
    return NextResponse.json({ message: 'Invalid request origin.' }, { status: 403 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: 'Invalid request.' }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const result = await createBookingRequest({
      input: {
        ...body,
        clientAddress: getClientAddressFromHeaders(request.headers),
        honeypot: body.website,
      },
      payload: payload as never,
      secret: process.env.PAYLOAD_SECRET || 'nezcc-bookings',
    })

    return NextResponse.json(result, { status: result.duplicate ? 200 : 201 })
  } catch (error) {
    const message = getErrorMessage(error)
    const status = statusForError(message)

    return NextResponse.json(
      {
        message: status === 500 ? 'Unable to submit booking request.' : message,
      },
      { status },
    )
  }
}
