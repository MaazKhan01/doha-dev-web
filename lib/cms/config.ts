/**
 * The WordPress (WPGraphQL) backend. This is the one place the CMS address
 * lives: the GraphQL client, the media URL rewrite and `next/image`'s allowed
 * hosts all read it from here. It is checked in rather than read from an env
 * var so a deployment needs no extra configuration.
 *
 * Set to `''` to render the static content in `content/` instead.
 *
 * Plain module, no `server-only`: `next.config.ts` imports it too.
 */
export const CMS_URL = 'https://yang-prague-cologne-pvc.trycloudflare.com'

/** The GraphQL endpoint on that backend. */
export const CMS_GRAPHQL_ENDPOINT = CMS_URL ? `${CMS_URL}/graphql` : ''
