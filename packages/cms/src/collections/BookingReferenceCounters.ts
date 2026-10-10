import type { CollectionConfig } from 'payload'

const isAuthenticated = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

export const BookingReferenceCounters: CollectionConfig = {
  slug: 'booking-reference-counters',
  labels: {
    singular: 'Booking Reference Counter',
    plural: 'Booking Reference Counters',
  },
  admin: {
    useAsTitle: 'key',
    defaultColumns: ['key', 'year', 'sequence'],
    group: 'Bookings',
    hidden: true,
    description: 'Internal atomic counters for booking reference generation.',
  },
  access: {
    create: isAuthenticated,
    read: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      name: 'key',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'year',
      type: 'number',
      required: true,
      index: true,
    },
    {
      name: 'sequence',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
  ],
}
