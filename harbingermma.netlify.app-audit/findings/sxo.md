# Search Experience (SXO) Findings: harbingermma.netlify.app

**SXO Gap Score: 48 / 100 (Needs Work)**. This is separate from the SEO Health Score.

- Audit date: 2026-10-12. This is a pre-launch staging audit; the new site is not indexed on harbingermma.com yet.
- Pages rendered with `render_page.py --mode always --viewport mobile` and parsed with `parse_html.py`: /, /classes/, /classes/{bjj,muay-thai,boxing}/, /pricing/, /schedule/.
- SERPs checked for 5 queries ("mma gym portland", "muay thai portland", "bjj portland", "boxing gym portland", "harbinger mma"), plus 3 supporting queries (beginners, kids, cost). That gave 46 results to classify.
- 18 competitor gym pages that rank were rendered, and their signals were counted.
- Mobile screenshots: `screenshots/sxo-home/`, `screenshots/sxo-class-muay-thai/`, `screenshots/sxo-pricing/`.

## Key insight (lead finding)

**For every non-brand query, Google shows local gym pages. Harbinger's pages read like brand landing pages and leave out what people need to decide.**

- In the top 9 results for each non-brand query, gym homepages and directory listings (Local Page type) make up 44-89%. Dedicated discipline pages fill most of the rest.
- What these pages show, and Harbinger doesn't:
  - a first-visit offer: 14 of 18 competitor pages
  - kids or age information: 15 of 18
  - reviews or testimonials: 8 of 18
  - an FAQ: 8 of 18
  - location details
- The head term "mma gym portland" has no MMA program page on the new site. The sitewide footer link `/classes/mma/` returns a 404.

## What works

- **Public pricing.** $105/mo, $99/mo on a 3-month pass, and an $18 day pass are all on the site. Many local competitors hide pricing. Harbinger also sits at or below the $100-180/mo range found in the cost-query results.
- **Mobile above-the-fold CTA.** "BOOK FIRST CLASS" and "VIEW SCHEDULE" both show above the fold on mobile (screenshot `sxo-home`). The lead form is short: 4 fields.
- **Full weekly schedule.** It has a filter, tiered classes (Fundamentals / Technique / Advanced / Sparring) and a free BJJ open mat. This is good material for beginners and for experienced fighters.
- **Titles carry the service and the city.** Examples: "MMA Gym in Portland, OR", "Muay Thai Classes in Portland, OR", "BJJ Classes in Portland, OR".
- **NAP, hours and a `tel:` link in the footer of every page.** Structured data is in place: ExerciseGym with address, phone and priceRange; OfferCatalog on /pricing/; Service + BreadcrumbList on class pages.
- **Coach detail bios carry strong, specific credentials:**
  - Eli: BJJ black belt, Judo brown belt, 10+ years coaching
  - Jake: former pro boxer and MMA fighter, Golden Gloves, Hungarian national team, USA Boxing coach
  - Nick: trained under Benny "The Jet" Urquidez

  These are the site's best proof points. Today they sit two clicks deep (see SXO-04).
- **Technically clean.** Static HTML, no SPA shell, no console errors.

## SERP analysis

Page types follow `page-type-taxonomy.md`. Results come from the WebSearch tool, not a live geolocated Google SERP (see Limitations).

