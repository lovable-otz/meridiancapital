# Instructions for AI builders (Lovable, Claude, etc.)

This project is Meridian Capital — a Miami, FL business-lending marketplace site. It was cloned from a Long Beach precedent and rewritten for the South Florida market (Brickell, Wynwood, Little Havana, Coconut Grove, Coral Gables, Design District, Downtown Miami, Edgewater, Doral, Aventura). It has an SEO engine that took real work to set up. Respect the rules below or `npm run lint:seo` will fail the build.

## Protected files — do NOT edit without explicit human approval

- `src/lib/site-config.ts`
- `src/lib/seo.ts`
- `src/lib/seo-robots.ts`
- `src/lib/seo-sitemap.ts`
- `src/lib/seo-schema.ts`
- `src/routes/__root.tsx`
- `src/server.ts` (contains the `/robots.txt` and `/sitemap.xml` interceptors)
- `scripts/check-seo-engine.mjs`
- `.env*` files

## Forbidden patterns (`npm run lint:seo` enforces these)

The CI check fails the build if any of these are found in `src/`:

1. A `lovable.app` URL anywhere — use `SITE_URL` from `site-config.ts` instead.
2. A `<meta name="keywords">` tag — Google has ignored this for over a decade.
3. An `aggregateRating` JSON-LD field — this site is a finance/loan business; fake reviews violate Google policy and create legal liability. The Florida AG also actively pursues finance/lending operators that publish fabricated review counts.
4. A `<link rel="canonical">` inside `src/routes/__root.tsx` — canonicals must live on each page's `head()` via `buildHead()`.

## What you CAN edit freely

- Page content, copy, headings, images, styling
- Any file in `src/routes/*.tsx` that is **not** in the protected list (just keep using `buildHead()` for the page `<head>`)
- `src/components/*`
- `src/styles.css`, tailwind config

## How to wire SEO on a NEW page

Always go through `buildHead()`:

```ts
import { buildHead } from "@/lib/seo";
import { buildGraph } from "@/lib/seo-schema";

export const Route = createFileRoute("/some-path")({
  head: () => {
    const title = "Page title (~60 chars)";
    const description = "Meta description (~155 chars)";
    return buildHead({
      title,
      description,
      path: "/some-path",
      schema: buildGraph({ title, description, path: "/some-path" }),
    });
  },
  component: SomePage,
});
```

That guarantees:
- One absolute canonical
- One title + description with the brand suffix
- Open Graph + Twitter tags
- One connected JSON-LD `@graph` with the Organization reference

## Hard rules for finance content

- Never invent reviews, ratings, license numbers, awards, "$ funded", "years in business", or offices that don't exist. Pull every business fact from `SITE_CONFIG`.
- Mock placeholder values in `SITE_CONFIG` are acceptable while the site is `noindex` (`VITE_INDEXABLE=false`). Before going live, every mock value must be replaced with real owner data.
