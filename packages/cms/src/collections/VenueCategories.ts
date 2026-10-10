import type { CollectionConfig } from 'payload'

const isAuthenticated = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

export const VenueCategories: CollectionConfig = {
  slug: 'venue-categories',
  labels: {
    singular: 'Venue Category',
    plural: 'Venue Categories',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'isActive', 'sortOrder'],
    group: 'Bookings',
    description: 'Reusable categories for NEZCC venue types.',
  },
  access: {
    create: isAuthenticated,
    read: ({ req }) => {
      if (req.user) return true

      return {
        isActive: {
          equals: true,
        },
      }
    },
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
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
