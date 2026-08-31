import { GlobalConfig } from 'payload'

export const AnnualReportsPage: GlobalConfig = {
  slug: 'annual-reports-page', 
  admin: {
    group: 'Site Pages',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      required: true,
      defaultValue: 'Annual Reports',
    },
    {
      name: 'heroDescription',
      type: 'textarea',
      required: true,
      defaultValue: 'Upholding transparency and institutional accountability. Explore our comprehensive annual reports detailing cultural initiatives, financial statements, and regional impact across the North East Zone.',
    },
  ],
}
