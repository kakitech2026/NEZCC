import type { CollectionConfig } from 'payload'

export const TenderCategories: CollectionConfig = {
  slug: 'tender-categories',
  admin: {
    useAsTitle: 'title',
    group: 'Documents & Notices',
    description: 'Manage the available categories for Advertisements and Tenders.',
  },
  labels: {
    singular: 'Tender Category',
    plural: 'Tender Categories',
  },
  access: {
    read: () => true, // Publicly readable
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    }
  ],
}
