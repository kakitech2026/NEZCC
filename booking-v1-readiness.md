# NEZCC Booking V1 Readiness Report

Date: 2026-09-05

Source of truth: `booking-implementation-plan.md`

## Status

Not production-ready yet.

The implemented V1 booking code passes local build and local automated tests, but the production deployment at `https://nezcc.vercel.app` is not serving the new booking catalogue/API routes yet. Production email readiness also depends on official NEZCC SMTP variables being configured.

## Evidence

Local checks from `apps/web`:

```bash
npm exec tsc -- --noEmit
npm run build
$env:PLAYWRIGHT_BASE_URL='http://localhost:3001'; npm run test:e2e
```

Results:

- TypeScript passed.
- Production build passed.
- Local built-server Playwright run passed: `146 passed`.
- Build output includes `/artists`, `/artists/[slug]`, `/venues`, `/venues/[slug]`, and `/api/bookings`.

Production endpoint checks:

```text
https://nezcc.vercel.app/artists -> 404
https://nezcc.vercel.app/venues -> 404
https://nezcc.vercel.app/api/bookings -> 404
```

Environment checks:

- Local `.env` contains `MONGODB_URI`.
- Local `.env` contains `PAYLOAD_SECRET`.
- Local `.env` does not contain `BLOB_READ_WRITE_TOKEN`.
- Local `.env` does not contain SMTP/email variables.

## Acceptance Checklist

- TypeScript: pass.
- Production build: pass.
- Local E2E: pass.
- Existing NEZCC route smoke tests: pass locally.
- Booking service tests: pass.
- Catalogue route tests: pass locally.
- Email success/failure tests: pass with mocks.
- Production deployment serves new booking routes: fail.
- Official SMTP variables configured: not verified.
- Vercel Blob variable configured for production media: not verified in this local run.
- Manual admin QA matrix: not completed in this run.
- Initial artist/venue CMS content: not verified in this run.
- Rollback/recovery notes: pending.

## Required Before Launch

1. Push the latest commits to GitHub.
2. Redeploy Vercel from the latest `main` commit.
3. Confirm these production routes return non-404 responses:
   - `/artists`
   - `/venues`
   - `/api/bookings`
4. Confirm Vercel Production environment variables:
   - `MONGODB_URI`
   - `PAYLOAD_SECRET`
   - `BLOB_READ_WRITE_TOKEN`
   - `EMAIL_FROM`
   - `EMAIL_TO_ADMIN`
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`
5. Run production/staging smoke tests against the redeployed URL.
6. Complete manual admin QA for artist, venue, booking, conflict, quote, status, consent, audit, and email flows.
7. Record rollback/recovery notes.
