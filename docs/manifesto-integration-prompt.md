# Cursor prompt: rebuild /manifesto to look IDENTICAL to the InDesign manifesto

Paste everything below the line into Cursor (agent mode, with the RA_Website repo open).

> **This replaces the previous approach.** The current `main-site/manifesto/` build reinterpreted the manifesto as a generic responsive page (colour bands, cards, a plain date list, serif body font). That is the wrong design. The client wants `/manifesto` to look **identical to the original manifesto** (`Manifesto_2026 Folder/Manifesto_2026.pdf`), which is a fixed 16:9 print layout: every page is a full-bleed photograph with text composited on top at exact positions, heavy condensed display type, and specific overlay components (a red/white calendar grid, text on a cardboard sign, silhouette photos, outlined heading boxes). We are going to reproduce that exactly, not reinterpret it.

## Context

`main-site/` is a static, no-build Cloudflare Pages site (vanilla HTML/CSS/JS). Push to `main` deploys. Extensionless URLs via `main-site/_redirects`. Follow `AGENTS.md`.

We already have InDesign's own **"Publish Online" HTML export** of this exact document at:

```
Rubber Armstrong 2026 Camp Manifesto/publication-web-resources/
  html/publication.html          <- cover (page 0)
  html/publication-1.html ... publication-23.html   <- pages 1..23
  css/idGeneratedStyles.css      <- the generated layout CSS
  image/                         <- (low-res flattened images used by the export)
```

**This export is a pixel-exact, fixed 1920×1080 reproduction of each manifesto page, with the text as live (selectable) HTML positioned exactly as in the PDF.** It is the source of truth for layout. Verified facts:
- Text is live HTML (e.g. ~300 positioned text spans on the Cheat Sheet page), not flattened images.
- The real fonts are **Bebas Neue** (condensed display headings), **Raleway** (Regular/SemiBold/ExtraBold sub-heads and body), and a little **Minion Pro** (serif). Bebas Neue and Raleway are free Google Fonts.
- **The export does NOT bundle those font files**, so right now it renders in fallback sans and does not look like the PDF. Loading the correct fonts is essential.

Supporting material already prepared:
- `docs/manifesto-content.md` — verbatim copy, per-page image mapping, colour palette, and the corrected font list.
- `Manifesto_2026 Folder/Manifesto_2026.pdf` — the visual target. Compare every page against it.
- `Manifesto_2026 Folder/Links/` — original high-resolution images.

## Goal

Serve at **`/manifesto`** a **standalone, full-screen** page that reproduces all 24 manifesto pages so they look **identical to the PDF**, using the InDesign export as the fixed-layout source, the correct fonts, and high-res imagery. Keep it **unlisted** (no menu link, not in `sitemap.xml`).

## Approach: fixed 16:9 stages, scaled to fit

1. **Reuse the export's per-page layout, don't rebuild it from scratch.** Bring the 24 pages (`publication.html` + `publication-1..23.html`) and `css/idGeneratedStyles.css` into `main-site/manifesto/`. Each page is a fixed 1920×1080 canvas; keep that internal layout intact so positions stay pixel-exact.
2. **Assemble them into one standalone page** at `main-site/manifesto/index.html`: stack the 24 pages **vertically** (scroll down through the manifesto), each page a fixed 1920×1080 "stage".
3. **Scale each stage to fit the viewport.** Wrap each 1920×1080 stage in a container and apply `transform: scale(scale)` with `transform-origin: top left`, where `scale = viewportWidth / 1920`, recomputed on load/resize, so each page fills the width and preserves 16:9. No cropping, no horizontal scroll. Set the wrapper height to the scaled height so the vertical scroll flows naturally.
4. **Load the real fonts** (self-host in `main-site/manifesto/fonts/`, or Google Fonts): **Bebas Neue** and **Raleway** (Regular, SemiBold, ExtraBold), plus a served serif substitute for Minion Pro. Map the export's `font-family` names (`"Bebas Neue"`, `"Raleway"`, `"Raleway SemiBold"`, `"Raleway ExtraBold"`, `"Minion Pro"`) to the loaded faces so headings render in Bebas Neue and body in Raleway. This step is what makes it match the PDF.
5. **Swap in high-res imagery.** The export references low-res copies in `image/`. Replace each with the optimised high-res original from `Links/` (mapping in `docs/manifesto-content.md`), converting `.ai`/`.eps` to SVG/PNG and compressing large files (WebP/JPEG, max ~2000px). Keep the same on-page positions/sizes.
6. **Portrait phones: rotate-to-landscape.** Add a `@media (orientation: portrait)` full-screen overlay prompting "Please rotate your device to landscape to read the manifesto", with a rotate icon. In landscape, show the scaled pages normally. (The pages are landscape by nature; do not try to reflow them.)
7. **Standalone / full-screen:** no site header, footer, or nav. Black or brand-dark page background behind the stages. `body { margin:0 }`.

## Clean URL + keep it unlisted

- `main-site/_redirects`: keep/add `/manifesto /manifesto/index.html 200` (200 rewrite so the URL stays `/manifesto`).
- No nav link anywhere; not added to `main-site/sitemap.xml`.

## Fidelity acceptance criteria — check each page against the PDF

Open `Manifesto_2026 Folder/Manifesto_2026.pdf` and compare page by page. For each of the 24 pages, verify:
1. Same full-bleed background image, same crop/position.
2. Headings render in **Bebas Neue** (condensed, heavy) — e.g. CHEAT SHEET, KEY DATES, TEAMWORK MAKES THE DREAM WORK, THANK YOU — matching the PDF's weight and placement; body/labels in Raleway.
3. Text sits in the same positions as the PDF (Cheat Sheet text on the cardboard sign; Teamwork's five role columns along the bottom; outlined heading boxes present).
4. **Page 2 (Key Dates)** shows the calendar grid with the correct red (burn-week) vs light cells, day-of-week header row, over the sunset/torn-calendar photo — matching the PDF.
5. **Page 3 (map)** shows the satellite image with the "WE ARE HERE" and station labels/pins in place.
6. No fallback-sans headings, no missing images, no clipped or overflowing text.

## General acceptance criteria

1. `/manifesto` is standalone (no site chrome), scrolls through all 24 pages, each scaled to fill the viewport width with no horizontal scroll.
2. On desktop it is visually indistinguishable from the PDF; text is real/selectable.
3. On a portrait phone, the rotate-to-landscape prompt appears; in landscape the pages display scaled.
4. Reachable at the clean `/manifesto` URL; absent from all nav menus and from `sitemap.xml`.
5. No other page or the roles app is affected; site still previews via `cd main-site && python -m http.server 8000`.

## Notes

- Keep everything inside `main-site/manifesto/` plus the single `_redirects` edit. Vanilla HTML/CSS/JS only, no build step, no framework.
- The old reinterpreted files in `main-site/manifesto/` (the band/card `index.html`, `css/manifesto.css`, `js/manifesto.js`) are being replaced by this fixed-layout approach — remove or overwrite them.
- Accessibility tradeoff is accepted here: the export's text is positioned spans (identical look prioritised over clean semantics). Add a visible "Download the PDF" link (to `Manifesto_2026.pdf`, copied into the folder) as an accessible fallback.
- The high-res optimised images already sitting in `main-site/manifesto/images/` from the previous attempt can be reused where they match.
