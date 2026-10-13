# Local SEO findings: Harbinger MMA (pre-launch, staging)

**Score: 52/100**. Business type: brick-and-mortar. Vertical: fitness/martial arts gym (closest schema match is `ExerciseGym`, which the site already uses).

| Dimension | Weight | Score | Note |
|---|---|---|---|
| GBP signals | 25 | 11/25 | No Maps link, embed or review link on new site; GBP not verifiable (see limits) |
| Reviews and reputation | 20 | 5/20 | No on-page reviews; no aggregateRating; Yelp shows ~3.8 (6) per search snippet |
| Local on-page | 20 | 14/20 | Good "X in Portland, OR" titles and visible address; no /contact, no neighborhood content |
| NAP and citations | 15 | 11/15 | Consistent across sources checked; apex/www and "OR" casing nits |
| Local schema | 10 | 6/10 | Valid ExerciseGym with address/phone; no geo, hours, areaServed, hasMap |
| Local links and authority | 10 | 5/10 | Social sameAs only; no GBP/Yelp in sameAs; no local link signals |

## What works
- Street address, phone and email in the footer on every page: `2626 S Corbett Ave, Portland, OR 97201`, `(503) 310-5001`, `tel:` and `mailto:` links.
- Footer hours: Mon-Fri 8 AM-9:30 PM, Sat 9 AM-12:30 PM, Sun 10 AM-3:30 PM.
- `ExerciseGym` is the right subtype. It has `@id`, address, `telephone` in E.164, `priceRange`, and `sameAs` for Instagram, Facebook and TikTok. A single `@id` is reused via the WebSite publisher.
- Titles follow the "[Service] Classes in Portland, OR | Harbinger MMA" pattern, including `/classes/muay-thai/`. Dedicated service pages exist for MMA, BJJ, boxing, conditioning, judo, Muay Thai and wrestling. Dedicated service pages are the top local organic factor.
- Each class page has an enquiry form, plus a coaches directory and a pricing page.

## NAP comparison

| Source | Name | Address | Phone |
|---|---|---|---|
| New site footer | Harbinger MMA (footer copyright says "HARBINGER MMA PORTLAND") | 2626 S Corbett Ave, Portland, OR 97201 | (503) 310-5001, `tel:5033105001` |
| New site JSON-LD | Harbinger MMA | 2626 S Corbett Ave, Portland, OR 97201 | +1-503-310-5001 |
| Old site www.harbingermma.com footer | Harbinger MMA | "2626 S Corbett Ave, Portland, or" (lowercase "or", no ZIP) | (503) 310-5001 |
| Old site /contact | Harbinger MMA | 2626 S Corbett Ave, Portland, OR (no ZIP) | (503) 310-5001 |
| Old site JSON-LD | none found (no ld+json on old homepage) | n/a | n/a |
| Old site Maps link (maps.app.goo.gl/1yzngGb75pV8QU3r6) | resolves to a plain address pin, not a business | 2626 S Corbett Ave, Portland, OR 97201, coordinates 45.50404, -122.67533 | n/a |
| Yelp (search snippet only) | "Harbinger MMA", 3.8 stars (6 reviews), "South Portland" | not verified; Yelp page blocked (403/stub) | not verified |
| Facebook (search snippet) | "Harbingermma", 59 likes | not verified | not verified |

Result: no discrepancies found between the new site and the old site. Only cosmetic differences: the old site has "or" in lowercase and no ZIP, and its email link adds `?subject=From Website`. Nothing found on Yelp or Facebook contradicts the NAP, but I could not read their address or phone fields, so treat citation consistency as unverified.

## Findings

