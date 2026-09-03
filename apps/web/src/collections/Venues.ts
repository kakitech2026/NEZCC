import type { CollectionConfig } from 'payload'

export const Venues: CollectionConfig = {
  slug: 'venues',
  labels: {
    singular: 'Venue',
    plural: 'Venues',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'cityState', 'capacity', 'isPublished', 'isActive', 'bookingEnabled'],
    group: 'Bookings',
    description: 'Admin-managed NEZCC venue profiles.',
  },
  access: {
    read: () => true,
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
      type: 'tabs',
      tabs: [
        {
          label: 'Profile',
          fields: [
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'venue-categories',
            },
            { name: 'address', type: 'textarea', required: true },
            { name: 'cityState', type: 'text', required: true, label: 'City/State' },
            {
              name: 'googleMapsEmbedURL',
              type: 'text',
              label: 'Google Maps Embed URL',
              admin: {
                description: 'Paste only the URL from the iframe src attribute.',
              },
            },
            { name: 'description', type: 'textarea', required: true },
          ],
        },
        {
          label: 'Facilities',
          fields: [
            { name: 'capacity', type: 'number', required: true, min: 0 },
            {
              name: 'indoorOutdoor',
              type: 'select',
              defaultValue: 'indoor',
              options: [
                { label: 'Indoor', value: 'indoor' },
                { label: 'Outdoor', value: 'outdoor' },
                { label: 'Indoor and Outdoor', value: 'indoor-outdoor' },
              ],
            },
            { name: 'stageAvailability', type: 'checkbox', defaultValue: false },
            { name: 'seatingType', type: 'text' },
            { name: 'parkingAvailability', type: 'checkbox', defaultValue: false },
            { name: 'soundSystemAvailability', type: 'checkbox', defaultValue: false },
            { name: 'lightingAvailability', type: 'checkbox', defaultValue: false },
            { name: 'greenRoomAvailability', type: 'checkbox', defaultValue: false },
            { name: 'projectorScreenAvailability', type: 'checkbox', defaultValue: false },
            { name: 'accessibilityFacilities', type: 'textarea' },
          ],
        },
        {
          label: 'Media & Rules',
          fields: [
            { name: 'availableTimings', type: 'text' },
            {
              name: 'photoGallery',
              type: 'array',
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
                { name: 'alt', type: 'text', required: true },
                { name: 'caption', type: 'text' },
              ],
            },
            { name: 'rulesTermsText', type: 'textarea', label: 'Rules/Terms Text' },
            { name: 'rulesTermsDocument', type: 'upload', relationTo: 'media', label: 'Rules/Terms Document' },
            {
              name: 'indicativeRentText',
              type: 'text',
              admin: {
                description: 'Optional public indicative/base rent text. Final pricing is set by NEZCC admin per booking.',
              },
            },
          ],
        },
        {
          label: 'Internal',
          fields: [
            { name: 'internalContactPerson', type: 'text' },
            { name: 'internalPhone', type: 'text' },
            { name: 'internalEmail', type: 'email' },
            { name: 'internalNotes', type: 'textarea' },
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
