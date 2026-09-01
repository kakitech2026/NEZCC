'use client'

import { FormEvent, useRef, useState } from 'react'

type FormStatus = {
  type: 'idle' | 'success' | 'error'
  message?: string
}

const fieldClassName =
  'bg-surface-container-lowest border border-outline-variant rounded-DEFAULT px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all duration-200'

export default function FeedbackForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: 'idle' })

    const formData = new FormData(event.currentTarget)
    const submission = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      })
      const result = (await response.json()) as { message?: string }

      if (!response.ok) {
        throw new Error(result.message || 'Unable to submit feedback.')
      }

      formRef.current?.reset()
      setStatus({ type: 'success', message: result.message })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to submit feedback.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form ref={formRef} className="flex flex-col gap-stack-md" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        <div className="flex flex-col gap-unit">
          <label className="font-label-md text-label-md text-on-surface" htmlFor="feedback-name">
            Full Name <span className="text-error">*</span>
          </label>
          <input className={fieldClassName} id="feedback-name" maxLength={120} minLength={2} name="name" required type="text" />
        </div>
        <div className="flex flex-col gap-unit">
          <label className="font-label-md text-label-md text-on-surface" htmlFor="feedback-email">
            Email Address <span className="text-error">*</span>
          </label>
          <input className={fieldClassName} id="feedback-email" maxLength={254} name="email" required type="email" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        <div className="flex flex-col gap-unit">
          <label className="font-label-md text-label-md text-on-surface" htmlFor="feedback-phone">
            Phone Number
          </label>
          <input className={fieldClassName} id="feedback-phone" maxLength={40} name="phone" type="tel" />
        </div>
        <div className="flex flex-col gap-unit">
          <label className="font-label-md text-label-md text-on-surface" htmlFor="feedback-type">
            Subject of Feedback <span className="text-error">*</span>
          </label>
          <div className="relative">
            <select className={`${fieldClassName} w-full appearance-none pr-10`} defaultValue="" id="feedback-type" name="feedbackType" required>
              <option disabled value="">Select an option</option>
              <option value="general">General Suggestion</option>
              <option value="grievance">Grievance</option>
              <option value="website">Website Experience</option>
              <option value="program">Cultural Program Feedback</option>
              <option value="other">Other</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" aria-hidden="true">
              arrow_drop_down
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-unit">
        <label className="font-label-md text-label-md text-on-surface" htmlFor="feedback-subject">
          Short Subject <span className="text-error">*</span>
        </label>
        <input className={fieldClassName} id="feedback-subject" maxLength={180} minLength={3} name="subject" required type="text" />
      </div>

      <div className="flex flex-col gap-unit">
        <label className="font-label-md text-label-md text-on-surface" htmlFor="feedback-message">
          Detailed Message/Feedback <span className="text-error">*</span>
        </label>
        <textarea className={`${fieldClassName} resize-y`} id="feedback-message" maxLength={5000} minLength={10} name="message" required rows={6} />
      </div>

      {status.type !== 'idle' && (
        <div
          className={`rounded border px-4 py-3 text-sm ${
            status.type === 'success'
              ? 'border-green-300 bg-green-50 text-green-800'
              : 'border-red-300 bg-red-50 text-red-800'
          }`}
          role={status.type === 'error' ? 'alert' : 'status'}
          aria-live="polite"
        >
          {status.message}
        </div>
      )}

      <div className="pt-stack-sm flex justify-end">
        <button
          className="bg-primary-container hover:bg-primary-fixed-variant text-on-primary font-label-md text-label-md font-bold py-3 px-8 rounded-DEFAULT transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-container flex items-center gap-2 min-h-[44px] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          <span className="material-symbols-outlined text-sm" aria-hidden="true">
            {isSubmitting ? 'progress_activity' : 'send'}
          </span>
        </button>
      </div>
    </form>
  )
}