### 1. High: No Google Maps link, embed or directions link on the new site
- Evidence: the new homepage has zero `<iframe>`, no `maps.app.goo.gl` or `google.com/maps` URL, and the address in `src/components/Footer.astro` (line ~18) is plain text. The old site did link the footer address to the Maps short link, so this is a regression at launch.
- Recommendation: link the footer address to the real GBP listing (use the `https://www.google.com/maps/place/...` or CID URL for the business, not the bare address pin). Add a lazy-loaded Maps embed and a "Get directions" link on the new /contact page and the homepage. Add `hasMap` to the schema.
- Source file: `src/components/Footer.astro`, `src/lib/schema.ts`.
- How we'd know it failed: `curl -s <page> | grep -c "google.com/maps"` returns 0.

### 2. High: /contact, /about and /apply have no new equivalent; no dedicated address and hours page
- Evidence: the old site has /contact with phone, email, address, social links and FAQs. The new site only shows these in the footer. A contact page is the natural landing page for GBP "website" and for "[gym] near me" queries. No `_redirects` exists, so /contact will 404 at cutover.
- Recommendation: build `src/pages/contact.astro` with NAP, hours, Maps embed, parking and transit directions, and a visible form. Add `ContactPage`-style content and breadcrumbs. Add 301s from /contact, /about and /apply (via `public/_redirects` or `netlify.toml`).
- How we'd know it failed: `curl -I https://harbingermma.com/contact` returns 404 after launch; Search Console shows crawl errors.

### 3. High: Schema lacks geo, openingHoursSpecification, hasMap and areaServed
- Evidence: the JSON-LD (`src/lib/schema.ts`) has no `geo`, `openingHoursSpecification`, `hasMap`, `areaServed` or `image`/`logo`. Hours exist in the footer but not in schema, so they are not machine-readable.
- Recommendation: add `geo` with 5-decimal precision (the Maps pin resolves to about 45.50404, -122.67533; verify against the GBP pin), `openingHoursSpecification` for Mon-Fri 08:00-21:30, Sat 09:00-12:30, Sun 10:00-15:30 (mirror the `hours` array in Footer.astro so there is one source of truth), `hasMap`, `image`, `logo`, and `areaServed`. Add GBP and Yelp URLs to `sameAs`. Consider `department`/`makesOffer` for class types only if kept accurate.
- How we'd know it failed: the Rich Results Test or Schema validator shows none of these properties; footer and schema hours diverge.

