# NEZCC Booking Implementation Tickets

Source of truth: `booking-implementation-plan.md`.

This file is the dependency-ordered engineering work queue. If implementation needs to differ from the frozen plan, record the decision in `booking-decisions.md`.

## V1 Tickets

### Ticket 1: Payload Foundation Data Model

Dependencies: none.

Scope:

- Add `artist-categories`, `artists`, `venue-categories`, `venues`, `booking-requests`, `availability-blocks`, and `booking-settings`.
- Register collections/globals in Payload.
- Regenerate Payload types.

Acceptance criteria:

- New collections/globals appear in admin.
- Required fields, statuses, relationships, defaults, and admin labels exist.
- Type generation succeeds.

Tests:

- `npx tsc --noEmit`
- Payload type generation.

### Ticket 2: Access Control and Privacy

Dependencies: Ticket 1.

Scope:

- Define anonymous/admin access rules.
- Protect private artist/venue fields.
- Block anonymous booking and availability-block reads.
- Restrict booking creation to trusted server-side code.

Acceptance criteria:

- Public users see only public artist/venue data.
- Booking requests cannot be enumerated publicly.
- Private contacts and admin notes never appear in public API responses.

Tests:

- Anonymous API/privacy checks.
- Delete/archive rule checks.

### Ticket 3: Booking Reference Service

Dependencies: Ticket 1.

Scope:

- Generate `NEZCC-BKG-YYYY-000001` style references.
- Use atomic or transaction-safe sequencing.
- Make references server-generated and non-editable.

Acceptance criteria:

- References are unique under concurrent submissions.
- No unsafe `count + 1` logic.

Tests:

- Reference uniqueness and concurrency tests.

### Ticket 4: Booking Validation Service

Dependencies: Tickets 1-2.

Scope:

- Centralize booking validation.
- Enforce one artist OR one venue.
- Validate resource bookability, dates/times, contact fields, consent, text lengths, and sanitization.

Acceptance criteria:

- Invalid direct API requests fail safely.
- Disabled/unpublished/inactive resources cannot receive bookings.
- Exact, flexible, and full-day time rules follow the plan.

Tests:

- Valid/invalid booking payload tests.
- Malicious request tests.

### Ticket 5: Quote and Status Services

Dependencies: Ticket 1.

Scope:

- Implement server-side quote calculation.
- Enforce booking/payment state rules.
- Apply approval behavior and confirmation invariant.

Acceptance criteria:

- `Confirmed` requires `Paid` or `Not Required`.
- Payable approval moves to `Pending Payment` and `paymentStatus = Pending`.
- Manual payment link/payment confirmation updates payment status correctly.

Tests:

- Quote calculation tests.
- Status transition tests.
- Payment invariant tests.

### Ticket 6: Audit History Hooks

Dependencies: Tickets 1 and 5.

Scope:

- Append server-generated audit entries for status, payment, quote, and override changes.
- Prevent manual editing.

Acceptance criteria:

- Audit history is append-only.
- Important admin actions are traceable.

Tests:

- Audit append tests.
- Manual mutation prevention tests.

### Ticket 7: Conflict and Availability Service

Dependencies: Tickets 1 and 4.

Scope:

- Implement date-time overlap warnings.
- Include booking conflicts, availability blocks, and venue capacity warnings.
- Store warning IDs/references and override metadata.

Acceptance criteria:

- Conflicts use `newStart < existingEnd AND newEnd > existingStart`.
- `New` is conflict-relevant.
- Back-to-back bookings are allowed.
- Public submission is warned, not blocked.

Tests:

- Overlap, boundary, availability block, and capacity tests.

### Ticket 8: Idempotency and Anti-Spam

Dependencies: Tickets 1 and 4.

Scope:

- Add idempotency token handling.
- Add rate limiting and honeypot behavior.
- Avoid fuzzy content-based duplicate blocking.

Acceptance criteria:

- Double-clicks/retries do not create duplicate bookings.
- Obvious spam payloads are rejected.

Tests:

- Reused-token test.
- Rate-limit and honeypot tests.

### Ticket 9: Booking API Endpoint

Dependencies: Tickets 3, 4, 5, 7, and 8.

Scope:

- Add one public booking endpoint backed by shared booking services.
- Use `overrideAccess` only in trusted server code.
- Return a safe response with reference number.

