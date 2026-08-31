import { CollectionConfig } from 'payload'

export const AnnualReports: CollectionConfig = {
  slug: 'annual-reports',
  admin: {
    group: 'Documents & Notices',
    useAsTitle: 'title',
    defaultColumns: ['title', 'financialYear', 'publishedDate'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Report Title',
      admin: {
        placeholder: 'e.g., Annual Report 2023-2024',
      },
    },
    {
      name: 'financialYear',
      type: 'text',
      required: true,
      label: 'Financial Year',
      admin: {
        placeholder: 'e.g., 2023-2024',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      label: 'Publication Date',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Brief Description',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Cover Image',
    },
    {
      name: 'document',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'PDF Document',
    },
  ],
}
