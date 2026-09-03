# NEZCC Booking Workflows

Source of truth: `booking-implementation-plan.md`.

This document records booking/payment state behavior, approval rules, audit behavior, and operational workflows.

## Initial Submission

New public booking requests start with:

- `bookingStatus = New`
- `paymentStatus = Not Required`

The booking API returns a booking reference number and explains that the booking is subject to NEZCC approval and payment verification.

## Booking Statuses

- `New`
- `Under Review`
- `Need More Information`
- `Approved`
- `Pending Payment`
- `Confirmed`
- `Completed`
- `Rejected`
- `Cancelled`

Allowed normal transitions:

- `New -> Under Review`
- `Under Review -> Need More Information`
- `Need More Information -> Under Review`
- `Need More Information -> Rejected`
- `Need More Information -> Cancelled`
- `Under Review -> Approved`
- `Approved -> Pending Payment`
- `Pending Payment -> Confirmed`
- `Confirmed -> Completed`

Side transitions:

- `New / Under Review / Approved -> Rejected`
- `Approved / Pending Payment / Confirmed -> Cancelled`

## Payment Statuses

- `Not Required`
- `Pending`
- `Link Sent`
- `Paid`
- `Failed`
- `Refunded`
- `Cancelled`

Do not use `Paid` as a booking status.

## Confirmation Invariant

`bookingStatus = Confirmed` requires one of:

- `paymentStatus = Paid`
- `paymentStatus = Not Required`

Admin manual payment confirmation must update `paymentStatus` to `Paid`.

## Approval Rules

- If `finalPayableAmount > 0`, approval moves booking to `Pending Payment` and sets `paymentStatus = Pending`.
- If `finalPayableAmount = 0`, booking may move to `Confirmed` with `paymentStatus = Not Required`.
- If an admin adds a manual payment link/reference, `paymentStatus` should become `Link Sent`.

## Need More Information

V1 behavior:

- Admin enters the requested information message.
- System emails the requester.
- Requester replies to the official NEZCC email address.
- Admin manually updates the booking record and moves it back to `Under Review`, or to `Rejected`/`Cancelled`.

## Warning Overrides

Admins may override conflict, capacity, or availability warnings.

Override data should include:

- Override flag.
- Override reason.
- Overridden by.
- Overridden at.

Overrides must be appended to audit history.

## Audit History

Audit history must be:

- Append-only.
- Server-generated.
- Not manually editable by admins.

Track:

- Booking status changes.
- Payment status changes.
- Quote changes.
- Warning overrides.
- Admin note/reason where relevant.
- Changed by and changed at.

## Global Booking Disabled

When global booking is disabled:

- Public booking CTAs are hidden or disabled.
- Public booking forms do not submit.
- Booking API rejects new submissions.
- Existing booking records remain manageable by admins.
- Public catalogue pages may still display artists and venues.
