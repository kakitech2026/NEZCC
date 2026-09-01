'use client'

import { FormEvent, useRef, useState } from 'react'

type FormStatus = {
  type: 'idle' | 'success' | 'error'
  message?: string
}

export default function NewsletterSubscribeForm({ privacyNote }: { privacyNote?: string | null }) {
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
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      })
      const result = (await response.json()) as { message?: string }

      if (!response.ok) {
        throw new Error(result.message || 'Unable to subscribe right now.')
      }

      formRef.current?.reset()
      setStatus({ type: 'success', message: result.message })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to subscribe right now.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form ref={formRef} className="flex flex-col gap-stack-sm mt-2" onSubmit={handleSubmit}>
      <label className="font-label-md text-label-md text-on-surface" htmlFor="newsletter-email">
        Email Address
      </label>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          className="flex-grow bg-surface-container-lowest border border-outline rounded p-3 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-container/20 transition-all"
          id="newsletter-email"
          maxLength={254}
          name="email"
          placeholder="enter.your@email.com"
          required
          type="email"
        />
        <button
          className="bg-primary-container text-on-primary hover:bg-primary transition-colors font-label-md text-label-md py-3 px-6 rounded min-w-[140px] flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            {isSubmitting ? 'progress_activity' : 'send'}
          </span>
        </button>
      </div>
      {privacyNote && (
        <p className="font-caption text-caption text-outline mt-1 text-center sm:text-left">{privacyNote}</p>
      )}
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
    </form>
  )
}
