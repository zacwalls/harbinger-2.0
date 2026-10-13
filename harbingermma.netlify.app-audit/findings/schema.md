# Schema / Structured Data findings

**Category score: 72/100** (valid and honest base; missing local-business signals and a few page-level properties)

Source of truth: `src/lib/schema.ts` (`siteGraph`, `breadcrumbs`), injected by `src/layouts/Layout.astro` as a single `@graph` per page via the `schema` prop. Page-specific nodes come from `src/pages/pricing.astro`, `src/pages/coaches/[slug].astro`, `src/pages/classes/[slug].astro`.

Note: `crawl.jsonl` reports only `ExerciseGym` per page (it read the first node). The live HTML (fetched 2026-10-12) actually carries a fuller graph per page: ExerciseGym + WebSite everywhere, plus Offer catalog (pricing), ProfilePage/Person + BreadcrumbList (coaches), Service + BreadcrumbList (classes). Home, /classes/, /coaches/, /schedule/ have only the sitewide pair.

## What works
- `@context` is `https://schema.org`, JSON-LD only, one block per page, valid JSON, absolute URLs.
- `@id` (`https://harbingermma.com/#gym`) and `url` use the apex, matching canonical and `astro.config.mjs` `site`. Built from `Astro.site`, so staging and production stay consistent.
- NAP matches visible footer: 2626 S Corbett Ave, Portland OR 97201; tel +1-503-310-5001 (footer `tel:5033105001`); contact@harbingermma.com.
- `sameAs` (Instagram, Facebook, TikTok) all match footer links and return 200.
- WebSite node publishes via `@id` reference to the gym; coach `worksFor` and class `provider` reference the gym `@id` correctly. Good entity linking.
- ProfilePage with Person on coaches, Service on classes, BreadcrumbList on both. Pricing uses Offer/UnitPriceSpecification with correct prices ($105 MON, $99 MON, $297 total, $18 DAY, $75 initiation).
- No HowTo, no FAQPage, no deprecated types, no placeholder text.

## Findings

### 1. Medium: No openingHoursSpecification
- Evidence: hours exist in `src/components/Footer.astro` (Mon-Fri 8 AM-9:30 PM, Sat 9-12:30, Sun 10-3:30) but are absent from JSON-LD.
- Recommendation: add `openingHoursSpecification` (see block A). Drive it from the same `hours` constant to avoid drift.
- File: `src/lib/schema.ts` (share data with `Footer.astro`).
- Fails if: the Rich Results/Schema validator shows no `openingHoursSpecification` on ExerciseGym, or schema hours differ from footer.

### 2. Medium: No geo / hasMap
- Evidence: address only. Recommendation: add `geo` and `hasMap`. Coordinates below are approximate from the street address; verify against the Google Business Profile pin before shipping.
- File: `src/lib/schema.ts`.
- Fails if: `geo` missing on the ExerciseGym node.

### 3. Medium: No image or logo on the gym entity
- Evidence: no `image`, `logo`. Google's LocalBusiness guidance recommends `image`. `src/assets/harbinger-logo-complex.svg` and `NavLogo.svg` are SVG; use a PNG/JPG (min 112x112, ideally square 512+) in `public/` for `logo`, and the hero image (`src/assets/hero-image.jpg`, via `getImage`) for `image`.
- File: `src/lib/schema.ts` (needs an absolute URL; resolve with `new URL(path, site)`).
- Fails if: no `logo`/`image` in the node.

### 4. Medium: Pricing page emits a second, partial ExerciseGym node with the same `@id`
- Evidence: `pricing.astro` adds `{"@type":"ExerciseGym","@id":".../#gym","hasOfferCatalog":...}` alongside the full node. Parsers merge same-`@id` nodes, but some validators and consumers treat them as duplicates, and Google's tool lists two entities.
- Recommendation: make the pricing node an `OfferCatalog` (or `WebPage` with `mainEntity`) and reference it from the gym via `@id`; see block D. The initiation fee is better expressed as a separate Offer than as a PriceSpecification nested in each offer (consumers may read it as an alternative price).
- File: `src/pages/pricing.astro`.
- Fails if: the page's graph contains more than one node with `@id` ending `#gym`.

