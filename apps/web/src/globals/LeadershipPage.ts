import type { Field, GlobalConfig } from 'payload'

const personFields: Field[] = [
  { name: 'name', type: 'text', required: true },
  { name: 'designation', type: 'text', required: true },
  {
    name: 'photo',
    type: 'upload',
    relationTo: 'media',
    admin: { description: 'Select or upload the official portrait.' },
  },
  {
    name: 'photoURL',
    type: 'text',
    admin: { description: 'Optional existing image URL. A Media Library photo takes priority.' },
  },
  {
    name: 'emails',
    type: 'array',
    labels: { singular: 'Email Address', plural: 'Email Addresses' },
    fields: [{ name: 'email', type: 'email', required: true }],
  },
  { name: 'phone', type: 'text' },
]

export const LeadershipPage: GlobalConfig = {
  slug: 'leadership-page',
  label: 'Leadership & Team Page',
  admin: {
    group: 'Site Pages',
    description: 'Manage the Leadership & Team page, officials, roles, portraits, and contact details.',
  },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page Introduction',
          fields: [
            { name: 'pageTitle', type: 'text', required: true, defaultValue: 'Leadership & Team' },
            {
              name: 'pageDescription',
              type: 'textarea',
              required: true,
              defaultValue: 'Leadership and key personnel driving the cultural initiatives of the North East Zone Cultural Centre.',
            },
          ],
        },
        {
          label: 'Leadership',
          fields: [
            { name: 'leadershipSectionTitle', type: 'text', required: true, defaultValue: 'Leadership' },
            {
              name: 'leaders',
              type: 'array',
              labels: { singular: 'Leader', plural: 'Leaders' },
              defaultValue: [
                {
                  name: 'Shri Alobo Naga',
                  designation: 'Director',
                  photoURL: '/images/about/Shri%20Alobo%20Naga.jpg',
                  emails: [{ email: 'nezccdimapur@yahoo.com' }, { email: 'nezccdimapurNE@gmail.com' }],
                },
                {
                  name: 'Shri Z. Lhousa',
                  designation: 'Deputy Director (A)',
                  photoURL: '/images/about/shri_z_lhousa.jpeg',
                  emails: [{ email: 'nezccdimapur@yahoo.com' }, { email: 'nezccdimapurNE@gmail.com' }],
                },
              ],
              fields: personFields,
            },
          ],
        },
        {
          label: 'Officers & Staff',
          fields: [
            { name: 'staffSectionTitle', type: 'text', required: true, defaultValue: 'Officers & Staff' },
            {
              name: 'staff',
              type: 'array',
              labels: { singular: 'Staff Member', plural: 'Staff Members' },
              defaultValue: [
                { name: 'Shri Ashim Debnath', designation: 'Accounts Officer' },
                { name: 'Shri Oliver T Pongen', designation: 'Programme Officer' },
                { name: 'Shri P. Yanger Lemtur', designation: 'Section Officer (A)' },
                { name: 'Shri Yashilemba', designation: 'Exhibition Officer' },
                { name: 'Ms. Temsunaro', designation: 'Research Officer' },
              ],
              fields: personFields,
            },
          ],
        },
      ],
    },
  ],
}
