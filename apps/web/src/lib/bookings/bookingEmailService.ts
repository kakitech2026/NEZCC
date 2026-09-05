type BookingEmailSettings = {
  adminNotificationEmail?: string | null
  bookingSupportEmail?: string | null
}

type BookingEmailPayload = {
  sendEmail?: (args: {
    from?: string
    html?: string
    subject: string
    text?: string
    to: string | string[]
  }) => Promise<unknown>
}

type BookingEmailRecord = {
  adminNotes?: string | null
  bookingReference?: string | null
  bookingStatus?: string | null
  bookingType?: string | null
  email?: string | null
  endDateTime?: string | null
  eventLocation?: string | null
  eventLocationNotes?: string | null
  eventName?: string | null
  eventType?: string | null
  finalPayableAmount?: number | null
  organizationName?: string | null
  paymentLinkReference?: string | null
  paymentStatus?: string | null
  phone?: string | null
  requesterName?: string | null
  startDateTime?: string | null
}

type SendBookingEmailArgs = {
  booking: BookingEmailRecord
  payload: BookingEmailPayload
  settings?: BookingEmailSettings | null
}

type SendStatusEmailArgs = SendBookingEmailArgs & {
  previousBookingStatus?: string | null
  previousPaymentStatus?: string | null
}

const statusLabels: Record<string, string> = {
  approved: 'Approved',
  cancelled: 'Cancelled',
  completed: 'Completed',
  confirmed: 'Confirmed',
  new: 'New',
  'need-more-information': 'Need More Information',
  'pending-payment': 'Pending Payment',
  rejected: 'Rejected',
  'under-review': 'Under Review',
}

const paymentLabels: Record<string, string> = {
  cancelled: 'Cancelled',
  failed: 'Failed',
  'link-sent': 'Link Sent',
  'not-required': 'Not Required',
  paid: 'Paid',
  pending: 'Pending',
  refunded: 'Refunded',
}

const compact = (value?: string | null) => (typeof value === 'string' && value.trim() ? value.trim() : null)

const label = (value: string | null | undefined, labels: Record<string, string>) => {
  const key = compact(value)
  return key ? (labels[key] ?? key) : 'Not set'
}

const resolveFrom = (settings?: BookingEmailSettings | null) =>
  compact(process.env.EMAIL_FROM) ?? compact(settings?.bookingSupportEmail) ?? undefined

const resolveAdminEmail = (settings?: BookingEmailSettings | null) =>
  compact(process.env.EMAIL_TO_ADMIN) ?? compact(settings?.adminNotificationEmail) ?? compact(settings?.bookingSupportEmail)

const formatDateTime = (value?: string | null) => {
  const parsed = value ? new Date(value) : null

  if (!parsed || Number.isNaN(parsed.getTime())) {
    return 'Not set'
  }

  return parsed.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  })
}

