# NEZCC Booking Decision Log

Source of truth: `booking-implementation-plan.md`.

Use this file to record implementation decisions, deviations, and future architecture choices. Do not silently change behavior from the frozen plan.

## Decision Format

```text
Date:
Decision:
Reason:
Impact:
Plan deviation:
Follow-up:
```

## Decisions

### 2026-09-03: Frozen Baseline

Decision:

- `booking-implementation-plan.md` is the frozen source of truth for V1 artist and venue booking work.

Reason:

- The product scope, architecture, workflows, access rules, and QA gate have been reviewed and approved.

Impact:

- Implementation should follow the plan.
- Any necessary deviations must be recorded here before being treated as accepted behavior.

Plan deviation:

- None.

Follow-up:

- Begin Ticket 1: Payload foundation data model.

### 2026-09-03: Ticket 1 Schema Foundation Choices

Decision:

- Booking-related collections and globals use the Payload admin group `Bookings`.
- Booking policy context is stored on each booking request with embedded terms/privacy snapshots.
- Booking audit history starts as an embedded array on `booking-requests`.
- Booking reference counter implementation is deferred to Ticket 3.

Reason:

- These choices keep Ticket 1 aligned with existing lightweight Payload collection conventions while preserving the plan's privacy, audit, and future payment requirements.

Impact:

- Ticket 1 can define all foundational fields without implementing later booking services.
- Later tickets will add hooks/services to populate server-controlled fields, calculate quotes, enforce transitions, and append audit entries.

Plan deviation:

- None.

Follow-up:

- Continue Ticket 1 verification, then begin Ticket 2 access-control refinement.

### 2026-09-03: Ticket 2 Access-Control Foundation Choices

Decision:

- Public catalogue reads are filtered at Payload access level for active categories and published/active artists and venues.
- Private artist and venue contact/admin-note fields use field-level read access.
- Booking requests remain closed to anonymous direct Payload access.
- Availability blocks are admin-only.
- `booking-settings.adminNotificationEmail` is hidden from anonymous reads.
- Delete guards prevent normal deletion of artists or venues with booking history.

Reason:

- These choices implement the documented public/admin boundary before public UI or API work begins.

Impact:

- Later public pages can query Payload without receiving unpublished/inactive records or private fields.
- Later booking API work must still enforce bookability and server-controlled fields; Ticket 2 does not implement the booking API.

Plan deviation:

- None.

Follow-up:

- Begin Ticket 3: booking reference service.

### 2026-09-03: Ticket 3 Booking Reference Service

Decision:

- Add hidden `booking-reference-counters` collection for per-year sequence state.
- Generate booking references with `generateBookingReference` using Mongo `findOneAndUpdate`, `$inc`, `upsert: true`, and `returnDocument: 'after'`.
- Use `NEZCC-BKG-YYYY-000001` reference format.
- Populate `bookingReference` in a `booking-requests` create hook and preserve it on update.

Reason:

- This satisfies the plan's requirement for unique, server-generated references without unsafe `count + 1` logic.

Impact:

- Later booking creation code can rely on Payload create operations to receive a reference automatically.
- The counter collection is internal infrastructure and hidden from normal admin navigation.

Plan deviation:

- None.

Follow-up:

- Begin Ticket 4: booking validation service.

### 2026-09-03: Ticket 4 Booking Validation Service

Decision:

- Add `bookingValidationService` as the canonical place for public booking input validation and normalization.
- Return a sanitized `ValidatedBookingInput` rather than trusting raw form/API payloads.
- Verify selected artist/venue bookability inside the service using trusted server-side Payload access.
- Normalize full-day bookings to Asia/Kolkata day boundaries.

Reason:

- The plan requires one controlled validation path before later API and form work.

Impact:

- Ticket 9 can call this service from the booking API.
- Ticket 13 can shape public form data around the same validation contract.

Plan deviation:

- None.

Follow-up:

- Begin Ticket 5: quote and status services.

### 2026-09-03: Ticket 5 Quote and Status Services

Decision:

