# Quickstart - Footer Social Icons

## 1. Environment Prep
1. Ensure dependencies are installed: `npm install`.
2. Start local dev: `npm run dev` (runs Tailwind watcher + `hugo server -D`).
3. Work from branch `001-footer-icon-links` and confirm a clean `git status`.

## 2. Footer Updates
1. Open `C:\home\ykazheka\personal-site\static-site\layouts\partials\site-footer.html`.
2. Replace the text labels for Email, LinkedIn, Twitter, GitHub with inline SVG icons that inherit `currentColor`.
3. Keep existing link classes so icon links use the current color, hover, and focus utilities.
4. Confirm `aria-label` remains descriptive for each icon link.

## 3. Styling Verification
1. Verify icons use the existing brand accent color and hover state.
2. Confirm spacing and alignment remain consistent at 375px, 768px, and 1024px.

## 4. Verification & QA
1. **Responsive**: Check footer layout at 375px, 768px, and 1024px.
2. **Accessibility**: Ensure each icon link has a label announced by screen readers.
3. **Build**: Run `npm run build` and `hugo --environment production --minify`.

## 5. Deployment Notes

- Inspect `C:\home\ykazheka\personal-site\static-site\public\index.html` to confirm footer icons render before deploying via GitHub Pages.

## 6. QA Log

- **Responsive checks**: Not run yet (requires manual review at 375px/768px/1024px).
- **Build output**: `npm run build` failed due to `pagination-controls.html` referencing `PagerSize` on `*page.Pager`; rerun after the pagination template issue is resolved. `hugo --environment production --minify` not run because the same error is expected.
- **Lighthouse/Accessibility**: Not run yet (requires Lighthouse + axe tooling against a running preview).
