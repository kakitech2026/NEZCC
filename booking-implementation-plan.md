# NEZCC Artist and Venue Booking Implementation Plan

## Summary

Build a CMS-powered cultural artist and NEZCC venue directory with a secure public booking system.

V1 supports booking one artist OR one venue per request. Package booking is deferred to Phase 4. Public users do not need accounts. Bookings are submitted publicly, reviewed by NEZCC admins, priced by admins, and confirmed only after approval and payment verification.

The payment gateway is not confirmed, so V1 will be payment-ready but will not include live payment gateway integration.

## V1 Product Decisions

- Artist profiles are created and managed by NEZCC admins only.
- Venue profiles are created and managed by NEZCC admins only.
- Artists are cultural artists under or associated with NEZCC.
- Venues are NEZCC venues only.
- Public users can browse artists and venues.
- Public users can submit booking requests without logging in.
- Each V1 request is for exactly one artist OR one venue.
- Artist + venue package booking is Phase 4.
- Direct artist/venue contact details stay private.
- Public booking requests do not include file uploads.
- Admins can upload artist/venue images and documents.
- Admin sets the final quote.
- Public prices are shown only as indicative/base pricing, if shown.
- Booking is confirmed only after approval and payment verification.
- Basic transactional email is part of V1.
- Admin can override conflict warnings.
- Public availability wording should say "subject to confirmation."
- Detailed public availability calendars are not part of V1.

## Phase 1A: CMS Catalogue

Add Payload collections:

- `artist-categories`
- `artists`
- `venue-categories`
- `venues`

Artist profile fields:

- Name
- Slug
- Published status
- Active/inactive status
- Booking enabled
- Featured status
- Individual/group
- Categories/art forms
- State/region
- District/city
- Short biography
- Detailed profile
- Photo gallery
- YouTube/video links
- Awards/recognition
- Years of experience
- Languages spoken
- Performance duration
- Team size
- Travel availability
- Cultural highlights
- Social media links
- Website link
- Indicative/base fee text
- Private internal contact person
- Private internal phone
- Private internal email
- Internal admin notes

Venue profile fields:

- Name
- Slug
- Published status
- Active/inactive status
- Booking enabled
- Featured status
- Category/type
- Address
- City/state
- Google Maps embed URL
- Capacity
- Indoor/outdoor
- Stage availability
- Seating type
- Parking
- Sound system
- Lighting
- Green room
- Projector/screen
- Accessibility facilities
- Available timings
- Photo gallery
- Rules/terms text or document
- Indicative/base rent text
- Private internal contact person
- Private internal phone
- Private internal email
- Internal admin notes

Public pages:

- `/artists`
- `/artists/[slug]`
- `/venues`
- `/venues/[slug]`

V1 public filters:

- Search
- Category/art form
- State/location
- Individual/group for artists
- Capacity for venues
- Indoor/outdoor for venues

## Phase 1B: Booking Engine

Add Payload collections/globals:

- `booking-requests`
- `availability-blocks`
- `booking-settings` global

Each booking request stores:

- Booking reference number
- Booking type: `artist` or `venue`
- Related artist OR related venue
- Requester full name
- Organization name, optional
- Email
- Phone
- Event name
- Event type
- Event location for artist bookings
- Event location notes for venue bookings
- Start date/time
- End date/time
- Time type: exact, flexible, or full-day
- Expected audience size
- Budget amount, optional
- Budget notes, optional
- Special requirements
- Message
- Terms accepted and timestamp
- Privacy accepted and timestamp
- Accepted policy version/date
- Booking status
- Payment status
- Quote fields
- Payment-ready fields
- Admin notes
- Conflict/capacity/availability warnings
- Source page
- Idempotency token
- Operational rate-limit metadata
- Audit history

Booking status values:

- `New`
- `Under Review`
- `Need More Information`
- `Approved`
- `Pending Payment`
- `Confirmed`
- `Completed`
- `Rejected`
- `Cancelled`

Payment status values:

- `Not Required`
- `Pending`
- `Link Sent`
- `Paid`
- `Failed`
- `Refunded`
- `Cancelled`

Do not use `Paid` as a booking status.

Allowed booking flow:

- `New -> Under Review`
- `Under Review -> Need More Information`
- `Need More Information -> Under Review`
- `Need More Information -> Rejected`
- `Need More Information -> Cancelled`
- `Under Review -> Approved`
- `Approved -> Pending Payment`
- `Pending Payment -> Confirmed`
- `Confirmed -> Completed`
- `New / Under Review / Approved -> Rejected`
- `Approved / Pending Payment / Confirmed -> Cancelled`

