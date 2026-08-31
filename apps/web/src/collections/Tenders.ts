import type { CollectionConfig } from 'payload'

export const Tenders: CollectionConfig = {
  slug: 'tenders',
  admin: {
    useAsTitle: 'title',
    group: 'Documents & Notices',
  },
  labels: {
    singular: 'Advertisement & Tender',
    plural: 'Advertisements & Tenders',
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
      name: 'referenceId',
      type: 'text',
      admin: {
        description: 'Optional ID/File number (e.g., NEZCC/2024/01)',
      }
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'tender-categories',
      required: true,
    },
    {
      name: 'releaseDate',
      type: 'date',
      required: true,
    },
    {
      name: 'closingDate',
      type: 'date',
      admin: {
        description: 'Optional closing/deadline date',
      }
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Closing Soon', value: 'closing_soon' },
        { label: 'Closed', value: 'closed' },
      ],
      required: true,
      defaultValue: 'active',
    },
    {
      name: 'document',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
  ],
}
