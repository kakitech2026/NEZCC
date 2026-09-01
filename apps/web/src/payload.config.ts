import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import { Users } from './collections/Users'
import { Tenders } from './collections/Tenders'
import { Gallery } from './collections/Gallery'
import { Media } from './collections/Media'
import { Activities } from './collections/Activities'
import { Campaigns } from './collections/Campaigns'
import { News } from './collections/News'
import { Events } from './collections/Events'
import { TenderCategories } from './collections/TenderCategories'
import { AnnualReports } from './collections/AnnualReports'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { MemberStates } from './collections/MemberStates'
import { LibraryCategories } from './collections/LibraryCategories'
import { LibraryResources } from './collections/LibraryResources'
import { NewsletterEditions } from './collections/NewsletterEditions'
import { NewsletterSubscribers } from './collections/NewsletterSubscribers'

import { HomePage } from './globals/HomePage'
import { EventsPage } from './globals/EventsPage'
import { TendersPage } from './globals/TendersPage'
import { AnnualReportsPage } from './globals/AnnualReportsPage'
import { RTIPage } from './globals/RTIPage'
import { LeadershipPage } from './globals/LeadershipPage'
import { LibraryPage } from './globals/LibraryPage'
import { NewsletterPage } from './globals/NewsletterPage'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const databaseURL = process.env.MONGODB_URI
const payloadSecret = process.env.PAYLOAD_SECRET
const blobToken = process.env.BLOB_READ_WRITE_TOKEN

if (!databaseURL) {
  throw new Error('MONGODB_URI is required to start Payload')
}

if (!payloadSecret) {
  throw new Error('PAYLOAD_SECRET is required to start Payload')
}

export default buildConfig({
  admin: {
    theme: 'light',
    user: Users.slug,
    meta: {
      titleSuffix: '- NEZCC Admin',
      icons: [
        {
          url: '/images/logos/nezcc_icon.png',
        },
      ],
    },
    components: {
      views: {
        dashboard: {
          Component: '@/components/admin/AdminDashboard#AdminDashboard',
        },
      },
      graphics: {
        Logo: '@/components/admin/AdminLogo#AdminLogo',
        Icon: '@/components/admin/AdminIcon#AdminIcon',
      },
    },
  },
  collections: [
    Users,
    Media,
    Tenders,
    Gallery,
    Activities,
    Campaigns,
    News,
    Events,
    TenderCategories,
    AnnualReports,
    ContactSubmissions,
    MemberStates,
    LibraryCategories,
    LibraryResources,
    NewsletterEditions,
    NewsletterSubscribers,
  ],
  globals: [
    HomePage,
    EventsPage,
    TendersPage,
    AnnualReportsPage,
    RTIPage,
    LeadershipPage,
    LibraryPage,
    NewsletterPage,
    SiteSettings,
  ],
  editor: lexicalEditor(),
  sharp,
  secret: payloadSecret,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: databaseURL,
  }),
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(blobToken),
      collections: {
        media: true,
      },
      token: blobToken,
      clientUploads: true,
    }),
  ],
})
