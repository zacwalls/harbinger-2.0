# Harbinger MMA — Full SEO Audit (pre-launch)

- **Audited:** https://harbingermma.netlify.app/ (18 pages, the full sitemap), 2026-10-12
- **Business type:** Local Service, brick-and-mortar (MMA / martial arts gym, 2626 S Corbett Ave, Portland, OR 97201)
- **Context:** harbingermma.com is still the old Webflow site. This audit covers the new Astro site **before** the domain cutover, so launch-migration risk is weighted heavily.
- **Method:** 11 specialist checks run in parallel (technical, content/on-page, schema, sitemap, performance, visual, GEO, agent readiness, local, SXO, backlinks), plus inline crawl and image checks. Per-category detail is in `findings/*.md`.

## SEO Health Score: 61 / 100

| Category | Weight | Score | Source |
|---|---|---|---|
| Technical SEO | 22% | 61 | technical 58, sitemap 74 |
| Content Quality | 23% | 50 | content |
| On-Page SEO | 20% | 56 | content |
| Schema / Structured Data | 10% | 72 | schema |
| Performance (CWV) | 10% | 82 | performance (lab only) |
| AI Search Readiness | 10% | 62 | GEO 51, agent readiness 88 |
| Images | 5% | 75 | images |

Supplementary scores (not in the weighted total): Local SEO 52, SXO gap 48, Visual/mobile 78, Agent readiness 88, Backlinks: insufficient data.

**Reading the score:** the build quality is good. The site is static HTML, fast to first byte, with stable layout, a valid sitemap, a rich `@graph` of structured data and no JS rendering dependency. The score is held down by **launch plumbing** (no redirects, host choice) and by **content that doesn't yet answer what a searcher needs** (prices in plain text, first-class offer, kids policy, hours, proof).

## Executive summary

