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
