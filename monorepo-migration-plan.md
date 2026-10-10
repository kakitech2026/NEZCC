# NEZCC Monorepo Migration Plan

Status: Local implementation verified; production release pending. Workspace/CMS extraction and app separation are implemented; live hosting is unchanged. See `README.md` and `deployment.md` for current commands and the release contract.
Reviewed against the local checkout on 2026-10-10. Live Vercel settings and
production behavior have not been verified as part of this plan.

## Goal

One Git repository containing independently deployable public and admin apps:

```text
NEZCC/
  apps/
    web/                  Public website and public submission endpoints
    admin/                Payload admin UI and authenticated CMS API
  packages/
    cms/                  Shared schema, hooks, booking services, generated types
  package.json            npm workspaces and root commands
  package-lock.json       One authoritative dependency lockfile
```

Example hosting: `nezcc.com` serves `apps/web`; `admin.nezcc.com` serves
`apps/admin`. The checked-in defaults currently use `nezcc.in` and
`admin.nezcc.in`. Confirm the actual owned domains before configuring hosting;
the example `.com` address does not authorize a domain change.

Both apps use the same production MongoDB database and Blob store. Each app
uses its own Next.js process, environment configuration, and deployment.
Local development uses `localhost:3000` and `admin.localhost:3001`.

## Verified Dependencies

| Current source | Migration implication |
| --- | --- |
| `apps/web/package.json` and its lockfile | npm already exists; introduce workspaces while retaining resolved dependency versions. |
| `src/app/(app)` | Public pages remain in `apps/web`, with their existing URLs and rendering behavior. |
| `src/lib/payload.ts` and direct `getPayload` calls | Public rendering needs shared Payload configuration after the admin UI moves. |
| `src/app/(payload)/api/{bookings,contact,feedback,newsletter}` | These are public form handlers; move their ownership to the web app rather than moving the entire route group. |
| `src/components/layout/SiteSettingsProvider.tsx` | Preserve `/api/globals/site-settings` and its response shape on the public origin. |
| `src/proxy.ts` | Current host routing hides admin/private APIs on the public domain and gives admin hosts clean paths. Each app needs an explicit replacement boundary. |
| `src/collections/BookingRequests.ts` and `AvailabilityBlocks.ts` | Hooks depend on `src/lib/bookings`; move schema and required services together. |
| `src/payload.config.ts` | Separate app-specific admin components/paths from shared collection, storage, and email configuration. |
| `src/components/admin` and generated import map | Admin components and map belong to the admin app; regenerate maps using explicit app-relative paths. |
| `src/collections/Media.ts`, `HeroCarousel.tsx`, `next.config.ts` | Retain public media URLs, size variants, image loading, and local upload behavior. |
| `tests/production-smoke.spec.ts` and `playwright.config.ts` | Some existing tests write submissions; the default target is a deployed site. Set an explicit isolated staging target. |

## Proposed Architecture Decision

Keep Payload Local API access in both apps through `@nezcc/cms`. Separate
deployment of the admin UI does not require rewriting public reads into HTTP
requests. This preserves existing queries, relationships, validation, and hooks.

The tradeoff is that the public server continues to need database, Payload,
storage, and email configuration. This is deployment separation, not complete
isolation of CMS credentials. Consider a remote CMS API later if that becomes
a requirement; it would be a separate data-access migration.

The shared package owns collections, globals, generated types, and booking
services used by hooks and submission handlers. Initially keep the booking
services together to preserve their internal imports. It must not import from
either app or depend on an app's `@/` alias. Expose explicit package subpaths
for server configuration/services and types so client components cannot pull
database or email code into browser bundles.

Each app keeps a small `src/payload.config.ts` wrapper and `@payload-config`
alias. The admin wrapper supplies custom components and import-map paths.
During extraction, the existing combined app can keep its current admin
configuration through the same wrapper. Use one designated type-generation
command and one canonical generated-types file. Existing `@/payload-types`
imports can temporarily use a type-only compatibility re-export.

Keep npm and current Next.js, React, and Payload versions. Workspaces alone
are sufficient initially. A task runner or shared UI package can be added when
there is a demonstrated need. Ensure workspace dependency declarations resolve
one compatible React/Payload installation and preserve the existing lockfile's
resolved versions during conversion.

The implementation updates D-001 in `decision.md`. D-004's description of live
hosting remains applicable until the separate admin project is released.

## Route and Hosting Contract

