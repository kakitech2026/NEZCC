'use client'

import { FormEvent, useRef, useState } from 'react'
import type { PublicBookingSettings } from '@nezcc/cms/bookings/bookingSettingsService'
import { buildBookingSubmission, createBookingIdempotencyToken, type BookingFormResource } from '@nezcc/cms/bookings/bookingFormService'
import { BookingConsentFields } from './BookingConsentFields'

type FormStatus = {
  bookingReference?: string
  message?: string
  type: 'idle' | 'success' | 'error'
}

type BookingRequestFormProps = {
  resource: BookingFormResource & {
    displayName: string
  }
  settings: PublicBookingSettings
}

const fieldClassName =
  'w-full rounded border border-outline-variant bg-white px-3 py-2 font-body-md text-body-md text-on-surface outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20'

export function BookingRequestForm({ resource, settings }: BookingRequestFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [idempotencyToken, setIdempotencyToken] = useState(createBookingIdempotencyToken)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: 'idle' })

    try {
      const formData = new FormData(event.currentTarget)
      const submission = buildBookingSubmission({
        formData,
        idempotencyToken,
        resource,
      })
      const response = await fetch('/api/bookings', {
        body: JSON.stringify(submission),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
      const result = (await response.json()) as {
        bookingReference?: string
        message?: string
        status?: string
      }

      if (!response.ok) {
        throw new Error(result.message || 'Unable to submit booking request.')
      }

      formRef.current?.reset()
      setIdempotencyToken(createBookingIdempotencyToken())
      setStatus({
        bookingReference: result.bookingReference,
        message: result.message || settings.publicBookingNotice,
        type: 'success',
      })
    } catch (error) {
      setStatus({
        message: error instanceof Error ? error.message : 'Unable to submit booking request.',
        type: 'error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-stack-md" onSubmit={handleSubmit} ref={formRef}>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="rounded border border-outline-variant bg-surface-container-low p-stack-sm">
        <p className="font-label-md text-label-md text-on-surface">{resource.bookingType === 'artist' ? 'Selected Artist' : 'Selected Venue'}</p>
        <p className="font-body-md text-body-md text-on-surface-variant">{resource.displayName}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
        <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface">
          Full Name <span className="sr-only">required</span>
          <input className={fieldClassName} maxLength={200} minLength={2} name="requesterName" placeholder="Enter your full name" required type="text" />
        </label>
        <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface">
          Organization
          <input className={fieldClassName} maxLength={200} name="organizationName" placeholder="Optional" type="text" />
        </label>
        <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface">
          Email Address <span className="sr-only">required</span>
          <input className={fieldClassName} maxLength={200} name="email" placeholder="name@example.com" required type="email" />
        </label>
        <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface">
          Phone Number <span className="sr-only">required</span>
          <input className={fieldClassName} maxLength={40} name="phone" placeholder="+91 9876543210" required type="tel" />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
        <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface">
          Event Name <span className="sr-only">required</span>
          <input className={fieldClassName} maxLength={200} minLength={2} name="eventName" required type="text" />
        </label>
        <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface">
          Event Type <span className="sr-only">required</span>
          <input className={fieldClassName} maxLength={200} name="eventType" placeholder="Festival, workshop, exhibition" required type="text" />
        </label>
      </div>

      {resource.bookingType === 'artist' ? (
        <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface">
          Event Location <span className="sr-only">required</span>
          <textarea className={`${fieldClassName} resize-y`} maxLength={3000} minLength={3} name="eventLocation" placeholder="Venue/address where the artist would perform" required rows={3} />
        </label>
      ) : (
        <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface">
          Event Location Notes
          <textarea className={`${fieldClassName} resize-y`} maxLength={3000} name="eventLocationNotes" placeholder="Optional setup, hall, entry, or layout notes" rows={3} />
        </label>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-md">
        <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface">
          Start Date and Time <span className="sr-only">required</span>
          <input className={fieldClassName} name="startDateTime" required type="datetime-local" />
        </label>
        <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface">
          End Date and Time <span className="sr-only">required</span>
          <input className={fieldClassName} name="endDateTime" required type="datetime-local" />
        </label>
        <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface">
          Time Type <span className="sr-only">required</span>
          <select className={fieldClassName} defaultValue="exact" name="timeType" required>
            <option value="exact">Exact</option>
            <option value="flexible">Flexible</option>
            <option value="full-day">Full day</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
        <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface">
          Expected Audience Size
          <input className={fieldClassName} min="0" name="expectedAudienceSize" placeholder="Optional" type="number" />
        </label>
        <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface">
          Budget Amount ({settings.defaultCurrency})
          <input className={fieldClassName} min="0" name="budgetAmount" placeholder="Optional" type="number" />
        </label>
      </div>

      <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface">
        Budget Notes
        <textarea className={`${fieldClassName} resize-y`} maxLength={3000} name="budgetNotes" placeholder="Optional" rows={2} />
      </label>

      <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface">
        Special Requirements
        <textarea className={`${fieldClassName} resize-y`} maxLength={3000} name="specialRequirements" placeholder="Technical, travel, accessibility, staging, or seating requirements" rows={3} />
      </label>

      <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface">
        Message
        <textarea className={`${fieldClassName} resize-y`} maxLength={3000} name="message" placeholder="Anything else NEZCC should know" rows={4} />
      </label>

      <BookingConsentFields settings={settings} />

      {status.type !== 'idle' && (
        <div
          className={`rounded border px-4 py-3 text-sm ${
            status.type === 'success' ? 'border-green-300 bg-green-50 text-green-800' : 'border-red-300 bg-red-50 text-red-800'
          }`}
          role={status.type === 'error' ? 'alert' : 'status'}
          aria-live="polite"
        >
          {status.bookingReference && <p className="font-label-md text-label-md">Reference: {status.bookingReference}</p>}
          {status.message && <p className={status.bookingReference ? 'mt-1' : ''}>{status.message}</p>}
        </div>
      )}

      <button
        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded bg-primary px-6 py-3 font-label-md text-label-md text-white transition-colors hover:bg-[#147fba] disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
        disabled={isSubmitting}
        type="submit"
      >
        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">{isSubmitting ? 'progress_activity' : 'send'}</span>
        {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
      </button>
    </form>
  )
}