Confirmation invariant:

- `bookingStatus = Confirmed` requires `paymentStatus = Paid` or `paymentStatus = Not Required`.
- Admin manual payment confirmation must update `paymentStatus` to `Paid`.

Approval behavior:

- If `finalPayableAmount > 0`, approved booking moves to `Pending Payment` and `paymentStatus` becomes `Pending`.
- If `finalPayableAmount = 0`, booking may move to `Confirmed` with `paymentStatus = Not Required`.
- Unusual transitions require deliberate admin override and must be recorded in audit history.

Quote fields:

- Base quote amount
- Additional charges
- Discount
- Tax/GST amount
- Quote notes
- Quote valid until
- Quote created date
- Quoted by

Calculate server-side:

```text
finalPayableAmount = baseQuoteAmount + additionalCharges + taxAmount - discount
```

Payment-ready fields:

- Payment gateway placeholder
- Payment link/reference
- Payment amount received
- Payment received date
- Manual payment confirmation note

Manual V1 payment-link behavior:

- If an admin adds a payment link/reference manually, `paymentStatus` should become `Link Sent`.
- If an admin manually confirms received payment, `paymentStatus` should become `Paid`.

Booking reference:

- Generate server-side with an atomic counter or transaction-safe mechanism.
- Recommended format: `NEZCC-BKG-YYYY-000001`
- Must be unique, non-editable by normal admins, not based directly on MongoDB ID, and safe under simultaneous submissions.
- Never generate with unsafe `count + 1` logic.

Availability blocks:

- Applies to artist or venue
- Related artist OR venue
- Start date/time
- End date/time
- Reason
- Notes
- Active status

Availability block validation:

- Exactly one artist OR venue is required.
- Artist and venue cannot both be provided.
- Related resource must exist.
- Resource type must match the relationship field.
- `endDateTime > startDateTime`.
- Active status defaults to active.
- Overlapping availability blocks are allowed.

Conflict checks use date-time overlap:

```text
newStart < existingEnd AND newEnd > existingStart
```

Back-to-back bookings are allowed when one ends exactly when the next begins.

Conflict-relevant booking statuses:

- `New`
- `Under Review`
- `Need More Information`
- `Approved`
- `Pending Payment`
- `Confirmed`

Non-conflict statuses:

- `Rejected`
- `Cancelled`
- `Completed`

Store warning details:

- `hasConflict`
- `conflictType`
- `conflictingBookingIds`
- `conflictingBookingReferences`
- `capacityWarning`
- `availabilityBlockWarning`
- `availabilityBlockIds`
- `warningNotes`

For venue bookings, if expected audience exceeds capacity, mark a warning but do not reject automatically.

Admin overrides should store explicit override fields, such as `warningOverride`, `warningOverrideReason`, `warningOverriddenBy`, and `warningOverriddenAt`, and append the override to audit history.

## Booking Settings Global

Add CMS-editable business settings:

- Booking enabled
- Public booking notice
- Admin notification email
- Booking support email
- Booking support phone
- Default currency, INR
- Terms and conditions
- Privacy notice
- Cancellation policy
- Payment/refund policy
- Approval disclaimer
- Policy version/date

Secrets remain environment variables.

Anonymous/public reads should expose only the fields needed by public booking forms and public booking notices. Internal settings must remain protected if the global grows later.

When global booking is disabled:

- Public booking CTAs should be hidden or disabled.
- Public booking forms should not submit.
- The booking API should reject new booking submissions.
- Existing booking records remain manageable by admins.
- Public pages may still display artists and venues.

Bookings must copy the accepted policy version/date and either the accepted policy text snapshot or a stable reference to an immutable historical policy version. Do not rely only on whatever policy text is current at the time an old booking is viewed.

## Booking API and Services

Create one server-side booking creation service used by artist and venue forms.

Recommended internal services:

- `bookingValidation`
- `bookingReferenceService`
- `bookingConflictService`
- `bookingCreationService`
- `bookingEmailService`
- `bookingStatusService`

The booking API must:

