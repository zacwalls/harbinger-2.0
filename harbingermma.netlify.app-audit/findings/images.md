# Images — 75/100

Checked inline by the orchestrator (no dedicated agent). Image weight and LCP detail is in `performance.md`.

## What works
- The Astro image pipeline outputs AVIF/WebP with `srcset` (39 WebP and 6 AVIF references on the homepage).
- Explicit `width`/`height` on content images, and CLS passes everywhere (≤ 0.006).
- Decorative backgrounds (homepage hero, coaches section background, class banners) use an empty `alt`, which is correct for decorative images.
- Coach and class card images have descriptive alt text. The logo has `alt="Harbinger MMA"`.
- The large SVGs in `src/assets` (e.g. the 806 KB `inline-svg-001.svg`) are not inlined into the HTML. Homepage HTML is about 15 KB gzipped.

## Findings

### [Medium] Schedule filter icons have no alt attribute
- Evidence: 6 `<img>` on `/schedule/` (checkmark, striking, grappling, dumbbell, mma, yoga SVGs) have no `alt` at all. Screen readers announce the file name.
- Fix: the buttons already carry text labels, so the icons are decorative: add `alt=""`. File: `src/components/WeeklySchedule.tsx` (about line 74).
- How we'd know it failed: `curl -s …/schedule/ | grep -oE '<img[^>]*>' | grep -vc 'alt='` returns non-zero.

### [Medium] No social share image (og:image)
- Evidence: no `og:image` / `twitter:image` on any page (see technical.md #7).
- Fix: add a 1200×630 JPG/PNG share image (logo plus a gym photo), and per-page images for coaches and classes from their existing featured photos. File: `src/layouts/Layout.astro`.

### [Low] Homepage hero is served as JPG
- Evidence: `hero-image.*.jpg` (1440×1443) in `srcset` is JPG, while the rest of the page is WebP/AVIF. It is the LCP element.
- Fix: render it with `<Picture formats={["avif","webp"]}>` or `format="webp"`.

### [Low] Logo SVGs are heavy
- `NavLogo.svg` is 88 KB on disk (26 KB transferred) and loads in the nav and footer. `harbinger-logo-complex.svg` is 61 KB. Run SVGO.

### [Low] Very large source files
- `coaches-section-bg.jpg` is 11.9 MB, `coaches-hero-bg.jpg` 6.9 MB, `g-featured.jpg` 5.6 MB, and `src/assets` is 57 MB. Users never get these (they're resized at build), but they slow builds and bloat the repo. Pre-resize to ~2560 px on the long edge.
