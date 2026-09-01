# NEZCC Project Context

## Current State

NEZCC is a Next.js 16 application with Payload CMS 3 embedded in the same app. The deployable project lives in `apps/web`.

Production is deployed from GitHub `main` to Vercel:

- Repository: `https://github.com/kakitech2026/NEZCC.git`
- Production domain: `https://nezcc.vercel.app`
- Vercel root directory: `apps/web`
- Database: MongoDB Atlas
- Media storage: Vercel Blob, public store `nezcc-blob` in Mumbai (`bom1`)

Required production environment variables:

- `MONGODB_URI`
- `PAYLOAD_SECRET`
- `BLOB_READ_WRITE_TOKEN`

Real secrets must never be committed.

## Key Architecture Decisions

- Payload CMS is the source of truth for editable website content.
- MongoDB Atlas stores Payload users, content, globals, and submissions.
- Vercel hosts the public site, admin panel, API routes, and Blob media.
- Atlas currently allows `0.0.0.0/0` because Vercel Hobby has dynamic outbound IPs.
- Public media uploads must use Vercel Blob in production.
- Dynamic pages are used when editor changes must appear without redeploying.

See `decision.md` and `specs.md` for the formal record.

## Completed CMS Areas

### Public Content

- Homepage campaigns, news, events, and homepage settings
- Events and event detail pages
- Activities and activity detail pages
- News and news detail pages
- Gallery
- Tenders and tender categories
- Annual reports
- RTI page
- Contact page and shared site settings
- Leadership & Team page
- Member States pages
- Library page, categories, and resources
- Newsletter page and editions

### Private Admin Inboxes

- Contact submissions
- Newsletter subscribers
- Feedback submissions

These inbox collections disable manual public creation and require authenticated admin access for read/update/delete. Public submissions go through same-origin API routes with validation and basic rate limiting.

## Recently Completed Commits

- `42f8998 Add feedback submissions inbox`
- `94f8390 Manage newsletters through Payload`
- `33d8366 Manage library resources through Payload`
- `b1dd219 Manage member state pages through Payload`
- `5f4f204 Manage leadership page through Payload`
- `3470792 Manage RTI page through Payload`

## Admin Paths

- Site page settings:
  - `Globals -> Home Page`
  - `Globals -> Contact / Site Settings`
  - `Globals -> RTI Page`
  - `Globals -> Leadership & Team Page`
  - `Globals -> Library Page`
  - `Globals -> Newsletter Page`

- Growing content:
  - `Collections -> Member States`
  - `Collections -> Library Categories`
  - `Collections -> Library Resources`
  - `Collections -> Newsletter Editions`

- Inbox:
  - `Collections -> Contact Submissions`
  - `Collections -> Newsletter Subscribers`
  - `Collections -> Feedback Submissions`

## Verification

Run from `apps/web`:

```bash
npx tsc --noEmit
npm run build
```

The production build is the main release check.

## Remaining Recommended Dynamic Work

The next strong candidate is `Shilpgram`, because it is a public venue/program page that may need editable images, descriptions, facilities, visitor information, and links.

Other static institutional pages can remain code-managed unless NEZCC editors need frequent control over their text:

- Introduction of NEZCC
- Introduction of North East
- Aims and Objectives
- Heritage museum and collection pages

## Notes For Future Work

- Preserve existing public URLs unless the user explicitly asks to change navigation.
- Prefer CMS fallbacks when converting static pages so production does not go blank before editors add records.
- Keep admin-facing collections grouped by actual editorial workflow.
- For submission inboxes, keep anonymous REST access closed and write through protected same-origin API routes.
- Regenerate `apps/web/src/payload-types.ts` after Payload config changes.
