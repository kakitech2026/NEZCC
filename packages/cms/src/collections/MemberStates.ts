import type { CollectionConfig } from 'payload'

const imageFields = [
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    admin: { description: 'Select or upload an image from the Media Library.' },
  },
  {
    name: 'imageURL',
    type: 'text',
    admin: { description: 'Optional existing image URL. A Media Library image takes priority.' },
  },
  {
    name: 'imageAlt',
    type: 'text',
  },
] satisfies NonNullable<CollectionConfig['fields']>

export const MemberStates: CollectionConfig = {
  slug: 'member-states',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
    group: 'Content & Updates',
    description: 'Controls the eight Member State pages, including descriptions, images, highlights, and links.',
  },
  labels: {
    singular: 'Member State',
    plural: 'Member States',
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
      admin: {
        description: 'URL slug, e.g. assam or arunachal-pradesh.',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Main page hero image.' },
    },
    {
      name: 'heroImageURL',
      type: 'text',
      admin: { description: 'Optional existing hero image URL. A Media Library image takes priority.' },
    },
    {
      name: 'heroImageAlt',
      type: 'text',
      defaultValue: 'Member state cultural landscape',
    },
    {
      name: 'primaryLink',
      type: 'group',
      admin: {
        description: 'Optional primary call-to-action link shown in the hero.',
      },
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'secondaryLink',
      type: 'group',
      admin: {
        description: 'Optional secondary call-to-action link shown in the hero.',
      },
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'overview',
      type: 'array',
      minRows: 1,
      admin: {
        description: 'Introductory content blocks for geography, people, heritage, traditions, and related topics.',
      },
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'icon', type: 'text', admin: { description: 'Material Symbols icon name, e.g. public or account_balance.' } },
        ...imageFields,
        {
          name: 'link',
          type: 'group',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'url', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'highlightsHeading',
      type: 'text',
      defaultValue: 'Cultural Highlights',
    },
    {
      name: 'highlightsDescription',
      type: 'textarea',
    },
    {
      name: 'highlights',
      type: 'array',
      minRows: 1,
      admin: {
        description: 'Cultural highlights, festivals, crafts, heritage sites, and related links.',
      },
      fields: [
        { name: 'category', type: 'text' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'icon', type: 'text', admin: { description: 'Material Symbols icon name.' } },
        ...imageFields,
        {
          name: 'link',
          type: 'group',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'url', type: 'text' },
          ],
        },
      ],
    },
  ],
}
