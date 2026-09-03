# NEZCC Booking Access Control

Source of truth: `booking-implementation-plan.md`.

This document records the security and privacy contract for artist/venue booking implementation.

## Anonymous/Public Users

Allowed:

- Read published, active public artist fields.
- Read published, active public venue fields.
- Read explicitly public booking settings needed by forms/notices.
- Submit booking requests only through the controlled booking API.

Denied:

- Payload admin access.
- Listing, reading, updating, or deleting booking requests.
- Listing, reading, updating, or deleting availability blocks.
- Reading private artist/venue contact fields.
- Reading internal admin notes.
- Creating bookings directly through Payload REST.

## Admin Users

Allowed in V1:

- Manage artist categories, artists, venue categories, and venues.
- Manage booking requests.
- Manage availability blocks.
- Manage booking settings.
- Set quote fields, booking/payment statuses, warning overrides, and internal notes.

Future roles may split this into Super Admin, Content Editor, Booking Manager, and Viewer.


## Collection/Global Access Matrix

| Resource | Public Read | Public Create | Public Update | Public Delete | Admin |
|---|---|---|---|---|---|
| `artist-categories` | Active public records only | No | No | No | Manage |
| `artists` | Published + active, public fields only | No | No | No | Manage |
| `venue-categories` | Active public records only | No | No | No | Manage |
| `venues` | Published + active, public fields only | No | No | No | Manage |
| `booking-requests` | No | No direct Payload create | No | No | Manage through workflow rules |
| `availability-blocks` | No | No | No | No | Manage |
| `booking-settings` | Explicit public allowlist only | No | No | No | Manage |

Public booking creation is performed only through trusted custom server code. The service validates the operation first and uses Payload `overrideAccess` only where required after business validation succeeds.

## Implemented Ticket 2 Access Rules

- `artist-categories` and `venue-categories` allow anonymous reads only when `isActive = true`.
- `artists` and `venues` allow anonymous reads only when `isPublished = true` and `isActive = true`.
- `bookingEnabled = false` does not hide an otherwise published/active artist or venue.
- `booking-requests` deny anonymous direct Payload create/read/update/delete.
- `availability-blocks` require an authenticated admin for create/read/update/delete.
- `booking-settings` allows anonymous reads, but `adminNotificationEmail` is authenticated-only.
- Private artist/venue contact fields use field-level read access and require authentication.
- Artists and venues with booking history are protected by delete guards; admins should mark them inactive instead.

## Private Fields

Private artist/venue fields must be protected at API/access level, not only hidden in React UI.

Private fields include:

- Internal contact person.
- Internal phone.
- Internal email.
- Internal admin notes.

## Booking Requests

Rules:

- Public creation happens only through trusted server-side booking service/API.
- API uses Payload `overrideAccess` only after validation, idempotency, rate limiting, and conflict checks.
- Public responses return only safe data, such as success state and reference number.
- Audit history is append-only and server-generated.

## Booking Settings

Rules:

- Public forms may read public notices, support contact, policy text, and policy version/date.
- Internal configuration must not be exposed if the global grows later.
- Secrets never belong in Payload globals; use environment variables.

## Deletion and Archival

Rules:

- Artists and venues with booking history should not be hard-deleted through normal admin workflows.
- Use inactive/archive status for historical records.
- `published = true` and `active = true` controls public visibility.
- `published = true`, `active = true`, and `bookingEnabled = true` controls bookability.

## Server-Controlled Booking Fields

The public client must not be authoritative for fields derived or assigned by the booking system.

Server-controlled fields include:

- Booking reference number.
- Initial booking status.
- Initial payment status.
- Consent timestamps.
- Accepted policy version and policy snapshot/immutable policy reference.
- Conflict, capacity, and availability warnings.
- Audit history.
- Warning override actor/timestamps.
- Payment received timestamp.
- Quote totals derived by server-side calculation.

A public client may submit the form idempotency token, but that token must not provide read access to a booking or allow the client to select another booking's identity.

## Global Booking Disabled

When `booking-settings.bookingEnabled = false`:

- Public catalogue pages may remain available.
- Booking CTAs/forms are hidden or disabled.
- The booking API rejects new submissions.
- Existing booking records remain manageable by admins.

The API check is authoritative. Frontend hiding or disabling alone is not a security control.

## Trusted Server Usage

Any `overrideAccess` use must be limited to server-side services and API routes. Frontend code must never be trusted to enforce:

- Resource visibility.
- Resource bookability.
- Booking type relationship rules.
- Status/payment transitions.
- Quote totals.
- Consent metadata.
- Conflict warning integrity.


## Security Test Checklist

- Anonymous artist/venue reads return only public fields.
- Draft/inactive resources are not publicly readable.
- Published, active, booking-disabled resources remain readable but are not bookable.
- Anonymous booking GET/list/create/update/delete through Payload is denied.
- Anonymous availability-block access is denied.
- Public booking settings expose only explicitly allowed fields.
- Private contact fields and admin notes are absent from serialized public responses.
- Clients cannot set booking reference, initial statuses, audit history, warning integrity fields, or payment-received timestamps.
- Hard deletion with booking history is prevented through normal admin workflows.
- Global booking-disabled state is enforced by the API.
