# Content Quality and E-E-A-T (with On-Page SEO)

**Target:** https://harbingermma.netlify.app/ (staging of the Astro redesign; pre-launch audit)
**Pages reviewed:** all 18 in the sitemap, plus the source in `src/`
**Date:** 2026-10-12
**Method:** I fetched every page's raw HTML with `render_page.py --mode never`. None of them is an SPA shell. E-E-A-T and word counts are scored on trafilatura `extracted_text`, which strips the nav, footer and CTA form. Heading, link and alt data was parsed from the raw HTML. Duplication was measured as 5-gram shingle Jaccard similarity, with sitewide boilerplate removed first. Readability uses Flesch formulas with a heuristic syllable counter, so treat those numbers as approximate. Metadata templating was checked with `metadata_template.py --pairs-file` over all 18 title/description pairs. I read the copy against `src/data/**`, `src/pages/**` and `src/components/**`. I did not modify the source repo.

## Scores

| Score | Value |
|---|---|
| **Content Quality (category score)** | **50 / 100** |
| E-E-A-T composite | 45 / 100 |
| AI citation readiness | 35 / 100 |
| **On-Page SEO (separate score)** | **56 / 100** (see the On-Page SEO section) |

How the Content Quality score is built: E-E-A-T 45 (40%), depth/thin content 35 (20%), uniqueness 90 (10%), readability 60 (10%), copy accuracy/typos 45 (10%), freshness 40 (5%), metadata 70 (5%). The result is about 50.

### E-E-A-T breakdown

The weights below are this audit's internal model. Google publishes no numeric E-E-A-T weights. It says only that trust matters most.

| Factor | Weight | Score | Basis |
|---|---|---|---|
| Experience | 20% | 45 | Real first-hand photos: the brick-walled mat room, and a Harbinger corner at a fight night (`coaches-section-bg.jpg`, `classes/bjj-featured.png`). Nick, Eli and Jake have first-hand coaching histories. But none of the photos has a caption, and the class copy reads like an encyclopedia entry. There are no member stories, no fight results, and only partial "what your first class looks like" detail. |
| Expertise | 25% | 55 | There are concrete credentials: Eli is a BJJ black belt and judo brown belt with 10+ years of coaching; Jake is a USA Boxing coach who competed in Golden Gloves; Nick trained under Benny Urquidez and Kru Puk. The technical vocabulary is accurate (kuzushi, randori, teep). Against that: no surnames except one, no belt lineage, no named certifying body for yoga, and class pages never say who teaches them. |
| Authoritativeness | 25% | 30 | There is no external proof anywhere: no fight record, titles, affiliations (apart from one USA Boxing mention), reviews, ratings, testimonials or press. The only external signals are the three social `sameAs` links. |
| Trustworthiness | 30% | 50 | Contact details (address, phone, email) and hours are in the footer and JSON-LD, and pricing is shown up front. But Jerilyn's bio contains placeholder/joke copy, the posted hours contradict the schedule, there are unsupported superlatives, there's a "Youth" claim with no youth program, there's no privacy policy even though the form collects PII, and a broken MMA link appears on every page. |

Composite: 0.20×45 + 0.25×55 + 0.25×30 + 0.30×50 = **45**.

### Per-page inventory

"Main words" is the trafilatura main-content count, which excludes nav, footer and CTA. The floors are topical-coverage floors, not ranking targets.