### Top 5 critical issues
1. **No redirects from the old site.** Live Webflow URLs (/about, /contact, /apply, /coaching, /class-types/*, /collections/*, /products/*, four legal/waiver pages) have no destination on the new site. At cutover they become 404s, losing GBP, social, email and backlink traffic. A ready file is in `_redirects.proposed`.
2. **Host mismatch (apex vs www).** The live domain 301s to `www.`, but the new site's `site`, canonicals, sitemap and schema all use the apex. One host must be chosen and enforced at cutover.
3. ~~Jerilyn's coach bio has joke copy~~ **Resolved:** the owner confirmed it's intentional.
4. **`/classes/mma/` is linked from the footer on every page and returns 404.** For a gym called "Harbinger **MMA**", the missing MMA page is also the biggest content gap.
5. **Legal pages are missing.** There is no privacy policy, although the trial form collects name, email and phone, and the waiver URLs are probably linked from signup flows.

### Top 5 quick wins
1. Copy `_redirects.proposed` to `public/_redirects` (10 minutes).
2. Fix the hours conflict: the footer says weekdays open at 8 AM, but `schedule.json` has 6:00 AM and 7:30 AM classes. Then add `openingHoursSpecification` to `src/lib/schema.ts`.
3. Pricing page: make the prices plain text instead of 3 extra H1s, add one plain sentence ("Month-to-month is $105/mo, a 3-month pass is $99/mo plus a $75 initiation fee, and a day pass is $18"), and show the $75 fee on the card.
4. Add Open Graph and Twitter tags with a 1200×630 share image in `src/layouts/Layout.astro`.
5. Fix the typos: "DICIPLINES" twice on the homepage, a cut-off Muay Thai sentence and "regimes" in Jake's bio. Add `alt=""` to the 6 schedule filter icons.

## Technical SEO — 61

- **Works:** single-hop trailing-slash 301s, real 404 status, HSTS, static HTML, viewport meta tag, valid sitemap.
- **Launch blockers:** the redirect map and the host choice (above).
- **netlify.app indexability (Medium, reframed).** The netlify.app copy has no noindex because the guard in `src/pages/robots.txt.ts` and `src/layouts/Layout.astro` keys on the configured `site` hostname. That is correct behavior: the Netlify build *is* the production build, just not on its domain yet. The `NODE_ENV=staging` branch belongs to the GitHub Pages workflow. **Do not add a build-time noindex to the Netlify build**, because it would ship to production. Instead, once the custom domain is primary, confirm that `harbingermma.netlify.app` 301s to it.
- **Security headers (Medium):** only HSTS is set. Add `public/_headers` with nosniff, Referrer-Policy, X-Frame-Options, Permissions-Policy and immutable caching for `/_astro/*`.
- **Netlify HUD script (Medium):** `/.netlify/scripts/hud` and a Netlify promo comment are injected into every page. Turn this off in Netlify settings for production.
- **Config cleanup (Low):** `isStaging` switches `base` to `/harbinger-2.0/`, `image.domains` contains a malformed `"://onrender.com"` entry, and there's no `<lastmod>` in the sitemap.

## Content Quality — 50

E-E-A-T 45 (Experience 45, Expertise 55, Authoritativeness 30, Trust 50).

- **Thin class pages:** 149–252 words of main copy against an ~800-word floor (the competitor median is 965). They have no class times, coach, price, level or what-to-bring, and "Portland" never appears in their body copy. Judo and Wrestling describe the sport, not Harbinger's class.
- **Claims without proof:** "world class" appears 6 times, "elite" 10 times, plus "Portland's premier", with no reviews, fight record, affiliations or press. A KATU feature exists and isn't used.
- **Contradictions:**
  - The footer opening hours conflict with the 6 AM classes.
  - A "Youth" card is shown, but there's no youth program, age or price.
  - "Any class, any time" sits next to comp sparring that is invite-only.
  - "Cancel whenever" sits next to a 3-month pass.
  - The homepage "$99 unlimited" stat is really the 3-month rate.
- **Coaches** use first names only, and the strongest credentials are buried in the full bios while the excerpts say "world-class".
- Duplication is **not** an issue: the maximum body-copy similarity between pages is 0.005.

## On-Page SEO — 56

- The homepage H1 is "here to win", with no brand, discipline or city. `/classes/` and `/coaches/` H1s are similarly generic.
- `/pricing/` has 4 H1s.
- Meta descriptions: 9 are under 110 characters and 3 are over 160. The file `findings/content.md` has rewrites for 8 pages.
- There are no Open Graph or Twitter tags.
- Internal linking is weak: class, coach and schedule pages don't link to each other, and there are no visible breadcrumbs.

## Schema — 72

- **Works:** one `@graph` per page with ExerciseGym and WebSite, ProfilePage/Person on coach pages, Service on class pages, an OfferCatalog on pricing, BreadcrumbList on detail pages, correct `@id` linking, and NAP that matches the footer.
- **Gaps:** no `openingHoursSpecification`, `geo`, `hasMap`, `logo` or `image`, and GBP and Yelp are missing from `sameAs`. `pricing.astro` emits a second partial ExerciseGym with the same `#gym` `@id`. Service nodes are thin. Hub pages have no breadcrumbs.
- `findings/schema.md` has ready-to-paste JSON-LD.

## Performance — 82 (lab only: Lighthouse 13.5 mobile, no CrUX field data)

| Page | Perf | LCP | CLS | TBT |
|---|---|---|---|---|
| / | 85 | 3.7 s | 0.006 | 0 ms |
| /schedule/ | 97 | 2.5 s | 0.003 | 0 ms |
| /classes/bjj/ | 94 | 2.5 s | 0.003 | 0 ms |
| /coaches/ | 83 | 4.1 s | 0.006 | 0 ms |

- `/coaches/` serves a 2560w hero to phones. Fix the `sizes` attribute or add a mobile source.
- The homepage class cards are over-served (about 274 KB avoidable).
- Google Fonts CSS blocks rendering (about 0.8 s on throttled mobile); self-host Space Grotesk.
- Run SVGO on the logos.
- TBT is 0 everywhere, so INP risk is low.

## Images — 75

Modern formats and correct decorative alt text are in place. The 6 schedule icons have no `alt`, there's no share image, the homepage hero is JPG, the logo SVGs are heavy, and the source files are huge (57 MB in `src/assets`). See `findings/images.md`.

## AI Search Readiness — 62

GEO 51, agent readiness 88.

- An AI system can't currently answer "how much is Harbinger MMA?", "do they teach kids?", "what time is BJJ?" or "when are they open?" from the site's text.
- Bing doesn't connect "harbinger mma portland" to the gym, and the brand ranks #6 for its own name, behind Instagram, Apple Maps, KATU, MapQuest and Yelp.
- **Works:** everything is server-rendered, all AI crawlers are allowed, there are no unnamed interactive elements, and the form is a native `<form>`.
- llms.txt and WebMCP are optional and low value here.

## Local SEO — 52 (supplementary)

- NAP is consistent between the old site, the new site and the schema.
- **Missing:**
  - a Maps link or embed anywhere
  - a contact page, and the address appears only in the footer
  - hours and geo in the schema
  - reviews or a Google review link
  - an about page
- Name variants ("Harbinger MMA Portland", "Harbingermma") should be normalized.
- Not verified without paid tools: the GBP category, rating, photos and local pack rank.

## SXO — 48 (supplementary)

- Every non-brand query ("mma gym portland", "muay thai portland", "bjj portland", "boxing gym portland") returns gym homepages and directories. 14 of 18 competitor pages show a first-visit offer and 15 of 18 show kids or age info.
- **Persona fit, weakest first:** Parent 13 (critical mismatch), Discipline specialist 45, Nervous beginner 48, Value shopper 55, Experienced fighter 58, Brand navigator 64. Trust is the weakest dimension for every persona.
- "BOOK FIRST CLASS" never says what the first class costs or what happens next.

## Visual / mobile — 78 (supplementary)

- The homepage hero and CTA are above the fold on mobile and desktop.
- Mobile has no visible header CTA (Join Now is inside the hamburger menu), and `/classes/*` and `/schedule/` have no CTA above the fold.
- Footer links and social icons are 18–20 px tall (the target is 44 px), and the social icons have no accessible name.
- `w-screen` on `<html>` is a latent horizontal-scroll risk on Windows; no overflow was observed.
- Screenshots are in `screenshots/`.

## Backlinks — insufficient data

- Common Crawl has no entry for harbingermma.com, and Moz isn't configured.
- Treat every old URL as linked. Before cutover, pull the real link and landing-page list from Google Search Console and Bing Webmaster Tools (free) for the www property.

## Not measured

- CrUX field data, GSC and GA4: no Google credentials.
- PageSpeed Insights hit its quota; local Lighthouse was used instead.
- Live geolocated SERPs and the local pack.
- GBP insights.
- The old site's full URL list (it has no sitemap). Export it from Webflow before cutover.

Action plan: `ACTION-PLAN.md`.
