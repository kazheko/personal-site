# Quickstart – Single Post Page Template

## 1. Environment Prep
1. Install dependencies: `npm install` (already satisfied in repo but rerun if packages changed).
2. Start Tailwind + Hugo watcher: `npm run dev` (invokes PostCSS watch and `hugo server`).
3. Open `http://localhost:1313` and pin two sample posts for live preview (one with tags, one without).

## 2. Implement Layout & Metadata Partial
1. Create `layouts/partials/post-meta-row.html` with the following responsibilities:
   - Accepts the `.Page` context plus derived data (title, tags, date).
   - Outputs a visually hidden "Tags" label, a flex-wrapped `<ul>` of tag chips (links to `/tags/{tag}/`), and a `<time>` element with ISO `datetime` + formatted text (e.g., `Nov 21, 2025`).
   - Emits an `"Untagged"` pill when `.Params.tags` is empty.
2. Add `layouts/_default/single.html` that extends `baseof.html`:
   - Wraps content with `<article class="mx-auto w-full max-w-3xl px-4">`.
   - Renders the title inside `<h1>` with prominent Tailwind classes (e.g., `text-4xl font-bold tracking-tight`).
   - Immediately includes the metadata partial via `{{ partial "post-meta-row.html" . }}`.
   - Prints `.Content` inside a `prose` container for readable typography.

## 3. Styling Guidance
1. Reuse Tailwind tokens already defined (spacing scale, color palette). If new chip colors are needed, extend `tailwind.config.js` in the `theme.extend` block.
2. Ensure mobile-first layout using stack classes (`flex flex-wrap gap-2`) and apply media modifiers only when necessary (e.g., `md:flex-row`).
3. Keep focus states visible via `focus-visible:ring` utilities; do not rely on outline removal.

## 4. Verification & QA
1. **Cross-device**: Inspect the template at 375px, 768px, and 1280px widths. Confirm long titles wrap and metadata stays near the top fold.
2. **Edge content**: Preview posts with 0 tags, >5 tags, and long tag names. Confirm row wraps gracefully.
3. **Accessibility**: Tab through tag chips to verify focus order and screen reader labels. Run axe (browser extension) on a sample post.
4. **Performance**: Run `hugo --environment production --minify && npm run build` to confirm no build regressions, then execute Lighthouse in mobile mode and capture screenshots.
5. **Deployment preview**: Inspect `public/posts/<sample>/index.html` to confirm markup order before publishing via GitHub Pages workflow.

Following these steps prepares the repo for `/speckit.tasks` and later implementation branches.
