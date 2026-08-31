import type { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: {
    useAsTitle: 'title',
    group: 'Media & Resources',
  },
  access: {
    read: () => true, // Publicly readable
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
      required: true,
      defaultValue: 'image',
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (data) => data.type === 'image',
      },
    },
    {
      name: 'videoUrl',
      type: 'text',
      admin: {
        condition: (data) => data.type === 'video',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Used for manual sorting, higher numbers appear first',
      },
      defaultValue: 0,
    }
  ],
}
