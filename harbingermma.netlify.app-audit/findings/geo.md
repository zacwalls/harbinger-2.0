# GEO / AI Search Readiness — harbingermma.netlify.app (pre-launch)

**Category score: 51 / 100**

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| Citability | 25% | 48 | 12.0 |
| Structural Readability | 20% | 50 | 10.0 |
| Multi-Modal Content | 15% | 35 | 5.3 |
| Authority & Brand Signals | 20% | 40 | 8.0 |
| Technical Accessibility | 20% | 80 | 16.0 |
| **Total** | | | **51** |

Platform readiness (estimates, not measured; no DataForSEO credentials):

| Platform | Score | Main limiter |
|---|---|---|
| Google AI Overviews / AI Mode | 55 | Hours conflict, no FAQ or kids answer. Schema and SSR are strong. |
| ChatGPT Search | 40 | Weak Bing entity ("harbinger mma portland" returns dictionary and Harbinger Motors results). Mixed Reddit signals. |
| Perplexity | 45 | Leans on Reddit: 3 positive comments, 1 removed negative post, and a stale "$90/month" price in the comments. |
| Bing Copilot | 38 | Same Bing entity weakness. The Yelp listing shows class times as opening hours. |

## The three test questions

| Question | Can an AI answer it from the site? | Why |
|---|---|---|
| "How much is Harbinger MMA?" | **Partly** | The prices are on /pricing/ and in the JSON-LD OfferCatalog, but no sentence states them. Each price sits in its own `<h1>` (`$105<span>/ month</span>`). The trafilatura extract of /pricing/ contains **no "$105", "$99" or "$18"**, only "$75 initiation" and "$297 total". The homepage stat says "unlimited training $99", which conflicts with the $105 month-to-month price. The site never says whether the first class is free. |
| "Does Harbinger teach kids?" | **No** | The only signal is a homepage card reading "Youth / Build discipline and confidence." None of the 52 schedule slots mention kids, youth or teens. There are no ages, no kids page and no kids price. |
| "What time is BJJ?" | **Partly** | /schedule/ is server-rendered and every slot is in the HTML (BJJ Mon/Wed 6:00–7:30 PM, Tue/Thu 8:00–9:30 AM, Fri 5:00–6:00 PM plus Fundamentals 6:00–7:30 PM, Sat Fundamentals 10–11 AM, Sun Open Rounds 10 AM–12 PM, Wed free Open Mat 5–6 PM). But it is a grid of `div`/`p` with `<p>Mon</p>` day labels, no `<table>` or `<time>`, and no "last updated" date. /classes/bjj/ shows no times at all. |

## What works

- **Fully static, server-rendered HTML.** `render_page.py --mode auto` returned `is_spa=false` on all 13 pages tested. The schedule island (`WeeklySchedule client:load`) is server-rendered with all 52 slots in raw HTML, so no JavaScript is needed to read anything.
- **All AI crawlers are allowed** (see the table below). Requests with spoofed AI-bot user agents got 200 on both staging (Netlify) and the current production site (Cloudflare/Webflow), so there is no user-agent blocking. Caveat: verified-bot IPs could be treated differently.
- **The JSON-LD is better than crawl.jsonl suggests.** It is an `@graph`, and crawl.jsonl only recorded the first node. Every page has `ExerciseGym` (`@id .../#gym`, full address, phone, email, priceRange, sameAs) plus `WebSite`. Class pages add `Service` and `BreadcrumbList`. Coach pages add `ProfilePage`/`Person` (`worksFor` → gym). /pricing/ adds an `OfferCatalog` with $105/mo + $75 initiation fee, $99/mo ($297 total) and the $18 day pass.
- **Name, address and phone are consistent:** 2626 S Corbett Ave, Portland, OR 97201, (503) 310-5001, contact@harbingermma.com, in the footer of every page and in the schema.
- **Coach bios contain specific, citable credentials:** Eli is a BJJ black belt and Judo brown belt with 10+ years coaching. Jake is a USA Boxing coach with Golden Gloves experience. Nick trained under Benny "the Jet" Urquidez and Kru Puk (MTA North Hollywood).
- **Class pages open with self-contained definitions of 150–250 words** (for example "Brazilian Jiu-Jitsu is a martial art focused on…"). These are good for "what is X" questions, though they are generic rather than about this gym.
- **Specific facts are stated:** a 12,300 sq. ft. facility, 150+ active members, 7 coaches, 40+ sessions per week.
- **A big step up from the live Webflow site.** There, /pricing is a template 404 with lorem ipsum, and the homepage is about 200 words, mostly shopping-cart text.

