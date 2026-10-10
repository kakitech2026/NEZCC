import type { CollectionConfig } from 'payload'

export const Activities: CollectionConfig = {
  slug: 'activities',
  admin: {
    useAsTitle: 'title',
    group: 'Content & Updates',
    description: 'Past cultural activities and highlights with cover images.',
  },
  labels: {
    singular: 'Activity',
    plural: 'Activities (Past)',
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL friendly name (e.g., my-activity-name)',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'eventDate',
      type: 'date',
    },
    {
      name: 'content',
      type: 'richText',
    },
  ],
}