- Quote totals are calculated server-side from `baseQuoteAmount`, `additionalCharges`, `taxAmount`, and `discount`.
- `finalPayableAmount` is not independently editable.
- The status service enforces documented booking transitions, automatic approval behavior, manual payment-link behavior, and the confirmed-booking payment invariant.
- Status transition overrides use dedicated fields: `transitionOverride` and `transitionOverrideReason`.

Reason:

- Financial totals and workflow state must remain consistent even when records are edited directly in the admin panel.
- Transition overrides are intentionally separate from conflict warning overrides because they represent different admin decisions and will be audited separately in Ticket 6.

Impact:

- Admins can only perform unusual workflow transitions through an explicit transition override field.
- Ticket 6 can audit transition overrides separately from conflict/capacity/availability warning overrides.

Plan deviation:

- None.

Follow-up:

- Begin Ticket 6: audit history hooks.

### 2026-09-03: Ticket 6 Audit History Hooks

Decision:

- Add `bookingAuditService` as the canonical audit-entry builder for booking requests.
- Booking create operations append a server-generated `booking-created` entry.
- Booking update operations preserve stored audit history and append entries for booking status, payment status, quote, transition override, and warning override changes.
- Submitted `auditHistory` values are ignored on update, preventing manual replacement or truncation.

Reason:

- Audit history must be append-only and server-generated while still living inside the embedded `booking-requests.auditHistory` array selected in Ticket 1.
- Keeping comparison logic in a service makes the Payload hook small and testable.

Impact:

- Important admin actions are traceable with previous value, new value, optional note/reason, user id where available, and timestamp.
- Ticket 14 can rely on this foundation when refining the admin workflow.

Plan deviation:

- None.

Follow-up:

- Begin Ticket 7: conflict and availability service.

### 2026-09-04: Ticket 7 Conflict and Availability Service

Decision:

- Add `bookingConflictService` for overlap warnings, availability-block warnings, venue capacity warnings, warning override validation, and availability-block validation.
- Booking conflict checks use the frozen formula: `newStart < existingEnd AND newEnd > existingStart`.
- `New` bookings are conflict-relevant.
- Back-to-back bookings are allowed.
- Warning details store related booking IDs, booking references, availability block IDs, availability block reasons, and a summary note.

Reason:

- Conflict and capacity scenarios should warn admins/requesters without blocking public submissions.
- Persisting both IDs and human-readable references/reasons makes the admin inbox easier to review.

Impact:

- Booking create/update hooks now refresh warning fields server-side.
- Warning overrides require `warningOverrideReason` and populate override user/time metadata when first applied.
- Availability blocks enforce exactly one resource and `endDateTime > startDateTime`.

Plan deviation:

- None.

Follow-up:

- Begin Ticket 8: idempotency and anti-spam.

### 2026-09-04: Ticket 8 Idempotency and Anti-Spam

Decision:

- Add `bookingAntiSpamService` for idempotency token normalization, duplicate token lookup, rate-limit key generation, rolling rate-limit checks, client address extraction, and honeypot validation.
- Booking create hooks reject duplicate idempotency tokens before generating a booking reference.
- Booking create hooks enforce rate limits when trusted server code supplies a `rateLimitKey`.
- Duplicate protection remains token-based only; no fuzzy matching of requester/content/date data is used.
- Context7 was requested for this ticket, but no callable Context7 tool was exposed in this Codex session.

Reason:

- The plan requires double-click/retry protection without blocking legitimate second requests.
- Reusing the existing contact/feedback pattern keeps anti-spam behavior consistent across the app.

Impact:

- Ticket 9 can call the same anti-spam service from the public booking API.
- Public booking forms in Ticket 13 should generate/send an idempotency token and include a hidden honeypot field.

Plan deviation:

- None.

Follow-up:

- Begin Ticket 9: booking API endpoint.

### 2026-09-04: Ticket 9 Booking API Endpoint

Decision:

