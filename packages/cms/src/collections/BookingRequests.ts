import type { CollectionConfig } from 'payload'
import { buildBookingAuditHistory } from '../bookings/bookingAuditService'
import {
  assertNoDuplicateIdempotencyToken,
  enforceBookingRateLimit,
  normalizeIdempotencyToken,
} from '../bookings/bookingAntiSpamService'
import { analyzeBookingWarnings, validateWarningOverride } from '../bookings/bookingConflictService'
import { sendBookingStatusChangeEmail } from '../bookings/bookingEmailService'
import { generateBookingReference } from '../bookings/bookingReferenceService'
import { buildQuoteMetadata, normalizeBookingWorkflow } from '../bookings/bookingStatusService'

const isAuthenticated = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

export const BookingRequests: CollectionConfig = {
  slug: 'booking-requests',
  labels: {
    singular: 'Booking Request',
    plural: 'Booking Requests',
  },
  admin: {
    useAsTitle: 'bookingReference',
    defaultColumns: [
      'bookingReference',
      'bookingType',
      'requesterName',
      'eventName',
      'startDateTime',
      'bookingStatus',
      'paymentStatus',
      'hasConflict',
    ],
    group: 'Bookings',
    description: 'Unified admin inbox for artist and venue booking requests.',
  },
  access: {
    create: () => false,
    read: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: {
    beforeValidate: [
      async ({ data, operation, req }) => {
        if (operation !== 'create' || !data) {
          return data
        }

        const idempotencyToken =
          typeof data.idempotencyToken === 'string' && data.idempotencyToken.trim()
            ? normalizeIdempotencyToken(data.idempotencyToken)
            : null

        await assertNoDuplicateIdempotencyToken({
          idempotencyToken,
          payload: req.payload,
        })
        await enforceBookingRateLimit({
          payload: req.payload,
          rateLimitKey: typeof data.rateLimitKey === 'string' ? data.rateLimitKey : null,
        })

        return {
          ...data,
          idempotencyToken,
          bookingReference: await generateBookingReference(req),
        }
      },
    ],
    beforeChange: [
      async ({ data, operation, originalDoc, req }) => {
        const workflow = normalizeBookingWorkflow({
          additionalCharges: data.additionalCharges,
          baseQuoteAmount: data.baseQuoteAmount,
          bookingStatus: data.bookingStatus,
          discount: data.discount,
          originalBookingStatus: originalDoc?.bookingStatus,
          originalPaymentLinkReference: originalDoc?.paymentLinkReference,
          paymentLinkReference: data.paymentLinkReference,
          paymentStatus: data.paymentStatus,
          taxAmount: data.taxAmount,
          transitionOverride: data.transitionOverride,
          transitionOverrideReason: data.transitionOverrideReason,
        })
        const bookingForAnalysis: Record<string, unknown> = {
          ...originalDoc,
          ...data,
          ...workflow,
        }
        const nextData: Record<string, unknown> = {
          ...data,
          ...workflow,
        }
        const warnings = await analyzeBookingWarnings({
          booking: bookingForAnalysis,
          payload: req.payload,
        })
        const isNewWarningOverride = validateWarningOverride({
          originalWarningOverride: originalDoc?.warningOverride,
          warningOverride: Boolean(bookingForAnalysis.warningOverride),
          warningOverrideReason:
            typeof bookingForAnalysis.warningOverrideReason === 'string' ? bookingForAnalysis.warningOverrideReason : null,
        })

        Object.assign(nextData, warnings)

        Object.assign(
          nextData,
          buildQuoteMetadata({
            additionalCharges: data.additionalCharges,
            baseQuoteAmount: data.baseQuoteAmount,
            discount: data.discount,
            originalAdditionalCharges: originalDoc?.additionalCharges,
            originalBaseQuoteAmount: originalDoc?.baseQuoteAmount,
            originalDiscount: originalDoc?.discount,
            originalQuoteCreatedAt: originalDoc?.quoteCreatedAt,
            originalQuotedBy: originalDoc?.quotedBy,
            originalTaxAmount: originalDoc?.taxAmount,
            quoteCreatedAt: data.quoteCreatedAt,
            quotedBy: data.quotedBy,
            taxAmount: data.taxAmount,
            userId: req.user?.id,
          }),
        )

        if (isNewWarningOverride) {
          nextData.warningOverriddenBy = req.user?.id ?? null
          nextData.warningOverriddenAt = new Date().toISOString()
        }

        nextData.auditHistory = buildBookingAuditHistory({
          data: {
            ...bookingForAnalysis,
            ...warnings,
          },
          operation,
          originalDoc,
          user: req.user,
        })

        if (operation === 'update' && originalDoc?.bookingReference) {
          return {
            ...nextData,
            bookingReference: originalDoc.bookingReference,
          }
        }

        return nextData
      },
    ],
    afterChange: [
      async ({ doc, operation, previousDoc, req }) => {
        if (operation !== 'update') {
          return doc
        }

        const bookingStatusChanged = doc.bookingStatus !== previousDoc?.bookingStatus
        const paymentStatusChanged = doc.paymentStatus !== previousDoc?.paymentStatus

        if (!bookingStatusChanged && !paymentStatusChanged) {
          return doc
        }

        const settings = await req.payload.findGlobal({
          slug: 'booking-settings',
          overrideAccess: true,
        })

        await sendBookingStatusChangeEmail({
          booking: doc,
          payload: req.payload,
          previousBookingStatus: previousDoc?.bookingStatus,
          previousPaymentStatus: previousDoc?.paymentStatus,
          settings,
        })

        return doc
      },
    ],
  },
  fields: [
    {
      name: 'bookingReference',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        readOnly: true,
        description: 'Generated server-side by the booking reference service.',
      },
    },
    {
      name: 'bookingType',
      type: 'select',
      required: true,
      index: true,
      options: [
        { label: 'Artist', value: 'artist' },
        { label: 'Venue', value: 'venue' },
      ],
    },
    {
      name: 'artist',
      type: 'relationship',
      relationTo: 'artists',
      admin: {
        condition: (_, siblingData) => siblingData?.bookingType === 'artist',
      },
    },
    {
      name: 'venue',
      type: 'relationship',
      relationTo: 'venues',
      admin: {
        condition: (_, siblingData) => siblingData?.bookingType === 'venue',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Requester',
          fields: [
            { name: 'requesterName', type: 'text', required: true },
            { name: 'organizationName', type: 'text' },
            { name: 'email', type: 'email', required: true },
            { name: 'phone', type: 'text', required: true },
          ],
        },
        {
          label: 'Event',
          fields: [
            { name: 'eventName', type: 'text', required: true },
            { name: 'eventType', type: 'text', required: true },
            {
              name: 'eventLocation',
              type: 'textarea',
              admin: {
                description: 'Required for artist bookings. Venue bookings use the selected venue as the event location.',
              },
            },
            {
              name: 'eventLocationNotes',
              type: 'textarea',
              admin: {
                description: 'Optional notes for venue bookings.',
              },
            },
            {
              name: 'startDateTime',
              type: 'date',
              required: true,
              index: true,
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime',
                },
              },
            },
            {
              name: 'endDateTime',
              type: 'date',
              required: true,
              index: true,
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime',
                },
              },
            },
            {
              name: 'timeType',
              type: 'select',
              required: true,
              defaultValue: 'exact',
              options: [
                { label: 'Exact', value: 'exact' },
                { label: 'Flexible', value: 'flexible' },
                { label: 'Full Day', value: 'full-day' },
              ],
            },
            { name: 'expectedAudienceSize', type: 'number', min: 0 },
            { name: 'budgetAmount', type: 'number', min: 0 },
            { name: 'budgetNotes', type: 'textarea' },
            { name: 'specialRequirements', type: 'textarea' },
            { name: 'message', type: 'textarea' },
          ],
        },
        {
          label: 'Consent',
          fields: [
            { name: 'termsAccepted', type: 'checkbox', defaultValue: false, admin: { readOnly: true } },
            { name: 'termsAcceptedAt', type: 'date', admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } } },
            { name: 'privacyAccepted', type: 'checkbox', defaultValue: false, admin: { readOnly: true } },
            { name: 'privacyAcceptedAt', type: 'date', admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } } },
            { name: 'acceptedPolicyVersion', type: 'text', admin: { readOnly: true } },
            { name: 'acceptedPolicyDate', type: 'date', admin: { readOnly: true, date: { pickerAppearance: 'dayOnly' } } },
            { name: 'acceptedTermsSnapshot', type: 'textarea', admin: { readOnly: true } },
            { name: 'acceptedPrivacySnapshot', type: 'textarea', admin: { readOnly: true } },
          ],
        },
        {
          label: 'Workflow',
          fields: [
            {
              name: 'bookingStatus',
              type: 'select',
              required: true,
              defaultValue: 'new',
              index: true,
              options: [
                { label: 'New', value: 'new' },
                { label: 'Under Review', value: 'under-review' },
                { label: 'Need More Information', value: 'need-more-information' },
                { label: 'Approved', value: 'approved' },
                { label: 'Pending Payment', value: 'pending-payment' },
                { label: 'Confirmed', value: 'confirmed' },
                { label: 'Completed', value: 'completed' },
                { label: 'Rejected', value: 'rejected' },
                { label: 'Cancelled', value: 'cancelled' },
              ],
            },
            {
              name: 'paymentStatus',
              type: 'select',
              required: true,
              defaultValue: 'not-required',
              index: true,
              options: [
                { label: 'Not Required', value: 'not-required' },
                { label: 'Pending', value: 'pending' },
                { label: 'Link Sent', value: 'link-sent' },
                { label: 'Paid', value: 'paid' },
                { label: 'Failed', value: 'failed' },
                { label: 'Refunded', value: 'refunded' },
                { label: 'Cancelled', value: 'cancelled' },
              ],
            },
            { name: 'adminNotes', type: 'textarea' },
            {
              name: 'transitionOverride',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Deliberately allow an unusual status transition. Must include a reason.',
              },
            },
            {
              name: 'transitionOverrideReason',
              type: 'textarea',
              admin: {
                condition: (_, siblingData) => Boolean(siblingData?.transitionOverride),
              },
            },
          ],
        },
        {
          label: 'Quote & Payment',
          fields: [
            { name: 'baseQuoteAmount', type: 'number', min: 0, defaultValue: 0 },
            { name: 'additionalCharges', type: 'number', min: 0, defaultValue: 0 },
            { name: 'discount', type: 'number', min: 0, defaultValue: 0 },
            { name: 'taxAmount', type: 'number', min: 0, defaultValue: 0 },
            {
              name: 'finalPayableAmount',
              type: 'number',
              min: 0,
              defaultValue: 0,
              admin: {
                readOnly: true,
                description: 'Calculated server-side in the quote service.',
              },
            },
            { name: 'quoteNotes', type: 'textarea' },
            { name: 'quoteValidUntil', type: 'date', admin: { date: { pickerAppearance: 'dayOnly' } } },
            { name: 'quoteCreatedAt', type: 'date', admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } } },
            { name: 'quotedBy', type: 'relationship', relationTo: 'users', admin: { readOnly: true } },
            { name: 'paymentGateway', type: 'text' },
            { name: 'paymentLinkReference', type: 'text', label: 'Payment Link/Reference' },
            { name: 'paymentAmountReceived', type: 'number', min: 0 },
            { name: 'paymentReceivedAt', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
            { name: 'manualPaymentConfirmationNote', type: 'textarea' },
          ],
        },
        {
          label: 'Warnings',
          fields: [
            { name: 'hasConflict', type: 'checkbox', defaultValue: false, admin: { readOnly: true } },
            { name: 'conflictType', type: 'text', admin: { readOnly: true } },
            {
              name: 'conflictingBookings',
              type: 'relationship',
              relationTo: 'booking-requests',
              hasMany: true,
              admin: { readOnly: true },
            },
            {
              name: 'conflictingBookingReferences',
              type: 'array',
              admin: { readOnly: true },
              fields: [{ name: 'reference', type: 'text', required: true }],
            },
            { name: 'capacityWarning', type: 'checkbox', defaultValue: false, admin: { readOnly: true } },
            { name: 'availabilityBlockWarning', type: 'checkbox', defaultValue: false, admin: { readOnly: true } },
            {
              name: 'availabilityBlocks',
              type: 'relationship',
              relationTo: 'availability-blocks',
              hasMany: true,
              admin: { readOnly: true },
            },
            {
              name: 'availabilityBlockReasons',
              type: 'array',
              admin: { readOnly: true },
              fields: [{ name: 'reason', type: 'text', required: true }],
            },
            { name: 'warningNotes', type: 'textarea', admin: { readOnly: true } },
            { name: 'warningOverride', type: 'checkbox', defaultValue: false },
            { name: 'warningOverrideReason', type: 'textarea' },
            { name: 'warningOverriddenBy', type: 'relationship', relationTo: 'users', admin: { readOnly: true } },
            { name: 'warningOverriddenAt', type: 'date', admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } } },
          ],
        },
        {
          label: 'System',
          fields: [
            { name: 'sourcePage', type: 'text', admin: { readOnly: true } },
            { name: 'idempotencyToken', type: 'text', index: true, admin: { hidden: true } },
            { name: 'rateLimitKey', type: 'text', index: true, admin: { hidden: true } },
            {
              name: 'auditHistory',
              type: 'array',
              admin: {
                readOnly: true,
              },
              fields: [
                { name: 'eventType', type: 'text', required: true },
                { name: 'previousValue', type: 'textarea' },
                { name: 'newValue', type: 'textarea' },
                { name: 'note', type: 'textarea' },
                { name: 'changedBy', type: 'relationship', relationTo: 'users' },
                { name: 'changedAt', type: 'date', required: true, admin: { date: { pickerAppearance: 'dayAndTime' } } },
              ],
            },
          ],
        },
      ],
    },
  ],
}
