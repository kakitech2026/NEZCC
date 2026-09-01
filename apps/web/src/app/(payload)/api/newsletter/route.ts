import { createHash } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT_MAX = 5
const MAX_BODY_BYTES = 5_000

function getText(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ message: 'The request is too large.' }, { status: 413 })
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

  const email = getText(body.email, 254).toLowerCase()
  const name = getText(body.name, 120)

  if (!isValidEmail(email)) {
    return NextResponse.json({ message: 'Please enter a valid email address.' }, { status: 400 })
  }

  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const clientAddress = forwardedFor || request.headers.get('x-real-ip') || 'unknown'
  const fingerprintHash = createHash('sha256')
    .update(`${clientAddress}:${process.env.PAYLOAD_SECRET || 'nezcc-newsletter'}`)
    .digest('hex')
  const payload = await getPayload({ config: configPromise })
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString()
  const recent = await payload.find({
    collection: 'newsletter-subscribers',
    overrideAccess: true,
    limit: RATE_LIMIT_MAX,
    pagination: false,
    where: {
      and: [
        { fingerprintHash: { equals: fingerprintHash } },
        { subscribedAt: { greater_than: since } },
      ],
    },
  })

  if (recent.docs.length >= RATE_LIMIT_MAX) {
    return NextResponse.json({ message: 'Too many subscription attempts. Please try again later.' }, { status: 429 })
  }

  const existing = await payload.find({
    collection: 'newsletter-subscribers',
    overrideAccess: true,
    limit: 1,
    pagination: false,
    where: {
      email: {
        equals: email,
      },
    },
  })

  if (existing.docs[0]) {
    await payload.update({
      collection: 'newsletter-subscribers',
      id: existing.docs[0].id,
      overrideAccess: true,
      data: {
        status: 'subscribed',
        name: name || existing.docs[0].name,
        source: 'Newsletter page',
        subscribedAt: new Date().toISOString(),
        fingerprintHash,
      },
    })
  } else {
    await payload.create({
      collection: 'newsletter-subscribers',
      overrideAccess: true,
      data: {
        status: 'subscribed',
        email,
        name,
        source: 'Newsletter page',
        subscribedAt: new Date().toISOString(),
        fingerprintHash,
      },
    })
  }

  return NextResponse.json({ message: 'You have been subscribed to the NEZCC newsletter.' }, { status: 201 })
}
