# Sitemap audit: harbingermma.netlify.app

**Category score: 74/100**

Checked 2026-10-12. The index and sitemap-0.xml were fetched live from staging.

## What works
- `/sitemap-index.xml` and `/sitemap-0.xml` return 200 with `application/xml`. The XML is valid.
- The index lists one child sitemap. There are 18 URLs, far under the 50,000 URL / 50MB limits.
- All 18 `<loc>` values are absolute, use https and have a trailing slash. This matches `trailingSlash: "always"`.
- Every sitemap URL returns 200 (verified in AUDIT-CONTEXT). None are noindexed or redirected.
- The sitemap has no deprecated `priority` or `changefreq` tags.
- There are no location-page quality-gate issues: 18 pages, none of them programmatic city pages.
- Every page that the nav links to is in the sitemap.

## Findings

### 1. Medium: Footer links to `/classes/mma/`, which 404s and is not in the sitemap
- Evidence: `src/components/Footer.astro:25` has `<a href="/classes/mma/">MMA</a>`. The footer is on every page, and `https://harbingermma.netlify.app/classes/mma/` returns 404. The sitemap correctly omits it. No MMA page exists in `src/pages/classes/[slug].astro`'s generated set, which covers bjj, boxing, conditioning, judo, muay-thai and wrestling.
- Impact: this is a sitewide broken internal link and a crawl-budget and quality signal. The old Webflow site had `/class-types/mma`, so users and links will expect an MMA page.
- Recommendation: either create the MMA class entry so it gets generated and added to the sitemap automatically, or remove the footer link.
- Source files: `src/components/Footer.astro`, and the class data source that feeds `src/pages/classes/[slug].astro`.
- How we'd know it failed: a crawl of the live site finds any internal link with a 404 status. `curl -sI /classes/mma/` should return 200, or no page should link to it.

### 2. Medium: Apex vs www mismatch between the sitemap and the live domain
- Evidence: `site` in `astro.config.mjs` is `https://harbingermma.com` (apex). Live `harbingermma.com` 301s to `https://www.harbingermma.com/`, so www is the current canonical host. All 18 sitemap `<loc>` values, the canonicals and the robots `Sitemap:` line use the apex.
- Impact: if the new site launches on www while the sitemap says apex, Google sees sitemap and canonical URLs that redirect. Search Console property verification will also not match the www property. If the apex becomes primary, every old www URL needs a redirect.
- Recommendation: pick one host before launch and make Netlify serve a 301 from the other host to it. Apex is fine if DNS and redirects are set so that www 301s to apex. Keep `site` consistent with that choice. Preserving www avoids a host change for existing rankings, but changing the host is acceptable with correct 301s. Submit the sitemap under the matching Search Console property.
- Source files: `astro.config.mjs` (`site`), plus a new `netlify.toml` or `public/_redirects` for host and path redirects.
- How we'd know it failed: after launch, `curl -sIL` on any sitemap `<loc>` shows a redirect, or Search Console shows "Page with redirect" for sitemap URLs.

