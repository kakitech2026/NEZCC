import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  admin: {
    group: 'Site Pages',
    description: 'Manage visibility of sections and texts on the main home page.',
  },
  access: {
    read: () => true, // Publicly readable
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
              defaultValue: 'Explore the Archive and Witness our Living Heritage',
            },
            {
              name: 'heroDescription',
              type: 'textarea',
              defaultValue: 'From vibrant festivals to intricate crafts, this gallery captures the essence of the North East\'s cultural legacy.',
            },
          ],
        },
        {
          label: 'About Section',
          fields: [
            {
              name: 'aboutTitle',
              type: 'text',
              defaultValue: 'About NEZCC',
            },
            {
              name: 'aboutDescription',
              type: 'textarea',
              defaultValue: 'The North East Zone Cultural Centre (NEZCC) is one of the seven Zonal Cultural Centres in India established by the Ministry of Culture, Government of India.',
            },
          ],
        },
        {
          label: 'Sections Settings',
          description: 'Control visibility of the various homepage sections.',
          fields: [
            {
              name: 'showSchemes',
              type: 'checkbox',
              defaultValue: true,
              label: 'Show "Our Schemes" Section',
            },
            {
              name: 'showInformationCategories',
              type: 'checkbox',
              defaultValue: true,
              label: 'Show "Information Categories" Section',
            },
          ],
        },
        {
          label: 'Announcement Marquee',
          description: 'Manage the moving announcement strip displayed on the homepage.',
          fields: [
            {
              name: 'showAnnouncementMarquee',
              type: 'checkbox',
              defaultValue: true,
              label: 'Show Announcement Marquee',
            },
            {
              name: 'announcementLabel',
              type: 'text',
              defaultValue: 'Notice:',
              label: 'Fixed Label',
              admin: {
                description: 'Short label shown before the moving announcements. Leave blank to hide it.',
              },
            },
            {
              name: 'announcementItems',
              type: 'array',
              labels: {
                singular: 'Announcement',
                plural: 'Announcements',
              },
              defaultValue: [
                {
                  text: 'Applications for the Annual Cultural Grant are now open.',
                  isActive: true,
                  linkLabel: 'Read More',
                  linkUrl: '',
                },
              ],
              admin: {
                description: 'Add, edit, reorder, or temporarily hide announcement items in the scrolling banner.',
              },
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                  label: 'Announcement Text',
                },
                {
                  name: 'isActive',
                  type: 'checkbox',
                  defaultValue: true,
                  label: 'Show This Announcement',
                },
                {
                  name: 'linkLabel',
                  type: 'text',
                  defaultValue: 'Read More',
                  label: 'Optional Link Label',
                  admin: {
                    description: 'Shown beside the announcement when a destination URL is set.',
                  },
                },
                {
                  name: 'linkUrl',
                  type: 'text',
                  label: 'Optional Link Destination',
                  admin: {
                    description: 'Use a site path such as /schemes or a full http(s) URL.',
                  },
                  validate: (value) => {
                    if (typeof value !== 'string' || value.trim() === '') return true
                    if (value.startsWith('/') && !value.startsWith('//')) return true

                    try {
                      const url = new URL(value)
                      return url.protocol === 'http:' || url.protocol === 'https:' || 'Enter a site path or an http(s) URL.'
                    } catch {
                      return 'Enter a site path or an http(s) URL.'
                    }
                  },
                },
              ],
            },
          ],
        },
      ]
    }
  ],
}