| Behavior | Public app | Admin app |
| --- | --- | --- |
| Public pages | Existing routes and content | No public website rendering |
| CMS dashboard/login | `/admin` and its descendants return 404 | Existing clean admin paths, including `/` and `/login` |
| Public form POSTs | `/api/bookings`, `/api/contact`, `/api/feedback`, `/api/newsletter` | Do not duplicate these handlers |
| Public site settings | Existing `/api/globals/site-settings` response | Authenticated global editing |
| Media reads | Preserve `/api/media/file/...`, including variants | Uploads, thumbnails, and authenticated media management |
| Private CMS REST API | Blocked before dispatch | Served with existing collection/field access control |
| GraphQL | Preserve existing blocked behavior | Expose only if deliberately configured; verify actual route locations |

Initially keep the web app's Payload REST adapter for allowed public media and
site-settings routes, guarded by its public allowlist. Remove its admin UI
routes and ensure host headers cannot re-enable private APIs. Test the allowlist
with methods, trailing slashes, encoded paths, and spoofed forwarding headers.

Preserve admin clean-path behavior for the first release. Retain Payload's
internal `/admin` path and validate rewrites, redirects, links, query strings,
server actions, and non-GET requests end to end. Avoid adding another admin
base-path change during separation.

Public media delivery remains anchored to the public origin. Review Payload's
`serverURL` per wrapper: preserving the current public value is the starting
point, but authenticated admin calls and password-reset links must resolve on
the admin origin. Treat any required adjustment as a tested URL change and
keep existing public media links working. Do not set `serverURL` blindly to
the admin domain.

For Vercel, use two projects from the same repository, with roots `apps/web`
and `apps/admin`. Enable access to source outside each root so builds include
`packages/cms` and the workspace lockfile. Verify this with clean preview builds.
Changes to the shared package must trigger checks/builds for both apps.

## Migration Phases

Each phase is a separately reviewable change. Continue only when its exit
criteria pass. Record the commit and deployment used for each checkpoint.

### 0. Capture the Baseline

- Record the current commit, dependency versions, route inventory, and known
  failures. Run existing typecheck, lint, build, booking tests, and browser checks
  against explicit local/staging targets; distinguish existing failures from new ones.
- Extend coverage where missing: admin authentication and saves, uploads,
  public/private API boundaries, submission-to-inbox flow, and content freshness.
- Prepare an isolated staging database with representative records, including
  users, globals, populated relationships, bookings, and media. Use staging Blob
  storage or controlled copies and a mail sink. Both staging apps share these.
- Before release, verify a production backup and record the current Vercel
  deployment, domains, environment configuration, and Blob association securely.

Exit: reproducible baseline and usable staging data; no unknown failures in
workflows affected by separation. No production writes from automated tests.

### 1. Introduce npm Workspaces

- Add root workspace configuration and commands while the existing combined
  `apps/web` continues to own the website and admin.
- Convert to one root lockfile, preserving resolved versions and scripts.
  Verify a clean `npm ci` from the repository root; inspect dependency drift.
- Check actual Next.js workspace resolution, tracing, and native dependencies
  (`sharp`, MongoDB adapter) using the installed version's documentation.

Exit: existing app typechecks/builds and baseline workflows pass from a clean
workspace install. Rollback: restore the previous workspace checkpoint.

### 2. Extract Shared CMS Code

- Move collections, globals, hook dependencies, booking services, and canonical
  generated types into `packages/cms`; add explicit package exports.
- Make the existing config wrapper consume the package. Keep public query
  parameters, hooks, access rules, fields, slugs, IDs, and storage settings intact.
- Resolve package imports without relying on web aliases. Set deterministic
  config/type-generation paths and verify that generation yields equivalent schema.

Exit: the combined app still passes baseline checks, real database integration
checks, admin edits, media checks, and booking tests. No data/schema migration
is expected; any unexpected schema/index change stops this phase for review.
Rollback: restore the preceding commit; data remains compatible.

### 3. Add the Separate Admin App

- Add `apps/admin` using the same versions and shared CMS package. Move/copy
  the admin UI, stylesheet, required logos/fonts, and supported Payload routes.
- Generate its import map through Payload tooling; keep generated layout files
  managed by Payload. Verify local host routing and preview-host classification.
- Use the staging database, Blob store, and mail sink. Keep the existing
  combined deployment available while the separate admin is being validated.

Exit: login/logout, session refresh, permissions, content/global saves,
uploads, dashboard links, and booking updates work in the new app. Content
edits are visible on the staging website with the existing freshness behavior.
Rollback: discard the new app checkpoint or keep traffic on the combined app.

### 4. Complete Public App Separation

- Keep public pages, forms, submission endpoints, site-settings reads, and media
  delivery in `apps/web`; remove its admin UI and duplicate admin-only assets.
- Replace host-based enabling of admin APIs with unconditional public boundaries.
  Preserve public form validation, rate limiting, idempotency, and hook behavior.
- Verify local media when Blob is absent: use an explicit shared development
  upload location so files uploaded by admin can be delivered by web. Production
  continues using Blob; do not rely on two independent local upload directories.
- Add both-app checks to CI; type generation has one owner and does not race.