const formatCurrency = (value?: number | null) => {
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) {
    return 'Not set'
  }

  return new Intl.NumberFormat('en-IN', {
    currency: 'INR',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(value)
}

const linesToHtml = (lines: string[]) =>
  lines
    .map((line) =>
      line
        ? `<p>${line.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')}</p>`
        : '<br />',
    )
    .join('')

const bookingSummaryLines = (booking: BookingEmailRecord) => [
  `Reference: ${booking.bookingReference ?? 'Not assigned'}`,
  `Booking type: ${label(booking.bookingType, { artist: 'Artist', venue: 'Venue' })}`,
  `Requester: ${booking.requesterName ?? 'Not provided'}`,
  `Organization: ${booking.organizationName ?? 'Not provided'}`,
  `Email: ${booking.email ?? 'Not provided'}`,
  `Phone: ${booking.phone ?? 'Not provided'}`,
  `Event: ${booking.eventName ?? 'Not provided'}`,
  `Event type: ${booking.eventType ?? 'Not provided'}`,
  `Start: ${formatDateTime(booking.startDateTime)}`,
  `End: ${formatDateTime(booking.endDateTime)}`,
  `Location: ${booking.eventLocation ?? booking.eventLocationNotes ?? 'Not provided'}`,
  `Booking status: ${label(booking.bookingStatus, statusLabels)}`,
  `Payment status: ${label(booking.paymentStatus, paymentLabels)}`,
  `Final payable amount: ${formatCurrency(booking.finalPayableAmount)}`,
]

const sendSafely = async ({
  payload,
  taskName,
  ...email
}: {
  from?: string
  html?: string
  payload: BookingEmailPayload
  subject: string
  taskName: string
  text: string
  to: string | string[]
}) => {
  if (typeof payload.sendEmail !== 'function') {
    console.warn(`[booking-email] Skipped ${taskName}: Payload email is not configured.`)
    return false
  }

  try {
    await payload.sendEmail(email)
    return true
  } catch (error) {
    console.error(`[booking-email] Failed ${taskName}.`, error)
    return false
  }
}

export const sendBookingCreationEmails = async ({ booking, payload, settings }: SendBookingEmailArgs) => {
  const from = resolveFrom(settings)
  const requesterEmail = compact(booking.email)
  const adminEmail = resolveAdminEmail(settings)
  const summary = bookingSummaryLines(booking)
  const sends: Promise<boolean>[] = []

  if (requesterEmail) {
    const lines = [
      `Dear ${booking.requesterName ?? 'Requester'},`,
      '',
      'Your booking request has been received by NEZCC.',
      'This booking is not confirmed until NEZCC approves it and any required payment is verified.',
      '',
      ...summary,
    ]

    sends.push(
      sendSafely({
        from,
        html: linesToHtml(lines),
        payload,
        subject: `NEZCC booking request received: ${booking.bookingReference ?? ''}`.trim(),
        taskName: 'requester acknowledgement email',
        text: lines.join('\n'),
        to: requesterEmail,
      }),
    )
  }

  if (adminEmail) {
    const lines = ['A new NEZCC booking request was submitted.', '', ...summary]

    sends.push(
      sendSafely({
        from,
        html: linesToHtml(lines),
        payload,
        subject: `New NEZCC booking request: ${booking.bookingReference ?? 'unassigned'}`,
        taskName: 'admin new booking notification email',
        text: lines.join('\n'),
        to: adminEmail,
      }),
    )
  }

  await Promise.allSettled(sends)
}

export const sendBookingStatusChangeEmail = async ({
  booking,
  payload,
  previousBookingStatus,
  previousPaymentStatus,
  settings,
}: SendStatusEmailArgs) => {
  const requesterEmail = compact(booking.email)

  if (!requesterEmail) {
    return
  }

  const from = resolveFrom(settings)
  const isNeedMoreInformation = booking.bookingStatus === 'need-more-information'
  const lines = [
    `Dear ${booking.requesterName ?? 'Requester'},`,
    '',
    isNeedMoreInformation
      ? 'NEZCC needs more information before continuing with your booking request.'
      : 'There is an update on your NEZCC booking request.',
    '',
    `Reference: ${booking.bookingReference ?? 'Not assigned'}`,
    `Booking status: ${label(previousBookingStatus, statusLabels)} -> ${label(booking.bookingStatus, statusLabels)}`,
    `Payment status: ${label(previousPaymentStatus, paymentLabels)} -> ${label(booking.paymentStatus, paymentLabels)}`,
    `Final payable amount: ${formatCurrency(booking.finalPayableAmount)}`,
  ]

  if (compact(booking.paymentLinkReference)) {
    lines.push(`Payment link/reference: ${booking.paymentLinkReference}`)
  }

  if (compact(booking.adminNotes)) {
    lines.push('', `NEZCC note: ${booking.adminNotes}`)
  }

  await sendSafely({
    from,
    html: linesToHtml(lines),
    payload,
    subject: isNeedMoreInformation
      ? `More information needed for NEZCC booking ${booking.bookingReference ?? ''}`.trim()
      : `NEZCC booking update: ${booking.bookingReference ?? ''}`.trim(),
    taskName: isNeedMoreInformation ? 'need more information email' : 'requester status update email',
    text: lines.join('\n'),
    to: requesterEmail,
  })
}
