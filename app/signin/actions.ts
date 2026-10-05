'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { PREVIEW_CREDENTIALS } from '@/lib/auth/credentials'
import { AUTH_COOKIE, AUTH_MAX_AGE, AUTH_TOKEN, safeNext } from '@/lib/auth/session'

/** `email` is echoed back so the field keeps it: React resets a form after its action runs. */
export type SignInState = { error: string | null; email: string }

/** Checks the preview credentials on the server, sets the session cookie, and returns to `next`. */
export async function signIn(_previous: SignInState, form: FormData): Promise<SignInState> {
  const email = String(form.get('email') ?? '').trim().toLowerCase()
  const password = String(form.get('password') ?? '')

  if (email !== PREVIEW_CREDENTIALS.email || password !== PREVIEW_CREDENTIALS.password) {
    return { error: 'That email and password don’t match. Please try again.', email }
  }

  ;(await cookies()).set(AUTH_COOKIE, AUTH_TOKEN, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: AUTH_MAX_AGE,
  })

  redirect(safeNext(form.get('next')))
}
