import type { CollectionConfig } from 'payload'

export const LibraryResources: CollectionConfig = {
  slug: 'library-resources',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'resourceType', 'publishedDate'],
    group: 'Media & Resources',
    description: 'Manage Library publications, documents, and downloadable resources.',
  },
  labels: {
    singular: 'Library Resource',
    plural: 'Library Resources',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'library-categories',
      required: true,
    },
    {
      name: 'resourceType',
      type: 'select',
      defaultValue: 'publication',
      required: true,
      options: [
        { label: 'Publication', value: 'publication' },
        { label: 'Document', value: 'document' },
        { label: 'Book', value: 'book' },
        { label: 'Journal', value: 'journal' },
        { label: 'Research Paper', value: 'research-paper' },
        { label: 'Digital Archive', value: 'digital-archive' },
      ],
    },
    {
      name: 'author',
      type: 'text',
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover Image',
    },
    {
      name: 'document',
      type: 'upload',
      relationTo: 'media',
      label: 'Downloadable File',
    },
    {
      name: 'externalURL',
      type: 'text',
      label: 'External URL',
      admin: {
        description: 'Optional external resource URL. Used when no uploaded file is selected.',
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
