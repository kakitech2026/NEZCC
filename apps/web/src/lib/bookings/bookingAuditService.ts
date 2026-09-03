type AuditUser = {
  id?: number | string | null
} | null

type AuditRecord = {
  auditHistory?: AuditEntry[] | null
  bookingStatus?: unknown
  paymentStatus?: unknown
  baseQuoteAmount?: unknown
  additionalCharges?: unknown
  discount?: unknown
  taxAmount?: unknown
  finalPayableAmount?: unknown
  transitionOverride?: unknown
  transitionOverrideReason?: unknown
  warningOverride?: unknown
  warningOverrideReason?: unknown
}

export type AuditEntry = {
  eventType: string
  previousValue?: string | null
  newValue?: string | null
  note?: string | null
  changedBy?: number | string | null
  changedAt: string
}

type BuildAuditHistoryInput = {
  data: AuditRecord
  now?: Date
  operation: 'create' | 'update'
  originalDoc?: AuditRecord | null
  user?: AuditUser
}

const quoteFields = ['baseQuoteAmount', 'additionalCharges', 'discount', 'taxAmount', 'finalPayableAmount'] as const

const serialize = (value: unknown) => {
  if (value === undefined) return null
  if (typeof value === 'string') return value

  return JSON.stringify(value)
}

const valuesDiffer = (previousValue: unknown, newValue: unknown) => serialize(previousValue) !== serialize(newValue)

const changedBy = (user?: AuditUser) => user?.id ?? null

const createEntry = ({
  eventType,
  newValue,
  note,
  now,
  previousValue,
  user,
}: {
  eventType: string
  newValue?: unknown
  note?: string | null
  now: Date
  previousValue?: unknown
  user?: AuditUser
}): AuditEntry => ({
  eventType,
  previousValue: serialize(previousValue),
  newValue: serialize(newValue),
  note: note ?? null,
  changedBy: changedBy(user),
  changedAt: now.toISOString(),
})

export const buildBookingAuditHistory = ({
  data,
  now = new Date(),
  operation,
  originalDoc,
  user,
}: BuildAuditHistoryInput): AuditEntry[] => {
  const existingHistory = operation === 'update' ? (originalDoc?.auditHistory ?? []) : []
  const entries: AuditEntry[] = []

  if (operation === 'create') {
    entries.push(
      createEntry({
        eventType: 'booking-created',
        newValue: {
          bookingStatus: data.bookingStatus,
          paymentStatus: data.paymentStatus,
        },
        now,
        user,
      }),
    )

    return entries
  }

  if (valuesDiffer(originalDoc?.bookingStatus, data.bookingStatus)) {
    entries.push(
      createEntry({
        eventType: 'booking-status-changed',
        previousValue: originalDoc?.bookingStatus,
        newValue: data.bookingStatus,
        now,
        user,
      }),
    )
  }

  if (valuesDiffer(originalDoc?.paymentStatus, data.paymentStatus)) {
    entries.push(
      createEntry({
        eventType: 'payment-status-changed',
        previousValue: originalDoc?.paymentStatus,
        newValue: data.paymentStatus,
        now,
        user,
      }),
    )
  }

  const quoteChanged = quoteFields.some((field) => valuesDiffer(originalDoc?.[field], data[field]))

  if (quoteChanged) {
    entries.push(
      createEntry({
        eventType: 'quote-changed',
        previousValue: Object.fromEntries(quoteFields.map((field) => [field, originalDoc?.[field]])),
        newValue: Object.fromEntries(quoteFields.map((field) => [field, data[field]])),
        now,
        user,
      }),
    )
  }

  if (data.transitionOverride && valuesDiffer(originalDoc?.transitionOverride, data.transitionOverride)) {
    entries.push(
      createEntry({
        eventType: 'transition-override-applied',
        previousValue: originalDoc?.transitionOverride,
        newValue: data.transitionOverride,
        note: typeof data.transitionOverrideReason === 'string' ? data.transitionOverrideReason : null,
        now,
        user,
      }),
    )
  }

  if (data.warningOverride && valuesDiffer(originalDoc?.warningOverride, data.warningOverride)) {
    entries.push(
      createEntry({
        eventType: 'warning-override-applied',
        previousValue: originalDoc?.warningOverride,
        newValue: data.warningOverride,
        note: typeof data.warningOverrideReason === 'string' ? data.warningOverrideReason : null,
        now,
        user,
      }),
    )
  }

  return [...existingHistory, ...entries]
}