| Query | Results | Page-type mix | SERP consensus | Harbinger present? |
|---|---|---|---|---|
| mma gym portland | 9 | **Local: 4.** Yelp Go Hard MMA; SBG Portland, Team Quest and American Top Team homepages.<br>**Service: 3** (dedicated MMA program pages). SBG `/mixed-martial-arts/`, NWFA `/combat-martial-arts/mma/`, Team Quest `/mma-training`.<br>**Informational: 2.** Wikipedia pages for Matt Thornton (SBG founder) and Matt Lindland (Team Quest founder). | Local 44%; local-commercial (Local + Service) 78% | No |
| muay thai portland | 9 | **Local: 5.** Two Facebook gym pages, Yelp (Naga, closed), NWFA homepage, Mata Leao homepage.<br>**Service: 2.** NWFA Muay Thai page, Mata Leao Muay Thai page.<br>**Off-intent: 2.** Wikipedia pages for Thai restaurants. | Local 56% | No |
| bjj portland | 9 | **Local: 6** (mostly BJJ-only academies). SBG, Mata Leao, Five Rings, ENSO, Oregon Grappling Arts, Unicorn.<br>**Service: 1.** SBG BJJ page.<br>**Comparison: 1.** Gold BJJ "10 Best Jiu Jitsu Gyms in Portland".<br>**Off-target: 1.** Lyons BJJ, Portland MI. | Local (specialist) 67% | No |
| boxing gym portland | 9 | **Local: 8, all boxing-only gyms.** Yelp B2T, Yelp Portland City Boxing, TITLE Boxing location page, Portland City Boxing, St Johns Boxing (x2), Swing State, Boxing Portland Oregon.<br>**Service: 1.** Daruma private lessons. | Local (specialist) 89% | No |
| harbinger mma | 10 | Instagram (#1), Apple Maps, KATU feature, MapQuest, Yelp (3.6 stars, 5 reviews), **harbingermma.com (old Webflow site) at #6**, grapple-maps, PFG "Harbinger" gloves (brand name collision), National BJJ Registry (says the gym has "no publicly accessible website"), Wikipedia Jake Hager (off-intent) | Navigational. The official site should be #1 and is #6. | Yes, at #6 |

**Competitor sample:** 18 gym-owned pages that rank, rendered and scanned.

| Signal | Share | Examples |
|---|---|---|
| First-visit or free-trial offer | **14/18 (78%)** | Team Quest 7-day trial; SBG "45 days free"; NWFA "30 Days Free" in its title plus a free private lesson; ENSO one week free; Portland City Boxing free class; Mata Leao "risk-free"; St Johns free class |
| Kids, youth or age information | **15/18 (83%)** | SBG ages 4-7 / 8-11; Team Quest Youth Jiu-Jitsu ages 6-12; Oregon Grappling Arts 3+; Portland City Boxing kids boxing 8-12; St Johns "ages 16+" |
| Testimonials or reviews | 8/18 | |
| FAQ | 8/18 | See question list below |

FAQ questions used as a stand-in for People Also Ask:
- "Are these Muay Thai classes beginner friendly?" (Mata Leao)
- "I'm not very athletic, will I feel left out?" (Mata Leao)
- "What do I need to bring to my first lesson?" (Mata Leao)
- "Should parents stay and watch?" (Mata Leao)
- "Does martial arts training ever turn kids into bullies?" (Mata Leao)
- "Will I get punched?" (TITLE Boxing)
- "What equipment do I need?" (TITLE Boxing)

**Depth, measured the same way for everyone:**

| Page type | Competitor median | Harbinger |
|---|---|---|
| Gym homepage | 1,068 words (n=11) | 450 words |
| Discipline page | 965 words (n=6) | 325-344 words |

On Harbinger's discipline pages, the class body copy itself is only 119-226 words.

**SERP features:** the local pack, ads, PAA, AI Overview and featured snippets could not be seen through the search tool. Competitor FAQs stand in for PAA.

## Page-type mismatch matrix

| Target page | Query | Harbinger page type | SERP dominant type | Severity |
|---|---|---|---|---|
| /classes/mma/ | mma gym portland | **Does not exist.** 404, but linked from the footer on every page. | MMA program page (33%) inside a local-commercial SERP | **HIGH** |
| /classes/boxing/ | boxing gym portland | Service page inside an MMA gym | Boxing-only gyms (89%) | **HIGH** (structural; the main levers are off-page) |
| / | mma gym portland | Landing Page: slogan H1 "here to win", CTA, stats, form. Address only in the footer; no map, directions or reviews. | Local Page / gym homepage (44%; 78% local-commercial) | **MEDIUM**. Right URL, wrong emphasis. |
| /classes/muay-thai/ | muay thai portland | Thin Service page. No schedule, coach, price, FAQ, or CTA above the fold. | Local 56% / Service 22% | **MEDIUM** |
| /classes/bjj/ | bjj portland | Thin Service page. No belt ranks, no gi/no-gi times. | BJJ-specialist Local 67% | **MEDIUM** |
| / | harbinger mma | Brand homepage | Navigational: official site expected #1, currently #6 | **MEDIUM** (launch risk) |
| /pricing/ | decision step for every query | Product-like: prices + CTA | Supporting page | **ALIGNED** on type. Has content gaps (SXO-08). |

## Findings

### SXO-01: No MMA program page, and the sitewide footer link 404s (HIGH)

**Evidence**
- `Footer.astro` line 25 links "MMA" to `/classes/mma/`. That URL 301s and then returns 404.
- The schedule has five MMA sessions:
  - MMA Striking: Mon 5 PM, Thu 5 PM
  - MMA: Mon 7:30 PM, Wed 7:30 PM, Sun 12 PM
- The lead form offers an "MMA" option.
- Three of the 9 "mma gym portland" results are dedicated MMA program pages (SBG, NWFA, Team Quest).
- The old site had `/class-types/mma`, and it has no redirect.

**Recommendation**
- Add `src/data/classes/mma.json` with banner/featured images in `src/assets/classes/`. The `[slug].astro` route will generate `/classes/mma/` and add it to the sitemap and to ClassGrid.
- Page content:
  - what MMA class covers (MMA Striking → MMA → Comp Sparring path)
  - the five session times above
  - the coaches: Jake, Eli, Mitch
  - a beginner entry point
- Until that page exists, point the footer link at `/classes/`.
- Map `/class-types/mma` to `/classes/mma/` in the launch redirects.

**Files:** `src/data/classes/mma.json` (new), `src/assets/classes/`, `src/components/Footer.astro`.

**How we'd know it failed**
- `/classes/mma/` does not return 200, or is missing from `sitemap-0.xml`.
- A post-launch crawl finds any internal 404.
- 90 days after launch, GSC shows no impressions for /classes/mma/ on "mma … portland" queries.

### SXO-02: "Book first class" never says what the first class costs or what happens next (HIGH)

**Evidence**
- Every CTA on the home, pricing and class pages says "BOOK FIRST CLASS" or "book first session".
- No page says whether the first class is free, costs $18 (the day pass), or needs a membership.
- After submitting, the form only says "we'll reach out to schedule your first session".
- 14 of 18 competitor pages lead with a free or low-risk trial. This is the main decision barrier in this SERP.

**Recommendation**
- State the real first-visit policy in four places:
  - the hero subline under the CTA (`HeroSection.astro`)
  - the CTA section copy (`CTAForm.astro`), e.g. "First class [free / $18, credited to membership]. We'll text you within 1 business day to pick a time."
  - above the plans on `/pricing/`
  - the success state in `BookClassForm.tsx`
- Add "What to bring" and "What to expect in your first class" on class pages (see SXO-05).

**Files:** `src/components/home/HeroSection.astro`, `src/components/CTAForm.astro`, `src/components/BookClassForm.tsx`, `src/pages/pricing.astro`.

**How we'd know it failed**
- In a 5-second test, readers still can't answer "What does my first class cost?" from the home page above the fold.
- Over the first 30 days, Netlify Forms `trial-signup` submissions per session are no better than the old site's lead rate.

### SXO-03: The homepage promises "Youth", but there is no youth product (HIGH; parent persona scores 13/100)

**Evidence**
- `ClassesSection.astro` (around line 68) shows a "Youth: Build discipline and confidence" card. It is not a link.
- `schedule.json` has 0 youth or kids classes. The `classTypes` enum in `content.config.ts` has no youth value.
- The form has no kids option and no field for a child's age.
- Pricing has no youth rates.
- The old site had `/minor-liability-waiver` and `/minor-competition-release-waiver`, and neither has a new equivalent. That suggests some minors do train.
- 15 of 18 competitor pages show kids programs with age bands. St Johns Boxing states "ages 16+", which is the clean pattern if there is no kids program.

**Recommendation.** Choose one:
- **(A) Publish a youth program.** Create `/classes/youth/` (new `src/data/classes/youth.json`) covering:
  - ages, days and times, price
  - the coach
  - a waiver link
  - "Can parents watch?"
  - "Is sparring involved?"

  Add youth classes to `schedule.json`, add a `youth` classType and filter, and add "Youth (under 18) + child age" to the form.
- **(B) No kids program.** Change the card to the real policy (e.g. "Teens 16+ with parent waiver"). State the minimum age on /pricing/ and in an FAQ.

With either option, restore the minor waiver pages.

**Files:** `src/components/home/ClassesSection.astro`, `src/data/schedule.json`, `src/content.config.ts`, `src/components/BookClassForm.tsx`, `src/pages/pricing.astro`.

**How we'd know it failed**
- A parent can't find the age range, time and price for a 10-year-old (or the minimum age) within 10 seconds of landing on the home page.
- The word "Youth" still appears with no link and no age.

### SXO-04: Proof gap: no reviews, KATU press unused, credentials buried (HIGH; Trust is the lowest dimension for every persona)

**Evidence**
- The site has no testimonials or reviews. A grep of `src` finds none.
- Excerpts on the home page and in coach cards are generic. For example, Eli's reads: "Eli is a world-class coach with extensive experience in professional combat sports." The detail bio has the specifics (BJJ black belt, Judo brown belt, 10+ years).
- "7 WORLD CLASS COACHES" is unsupported on the home page.
- A KATU feature from mid-2026 profiles the gym, owner Jake Izsó, and fighter Xavier Foster, who started training at 25. The site never mentions it.
- Off-site trust is thin: Yelp shows 3.6 stars from 5 reviews.
- The "mma gym portland" results include Wikipedia pages for the founders of rival gyms, so coaching pedigree is part of the SERP itself.

**Recommendation**
- Rewrite each coach `excerpt` to lead with the credential. Example for Jake: "Former pro boxer and MMA fighter, Golden Gloves, USA Boxing coach."
- Add a "Your coaches" block to `[slug].astro`, filtering coaches by their `discipline` field.
- Add a "Featured on KATU" link band to the home page.
- Add 3-6 real, attributed member quotes (first name, discipline, started as a beginner?).
- Link to the Google reviews profile.

**Files:** `src/data/coaches/*.json`, `src/components/home/CoachesSection.astro`, `src/pages/classes/[slug].astro`, `src/pages/index.astro`.

**How we'd know it failed**
- Re-scored personas still average below 15/25 on Trust.
- "World-class" is still the only credential visible on the home page.

Cross-reference: `/seo content` for E-E-A-T.

### SXO-05: Discipline pages are thin, mention no location, and show no CTA on the mobile first screen (MEDIUM)

**Evidence**
- Page length is 325-344 words against a competitor median of 965. Class body copy is 119-226 words.
- The body copy never mentions Portland.
- There are no schedule times, no coach, no price and no FAQ.
- On mobile, the first screen shows only the H1 and tagline. There's no CTA (screenshot `sxo-class-muay-thai`), and "Join Now" is hidden inside the hamburger menu.
- The Muay Thai page has no beginner reassurance. The BJJ and Boxing pages do have it.
- The Mata Leao Muay Thai page (2,016 words, FAQPage) and the NWFA pages (about 1,000 words, "30 Days Free") are the type that ranks.

**Recommendation.** Extend the `[slug].astro` template with:
- a hero CTA button ("Book your first Muay Thai class") plus a sticky CTA on mobile
- "When it runs": filter `schedule.json` by class
- "Who teaches it"
- "Your first class": level, what to bring, whether sparring is optional
- "Price": $18 day pass, plus a link to /pricing/
- 4-6 FAQs based on the competitor questions above
- one locating line, e.g. "Muay Thai classes on S Corbett Ave, Portland"

To support this, add optional `faq`, `whatToBring` and `levels` fields to the classes schema in `content.config.ts`.

**Files:** `src/pages/classes/[slug].astro`, `src/data/classes/*.json`, `src/content.config.ts`.

**How we'd know it failed**
- Class pages are still under 600 words.
- The mobile first screen still has no CTA.
- 90 days after launch, GSC average position for "[discipline] portland" is still worse than 20.

Cross-reference: `/seo page`.

### SXO-06: The homepage lacks local-page elements (MEDIUM)

**Evidence**
- The H1 is "here to win".
- The only place name above the fold is the eyebrow "Portland's Premier Combat Training Facility", which renders at `max-lg:text-[8px]` on mobile (`HeroSection.astro`).
- The address appears only in the footer. There's no map link, directions, parking or neighborhood.
- Hours are visible in the footer but missing from structured data. `src/lib/schema.ts` has no `openingHoursSpecification`, `geo` or `hasMap`.
- Competing gym homepages (ATT, Five Rings) carry GeoCoordinates, OpeningHoursSpecification and maps.

**Recommendation**
- Add a hero subline naming the disciplines and the location.
- Make the eyebrow at least 12px on mobile.
- Add a "Find us" band to the home page: address, Google Maps link, parking/transit notes, hours.
- In the schema add `geo`, `openingHoursSpecification` (matching the visible hours), `hasMap`, and `logo`/`image`.

**Files:** `src/components/home/HeroSection.astro`, `src/pages/index.astro`, `src/lib/schema.ts`.

**How we'd know it failed**
- The Rich Results Test shows no opening hours.
- 90 days after launch, the home page is not in the top 10 for "mma gym portland" in GSC.

Cross-reference: `/seo schema`, `/seo local`.

### SXO-07: Hours conflict between the site, the schedule and the listings (MEDIUM)

**Evidence**

| Source | Stated hours |
|---|---|
| New footer (`Footer.astro` lines 7-10) | Mon-Fri 8 AM-9:30 PM |
| `schedule.json` | Starts Monday at 6:00 AM (Conditioning) and 7:30 AM (Muay Thai Technique) |
| Old site | Mon-Fri 8am-9pm, Sat-Sun 10am-3pm |
| Apple Maps (per the branded SERP) | Weekdays 8 AM-10 PM |

**Recommendation**
- Generate the footer hours from the earliest and latest times in `schedule.json`, or correct them by hand.
- Sync GBP, Apple Maps and Yelp on launch day.

**Files:** `src/components/Footer.astro`, `src/data/schedule.json`.

**How we'd know it failed**
- The footer's opening time is still later than the earliest scheduled class.
- Any listing disagrees with the site after launch.

### SXO-08: Pricing inconsistencies and CTAs that don't match the plans (MEDIUM)

**Evidence**
- The JSON-LD in `pricing.astro` attaches the $75 initiation fee to the 3-Month Pass. The page shows no fee for that plan.
- The subhead says "cancel whenever you want", which contradicts a 3-month pass.
- The home page stat "$99 unlimited training" (`StatsSection.astro`) leaves out the 3-month commitment.
- All three plan CTAs say "book first class" and jump to the same lead form, so a visitor who wants a day pass can't buy one.
- There's no FAQ covering gear, freezes, discounts, youth rates, or whether invite-only Comp Sparring is included.
- The page has 4 H1s: each price is an `<h1>`.

**Recommendation**
- Make the page and the schema agree on the fee.
- Qualify both the "$99" stat and the subhead.
- Use plan-specific CTAs: "Start month-to-month", "Get the 3-month pass", "Drop in for $18".
- Add a pricing FAQ.
- Change the price elements from `<h1>` to `<p>`.

**Files:** `src/pages/pricing.astro`, `src/components/home/StatsSection.astro`.

**How we'd know it failed**
- The page and the schema still disagree.
- The day-pass CTA still lands on the trial form.

### SXO-09: The schedule page is a dead end (MEDIUM)

**Evidence**
- `/schedule/` is the destination of the hero's secondary CTA.
- `schedule.astro` has no `CTAForm`.
- Class names in `WeeklySchedule.tsx` don't link to their class pages.
- On mobile, the only way forward is the hamburger menu.

**Recommendation**
- Add `<CTAForm />` or a sticky "Book your first class" CTA.
- Link each class name to `/classes/{slug}/`.
- Add a legend: "New? Start with Fundamentals / Technique classes."

**Files:** `src/pages/schedule.astro`, `src/components/WeeklySchedule.tsx`.

**How we'd know it failed**
- The rendered `/schedule/` HTML still has no CTA.
- After launch, the schedule page has the highest exit rate on the site.

### SXO-10: The boxing and BJJ SERPs belong to specialist gyms, and on-page work alone won't win them (MEDIUM)

**Evidence**
- "boxing gym portland": 8 of 9 results are boxing-only gyms or Yelp boxing listings.
- "bjj portland": 6 of 9 are BJJ-only academies, plus a Gold BJJ listicle.
- Harbinger appears for neither query. Yelp already lists Harbinger under Brazilian Jiu-jitsu, Boxing and Kickboxing.

**Recommendation**
- Run `/seo local`: add GBP secondary categories for boxing, BJJ and Muay Thai/kickboxing (confirm the valid category names in GBP).
- Ask to be added to the Gold BJJ Portland list and the Tapology gym directory.
- Boxing page: add sparring groups, Advanced Boxing, Jake's USA Boxing credential, and ring/bag photos.
- BJJ page: add belt ranks, gi/no-gi split, Wednesday open mat (free), Sunday open rounds.

**Files:** `src/data/classes/boxing.json`, `src/data/classes/bjj.json`, plus off-site listings.

**How we'd know it failed**
- 90 days after launch, no Harbinger URL or listing is in the top 20 for either query.

### SXO-11: Weak branded SERP before migration (MEDIUM)

**Evidence**
- For "harbinger mma", the official site ranks #6, behind Instagram, Apple Maps, KATU, MapQuest and Yelp.
- The brand name collides with "Harbinger" gloves.
- The National BJJ Registry says the gym has no public website.
- The new site has no About page. The old `/about` has no equivalent.

**Recommendation**
- Add `/about/` with the founding story, the KATU feature and the team.
- Add Yelp and Apple Maps profile URLs to `sameAs` in `src/lib/schema.ts`.
- Correct the directory listings so they point to the site.
- Make sure the launch redirects are in place (owned by the technical audit).

**Files:** new `src/pages/about.astro`, `src/lib/schema.ts`.

**How we'd know it failed**
- 4 weeks after launch, GSC average position for "harbinger mma" is still worse than 1.5.

### SXO-12: The lead form biases interest and doesn't capture experience (LOW)

**Evidence**
- In `BookClassForm.tsx` the default interest is `"muay-thai"` (line 10).
- The options (lines 168-173) include Yoga and MMA, which have no pages. They leave out Judo, Conditioning, Youth and "Not sure yet".
- There's no field for experience level.

**Recommendation**
- Use an empty "Choose one" default and add the missing options.
- Add "Experience: none / some / competed" so coaches can tailor a nervous beginner's first session.

**File:** `src/components/BookClassForm.tsx`.

**How we'd know it failed**
- After launch, more than 50% of leads still say "muay-thai".

### SXO-13: Copy and tone (LOW)

**Evidence**
- "diciplines" / "VIEW ALL DICIPLINES" is misspelled in `ClassesSection.astro` lines 14 and 23.
- Every page leads with fighter language ("dominate", "devastating", "refuse to lose"). That works for fighters but no page has a beginner counterweight.

**Recommendation**
- Fix the spelling.
- Add one reassurance line per page, e.g. "Most members started with zero experience."

**File:** `src/components/home/ClassesSection.astro`.

**How we'd know it failed**
- The typo still shows up in the rendered home page.

### SXO-14: "Powered by Netlify" badge in staging screenshots (INFO)

A floating badge covers the bottom of the mobile viewport. It is likely staging-only.

**How we'd know it failed:** it still shows on the production domain after launch.

## User stories

Each story is derived from observed SERP signals.

1. **Nervous beginner (Awareness → Consideration).** As an adult who has never trained, I want to know if I can walk into a Muay Thai or MMA class without getting hurt or embarrassed, because I'm intimidated by fighters. I'm blocked by an **information gap**: no page says which class to start with, what to bring, or whether sparring is required.
   *Sources:*
   - Mata Leao FAQ: "Are these Muay Thai classes beginner friendly?", "I'm not very athletic, will I feel left out?"
   - TITLE Boxing FAQ: "Will I get punched?"
   - SBG MMA copy: "without having to fear injury or intimidation"
   - the "best mma gym portland for beginners" results
2. **Trial / value shopper (Decision).** As a Portland local comparing three gyms, I want to try a class free or cheaply before I commit, because every other gym offers that. I'm blocked by **price sensitivity**: "Book first class" doesn't say what it costs.
   *Sources:*
   - Free-trial offers on 14 of 18 competitor pages: Team Quest 7-day, SBG 45-day, NWFA 30-day, Portland City Boxing free class
   - Cost-query results: $100-180/mo, $50-100 sign-up fees, $10-20 drop-ins
3. **Parent (Consideration).** As a parent, I want an age-appropriate class with safe coaches for my 9-year-old, because I want my child to build discipline and confidence. I'm blocked by a **trust and information gap**: the site shows no youth schedule, ages, price or safety policy.
   *Sources:*
   - Kids info on 15 of 18 competitor pages
   - SBG age bands 4-7 / 8-11
   - Team Quest Youth Jiu-Jitsu ages 6-12, "Free first month"
   - Mata Leao FAQ: "Should parents stay and watch?", "Does martial arts training turn kids into bullies?"
4. **Experienced fighter (Consideration).** As an amateur fighter new to Portland, I want to see who coaches here, their records, and the sparring / fight-team path, because coaching level decides my camp. I'm blocked by a **trust gap**: the excerpts say "world-class" without specifics, and there's no fight-team or apply path (the old /apply page has no equivalent).
   *Sources:*
   - Wikipedia entries for Matt Thornton and Matt Lindland in the "mma gym portland" top 9
   - Team Quest's "one of the world's most credentialed programs"
   - An ATT review praising its "higher level MMA coaching"
5. **Brand navigator (Decision / navigational).** As someone who saw Harbinger on KATU or Instagram, I want the address, today's hours and how to start, because I'm ready to visit. I'm blocked by **conflicting hours** across Apple Maps, the old site and the new footer, and the official site sits #6 behind Instagram and directories.
   *Source:* the branded "harbinger mma" SERP.

## Gap analysis (SXO Gap Score)

Scored for the site's key landing pages against the SERPs above.

| Dimension | Score | Evidence |
|---|---|---|
| Page Type | 8/15 | The homepage is the right URL type but reads as a landing page. There's no MMA page (404). The boxing SERP wants specialist gyms. |
| Content Depth | 5/15 | Home: 450 words vs a 1,068 median. Class pages: 325-344 vs 965. No FAQ anywhere. |
| UX Signals | 9/15 | Clear hero CTA, short form, schedule filter, fast static pages. Against that: a sitewide 404 link, no mobile CTA on class pages, a dead-end schedule page, and every CTA going to the same form. |
| Schema | 10/15 | ExerciseGym with NAP, priceRange and sameAs; OfferCatalog; Service and BreadcrumbList. Missing: hours, geo, hasMap, logo. The fee in the schema doesn't match the page. |
| Media | 7/15 | Discipline and coach imagery are there. No video or facility tour (competitors NWFA, Portland City Boxing and Team Quest have them). The hero image has empty alt text. No photos of the 12,300 sq ft facility. |
| Authority | 4/15 | No reviews or testimonials, the KATU feature isn't used, credentials are buried, Yelp is 3.6 from 5 reviews, and the brand ranks #6 for its own name. |
| Freshness | 5/10 | The schedule is current and the footer says © 2026. There are no dated updates; the old /announcements/schedule-changes has no equivalent. |
| **Total** | **48/100** | |

## Persona scores

Weighting: the SERPs are local-commercial, so the beginner and value-shopper personas carry the most weight. The parent persona is medium weight because 83% of competitor pages show kids information. Scores apply to the home → class → pricing journey.

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| Parent seeking kids classes | 3/25 | 3/25 | 4/25 | 3/25 | **13/100** | Critical Mismatch |
| Discipline specialist (BJJ or boxing hobbyist) | 12 | 11 | 9 | 13 | **45/100** | Needs Work |
| Nervous beginner | 14 | 10 | 9 | 15 | **48/100** | Needs Work |
| Trial / value shopper | 18 | 13 | 10 | 14 | **55/100** | Needs Work |
| Experienced fighter | 19 | 16 | 11 | 12 | **58/100** | Needs Work |
| Brand navigator (KATU / Instagram / referral) | 20 | 15 | 12 | 17 | **64/100** | Good |

### Persona notes, weakest first

**1. Parent (13).**
- *Role:* parent of a child aged 5-12.
- *Journey stage:* Consideration.
- *Emotional state:* evaluating carefully.
- *Key questions:* Ages? Times? Price? Is it safe? Can I watch?
- *SERP evidence:* kids programs on 15 of 18 competitor pages, Mata Leao's parent FAQ.
- *Page reality:* one unlinked "Youth" card. No schedule entries, page, price or form option.
- *Fix:* SXO-03 option A or B. The parent needs the ages, times, price and waiver within one tap of the home page.

**2. Discipline specialist (45).**
- *Evidence:* BJJ-only and boxing-only gyms dominate their SERPs.
- *Page reality:* no class times on the class page, no belt ranks or instructor on the BJJ page, no ring or sparring-group details on the boxing page. The schedule filter says "GRAPPLING", not "BJJ".
- *Fix:* SXO-05 template sections ("When it runs", "Who teaches it") plus the SXO-10 content.

**3. Nervous beginner (48).**
- *Evidence:* the beginner-safety FAQs above.
- *Page reality:*
  - Positives: "Zero experience required", "No prior experience is necessary" (BJJ), "never thrown a punch" (Boxing), and Fundamentals classes on the schedule.
  - Gaps: no "start here" path, no first-class cost or what-happens-next, no testimonials, and aggressive tone on every page.
- *Fix:* SXO-02, the "Your first class" block in SXO-05, a schedule legend (SXO-09) and beginner testimonials (SXO-04).

**4. Trial / value shopper (55).**
- *Evidence:* free trials on 78% of competitor pages; the cost-query ranges.
- *Page reality:* pricing is public and competitive. But the trial cost is unknown, the 3-month fee is inconsistent, "$99" is unqualified, and the plan CTAs are generic.
- *Fix:* SXO-02 and SXO-08.

**5. Experienced fighter (58).**
- *Evidence:* the founder-pedigree Wikipedia results and Team Quest's credential claims.
- *Page reality:*
  - Positives: Advanced classes, Sparring groups, Comp Sparring (invite only), the $18 day pass, "Elite: Professional fight prep".
  - Gaps: vague excerpts, no fight-team results, no apply path.
- *Fix:* SXO-04 credential-first excerpts. Add a "Fight team / Apply" CTA and replace the old /apply page.

**6. Brand navigator (64).**
- *Page reality:* the title and footer NAP work, and the `tel:` link is good. But there's no map or directions, the hours conflict, and KATU and About content are missing.
- *Fix:* SXO-06, SXO-07, SXO-11.

### Systemic issues
- **Trust is the lowest dimension for every persona**, averaging 9.0/25. Next lowest are Clarity at 11.3, Action at 12.3 and Relevance at 14.3.
- The proof exists (coach bios, KATU) but isn't surfaced where decisions are made.
- Each of the three CTAs leads to the same unexplained lead form.

### Priority actions
1. Resolve the youth promise (SXO-03). This fixes the weakest persona.
2. Surface proof: credential-first coach excerpts, KATU, real testimonials (SXO-04). This fixes the systemic trust gap.
3. Rebuild the class template with times, coaches, first-class info, FAQ and a mobile CTA, and add `/classes/mma/` (SXO-05, SXO-01).
4. State the first-visit offer everywhere a CTA appears (SXO-02), and fix the pricing inconsistencies (SXO-08).

## Cross-skill recommendations

| Skill | Use it for |
|---|---|
| `/seo local` | GBP categories, hours sync, directory cleanup, Yelp reviews (local intent dominates every query) |
| `/seo schema` | `openingHoursSpecification`, `geo`, `hasMap`, `logo`, an optional FAQPage on class pages, fixing the 3-month fee |
| `/seo content` | E-E-A-T: coach credentials, testimonials, the About page |
| `/seo page` | The thin class pages (325-344 words) |

## Structured findings (for audit-data.json, category "Search Experience")

```json
{
  "category": "Search Experience",
  "score": 48,
  "score_label": "SXO Gap Score",
  "serp_consensus": {
    "mma gym portland": {"dominant": "Local", "pct": 44, "local_commercial_pct": 78},
    "muay thai portland": {"dominant": "Local", "pct": 56},
    "bjj portland": {"dominant": "Local (specialist)", "pct": 67},
    "boxing gym portland": {"dominant": "Local (specialist)", "pct": 89},
    "harbinger mma": {"dominant": "Navigational", "official_site_position": 6}
  },
  "personas": [
    {"name": "Parent seeking kids classes", "score": 13},
    {"name": "Discipline specialist", "score": 45},
    {"name": "Nervous beginner", "score": 48},
    {"name": "Trial/value shopper", "score": 55},
    {"name": "Experienced fighter", "score": 58},
    {"name": "Brand navigator", "score": 64}
  ],
  "findings": [
    {"id": "SXO-01", "severity": "High", "title": "No MMA program page; footer /classes/mma/ 404s sitewide", "file": "src/data/classes/mma.json (new); src/components/Footer.astro", "check": "/classes/mma/ returns 200 and is in sitemap"},
    {"id": "SXO-02", "severity": "High", "title": "First-class cost/offer never stated; 14/18 competitors lead with free trials", "file": "src/components/home/HeroSection.astro; src/components/CTAForm.astro; src/components/BookClassForm.tsx; src/pages/pricing.astro", "check": "5-second test answers 'what does my first class cost?'"},
    {"id": "SXO-03", "severity": "High", "title": "'Youth' promised on home; no youth classes, ages, price or form option", "file": "src/components/home/ClassesSection.astro; src/data/schedule.json; src/content.config.ts; src/components/BookClassForm.tsx", "check": "Parent finds ages/time/price or minimum age within 10s"},
    {"id": "SXO-04", "severity": "High", "title": "No reviews/testimonials, KATU unused, coach credentials buried in generic excerpts", "file": "src/data/coaches/*.json; src/components/home/CoachesSection.astro; src/pages/classes/[slug].astro", "check": "Persona Trust average >= 15/25 on re-score"},
    {"id": "SXO-05", "severity": "Medium", "title": "Class pages thin (325-344 words vs 965 median), no times/coach/price/FAQ, no mobile CTA above fold", "file": "src/pages/classes/[slug].astro; src/data/classes/*.json; src/content.config.ts", "check": "Class pages >= 600 words with CTA in mobile first screen"},
    {"id": "SXO-06", "severity": "Medium", "title": "Homepage lacks local-page elements; 8px Portland eyebrow on mobile; no hours/geo in schema", "file": "src/components/home/HeroSection.astro; src/pages/index.astro; src/lib/schema.ts", "check": "Rich Results shows openingHours; home top 10 for 'mma gym portland' at 90 days"},
    {"id": "SXO-07", "severity": "Medium", "title": "Hours conflict: footer 8 AM vs 6:00 AM Monday class; old site and Apple Maps differ", "file": "src/components/Footer.astro; src/data/schedule.json", "check": "Footer hours span all scheduled classes; listings match"},
    {"id": "SXO-08", "severity": "Medium", "title": "Pricing: 3-month initiation fee in schema but not on page; unqualified $99 stat; generic CTAs; no FAQ; 4 H1s", "file": "src/pages/pricing.astro; src/components/home/StatsSection.astro", "check": "Page and schema agree; plan-specific CTAs"},
    {"id": "SXO-09", "severity": "Medium", "title": "Schedule page has no CTA and no links to class pages", "file": "src/pages/schedule.astro; src/components/WeeklySchedule.tsx", "check": "CTA present in rendered /schedule/"},
    {"id": "SXO-10", "severity": "Medium", "title": "Boxing and BJJ SERPs owned by specialist gyms; needs GBP categories and directory presence", "file": "src/data/classes/boxing.json; src/data/classes/bjj.json; off-site", "check": "Harbinger in top 20 for either query at 90 days"},
    {"id": "SXO-11", "severity": "Medium", "title": "Official site #6 for own brand; brand collision; no About page", "file": "src/pages/about.astro (new); src/lib/schema.ts", "check": "GSC 'harbinger mma' avg position <= 1.5 four weeks post-launch"},
    {"id": "SXO-12", "severity": "Low", "title": "Form defaults to muay-thai; options omit Judo/Conditioning/Youth; no experience field", "file": "src/components/BookClassForm.tsx", "check": "Lead interest distribution not dominated by the default"},
    {"id": "SXO-13", "severity": "Low", "title": "'DICIPLINES' typo x2; no beginner counterweight to fighter tone", "file": "src/components/home/ClassesSection.astro", "check": "Typo absent from rendered home"},
    {"id": "SXO-14", "severity": "Info", "title": "'Powered by Netlify' badge overlays mobile viewport on staging", "file": "Netlify site settings", "check": "Badge absent on production"}
  ]
}
```

## Limitations

- **SERPs are not live Google SERPs.** They came from the WebSearch tool: not geolocated to Portland, possibly in a different order, and with no visibility of the local pack, ads, PAA, AI Overview or featured snippets. Positions are approximate. Competitor FAQs were used as a stand-in for PAA.
- **No performance data.** This is pre-launch: the new pages aren't indexed, and there's no GSC, GA4, GBP or form-conversion data. Rankings, CTR and lead rates can't be measured yet.
- **Business facts not verified:**
  - whether Harbinger runs youth classes or a free first class
  - the true hours
  - whether the 3-month pass carries the $75 fee

  SXO-02, SXO-03, SXO-07 and SXO-08 depend on these answers.
- **Approximate competitor counts.** Signal counts were regex scans of 18 rendered pages, so some matches may come from navigation links. Yelp and Apple Maps details come from search summaries.
- **Limited visual and UX coverage.** Mobile first-screen screenshots exist only for /, /classes/muay-thai/ and /pricing/. There was no user testing and no Core Web Vitals check.
- **No wireframes.** IST/SOLL wireframes weren't requested, so none were made.

Generate a PDF report? Use `/seo google report`.
