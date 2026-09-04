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
