# NEZCC Booking Testing Plan

Source of truth: `booking-implementation-plan.md`.

This document centralizes the V1 QA matrix and release gate.

## Required Commands

Run from `apps/web`:

```bash
npx tsc --noEmit
npm run build
npm run test:e2e
```

## Unit and Service Tests

Cover:

- Booking reference generation and uniqueness.
- Booking validation.
- Quote calculation.
- Booking/payment transition rules.
- Deliberate transition override behavior.
- Confirmation invariant.
- Public booking settings normalization.
- Audit history append behavior.
- Manual audit-history mutation prevention.
- Conflict overlap rules.
- Availability-block checks.
- Venue capacity warning.
- Back-to-back booking boundary behavior.
- `New` status conflict relevance.
- Idempotency token behavior.
- Rate limiting and honeypot behavior.
- No fuzzy content-based duplicate blocking.
- Email success/failure behavior with mocks.

## API Tests

Cover:

- Valid artist booking.
- Valid venue booking.
- Safe public response with booking reference.
- Disabled booking globally.
- Disabled/unpublished/inactive artist or venue.
- Both artist and venue submitted.
- Neither artist nor venue submitted.
- Invalid dates/times.
- Zero-duration exact booking.
- Full-day same-date booking.
- Flexible booking valid range.
- Artist booking requires event location.
- Venue booking ignores submitted event location and uses selected venue.
- Malicious HTML/script payloads.
- Anonymous booking record access denied.
- Safe public response shape.

## Public UI / E2E Tests

Cover:

- `/artists` loads.
- `/artists/[slug]` loads.
- Artist search, category, location, and individual/group filters preserve URL query state.
- Booking-disabled artist profiles remain visible with the booking CTA disabled or removed.
- `/venues` loads.
- `/venues/[slug]` loads.
- Venue search, category, location, indoor/outdoor, and minimum-capacity filters preserve URL query state.
- Venue detail pages display embedded maps with an accessible external directions link when map data exists.
- Public artist/venue booking panels display current booking policy context.
- Global booking-disabled state removes or disables public booking CTAs while leaving public resources visible.
- Search/filter controls work.
- Booking-disabled public resource remains visible with booking CTA disabled or removed.
- Artist booking form happy path.
- Venue booking form happy path.
- Validation errors are visible and associated with inputs.
- Success state displays booking reference.
- Form double-submit does not create duplicate bookings.

## Accessibility Smoke Checks

Cover:

- Keyboard-accessible filters, controls, and forms.
- Proper form labels.
- Error messages associated with fields.
- Meaningful image alt text.
- Sensible heading hierarchy.
- Focus movement after submit success/error.
- Accessible map fallback/link where maps are embedded.

## Manual QA

Cover:

- Create artist category.
- Create artist.
- Publish artist.
- Confirm artist appears publicly.
- Confirm private artist fields are hidden from UI/API.
- Submit artist booking.
- Confirm booking appears in admin.
- Repeat for venue.
- Submit overlapping booking and confirm warning.
- Submit availability-block conflict and confirm warning.
- Submit over-capacity venue request and confirm warning.
- Confirm admin override requires reason and is audited.
- Confirm consent timestamps and policy version/snapshot are stored.
- Confirm requester acknowledgement email.
- Confirm admin notification email.
- Confirm status-change email.
- Confirm booking still succeeds if email fails.

## Ticket 16 Release Gate

V1 is not launch-ready until:

- TypeScript passes.
- Production build passes.
- E2E tests pass or known gaps are documented.
- Full artist booking happy path passes.
- Full venue booking happy path passes.
- Conflict, availability-block, and capacity scenarios pass.
- Idempotency passes.
- Anonymous API/privacy checks pass.
- Booking/payment transition tests pass.
- Audit history integrity passes.
- Consent/policy-version checks pass.
- Email success and failure behavior passes.
- Environment variables are validated.
- Payload schema/migration readiness is confirmed.
- Initial CMS data/content is verified.
- Existing NEZCC routes are smoke-tested.
- Rollback/recovery notes are documented.
