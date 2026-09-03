import type { PayloadRequest } from 'payload'

const BOOKING_REFERENCE_PREFIX = 'NEZCC-BKG'

type CounterDoc = {
  sequence?: number
}

const getCounterModel = (req: PayloadRequest) => {
  const collection = req.payload.db.collections['booking-reference-counters']

  if (!collection) {
    throw new Error('Booking reference counter collection is not registered')
  }

  return collection.collection
}

const getReferenceYear = (date = new Date()) => date.getFullYear()

export const formatBookingReference = (year: number, sequence: number) => {
  return `${BOOKING_REFERENCE_PREFIX}-${year}-${String(sequence).padStart(6, '0')}`
}

export const generateBookingReference = async (req: PayloadRequest, date = new Date()) => {
  const year = getReferenceYear(date)
  const key = `booking-${year}`
  const counterModel = getCounterModel(req)

  const counter = await counterModel.findOneAndUpdate(
    { key },
    {
      $inc: { sequence: 1 },
      $setOnInsert: {
        key,
        year,
        createdAt: new Date(),
      },
      $set: {
        updatedAt: new Date(),
      },
    },
    {
      returnDocument: 'after',
      upsert: true,
    },
  )

  const sequence = (counter as CounterDoc | null)?.sequence

  if (typeof sequence !== 'number' || sequence < 1) {
    throw new Error('Booking reference counter did not return a valid sequence')
  }

  return formatBookingReference(year, sequence)
}
