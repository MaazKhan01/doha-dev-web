import { NextResponse, type NextRequest } from 'next/server'

import { PREVIEW_PASSWORD } from '@/lib/auth/credentials'
import { AUTH_COOKIE, AUTH_MAX_AGE, AUTH_TOKEN, safeNext } from '@/lib/auth/session'

/** Never cached: every sign-in attempt must reach the check. */
export const dynamic = 'force-dynamic'

/**
 * Checks the shared preview password and sets the session cookie.
 *
 * Takes JSON rather than a server action on purpose: server actions post
 * `multipart/form-data`, and the Application Gateway WAF in front of the site
 * rejects every multipart body ("Blocked by the WAF Policy", 403). JSON passes.
 * Lives under /api, which `proxy.ts` leaves open, so it is reachable signed out.
 */
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { password?: unknown; next?: unknown } | null

  if (String(body?.password ?? '') !== PREVIEW_PASSWORD) {
    return NextResponse.json({ ok: false, error: 'That password isn’t right. Please try again.' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true, next: safeNext(body?.next) })
  response.cookies.set(AUTH_COOKIE, AUTH_TOKEN, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: AUTH_MAX_AGE,
  })
  return response
}
