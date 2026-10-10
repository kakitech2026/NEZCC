# NEZCC

Next.js 16 and Payload 3 monorepo using npm workspaces.

| Workspace | Purpose | Local URL |
| --- | --- | --- |
| `apps/web` (`web`) | Public pages, forms, settings reads, media delivery | http://localhost:3000 |
| `apps/admin` (`@nezcc/admin`) | Payload admin UI and CMS REST API | http://localhost:3001 |
| `packages/cms` (`@nezcc/cms`) | Collections, globals, hooks, booking services, generated types | Server library |

## Development

Run `npm ci` from the repository root. Use a root `.env` with the keys shown
in `.env.example`. Existing app-local environment files remain supported and
take precedence over root defaults. Real environment files are ignored by Git.

```sh
npm run dev
```

This starts both apps and prints their URLs. Occupied ports are skipped, and
the launcher sets matching local website/admin origins for both processes.
Alternatively, use `npm run dev:web` and `npm run dev:admin` separately with
the URLs configured for those ports.

The public app uses Payload's Local API with the shared CMS schema. It needs
the same database and Payload secret as the admin app. Public `/admin` and
private CMS APIs return 404 regardless of host headers. The admin dashboard
is available at its own origin's `/`; `/login` is its login page.

Without Blob storage, both apps share `apps/web/public/media`. Set an absolute
`PAYLOAD_MEDIA_DIR` to change this location. Production requires a shared Blob
store because hosted filesystems are not durable.

## Checks

```sh
npm run typecheck
npm run build
npm run test:unit
npm run test:integration
npm run test:integration:production
npm run lint
```

Integration tests start a temporary local MongoDB replica set and both apps on
available test ports, seed controlled records, and disable external storage and
SMTP. The first run downloads MongoDB. Playwright Chromium must be installed
(`npx playwright install chromium`). Test results and screenshots are in `.local`.
These tests never use the database in `.env`. Test servers use `.next-test`
build directories, independent of normal builds and local development. The production variant builds and
starts both apps with the isolated test environment before running the same checks.

`npm run test:e2e` runs the existing website suite. Its default is localhost,
and several tests create submissions. Use an explicit isolated test target via
`PLAYWRIGHT_BASE_URL`; do not point a write-enabled suite at production casually.

The pre-migration lint baseline was 95 errors and 71 warnings. Passing builds
and tests do not imply that the existing website lint backlog is resolved.

## CMS Changes

Edit schema and shared booking behavior in `packages/cms/src`.

```sh
npm run generate:types
npm run generate:importmap
```

Only the admin workspace owns generation. Types are generated into
`packages/cms/src/payload-types.ts`; the website's type-only re-export preserves
existing imports. The admin import map is generated in its own route directory.
Do not hand-edit generated Payload layouts or import maps.

Keep Payload packages pinned together at 3.88.0 during this migration. The
root `package-lock.json` is the only install lockfile.

See [deployment.md](deployment.md) for hosting and subdomain configuration, and
[monorepo-migration-plan.md](monorepo-migration-plan.md) for release checkpoints.
