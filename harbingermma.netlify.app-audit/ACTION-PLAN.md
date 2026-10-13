# Harbinger MMA — Action Plan

Ordered by dependency, not just severity. Each item lists how you'd know it failed (**Fail check**) and what to monitor without re-running the audit (**Watch**). File paths are relative to the repo root.

---

## Phase 0: Before DNS cutover (launch blockers)

| # | Action | Files | Fail check | Watch |
|---|---|---|---|---|
| 0.1 | **Choose the apex host** (it's already in code). In Netlify, add harbingermma.com and www, set the apex as primary, and move DNS off Webflow/Cloudflare. Keep shop.harbingermma.com's DNS record untouched. | Netlify domain settings; `astro.config.mjs` (`site`) unchanged | `curl -sI https://www.harbingermma.com/x/` isn't a single 301 to `https://harbingermma.com/x/` | GSC Page indexing: "Page with redirect" count stabilizes |
| 0.2 | **Add redirects.** Copy `_redirects.proposed` to `public/_redirects`. Before that, export Webflow's page list and GSC's top landing pages for www, and add rules for anything not covered. *Depends on 0.1.* | `public/_redirects` (new) | Any old URL returns a 404 or takes 2+ hops: `curl -sIL https://harbingermma.com/about` | GSC "Not found (404)" doesn't rise after launch |
| 0.3 | **Legal pages at the same slugs:** /privacy-policy/, /liability-waiver/, /minor-liability-waiver/, /minor-competition-release-waiver/. Port the text from Webflow. | `src/pages/*.astro` (new); footer link | Any of the four returns 404 | Waiver-link clicks from signup emails still work |
| 0.4 | ~~Fix or confirm Jerilyn's bio~~ **Resolved:** the owner confirmed the humor is intentional. | — | — | — |
| 0.5 | **Fix the `/classes/mma/` 404.** Ideally add an MMA class page (and Yoga, which is also on the schedule). Otherwise remove the link from the footer. Update the `/class-types/mma` redirect to match. | `src/data/classes/mma.json` (new), `src/components/Footer.astro:25`, `ClassGrid.astro` (7-card cap), `public/_redirects` | Crawl finds any internal link that returns 404 | — |
| 0.6 | **Reconcile hours.** The footer says Mon–Fri 8 AM, but there are 6:00 and 7:30 AM classes. Pick the truth, then match GBP and Yelp to it. | `src/components/Footer.astro:8-10`, `src/data/schedule.json` | Footer, schedule, schema and GBP disagree | Fewer "is it open" calls |
| 0.7 | **Production hygiene.** Turn off the Netlify HUD/drawer, and add `public/_headers` (nosniff, Referrer-Policy, X-Frame-Options, Permissions-Policy, `/_astro/*` immutable). | Netlify settings; `public/_headers` (new) | `/.netlify/scripts/hud` is in production HTML; securityheaders.com grade is below B | — |

**After cutover (same day):**
- Add a GSC Domain property and submit `https://harbingermma.com/sitemap-index.xml`.
- Confirm `harbingermma.netlify.app` 301s to the primary domain.
- Update the GBP website URL, Instagram, TikTok, Facebook, Yelp and Vagaro links to the apex.

---

## Phase 1: Week 1, high impact

| # | Action | Files | Fail check | Watch |
|---|---|---|---|---|
| 1.1 | **Pricing clarity.** Make the price `<h1>`s into styled `<p>`/`<span>`s, add one plain-text pricing sentence, show the $75 initiation fee on the 3-month card, and change the homepage stat to "from $99/mo". | `src/pages/pricing.astro`, homepage stats component | `/pricing/` has more than one H1; "$105" is missing from the extracted page text | Pricing → trial-form conversion |
| 1.2 | **State the first-class offer** (free? cost? what to bring?) next to every "BOOK FIRST CLASS" button. | `HeroSection.astro`, `CTAForm.astro`, `BookClassForm.tsx`, `pricing.astro` | A CTA still has no price or next step beside it | Form submissions per session |
| 1.3 | **Youth decision.** Publish a youth program (ages, times, price) or remove the "Youth" card and state the minimum age. | `ClassesSection.astro` | The Youth card links nowhere or contradicts the schedule | — |
| 1.4 | **Schema additions:** `openingHoursSpecification` (after 0.6), `geo`, `hasMap`, `logo`/`image` (PNG), GBP and Yelp in `sameAs`. Remove the duplicate `#gym` node in pricing. Use the paste-ready blocks in `findings/schema.md`. | `src/lib/schema.ts`, `src/pages/pricing.astro` | Rich Results Test or validator.schema.org shows errors, or two `#gym` nodes appear on /pricing/ | GBP and the knowledge panel show correct hours |
| 1.5 | **Contact page** with NAP, hours, a Maps embed and link to the GBP listing (not a bare pin), parking/directions, and the trial form. Point the `/contact` and `/apply` redirects at it. | `src/pages/contact.astro` (new), nav/footer, `public/_redirects` | No Maps link anywhere on the site | GBP "directions" and "website" clicks |
| 1.6 | **Open Graph and Twitter tags** plus a 1200×630 share image, with per-page images for coaches and classes. | `src/layouts/Layout.astro` | Sharing a URL in iMessage or Facebook shows no image | — |
| 1.7 | **LCP fixes:** correct the `/coaches/` hero `sizes` or add a mobile source, right-size the homepage card images, self-host and preload Space Grotesk, and run SVGO on the logos. | `src/pages/coaches.astro`, homepage class cards, `Layout.astro`, `src/assets/*.svg` | Lighthouse mobile LCP above 2.5 s on / or /coaches/ | CrUX LCP p75 (once the site has traffic) |
| 1.8 | **Quick fixes:** "DICIPLINES" ×2, the cut-off Muay Thai sentence, the Conditioning run-on, "regimes"; `alt=""` on the 6 schedule icons; accessible names on the footer social icons. | homepage components, `src/data/classes/*.json`, `jake.json`, `WeeklySchedule.tsx:~74`, `Footer.astro` | A grep for "dicipline" finds a match | — |

---

## Phase 2: Weeks 2–3, content and on-page

| # | Action | Files | Fail check | Watch |
|---|---|---|---|---|
| 2.1 | **Deepen each class page** (aim for 600–900 words of real content): who it's for, level, what a first class looks like, weekly times pulled from `schedule.json`, the coach, price, gear, "in Portland" in the copy, an FAQ section, and a CTA in the first mobile screen. Write Judo and Wrestling about *Harbinger's* class. | `src/pages/classes/[slug].astro`, `src/data/classes/*.json` | Main copy under 500 words; no times on the page | GSC impressions for "<discipline> portland" |
| 2.2 | **H1s and meta descriptions.** Homepage H1 along the lines of "MMA & Martial Arts Gym in Portland"; specific H1s on /classes/ and /coaches/. Apply the 8 meta rewrites in `findings/content.md` (120–155 characters). | page files | Homepage H1 has no "Portland" or discipline | CTR in GSC |
| 2.3 | **Proof.** Add a reviews/testimonials block with a Google review link, the KATU feature, real affiliations and lineage, and fight results. Lead coach excerpts with concrete credentials; consider surnames. Tone down unsupported "world class/elite". | `src/data/coaches/*.json`, homepage, `[slug].astro` | Still zero third-party trust signals on the homepage | Review count and velocity on GBP |
| 2.4 | **Internal links.** Link class pages to their coaches and the schedule, coaches back to their classes, and the schedule to the class pages. Add visible breadcrumbs plus BreadcrumbList on hub pages. | templates | A class page has no link to a coach | — |
| 2.5 | **Mobile CTA and tap targets.** Add a visible "Join" button in the mobile header, a CTA above the fold on /schedule/ and the class pages, and footer link targets of 44 px or more. | `Nav.astro`, `Footer.astro`, page templates | Lighthouse "tap targets" warning | Mobile conversion rate |

---

## Phase 3: Month 2, authority and local

- **About page** covering the story, owner (Jake), facility photos, affiliations and one canonical business description. Reuse that description on GBP, Yelp and Vagaro (Vagaro currently says "private training facility").
- **GBP:** confirm the primary category (e.g. "Martial arts school" or "Gym"), add secondary categories per discipline, set hours to match 0.6, and keep a steady flow of photos and posts.
- **Reviews:** set up a simple post-class review ask, aiming for a steady monthly flow on Google.
- **Citations:** normalize the name to "Harbinger MMA" everywhere, and fix the Yelp and Vagaro details.
- **Optional:** link the YouTube channel in `sameAs` and the footer, add a named AI-crawler policy to `robots.txt.ts`, and add IndexNow (Bing only). llms.txt is low priority.

## Phase 4: Ongoing

- Before cutover, run `/claude-seo:seo drift baseline https://harbingermma.com/`, then run `drift compare` after each deploy.
- Weekly GSC checks for 6 weeks after launch: Page indexing (404s, "Duplicate without user-selected canonical"), branded query position (target: #1 for "harbinger mma"), and impressions for "<discipline> portland".
- Re-audit 4–6 weeks after launch with Google API credentials configured, to get CrUX field data and GSC data.
