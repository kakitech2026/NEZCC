import type { CollectionConfig } from 'payload'

const isAuthenticated = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

const readPrivateField = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

export const Artists: CollectionConfig = {
  slug: 'artists',
  labels: {
    singular: 'Artist',
    plural: 'Artists',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'artistType', 'stateRegion', 'isPublished', 'isActive', 'bookingEnabled'],
    group: 'Bookings',
    description: 'Admin-managed cultural artist profiles under or associated with NEZCC.',
  },
  access: {
    create: isAuthenticated,
    read: ({ req }) => {
      if (req.user) return true

      return {
        isPublished: {
          equals: true,
        },
        isActive: {
          equals: true,
        },
      }
    },
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: {
    beforeDelete: [
      async ({ id, req }) => {
        const bookings = await req.payload.find({
          collection: 'booking-requests',
          depth: 0,
          limit: 1,
          where: {
            artist: {
              equals: id,
            },
          },
        })

        if (bookings.totalDocs > 0) {
          throw new Error('Artists with booking history cannot be deleted. Mark the artist inactive instead.')
        }
      },
    ],
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
      admin: {
        description: 'Public URL slug for the artist profile.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Profile',
          fields: [
            {
              name: 'artistType',
              type: 'select',
              required: true,
              defaultValue: 'individual',
              options: [
                { label: 'Individual', value: 'individual' },
                { label: 'Group', value: 'group' },
              ],
            },
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'artist-categories',
              hasMany: true,
            },
            {
              name: 'stateRegion',
              type: 'text',
              required: true,
              label: 'State/Region',
            },
            {
              name: 'districtCity',
              type: 'text',
              label: 'District/City',
            },
            {
              name: 'shortBiography',
              type: 'textarea',
              required: true,
            },
            {
              name: 'detailedProfile',
              type: 'textarea',
            },
            {
              name: 'culturalHighlights',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
              ],
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            {
              name: 'photoGallery',
              type: 'array',
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
                { name: 'alt', type: 'text', required: true },
                { name: 'caption', type: 'text' },
              ],
            },
            {
              name: 'videoLinks',
              type: 'array',
              fields: [
                { name: 'title', type: 'text' },
                { name: 'url', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Performance',
          fields: [
            { name: 'awardsRecognition', type: 'textarea', label: 'Awards/Recognition' },
            { name: 'yearsOfExperience', type: 'number' },
            { name: 'languagesSpoken', type: 'text' },
            { name: 'performanceDuration', type: 'text' },
            { name: 'teamSize', type: 'number' },
            {
              name: 'travelAvailability',
              type: 'select',
              defaultValue: 'subject-to-confirmation',
              options: [
                { label: 'Available to Travel', value: 'available' },
                { label: 'Local Only', value: 'local-only' },
                { label: 'Subject to Confirmation', value: 'subject-to-confirmation' },
                { label: 'Not Available', value: 'not-available' },
              ],
            },
          ],
        },
        {
          label: 'Links & Pricing',
          fields: [
            { name: 'facebookURL', type: 'text', label: 'Facebook URL' },
            { name: 'instagramURL', type: 'text', label: 'Instagram URL' },
            { name: 'youtubeURL', type: 'text', label: 'YouTube URL' },
            { name: 'websiteURL', type: 'text', label: 'Website URL' },
            {
              name: 'indicativeFeeText',
              type: 'text',
              admin: {
                description: 'Optional public indicative/base fee text. Final pricing is set by NEZCC admin per booking.',
              },
            },
          ],
        },
        {
          label: 'Internal',
          fields: [
            { name: 'internalContactPerson', type: 'text', access: { read: readPrivateField } },
            { name: 'internalPhone', type: 'text', access: { read: readPrivateField } },
            { name: 'internalEmail', type: 'email', access: { read: readPrivateField } },
            { name: 'internalNotes', type: 'textarea', access: { read: readPrivateField } },
          ],
        },
      ],
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
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
    {
      name: 'bookingEnabled',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
