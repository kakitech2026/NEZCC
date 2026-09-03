# NEZCC Booking Data Model

Source of truth: `booking-implementation-plan.md`.

This document tracks the exact Payload schema implemented for the artist/venue booking feature.

## Collections

### `artist-categories`

Purpose: reusable art-form/category taxonomy for artists.

Implemented fields:

- `name`
- `slug`
- `description`
- `sortOrder`
- `isActive`

### `artists`

Purpose: admin-managed public cultural artist profiles.

Implemented field groups:

- Publishing: `slug`, `isPublished`, `isActive`, `isFeatured`, `bookingEnabled`.
- Profile: `name`, `artistType`, `categories`, `stateRegion`, `districtCity`, `shortBiography`, `detailedProfile`, `culturalHighlights`.
- Media: `photoGallery`, `videoLinks`.
- Performance: `awardsRecognition`, `yearsOfExperience`, `languagesSpoken`, `performanceDuration`, `teamSize`, `travelAvailability`.
- Public links/pricing: `facebookURL`, `instagramURL`, `youtubeURL`, `websiteURL`, `indicativeFeeText`.
- Private admin fields: `internalContactPerson`, `internalPhone`, `internalEmail`, `internalNotes`.

### `venue-categories`

Purpose: reusable taxonomy for NEZCC venue types.

Implemented fields:

- `name`
- `slug`
- `description`
- `sortOrder`
- `isActive`

### `venues`

Purpose: admin-managed public NEZCC venue profiles.

Implemented field groups:

- Publishing: `slug`, `isPublished`, `isActive`, `isFeatured`, `bookingEnabled`.
- Profile: `name`, `category`, `address`, `cityState`, `googleMapsEmbedURL`, `description`.
- Facilities: `capacity`, `indoorOutdoor`, `stageAvailability`, `seatingType`, `parkingAvailability`, `soundSystemAvailability`, `lightingAvailability`, `greenRoomAvailability`, `projectorScreenAvailability`, `accessibilityFacilities`.
- Media/policies: `availableTimings`, `photoGallery`, `rulesTermsText`, `rulesTermsDocument`, `indicativeRentText`.
- Private admin fields: `internalContactPerson`, `internalPhone`, `internalEmail`, `internalNotes`.

### `booking-requests`

Purpose: unified admin inbox for artist and venue booking requests.

Implemented field groups:

- Identity: `bookingReference`, `bookingType`, `artist`, `venue`.
- Requester: `requesterName`, `organizationName`, `email`, `phone`.
- Event: `eventName`, `eventType`, `eventLocation`, `eventLocationNotes`, `startDateTime`, `endDateTime`, `timeType`, `expectedAudienceSize`, `budgetAmount`, `budgetNotes`, `specialRequirements`, `message`.
- Consent: `termsAccepted`, `termsAcceptedAt`, `privacyAccepted`, `privacyAcceptedAt`, `acceptedPolicyVersion`, `acceptedPolicyDate`, `acceptedTermsSnapshot`, `acceptedPrivacySnapshot`.
- Workflow: `bookingStatus`, `paymentStatus`, `adminNotes`.
- Quote/payment: `baseQuoteAmount`, `additionalCharges`, `discount`, `taxAmount`, `finalPayableAmount`, `quoteNotes`, `quoteValidUntil`, `quoteCreatedAt`, `quotedBy`, `paymentGateway`, `paymentLinkReference`, `paymentAmountReceived`, `paymentReceivedAt`, `manualPaymentConfirmationNote`.
- Warnings: `hasConflict`, `conflictType`, `conflictingBookings`, `capacityWarning`, `availabilityBlockWarning`, `availabilityBlocks`, `warningNotes`, `warningOverride`, `warningOverrideReason`, `warningOverriddenBy`, `warningOverriddenAt`.
- Integrity: `sourcePage`, `idempotencyToken`, `rateLimitKey`, `auditHistory`.

Implemented booking status values:

- `new`
- `under-review`
- `need-more-information`
- `approved`
- `pending-payment`
- `confirmed`
- `completed`
- `rejected`
- `cancelled`

Implemented payment status values:

- `not-required`
- `pending`
- `link-sent`
- `paid`
- `failed`
- `refunded`
- `cancelled`

Booking reference behavior:

- `bookingReference` is populated on create by `generateBookingReference`.
- Update operations preserve the existing `bookingReference`.
- References use `NEZCC-BKG-YYYY-000001` format.

### `availability-blocks`

Purpose: admin-only blocks for artist/venue unavailability outside booking requests.

Implemented fields:

- `resourceType`
- `artist`
- `venue`
- `startDateTime`
- `endDateTime`
- `reason`
- `notes`
- `isActive`

Validation:

- Exactly one artist OR venue.
- Resource type must match relationship.
- `endDateTime > startDateTime`.
- Overlapping blocks are allowed.

## Globals

### `booking-settings`

Purpose: CMS-editable booking business settings and public policy text.

Implemented fields:

- `bookingEnabled`
- `publicBookingNotice`
- `adminNotificationEmail`
- `bookingSupportEmail`
- `bookingSupportPhone`
- `defaultCurrency`
- `termsAndConditions`
- `privacyNotice`
- `cancellationPolicy`
- `paymentRefundPolicy`
- `approvalDisclaimer`
- `policyVersion`
- `policyDate`

Public reads must expose only fields needed by public pages/forms.

### `booking-reference-counters`

Purpose: hidden internal counter collection for atomic booking reference generation.

Implemented fields:

- `key`
- `year`
- `sequence`

Behavior:

- Hidden from normal admin navigation.
- Uses Mongo `findOneAndUpdate` with `$inc`, `upsert: true`, and `returnDocument: 'after'`.
- Current counter key format is `booking-YYYY`.

## Ticket 1 Schema Decisions

- Policy context is stored as embedded snapshots on `booking-requests` with `acceptedTermsSnapshot` and `acceptedPrivacySnapshot`.
- Audit history starts as an embedded `auditHistory` array on `booking-requests`.
- Booking-related collections/globals use the Payload admin group `Bookings`.
- Initial indexes are set on slugs, booking reference, booking type/status fields, payment status, date-time fields, idempotency token, and rate-limit key.

## Ticket 3 Reference Decisions

- Booking references are generated by `apps/web/src/lib/bookings/bookingReferenceService.ts`.
- The hidden `booking-reference-counters` collection stores per-year sequence state.
- The service uses the Mongo adapter's underlying collection with atomic `$inc`.
- `booking-requests` runs reference generation in a `beforeValidate` create hook so the required field is populated before validation.
- `booking-requests` preserves the original reference in a `beforeChange` update hook.
