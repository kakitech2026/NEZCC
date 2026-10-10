import type { GlobalConfig } from 'payload'

export const NewsletterPage: GlobalConfig = {
  slug: 'newsletter-page',
  label: 'Newsletter Page',
  admin: {
    group: 'Site Pages',
    description: 'Manage Newsletter page hero, subscribe panel, and archive section headings.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'heroTitle', type: 'text', defaultValue: 'NEZCC Newsletter' },
            {
              name: 'heroDescription',
              type: 'textarea',
              defaultValue: 'Stay connected with the vibrant cultural tapestry of North East India. Subscribe to receive updates on upcoming events, workshops, cultural publications, and institutional news directly to your inbox.',
            },
          ],
        },
        {
          label: 'Subscribe Panel',
          fields: [
            { name: 'subscribeTitle', type: 'text', defaultValue: 'Subscribe Now' },
            { name: 'subscribeDescription', type: 'textarea', defaultValue: 'Join our mailing list to receive quarterly updates.' },
            { name: 'privacyNote', type: 'text', defaultValue: 'We respect your privacy. Unsubscribe at any time.' },
          ],
        },
        {
          label: 'Editions',
          fields: [
            { name: 'latestIssueTitle', type: 'text', defaultValue: 'Latest Issue' },
            { name: 'archiveTitle', type: 'text', defaultValue: 'Newsletter Archive' },
            { name: 'emptyArchiveMessage', type: 'text', defaultValue: 'No newsletter editions have been published yet.' },
          ],
        },
      ],
    },
  ],
}
