# Quickstart: Paginated List Navigation

## Prerequisites
1. Install Node.js 18+ and run `npm install` for Tailwind/PostCSS dependencies.
2. Ensure Hugo Extended 0.126.x is installed (repo expects the extended binary for SCSS/Tailwind integration).
3. Confirm `config/_default/config.toml` (or `hugo.toml`) exposes `paginate = 10` and, if needed, `paginatePath = "page"` so URLs match `/page/N/`.
4. Add at least 15 Markdown posts under `content/posts/` (or use `hugo new` to create stubs) to exercise multi-page output.

## Local Development
1. Start Tailwind in watch mode with `npm run dev`.
2. In another terminal run `hugo server -D --disableFastRender` to preview drafts and pagination simultaneously.
3. Visit the section that consumes `layouts/_default/list.html` (e.g., `http://localhost:1313/posts/`) and verify:
   - Exactly 10 posts render on page 1 and `Older posts` links to `/posts/page/2/`.
   - Page indicators ("Page X of Y") appear under the post list, not the sidebar.
   - Pagination controls stack vertically on <=640px viewports and remain side-by-side above the fold on >=768px.

## Implementation Steps
1. Create `layouts/partials/pagination-controls.html` to render numbered/prev/next buttons using the contract in `contracts/pagination-controls.md`.
2. Create `layouts/partials/pagination-meta.html` and include it from `partials/head-assets.html` so `<link rel="prev/next">` tags appear only when appropriate.
3. Update `layouts/_default/list.html` to:
   - Call `.Paginate` on the posts collection before iterating.
   - Replace the current `.Pages` loop with `.Paginator.Pages`.
   - Include the pagination controls partial below the post list but above the sidebar wrapper.
4. Add `site.Params.pagination.redirect_target` (or similar) so `layouts/404.html` can link users to the correct archive when they hit `/page/N/` beyond the total.
5. Refresh the Tailwind build to ensure new utility classes compile, and re-run `hugo server -D` to confirm files hot-reload.

## Verification Checklist
- Navigate through every generated page (`/posts/`, `/posts/page/2/`, ... `/posts/page/Y/`) to confirm counts, active states, and disabled controls.
- Trigger keyboard navigation (Tab/Shift+Tab) to ensure focus order hits each control once and `aria-current="page"` updates per page.
- Run Lighthouse (mobile + desktop) and axe on `/posts/` and `/posts/page/2/`; log scores >=90 for performance and accessibility.
- Inspect page source to verify `<link rel="prev">` and `<link rel="next">` tags match the current paginator state.
- Manually request `/posts/page/99/` (or another out-of-range URL) from the `public/` build to ensure the 404 page redirects or links users back to the archive within 3 seconds.

## Production Build
1. Run `npm run build` to emit optimized Tailwind CSS.
2. Execute `hugo --environment production --minify --cleanDestinationDir` to produce the final static output.
3. Spot-check the generated `public/posts/page/*/index.html` files for consistent markup, then deploy via the existing GitHub Pages workflow (adjust if deployment target changes once confirmed).


