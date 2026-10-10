import type { CollectionConfig } from 'payload'

export const NewsletterEditions: CollectionConfig = {
  slug: 'newsletter-editions',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'volume', 'issue', 'publishedDate', 'isFeatured'],
    group: 'Media & Resources',
    description: 'Manage newsletter editions, cover images, PDFs, and online links.',
  },
  labels: {
    singular: 'Newsletter Edition',
    plural: 'Newsletter Editions',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'volume', type: 'text', admin: { placeholder: 'e.g. Vol. 14' } },
    { name: 'issue', type: 'text', admin: { placeholder: 'e.g. Issue 3' } },
    { name: 'period', type: 'text', admin: { placeholder: 'e.g. Quarter 3, 2024' } },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media', label: 'Cover Image' },
    { name: 'document', type: 'upload', relationTo: 'media', label: 'PDF Document' },
    {
      name: 'onlineURL',
      type: 'text',
      label: 'Read Online URL',
      admin: {
        description: 'Optional external URL. Used when no uploaded PDF is selected or for online reading.',
      },
    },
    {
      name: 'fileSize',
      type: 'text',
      admin: {
        description: 'Optional display text, e.g. 2.4 MB.',
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
