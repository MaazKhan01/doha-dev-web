'use client'

import { useState, type FormEvent } from 'react'

import { buttonClass, fieldClass } from '@/components/ui/formStyles'
import { cn } from '@/lib/utils/cn'

/**
 * Email + password, checked by POST /api/auth/signin. Sent as JSON from the
 * browser — not as a server action, whose multipart body the site's WAF
 * blocks (see that route).
 */
export function SignInForm({ next }: { next: string }) {
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setPending(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.get('email'), password: form.get('password'), next }),
      })
      const result = (await response.json().catch(() => null)) as { ok?: boolean; next?: string; error?: string } | null

      if (response.ok && result?.ok) {
        // A full navigation, so the proxy sees the new cookie on the next request.
        window.location.assign(result.next ?? '/')
        return
      }
      setError(result?.error ?? `Sign-in failed (${response.status}). Please try again.`)
    } catch {
      setError('Could not reach the server. Check your connection and try again.')
    }
    setPending(false)
  }

  return (
    <form onSubmit={onSubmit} className="w-full rounded-card bg-white px-6 py-10 sm:px-12 sm:py-12">
      <p className="text-[0.9375rem] font-bold text-flame uppercase">Restricted access</p>
      <h1 className="type-display mt-1.5 text-[clamp(2rem,5vw,2.875rem)]">Sign in</h1>
      <p className="mt-4 text-base leading-normal text-muted">
        This site is not public yet. Sign in with the access details you were given.
      </p>

      <div className="mt-8 flex flex-col gap-2">
        <label htmlFor="signin-email" className="text-[0.8125rem] font-bold uppercase">
          Email
        </label>
        <input
          id="signin-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          autoFocus
          placeholder="your@email.com"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? 'signin-error' : undefined}
          className={cn(fieldClass, 'h-13')}
        />
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="signin-password" className="text-[0.8125rem] font-bold uppercase">
          Password
        </label>
        <input
          id="signin-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? 'signin-error' : undefined}
          className={cn(fieldClass, 'h-13')}
        />
      </div>

      <p id="signin-error" role="alert" className="mt-4 min-h-5 text-sm text-flame">
        {error}
      </p>

      <button type="submit" disabled={pending} className={cn(buttonClass, 'mt-2 h-13 w-full')}>
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
