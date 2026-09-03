import type { CollectionConfig } from 'payload'

const isAuthenticated = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

export const AvailabilityBlocks: CollectionConfig = {
  slug: 'availability-blocks',
  labels: {
    singular: 'Availability Block',
    plural: 'Availability Blocks',
  },
  admin: {
    useAsTitle: 'reason',
    defaultColumns: ['resourceType', 'artist', 'venue', 'startDateTime', 'endDateTime', 'isActive'],
    group: 'Bookings',
    description: 'Admin-only artist or venue unavailability blocks for closures, travel, maintenance, or internal reservations.',
  },
  access: {
    create: isAuthenticated,
    read: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      name: 'resourceType',
      type: 'select',
      required: true,
      options: [
        { label: 'Artist', value: 'artist' },
        { label: 'Venue', value: 'venue' },
      ],
    },
    {
      name: 'artist',
      type: 'relationship',
      relationTo: 'artists',
      admin: {
        condition: (_, siblingData) => siblingData?.resourceType === 'artist',
      },
    },
    {
      name: 'venue',
      type: 'relationship',
      relationTo: 'venues',
      admin: {
        condition: (_, siblingData) => siblingData?.resourceType === 'venue',
      },
    },
    {
      name: 'startDateTime',
      type: 'date',
      required: true,
      index: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDateTime',
      type: 'date',
      required: true,
      index: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'reason',
      type: 'text',
      required: true,
    },
    {
      name: 'notes',
      type: 'textarea',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