- Add `POST /api/bookings` as the single public booking endpoint.
- Add `bookingCreationService` as the trusted creation path used by the endpoint.
- The creation service validates input, checks global booking settings, handles honeypot/idempotency, snapshots policy text/version/date, sets consent timestamps, stores a hashed rate-limit key, and creates `booking-requests` with `overrideAccess: true`.
- The endpoint returns only safe public response data: `bookingReference`, `duplicate`, `message`, and `status`.
- Ticket 9 does not implement email sending; Ticket 15 remains responsible for transactional email. With no email side effect in this ticket, booking creation cannot be rolled back by email failure.
- Next.js DevTools was used to locate the bundled Next.js 16.3.0 route-handler docs before implementing the route.

Reason:

- The plan requires one controlled public creation path for artist and venue bookings.
- Keeping creation logic in a service makes Ticket 13 forms and future tests reuse the same behavior.

Impact:

- Public forms can submit through `/api/bookings` once Ticket 13 is implemented.
- Duplicate idempotency retries return the existing booking reference instead of creating another booking.

Plan deviation:

- None.

Follow-up:

- Begin Ticket 10: public artist catalogue.

### 2026-09-04: Ticket 10 Public Artist Catalogue

Decision:

- Add `/artists` as a dynamic public artist catalogue with search, category, location, and artist-type filters.
- Add `/artists/[slug]` as a dynamic public artist detail page.
- Public pages query only published and active artists and active artist categories.
- Published, active, booking-disabled artists remain visible, but the booking CTA is replaced with a non-actionable unavailable state.
- Public detail pages display profile, cultural highlights, gallery, public links, indicative fee text, and performance details. Private contact/admin fields are not rendered.

Reason:

- The frozen plan requires public browsing before public booking forms.
- URL-based filters keep the catalogue shareable and accessible without client-only state.

Impact:

- Ticket 13 can attach real artist booking forms to the existing detail-page CTA area.
- Admin-managed artist records now have a public catalogue surface.

Plan deviation:

- None.

Follow-up:

- Begin Ticket 11: public venue catalogue.

### 2026-09-04: Ticket 11 Public Venue Catalogue

Decision:

- Add `/venues` as a dynamic public venue catalogue with search, category, location, indoor/outdoor, and minimum-capacity filters.
- Add `/venues/[slug]` as a dynamic public venue detail page.
- Public pages query only published and active venues and active venue categories.
- Published, active, booking-disabled venues remain visible, but the booking CTA is replaced with a non-actionable unavailable state.
- Public detail pages display description, facilities, capacity, address, embedded Google Map when provided, accessible map directions link, rules, gallery, indicative rent text, and booking availability wording. Private contact/admin fields are not rendered.

Reason:

- The frozen plan requires venue browsing before public venue booking forms.
- Venue capacity and map information are core public decision points for event organizers.

Impact:

- Ticket 13 can attach real venue booking forms to the existing detail-page CTA area.
- Admin-managed venue records now have a public catalogue surface.

Plan deviation:

- None.

Follow-up:

- Begin Ticket 12: policy and consent display.

### 2026-09-04: Ticket 12 Policy and Consent Display

Decision:

- Add `bookingSettingsService` to normalize public booking settings for frontend display.
- Add `BookingPolicySummary` for reusable public display of booking notice, terms, privacy notice, cancellation policy, payment/refund policy, support contacts, and policy version/date.
- Add `BookingConsentFields` for Ticket 13 forms to collect required terms/privacy acknowledgement while carrying the active policy version/date.
- Wire policy summaries into artist and venue detail booking panels.
- Make artist and venue detail booking CTAs respect both the resource-level `bookingEnabled` flag and global `booking-settings.bookingEnabled`.

Reason:

- Public users must see booking policy context before submitting requests.
- Ticket 13 should reuse one consent component rather than duplicating checkbox names and policy metadata.
- The API already remains authoritative for consent validation and snapshots.

Impact:

- Public booking forms can render consistent consent UI in Ticket 13.
- When global booking is disabled, public detail pages remain visible while booking CTAs become unavailable.

Plan deviation:

- None.

Follow-up:

- Begin Ticket 13: public booking forms.

### 2026-09-05: Ticket 13 Public Booking Forms

Decision:

