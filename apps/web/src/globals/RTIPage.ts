import type { GlobalConfig } from 'payload'

export const RTIPage: GlobalConfig = {
  slug: 'rti-page',
  label: 'RTI Page',
  admin: {
    group: 'Site Pages',
    description: 'Manage the Right to Information page, officers, disclosures, and filing guidance.',
  },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page Introduction',
          fields: [
            { name: 'pageTitle', type: 'text', required: true, defaultValue: 'Right to Information' },
            {
              name: 'pageDescription',
              type: 'textarea',
              required: true,
              defaultValue: 'The Right to Information Act, 2005 mandates timely response to citizen requests for government information. The North East Zone Cultural Centre is committed to transparency and accountability in its functioning.',
            },
          ],
        },
        {
          label: 'RTI Authorities',
          fields: [
            { name: 'authoritiesSectionTitle', type: 'text', required: true, defaultValue: 'Authorities Under RTI Act' },
            {
              name: 'authorities',
              type: 'array',
              minRows: 1,
              labels: { singular: 'Authority', plural: 'Authorities' },
              defaultValue: [
                { title: 'Central Public Information Officer (CPIO)', name: 'Shri. [Name]', designation: 'Deputy Director', email: 'cpio@nezcc.in', phone: '+91-XXXXXXXXXX', icon: 'person' },
                { title: 'First Appellate Authority (FAA)', name: 'Shri. [Name]', designation: 'Director', email: 'dir@nezcc.in', phone: '+91-XXXXXXXXXX', icon: 'gavel' },
              ],
              fields: [
                { name: 'title', type: 'text', required: true },
                {
                  type: 'row',
                  fields: [
                    { name: 'name', type: 'text', required: true },
                    { name: 'designation', type: 'text' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'email', type: 'email' },
                    { name: 'phone', type: 'text' },
                  ],
                },
                {
                  name: 'icon',
                  type: 'select',
                  defaultValue: 'person',
                  options: [
                    { label: 'Person', value: 'person' },
                    { label: 'Gavel', value: 'gavel' },
                    { label: 'Office', value: 'account_balance' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Disclosures',
          fields: [
            { name: 'disclosuresSectionTitle', type: 'text', required: true, defaultValue: 'Section 4(1)(b) Disclosures' },
            {
              name: 'disclosures',
              type: 'array',
              labels: { singular: 'Disclosure', plural: 'Disclosures' },
              defaultValue: [
                { title: 'Organization Structure & Functions' },
                { title: 'Powers and Duties of Officers' },
                { title: 'Rules, Regulations, Instructions, Manuals' },
                { title: 'Directory of Officers and Employees' },
              ],
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'document', type: 'upload', relationTo: 'media', admin: { description: 'Upload the disclosure document here.' } },
                { name: 'externalURL', type: 'text', admin: { description: 'Optional external document URL. Used when no uploaded document is selected.' } },
              ],
            },
            { name: 'suoMotuTitle', type: 'text', required: true, defaultValue: 'Suo Motu Disclosure' },
            {
              name: 'suoMotuDescription',
              type: 'textarea',
              required: true,
              defaultValue: 'In compliance with the RTI Act, NEZCC proactively discloses information to the public at regular intervals through various means of communications, including internet, so that the public have minimum resort to the use of this Act to obtain information.',
            },
            { name: 'suoMotuLinkLabel', type: 'text', defaultValue: 'View Full Suo Motu Disclosure' },
            { name: 'suoMotuDocument', type: 'upload', relationTo: 'media' },
            { name: 'suoMotuExternalURL', type: 'text', admin: { description: 'Optional external URL. Used when no uploaded document is selected.' } },
          ],
        },
        {
          label: 'Filing Guidance',
          fields: [
            { name: 'filingTitle', type: 'text', required: true, defaultValue: 'How to File an RTI' },
            {
              name: 'filingSteps',
              type: 'array',
              minRows: 1,
              defaultValue: [
                { text: 'Write a formal application addressing the CPIO.' },
                { text: 'Clearly specify the information required.' },
                { text: 'Attach the application fee of Rs. 10/-.' },
                { text: 'Send via post or submit in person.' },
              ],
              fields: [{ name: 'text', type: 'text', required: true }],
            },
            { name: 'paymentMethodsTitle', type: 'text', defaultValue: 'Fee Payment Methods:' },
            {
              name: 'paymentMethods',
              type: 'array',
              defaultValue: [
                { text: "Demand Draft / Banker's Cheque" },
                { text: 'Indian Postal Order (IPO)' },
                { text: 'Cash (against proper receipt)' },
              ],
              fields: [{ name: 'text', type: 'text', required: true }],
            },
          ],
        },
        {
          label: 'Portal & Notice',
          fields: [
            { name: 'portalTitle', type: 'text', required: true, defaultValue: 'File RTI Online' },
            { name: 'portalSubtitle', type: 'text', defaultValue: 'Visit rtionline.gov.in' },
            { name: 'portalURL', type: 'text', required: true, defaultValue: 'https://rtionline.gov.in/' },
            { name: 'noticeTitle', type: 'text', required: true, defaultValue: 'Notice' },
            { name: 'noticeText', type: 'textarea', required: true, defaultValue: 'Information related to national security or falling under exemptions of Section 8 of the RTI Act will not be disclosed.' },
          ],
        },
      ],
    },
  ],
}
