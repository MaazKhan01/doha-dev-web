/**
 * The WordPress (WPGraphQL) backend. This is the one place the CMS address
 * is resolved: the GraphQL client, the media URL rewrite and `next/image`'s
 * allowed hosts all read it from here.
 *
 * Set `NEXT_PUBLIC_WP_URL` in `.env.local` locally; the Azure pipeline writes
 * it to `.env` per branch (DEV_/STG_NEXT_PUBLIC_WP_URL). The base URL only —
 * `/graphql` is added below. Without it the site renders the static content
 * in `content/`.
 *
 * Plain module, no `server-only`: `next.config.ts` imports it too, and Next
 * loads the env files before reading that config.
 */
export const CMS_URL = (process.env.NEXT_PUBLIC_WP_URL ?? '').trim().replace(/\/+$/, '')

/** The GraphQL endpoint on that backend. */
export const CMS_GRAPHQL_ENDPOINT = CMS_URL ? `${CMS_URL}/graphql` : ''
