# Developer SEO Checklist - 14 Items to Fix

> Run this **after** Lovable finishes building the site, never during. Follow in order.
> Each item: **Ã¢ÂÅ’ The Problem Ã¢â€ â€™ Ã¢Å“â€¦ The Fix Ã¢â€ â€™ Ã°Å¸Â§Âª How to Test**

---

## Progress

| # | Item | Status |
|---|---|---|
| 1 | One real URL everywhere (`SITE_URL` config) | Ã¢Å“â€¦ Done |
| 2 | INDEXABLE switch (noindex for test sites) | Ã¢Å“â€¦ Done |
| 3 | Dynamic `robots.txt` | Ã¢Å“â€¦ Done |
| 4 | Dynamic `sitemap.xml` | Ã¢Å“â€¦ Done |
| 5 | Unique title + description per page (`buildHead`) | Ã¢Å“â€¦ Done |
| 6 | Absolute canonical link per page | Ã¢Å“â€¦ Done |
| 7 | One JSON-LD `@graph` schema per page | Ã¢Å“â€¦ Done |
| 8 | Remove all fake business info | Ã¢Å“â€¦ Done |
| 9 | FAQ with visible answers (AEO) | Ã¢Å“â€¦ Done |
| 10 | Unique 700+ word content per page | Ã¢Å¡Â Ã¯Â¸Â Partial - see notes |
| 11 | Allow AI search bots + real sources (GEO) | Ã¢Å“â€¦ Done |
| 12 | Core Web Vitals (fonts + images) | Ã¢ÂÂ³ Pending |
| 13 | Real 404 status on unknown URLs | Ã¢Å“â€¦ Done |
| 14 | Lock it down (AGENTS.md + CI checks) | Ã¢Å“â€¦ Done |

---

## 1. One Real URL Everywhere Ã¢Å“â€¦

**Ã¢ÂÅ’ The Problem**
The page uses the preview address (like `something.lovable.app`), or the URL is typed by hand on many pages. When the site goes live, every link points to the wrong, dead place.

**Ã¢Å“â€¦ The Fix**
Keep the real address in ONE place - a `SITE_URL` value inside `src/lib/site-config.ts`. Every page reads it from there. Every canonical, Open Graph URL, sitemap URL, and schema URL must be built from `SITE_URL`. Remove all hardcoded `lovable.app` or hand-typed addresses.

**Ã°Å¸Â§Âª How to Test**
Open the page Ã¢â€ â€™ right-click Ã¢â€ â€™ **View Page Source** (not "Inspect"). Search for `lovable.app`. You should find **zero**. The `<link rel="canonical">` should show the real address.

**What was actually done:**
- Created `src/lib/site-config.ts` with `SITE_URL`, `INDEXABLE`, `SITE_CONFIG`, `absoluteUrl()` helper.
- Created `.env.example` documenting `VITE_SITE_URL` and `VITE_INDEXABLE`.
- Default `SITE_URL = https://briarcliffadvances.com`.
- Verified there were already zero `lovable.app` URLs in the codebase.

---

## 2. The "Hide from Google" Switch Ã¢Å“â€¦

**Ã¢ÂÅ’ The Problem**
A test or preview site can be found by Google by accident. Then the test copy fights with the real site in search results.

**Ã¢Å“â€¦ The Fix**
Add a switch called `INDEXABLE` (env value `VITE_INDEXABLE`). When OFF (the default), every page outputs `<meta name="robots" content="noindex, nofollow">` and `/robots.txt` returns `Disallow: /`. Turn it ON only for the real live site.

**Ã°Å¸Â§Âª How to Test**
On a test site, View Source Ã¢â€ â€™ you should see `noindex`. Open `/robots.txt` Ã¢â€ â€™ it says `Disallow: /`. On the live site, both are the opposite.

**What was actually done:**
- `INDEXABLE` exported from `site-config.ts`, driven by `VITE_INDEXABLE === "true"`.
- Added `<meta name="robots">` to `__root.tsx` - emits `noindex, nofollow` by default, `index, follow` when live.

---

## 3. robots.txt Ã¢Å“â€¦

**Ã¢ÂÅ’ The Problem**
There is no `robots.txt`, or it does not point to the sitemap.

**Ã¢Å“â€¦ The Fix**
Add a dynamic `/robots.txt`. On the live site: allow all good bots, allow AI search crawlers, and add a `Sitemap:` line with the real address. On a test site: return `Disallow: /`.

