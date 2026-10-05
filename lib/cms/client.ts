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

/** Thrown when the CMS cannot answer. The message says which query and why. */
export class CmsError extends Error {
  override name = 'CmsError'
}

/**
 * Collapses a query onto one line. The Application Gateway WAF in front of the
 * CMS has rejected bodies containing `\n` ("Blocked by the WAF Policy", 403),
 * and the queries are written across many lines for readability. Whitespace is
 * insignificant in GraphQL; string literals are left untouched.
 */
const toSingleLine = (query: string) =>
  query.replace(/"(?:\\.|[^"\\])*"|\s+/g, (match) => (match.startsWith('"') ? match : ' ')).trim()

/** The operation name, for error messages: "GetHeader". */
const operationName = (query: string) => /\b(?:query|mutation)\s+(\w+)/.exec(query)?.[1] ?? 'query'

/** graphql-request's error, reduced to what a build log needs. */
function describe(error: unknown): string {
  const response = (error as { response?: { status?: number; errors?: { message: string }[]; body?: unknown } })
    ?.response
  if (response) {
    const reason =
      response.errors?.map((e) => e.message).join('; ') ||
      (typeof response.body === 'string' ? response.body.slice(0, 200) : '')
    return `HTTP ${response.status}${reason ? ` — ${reason}` : ''}`
  }
  const cause = (error as { cause?: { code?: string } })?.cause?.code
  return cause ?? (error instanceof Error ? error.message : String(error))
}

/**
 * Runs a query from `graphQlQueries.js`. The CMS is the only source of
 * content, so there is nothing to fall back to: an unset URL or a failed
 * request throws a `CmsError`. At build that fails the pipeline with the
 * reason; at runtime Next keeps serving the last good render of the page.
 */
export async function queryCms<TData>({ query, variables }: CmsQuery): Promise<TData> {
  const name = operationName(query)
  if (!cmsClient) {
    throw new CmsError(`[cms] ${name}: NEXT_PUBLIC_WP_URL is not set, so there is no CMS to read from.`)
  }

  try {
    return await cmsClient.request<TData>(toSingleLine(query), variables)
  } catch (error) {
    throw new CmsError(`[cms] ${name} failed against ${CMS_GRAPHQL_ENDPOINT}: ${describe(error)}`, {
      cause: error,
    })
  }
}
