import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Site Pages',
    description: 'Manage shared contact details, office hours, map content, and social links.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contact Page',
          fields: [
            {
              name: 'contactHeroTitle',
              type: 'text',
              required: true,
              defaultValue: 'Contact Us',
            },
            {
              name: 'contactHeroDescription',
              type: 'textarea',
              required: true,
              defaultValue:
                'Get in touch with the North East Zone Cultural Centre. We are here to assist you with any inquiries regarding our cultural programs, events, and initiatives.',
            },
          ],
        },
        {
          label: 'Head Office',
          fields: [
            {
              name: 'officeName',
              type: 'text',
              required: true,
              defaultValue: 'North East Zone Cultural Centre',
            },
            {
              name: 'officeAddress',
              type: 'textarea',
              required: true,
              defaultValue: 'Post Box No. 139,\nDimapur - 797112, Nagaland, India',
            },
            {
              name: 'officePhone',
              type: 'text',
              required: true,
              defaultValue: '+91 3862 243557',
            },
            {
              name: 'officeEmail',
              type: 'email',
              required: true,
              defaultValue: 'nezccdimapur@yahoo.com',
            },
          ],
        },
        {
          label: "Director's Office",
          fields: [
            {
              name: 'directorPhone',
              type: 'text',
              required: true,
              defaultValue: '+91 3862 243556 (Direct)',
            },
            {
              name: 'directorEmail',
              type: 'email',
              required: true,
              defaultValue: 'director@nezcc.gov.in',
            },
          ],
        },
        {
          label: 'Office Hours',
          fields: [
            {
              name: 'weekdayLabel',
              type: 'text',
              required: true,
              defaultValue: 'Monday - Friday',
            },
            {
              name: 'weekdayHours',
              type: 'text',
              required: true,
              defaultValue: '9:30 AM - 5:30 PM',
            },
            {
              name: 'closedDaysLabel',
              type: 'text',
              required: true,
              defaultValue: 'Saturday, Sunday & Public Holidays',
            },
            {
              name: 'closedDaysStatus',
              type: 'text',
              required: true,
              defaultValue: 'Closed',
            },
          ],
        },
        {
          label: 'Location Map',
          fields: [
            {
              name: 'mapImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'mapImageAlt',
              type: 'text',
              defaultValue: 'NEZCC location map',
            },
            {
              name: 'mapAddress',
              type: 'textarea',
              required: true,
              defaultValue: 'Post Box No. 139, Dimapur - 797112, Nagaland, India',
            },
            {
              name: 'mapLink',
              type: 'text',
              admin: {
                description: 'Optional Google Maps or other external map URL.',
              },
            },
          ],
        },
        {
          label: 'Social Links',
          fields: [
            { name: 'facebookURL', type: 'text' },
            { name: 'instagramURL', type: 'text' },
            { name: 'xURL', type: 'text', label: 'X (Twitter) URL' },
            { name: 'youtubeURL', type: 'text' },
          ],
        },
      ],
    },
  ],
}
