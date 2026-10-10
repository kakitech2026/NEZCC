import type { CollectionConfig } from 'payload'

const isAuthenticated = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'status', 'source', 'subscribedAt'],
    group: 'Inbox',
    description: 'Subscriber requests submitted through the public Newsletter page.',
  },
  labels: {
    singular: 'Newsletter Subscriber',
    plural: 'Newsletter Subscribers',
  },
  access: {
    create: () => false,
    read: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'subscribed',
      options: [
        { label: 'Subscribed', value: 'subscribed' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
        { label: 'Bounced', value: 'bounced' },
      ],
    },
    { name: 'email', type: 'email', required: true, unique: true },
    { name: 'name', type: 'text' },
    { name: 'source', type: 'text', defaultValue: 'Newsletter page' },
    {
      name: 'subscribedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'fingerprintHash',
      type: 'text',
      required: true,
      index: true,
      admin: {
        hidden: true,
      },
    },
  ],
}
