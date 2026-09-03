# NEZCC Booking Data Model

Source of truth: `booking-implementation-plan.md`.

This document will track the exact Payload schema implemented for the artist/venue booking feature. Update this file when Ticket 1 defines concrete field names, enums, defaults, relationships, hooks, admin UI grouping, and indexes.

## Collections

### `artist-categories`

Purpose: reusable art-form/category taxonomy for artists.

Initial fields:

- `name`
- `slug`
- `description`
- `sortOrder`
- `isActive`

### `artists`

Purpose: admin-managed public cultural artist profiles.

Initial field groups:

- Publishing: slug, published status, active status, featured status, booking enabled.
- Profile: name, individual/group, categories, state/region, district/city, bios, highlights.
- Media: gallery images, video links.
- Performance: awards, experience, languages, duration, team size, travel availability.
- Public links/pricing: social links, website, indicative/base fee text.
- Private admin fields: internal contact person, phone, email, notes.

### `venue-categories`

Purpose: reusable taxonomy for NEZCC venue types.

Initial fields:

- `name`
- `slug`
- `description`
- `sortOrder`
- `isActive`

### `venues`

Purpose: admin-managed public NEZCC venue profiles.

Initial field groups:

- Publishing: slug, published status, active status, featured status, booking enabled.
- Profile: name, category, address, city/state, map embed URL.
- Facilities: capacity, indoor/outdoor, stage, seating, parking, sound, lighting, green room, projector/screen, accessibility.
- Media/policies: gallery, available timings, rules/terms text or document, indicative/base rent text.
- Private admin fields: internal contact person, phone, email, notes.

### `booking-requests`

Purpose: unified admin inbox for artist and venue booking requests.

Initial field groups:

- Identity: booking reference number, booking type, related artist OR venue.
- Requester: full name, optional organization, email, phone.
- Event: event name/type, artist event location OR venue location notes, start/end date-time, time type, audience size, budget amount/notes, requirements, message.
- Consent: terms/privacy booleans, timestamps, accepted policy version/date, policy snapshot or immutable policy reference.
- Workflow: booking status, payment status, quote fields, payment-ready fields, warnings, override fields, admin notes.
- Integrity: idempotency token, source page, operational rate-limit metadata, audit history.

Initial booking status:

- `New`

Initial payment status:

- `Not Required`

### `availability-blocks`

Purpose: admin-only blocks for artist/venue unavailability outside booking requests.

Initial fields:

- Applies to artist or venue.
- Related artist OR venue.
- Start date/time.
- End date/time.
- Reason.
- Notes.
- Active status.

Validation:

- Exactly one artist OR venue.
- Resource type must match relationship.
- `endDateTime > startDateTime`.
- Overlapping blocks are allowed.

## Globals

### `booking-settings`

Purpose: CMS-editable booking business settings and public policy text.

Initial fields:

- Booking enabled.
- Public booking notice.
- Admin notification email.
- Booking support email.
- Booking support phone.
- Default currency, INR.
- Terms and conditions.
- Privacy notice.
- Cancellation policy.
- Payment/refund policy.
- Approval disclaimer.
- Policy version/date.

Public reads must expose only fields needed by public pages/forms.

## Schema Notes To Resolve During Ticket 1

- Exact Payload field names.
- Exact enum values and labels.
- Whether policy snapshots are stored as text fields on bookings or via immutable policy-version records.
- Whether audit history stays embedded in `booking-requests`.
- Whether booking reference counters use a small dedicated collection.
- Admin group labels/sidebar organization.
- Indexes for slug, booking reference, idempotency token, booking type/resource/date queries.