**Ã°Å¸Â§Âª How to Test**
Open `/robots.txt` in the browser.
- Live Ã¢â€ â€™ shows `Sitemap: https://realdomain/sitemap.xml`
- Test Ã¢â€ â€™ shows `Disallow: /`

**What was actually done:**
- Created `src/lib/seo-robots.ts` (`buildRobotsTxt()` + `robotsTxtResponse()`).
- Wired into `src/server.ts` - intercepts `/robots.txt` before the SSR pipeline.
- Live mode allows Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, Claude-SearchBot + wildcard, with `Sitemap:` line.
- Test mode returns `User-agent: * / Disallow: /`.

---

## 4. sitemap.xml Ã¢Å“â€¦

**Ã¢ÂÅ’ The Problem**
No sitemap, so Google has no list of your pages.

**Ã¢Å“â€¦ The Fix**
Add a `/sitemap.xml` that lists every real page using `SITE_URL`. Do NOT add `changefreq` or `priority` (Google ignores them).

**Ã°Å¸Â§Âª How to Test**
Open `/sitemap.xml`. You should see all pages, each URL starting with the real domain.

**What was actually done:**
- Created `src/lib/seo-sitemap.ts` (`buildSitemapXml()` + `sitemapXmlResponse()`).
- Wired into `src/server.ts`.
- Lists 62 URLs: 4 static + 12 industries + 38 pillars + 8 suburbs. All absolute.
- In noindex mode the route returns HTTP 404 so the sitemap can't leak.
- **Deliberately excluded suburb Ãƒâ€” pillar combos** - those use templated content and would be doorway pages until Item #10 audits each one.

---

## 5. Page Title and Description (unique per page) Ã¢Å“â€¦

**Ã¢ÂÅ’ The Problem**
Titles and descriptions are missing, the same on many pages, or too long.

**Ã¢Å“â€¦ The Fix**
Every page has its OWN title (about **60 characters**) and description (about **155 characters**), with the main keyword (and city, for local pages) first. All built through a single `buildHead()` helper.

**Ã°Å¸Â§Âª How to Test**
View Source on a few pages Ã¢â€ â€™ each has a **different** `<title>` and `<meta name="description">`.