- Validate all fields server-side.
- Enforce maximum field lengths.
- Validate email.
- Validate Indian and international phone formats.
- Reject past start date/time.
- Reject end date/time before start date/time.
- For `timeType = exact`, require `endDateTime > startDateTime`.
- For `timeType = flexible`, still require a valid start/end range; the submitted times are preferred timing for admin review, not guaranteed booking times.
- For `timeType = full-day`, allow same calendar date and normalize to the full local day in IST.
- Booking business date/time semantics use Asia/Kolkata.
- Verify selected artist/venue exists.
- Verify selected artist/venue is published, active, and booking enabled.
- Enforce artist booking has artist only.
- Enforce venue booking has venue only.
- Reject both artist and venue in one V1 request.
- Reject neither artist nor venue.
- Generate booking reference server-side.
- Capture consent timestamps.
- Copy accepted policy version/date into booking.
- Run booking and availability-block conflict checks.
- Run venue capacity warning check.
- Use Payload `overrideAccess` only inside trusted server code.
- Return only safe public response data.

Security controls:

- Rate limiting
- Honeypot field
- Idempotency token
- Duplicate submission protection
- HTML/script sanitization
- No anonymous Payload REST access to booking records

Idempotency protects technical duplicates such as double-clicks, browser retries, and network retries. Avoid fuzzy content-based duplicate blocking, because a requester may legitimately submit a second request after changing requirements.

New booking requests should start with:

- `bookingStatus = New`
- `paymentStatus = Not Required`

Payment status changes only after admin quote/approval or later payment integration.

## Public Form Behavior

Artist booking:

- Selected artist is fixed from the profile page.
- Event location is required.
- Venue field is not accepted.

Venue booking:

- Selected venue is fixed from the profile page.
- Event location is the selected venue.
- Optional event location notes may be provided.
- Artist field is not accepted.

After successful submission:

- Show success message.
- Display booking reference number.
- Explain that booking is subject to NEZCC approval and payment verification.

Recommended message:

```text
Your booking request has been received. Reference: NEZCC-BKG-YYYY-000001.
NEZCC will review availability and contact you. This booking is confirmed only after approval and payment verification.
```

Public catalogue and booking form accessibility requirements:

- Keyboard-accessible filters, controls, and forms.
- Proper labels and error associations.
- Meaningful image alt text.
- Sensible heading hierarchy.
- Focus management after submission or validation errors.
- Accessible map fallback/link where maps are embedded.

## Phase 1C: Transactional Email

Basic email is required in V1.

Emails:

- Requester booking acknowledgement
- Admin new booking notification
- Requester status-change notification
- Requester "Need More Information" notification

Email reliability rule:

- Booking creation succeeds independently of email delivery.
- If email fails, log the failure and keep the booking.
- Do not make the user resubmit because email failed.

Email sender:

- Use official NEZCC email.
- Prefer NEZCC SMTP if credentials are available.
- Use Resend or SendGrid only if official SMTP is unavailable.

Likely environment variables:

```dotenv
EMAIL_FROM=
EMAIL_TO_ADMIN=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

## Audit History

Audit history must be append-only and server-generated.

Track:

- Previous booking status
- New booking status
- Previous payment status
- New payment status
- Changed by
- Changed at
- Admin note/reason
- Quote changes
- Payment changes
- Override actions

Admins must not manually edit audit history.

## Access Control and Privacy

Anonymous users can:

- Read published public artist fields.
- Read published public venue fields.
- Submit booking requests through the booking API.

Anonymous users cannot:

- Read booking requests.
- List booking requests.
- Update booking requests.
- Delete booking requests.
- Access private contact fields or admin notes.

Private fields must be protected at API/access level, not only hidden in UI.

## Deletion and Archival

Artists and venues with booking history should not be hard-deleted through normal admin workflows.

Rules:

- Use inactive/archive status instead of deletion.
- Preserve historical booking references.
- Hide inactive records from public listings.
- Allow booking-disabled records to remain public but not bookable.

Public visibility:

```text
published = true
active = true
```

Bookability:

```text
published = true
active = true
bookingEnabled = true
```

## Implementation Tickets

1. Payload foundation data model
2. Access control and privacy
3. Booking reference service
4. Booking validation service
5. Quote and status services
6. Audit history hooks
7. Conflict and availability service
8. Idempotency and anti-spam
9. Booking API endpoint
10. Public artist catalogue
11. Public venue catalogue
12. Policy and consent display
13. Public booking forms
14. Admin booking workflow
15. Transactional email
16. V1 integration QA and deployment readiness
17. Phase 2 operational tools
18. Phase 3 payments
19. Phase 4 package booking

Implementation can parallelize after Tickets 1-2. Tickets 3-9 build the booking engine, while Tickets 10-12 can progress on the catalogue and policy surfaces. The streams join at public booking forms and admin workflow.

## V1 Integration QA and Deployment Readiness

Run after Tickets 1-15.

Required checks:

- `npx tsc --noEmit`
- `npm run build`
- `npm run test:e2e`
- Full artist booking happy path
- Full venue booking happy path
- Conflict scenarios
- Availability-block scenarios
- Capacity warning
- Idempotency
- Anonymous API/privacy checks
- Booking/payment transition tests
- Audit-history integrity
- Consent/policy-version checks
- Email success and failure behavior
- Accessibility smoke check for catalogue pages and booking forms
- Environment variable validation
- Payload migration/schema readiness
- Production or staging smoke test
- Existing NEZCC regression check
- Initial CMS data/content verification
- Rollback/recovery notes

V1 should not be treated as launch-ready until this ticket passes.

## Phase 2: Operational Tools

- Admin dashboard stats
- CSV export
- Print booking details
- Better admin availability calendar
- Homepage featured artists section
- Improved public filters
- Richer email templates
- Optional public availability indicators

## Phase 3: Payments

Start only after NEZCC confirms the payment provider.

Possible providers:

- Razorpay
- SBI Collect
- Government payment portal
- Manual payment reference workflow

Payment integration should support:

- Payment link/order generation
- Automatic payment status verification
- Receipt/invoice generation
- Payment failure handling
- Refund/cancellation tracking
- Webhook idempotency
- Manual admin override

## Phase 4: Package Booking

Add after artist and venue booking are stable.

Package booking supports:

- One artist + one venue in one request
- Combined availability checks
- Combined quote
- Combined approval workflow
- Combined payment flow
- Package-specific admin view

## Testing Plan

Run from `apps/web`:

```bash
npx tsc --noEmit
npm run build
npm run test:e2e
```

Manual QA:

- Create artist category.
- Create artist.
- Publish artist.
- Confirm artist appears publicly.
- Confirm artist detail page loads.
- Confirm private contact fields are hidden from public/API responses.
- Submit artist booking.
- Confirm booking reference appears.
- Confirm booking appears in admin.
- Repeat same flow for venue.
- Submit overlapping booking and confirm conflict warning.
- Submit venue request over capacity and confirm capacity warning.
- Confirm admin can override warning.
- Confirm disabled booking cannot receive requests.
- Confirm published, active, booking-disabled artists/venues still display publicly with booking CTA disabled or removed.
- Confirm unpublished/inactive artist or venue cannot receive requests.
- Confirm malformed API requests are rejected.
- Confirm both artist and venue cannot be submitted in one V1 request.
- Confirm neither artist nor venue is rejected.
- Confirm policy consent version and timestamps are stored.
- Confirm audit history is append-only.
- Confirm duplicate idempotency token does not create duplicate bookings.
- Confirm requester acknowledgement email sends.
- Confirm admin notification email sends.
- Confirm status-change email sends.
- Confirm booking still succeeds if email fails.
- Confirm production build passes.

## Acceptance Criteria

V1 is complete when:

- Admin can manage artists, artist categories, venues, and venue categories.
- Public users can browse artists and venues.
- Public users can view rich artist and venue detail pages.
- Published, active, booking-disabled artists/venues remain visible but cannot receive booking requests.
- Public users can submit booking requests without accounts.
- Each request is for exactly one artist OR one venue.
- Each booking receives a unique reference number.
- Booking requests appear in one unified admin area.
- Admin can review, quote, approve, reject, request more information, cancel, and complete bookings.
- Booking and payment statuses are separate.
- `Confirmed` booking status requires `Paid` or `Not Required` payment status.
- Quote totals are calculated server-side.
- Date-time conflict warnings work.
- Availability-block warnings work.
- Venue capacity warnings work.
- Admin can override warnings deliberately.
- Public contact details remain hidden at UI and API levels.
- Terms/privacy consent and policy version are recorded.
- Audit history is append-only and server-generated.
- Basic emails work and do not block booking creation.
- Booking policy text is CMS-editable.
- Payment-ready fields exist.
- No live payment gateway is required until provider confirmation.
- Existing NEZCC site functionality remains intact.