## AI crawler access (staging robots.txt = `User-agent: *` / `Allow: /` + Sitemap)

| Crawler | What it governs | Status |
|---|---|---|
| OAI-SearchBot | ChatGPT Search citations | Allowed |
| ChatGPT-User | User-initiated fetches in ChatGPT | Allowed |
| GPTBot | OpenAI training only | Allowed |
| Claude-SearchBot | Claude search citations | Allowed |
| Claude-User | User-initiated fetches in Claude | Allowed |
| ClaudeBot | Anthropic training only | Allowed |
| PerplexityBot / Perplexity-User | Perplexity index and fetches | Allowed |
| Googlebot | Google Search, AI Overviews, AI Mode | Allowed |
| Google-Extended | Gemini/Vertex training and grounding (not Search or AIO inclusion) | Allowed |
| Bingbot | Bing and Copilot (Bing is also widely reported as a ChatGPT Search source) | Allowed |
| Applebot / Applebot-Extended | Siri/Spotlight / Apple Intelligence training only | Allowed / Allowed |
| CCBot, cohere-ai, Meta-ExternalAgent | Training | Allowed |

The production robots.txt the source generates (`src/pages/robots.txt.ts`) is identical. The current Webflow production robots.txt is an empty 200, which also means allow-all. Allowing the training bots is a reasonable choice for a local gym because it helps models learn the brand. **No change needed.**

**llms.txt:** missing (404 at `/llms.txt`, `/llms-full.txt` and `/.well-known/llms.txt`; production also 404). **RSL 1.0:** none (no `License:` line in robots.txt, no `license.xml`). Neither matters for a local gym (see GEO-11).

## Brand mention footprint

| Source | Finding |
|---|---|
| Wikipedia / Wikidata | 0 results for "Harbinger MMA". Expected for a local gym; not a priority. |
| Reddit | 3 positive organic comments: r/askportland 2025-10-28 ("amazing… like $90 a month… welcoming community"), r/OregonCity 2025-10-28 ("super affordable… really active competition boxing program"), r/askportland 2026-05-07 ("Harbinger MMA in south Portland"). 1 negative post, r/askportland 2025-12-08 "Has anyone had a experience with Harbinger MMA? Beware!", about contract and cancellation. Moderators removed it ("not asked in good faith") and it has 0 comments, but it is still in Reddit archives. |
| YouTube | Channel @HarbingerMMA exists: about 5–6 subscribers, 4 videos about a year old (e.g. "Grappling MMA with the Mayne man", "ADCC with Jake and G"). **Not linked from the site or in sameAs.** YouTube mentions are the strongest reported correlate of AI citations, and this is the weakest channel. |
| Instagram / TikTok / Facebook | IG @harbinger_mma about 6.5k followers, 205 posts. TikTok about 1.7k followers. The Facebook /p/ profile shows "9 likes" in Bing. |
| Yelp / Vagaro | Both listings exist. The Bing snippet of Yelp shows class-like times as hours. The Vagaro description reads "the **private training facility** for the Harbinger MMA team and the hub for Harbinger Brands apparel." |
| LinkedIn | No company page found. |
| Bing entity | "harbinger mma portland" returns only dictionary, Harbinger Motors and Harbinger Pro Audio results. The gym only appears for the exact token "harbingermma". "Harbinger" is heavily shared with other brands. |

---

## Findings

