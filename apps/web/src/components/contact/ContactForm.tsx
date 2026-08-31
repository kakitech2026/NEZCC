'use client'

import { FormEvent, useRef, useState } from 'react'

type FormStatus = {
  type: 'idle' | 'success' | 'error'
  message?: string
}

const fieldClassName =
  'w-full bg-surface border border-outline rounded p-3 text-body-md focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-200 ease-out'

export default function ContactForm() {
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      })
      const result = (await response.json()) as { message?: string }

      if (!response.ok) {
        throw new Error(result.message || 'Unable to send your message.')
      }

      formRef.current?.reset()
      setStatus({ type: 'success', message: result.message })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to send your message.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="font-label-md text-label-md text-on-surface mb-2" htmlFor="name">
            Full Name
          </label>
          <input className={fieldClassName} id="name" name="name" placeholder="Enter your full name" required minLength={2} maxLength={120} type="text" />
        </div>
        <div className="flex flex-col">
          <label className="font-label-md text-label-md text-on-surface mb-2" htmlFor="email">
            Email Address
          </label>
          <input className={fieldClassName} id="email" name="email" placeholder="Enter your email address" required maxLength={254} type="email" />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="font-label-md text-label-md text-on-surface mb-2" htmlFor="subject">
          Subject
        </label>
        <input className={fieldClassName} id="subject" name="subject" placeholder="What is this regarding?" required minLength={3} maxLength={180} type="text" />
      </div>

      <div className="flex flex-col">
        <label className="font-label-md text-label-md text-on-surface mb-2" htmlFor="message">
          Message
        </label>
        <textarea className={`${fieldClassName} resize-y`} id="message" name="message" placeholder="Write your message here..." required minLength={10} maxLength={5000} rows={5} />
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

      <button
        className="bg-primary-container text-on-primary font-label-md text-label-md px-6 py-3 rounded border-2 border-transparent hover:border-primary-container focus:border-primary-container focus:ring-2 focus:ring-primary-container focus:outline-none active:scale-[0.97] transition-all duration-150 ease-out min-h-[44px] flex items-center justify-center w-full md:w-auto disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        disabled={isSubmitting}
      >
        <span className="material-symbols-outlined mr-2" aria-hidden="true">
          {isSubmitting ? 'progress_activity' : 'send'}
        </span>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
