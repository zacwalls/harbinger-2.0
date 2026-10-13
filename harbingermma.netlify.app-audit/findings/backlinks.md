# Backlink profile / migration safety (harbingermma.com, www.harbingermma.com)

Tier 0 only (Common Crawl + live checks). No Moz/Bing/DataForSEO. Audited 2026-10-12.

**Score: INSUFFICIENT DATA** (0 of 7 scoring factors have data; no numeric score is given on purpose).

## What works
- Production host is simple: apex 301s to https://www.harbingermma.com/ (live check). Only one hostname to map.
- Old Webflow URL set is small and fully enumerable (~30 URLs, listed below), so a complete redirect map is cheap.
- Wayback CDX (approximate, not authoritative) shows only the root, the same Webflow pages and 3 /products/ URLs. No evidence of a large legacy URL footprint.

## Source results
| Source | Result |
|---|---|
| Common Crawl web graph (release cc-main-2026-jan-feb-mar, confidence 0.50) | harbingermma.com and www: NOT in crawl, NOT in rankings. No PageRank/harmonic centrality. This means no measurable link equity in the graph; it does NOT prove zero links. |
| Referring domains, anchors, spam, velocity, follow ratio, geo | No data source (needs Moz/Bing/DataForSEO). Skipped. |
| Per-URL external link evidence | Not obtainable from free sources. Which old URLs have external links is UNKNOWN. |

## Findings

### 1. High: No per-URL link data, so redirect scope must assume every old URL is linked
- Evidence: CC has no entry; no Moz/Bing key. Likely-linked URLs for a local gym are the homepage, /about, /coaches, /class-types/*, /contact, /apply, plus Google Business Profile / Instagram / directory listings which point at the root or /contact.
- Recommendation: 301 every old URL below (cheap). Free way to get real data before launch: verify harbingermma.com in Bing Webmaster Tools (Inbound Links report) and Google Search Console (Links > Top linked pages), both free for an owned domain. Also check Google Business Profile, Yelp, Facebook, Instagram bio, Mindbody/other listings for the website URL they use (likely `https://harbingermma.com/` or `www`).
- Source file to change: new file `/Users/zach/Documents/harbinger-2.0/public/_redirects` (or `netlify.toml` `[[redirects]]`). Neither exists today.
- How we'd know it failed: after launch, `curl -sIL` each old URL returns 404, or GSC "Not found (404)" lists these paths.

### 2. High: Old URLs without a new equivalent (all 200 on live Webflow, verified)
Live old URL (www) -> suggested 301 target on new site (note trailingSlash "always"):
- /about -> /  (or a new About page)
- /contact -> /schedule/ or / (no contact page; decide)
- /apply -> /pricing/ (or build the page; it is a conversion page)
- /coaches -> /coaches/ (same path, only slash differs)
- /class-types/all -> /classes/ ; /class-types/bjj -> /classes/bjj/ ; /class-types/mma -> /classes/ ; /class-types/striking -> /classes/muay-thai/ (or boxing) ; /class-types/conditioning -> /classes/conditioning/ ; /class-types/yoga -> /classes/
- /announcements/schedule-changes -> /schedule/
- /privacy-policy, /liability-waiver, /minor-liability-waiver, /minor-competition-release-waiver -> keep pages at same paths (legal/waiver links may be in emailed forms and old signups), do not redirect to home
- /collections/{apparel,accessories,equipment} and /products/{competition-gloves,harbinger-mma-hand-wraps-5m,shin-guards} (found live and in Wayback; the latter are NOT in AUDIT-CONTEXT) -> https://shop.harbingermma.com/ (external redirect; map to specific shop collections if the slugs exist)
- Evidence: HTTP status checks and homepage/class-types hrefs on live www site, plus Wayback CDX.
- Source file to change: public/_redirects (new).
- Failure check: `for p in ...; do curl -sIL https://harbingermma.com$p | grep -E 'HTTP|location'; done` must end in 200 on a relevant page, with one hop.

### 3. High: Path collisions. Old URLs that already redirect, and new URLs that reuse old paths
- Live old site: /schedule 301 -> /class-types/all (a Webflow redirect), and /classes 301 -> /coaching (returns 200; an old Webflow page not linked from nav, so /coaching should also be redirected, likely to /coaches/ or /classes/). The new site publishes real /schedule/ and /classes/ pages. Any external link to old /schedule or /classes currently lands on the Webflow redirect target; after launch it will land on the new page, which is arguably better, but verify that no stale Webflow-level redirect remains and that these paths do not get redirected away by the DNS cut-over setup.
- Old /pricing is 404 on live; new /pricing/ is net new. No action.
- Old /coaches/{eli,...} are 404 live (no old coach detail pages), so no redirects needed for the 7 new coach pages.

### 4. Medium: Apex vs www host mismatch
- Live canonical host is www; new site canonicals/sitemap use apex (astro.config.mjs `site`). External links in the wild almost certainly use www (and some apex via the 301). At launch, one host must 301 to the other for ALL paths, preserving the path. Current apex->www redirect is Cloudflare/Webflow; after cutover this must be configured on Netlify (domain settings set primary domain, or `_redirects` host rule `https://www.harbingermma.com/* https://harbingermma.com/:splat 301!`).
- Source file: astro.config.mjs `site` (keep apex) plus Netlify primary-domain setting / public/_redirects.
- Failure check: `curl -sIL https://www.harbingermma.com/about` ends at one canonical host with 200, max 2 hops, no chain through /about then /about/.

### 5. Medium: Trailing-slash chains
- trailingSlash "always" means old slashless URLs will redirect via a slash 301 and then to the final target if redirects are written naively. Write redirect rules for both `/about` and `/about/`, pointing directly at the final URL.
- Failure check: any old URL needing more than one hop.

### 6. Low: Subdomain
- shop.harbingermma.com is separate (out of scope) and has its own Wayback footprint. Do not alter its DNS during cutover. Keep CNAME records for it.

## Not assessed (no data)
Referring domain count, domain quality, anchor naturalness, toxicity, velocity, follow ratio, geography. Recommend Bing Webmaster Tools / GSC (free) or Moz free API key to complete.