### 3. Medium: Staging exposes a production-domain sitemap and an `Allow: /` robots.txt
- Evidence: the staging deploy at netlify.app serves `Allow: /` plus `Sitemap: https://harbingermma.com/sitemap-index.xml`. The netlify.app sitemap-index points at `https://harbingermma.com/sitemap-0.xml`. The `isStaging` switch in `astro.config.mjs` is keyed on `NODE_ENV === "staging"`, and that is set only in `.github/workflows/astro.yml` for the GitHub Pages build. The Netlify build does not set it, so it builds with the production `site`. The robots.txt logic in `src/pages/robots.txt.ts` checks the configured `site` hostname, not the request host, so the Netlify build gets the production branch.
- Judgment: staging should not expose a production-domain sitemap. Today `harbingermma.com/sitemap-index.xml` redirects to www and 404s (Webflow has no sitemap at that path), and `www.harbingermma.com/sitemap.xml` also 404s. So the sitemap currently resolves only on netlify.app and points at URLs that are not the new site. Crawlers that find the staging robots.txt could submit or follow cross-host sitemap entries. Google ignores sitemap URLs on a host other than the one that hosts the file unless the other host is verified, so it is mostly harmless, but it is wasted signal and risks duplicate indexing of netlify.app (staging has no noindex, see AUDIT-CONTEXT).
- Recommendation: for non-production builds, serve `Disallow: /` and no `Sitemap:` line, and add `X-Robots-Tag: noindex` or a meta noindex. Either set a Netlify context variable (for example `CONTEXT !== "production"`) to switch `site` and robots, or have `robots.txt.ts` read an explicit env flag. At launch, the production domain should serve the sitemap on its own host. You could skip generating the sitemap in staging by making the `sitemap()` integration conditional.
- Source files: `astro.config.mjs`, `src/pages/robots.txt.ts`, `netlify.toml` (new, for headers and build env).
- How we'd know it failed: `curl https://harbingermma.netlify.app/robots.txt` still shows `Allow: /` or a `Sitemap:` line on a non-production host. Or `site:harbingermma.netlify.app` returns results.

### 4. Low: No `<lastmod>` on any URL
- Evidence: `@astrojs/sitemap` is configured with no options, so the output has zero `<lastmod>` tags.
- Impact: Google uses lastmod only when it is accurate. Omitting it is better than a fake date, so this is low severity. For a small 18-page site the loss is minor, but schedule and pricing change often and would benefit.
- Recommendation: use the integration's `serialize` hook to set `lastmod` from real content dates, such as a git commit date or a date in the coach and class data, for `/schedule/` and `/pricing/`. Do not set `new Date()` at build time for every page, because identical dates on every deploy teach Google to ignore it.
- Source file: `astro.config.mjs` (`sitemap({ serialize })`).
- How we'd know it failed: all lastmod values are identical or change on every deploy while the content has not changed.

### 5. Low: Sitemap carries unused namespaces, and the build includes the `base` setting
- Evidence: `sitemap-0.xml` declares news, xhtml, image and video namespaces that are never used. This is the harmless default. Separately, `base: "/harbinger-2.0/"` is applied only when `NODE_ENV=staging`. If the Netlify build were ever switched to staging mode, all sitemap `<loc>` values would carry the `/harbinger-2.0/` prefix, which does not match the Netlify routes.
- Recommendation: leave the namespaces. Make sure staging-mode config is used only by the GitHub Pages workflow, or split the GitHub Pages and Netlify config explicitly.
- Source files: `astro.config.mjs`, `.github/workflows/astro.yml`.
- How we'd know it failed: a sitemap `<loc>` contains `/harbinger-2.0/`.

### 6. Info: Sitemap vs old Webflow URL coverage
- Old URLs with no new equivalent (/about, /apply, /contact, /privacy-policy, the three waivers, /announcements/schedule-changes, /class-types/*, /collections/*) are not in the sitemap, which is correct because the pages do not exist. They need 301s at launch (no `_redirects` or `netlify.toml` exists yet). The old `/class-types/mma` fits Finding 1. Once the legal and contact pages are built, they will be added to the sitemap automatically.
- Coverage vs internal links: the nav and footer link to 17 of the 18 sitemap pages plus the broken `/classes/mma/`. The coach pages for mack, mitch, nick, jerilyn and g are in the sitemap and reachable via `/coaches/`. There are no orphan sitemap URLs found in the sampled pages.

## Pass/fail summary
| Check | Result |
|---|---|
| Valid XML | Pass |
| Size limits | Pass (18 URLs) |
| URL status 200 | Pass |
| Noindex or redirects in sitemap | Pass |
| Deprecated tags | Pass (none) |
| lastmod | Fail (absent, low) |
| Crawl vs sitemap coverage | Fail (broken `/classes/mma/` link) |
| Host consistency | Needs decision (apex vs www) |
| Staging isolation | Fail |