### 4. High: GBP linkage and review signals are absent on the page
- Evidence: no review widget, no testimonial section, no `aggregateRating`, no "leave a review" link. Yelp reportedly shows 3.8 stars from 6 reviews, a weak and thin profile. Google review count and rating could not be read.
- Recommendation: add a short "Reviews" section with a Google review link (`g.page/r/...` write-review URL) and genuine, attributed testimonials. Only add `aggregateRating` to schema if it reflects reviews visible on the page (Google's self-serving review policy for LocalBusiness means it may not earn stars; do not mark up fabricated numbers). Start a review-velocity routine (ask at the post-trial-class follow-up).
- Source file: `src/pages/index.astro`, new component, `src/lib/schema.ts`.
- How we'd know it failed: still no review mentions after launch; Google review count stalls.

### 5. Medium: Local landing-page strategy is "Portland"-only; no neighborhood or intent depth
- Evidence: titles and H1s target "[Discipline] Classes in Portland, OR" (e.g. `/classes/muay-thai/` is "Muay Thai Classes in Portland, OR"), which is good. The Muay Thai page has about 250 words of generic discipline description (what Muay Thai is) with no local detail: no location, coaches, class times, pricing, or beginner info, and no mention of the SE/Buckman/Central Eastside area. The old site's class-type pages (/class-types/*) have no equivalent redirects either.
- Recommendation: do not create doorway pages for neighborhoods (single location). Instead add unique local content to each class page: the coach (e.g. Nick on Muay Thai), schedule slots from the schedule data, price range, "beginner friendly" FAQ, address plus a short "Find us" block ("SE Portland, near Buckman / Central Eastside", parking, bus/bike access), and `FAQPage`-style visible Q&A. Add internal links from class pages to the coach pages and /schedule/, /pricing/. Add 1-2 genuine content pages such as "MMA gym near Southeast Portland" only if real unique value exists. Check the neighborhood naming with the owner (the Yelp snippet said "South Portland"; Google tags usually use Buckman / Central Eastside).
- Source file: `src/pages/classes/*.astro` (or the data driving them).
- How we'd know it failed: class pages rank below Yelp for "[discipline] Portland"; impressions show page 2+ for these terms after 8-12 weeks.

### 6. Medium: Apex vs www and NAP URL consistency at cutover
- Evidence: the live site resolves to `https://www.harbingermma.com/`; the new site canonicalizes and puts `url`/`@id` on apex `https://harbingermma.com/`. GBP's website field, Yelp, Facebook and other citations almost certainly point to the www URL.
- Recommendation: choose one host and make GBP/citations/redirects agree (either set `site` to `https://www.harbingermma.com` in `astro.config.mjs` or update GBP and listings to apex and 301 www to apex). Verify the GBP website URL after launch and add UTM-free landing URL.
- How we'd know it failed: GBP website URL, canonical and 301 target differ; Search Console reports "alternate page with proper canonical" for the live host.

### 7. Medium: Maps link on old site targets an address pin, not the GBP entity
- Evidence: `maps.app.goo.gl/1yzngGb75pV8QU3r6` redirects to `/maps/place/2626+S+Corbett+Ave...` (feature ID 0x54950a6b...:0x236baa97ec54c285), no business name or reviews panel. Visitors don't land on the gym's profile with reviews, photos and hours.
- Recommendation: replace with the GBP "Share" URL or CID link.

### 8. Low: Name variants
- Evidence: footer says "HARBINGER MMA PORTLAND"; title tags use "Harbinger MMA" and coach pages use "Harbinger MMA Portland"; Facebook is "Harbingermma". Schema name is "Harbinger MMA".
- Recommendation: keep the legal/GBP name "Harbinger MMA" everywhere in NAP contexts; use "Portland" only as a descriptor.

### 9. Low: Staging duplicate indexing risk
- Evidence: no `noindex` on `*.netlify.app`; the staging site shows the same NAP. Add `X-Robots-Tag: noindex` for the netlify.app host (or a Netlify password/branch setting) until launch, so Google/Yelp don't associate the staging domain.
- Source file: `public/_headers` or `netlify.toml` (conditional on host/context).

### 10. Info: Proximity and unverifiable factors
- Proximity is the largest ranking variance factor (55.2%, Search Atlas) and cannot be controlled by on-site work. GBP primary category (the #1 factor) was not verifiable here; confirm it is "Mixed Martial Arts Club" or "Martial Arts School" matching the main service, with secondary categories for Boxing Gym, Brazilian Jiu-Jitsu Club, Muay Thai Boxing Gym, Judo School, Wrestling School.

## Top actions (priority order)
1. Critical/High: build /contact with NAP, hours, Maps embed, directions; 301 /contact, /about, /apply.
2. High: link footer address to the real GBP URL; add `hasMap`.
3. High: add `geo`, `openingHoursSpecification`, `areaServed`, `image`, GBP/Yelp in `sameAs` to schema.
4. High: add review section, Google review link, and a review-request routine.
5. High/Medium: resolve www vs apex and align GBP website URL.
6. Medium: enrich class pages with unique local content, coach, times, price and FAQs; internal links.
7. Medium: verify GBP primary category, hours, attributes, photos and posts.
8. Medium: claim/clean up Yelp, Apple Business Connect, Bing Places, BBB and Facebook; match NAP exactly.
9. Low: standardize name and address formatting (OR casing, ZIP) on all listings.
10. Low: noindex the netlify.app host.

## Limitations
- No DataForSEO, GBP API or Search Console access. Google rating, review count, categories, photos, posts and response rate were not read. Yelp returned a block page to direct fetch; the 3.8 / 6 reviews figure comes from a search-engine snippet and may be stale. Facebook, Apple, Bing, BBB listings were not verified. Local pack rankings, citation counts and backlinks were not measured.
