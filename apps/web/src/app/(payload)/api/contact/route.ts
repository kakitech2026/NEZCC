import { createHash } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT_MAX = 3
const MAX_BODY_BYTES = 20_000

function getText(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ message: 'The message is too large.' }, { status: 413 })
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

  // Bots commonly fill fields hidden from people. Return success without storing them.
  if (getText(body.website, 200)) {
    return NextResponse.json({ message: 'Your message has been received.' }, { status: 201 })
  }

  const name = getText(body.name, 120)
  const email = getText(body.email, 254).toLowerCase()
  const subject = getText(body.subject, 180)
  const message = getText(body.message, 5_000)

  if (name.length < 2 || !isValidEmail(email) || subject.length < 3 || message.length < 10) {
    return NextResponse.json(
      { message: 'Please complete all fields with valid information.' },
      { status: 400 },
    )
  }

  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const clientAddress = forwardedFor || request.headers.get('x-real-ip') || 'unknown'
  const fingerprintHash = createHash('sha256')
    .update(`${clientAddress}:${process.env.PAYLOAD_SECRET || 'nezcc-contact'}`)
    .digest('hex')
  const payload = await getPayload({ config: configPromise })
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString()
  const recent = await payload.find({
    collection: 'contact-submissions',
    overrideAccess: true,
    limit: RATE_LIMIT_MAX,
    pagination: false,
    where: {
      and: [
        { fingerprintHash: { equals: fingerprintHash } },
        { submittedAt: { greater_than: since } },
      ],
    },
  })

  if (recent.docs.length >= RATE_LIMIT_MAX) {
    return NextResponse.json(
      { message: 'Too many messages were sent. Please try again later.' },
      { status: 429 },
    )
  }

  await payload.create({
    collection: 'contact-submissions',
    overrideAccess: true,
    data: {
      status: 'new',
      name,
      email,
      subject,
      message,
      submittedAt: new Date().toISOString(),
      fingerprintHash,
    },
  })

  return NextResponse.json({ message: 'Your message has been sent successfully.' }, { status: 201 })
}
