# Quickstart: Two-Column List Template

## Prerequisites
1. Install Node.js 18+ and npm.
2. Ensure Hugo Extended 0.126.x is installed (or use the bundled binary under `tools/hugo/hugo.exe`).
3. Run `npm install` to populate Tailwind/PostCSS dependencies.
4. Confirm `config/_default/params.toml` contains the `author` block (name, bio, photo path, alt text) before starting local work.

## Local Development
1. Start the asset watcher with `npm run dev` to rebuild Tailwind output as you edit list templates.
2. In a second terminal run `hugo server -D --disableFastRender` (reference the bundled Hugo binary if not on PATH).
3. Visit `http://localhost:1313/blog/` (or the section using the list template) and confirm:
   - The page renders as two columns on `md` and wider viewports.
   - Each post entry shows title, tags, date, and a short excerpt.
   - The sidebar contains the author photo/bio and the unique tag directory fed by Hugo taxonomies.

## Responsive & Content Validation
- Resize dev tools to 360px, 414px, 768px, and 1024px to verify the sidebar stacks beneath the post list on small screens and returns to a side-by-side layout on larger screens.
- Temporarily remove tags from a post to validate the "No tags" fallback and check that the empty-state banner appears when the section has zero posts.
- Run `hugo list taxonomies` or inspect the rendered `public/tags/` pages to confirm tag links in the sidebar stay in sync with Hugo's taxonomy counts.
- Toggle the `author.photo` path to an invalid value to ensure the sidebar gracefully falls back to text-only bio content.

## Verification Checklist
- Run `npm run build` followed by `hugo --environment production --minify --cleanDestinationDir` to produce the static site with the updated list template.
- Execute Lighthouse (mobile + desktop) and axe scans focusing on the list page to ensure accessibility and performance scores stay ≥90.
- Spot-check the generated HTML to confirm the author photo uses a fingerprinted asset URL and falls back gracefully when missing.

## Production Build
1. Run `npm run build` to emit optimized Tailwind CSS.
2. Execute `hugo --environment production --minify` (add `--cleanDestinationDir` when needed) to generate the static site.
3. Deploy `public/` via the existing CDN pipeline after validating responsive behavior and tag completeness on the production preview.