- Add `BookingRequestForm` as the reusable public artist/venue booking form.
- Add `bookingFormService` to build safe API payloads from browser form data, including resource identity, source page, idempotency token, consent booleans, honeypot field, and ISO date/time conversion.
- Render the form on artist and venue detail pages only when both the resource and global booking settings are enabled.
- Artist forms submit the selected artist and require event location.
- Venue forms submit the selected venue and use optional event location notes instead of accepting an alternate venue.
- Reuse `BookingConsentFields` from Ticket 12.

Reason:

- The plan requires artist and venue submissions to use the same controlled API creation path while keeping form behavior resource-specific.
- Keeping payload mapping outside the component makes date/idempotency/consent behavior testable.

Impact:

- Public users can submit booking requests without accounts from artist and venue detail pages.
- Successful submissions display the returned booking reference and public message.

Plan deviation:

- None.

Follow-up:

- Begin Ticket 14: admin booking workflow.

### 2026-09-05: Ticket 14 Admin Booking Workflow

Decision:

- Improve the booking request admin inbox columns to show reference, type, requester, event, start date, booking status, payment status, and conflict flag.
- Keep admin workflow edits inside the existing Payload `booking-requests` hook so quote totals, status/payment invariants, warnings, warning overrides, and audit history remain server-controlled.
- Add quote metadata handling so the first quote change records `quoteCreatedAt` and `quotedBy`, while later non-quote workflow edits preserve the original quote metadata.
- Continue using explicit `transitionOverride`/`transitionOverrideReason` and `warningOverride`/`warningOverrideReason` fields rather than bypassing service rules.

Reason:

- Admins need a practical unified inbox without weakening the backend workflow constraints already implemented.
- Quote metadata fields existed in the schema and should be populated by trusted server-side logic rather than manually maintained.

Impact:

- Booking managers can triage requests from the list view more easily.
- Quote/status/payment changes remain auditable and consistent.

Plan deviation:

- None.

Follow-up:

- Begin Ticket 15: transactional email.

### 2026-09-05: Ticket 15 Transactional Email

Decision:

- Add `bookingEmailService` for requester acknowledgement, admin new-booking notification, requester status-change notification, and Need More Information email.
- Send creation emails only after a booking request has been saved and a reference exists.
- Send requester status emails from the `booking-requests` `afterChange` hook when booking or payment status changes.
- Catch and log email failures so booking creation and admin updates are not rolled back.
- Add optional Payload Nodemailer SMTP adapter wiring when `SMTP_HOST`, `SMTP_USER`, and `SMTP_PASS` are configured.
- Add `EMAIL_FROM`, `EMAIL_TO_ADMIN`, and `SMTP_*` placeholders to `.env.example`.

Reason:

- V1 requires basic transactional email, while the frozen plan explicitly says email delivery failure must not force users to resubmit valid bookings.
- Using Payload's email surface keeps the booking logic independent of the final official SMTP provider details.

Impact:

- Local/test environments can mock or skip email without breaking booking flows.
- Production can send real email once official NEZCC SMTP credentials are added to Vercel.
- Admin notification defaults to `EMAIL_TO_ADMIN`, then `booking-settings.adminNotificationEmail`, then `booking-settings.bookingSupportEmail`.

Plan deviation:

- None.

Follow-up:

- Begin Ticket 16: V1 integration QA and deployment readiness.

### 2026-09-05: Ticket 16 Readiness Gate

Decision:

- Treat the 2026-09-05 Ticket 16 run as a readiness gate with documented blockers instead of marking V1 production-ready.
- Add `booking-v1-readiness.md` as the durable QA evidence and launch-blocker record.

Reason:

- Local TypeScript, production build, and local built-server Playwright checks pass.
- The deployed production URL currently returns 404 for `/artists`, `/venues`, and `/api/bookings`, which means production is not serving the latest booking implementation.
- Official SMTP and production media environment readiness still require verification outside this local run.

Impact:

- V1 code is locally verified, but launch remains blocked until latest code is deployed and production environment/manual QA checks pass.
- Ticket 16 can proceed as a release-readiness workflow without silently changing the frozen plan's launch criteria.

Plan deviation:

- None.

Follow-up:

- Push/redeploy latest commits, configure/verify production environment variables, then rerun production smoke and manual admin QA.
