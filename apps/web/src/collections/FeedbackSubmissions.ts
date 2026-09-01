import type { CollectionConfig } from 'payload'

const isAuthenticated = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

export const FeedbackSubmissions: CollectionConfig = {
  slug: 'feedback-submissions',
  labels: {
    singular: 'Feedback Submission',
    plural: 'Feedback Submissions',
  },
  admin: {
    useAsTitle: 'subject',
    group: 'Inbox',
    defaultColumns: ['subject', 'name', 'email', 'feedbackType', 'status', 'submittedAt'],
    description: 'Visitor feedback, suggestions, and grievances submitted through the public Feedback page.',
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
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Reviewed', value: 'reviewed' },
        { label: 'Resolved', value: 'resolved' },
      ],
    },
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    {
      name: 'feedbackType',
      type: 'select',
      required: true,
      label: 'Feedback Type',
      options: [
        { label: 'General Suggestion', value: 'general' },
        { label: 'Grievance', value: 'grievance' },
        { label: 'Website Experience', value: 'website' },
        { label: 'Cultural Program Feedback', value: 'program' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'subject', type: 'text', required: true },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'submittedAt',
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
