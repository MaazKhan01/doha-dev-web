'use client'

import { useActionState } from 'react'

import { signIn, type SignInState } from '@/app/signin/actions'
import { buttonClass, fieldClass } from '@/components/ui/formStyles'
import { cn } from '@/lib/utils/cn'

const initial: SignInState = { error: null, email: '' }

/** Email + password, checked by the `signIn` server action. */
export function SignInForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(signIn, initial)

  return (
    <form action={action} className="w-full rounded-card bg-white px-6 py-10 sm:px-12 sm:py-12">
      <p className="text-[0.9375rem] font-bold text-flame uppercase">Restricted access</p>
      <h1 className="type-display mt-1.5 text-[clamp(2rem,5vw,2.875rem)]">Sign in</h1>
      <p className="mt-4 text-base leading-normal text-muted">
        This site is not public yet. Sign in with the access details you were given.
      </p>

      <input type="hidden" name="next" value={next} />

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
          // Survives React's post-action form reset, so a wrong password keeps the email.
          defaultValue={state.email}
          placeholder="your@email.com"
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? 'signin-error' : undefined}
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
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? 'signin-error' : undefined}
          className={cn(fieldClass, 'h-13')}
        />
      </div>

      <p id="signin-error" role="alert" className="mt-4 min-h-5 text-sm text-flame">
        {state.error}
      </p>

      <button type="submit" disabled={pending} className={cn(buttonClass, 'mt-2 h-13 w-full')}>
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
