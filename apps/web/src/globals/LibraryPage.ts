import type { GlobalConfig } from 'payload'

export const LibraryPage: GlobalConfig = {
  slug: 'library-page',
  label: 'Library Page',
  admin: {
    group: 'Site Pages',
    description: 'Manage the Library page hero, intro content, collection section, and search labels.',
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
            { name: 'heroEyebrow', type: 'text', defaultValue: 'Resource Centre' },
            { name: 'heroTitle', type: 'text', defaultValue: 'NEZCC Reference Library & Resource Centre' },
            {
              name: 'heroDescription',
              type: 'textarea',
              defaultValue: 'Preserving the written heritage and cultural wisdom of North East India.',
            },
            { name: 'heroImage', type: 'upload', relationTo: 'media' },
            {
              name: 'heroImageURL',
              type: 'text',
              defaultValue: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB7VoggWyQkthmqLboOgECjSUjdQ3KLA5Uzgu5VkTuW1UN1gquur4vBiBNuR_cd_58lAOGuPiKw-qPPh1ExE1K8VxkkFHc4zzPcDqp0sU4OzvAyQlmcngjcCdJ2CRHqS7oqPmWhgZw_nIPHQ0gE2Waz2eSRj00-H9Yi6dLqbtH3xy1eeNsqvN9pVEbuDmljxuvaGNxYKxYPPaIIJBHVSKalkXOOCIwZWeAOGDTzCEvj9-PdMmr6w2r5g',
            },
            { name: 'heroImageAlt', type: 'text', defaultValue: 'Library books and archival materials' },
          ],
        },
        {
          label: 'About',
          fields: [
            { name: 'aboutEyebrow', type: 'text', defaultValue: 'About The Library' },
            { name: 'aboutTitle', type: 'text', defaultValue: 'A Hub for Cultural Scholarship' },
            {
              name: 'aboutDescription',
              type: 'textarea',
              defaultValue: 'The NEZCC Reference Library serves as the premier institution for the preservation and dissemination of the rich literary and cultural heritage of the eight North Eastern States of India.',
            },
            {
              name: 'aboutDetails',
              type: 'textarea',
              defaultValue: 'Our curated collections provide resources for researchers, students, anthropologists, and cultural enthusiasts, offering insights into diverse traditions, folklore, indigenous knowledge systems, and contemporary arts.',
            },
            {
              name: 'features',
              type: 'array',
              defaultValue: [
                { text: 'Over 15,000 carefully curated volumes' },
                { text: 'Rare manuscripts and out-of-print regional texts' },
                { text: 'Quiet, climate-controlled reading rooms' },
              ],
              fields: [{ name: 'text', type: 'text', required: true }],
            },
            { name: 'aboutImage', type: 'upload', relationTo: 'media' },
            {
              name: 'aboutImageURL',
              type: 'text',
              defaultValue: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIOp8ysnGFNNKWfH1snIwZHpthYcetEoSQoPSjjrJB02Udg2SyNiOt6lZDCX2tcaGGXga6o5-1S706tpjBT2rmLe1s22YQVCmCbWudsgLDa_jAcDvTiSw3K4AUiOTeNgfaPD0D8KQv1bUiANtnQAAMfK-uo7oh0oNqfsrHVCenSxjgQD9EKTVU224dBNkd43St73viR_3eUsr1lvnrKjQjSj9-Wk65uYah0gDSXeWwJ9m4pDl7A21XvQ',
            },
            { name: 'aboutImageAlt', type: 'text', defaultValue: 'Library interior' },
          ],
        },
        {
          label: 'Collections',
          fields: [
            { name: 'collectionsTitle', type: 'text', defaultValue: 'Explore Our Collections' },
            {
              name: 'collectionsDescription',
              type: 'textarea',
              defaultValue: 'Browse through categorized repositories designed to facilitate specialized research and cultural discovery.',
            },
            { name: 'catalogueTitle', type: 'text', defaultValue: 'Search the Online Catalogue' },
            {
              name: 'catalogueDescription',
              type: 'textarea',
              defaultValue: 'Find books, journals, and digital assets across our entire collection.',
            },
          ],
        },
      ],
    },
  ],
}