### GEO-01 — High — "Does Harbinger teach kids?" cannot be answered
- **Evidence:** The only mention is the "Youth / Build discipline and confidence" card (`src/components/home/ClassesSection.astro:68`). None of the 52 entries in `src/data/schedule.json` is a kids or youth class. There are no ages, no price and no "Primary Interest" form option. The old Webflow site has minor liability and minor competition waivers, so minors apparently do train. An AI will either say "unclear" or guess.
- **Recommendation:** Get the actual policy from the owner, then state it in one sentence. Either add a youth program (ages, times, price) as `src/data/classes/youth.json` with schedule entries, or replace the card copy with the exact rule. Example, only if true: "Teens 13–17 train in our adult classes with a parent-signed waiver; we do not run a kids program." Repeat it in a pricing FAQ (GEO-02).
- **Files:** `src/components/home/ClassesSection.astro`, `src/data/classes/`, `src/data/schedule.json`, `src/pages/pricing.astro`
- **How we'd know it failed:** About 4–6 weeks after launch, asking ChatGPT Search or Perplexity "Does Harbinger MMA in Portland have kids classes?" still gets "unclear", or a guess that does not cite harbingermma.com.

### GEO-02 — High — Pricing has no extractable answer sentence, and the "$99" stat conflicts with it
- **Evidence:** In `src/pages/pricing.astro` each price is a separate `<h1>` (the page has 4 H1s). The boilerplate-stripped text contains none of $105, $99 or $18. The homepage stat "unlimited training $99" (`src/components/home/StatsSection.astro:23`) contradicts the $105 month-to-month price; $99 is the 3-month average. Reddit says "like $90 a month". The meta description has no prices. The site does not say whether the first class or trial is free, and does not explain how to cancel, even though the headline says "cancel whenever you want" while the 3-month pass is a commitment. That gap is exactly the topic of the negative Reddit post.
- **Recommendation:** Open /pricing/ with a plain answer paragraph, for example: "Harbinger MMA memberships cost $105/month month-to-month (plus a one-time $75 initiation fee), $297 for a 3-month pass (about $99/month), or $18 for a day pass. Every membership includes unlimited classes in BJJ, Muay Thai, boxing, wrestling, judo, MMA and conditioning." Change the price `<h1>`s to `<p>`/`<span>`. Add a short FAQ with question headings: "Is the first class free?", "How do I cancel?", "Is there a contract?", "Do you offer kids or family rates?", "Is open mat free?". The owner must supply these answers. Put the prices in the meta description. Change the homepage stat to "from $99/mo".
- **Files:** `src/pages/pricing.astro`, `src/components/home/StatsSection.astro`
- **How we'd know it failed:** `render_page.py https://harbingermma.com/pricing/ --json` still has no "$105" in `extracted_text`, or "How much is Harbinger MMA?" on Perplexity or ChatGPT returns $90 or $99 instead of $105 + $75.

### GEO-03 — Medium/High — Opening hours conflict everywhere, and the schema has no hours
- **Evidence:** The footer (`src/components/Footer.astro`) says Mon–Fri 8 AM–9:30 PM, Sat 9 AM–12:30 PM, Sun 10 AM–3:30 PM. The schedule has Monday 6:00 AM Conditioning and 7:30 AM Muay Thai Technique. The old site says Mon–Fri 8am–9pm, Sat–Sun 10am–3pm. The Yelp snippet shows "Mon 6:00 pm – 7:00 pm, Tue 8:00 am – 9:30 am". The `ExerciseGym` node has no `openingHoursSpecification`.
- **Recommendation:** Settle on one set of hours, then fix the footer and add `openingHoursSpecification` to `siteGraph()`, generated from the same hours array so they cannot drift. Update Google Business Profile, Yelp, Vagaro and Facebook on launch day.
- **Files:** `src/components/Footer.astro`, `src/lib/schema.ts`, `src/data/schedule.json`
- **How we'd know it failed:** Asking an AI "Is Harbinger MMA open Monday at 7 AM?" gets an answer that contradicts the schedule, or the Rich Results Test shows no opening hours.

