# Visual findings (Playwright, Chromium; desktop 1920x1080, mobile 375x812 @2x touch)

Score: 78/100

Screenshots: screenshots/{home,pricing,schedule,muay-thai}-{desktop,mobile}-{fold,full}.png, plus home-scrollbar-{1366,375}.png (classic scrollbars enabled).

## What works
- Home hero: H1 "HERE TO WIN" and two CTAs (BOOK FIRST CLASS, VIEW SCHEDULE) are above the fold on desktop (CTA top 596px) and mobile (CTA top 531px, 327x72, full width). Strong contrast.
- Header "JOIN NOW" button on desktop (120x40) is persistent; mobile uses a hamburger (>=44px).
- Base font 16px, viewport meta correct, no horizontal scroll on any of the 8 renders (scrollWidth == viewport width).
- Pricing and schedule mobile layouts are clean, no overlap or cut-off text.

## Findings

### 1. Mobile has no visible header CTA; sub-pages lack an above-the-fold CTA (Medium)
- Evidence: on mobile "Join Now"/"Schedule" links are 0x0 (inside the collapsed menu). /classes/muay-thai/ above the fold (375x812) shows only the hero text, no CTA; its only "BOOK FIRST SESSION" form is at y=3052. /schedule/ above the fold is only filter tiles; no CTA at all on the page except the footer. Pricing CTA starts at y=734 and is partly cut at the fold.
- Recommendation: add a sticky mobile "Book First Class" button or put Join Now beside the hamburger; add a hero CTA on class pages and the schedule page.
- Source: the header/nav component and class-page hero (src/layouts and src/components, class slug page under src/pages/classes/).
- Fails if: at 375x812, no element linking to #claim-trial is within the first 812px of /classes/muay-thai/ or /schedule/.

### 2. "w-screen" on html: latent overflow risk, no actual scroll today (Low)
- Evidence: html class is "w-screen" (100vw). With scrollbars forced visible (1366 and 375 widths) scrollWidth == clientWidth, so no scroll appears now, and the overlay scrollbars on mobile and headless do not trigger it. On desktop browsers with classic 15-17px scrollbars (Windows, some Linux/macOS settings) 100vw is wider than the viewport minus scrollbar and can produce a small horizontal scrollbar unless overflow-x is clipped. Overflowing children exist but are clipped: decorative blur div (right edge 2016px at 1920 wide, 471 at 375), hero IMG (2496px right edge at 1920, 713 at 375), home service cards reach 382px at 375 wide (7px past the viewport, clipped by a container).
- Recommendation: replace w-screen on html with w-full (or remove it) and add overflow-x: clip on body. Verify service cards on home do not exceed the viewport (see 4).
- Source: html element in the base layout (src/layouts/*.astro).
- Fails if: on Windows Chrome with classic scrollbars, document.documentElement.scrollWidth > clientWidth.

### 3. Small tap targets (Medium on mobile footer, Low on desktop)
- Evidence, mobile (all pages): footer links MMA/BJJ/BOXING/MUAY THAI/COACHES/PRICING/SCHEDULE/SHOP are 126-137 x 20px, spaced 32px apart; phone and email links are 102x18 and 216x18; footer social icons 20x20 (x3, no accessible name text); home "VIEW ALL DICIPLINES" 200x34. Desktop: nav links 29-31px tall, JOIN NOW 40px tall, footer links 24px.
- Recommendation: add padding (py-3, min-h-11) to footer links, phone and email, and social icons; make the phone a prominent tel: link. Add aria-labels to icon links.
- Source: footer component (src/components/Footer.*).
- Fails if: any footer anchor on 375px is under 44px tall (WCAG 2.2 AA minimum is 24px, Google recommends 48px).

### 4. Home service cards slightly wider than viewport on mobile (Low)
- Evidence: the flex container "flex flex-wrap max-md:flex-col gap-8 justify-center" and its card anchors have right edge 382px at a 375px viewport. Not visibly clipped in the fold but indicates 7px overflow hidden by a parent.
- Recommendation: check horizontal padding and width of the card grid on max-md; use w-full/min-w-0.
- Source: home page section in src/pages/index.astro or its component.
- Fails if: card right edge > viewport width in getBoundingClientRect at 375.

### 5. Schedule page mobile: tight filter tiles and empty gap (Low)
- Evidence: filter tiles span x=4 to 372 (about 4px side margin) while the rest of the page has about 24px; about 120px of empty space below the tiles before the H1. The filter appears above the H1 "CURRENT WEEKLY SCHEDULE" (H1 at y=568 on mobile, 464 on desktop), pushing the main heading and schedule below the fold.
- Recommendation: put H1 first, align tile padding with page gutters, reduce vertical gap.
- Source: src/pages/schedule.astro.
- Fails if: H1 top > 300px at 375x812.

### 6. Typo and placeholder-ish content (Low)
- Evidence: link text "VIEW ALL DICIPLINES" (should be DISCIPLINES) on home.
- Source: src/pages/index.astro.

### 7. Netlify badge overlays content (Info)
- "Powered by Netlify" floating badge covers the bottom-right of every fold including a pricing CTA. This is a staging artifact (Netlify drawer) and should disappear on custom domain or can be disabled; verify after launch.

### 8. Booking form button has no href (Info)
- "BOOK FIRST SESSION" is a button type=submit (form), fine. The header and hero CTAs link to #claim-trial on the home page; on other pages "/#claim-trial" navigates to home. Confirm the hash scrolls to the form without being hidden under the fixed header.
