import type { CollectionConfig } from 'payload'

const isAuthenticated = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

export const ArtistCategories: CollectionConfig = {
  slug: 'artist-categories',
  labels: {
    singular: 'Artist Category',
    plural: 'Artist Categories',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'isActive', 'sortOrder'],
    group: 'Bookings',
    description: 'Reusable art-form categories for cultural artists.',
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