Acceptance criteria:

- Artist and venue forms use the same creation path.
- New records start as `bookingStatus = New` and `paymentStatus = Not Required`.
- Email failure does not roll back booking creation.

Tests:

- Valid artist/venue API tests.
- Invalid payload and privacy response tests.

### Ticket 10: Public Artist Catalogue

Dependencies: Tickets 1-2.

Scope:

- Add `/artists` and `/artists/[slug]`.
- Implement V1 filters and rich profile display.
- Keep private fields hidden.

Status:

- Completed on 2026-09-04.

Acceptance criteria:

- Published/active artists display.
- Booking-disabled artists remain visible without active booking CTA.
- Featured status can prioritize/highlight artists.

Tests:

- Page smoke, filtering, private-field, and accessibility checks.

### Ticket 11: Public Venue Catalogue

Dependencies: Tickets 1-2.

Scope:

- Add `/venues` and `/venues/[slug]`.
- Implement V1 filters, venue details, facilities, capacity, maps, and rules.
- Keep private fields hidden.

Status:

- Completed on 2026-09-04.

Acceptance criteria:

- Published/active venues display.
- Booking-disabled venues remain visible without active booking CTA.
- Map embeds include accessible fallback/link.

Tests:

- Page smoke, filtering, map, private-field, and accessibility checks.

### Ticket 12: Policy and Consent Display

Dependencies: Tickets 1-2.

Scope:

- Render public booking policy text from `booking-settings`.
- Require terms/privacy acknowledgement.
- Store accepted policy version/text snapshot or immutable version reference.

Status:

- Completed on 2026-09-04.

Acceptance criteria:

- Public booking forms cannot submit without consent.
- Old bookings retain the accepted policy context.

Tests:

- Consent validation and stored policy metadata tests.

### Ticket 13: Public Booking Forms

Dependencies: Tickets 8-12.

Scope:

- Add artist and venue booking forms.
- Include idempotency token, validation UI, consent, and success reference message.

Status:

- Completed on 2026-09-05.

Acceptance criteria:

- Public users can submit artist or venue bookings without accounts.
- Artist bookings require event location.
- Venue bookings use selected venue as event location.

Tests:

- Playwright form submission, error, focus, and success-state tests.

### Ticket 14: Admin Booking Workflow

Dependencies: Tickets 1, 5, 6, and 7.

Scope:

- Configure useful admin columns and fields.
- Support review, quote, status/payment updates, warnings, and deliberate overrides.

Status:

- Completed on 2026-09-05.

Acceptance criteria:

- Admin can process bookings according to the state machine.
- Overrides require reason and are audited.

Tests:

- Admin update tests where feasible.
- Manual admin QA.

### Ticket 15: Transactional Email

Dependencies: Tickets 9 and 14.

Scope:

- Add requester acknowledgement, admin notification, status-change, and Need More Information emails.
- Ensure email failures do not fail booking creation.

Status:

- Completed on 2026-09-05.

Acceptance criteria:

- Required emails send in normal flow.
- Email failures are logged without duplicate booking risk.

Tests:

- Mock email success/failure tests.

### Ticket 16: V1 Integration QA and Deployment Readiness

Dependencies: Tickets 1-15.

Scope:

- Run the full V1 release gate from `booking-testing.md`.
- Verify environment, schema, content, regression, and rollback readiness.

Status:

- QA run completed on 2026-09-05.
- V1 is not production-ready until the production deployment serves the new routes and production environment/manual QA checks are completed.

Acceptance criteria:

- V1 is launch-ready only after this ticket passes.

Tests:

- `npx tsc --noEmit`
- `npm run build`
- `npm run test:e2e`
- Manual QA matrix.

## Later Phase Tickets

### Ticket 17: Phase 2 Operational Tools

- Admin dashboard stats.
- CSV export.
- Print booking details.
- Better admin availability calendar.
- Homepage featured artists section.
- Improved filters and richer email templates.

### Ticket 18: Phase 3 Payments

- Integrate confirmed payment provider.
- Add payment links/orders, webhooks, receipts/invoices, refunds, and reconciliation.

### Ticket 19: Phase 4 Package Booking

- Support one artist + one venue in one package request.
- Add combined availability, quote, approval, and payment flow.
