# Doha 2036

Marketing site for Doha's bid to host the 2036 Olympic and Paralympic Games.

Next.js 16 (App Router, RSC) · TypeScript · Tailwind v4 · GraphQL (WPGraphQL) · Lenis · Motion

## Running it

```bash
npm run dev     # http://localhost:3000 → redirects to /en
npm run build
npm run lint
```

## How it is put together

```
app/[locale]/        route tree — one locale segment, no other layouts
app/api/revalidate/  publish webhook that purges the CMS cache
assets/fonts/        Doha 2036 brand face (.ttf)
components/
  layout/            header, footer, newsletter, logo
  sections/          one file per band of the page, each takes a typed prop
  ui/                shared primitives (accordion, diamond, media, headings, icons)
  motion/            Reveal + LitHeading
  providers/         Lenis smooth scrolling
content/             static EN/AR copy, typed as HomeContent
lib/cms/             GraphQL client + content loaders
lib/i18n/            locale list, direction, helpers
types/content.ts     the contract every section renders against
proxy.ts             locale negotiation and redirect
```

Three rules keep it clean:

1. **Sections never fetch.** The page loads content once and passes typed props down.
2. **Content is data, not markup.** Accent colours, line breaks and ordering all live in
   `content/` (and later the CMS), so editors control them without a deploy.
3. **One of everything.** One reveal animation, one card radius, one display heading
   component. Variants are props, not new files.

## Content and the CMS

Data flows one way, server-side, one request per query:

```
lib/cms/graphQlQueries.js   every query + its variables (HEADER / FOOTER / HOMEPAGE)
        │  queryCms()        lib/cms/client.ts — cached, tagged 'cms', null on failure
        ▼
types/cms.ts                raw WPGraphQL response shapes
        │  lib/cms/mappers.ts — pure: picks En/Ar, strips HTML, __typename → section
        ▼
types/content.ts            SiteContent (layout) · HomeContent { sections[] } (page)
        │  lib/cms/site.ts · lib/cms/home.ts
        ▼
PageBuilder                 section type → component, in the order editors set
```

- **Header and footer** load in `getSiteContent` (layout); **page-builder sections** in
  `getHomeContent` (page). Editors control section order in the CMS.
- **Arabic falls back to English** per field while translations are authored.
- **Rich text is flattened.** A line break starts a new heading line; a **bold** line in a
  heading is an accent (flame) line. The statement lights its first line by default.
- **Fallback.** If the endpoint is unset or a query fails, that query's part of the page
  renders the static copy in `content/`. Unknown `__typename`s are skipped with a dev warning.

**Adding a page-builder layout:** fragment in `graphQlQueries.js` → raw type in
`types/cms.ts` → mapper + `sectionMappers` entry in `mappers.ts` → (new section only)
`SectionDataMap` in `types/content.ts` and the `PageBuilder` map. The types make each step
fail the build until the next one is done.

The backend address is a constant, `CMS_URL` in `lib/cms/config.ts`, not an env var, so
deployments need no configuration. Change it there and redeploy; set it to `''` to serve
the static content. Only secrets stay in env (see `.env.example`):

```
CMS_GRAPHQL_TOKEN=
REVALIDATE_SECRET=
```

`queryCms` falls back to the static content if the URL is empty or the request fails.

## Caching

Four layers, each doing one job:

| Layer | Where | Behaviour |
| --- | --- | --- |
| Full Route Cache | `revalidate = 300` in `app/[locale]/page.tsx` | `/en` and `/ar` are prerendered at build and refreshed in the background at most every 5 min |
| Data Cache | `cachedFetch` in `lib/cms/client.ts` | every CMS response is cached across requests and users, tagged `cms` |
| Request memo | `cache()` around `getHomeContent` | `generateMetadata`, the layout and the page share one resolution per render |
| HTTP | `headers()` in `next.config.ts` | `/api/*` is `no-store`; `logo.svg` revalidates hourly; `_next/static` is immutable via Next's own defaults |

**On publish**, the CMS should `POST /api/revalidate` with `REVALIDATE_SECRET` (header
`x-revalidate-secret` or `?secret=`). That calls `revalidateTag('cms')` and editors see
changes immediately instead of waiting out the window.

`revalidate` in the page must stay a literal — Next only reads statically analysable
segment config, so it cannot reference `CMS_REVALIDATE`. Keep the two in step.

Images go through `next/image` with AVIF/WebP and a one-year TTL on derivatives. The CMS
hostname is derived from `CMS_URL`, so uploaded media is optimisable with no second
setting. Fonts are self-hosted through `next/font`, so they are content-hashed
and immutable with no third-party round trip.

## Internationalisation

`en` and `ar`, resolved in `proxy.ts` from `Accept-Language` and pinned in the URL.
`app/[locale]/layout.tsx` sets `lang` and `dir`. Use logical CSS properties
(`ps-*`, `me-*`, `text-start`) everywhere so RTL needs no overrides.

## Typography

Two families, loaded in `lib/fonts.ts` and exposed as CSS variables:

| Variable | Family | Used for |
| --- | --- | --- |
| `--font-doha` | Doha 2036 (local, weights 300/400/700) | all English text |
| `--font-noto` | Noto Sans Arabic (Google) | all Arabic text |

`globals.css` maps those onto `--font-display`, `--font-body` and `--font-arabic`.
Components only ever reference the semantic tokens.

Scale, quoted at the 1440 artboard and clamped down from there:

| Class / usage | Size | Weight |
| --- | --- | --- |
| Statement ("Why Doha?") | 144px | 700 |
| Intro heading | 64px | 700 |
| `.type-eyebrow` — section headings | 34px | 700 |
| Committee role / name | 26px / 30px | 700 / 300 |
| `.type-lead` — supporting column, FAQ answers | 24px | 300 |
| `.type-body` | 16px | 400 |

## Layout

Page gutter is 62px from `lg` up (1.25rem mobile, 2.5rem from `md`), matching the
artboard. Card grids use a 58px gap at `lg`, which puts three cards at exactly 400px
across 1440. The footer band is `min(63.03vw, 56.75rem)` — the design's 1440 × 907.58.

## Design tokens

Defined once in `app/globals.css` under `@theme`:

| Token | Value |
| --- | --- |
| `--color-sand` | `#FAF5F0` — page background, text on dark |
| `--color-ink` | `#1E1E1E` — body text, footer background |
| `--color-flame` | `#FF7346` — accent lines, hover, focus |
| `--radius-card` | `20px` |
| `--ease-brand` | `cubic-bezier(0.22, 1, 0.36, 1)` |

## Motion

- `Reveal` — rise, fade and de-blur on enter, firing at 22% into the viewport so a fast
  scroll does not trip several sections into one flash. Sections cascade on a fixed
  ladder: heading 0s → supporting column 0.12s → cards 0.24s, 0.36s, 0.48s.
- `LitHeading` — the statement band. Starts at 16% opacity and fills in line by line on
  a timer, 0.8s apart. It is not scroll-driven; it waits until the heading is on screen,
  then runs once, so the sequence is never spent before anyone sees it.
- Lenis provides the smooth scroll; all three respect `prefers-reduced-motion`.

## Still outstanding

- **Imagery and hero video.** Every `MediaAsset.src` is empty, which renders a labelled
  placeholder. Fill them in `content/` or from the CMS.
- **Newsletter endpoint.** The email input is currently commented out and the submit
  handler is a stub; wire both to the provider.
- **Arabic copy.** Draft translations, for layout review only.
- **Font weight 200.** The committee name is specced at 200; the family ships 300 as its
  lightest cut, so that is what renders.
