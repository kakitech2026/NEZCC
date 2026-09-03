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

## Ticket 1 Schema Decisions

- Policy context is stored as embedded snapshots on `booking-requests` with `acceptedTermsSnapshot` and `acceptedPrivacySnapshot`.
- Audit history starts as an embedded `auditHistory` array on `booking-requests`.
- Booking reference counter implementation is deferred to Ticket 3.
- Booking-related collections/globals use the Payload admin group `Bookings`.
- Initial indexes are set on slugs, booking reference, booking type/status fields, payment status, date-time fields, idempotency token, and rate-limit key.