### 5. Low: Service nodes are thin
- Evidence: Service has name, serviceType, description, provider only. Add `@id`, `url`, `areaServed` (Portland), `audience`/`offers` linking to the membership catalog, and tie into `hasOfferCatalog`. Use Service (not Course): classes are ongoing drop-in/membership training, not a structured course with Course rich-result eligibility.
- File: `src/pages/classes/[slug].astro`. Block C.

### 6. Low: Person/ProfilePage missing recommended properties
- Evidence: no `@id`, `url`, `dateModified`/`dateCreated` (Google ProfilePage recommends), no `sameAs` for coaches. Person has no `url`. Add stable `@id` and `url` of the page; add `dateModified` (use content file mtime or a frontmatter field). Add `sameAs` only if the site displays coach social links.
- File: `src/pages/coaches/[slug].astro`. Block B.

### 7. Low: Listing/home pages lack BreadcrumbList and page-level nodes
- Evidence: `/classes/`, `/coaches/`, `/pricing/`, `/schedule/` have no BreadcrumbList; home has none (acceptable). Add Home > X breadcrumbs for the four hub pages, and optionally `CollectionPage` + `ItemList` on /classes/ and /coaches/.
- File: `src/pages/classes.astro`, `coaches.astro`, `pricing.astro`, `schedule.astro`. Block E.

### 8. Low: Apex vs www at launch
- Evidence: production currently 301s apex to `https://www.harbingermma.com/`. Every `@id`, `url`, breadcrumb `item`, and ProfilePage image is apex. If DNS at launch leaves www as the served host, schema entity URLs will contradict the served host.
- Recommendation: at cutover, 301 www to apex (Netlify domain settings) and keep `site` as is. Also update sameAs-style external listings (GBP, social bios, directories) to apex.
- Fails if: `curl -sI https://www.harbingermma.com/` does not 301 to the apex after launch.

### 9. Low: `priceRange` is a free-text field that excludes the $75 initiation fee
- `"$18-$105"` is fine and consistent with the offers. Keep, but update if prices change; consider generating it from the pricing data used in `pricing.astro`.

### 10. Info: Footer links `/classes/mma/` but no MMA class page exists
- Not a schema bug, but no Service schema can exist for MMA, the homepage's primary keyword. Create `src/data/classes/mma.json` and the page will get schema automatically.

### 11. Info: FAQPage / HowTo
- None present. Do not add HowTo (removed). FAQPage has no Google SERP benefit since May 2026; skip unless you accept unconfirmed AI visibility benefit.

### 12. Info: Schedule markup
- 52 weekly sessions in `src/data/schedule.json`. No Google feature exists for recurring class schedules; Event markup is inappropriate for ongoing weekly classes. No schema recommended.

### 13. Info: Staging
- `*.netlify.app` has no noindex (`isProduction` only checks `harbingermma.com`). Staging JSON-LD already points to the apex, so duplicate-entity risk is low, but see the technical findings on noindex.

## Ready-to-paste JSON-LD

### A. Gym node additions (`siteGraph` in `src/lib/schema.ts`)
Add inside the ExerciseGym object. Replace geo with verified values and the logo/image with real assets (`new URL("/logo.png", site).href`).
```json
{
  "logo": "https://harbingermma.com/logo.png",
  "image": "https://harbingermma.com/og/hero.jpg",
  "hasMap": "https://www.google.com/maps/search/?api=1&query=2626+S+Corbett+Ave+Portland+OR+97201",
  "geo": { "@type": "GeoCoordinates", "latitude": 45.4975, "longitude": -122.6758 },
  "areaServed": { "@type": "City", "name": "Portland" },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "21:30" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "12:30" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "10:00", "closes": "15:30" }
  ]
}
```
Also add `"@id": ".../#website"` link back: `"mainEntity"` not needed; WebSite already references publisher. Optionally add `"inLanguage": "en-US"` to WebSite.

