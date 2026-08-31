import type { GlobalConfig } from 'payload'

export const TendersPage: GlobalConfig = {
  slug: 'tenders-page',
  label: 'Advertisement & Tenders (Home page)',
  admin: {
    group: 'Site Pages',
    description: 'Manage the hero section and general instructions for the Advertisement & Tenders page.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero Section',
          fields: [
            {
              name: 'heroTitle',
              type: 'text',
              defaultValue: 'Advertisement & Tenders',
              required: true,
            },
            {
              name: 'heroDescription',
              type: 'textarea',
              defaultValue: 'Welcome to the official portal for North East Zone Cultural Centre procurements and announcements. We are committed to transparency, efficiency, and fair competition in all our procedures.',
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Background image for the top hero section.',
              }
            },
          ],
        },
        {
          label: 'Sidebar Content',
          description: 'Manage the Contact Information and Important Notices boxes on the right sidebar.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'contactTitle',
                  type: 'text',
                  defaultValue: 'Need Help?',
                  required: true,
                },
              ]
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'contactPhone',
                  type: 'text',
                },
                {
                  name: 'contactEmail',
                  type: 'text',
                }
              ]
            },
            {
              name: 'noticesTitle',
              type: 'text',
              defaultValue: 'Important Notices & Updates',
              required: true,
            },
            {
              name: 'noticesList',
              type: 'array',
              labels: {
                singular: 'Notice',
                plural: 'Notices',
              },
              fields: [
                {
                  name: 'noticeText',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'noticeLink',
                  type: 'text',
                  admin: {
                    description: 'Optional URL if this notice should be clickable',
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ],
}