### GEO-04 — Medium — Class times live only in a non-semantic grid, not on the class pages
- **Evidence:** The extracted text of /classes/bjj/ contains no times. In `src/components/WeeklySchedule.tsx` days are `<p>Mon</p>` and classes are `div`/`p`. There are 0 `<table>` and 0 `<time>` elements, and no "updated" date. Boilerplate extractors that remove repeated lines lose the pairing of day and time.
- **Recommendation:** In `src/pages/classes/[slug].astro`, add a "When are BJJ classes at Harbinger MMA?" section that lists that discipline's slots as full sentences ("Monday 6:00–7:30 PM"). That needs a `discipline` slug field on each `schedule.json` entry. In `WeeklySchedule.tsx`, use full day names as `<h2>`, wrap times in `<time>`, and render a list or table. Add "Schedule current as of <date>".
- **Files:** `src/pages/classes/[slug].astro`, `src/components/WeeklySchedule.tsx`, `src/data/schedule.json`, `src/content.config.ts`
- **How we'd know it failed:** The `extracted_text` of /classes/bjj/ still lacks "Monday".

### GEO-05 — Medium — The namesake discipline (MMA) and Yoga have no pages, and the footer links /classes/mma/ to a 404 on every page
- **Evidence:** `curl` returns 404 for /classes/mma/ and /classes/yoga/. The footer "programs" list links to /classes/mma/. The schedule has MMA (Mon/Wed 7:30 PM, Sun 12 PM), MMA Striking, Yoga (Tue/Wed 7:30 PM, Thu 8 PM) and many "Muay Thai/Kickboxing" slots. The site has a yoga coach (Mack).
- **Recommendation:** Add `src/data/classes/mma.json` and `yoga.json`, and consider kickboxing. The MMA page should be the strongest page on the site.
- **Files:** `src/data/classes/`, `src/components/Footer.astro`
- **How we'd know it failed:** /classes/mma/ is not 200 or is missing from the sitemap.

### GEO-06 — Medium — Weak, conflicting entity definition plus a name collision
- **Evidence:** Bing does not connect "harbinger mma portland" to the gym (see the brand table). Vagaro says "private training facility". The old /about (indexed by Bing, shown in brand results) says "the competition focused team of Harbinger Brands". The new site says "for everyone". The new site has no About page, so /about will 404. Coaches are first names only, although YouTube names "Eli Mayne". The owner "Jake" has no surname. There is no founding year, logo/image node or founder in the schema. `sameAs` omits YouTube, Yelp, Google Business Profile and Vagaro.
- **Recommendation:** Create `src/pages/about.astro` as the canonical page for the business. Open it with a one-sentence definition, for example "Harbinger MMA is a mixed martial arts gym at 2626 S Corbett Ave in South Portland, Oregon, open to beginners through professional fighters". Add the founding year, owner's full name, facility size and how it relates to Harbinger Brands. 301 /about to it. Paste the same definition into Vagaro, Yelp, Google Business Profile, Facebook and Instagram. Add surnames to the coach JSON (with consent) and `sameAs` links for coaches (Tapology, Smoothcomp, USA Boxing). Extend `sameAs`, and add `logo`, `image`, `founder` and `foundingDate` in `siteGraph()`. Always write "Harbinger MMA" together with "Portland".
- **Files:** new `src/pages/about.astro`, `src/lib/schema.ts`, `src/data/coaches/*.json`, `src/pages/coaches/[slug].astro`
- **How we'd know it failed:** About 8 weeks after launch, Bing "harbinger mma portland" still shows no gym result in the top 5, or "What is Harbinger MMA?" in ChatGPT still describes a private team facility.

### GEO-07 — Medium — Thin off-site footprint, and the cancellation narrative is not addressed
- **Evidence:** See the brand table. YouTube, the strongest reported citation correlate, has about 5 subscribers and is unlinked. The only detailed Reddit thread is the removed complaint about the contract and cancellation.
- **Recommendation:** Link and embed @HarbingerMMA (footer, `sameAs`, a video on the homepage or about page). Publish factual cancellation terms (GEO-02). Ask members for Google and Yelp reviews. Pitch local "best MMA gyms in Portland" roundups. Do not seed Reddit.
- **Files:** `src/components/Footer.astro`, `src/lib/schema.ts`
- **How we'd know it failed:** Perplexity's answer to "Is Harbinger MMA good?" cites the complaint thread, or cites no first-party or review sources.

