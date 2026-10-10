import type { GlobalConfig } from 'payload'

export const EventsPage: GlobalConfig = {
  slug: 'events-page',
  label: 'Calendar Of Events',
  admin: {
    group: 'Site Pages',
    description: 'Manage banners and titles for the Calendar of Events page.',
  },
  access: {
    read: () => true, // Publicly readable
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Header Settings',
          fields: [
            {
              name: 'pageTitle',
              type: 'text',
              defaultValue: 'Calendar Of Events',
              admin: {
                description: 'The main title displayed at the top of the Events page.',
              }
            },
          ],
        },
        {
          label: 'Sidebar Banners',
          description: 'Manage the promotional banners shown on the right sidebar of the Events page.',
          fields: [
            {
              name: 'banners',
              type: 'array',
              maxRows: 5,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'link',
                  type: 'text',
                  admin: {
                    description: 'Where should this banner link to? (e.g., /library, https://example.com)',
                  }
                },
              ],
            }
          ]
        }
      ]
    }
  ],
}
