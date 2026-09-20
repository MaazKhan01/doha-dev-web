# Doha 2036 — working notes

Read `README.md` first for the architecture, type scale and caching model. These are the
conventions to hold to.

## Conventions

- **Server components by default.** `'use client'` only where there is state, an event
  handler or a browser API — currently `SmoothScroll`, `Reveal`, `ScrollLitHeading`,
  `Accordion`, `NewsletterForm`.
- **Sections take one typed prop** (`data`) and never fetch. All content enters through
  `lib/cms/home.ts`.
- **Extend `types/content.ts` before adding a section.** The type is the contract between
  the CMS and the components.
- **Logical properties only** — `ps/pe`, `ms/me`, `text-start/end`, `border-s/e`. Never
  `left`/`right`. Both locales share one stylesheet.
- **Tokens, not hex.** Use `bg-sand`, `text-ink`, `text-flame`, `rounded-card`. New values
  go in the `@theme` block in `app/globals.css`.
- **Never hardcode a font family or a body size.** Use `type-display`, `type-eyebrow`,
  `type-lead`, `type-body`, or the `--font-*` tokens.
- **One entrance animation.** Wrap in `<Reveal>`; pass `delay` for stagger, following the
  0 / 0.12 / 0.24+ ladder. The only other motion primitive is `ScrollLitHeading`. Do not
  add bespoke scroll effects.
- **One shape for chips.** FAQ markers and social buttons both use `<Diamond>`.
- **Respect reduced motion.** `Reveal`, `ScrollLitHeading`, `Accordion` and Lenis all
  check it — anything new must too.

## Gotchas

- `params` is a Promise in Next 16 — always `await params`.
- Route middleware lives in `proxy.ts`, not `middleware.ts` (Next 16 convention).
- There is no `app/layout.tsx`; the root layout is `app/[locale]/layout.tsx`.
- `revalidate` must be a literal in the page file; Next will not read an imported
  constant and fails the build with "Invalid segment configuration export".
- `revalidateTag` takes two arguments in Next 16 — pass the `'max'` profile.
- Lenis owns scrolling, so `scroll-behavior: smooth` is deliberately off.
- Tailwind v4 resets `button` to `cursor: default`; a base rule in `globals.css` puts the
  pointer back. Don't re-add it per component.
- Placeholders: an empty `MediaAsset.src` renders a dashed labelled box. That is expected
  until assets land — don't "fix" it by removing the check.
- Editing files through PowerShell `-replace` round-trips mangles non-ASCII (`×`, `—`).
  Use the editing tools for files containing them.
