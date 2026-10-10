export type BookingStatus =
  | 'new'
  | 'under-review'
  | 'need-more-information'
  | 'approved'
  | 'pending-payment'
  | 'confirmed'
  | 'completed'
  | 'rejected'
  | 'cancelled'

export type PaymentStatus = 'not-required' | 'pending' | 'link-sent' | 'paid' | 'failed' | 'refunded' | 'cancelled'

export type QuoteInput = {
  additionalCharges?: number | null
  baseQuoteAmount?: number | null
  discount?: number | null
  taxAmount?: number | null
}

export type BookingWorkflowInput = QuoteInput & {
  bookingStatus?: BookingStatus | null
  originalBookingStatus?: BookingStatus | null
  originalPaymentLinkReference?: string | null
  paymentLinkReference?: string | null
  paymentStatus?: PaymentStatus | null
  transitionOverride?: boolean | null
  transitionOverrideReason?: string | null
}

export type BookingWorkflowResult = Required<QuoteInput> & {
  bookingStatus: BookingStatus
  finalPayableAmount: number
  paymentStatus: PaymentStatus
}

export type QuoteMetadataInput = QuoteInput & {
  originalAdditionalCharges?: number | null
  originalBaseQuoteAmount?: number | null
  originalDiscount?: number | null
  originalQuoteCreatedAt?: string | null
  originalQuotedBy?: number | string | null
  originalTaxAmount?: number | null
  quoteCreatedAt?: string | null
  quotedBy?: number | string | null
  userId?: number | string | null
}

export type QuoteMetadataResult = {
  quoteCreatedAt?: string | null
  quotedBy?: number | string | null
}

const allowedTransitions: Record<BookingStatus, BookingStatus[]> = {
  approved: ['pending-payment', 'rejected', 'cancelled'],
  cancelled: [],
  completed: [],
  confirmed: ['completed', 'cancelled'],
  new: ['under-review', 'rejected'],
  'need-more-information': ['under-review', 'rejected', 'cancelled'],
  'pending-payment': ['confirmed', 'cancelled'],
  rejected: [],
  'under-review': ['need-more-information', 'approved', 'rejected'],
}

const normalizeMoney = (value: number | null | undefined, field: string) => {
  if (value === null || value === undefined) return 0

  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${field} must be a non-negative number`)
  }

  return value
}

export const calculateFinalPayableAmount = (quote: QuoteInput) => {
  const baseQuoteAmount = normalizeMoney(quote.baseQuoteAmount, 'baseQuoteAmount')
  const additionalCharges = normalizeMoney(quote.additionalCharges, 'additionalCharges')
  const discount = normalizeMoney(quote.discount, 'discount')
  const taxAmount = normalizeMoney(quote.taxAmount, 'taxAmount')
  const finalPayableAmount = baseQuoteAmount + additionalCharges + taxAmount - discount

  if (finalPayableAmount < 0) {
    throw new Error('finalPayableAmount cannot be negative')
  }

  return {
    additionalCharges,
    baseQuoteAmount,
    discount,
    finalPayableAmount,
    taxAmount,
  }
}

export const assertBookingTransitionAllowed = ({
  from,
  override,
  reason,
  to,
}: {
  from?: BookingStatus | null
  override?: boolean | null
  reason?: string | null
  to: BookingStatus
}) => {
  if (!from || from === to) {
    return
  }

  if (override) {
    if (!reason?.trim()) {
      throw new Error('transitionOverrideReason is required for unusual bookingStatus transitions')
    }

    return
  }

  if (!allowedTransitions[from]?.includes(to)) {
    throw new Error(`bookingStatus transition from ${from} to ${to} is not allowed`)
  }
}

export const normalizeBookingWorkflow = (input: BookingWorkflowInput): BookingWorkflowResult => {
  const quote = calculateFinalPayableAmount(input)
  let bookingStatus = input.bookingStatus ?? input.originalBookingStatus ?? 'new'
  let paymentStatus = input.paymentStatus ?? 'not-required'

  assertBookingTransitionAllowed({
    from: input.originalBookingStatus,
    override: input.transitionOverride,
    reason: input.transitionOverrideReason,
    to: bookingStatus,
  })

  if (bookingStatus === 'approved') {
    if (quote.finalPayableAmount > 0) {
      bookingStatus = 'pending-payment'
      paymentStatus = 'pending'
    } else {
      bookingStatus = 'confirmed'
      paymentStatus = 'not-required'
    }
  }

  const hasNewPaymentLink =
    typeof input.paymentLinkReference === 'string' &&
    input.paymentLinkReference.trim().length > 0 &&
    input.paymentLinkReference !== input.originalPaymentLinkReference

  if (hasNewPaymentLink && paymentStatus !== 'paid') {
    paymentStatus = 'link-sent'
  }

  if (bookingStatus === 'confirmed' && paymentStatus !== 'paid' && paymentStatus !== 'not-required') {
    throw new Error('confirmed bookings require paid or not-required payment status')
  }

  return {
    ...quote,
    bookingStatus,
    paymentStatus,
  }
}

export const buildQuoteMetadata = (input: QuoteMetadataInput, now = new Date()): QuoteMetadataResult => {
  const quoteChanged =
    input.baseQuoteAmount !== input.originalBaseQuoteAmount ||
    input.additionalCharges !== input.originalAdditionalCharges ||
    input.discount !== input.originalDiscount ||
    input.taxAmount !== input.originalTaxAmount

  if (!quoteChanged) {
    return {
      quoteCreatedAt: input.quoteCreatedAt ?? input.originalQuoteCreatedAt ?? null,
      quotedBy: input.quotedBy ?? input.originalQuotedBy ?? null,
    }
  }

  return {
    quoteCreatedAt: input.quoteCreatedAt || input.originalQuoteCreatedAt || now.toISOString(),
    quotedBy: input.quotedBy || input.originalQuotedBy || input.userId || null,
  }
}
