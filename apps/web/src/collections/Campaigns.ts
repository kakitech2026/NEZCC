import type { CollectionConfig } from 'payload'

export const Campaigns: CollectionConfig = {
  slug: 'campaigns',
  admin: {
    useAsTitle: 'title',
    group: 'Content & Updates',
    description: 'Large banner slides displayed in the hero carousel at the top of the home page.',
  },
  labels: {
    singular: 'Campaign Banner',
    plural: 'Campaigns (Hero Banners)',
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
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'link',
      type: 'text',
    },
    {
      name: 'linkText',
      type: 'text',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
