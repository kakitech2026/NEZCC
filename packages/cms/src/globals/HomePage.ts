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
        }
      ]
    }
  ],
}