Exit: both apps independently build from a fresh clone, and the complete
regression matrix below passes against the separated staging setup.
Rollback: restore the last combined-app checkpoint and its routing.

### 5. Release and Switch the Admin Domain

- Prepare both Vercel projects with explicit public/admin URLs, scoped CORS/CSRF
  origins, matching production database/secret/storage settings, and SMTP config.
  Keep real secrets in deployment configuration, not documentation or Git.
- Validate production-mode preview deployments, including preview protection,
  host routing, upload callbacks, absolute links, and generated function contents.
- After explicit release authorization, bring up the admin app, switch the admin
  subdomain, and verify it before releasing the public app without its admin UI.
  The old combined app remains compatible during this sequence.
- Verify actual custom domains, HTTPS, DNS, public/private boundaries, login,
  media, content freshness, and controlled submission workflows after release.
- Monitor both apps for errors and failed emails/uploads during an agreed
  observation window before retiring the combined deployment.

Exit: both custom domains pass release checks and the rollback target is recorded.
Rollback: restore the compatible combined deployment and its domain assignments.
Keep records created during the release; restoring an older database backup is
not routine rollback and could discard submissions. Existing cookies may require
staff to log in again after switching origins.

## Regression Matrix

| Area | Required evidence |
| --- | --- |
| Public content | Homepage, lists/details, globals, search/filter URLs, known 404s, desktop/mobile rendering retain baseline behavior. |
| Content freshness | Edit representative collection and global records in admin; website shows changes without an unexpected rebuild. |
| Admin | Authenticated and anonymous states, deep links, dashboard links, logout, refresh, password reset, server actions, and allowed roles work. |
| Submissions | Contact, feedback, newsletter, artist/venue booking reach the correct inbox once with validation and rate limits preserved. |
| Booking rules | Reference uniqueness, idempotency, conflict detection, status transitions, audit history, policy snapshots, and email counts remain correct. |
| Media | Existing/new uploads, thumbnails, hero images, PDFs, variants, local shared uploads, and public URLs load on both origins. |
| Access boundaries | Public host cannot reach admin/private REST endpoints, inboxes, internal fields, or configured GraphQL; CORS is not treated as authorization. |
| Packaging | Fresh root install, both typechecks/builds, deterministic generated types/import maps, and deployment tracing contain all runtime files. |

Existing booking specs provide useful service checks, but mocks do not prove
database hooks or cross-app flows. Existing smoke tests submit real forms and
do not explicitly capture browser errors; add targeted integration coverage and
page-error assertions before using them as release evidence.

## Decisions to Confirm Before Release

- Actual public/admin domains: `.com` is currently an example; `.in` is in config.
- Access to Vercel, DNS, staging resources, and a designated staging admin account.
- Release timing and rollback observation window.

Planning and local preparation do not require changing production. Publishing,
DNS changes, or provisioning external resources require separate authorization.

## References

### Local Verification Record (2026-10-10)

- Baseline: combined-app build and typecheck passed; 54 booking service tests
  passed. Existing lint reported 95 errors and 71 warnings.
- Shared extraction: 43 model/service files were compared with the baseline;
  only import paths changed. Media's local upload directory is now explicitly
  shared. Regenerated content types are identical to the baseline.
- Dependencies: the root lockfile preserves all prior resolved package versions;
  React, Payload, and GraphQL are deduplicated. A clean root `npm ci` passed.
- Separated apps: 60 unit/routing checks passed. The five cross-app scenarios
  passed in development and production mode; the final production suite also
  passed eight existing desktop/mobile catalogue checks (13 checks total).
- Browser checks cover login, dashboard navigation, global saves/reloads,
  public content freshness, session refresh/logout, uploads from both origins,
  submissions/inboxes, booking references, idempotency, and public API denial.
- Both apps build; all workspaces and integration-test types are checked.
  Shared CMS lint passes. Existing web/admin lint issues remain (94 errors and
  71 warnings total), including generated admin layout code.
- Isolated tests use a temporary MongoDB replica set, local media, disabled
  external SMTP/Blob, and separate `.next-test` build directories. Real Vercel
  Blob uploads, SMTP delivery, DNS, HTTPS, password-reset delivery, and custom
  production domains still require release verification.

### Documentation

- [Payload Local API](https://payloadcms.com/docs/local-api/overview)
- [Payload custom components and import maps](https://payloadcms.com/docs/custom-components/overview)
- [Payload generated types](https://payloadcms.com/docs/typescript/generating-types)
- [Vercel monorepos](https://vercel.com/docs/monorepos)
- [Vercel monorepo FAQ](https://vercel.com/docs/monorepos/monorepo-faq)

Package-specific implementation details must also be checked against the
installed Next.js 16.3 / Payload 3.88 versions when implementation begins.
