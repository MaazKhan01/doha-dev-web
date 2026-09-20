'use client'

import { useState, type FormEvent } from 'react'

import type { FooterSection } from '@/types/content'

type Status = 'idle' | 'submitting' | 'done' | 'error'

/**
 * Newsletter capture. The submit handler is a stub until the CMS / ESP
 * endpoint is chosen — it validates and reports state, then stops.
 */
export function NewsletterForm({ copy }: { copy: FooterSection['newsletter'] }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')

    // TODO: POST to /api/newsletter once the provider is confirmed.
    setStatus('done')
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <label htmlFor="newsletter-email" className="text-sm text-sand/90">
        {copy.label}
      </label>

      <div className="flex w-full max-w-sm items-center gap-2">
        {/* <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={copy.placeholder}
          className="h-9 w-full min-w-0 rounded-full bg-sand/15 px-4 text-sm text-sand placeholder:text-sand/50 focus:bg-sand/25"
        /> */}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="h-9 shrink-0 rounded-md bg-sand px-4 text-sm text-ink transition-colors duration-300 hover:bg-flame hover:text-sand disabled:opacity-60"
        >
          {copy.cta}
        </button>
      </div>

      <p aria-live="polite" className="min-h-5 text-xs text-sand/70">
        {status === 'done' ? `${copy.cta} ✓` : null}
      </p>
    </form>
  )
}
