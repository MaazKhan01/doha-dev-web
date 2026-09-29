import { GraphQLClient } from 'graphql-request'

import { CMS_GRAPHQL_ENDPOINT } from '@/lib/cms/config'

const endpoint = CMS_GRAPHQL_ENDPOINT

/** Revalidation window for CMS-backed content, in seconds. */
export const CMS_REVALIDATE = 300

/** Cache tag every CMS request carries, so a webhook can purge them together. */
export const CMS_CACHE_TAG = 'cms'

/**
 * graphql-request calls this instead of global fetch, which is how every CMS
 * query lands in Next's Data Cache: responses are shared across requests and
 * across all users, refreshed at most once per `CMS_REVALIDATE`, and purgeable
 * on publish via `revalidateTag(CMS_CACHE_TAG)`.
 *
 * The cast is needed because `next` is a Next.js extension to RequestInit.
 */
const cachedFetch: typeof fetch = (input, init) =>
  fetch(input, {
    ...init,
    next: { revalidate: CMS_REVALIDATE, tags: [CMS_CACHE_TAG] },
  } as RequestInit)

/**
 * Server-side GraphQL client for the headless CMS (WPGraphQL).
 *
 * Only ever imported from server components and route handlers, so the
 * endpoint and any auth token stay out of the client bundle.
 */
export const cmsClient = endpoint
  ? new GraphQLClient(endpoint, {
      fetch: cachedFetch,
      headers: process.env.CMS_GRAPHQL_TOKEN
        ? { authorization: `Bearer ${process.env.CMS_GRAPHQL_TOKEN}` }
        : undefined,
    })
  : null

export const isCmsConfigured = cmsClient !== null

/** A query and the variables it runs with — the shape of every entry in `graphQlQueries.js`. */
export type CmsQuery = {
  query: string
  variables: Record<string, unknown>
}

/**
 * Runs a query from `graphQlQueries.js`. Resolves to `null` when the CMS is not
 * configured or the request fails; the loaders then serve the static content,
 * so the site never renders empty during the build-out.
 */
export async function queryCms<TData>({ query, variables }: CmsQuery): Promise<TData | null> {
  if (!cmsClient) return null

  try {
    return await cmsClient.request<TData>(query, variables)
  } catch (error) {
    console.error('[cms] query failed, serving static fallback', error)
    return null
  }
}
