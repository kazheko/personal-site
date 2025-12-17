# Quickstart: Blog Post Image Zoom

1. **Checkout & install**
   - `git checkout 001-image-zoom`
   - `npm install` (ensures Tailwind + PostCSS deps ready for asset builds).
2. **Add zoomable markup**
   - Update Hugo image render hook/shortcode to emit `data-zoomable="true"`, `data-focus-label`, unique ids, and a downscaled inline rendition (via `.Resize`/`.Fit`) while storing the original source in `data-original-src`.
   - Authors enable zoom per image via Markdown attributes (e.g., `![Diagram](./asset.png){zoom="true" focus-label="Diagram detail"}`), keeping non-zoomed images untouched.
3. **Implement overlay behavior**
   - Create `assets/js/image-zoom.js` using the research decisions: toggle a `zoom-active` body class, lock scroll via `overflow-hidden`, clone the clicked image into the overlay container, and restore focus/scroll on dismissal.
   - Wire the script via the existing JS bundling pipeline (import into the bundle referenced in `layouts/partials/foot-scripts.html`).
4. **Style with Tailwind**
   - Use Tailwind utilities (e.g., `fixed inset-0 flex items-center justify-center`) to define overlay layout, background blur/dim, transitions, and responsive max sizes.
   - `npm run dev` already watches Tailwind input and writes compiled CSS back to `assets/css/tailwind.css`; keep overlay classes within that entry file.
5. **Local verification**
   - Run `npm run dev` (for Tailwind) and `tools/hugo/hugo.exe server -D --renderToMemory --watch=false` in another terminal; record any existing template errors (e.g., current pagination partial expects `.PagerSize`) before layering zoom changes.
   - Visit `http://localhost:1313/test-page-1/` and trigger each `zoom="true"` image to confirm overlays open, center, and return focus without scroll jumps.
   - With an overlay open, click/tap the image, click the dimmed backdrop, and attempt a scroll gesture; confirm each action dismisses the overlay and restores scroll position, then log observations here.
   - In multiple browsers (desktop + mobile viewport emulation), confirm clicks/taps and scroll gestures open/close overlays without layout shifts.
   - Capture mobile viewport checks (e.g., 360px width) with tall and panorama fixtures, add notes/screenshots here, and verify `zoom-tall.svg` / `zoom-wide.svg` retain at least 90% viewport coverage without horizontal scrolling.
   - Run Lighthouse + axe (or equivalent) on a sample post to confirm focus order, contrast, and performance budgets remain green.
6. **Prepare for deploy**
   - Build production artifacts via `npm run build` then `hugo --environment production --minify`.
   - Inspect `public/` output (especially posts with multiple zoomable images) and ensure GitHub Pages workflow notes are updated if file paths changed.
