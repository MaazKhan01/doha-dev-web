import { revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'

import { CMS_CACHE_TAG } from '@/lib/cms/client'

/**
 * Publish webhook. Point the CMS at `POST /api/revalidate` with the shared
 * secret and every cached CMS response is dropped immediately, so editors see
 * changes without waiting out the revalidation window.
 *
 * Never cached itself — it must run on every call.
 */
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET

  if (!secret) {
    return NextResponse.json({ error: 'Revalidation is not configured' }, { status: 501 })
  }

  const provided =
    request.headers.get('x-revalidate-secret') ?? request.nextUrl.searchParams.get('secret')

  if (provided !== secret) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  // Next 16 takes a cache profile; 'max' expires every entry carrying the tag.
  revalidateTag(CMS_CACHE_TAG, 'max')

  return NextResponse.json(
    { revalidated: true, tag: CMS_CACHE_TAG, at: Date.now() },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}
