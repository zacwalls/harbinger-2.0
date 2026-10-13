# Performance findings (lab only)

Method: PSI API was rate-limited (no key), so Lighthouse 13.5.0 CLI ran locally, mobile emulation with default throttling, one run per page. No CrUX/field data exists. INP cannot be measured in the lab; TBT (0 ms on all four pages) is the proxy and suggests INP risk is low.

Score: **82/100**

| Page | Perf | FCP | LCP | TBT | CLS | Weight |
|---|---|---|---|---|---|---|
| / | 85 | 2.7s | 3.7s (NI) | 0 | 0.006 | 558 KiB |
| /schedule/ | 97 | 1.6s | 2.5s (borderline) | 0 | 0.003 | 95 KiB |
| /classes/bjj/ | 94 | 2.5s | 2.5s (borderline) | 0 | 0.003 | 135 KiB |
| /coaches/ | 83 | 2.6s | 4.1s (Poor) | 0 | 0.006 | 680 KiB |

CWV status (lab, mobile): LCP fails on /coaches/ (>4.0s), needs work on / ; INP likely pass (TBT 0); CLS pass everywhere. TTFB is 30-200 ms (good).

## What works
- Astro static output, brotli on HTML, TTFB 0.03-0.2s.
- Hashed `/_astro/*` assets are `max-age=31536000, immutable`.
- Image pipeline already emits AVIF/WebP/JPG with srcset; hero has `fetchpriority=high`, `loading=eager`, width/height set. CLS near zero.
- Below-fold images are lazy. No third-party scripts besides Google Fonts. JS is tiny (preact+signals ~8 KiB, only on /schedule/ island).
- Font is `display=swap`, with preconnect.

## Findings

### 1. High: /coaches/ hero ships a 219 KB AVIF at 2560w to a mobile viewport (LCP 4.1s)
Evidence: `coaches-hero-bg...gFeFp.avif` 218,679 B was the biggest request; image-delivery insight estimates 446 KiB savings. Source `src/assets/coaches-hero-bg.jpg` is 6.9 MB. The `sizes` attribute does not constrain mobile, so the browser picks the 2560w candidate.
Fix: set a correct `sizes` (e.g. `100vw`) and a smaller `widths` list (640, 960, 1280), lower AVIF quality, or crop a dedicated mobile art-directed source like the BJJ page does (that page's mobile banner is 47 KB and hits 2.5s). Check `fetchpriority="high"` is on this hero.
Files: the hero image component in `src/pages/coaches/index.astro` (or its component), `src/assets/coaches-hero-bg.jpg`.
Failure check: Lighthouse mobile LCP on /coaches/ stays above 2.5s or hero transfer exceeds ~80 KB.

### 2. High: Homepage LCP 3.7s, with over-served card images (274 KiB est. savings)
Evidence: class card images are served at 768w WebP even though displayed ~360px wide: conditioning-featured 121 KB, judo 106 KB, muay-thai 68 KB, bjj 49 KB, boxing 41 KB. All load eagerly enough to compete with the hero. The hero uses a 1440w AVIF (45 KB) at `h-[160%]` oversized with parallax, which forces a larger decoded image.
Fix: add `sizes="(min-width:1024px) 33vw, 100vw"` and 360/540/720 widths on the cards, reduce WebP quality to ~70, confirm cards are `loading="lazy"`. Consider a smaller hero width on mobile.
Files: `src/pages/index.astro` and the class-card component; hero-image usage.
Failure check: homepage transfer >300 KiB or LCP >2.5s on mobile Lighthouse.

### 3. Medium: Google Fonts stylesheet is render-blocking (about 0.8s on throttled mobile)
Evidence: render-blocking insight lists fonts.googleapis.com css (817 ms wasted) plus Layout CSS (179 ms). Chain: HTML, Google CSS, gstatic woff2 (22 KB). FCP 1.6-2.7s is mostly this chain, and it is why schedule and BJJ pages sit at exactly 2.5s LCP.
Fix: self-host Space Grotesk variable woff2 (e.g. `@fontsource-variable/space-grotesk` or file in `public/fonts`), `<link rel=preload as=font type=font2 crossorigin>`, with `font-display: swap` and a size-adjusted fallback. Removes two third-party origins.
File: the shared `src/layouts/Layout.astro` head (font links) and global CSS.
Failure check: render-blocking insight still lists fonts.googleapis.com, or FCP above 1.8s on /schedule/.

### 4. Medium: Oversized SVG logos used as img (26 KB nav logo on every page, 45 KB sword logo on home)
Evidence: `NavLogo.svg` transfers 26 KB (source 88 KB, likely embedded raster or heavy paths) and loads twice per page (header and footer). `harbinger-logo-complex.svg` 45 KB. Nav logo is the single largest request on /schedule/.
Fix: run SVGO, remove embedded metadata/base64, aim for under 8 KB; reuse one asset.
Files: `src/assets/NavLogo.svg`, `src/assets/harbinger-logo-complex.svg`.
Failure check: NavLogo transfer >10 KB.

### 5. Medium: Source images are very large (build-time cost, repo weight)
Evidence: `src/assets/classes` 23 MB, `src/assets/coaches` 14 MB; coaches-section-bg.jpg 11.9 MB, coaches-hero-bg.jpg 6.9 MB. With `imageCDN: false`, Astro's build-time optimization handles output (confirmed: output is AVIF/WebP), so users are not served these, but builds are slow and any `<img>` using `public/` or a remote URL would skip optimization. Pre-resize sources to 2560px max.
Failure check: any `/_astro/*.jpg` over 300 KB served.

### 6. Low: HTML is `max-age=0, must-revalidate`
Evidence: `cache-control: public,max-age=0,must-revalidate` on all four pages. This is the Netlify default and is correct for HTML (revalidates via ETag, instant deploys). No change needed; do not set long HTML TTLs. Optionally add `netlify.toml` headers for `/favicon.*` and `/fonts/*` (favicon.ico has no immutable policy, 4.5 KB).

### 7. Info: Netlify HUD script (`/.netlify/scripts/hud`, 10 KB, 60s cache) appears on the staging deploy only
It is injected by Netlify on deploy previews/staging UI and is not part of the source; exclude it when judging production. Weight numbers above include it (about 10 KiB).

### 8. Info: INP/CLS risk
TBT 0 ms and a single small Preact island on /schedule/ give low INP risk. CLS 0.003-0.006 is well under 0.1. Re-verify INP with field data after launch (CrUX needs traffic on the production domain).

## Priority
1. Fix coaches hero sizing/quality (#1). 2. Resize homepage card images (#2). 3. Self-host font (#3). 4. SVGO logos (#4).
Expected result: LCP under 2.5s on all four pages, scores above 95.