### GEO-08 — Low — Multi-modal content is thin
- **Evidence:** The hero image and every class banner have no `alt`. Other alts are one word ("BJJ", "Eli"). There are 0 video or iframe embeds and no `og:image` (already known). There are no labeled facility photos despite the "12,300 sq. ft." claim.
- **Recommendation:** Write descriptive alts (e.g. "No-gi BJJ class drilling guard passes at Harbinger MMA, Portland"). Add facility photos and one embedded YouTube video.
- **Files:** `src/components/home/HeroSection.astro`, `src/pages/classes/[slug].astro`, `src/components/ResponsiveImage.astro`
- **How we'd know it failed:** The crawl still reports images without alt on class pages.

### GEO-09 — Low — Structural readability: vague headings and no question-shaped content
- **Evidence:** H1s and H2s such as "here to win", "for everyone", "complete combat system" and "world class pedigree". Pricing has 4 H1s. No page has a question heading or an FAQ. "diciplines" is misspelled twice (`ClassesSection.astro:14` and the button).
- **Recommendation:** Keep the brand voice in eyebrow text, but make the headings descriptive ("MMA, BJJ and Muay Thai classes in Portland"). Use one H1 per page. Add 3–5 FAQ items to /pricing/ and each class page ("Do I need experience?", "Gi or no-gi?", "What should I bring?").
- **Files:** `src/pages/*.astro`, `src/components/home/*.astro`
- **How we'd know it failed:** The heading audit still shows more than one H1 on /pricing/ and no `?` in any H2 or H3.

### GEO-10 — Low — Launch handoff for AI indexes (overlaps with technical)
- **Evidence:** Bing currently indexes www.harbingermma.com, including /about. The new site canonicalizes to the apex domain and has no old-URL redirects. Staging serves `Allow: /` with no noindex because it was built with `site=harbingermma.com`, so the guards in `robots.txt.ts` and `Layout.astro` never fire. OAI-SearchBot or Bing could index and cite the netlify.app copy.
- **Recommendation:** Add 301s from www to apex and from old paths to new ones. On launch day, submit the sitemap to Bing Webmaster Tools and ping IndexNow (Bing's index feeds Copilot). Add `X-Robots-Tag: noindex` for the `*.netlify.app` host, or confirm Netlify redirects it to the custom domain.
- **Files:** new `public/_redirects` or `netlify.toml`, `astro.config.mjs`
- **How we'd know it failed:** `site:harbingermma.netlify.app` returns results in Bing, or old /about returns 404 after launch.

### GEO-11 — Info — llms.txt and RSL
- **Evidence:** Both are absent (404).
- **Recommendation:** Optional. Google ignores llms.txt and no major AI search engine has confirmed using it. If you want one, add a short `public/llms.txt` with name, address, hours, prices, a schedule link and the coach list (about 15 minutes). An RSL license is not relevant for a local gym.
- **How we'd know it failed:** Not applicable.

## Top 5 highest-impact changes

1. **Pricing answer paragraph and FAQ** (trial, cancellation, contract, kids rates), and fix the "$99" stat. About 1–2 h plus owner answers. (GEO-02)
2. **State the kids/youth policy** in one sentence, or add a youth program page. About 30 min after the owner decides. (GEO-01)
3. **Reconcile hours and add `openingHoursSpecification`;** sync Google Business Profile, Yelp and Vagaro on launch day. About 1 h. (GEO-03)
4. **About page plus a single synced entity description**, adding YouTube, Yelp and Google Business Profile to `sameAs`, and coach surnames. About 3–4 h. (GEO-06, GEO-07)
5. **Per-class times on class pages and new MMA and Yoga pages.** About 3–5 h. (GEO-04, GEO-05)
