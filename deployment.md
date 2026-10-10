# Monorepo Deployment

The code supports two independent Next.js deployments. Hosting, DNS, and
production domain assignments have not been changed by the local migration.

## Vercel Projects

| Setting | Website | Admin |
| --- | --- | --- |
| Repository | Same NEZCC repository | Same NEZCC repository |
| Root directory | `apps/web` | `apps/admin` |
| Framework | Next.js | Next.js |
| Build command | `npm run build` in the app root | `npm run build` in the app root |
| Example domain | `nezcc.com` | `admin.nezcc.com` |

Enable inclusion of source files outside each root directory. Install the
workspace from the repository root with `npm ci`, using the root lockfile.
Keep shared-package changes in both projects' deployment dependencies; do not
skip an app build just because only `packages/cms` changed.

Validate the detected install/build working directories in a preview build
before release. A project must receive the whole repository, including the
shared package and root lockfile. [Vercel monorepo documentation](https://vercel.com/docs/monorepos/monorepo-faq)

## Environment Contract

Configure these in both projects for each environment:

| Variable | Contract |
| --- | --- |
| `MONGODB_URI` | Same database for the corresponding website/admin pair. |
| `PAYLOAD_SECRET` | Same secret for the pair; retain the current production secret. |
| `BLOB_READ_WRITE_TOKEN` | Same Blob store; required in production for durable uploads. |
| `NEXT_PUBLIC_SITE_URL` | Public website origin, such as `https://nezcc.com`. |
| `ADMIN_URL` | Admin origin, such as `https://admin.nezcc.com`. |
| `PAYLOAD_ALLOWED_ORIGINS` | Additional exact trusted preview/staging origins, comma-separated. Both configured main origins are already included. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Existing mail transport settings where booking emails are needed. |
| `EMAIL_FROM`, `EMAIL_TO_ADMIN` | Existing sender and admin notification recipient. |

`ADMIN_HOSTS` is obsolete: the separate admin app does not depend on a host
allowlist to activate its routes. All origins assigned to that project serve
the admin app; the public app always denies its admin/private API paths.

The checked-in production examples retain `.in` defaults. Set the actual
owned domain through environment variables; `.com` above is an example.
Use explicit URLs in preview environments so the admin client, login, password
reset, upload callbacks, and media do not target production accidentally.

The web config uses the website origin as Payload's `serverURL`; the admin
config uses the admin origin so authenticated browser requests stay on admin.
Both serve the same media collection and Blob store. Existing public
`/api/media/file/...` URLs remain available from the web app. New website
Local API reads generate URLs using the public wrapper.

## Release Order

Publish the migration on a preview branch first. The existing website project
automatically deploys `main`, so prepare and release the separate admin project
from that branch before merging the split into `main`.

1. Verify a backup, record the current combined deployment/domain assignments,
   and test both preview projects against an isolated staging database/store.
2. Deploy the separate admin project from the migration branch using production
   environment settings, then assign the admin subdomain. Verify
   login, editing, uploads, booking updates, and password-reset URLs there.
3. Merge/release the separated website only after admin is verified. Check public pages, forms, media, private API
   denial, and freshness after admin edits on the real custom domains.
4. Retain the previous combined deployment through the observation window.

Rollback restores the compatible combined deployment and its domain bindings.
The schema has not changed, so routine rollback does not restore the database
or remove submissions created during release. Staff may need to log in again.

Production publishing and DNS changes require explicit release authorization.
