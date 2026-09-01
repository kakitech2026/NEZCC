import type { CollectionConfig } from 'payload'

export const LibraryCategories: CollectionConfig = {
  slug: 'library-categories',
  admin: {
    useAsTitle: 'title',
    group: 'Media & Resources',
    description: 'Manage Library categories for publications, documents, and downloadable resources.',
  },
  labels: {
    singular: 'Library Category',
    plural: 'Library Categories',
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly category value, e.g. rare-manuscripts.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'icon',
      type: 'text',
      defaultValue: 'menu_book',
      admin: {
        description: 'Material Symbols icon name, e.g. history_edu, diversity_3, school.',
      },
    },
  ],
}
