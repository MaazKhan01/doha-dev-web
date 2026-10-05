import { NextResponse, type NextRequest } from 'next/server'

import { AUTH_COOKIE } from '@/lib/auth/session'

/** Clears the preview session and returns to the sign-in page. Visit /api/auth/signout. */
export function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/signin', request.url))
  response.cookies.delete(AUTH_COOKIE)
  return response
}
