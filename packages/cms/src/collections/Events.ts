import { CollectionConfig } from 'payload';

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'startDate', 'location'],
    group: 'Content & Updates',
    description: 'Scheduled events with dates, times, and venue maps (e.g. Upcoming Events).',
  },
  labels: {
    singular: 'Event',
    plural: 'Events (Upcoming)',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'time',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g., 10:00 AM - 6:00 PM',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'highlights',
      type: 'array',
      admin: {
        description: 'Add up to 3 highlights for the event',
      },
      fields: [
        {
          name: 'icon',
          type: 'text',
          required: true,
          admin: {
            description: 'Material symbols icon name (e.g., music_note, festival, restaurant)',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'venueMapLink',
      type: 'text',
      admin: {
        description: 'Google Maps embed link or regular URL',
      },
    },
    {
      name: 'ticketing',
      type: 'group',
      fields: [
        {
          name: 'ticketPrice',
          type: 'text',
          admin: {
            description: 'e.g., Free Entry, $50, etc.',
          },
        },
        {
          name: 'registrationRequired',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'registrationLink',
          type: 'text',
          admin: {
            description: 'URL for purchasing tickets or registering',
          },
        },
      ],
    },
    {
      name: 'eventActions',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'calendarLink',
          type: 'text',
          label: 'Add to Calendar Link (URL)',
        },
        {
          name: 'shareLink',
          type: 'text',
          label: 'Share/Social Link (URL)',
        },
        {
          name: 'customLink',
          type: 'text',
          label: 'Custom Link (URL)',
        },
        {
          name: 'contactEmail',
          type: 'email',
          label: 'Contact Email',
        },
      ]
    },
    {
      name: 'sponsors',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
};
