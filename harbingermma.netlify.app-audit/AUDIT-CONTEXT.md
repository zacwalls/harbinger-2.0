# Audit context (shared by all specialist agents)

- **Audit target:** https://harbingermma.netlify.app/ (staging deploy of a redesign)
- **Production domain:** harbingermma.com. It is still served by the OLD Webflow site
  (Cloudflare, `x-wf-region`), and `harbingermma.com` 301s to `https://www.harbingermma.com/`.
  The new Astro site has not launched on the production domain yet. This is a **pre-launch audit**.
- **Business:** Harbinger MMA, a local MMA / martial arts gym in Portland, OR (Local Service,
  brick-and-mortar). Phone on old site: (503) 310-5001. Email: contact@harbingermma.com.
  Merch store is at shop.harbingermma.com (separate, out of scope).
- **Source code:** /Users/zach/Documents/harbinger-2.0 (Astro 5 static output, Tailwind, Preact,
  `@astrojs/sitemap`, Netlify adapter). Pages are in `src/pages/`. `src/pages/robots.txt.ts`
  generates robots.txt. `astro.config.mjs` sets `site` to `https://harbingermma.com`
  (apex, no www) and `trailingSlash: "always"`. Recommendations should name the source file to change.
  **Do not modify the source repo.** Only write inside the audit output directory.

## Known facts (already verified, do not re-derive)

- All 18 pages return 200. Canonicals, sitemap `<loc>`s and the robots.txt `Sitemap:` line all
  point at `https://harbingermma.com/...` (apex). That is intentional for staging, so do not flag
  "canonical points to another domain" as a staging bug. DO consider apex vs. www: the live
  domain currently resolves to www, while the new site canonicalizes to apex.
- The staging site has no `noindex`, so `*.netlify.app` could be indexed as a duplicate.
- No `og:` or `twitter:` meta tags on any page.
- Every page has one JSON-LD block of `@type` `ExerciseGym`.
- Unknown paths 301 to the trailing-slash version, then 404.
- Old Webflow URLs with no new equivalent yet: /about, /apply, /contact, /privacy-policy,
  /liability-waiver, /minor-liability-waiver, /minor-competition-release-waiver,
  /announcements/schedule-changes, /class-types/all, /class-types/{bjj,conditioning,mma,striking,yoga},
  /collections/{apparel,accessories,equipment}. The new site has no `_redirects` or `netlify.toml`.
- No Google, Matomo or DataForSEO credentials; no drift baseline.

## Page inventory (from sitemap) with on-page basics

See `crawl.jsonl` in this directory (title, meta description, canonical, h1s, JSON-LD types,
word count, image count, images missing alt) and `homepage-render.json` (full homepage HTML).

Pages: /, /classes/, /classes/{bjj,boxing,conditioning,judo,muay-thai,wrestling}/, /coaches/,
/coaches/{eli,g,jake,jerilyn,mack,mitch,nick}/, /pricing/, /schedule/

## Output contract

- Output dir: /Users/zach/Documents/harbinger-2.0/harbingermma.netlify.app-audit
- Write your findings to `findings/<your-category>.md`: a 0-100 category score, "What works",
  then findings, each with severity (Critical/High/Medium/Low/Info), evidence, recommendation,
  the source file to change, and a "how we'd know it failed" check.
- Save screenshots (if any) under `screenshots/`.
- Your final reply to the orchestrator: under 350 words, with the score and the top findings by severity.
