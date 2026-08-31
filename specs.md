# NEZCC Website and CMS Specification

## 1. Product Summary

NEZCC is a public cultural heritage website with an authenticated administration workspace. Editors manage public content, campaigns, media, notices, events, documents, and page settings without editing source code.

## 2. Technology Stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Payload CMS 3
- MongoDB Atlas through `@payloadcms/db-mongodb`
- Vercel hosting and Vercel Blob media storage
- Tailwind CSS utilities and project-level CSS tokens

The deployable application is located in `apps/web`.

## 3. Application Surfaces

### Public Website

- Responsive desktop and mobile layouts
- Government and NEZCC identity header
- Main navigation for institutional, heritage, gallery, state, publication, and service pages
- CMS-driven homepage campaigns, news, and events
- Detail pages for dynamic content
- Light archival-paper texture on top-level light surfaces
- Accessible semantic structure, visible focus behavior, and readable contrast

### Admin Workspace

- Available at `/admin`
- Authenticated through the Payload `users` collection
- Dashboard-oriented navigation and content shortcuts
- Create, read, update, and delete workflows for managed content
- Media uploads backed by Vercel Blob in production

## 4. Content Model

### Collections

- `users`: administrator accounts and authentication
- `media`: images and uploaded documents
- `campaigns`: homepage hero campaigns and active state
- `news`: news articles, summaries, dates, featured state, and images
- `events`: event details, dates, locations, ticketing metadata, and images
- `activities`: activity content and cover images
- `gallery`: gallery entries and media relationships
- `tenders`: tender notices and documents
- `tender-categories`: tender classification
- `annual-reports`: report metadata, covers, and documents
- `contact-submissions`: private inbox for messages submitted through the Contact page

### Globals

- `home-page`: homepage copy and section settings
- `events-page`: events-page presentation settings
- `tenders-page`: tenders-page presentation settings
- `annual-reports-page`: annual-reports presentation settings
- `rti-page`: RTI introduction, authorities, disclosure documents, filing guidance, portal link, and notice
- `site-settings`: shared contact details, office hours, Google Maps embed URL, and social links

Header and footer social icons read their URLs from `site-settings`. Configured external links open in a new tab; empty or invalid URLs remain disabled.

Payload-generated TypeScript definitions are stored in `apps/web/src/payload-types.ts`.

## 5. Media Behavior

- The `media` collection is the shared upload source for public content.
- Production uploads use the public `nezcc-blob` Vercel Blob store in `bom1`.
- Production client uploads are enabled to avoid server upload-size constraints.
- Local development uses `apps/web/public/media` when no Blob token is configured.
- Public media must return a successful response with the correct MIME type.
- A MongoDB media record alone does not guarantee that an older local file exists. Missing legacy media must be uploaded as a new media item.

## 6. Rendering and Content Freshness

- The homepage, Contact page, and RTI page are dynamic so editor changes appear after they are saved.
- Other CMS-backed pages may be static or dynamic according to their current route configuration.
- Any page expected to reflect editor changes immediately must use dynamic rendering, on-demand revalidation, or a documented cache interval.
- Content changes must not require source-code edits.

## 6.1 Contact Submissions

- The Contact form submits through the same-origin `/api/contact` endpoint.
- The server validates field lengths and email format before writing to MongoDB.
- A limit of three submissions per network fingerprint every 15 minutes reduces automated spam without relying on browser-sensitive hidden fields.
- Network addresses are stored only as a one-way salted hash for throttling.
- Contact submissions can only be created through the protected `/api/contact` endpoint; manual creation is disabled in the admin UI.
- Anonymous users cannot list, read, create, update, or delete `contact-submissions` through the Payload REST API.
- Authenticated administrators can review submissions under **Inbox**, then set their status to `New`, `Reviewed`, or `Resolved`.

## 7. Environment Contract

Required server-side variables:

```dotenv
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
PAYLOAD_SECRET=<long-random-secret>
```

Required in production for persistent uploads:

```dotenv
BLOB_READ_WRITE_TOKEN=<vercel-blob-token>
```

Rules:

- Never commit real values.
- Never prefix these variables with `NEXT_PUBLIC_`.
- Vercel Production must define all three variables.
- Preview deployments also need appropriate variables if preview functionality is required.

## 8. Deployment Specification

- Source repository: `https://github.com/kakitech2026/NEZCC.git`
- Production branch: `main`
- Vercel root directory: `apps/web`
- Production domain: `https://nezcc.vercel.app`
- MongoDB cluster region: AWS Mumbai
- Blob region: Mumbai (`bom1`)

A production deployment is acceptable when:

1. The Vercel build completes successfully.
2. The homepage and representative public routes return successfully.
3. `/admin` loads and an authorized user can sign in.
4. Admin content changes appear according to the route's freshness policy.
5. A newly uploaded media item persists and loads from production.
6. No secrets appear in Git or client-side JavaScript.

## 9. Visual Requirements

- Operational admin screens should be compact, organized, and easy to scan.
- Public pages should reflect NEZCC's cultural role without resembling a marketing template.
- Cards remain solid and readable over textured surfaces.
- Texture must not appear over dark heroes, navigation, forms, or dense utility panels.
- Text and controls must not overlap at supported viewport widths.
- Fixed-format controls and media areas must have stable dimensions to avoid layout shifts.

## 10. Verification Commands

Run from `apps/web`:

```bash
npx tsc --noEmit
npm run build
```

The production build is the required release check. Repository-wide lint currently includes legacy findings and should be improved separately rather than treated as evidence that the MongoDB or Vercel integration failed.

## 11. Known Constraints and Follow-up Work

- Atlas currently permits all IPv4 source addresses to support Vercel Hobby dynamic egress. Static egress should replace this when practical.
- Media records created before Blob integration may reference unavailable local files.
- CMS-backed routes other than the homepage should be audited for expected content freshness.
- The public website and admin workflows should receive ongoing desktop and mobile page-level QA.