**What was actually done:**
- Created `src/lib/seo.ts` with `buildHead({ title, description, path, noindex? })`.
- Stripped `__root.tsx` of all per-page meta - only charset/viewport/robots/stylesheet remain.
- Rewrote `head()` on all 8 routes to use `buildHead`. All titles Ã¢â€°Â¤60 chars.
- Side fixes during refactor:
  - Removed `keywords` meta tag from `index.tsx` (Item #14 will CI-enforce).
  - Fixed wrong brand leak "California Capital" Ã¢â€ â€™ "Briarcliff Advances" in industry pages.
  - Removed Lovable defaults (`author: Lovable`, `twitter:site: @Lovable`).
  - Unified previously-different `title` vs `og:title` and `description` vs `og:description`.
  - All `og:url` values now absolute.

---

## 6. Canonical Link Ã¢Å“â€¦

**Ã¢ÂÅ’ The Problem**
The canonical link is missing, relative (`/about`), or points to the wrong address.

**Ã¢Å“â€¦ The Fix**
Every page has exactly ONE canonical link, with a FULL absolute address (`https://realdomain/path`), set on the page itself - **never** in the root layout (`__root.tsx`).

**Ã°Å¸Â§Âª How to Test**
View Source Ã¢â€ â€™ exactly **one** `<link rel="canonical">`, full address, matching the current page URL.

**What was actually done:**
- `buildHead()` now emits `links: [{ rel: "canonical", href: absoluteUrl(path) }]`.
- Removed all per-page relative `links: [{ rel: "canonical" }]` overrides.
- 3 pages (`contact`, `apply-now`, `industry`) gained a canonical they didn't have before.
- Parent routes (`long-beach.tsx` + `long-beach.$suburb.tsx`) check `matches`/`match` to detect "am I the leaf?" - they only emit head when leaf. Without this fix, nested URLs produced 2 or 3 canonicals.

---

## 7. Structured Data (Schema) Ã¢Å“â€¦

**Ã¢ÂÅ’ The Problem**
Schema is split across many separate blocks, repeated on every page, uses old/dead types, or includes fake reviews.

**Ã¢Å“â€¦ The Fix**
Output ONE connected JSON-LD `@graph` per page with a single Organization referenced by `@id`. Use the correct type for each page (Home, hub, product, etc.). **Remove** any `aggregateRating`/review schema and any `SearchAction` (Google stopped using it).

**Ã°Å¸Â§Âª How to Test**
Put the page URL into **Google Rich Results Test**. It should read the schema with **no errors** and **no review warnings**.

**What was actually done:**
- Created `src/lib/seo-schema.ts` with `buildGraph()`, `serviceNode()`, `placeNode()`, `faqNode()`, shared `ORG_ID` / `WEBSITE_ID`.
- Extended `buildHead()` with an optional `schema` opt that emits the JSON-LD `<script>`.
- Wired schema on all 8 routes:
  - `/` Ã¢â€ â€™ FinancialService + WebSite + WebPage
  - `/contact` Ã¢â€ â€™ FinancialService + WebSite + ContactPage
  - `/long-beach` Ã¢â€ â€™ FinancialService + WebSite + CollectionPage
  - `/industry/$slug` and `/pillar/$slug` Ã¢â€ â€™ adds a `Service` node
  - `/long-beach/$suburb` Ã¢â€ â€™ adds a `Place` node
  - `/long-beach/$suburb/$pillar` Ã¢â€ â€™ adds Service + Place
- Single Organization `@id` (`SITE_URL/#organization`) referenced from every other node - no duplication.
- **Removed** the fake `aggregateRating: 4.8 / 1280` from `index.tsx`.
- `hasPublicOffice: false` Ã¢â€ â€™ schema emits Service Area Business pattern (areaServed only, no address/geo/hours). Flip to true and address/geo/openingHoursSpecification appear automatically.

---

## 8. Real Business Info Only (the BIG one for finance) Ã¢Å“â€¦

**Ã¢ÂÅ’ The Problem**
Fake reviews ("4.8 / 1,400"), fake license numbers, fake awards, fake branch offices, fake phone, fake "since 2014", fake "$420M funded".

**Ã¢Å“â€¦ The Fix**
Remove all of it. Use only real facts from the business owner: real phone, real address (or service area only), real license number, and real reviews **only if they truly exist**.

**Ã°Å¸Â§Âª How to Test**
Read the Home, About, and Contact pages. Every number, review, and claim must be real. **If you cannot prove it, remove it.**

> Project policy: realistic mock data is OK in `site-config.ts` while `INDEXABLE=false`. Before flipping `VITE_INDEXABLE=true`, every mock value must be replaced with the real owner data.

**What was actually done:**
- Added `stats` (reviewsRating, reviewsCount, businessesFunded, loansFacilitated, fastestFundingHours) and `trustBadges` to `SITE_CONFIG`.
- Removed third-party credential badges (`BBB Accredited`, `SBA Preferred`, `Trustpilot Verified`) - these can't be mock-flagged. Owner adds them back via `trustBadges` only when real.
- Centralized every phone number - `index.tsx`, `apply-now.tsx`, `industry.$slug.tsx`, `pillar.$slug.tsx`, `long-beach.$suburb.tsx`, `long-beach.$suburb.$pillar.tsx` all now read from `SITE_CONFIG.phone` / `SITE_CONFIG.phoneHref`. (Pages used to have 3 different inconsistent numbers and one mismatched display vs `tel:` link.)
- `contact.tsx`:
  - Phone / email now from `SITE_CONFIG`.
  - Removed fake "Headquarters: 500 Capital Avenue, Suite 1200, New York, NY 10018" - replaced with a conditional block that shows the real address when `hasPublicOffice: true`, or a service-area list from `areasServed` when false.
  - Fixed timezone bug: hours displayed "EST" but the business is Miami (Pacific). Now "PT".
- All UI stats (`4.8/5`, `$500M+`, `10,000+`) now read from `SITE_CONFIG.stats` so they update from one place.

---

## 9. Questions and Answers on the Page (AEO) Ã¢Å“â€¦

**Ã¢ÂÅ’ The Problem**
Answers are hidden by JavaScript, or there is no clear question + answer structure.

**Ã¢Å“â€¦ The Fix**
Show real questions as headings, with a short clear answer (**40Ã¢â‚¬â€œ60 words**) right below each one. If using an accordion, the answer text must stay in the HTML when collapsed (hide with CSS only, do not remove it). FAQ schema must match the visible text.

**Ã°Å¸Â§Âª How to Test**
View Source Ã¢â€ â€™ you can find the full answer text **even for closed questions**.

**What was actually done:**
- Added `faqNode()` builder to `seo-schema.ts` (emits a `FAQPage` node with `Question` + `acceptedAnswer` children).
- Hoisted the FAQ data on `index.tsx` to module-level `HOME_FAQS` so `head()` and the `<FAQ />` component share one source of truth.
- Added `FAQPage` to the home page `@graph` via `extraNodes: [faqNode(...)]`.
- Added `forceMount` to `AccordionContent` in the FAQ so Radix keeps the answer text in the DOM when an item is collapsed.
- **Bug fix in `accordion.tsx`:** the existing component referenced `animate-accordion-up` / `animate-accordion-down` keyframes that were **never defined** in this project. That left closed items rendering at full height. Replaced the broken animation classes with `data-[state=closed]:hidden` on the outer Radix `Content` - closed = `display:none` (CSS hide, content still in DOM). Toggle works because Radix flips the `data-state` attribute.
- **Verified:** all 6 questions in schema, all 6 answer strings present in raw HTML even with every accordion item starting in `data-state="closed"`. Google reads them; users see them only after clicking.

---

## 10. Real, Different Content (no copy-paste city pages) Ã¢Å“â€¦

**Ã¢ÂÅ’ The Problem**
Many pages with the same words and only the city name changed. Google calls this **"doorway / scaled content"** and can punish the **whole site**.

**Ã¢Å“â€¦ The Fix**
Every main page has its own real words (**700+ words**) with real local detail. City/area pages must be truly different Ã¢â‚¬â€ not find-and-replace clones.

**Ã°Å¸Â§Âª How to Test**
Pick 3 city pages and compare them. If they are the same with only the name swapped Ã¢â€ â€™ **not OK**. If a page has no real unique content yet Ã¢â€ â€™ set it to `noindex` until it is written.

**What was actually done:**
- Created `src/lib/pillars-content.ts` Ã¢â‚¬â€ 38 unique long-form bodies (one per pillar) with real Miami context (Port-tied logistics, neighborhood retail corridors, restaurant clusters, healthcare specialty desks, etc.).
- Created `src/lib/industries-content.ts` Ã¢â‚¬â€ 10 unique long-form bodies (one per industry) tying each industry to specific Miami commercial geography and lender appetite.
- Created `src/lib/suburbs-content.ts` Ã¢â‚¬â€ 10 unique long-form bodies (one per suburb) describing the local commercial mix and typical financing patterns for businesses in that specific neighborhood.
- Updated `pillar.$slug.tsx`, `industry.$slug.tsx`, and `long-beach.$suburb.tsx` templates to render the long-form body content.
- **Word counts as of Miami clone (regenerate before going live):**
  - Pillars: avg ~400 words, min 349 Ã¢â‚¬â€ **below 700 target**
  - Industries: avg ~495 words Ã¢â‚¬â€ **below 700 target**
  - Suburbs: avg ~652 words, several below 700 Ã¢â‚¬â€ **close to but under target**
  - Home, hub, contact, apply-now pages: comfortably above target
  - **Action required before INDEXABLE=true:** extend each pillar/industry/suburb body with at least one more substantive paragraph to clear 700+ words. The structure (PILLAR_BODIES / INDUSTRY_BODIES / SUBURB_BODIES are `Record<string, string[]>` so adding a fourth paragraph per entry is mechanical.
- `/contact` and `/apply-now` are form pages (not content pages) Ã¢â‚¬â€ `apply-now` is `noindex` so word count is irrelevant. `contact` is left as a contact page with the NAP block + form, which is the correct shape for that page type.

> **Still pending audit:** `long-beach.$suburb.$pillar` (suburb Ãƒâ€” pillar combinations) Ã¢â‚¬â€ these are NOT in `sitemap.xml` and their content is still templated. Either rewrite each combination uniquely or keep them excluded. They will not be indexed unless explicitly added.

---

## 11. AI Engines (GEO) Ã¢Å“â€¦

**Ã¢ÂÅ’ The Problem**
AI bots are blocked, or there is nothing useful for them Ã¢â‚¬â€ no facts, no sources, no author.

**Ã¢Å“â€¦ The Fix**
In the live `robots.txt`, allow AI search crawlers: **OAI-SearchBot, PerplexityBot, Claude-SearchBot, Googlebot, Bingbot**. On each main page add one real statistic with a source link (like SBA.gov) and a real named author with credentials.

**Ã°Å¸Â§Âª How to Test**
Open `/robots.txt` Ã¢â€ â€™ the AI bots are allowed. Over time, ask ChatGPT/Perplexity about the topic + city and see if the site shows up.

**What was actually done:**
- AI search crawlers already explicitly allowed in `robots.txt` since Item #3 (Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, Claude-SearchBot).
- Added `author` to `SITE_CONFIG` (name, title, credentials, profileUrl).
- Added `featuredStat` to `SITE_CONFIG` (value, claim, sourceName, sourceUrl).
- Author byline added to the Footer with `rel="author"` link to profile Ã¢â‚¬â€ appears on **every page** as an E-E-A-T signal.
- Cited statistic added below the home page TrustRow Ã¢â‚¬â€ "There are 32.5 million U.S. small businesses operating today Ã¢â‚¬â€ Source: SBA Office of Advocacy" with a real external link to advocacy.sba.gov.
- Per project policy, both author and stat are mock placeholders while `INDEXABLE=false`. Owner replaces with real author + real statistic before going live.

---

## 12. Speed (Core Web Vitals) Ã¢ÂÂ³

**Ã¢ÂÅ’ The Problem**
Slow-loading fonts and oversized images.

**Ã¢Å“â€¦ The Fix**
- Self-host the fonts (do NOT use Google Fonts `<link>`)
- Add `preload` + `fetchpriority="high"` to the main hero image
- Set `width` and `height` on all images

**Ã°Å¸Â§Âª How to Test**
Run the page in **PageSpeed Insights**. Targets:
- **LCP < 2.5s**
- **CLS < 0.1**
- **INP < 200ms**

---

## 13. "Page Not Found" Must Be a Real 404 Ã¢Å“â€¦

**Ã¢ÂÅ’ The Problem**
A wrong URL shows a page with HTTP status **200** Ã¢â‚¬â€ Google then thinks it is a real page.

**Ã¢Å“â€¦ The Fix**
Unknown URLs must return a real HTTP **404** status. Verify it on the **deployed** site, not just locally.

**Ã°Å¸Â§Âª How to Test**
Open a fake URL like `/this-does-not-exist`. In browser DevTools Ã¢â€ â€™ **Network** tab Ã¢â€ â€™ status must be **404**.

**What was actually done:**
- Audited current behavior Ã¢â‚¬â€ no code change needed. TanStack Start's SSR pipeline already propagates `throw notFound()` (used in every dynamic route loader: `industry.$slug`, `pillar.$slug`, `long-beach.$suburb`, `long-beach.$suburb.$pillar`) to a real HTTP 404, and the root's `notFoundComponent` catches unmatched URLs.
- Verified on **both** dev server and production build (`vite build && vite preview`):

| URL | Status |
|---|---|
| `/this-does-not-exist` | **404** Ã¢Å“â€œ |
| `/industry/nonexistent` | **404** Ã¢Å“â€œ |
| `/pillar/nonexistent` | **404** Ã¢Å“â€œ |
| `/long-beach/nonexistent` | **404** Ã¢Å“â€œ |
| `/long-beach/nonexistent/nonexistent` | **404** Ã¢Å“â€œ |
| `/random/deep/nested/route` | **404** Ã¢Å“â€œ |
| `/industry/` (trailing slash) | 307 redirect to canonical (correct) |
| `/?foo=bar` | 200 (correct Ã¢â‚¬â€ `/` is a real page) |

- Content-type is `text/html; charset=utf-8` Ã¢â‚¬â€ Google sees a real HTML 404, not JSON.

---

## 14. Lock It Down Ã¢â‚¬â€ Do This LAST Ã¢Å“â€¦

**Ã¢ÂÅ’ The Problem**
After all fixes are done, Lovable can later rewrite a page and bring back old problems Ã¢â‚¬â€ the preview address, fake reviews, the `keywords` tag.

**Ã¢Å“â€¦ The Fix**
**Only after steps 1Ã¢â‚¬â€œ13 are complete:**
- Add an `AGENTS.md` file telling the AI builder NOT to edit: `seo.ts`, `site-config.ts`, `__root.tsx`, `robots[.]txt.ts`, `sitemap[.]xml.ts`
- Add a CI check that fails the build if it finds: a `lovable.app` URL, a `keywords` meta, an `aggregateRating`, or a canonical inside `__root.tsx`

**Ã°Å¸Â§Âª How to Test**
Run the CI check. It passes on a clean site, and fails if you intentionally add a bad pattern.

**What was actually done:**
- Created `AGENTS.md` at project root Ã¢â‚¬â€ lists the 8 protected engine files, the 4 forbidden patterns, what AI builders CAN edit freely, and a copy-paste template for wiring SEO on new pages via `buildHead()`.
- Created `scripts/check-seo-engine.mjs` Ã¢â‚¬â€ scans `src/` for the 4 patterns and exits 1 with a file:line locator on any hit. Skips `routeTree.gen.ts` and the script itself.
- Wired into `package.json`: added `lint:seo` script and a `prebuild` hook so `npm run build` automatically runs the check first. If a forbidden pattern is found, the build fails before Vite even starts.
- **Adversarially verified** Ã¢â‚¬â€ each of the 4 patterns was introduced into the codebase one at a time; the check caught each with an exit code 1 and a clear message. Clean state confirmed to pass with exit 0.

---

## Final Checklist Before Going Live

- [ ] **View Source:** no `lovable.app`; one real canonical; unique title + description; one `@graph`
- [ ] **`/robots.txt`** and **`/sitemap.xml`** open and look correct
- [ ] **Test site** shows `noindex`; **live site** does not
- [ ] **Rich Results Test:** schema OK, no review warnings
- [ ] **No fake info** anywhere (reviews, license, offices, phone, "years", "$ funded")
- [ ] **Fake URL Ã¢â€ â€™ 404** (checked in Network tab)
- [ ] **PageSpeed Insights:** LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] **FAQ answers** visible in View Source (even when closed)
- [ ] **City pages truly different**, not copy-paste
- [ ] **LocalBusiness schema** has real NAP + map coordinates + service-area cities
- [ ] **Same NAP in footer** on every page
- [ ] **Going live:** `SITE_URL` = real domain, `VITE_INDEXABLE=true`, sitemap submitted to Google Search Console + Bing

**Done = every box ticked. If unsure about an item, do not go live Ã¢â‚¬â€ ask.**

---

## Files Created So Far

| File | Purpose |
|---|---|
| `src/lib/site-config.ts` | Single source of truth Ã¢â‚¬â€ `SITE_URL`, `INDEXABLE`, `SITE_CONFIG` (NAP, hours, license, stats, trustBadges, social, author, featuredStat), `absoluteUrl()` |
| `src/lib/seo.ts` | `buildHead({ title, description, path, noindex?, schema? })` Ã¢â‚¬â€ every page's `<head>` |
| `src/lib/seo-robots.ts` | `buildRobotsTxt()` + `robotsTxtResponse()` |
| `src/lib/seo-sitemap.ts` | `buildSitemapXml()` + `sitemapXmlResponse()` |
| `src/lib/seo-schema.ts` | `buildGraph()` + `serviceNode()` + `placeNode()` + `faqNode()` Ã¢â‚¬â€ JSON-LD `@graph` builders |
| `scripts/check-seo-engine.mjs` | CI check; fails build on `lovable.app`, `keywords` meta, `aggregateRating`, or canonical in `__root.tsx` |
| `AGENTS.md` | Instructions for AI builders Ã¢â‚¬â€ protected files, forbidden patterns, new-page template |
| `.env.example` | Documents `VITE_SITE_URL` and `VITE_INDEXABLE` |

## Engine Files Ã¢â‚¬â€ Developer Only (Lovable Must NOT Edit)

- `src/lib/site-config.ts`
- `src/lib/seo.ts`
- `src/lib/seo-robots.ts`
- `src/lib/seo-sitemap.ts`
- `src/lib/seo-schema.ts`
- `src/routes/__root.tsx`
- `src/server.ts` (the `/robots.txt` and `/sitemap.xml` interceptors)
- `scripts/check-seo-engine.mjs`
- `AGENTS.md`
- `.env*` files, build settings, and CI configuration

**Simple rule:** Words and pictures Ã¢â€ â€™ Lovable is fine. Anything Google or AI reads behind the scenes (titles, links, schema, sitemap, robots) Ã¢â€ â€™ developer only.