### B. Coach page (`src/pages/coaches/[slug].astro`)
```json
{
  "@type": "ProfilePage",
  "@id": "https://harbingermma.com/coaches/eli/#profile",
  "url": "https://harbingermma.com/coaches/eli/",
  "name": "Eli, Head Grappling Coach | Harbinger MMA Portland",
  "dateModified": "2026-10-01",
  "isPartOf": { "@id": "https://harbingermma.com/#website" },
  "mainEntity": {
    "@type": "Person",
    "@id": "https://harbingermma.com/coaches/eli/#person",
    "name": "Eli",
    "url": "https://harbingermma.com/coaches/eli/",
    "jobTitle": "Head Grappling Coach",
    "description": "Eli is a world-class coach with extensive experience in professional combat sports.",
    "knowsAbout": ["Grappling", "MMA"],
    "image": "https://harbingermma.com/_astro/eli-headshot.webp",
    "worksFor": { "@id": "https://harbingermma.com/#gym" }
  }
}
```
Template change: add `@id`/`url`/`isPartOf` using `new URL(\`/coaches/${coach.id}/\`, site).href`, and `dateModified` from a new optional field in `src/content.config.ts` or file mtime.

### C. Class page (`src/pages/classes/[slug].astro`), BJJ example
```json
{
  "@type": "Service",
  "@id": "https://harbingermma.com/classes/bjj/#service",
  "url": "https://harbingermma.com/classes/bjj/",
  "name": "BJJ",
  "serviceType": "Brazilian Jiu-Jitsu classes",
  "description": "Learn to control, submit, and dominate opponents on the ground.",
  "provider": { "@id": "https://harbingermma.com/#gym" },
  "areaServed": { "@type": "City", "name": "Portland" },
  "offers": { "@id": "https://harbingermma.com/pricing/#memberships" }
}
```
(`serviceType` should be human-readable, e.g. "Brazilian Jiu-Jitsu classes"; currently set to the title only. Add an optional `serviceType` field to the class JSON or use `${title} classes`.)

### D. Pricing page (`src/pages/pricing.astro`): replace the second ExerciseGym node
```json
[
  {
    "@type": "OfferCatalog",
    "@id": "https://harbingermma.com/pricing/#memberships",
    "name": "Memberships",
    "url": "https://harbingermma.com/pricing/",
    "itemListElement": [
      { "@type": "Offer", "name": "Month-to-Month", "description": "Unlimited access with no long-term commitment. One-time $75 initiation fee.", "url": "https://harbingermma.com/pricing/", "priceCurrency": "USD", "price": 105,
        "priceSpecification": { "@type": "UnitPriceSpecification", "price": 105, "priceCurrency": "USD", "unitCode": "MON" },
        "seller": { "@id": "https://harbingermma.com/#gym" } },
      { "@type": "Offer", "name": "3-Month Pass", "description": "Best-value option for consistent training. $297 total for 3 months. One-time $75 initiation fee.", "url": "https://harbingermma.com/pricing/", "priceCurrency": "USD", "price": 297,
        "seller": { "@id": "https://harbingermma.com/#gym" } },
      { "@type": "Offer", "name": "Day Pass", "description": "A flexible one-day option for visitors and drop-ins.", "url": "https://harbingermma.com/pricing/", "priceCurrency": "USD", "price": 18,
        "seller": { "@id": "https://harbingermma.com/#gym" } }
    ]
  },
  { "@type": "ExerciseGym", "@id": "https://harbingermma.com/#gym", "hasOfferCatalog": { "@id": "https://harbingermma.com/pricing/#memberships" } }
]
```
Simplest compliant option: drop the second ExerciseGym and add `hasOfferCatalog: { "@id": ... }` to the node in `siteGraph` only on the pricing page (pass a flag), or keep the stub but accept the merge. Verify the visible page states the same $105/$99/$18/$75 values before publishing; keep markup equal to visible content.

### E. Breadcrumbs for hub pages
Call `breadcrumbs(site, [{name:"Home",path:"/"},{name:"Pricing",path:"/pricing/"}])` in `pricing.astro`, `schedule.astro`, `classes.astro`, `coaches.astro` (pass as `schema={[...]}`). Output:
```json
{ "@type": "BreadcrumbList", "itemListElement": [
  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://harbingermma.com/" },
  { "@type": "ListItem", "position": 2, "name": "Pricing", "item": "https://harbingermma.com/pricing/" } ] }
```
Optionally give breadcrumb nodes an `@id` (`<page url>#breadcrumb`).

## Validation commands (how we'd know it failed, in general)
- `curl -s <url> | grep -o 'ld+json">.*</script>'` and parse with `python3 -m json.tool`: must be valid JSON, one `#gym` node per page.
- Rich Results Test and validator.schema.org on /, /pricing/, /coaches/eli/, /classes/bjj/ after the production cutover: zero errors; warnings only for optional fields.