| Page | Type | Title chars | Desc chars | H1 | Total words | Main words | Floor | Status |
|---|---|---|---|---|---|---|---|---|
| / | Homepage | 39 | 170 (long) | here to win | 473 | 287 | 500 | Below |
| /classes/ | Service hub | 52 | 233 (long) | training programs | 266 | 114 | 800 | Thin |
| /classes/bjj/ | Service | 43 | 63 (short) | BJJ | 371 | 230 | 800 | Thin |
| /classes/boxing/ | Service | 46 | 88 (short) | Boxing | 351 | 211 | 800 | Thin |
| /classes/conditioning/ | Service | 52 | 93 (short) | Conditioning | 387 | 252 | 800 | Thin |
| /classes/judo/ | Service | 44 | 121 | Judo | 282 | 149 | 800 | Thin, no gym-specific copy |
| /classes/muay-thai/ | Service | 49 | 147 | Muay Thai | 356 | 220 | 800 | Thin |
| /classes/wrestling/ | Service | 49 | 97 (short) | Wrestling | 299 | 164 | 800 | Thin, no gym-specific copy |
| /coaches/ | Hub | 54 | 108 (short) | world class pedigree | 323 | 182 | n/a | OK for a hub |
| /coaches/eli/ | Profile | 50 | 83 (short) | Eli | 237 | 105 | ~300 | Thin |
| /coaches/g/ | Profile | 37 | 95 (short) | G | 222 | 93 | ~300 | Thin |
| /coaches/jake/ | Profile | 58 | 133 | Jake | 228 | 97 | ~300 | Thin (he's the owner) |
| /coaches/jerilyn/ | Profile | 63 | 138 | Jerilyn | 224 | 95 | ~300 | Thin, placeholder copy |
| /coaches/mack/ | Profile | 46 | 107 (short) | Mack | 231 | 101 | ~300 | Thin |
| /coaches/mitch/ | Profile | 46 | 127 | Mitch | 212 | 81 | ~300 | Thinnest page |
| /coaches/nick/ | Profile | 46 | 142 | Nick | 272 | 138 | ~300 | Best bio |
| /pricing/ | Transactional | 43 | 202 (long) | 4 H1s | 257 | 79 | n/a | No policy/FAQ copy |
| /schedule/ | Utility | 39 | 80 (short) | Current Weekly Schedule | 521 | (list) | n/a | No intro, no updated date |

## What works

- **Body copy is unique on every page.** After removing boilerplate, pairwise 5-gram Jaccard similarity is 0.000 across all class pages and at most 0.005 across coach pages. No class or coach page is spun or duplicated.
- **Metadata is not templated.** `metadata_template.py` over all 18 pairs returned `site_risk: low`, `templated_ratio: 0.0` and no `shared_cta_phrases`. No page has the description-echoes-title or brand-suffix flags.
- **Titles are unique and well sized** (37–63 chars). They lead with discipline plus "Portland, OR" on class pages and follow a consistent brand pattern.
- **The photos are real and first-hand**: the actual mat room and a Harbinger corner at a sanctioned bout. That is strong Experience evidence, and text-based systems can't see it yet (see C14).
- **Contact details are consistent**: same address, phone and email in the footer and in the `ExerciseGym` JSON-LD, with hours in a `<dl>`.
- **Prices are on the page as plain numbers**: $105/mo, $99/mo for the 3-month pass, $18 day pass, $75 initiation fee. These are quotable facts.
- **Some coach bios are specific and checkable**, especially Nick's (Kyokushin from age 11, Benny "the Jet" Urquidez, MTA North Hollywood under Kru Puk) and Jake's (USA Boxing, Golden Gloves, Hungarian national team).
- **This is a large improvement on the live Webflow site.** I fetched the old pages for comparison. The old `/about` has 49 words of main content, and the old `/class-types/mma` and `/class-types/yoga` are schedule filters with no descriptive copy.
- **Keywords are not stuffed anywhere.** If anything, the site is under-optimized (see O10).

## Findings

No Critical findings. Nothing on the content side blocks indexing or launch outright, but C1 and C2 should be fixed before DNS cutover.

### C1. Placeholder or joke copy in a coach bio (High)

- **Evidence:** `/coaches/jerilyn/` publishes: *"She raises carrier pigeons in her spare time, competes in local chili eating contests on the West Coast, and is the 4 time winner of the Julius Bronsworth Smile of the Year Award amongst endurance athletes under 135lbs."* I could not verify the award, and it reads as filler or an in-joke. It went in with commit `394e5b6` ("Configuring netlify and wiring forms up", 2026-10-08). The same page also repeats its first two sentences: the `excerpt` shown in the hero and used as the meta description is word-for-word the opening of `bio`.
- **Why it matters:** The QRG treats made-up or unverifiable biographical claims as a trust problem, and one obviously fake credential casts doubt on the real ones elsewhere (Eli's "active UFC fighters", Nick's lineage).
- **Recommendation:** Replace it with a real bio: certifications (CrossFit L1/L2? NSCA/NASM?), BJJ rank, marathon or lifting results, years coaching, and which Harbinger classes she runs (Bootcamp, Strength & Conditioning). Write an excerpt that doesn't repeat the bio's first line.
- **Source file:** `src/data/coaches/jerilyn.json`
- **How we'd know it failed:** `grep -ri "Bronsworth\|carrier pigeon\|chili eating" dist/` returns matches, or the page's hero excerpt string still appears twice in the rendered HTML.

### C2. No MMA or Yoga program pages, and a broken `/classes/mma/` link on all 18 pages (High)

- **Evidence:** The footer "Programs" column links to `/classes/mma/`, which returns **404**. `/classes/yoga/` also 404s. Meanwhile the homepage title is "MMA Gym in Portland", the schedule has 6 MMA-tagged and 3 Yoga sessions a week, the trial form offers "MMA" and "Yoga" as interests, Mack's whole role is Yoga Instructor, and the old site had `/class-types/mma` and `/class-types/yoga`. The site's main commercial term has no landing page.
- **Recommendation:** Add `src/data/classes/mma.json` and `src/data/classes/yoga.json`, with images, using the same depth target as C3. Fix the footer link or remove it until the page exists. In `src/components/classes/ClassGrid.astro`, `classes.slice(0, 7)` would drop the 8th class, and `grid-template-rows: 450px 450px` only fits 6 cards on the 3-column layout, so raise the limit and let rows auto-size. When the redirect map is built (technical agent), point old `/class-types/mma` and `/class-types/yoga` at the new URLs.
- **Source files:** `src/components/Footer.astro` (line 25), `src/data/classes/` (new files), `src/components/classes/ClassGrid.astro` (lines 5, 8)
- **How we'd know it failed:** `/classes/mma/` and `/classes/yoga/` don't return 200 after deploy, or a link crawl of the built site finds any internal 404.

### C3. Class pages are thin, and Judo and Wrestling have no gym-specific content (High)

- **Evidence:** Class pages have 149–252 words of main content against an 800-word floor for service pages. Judo (149) and Wrestling (164) are two generic paragraphs about the sport. Neither says anything about Harbinger's classes: no format, level, coach or times. None of the six class pages says who teaches, when it meets, what level it suits, what to bring (except Boxing's one line), what the first class costs, or how it fits into MMA. The schedule shows Judo and Wrestling only as a combined "Judo/Wrestling" class (Tue/Thu 5:30 PM), so two separate pages each describe a program that doesn't exist on its own.
- **Recommendation:** Add a fixed set of gym-specific sections to each class, as new collection fields rendered as H2 sections:
  1. "Who it's for / levels"
  2. "What a class looks like" (Harbinger's real format)
  3. "Coaches", linking to the coach pages
  4. "When it runs", pulled from `schedule.json` filtered by class
  5. "What to bring"
  6. "Pricing and your first class"
  7. A 3–5 question FAQ

  Aim for 600–900 words of useful, non-filler copy. Either merge Judo and Wrestling into one "Judo & Wrestling" page that matches the schedule, or say plainly on each page that it's taught in the combined class.
- **Source files:** `src/content.config.ts` (new fields), `src/data/classes/*.json`, `src/pages/classes/[slug].astro`
- **How we'd know it failed:** Any `/classes/*/` page has under 500 words of trafilatura main content, or has no link to `/schedule/` or a `/coaches/*/` page.

### C4. No proof of authority, and heavy unsupported superlatives (High)

- **Evidence:** Across the source: "world-class/world class" appears 6 times, "elite" 10 times, "Portland's Premier Combat Training Facility" (hero eyebrow), "We don't just teach—we win" (`CoachesSection.astro`), "7 WORLD CLASS COACHES" (which includes the yoga and S&C coaches), and "trained athletes … to active UFC fighters" (Eli). None of it is backed up anywhere on the site: no fight record, titles, team results, named fighters, review count or rating, testimonials, affiliations or press.
- **Recommendation:** Swap adjectives for evidence. Add a team-results block (pro/amateur record, titles, recent wins with event names and dates). Name the UFC athletes Eli has coached, with their consent. Add 3–6 attributed member testimonials and the Google review rating and count, kept current. Add affiliations (USA Boxing club number, BJJ lineage). Tone down "premier" and "world class" unless a cited fact supports them.
- **Source files:** `src/components/home/HeroSection.astro`, `src/components/home/CoachesSection.astro`, `src/components/home/ClassesSection.astro`, `src/pages/coaches.astro`, `src/data/coaches/eli.json`
- **How we'd know it failed:** The homepage has no verifiable third-party proof (named result, review count, or affiliation), or `grep -rio "world.class" src | wc -l` stays at 6 or more with no supporting facts nearby.

### C5. Coach identities are thin and inconsistent (Medium)

- **Evidence:** H1s and titles use first names only, and one is just "G". The bios mix in full names inconsistently ("Gonzalo", "Coach Mackenzie", "Mitchell Reed"), and Mitch is the only coach with a surname. Coach pages have 81–138 words of main content and 53–62% sitewide boilerplate. Eli's excerpt and meta description ("a world-class coach with extensive experience in professional combat sports") leave out his strongest facts (BJJ black belt, judo brown belt). G's bio says "As a gym manager…" without saying whether he manages Harbinger. No coach page links to the classes that coach teaches.
- **Recommendation:** Add `fullName`, `rank`/`lineage`, `certifications`, `yearsCoaching`, `competitionRecord`, `classesTaught` (references to the classes collection) and personal `sameAs` links to the coach schema. Render them as an H2 "Credentials" list and an H2 "Classes I teach" linked list. Use the full name in the H1 and title ("Gonzalo 'G' …"). Rewrite excerpts to lead with the credential.
- **Source files:** `src/content.config.ts`, `src/data/coaches/*.json`, `src/pages/coaches/[slug].astro`
- **How we'd know it failed:** Any coach H1 is still a single token, or any coach page has under 200 main-content words or no link to `/classes/*/`.

### C6. Facts on the site contradict each other (Medium)

- **Evidence:**
  - Footer hours say "Mon-Fri 8 AM-9:30 PM", but `schedule.json` has Monday Conditioning at **6:00 AM** and Muay Thai Technique at **7:30 AM**. The live Webflow schedule also shows the 6:00 AM class, so the footer is what's wrong.
  - The homepage "for everyone" grid advertises **Youth** ("Build discipline and confidence"), but the schedule has no youth classes and no page explains a youth program.
  - Pricing says "**Any class, any time**", but "Comp Sparring (invite only)" is on the schedule.
  - Pricing says "cancel whenever you want", yet one of the three plans is a prepaid 3-month pass.
  - The `/pricing/` JSON-LD attaches the $75 initiation fee to the 3-month pass, but the visible 3-month card doesn't mention it. This breaks the repo's own rule in `src/lib/schema.ts`: "Only describe what is visible."
  - Mitch's bio says he coaches "Kickboxing Fundamentals", which isn't on the schedule.
- **Recommendation:** Fix the footer hours, or derive them from `schedule.json`. Remove "Youth" or back it with real details (ages, times, waiver). Qualify "any class" (e.g. "all regular classes; comp sparring by invite"). Make the cancellation line match each plan. Show the initiation fee on the 3-month card, or remove it from the schema. Align class names in the bios with the schedule.
- **Source files:** `src/components/Footer.astro` (lines 7–11), `src/components/home/ClassesSection.astro` (lines 68–70), `src/pages/pricing.astro` (lines 9–31, 43, 63, 85–106, 125), `src/data/coaches/mitch.json`
- **How we'd know it failed:** The earliest `startTime` in `schedule.json` is before the footer's opening hour, or the 3-month card's visible text lacks "initiation" while the JSON-LD still includes it.

### C7. Trust pages are missing: privacy, waivers, about (Medium)

- **Evidence:** The trial form on every page collects name, email and phone and says "By submitting, you agree to receive communications regarding your trial". There's no privacy policy on the new site, though the old one had `/privacy-policy`. There are no liability or minor waiver pages (old `/liability-waiver`, `/minor-liability-waiver`, `/minor-competition-release-waiver`) and no about page (old `/about`) giving founding year, owner and mission. The redirect gap itself is the technical agent's; this finding is about the missing trust content.
- **Recommendation:** Publish `/privacy-policy/` and link it from the form's consent line and the footer. Publish the waiver pages, or say where waivers are signed (front desk or e-sign link). Add an `/about/` page: owner (Jake), year founded, the facility (12,300 sq ft, Corbett Ave), how to get there and park, and the coaching philosophy.
- **Source files:** new `src/pages/privacy-policy.astro`, `src/pages/about.astro`, waiver pages; `src/components/BookClassForm.tsx` (line 203); `src/components/Footer.astro`
- **How we'd know it failed:** The built site has no `/privacy-policy/`, or the form's consent text contains no link.

### C8. Pricing page is missing the terms buyers ask about (Medium)

- **Evidence:** `/pricing/` has 79 words of main content. Every CTA says "book first class" and the form refers to "your trial", but no page says whether the first class is free or what it costs. The page also doesn't explain what "open gym hours" are, whether there are family, student, military or competition-team rates, how the 3-month pass renews, or the freeze and cancellation rules.
- **Recommendation:** Add an H2 "Pricing FAQ" with 5–8 short Q&As: Is the first class free? What does the initiation fee cover, and does it apply to the 3-month pass? How do I cancel? Does the 3-month pass renew? What are open-gym hours? Do you offer discounts? What gear do I need?
- **Source file:** `src/pages/pricing.astro`
- **How we'd know it failed:** The rendered `/pricing/` text doesn't answer "is the first class free", or has under 250 main-content words.

### C9. Typos and copy errors (Medium)

| Where | Current | Fix |
|---|---|---|
| `src/components/home/ClassesSection.astro` L14 | "Train across every range of **diciplines**." | "disciplines". Also reword: "every range" is unclear. |
| `src/components/home/ClassesSection.astro` L23 | "VIEW ALL **DICIPLINES**" | "DISCIPLINES" |
| `src/data/classes/muay-thai.json` | "…every part of the body becomes a potential weapon **and every position.**" (truncated) | "…and every position a chance to score." (or cut "and every position") |
| `src/data/classes/conditioning.json` | "simulate the physical demands of a real fight rounds of high-intensity work…" | "…of a real fight: rounds of high-intensity work…" |
| `src/data/classes/conditioning.json` excerpt | "Our **Conditioning** programs" | "Our conditioning programs" |
| `src/data/classes/bjj.json` | "any size-including", "necessary-just" | Use an em dash or comma: "any size, including…", "necessary; just…" |
| `src/data/classes/boxing.json` | "Boxing is the original striking art. Built on footwork…" (sentence fragment; "original" is also debatable) | "Boxing is a foundational striking art, built on footwork…" |
| `src/data/classes/judo.json` | "modern MMA takedown game" | "modern MMA's takedown game" |
| `src/data/coaches/jake.json` | "training **regimes**" | "training regimens" |
| `src/data/coaches/eli.json` | "decorated competitive record in **all three** disciplines, **including MMA**" (four are named); "Brazilian Jiu Jitsu" vs "Jiu-Jitsu"; "No Gi and Gi" | Fix the count; standardize on "Jiu-Jitsu", "gi and no-gi" |
| `src/data/coaches/jerilyn.json` | "long distance marathons", "4 time", "135lbs" | Superseded by C1 |
| `src/pages/pricing.astro` L52/86/116 | "$105/ month", "$99 / month", "$18/ day" | Use consistent spacing: "$105 / month" |
| `src/data/coaches/g.json` | Name "G" vs "Gonzalo" | See C5 |

- **How we'd know it failed:** `grep -rniE "dicipline|regimes|a real fight rounds|and every position\.\"" src/` returns any match.

### C10. Weak AI citation readiness and local relevance in main content (Medium)

- **Evidence:**
  - Class bodies render as one `<p class="whitespace-pre-line">`, so paragraphs aren't separate elements and there are no H2/H3s. Conditioning's three sub-programs ("Fight Prep Conditioning", "Strength-Focused Conditioning", "Speed & Agility Conditioning") are plain text lines.
  - No page has an FAQ.
  - "Portland" appears **0 times** in the main content of every class page and of the pricing and schedule pages; it's only in titles and the footer address.
  - Quotable facts (12,300 sq ft, 150+ members, 40+ sessions, 20+ classes) sit in stat tiles, with no sentence that could be quoted as an answer.
- **Recommendation:** Render the description as real paragraphs and headings. Store body copy as Markdown in an Astro content collection, or as an array of `{heading, body}` objects. Open each class page with a 40–60-word answer-first summary that names the gym and city ("Harbinger MMA runs 9 BJJ sessions a week in Portland, OR, gi and no-gi, from fundamentals to open mat…"). Add FAQs to class pages and pricing. Write the stats into a sentence on the homepage and the future about page.
- **Source files:** `src/pages/classes/[slug].astro` (line 62), `src/data/classes/*.json`, `src/content.config.ts`, `src/components/home/StatsSection.astro`
- **How we'd know it failed:** A class page has fewer than 2 `<h2>` elements before the CTA, or "Portland" doesn't appear in its trafilatura `extracted_text`.

### C11. Generic, AI-pattern phrasing repeated across class pages (Medium)

- **Evidence:** The same scaffolding repeats across class pages:
  - "What sets X apart…" / "is what sets BJJ apart" (BJJ, Muay Thai, Wrestling)
  - "Whether you're…" (4 times across BJJ, Boxing, Conditioning)
  - "fight-ready" (3 times) and "real fight" (3 times)
  - "devastating" and "relentless" (twice each)

  Each opening paragraph is a definition of the sport that any encyclopedia covers. Under the September 2025 QRG this is the "generic, no original insight" pattern. It isn't penalized for being AI-written; it scores low because nothing in it is specific to Harbinger.
- **Recommendation:** Cut each sport definition to one sentence. Spend the space on what only Harbinger can say: the curriculum split (e.g. fundamentals vs advanced vs sparring groups, which already exist in the schedule), the mat and ring setup, how beginners are paired for sparring, safety rules, and how fighters are prepared for competition.
- **Source files:** `src/data/classes/*.json`
- **How we'd know it failed:** `grep -rhoiE "sets .* apart|Whether you" src/data/classes | wc -l` is still above 2.

### C12. Readability is above a consumer reading level (Low)

- **Evidence (approximate):** Class pages score Flesch Reading Ease 38–56 and grade level 9.8–13.1, with average sentences of 18–25 words (Judo 24.8). Coach pages are grade 7.7–12.6. The audience is local adults deciding whether to try a class.
- **Recommendation:** Target grade 7–9. Split sentences over 25 words, use lists for "what you'll learn" and "class format", and drop stacked adjectives.
- **Source files:** `src/data/classes/*.json`, `src/data/coaches/*.json`
- **How we'd know it failed:** Re-running the readability calculation gives any class page a grade above 10.

### C13. No freshness or update signals (Low)

- **Evidence:** No page shows a date. "Current Weekly Schedule" has no "last updated" line. htmldate infers `2026-01-01` for every page from the footer's copyright year. Schedules change (the old site even had `/announcements/schedule-changes`), and the site has no place to announce them.
- **Recommendation:** Add "Schedule updated: <Month YYYY>" from a field in `schedule.json`. Add a short announcements or "schedule changes" section, or a page, so the old URL has somewhere to point.
- **Source files:** `src/pages/schedule.astro`, `src/components/WeeklySchedule.tsx`, `src/data/schedule.json`
- **How we'd know it failed:** The `/schedule/` HTML contains no visible date string.

### C14. First-hand photos lack captions and descriptive alt text (Low)

- **Evidence:** Card images have one-word alt text (`alt="BJJ"`, `alt="Eli"`). The fight-night corner photo and the gym-interior photos have no caption and decorative `alt`. The six schedule filter icons have **no `alt` attribute**. This is the site's strongest Experience evidence, and text-based systems can't see any of it.
- **Recommendation:** Write descriptive alt text ("Coach Eli drilling a guard pass on the Harbinger MMA mats, Portland"). Caption the event photo (fighter, event, date, result). Give the decorative schedule icons `alt=""`, since their labels are already text.
- **Source files:** `src/components/classes/ClassCard.astro` (L10), `src/components/coaches/CoachCard.astro` (L11), `src/components/home/CoachesSection.astro` (L11), `src/components/WeeklySchedule.tsx` (L74)
- **How we'd know it failed:** Any content `<img>` has alt text of 1–2 words, or any `<img>` lacks an `alt` attribute.

### C15. Duplication and templated metadata: clean (Info)

- `metadata_template.py` over 18 pairs: `site_risk: low`, `templated_ratio: 0.0`, `shared_cta_phrases: {}`, no flags.
- Body-copy near-duplication: maximum Jaccard 0.000 for class pairs and 0.005 for coach pairs (boilerplate excluded). The risk here is **thinness, not duplication**. Coach pages are 53–62% shared boilerplate (nav, CTA form, footer) by shingle share, so their template weighs more than their unique content.
- Cross-reference for the technical agent: staging has no `noindex` because `Layout.astro` L10 sets `isProduction` from `site.hostname`, and `astro.config.mjs` sets `site` to `harbingermma.com` unless `NODE_ENV=staging`, which the Netlify build doesn't set.

---

## On-Page SEO

**On-Page SEO score: 56 / 100**

| Component | Weight | Score |
|---|---|---|
| Titles | 15% | 85 |
| Meta descriptions | 15% | 50 |
| Heading structure | 20% | 40 |
| Internal linking | 20% | 45 |
| Keyword / local relevance in body | 15% | 55 |
| Image alt | 10% | 60 |
| URL structure | 5% | 90 |

### O1. Broken sitewide link to `/classes/mma/` (High)

This is the same issue as C2. The footer "Programs" column on all 18 pages links to a 404. Fix: `src/components/Footer.astro` L25. **Failure check:** an internal-link crawl of `dist/` finds any 404.

### O2. Pricing page has 4 H1s and no H2 (High)

- **Evidence:** H1s are "choose how you train", "$105/ month", "$99 / month" and "$18/ day". Plan names are H3s with no H2 above them.
- **Recommendation:** Keep one H1 ("Membership Pricing" or "Choose How You Train"). Make plan names H2s ("Month-to-Month", "3-Month Pass", "Day Pass"). Render prices as `<p>` with the same styling.
- **Source file:** `src/pages/pricing.astro` (L42, L48, L52, L80, L86, L113, L116)
- **How we'd know it failed:** `/pricing/` has `count(<h1>) != 1`.

### O3. Homepage H1 doesn't name the business or topic (Medium)

- **Evidence:** The H1 is just "here to win". The brand ("harbinger mma.") is a `<div>`, and the topical eyebrow ("Portland's Premier Combat Training Facility") is a `<p>`.
- **Recommendation:** Put brand and topic in the H1 and keep the tagline as styled text. For example: `<h1><span class="eyebrow">Portland MMA & Martial Arts Gym</span> Harbinger MMA</h1>` with "Here to win" as a `<p>`. Or, if the design must keep the big tagline, `<h1>Here to win <span class="sr-only">: Harbinger MMA, Portland MMA & martial arts gym</span></h1>`, but only if that text is also visible nearby. The first option is better. Turn the "harbinger mma." div into the visible brand line.
- **Source file:** `src/components/home/HeroSection.astro` (L34–49)
- **How we'd know it failed:** The homepage `<h1>` text doesn't contain "MMA" and "Portland" (or "Harbinger").

### O4. Generic hub H1s, skipped heading levels, bare detail H1s (Medium)

- **Evidence:**
  - `/classes/` H1 is "training programs" and `/coaches/` H1 is "world class pedigree". Neither says what or where.
  - Both hubs jump from H1 to H3 cards with no H2.
  - Class detail H1s are just the sport ("BJJ"). Coach H1s are just a first name ("G").
  - Class detail pages have no H2 for their body content, so the only H2 is the sitewide "READY TO WIN?".
- **Recommendation:**
  - `/classes/`: H1 "Martial Arts Classes in Portland", with "training programs" kept as the eyebrow, and add an H2 above the grid ("Our programs").
  - `/coaches/`: H1 "Our Coaches", with "world class pedigree" as styled text.
  - Class pages: H1 "Brazilian Jiu-Jitsu (BJJ) Classes" (add a `seoHeading` field) and H2 sections per C3.
  - Coach pages: H1 with the full name.
- **Source files:** `src/pages/classes.astro` (L14–17), `src/pages/coaches.astro` (L33–36), `src/pages/classes/[slug].astro` (L51–54, L61–63), `src/pages/coaches/[slug].astro` (L63–66), `src/components/classes/ClassCard.astro`, `src/components/coaches/CoachCard.astro`
- **How we'd know it failed:** Any page goes from H1 straight to H3, or a class H1 is under 2 words.

### O5. Meta descriptions too short or too long, and no local or commercial detail (Medium)

- **Evidence:**
  - **Short (<110 chars), 9 pages:** /classes/bjj/ 63, /schedule/ 80, /coaches/eli/ 83, /classes/boxing/ 88, /classes/conditioning/ 93, /coaches/g/ 95, /classes/wrestling/ 97, /coaches/mack/ 107, /coaches/ 108.
  - **Long (>160 chars, will truncate), 3 pages:** /classes/ 233, /pricing/ 202, / 170.
  - Class and coach descriptions are just the `excerpt` field, so most leave out Portland, Harbinger, level and schedule. Eli's leaves out his black belt. The pricing description leaves out the prices.
- **Recommendation:** Add an optional `metaDescription` field to both collections and fall back to the excerpt. Proposed rewrites, all 138–153 chars, which I re-ran through `metadata_template.py` with no flags:
  - `/`: "Portland MMA gym with Muay Thai, Brazilian Jiu-Jitsu, boxing, wrestling and MMA classes for Day 1 beginners through pro fighters. Book your first class."
  - `/classes/`: "Train BJJ, Muay Thai, boxing, wrestling, judo, MMA and conditioning under one roof in Portland, with programs for beginners through competitive fighters."
  - `/classes/bjj/`: "Gi and no-gi Brazilian Jiu-Jitsu classes in Portland, OR, 7 days a week. Fundamentals, open mat and live rounds with black belt coach Eli."
  - `/classes/boxing/`: "Learn to box with USA Boxing coach Jake in Portland, OR. Fundamentals, technique, advanced and sparring groups for first-timers through competitors."
  - `/pricing/`: "Harbinger MMA memberships in Portland: $105/month with no contract, $99/month on a 3-month pass, or an $18 day pass. Unlimited classes, every discipline."
  - `/schedule/`: "Weekly class schedule at Harbinger MMA in Portland: 52 MMA, BJJ, Muay Thai, boxing, wrestling, conditioning and yoga sessions, Monday to Sunday."
  - `/coaches/eli/`: "Eli is Harbinger MMA's head grappling coach in Portland: BJJ black belt, judo brown belt and 10+ years coaching gi, no-gi, wrestling and MMA."
  - `/coaches/g/`: "G (Gonzalo) is a BJJ brown belt and coach at Harbinger MMA in Portland, with years of experience coaching and managing local martial arts gyms."

  Write the remaining pages by hand in the same style, not from a template. Avoid giving many pages the same closing CTA.
- **Source files:** `src/content.config.ts`, `src/data/classes/*.json`, `src/data/coaches/*.json`, `src/pages/index.astro` (L10), `src/pages/classes.astro` (L7), `src/pages/pricing.astro` (L38), `src/pages/schedule.astro` (L9)
- **How we'd know it failed:** Any built page has a meta description under 110 or over 160 chars, or `metadata_template.py --pairs-file` reports `site_risk` above low or any `shared_cta_phrases`.

### O6. Internal linking stays shallow and one-directional (Medium)

- **Evidence:**
  - Class pages link only to the nav and footer: no coach, schedule or pricing links.
  - Coach pages don't link to the classes they teach.
  - Schedule entries aren't links.
  - The footer "Programs" column lists MMA (broken), BJJ, Boxing and Muay Thai. Judo, Wrestling and Conditioning are missing.
  - Four coach pages (Jerilyn, Mack, Mitch, Nick) get only one contextual inbound link, from `/coaches/`, because the homepage `CoachGrid show={3}` covers only Eli, G and Jake.
  - `BreadcrumbList` JSON-LD exists on detail pages, but there's no visible breadcrumb.
- **Recommendation:**
  - Link class pages to their coaches, the filtered schedule and pricing (C3/C5).
  - Make schedule class names link to their class page (map `className` to a slug).
  - List every program in the footer.
  - Add visible breadcrumbs matching the JSON-LD on `/classes/*/` and `/coaches/*/`.
  - Use descriptive anchors ("See the BJJ schedule"), not "learn more".
- **Source files:** `src/components/Footer.astro` (L22–30), `src/pages/classes/[slug].astro`, `src/pages/coaches/[slug].astro`, `src/components/WeeklySchedule.tsx`, `src/data/schedule.json`
- **How we'd know it failed:** Any `/classes/*/` or `/coaches/*/` page has zero contextual (non-nav, non-footer) internal links, or any program page is missing from the footer.

### O7. Title refinements (Low)

- **Evidence:** All 18 titles are unique and 37–63 chars, and they are the strongest on-page element. A few small gains are available.
- **Recommendation:**
  - `/classes/bjj/`: "Brazilian Jiu-Jitsu (BJJ) Classes in Portland, OR | Harbinger MMA" (63 chars), which captures the long-form query.
  - `/schedule/`: "MMA, BJJ & Muay Thai Class Schedule | Harbinger MMA Portland".
  - `/pricing/`: "MMA Gym Membership Pricing in Portland | Harbinger MMA".
  - Coach pages: use full names. "G, BJJ Coach" in particular gives search engines nothing to resolve.
- **Source files:** `src/pages/classes/[slug].astro` (L38), `src/pages/schedule.astro`, `src/pages/pricing.astro`, `src/pages/coaches/[slug].astro` (L43)
- **How we'd know it failed:** A title over 65 chars, or a duplicate title in the built site.

### O8. Heading semantics on shared components (Low)

- **Evidence:**
  - Footer column labels ("programs", "community", "hours", "connect") are H3s on every page.
  - The CTA "READY TO WIN?" is an H2 on 17 pages.
  - Schedule day names are `<p>`, and the schedule H1 comes after the filter UI.
- **Recommendation:**
  - Make footer labels `<p>` or `<h2 class="sr-only">`-scoped landmarks.
  - Give the schedule's days `<h2>` (or `<h3>` under an H2 "This week").
  - Move the schedule H1 above the filters, with a 1–2 sentence intro (location, levels, how to book).
- **Source files:** `src/components/Footer.astro`, `src/components/CTAForm.astro`, `src/components/WeeklySchedule.tsx` (L52, L109–118)
- **How we'd know it failed:** The `/schedule/` H1 isn't the first heading in `<main>` content, or day names aren't headings.

### O9. Image alt text (Low)

Covered in C14.

### O10. Local and keyword relevance in body copy (Low)

- **Evidence:** "Portland" appears 0 times in the main content of all six class pages, plus pricing and the hubs. The homepage main content has it once, in the eyebrow. "MMA" appears once in the homepage main content. No page uses the long-form "Brazilian Jiu-Jitsu classes", "kickboxing classes" (despite 13 weekly sessions with "Kickboxing" in the class name) or "beginner" (except the homepage tile). Nothing is stuffed. This is under-optimization.
- **Recommendation:** Work the city and the specific class type into the answer-first intro and the H2s once each, naturally (C10). Consider a "Kickboxing" mention or section on the Muay Thai page, since the schedule names the class "Muay Thai/Kickboxing".
- **Source files:** `src/data/classes/*.json`, `src/components/home/*.astro`
- **How we'd know it failed:** "Portland" isn't present in any class page's `extracted_text`.

---

## Prioritized fix list

1. **Before launch:** C1 (Jerilyn copy), C2/O1 (MMA and Yoga pages, broken footer link), O2 (pricing H1s), C9 (typos), C6 (hours and claim contradictions), C7 (privacy policy).
2. **First 30 days:** C3 (class page depth, Judo/Wrestling decision), C5 (coach credentials and full names), C8 (pricing FAQ), O5 (meta descriptions), O3/O4 (H1s), O6 (cross-linking and breadcrumbs).
3. **Ongoing:** C4 (results, reviews, testimonials), C10/C11 (answer-first structure, less generic copy), C13 (schedule freshness), C14 (captions and alt text).

---

## Structured findings (for audit-data.json, category "Content Quality")

```json
{
  "category": "Content Quality",
  "score": 50,
  "subscores": {
    "eeat_composite": 45,
    "eeat": {"experience": 45, "expertise": 55, "authoritativeness": 30, "trustworthiness": 50},
    "ai_citation_readiness": 35,
    "on_page_seo": 56
  },
  "metadata_template_check": {"site_risk": "low", "templated_ratio": 0.0, "shared_cta_phrases": {}, "pages_checked": 18},
  "findings": [
    {"id": "C1", "severity": "High", "title": "Placeholder/joke copy in Jerilyn coach bio (unverifiable award); excerpt duplicates bio", "url": "/coaches/jerilyn/", "file": "src/data/coaches/jerilyn.json", "check": "grep -ri 'Bronsworth' dist/ returns nothing"},
    {"id": "C2", "severity": "High", "title": "No MMA or Yoga class pages; footer links to /classes/mma/ (404) on all 18 pages", "url": "/classes/mma/", "file": "src/components/Footer.astro; src/data/classes/; src/components/classes/ClassGrid.astro", "check": "/classes/mma/ and /classes/yoga/ return 200; no internal 404s"},
    {"id": "C3", "severity": "High", "title": "Class pages thin (149-252 main words vs 800 floor); Judo/Wrestling have no gym-specific content and are one combined class on the schedule", "url": "/classes/*/", "file": "src/data/classes/*.json; src/pages/classes/[slug].astro; src/content.config.ts", "check": "each class page >=500 main words and links to /schedule/ and a coach"},
    {"id": "C4", "severity": "High", "title": "No proof of authority (results, reviews, affiliations); heavy unsupported superlatives", "url": "/", "file": "src/components/home/*.astro; src/pages/coaches.astro; src/data/coaches/eli.json", "check": "homepage shows at least one verifiable third-party proof point"},
    {"id": "C5", "severity": "Medium", "title": "Coach identities thin: first names only, inconsistent full names, no credentials list, no links to classes taught", "url": "/coaches/*/", "file": "src/data/coaches/*.json; src/pages/coaches/[slug].astro; src/content.config.ts", "check": "coach H1 includes full name; page links to /classes/*/"},
    {"id": "C6", "severity": "Medium", "title": "Contradictions: footer hours vs 6 AM class; Youth claim with no program; 'any class' vs invite-only; 'cancel anytime' vs 3-month pass; schema fee not visible", "url": "/, /pricing/", "file": "src/components/Footer.astro; src/components/home/ClassesSection.astro; src/pages/pricing.astro; src/data/coaches/mitch.json", "check": "earliest schedule start >= footer open time; visible fee matches JSON-LD"},
    {"id": "C7", "severity": "Medium", "title": "No privacy policy despite PII form; no waiver or about pages", "url": "sitewide", "file": "new src/pages/privacy-policy.astro, about.astro; src/components/BookClassForm.tsx; src/components/Footer.astro", "check": "/privacy-policy/ exists and is linked from the form consent text"},
    {"id": "C8", "severity": "Medium", "title": "Pricing lacks trial cost, cancellation, renewal, and fee terms", "url": "/pricing/", "file": "src/pages/pricing.astro", "check": "rendered pricing text answers 'is the first class free'"},
    {"id": "C9", "severity": "Medium", "title": "Typos and copy errors (diciplines x2, truncated Muay Thai sentence, conditioning run-on, regimes, Eli count logic)", "url": "/, /classes/*/, /coaches/*/", "file": "src/components/home/ClassesSection.astro; src/data/classes/*.json; src/data/coaches/*.json; src/pages/pricing.astro", "check": "grep -rniE 'dicipline|regimes' src/ returns nothing"},
    {"id": "C10", "severity": "Medium", "title": "Low AI citation readiness: class body is one <p>, no H2s, no FAQs, 'Portland' absent from class main content", "url": "/classes/*/", "file": "src/pages/classes/[slug].astro; src/data/classes/*.json", "check": "class pages have >=2 H2s and mention Portland in extracted_text"},
    {"id": "C11", "severity": "Medium", "title": "Generic, repeated AI-pattern phrasing across class pages", "url": "/classes/*/", "file": "src/data/classes/*.json", "check": "'sets .* apart|Whether you' count <= 2"},
    {"id": "C12", "severity": "Low", "title": "Readability grade 9.8-13.1 on class pages", "url": "/classes/*/", "file": "src/data/classes/*.json", "check": "FKGL <= 10 on every class page"},
    {"id": "C13", "severity": "Low", "title": "No freshness signals; schedule has no updated date", "url": "/schedule/", "file": "src/pages/schedule.astro; src/components/WeeklySchedule.tsx; src/data/schedule.json", "check": "visible 'updated' date on /schedule/"},
    {"id": "C14", "severity": "Low", "title": "First-hand photos uncaptioned; 1-word alts; schedule icons missing alt", "url": "sitewide", "file": "src/components/classes/ClassCard.astro; src/components/coaches/CoachCard.astro; src/components/WeeklySchedule.tsx", "check": "no content img with <=2-word alt; no img without alt"},
    {"id": "C15", "severity": "Info", "title": "No templated metadata (site_risk low, ratio 0.0) and no body duplication (max Jaccard 0.005); risk is thinness", "url": "sitewide", "file": "n/a", "check": "re-run metadata_template.py after rewrites"},
    {"id": "O1", "severity": "High", "title": "Broken sitewide footer link /classes/mma/", "url": "sitewide", "file": "src/components/Footer.astro", "check": "no internal 404s"},
    {"id": "O2", "severity": "High", "title": "Pricing page has 4 H1s (prices marked up as H1) and no H2", "url": "/pricing/", "file": "src/pages/pricing.astro", "check": "exactly one <h1> on /pricing/"},
    {"id": "O3", "severity": "Medium", "title": "Homepage H1 'here to win' has no brand/topic/location", "url": "/", "file": "src/components/home/HeroSection.astro", "check": "homepage H1 contains MMA and Portland or Harbinger"},
    {"id": "O4", "severity": "Medium", "title": "Generic hub H1s, H1->H3 skips, bare detail H1s, no body H2s on class pages", "url": "/classes/, /coaches/, detail pages", "file": "src/pages/classes.astro; src/pages/coaches.astro; src/pages/classes/[slug].astro; src/pages/coaches/[slug].astro", "check": "no H1->H3 skips; class H1 >= 2 words"},
    {"id": "O5", "severity": "Medium", "title": "9 meta descriptions <110 chars, 3 >160; excerpts reused without location or prices", "url": "sitewide", "file": "src/content.config.ts; src/data/**; src/pages/*.astro", "check": "all descriptions 110-160 chars; metadata_template site_risk low"},
    {"id": "O6", "severity": "Medium", "title": "No class<->coach<->schedule cross-links; footer omits 3 programs; no visible breadcrumbs", "url": "sitewide", "file": "src/components/Footer.astro; src/pages/classes/[slug].astro; src/pages/coaches/[slug].astro; src/components/WeeklySchedule.tsx", "check": "every detail page has >=1 contextual internal link"},
    {"id": "O7", "severity": "Low", "title": "Title refinements (BJJ long form, schedule, pricing, coach full names)", "url": "various", "file": "src/pages/**", "check": "titles unique and <= 65 chars"},
    {"id": "O8", "severity": "Low", "title": "Footer/CTA headings repeated sitewide; schedule days not headings; schedule H1 below filters", "url": "sitewide, /schedule/", "file": "src/components/Footer.astro; src/components/CTAForm.astro; src/components/WeeklySchedule.tsx", "check": "schedule H1 is first heading; days are headings"},
    {"id": "O10", "severity": "Low", "title": "Under-optimized local and topical terms in body copy (Portland 0x on class pages)", "url": "/classes/*/", "file": "src/data/classes/*.json", "check": "Portland present in each class page extracted_text"}
  ]
}
```
