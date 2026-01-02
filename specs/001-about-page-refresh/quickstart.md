# Quickstart - About Page Editorial Refresh

## 1. Environment Prep
1. Ensure dependencies are installed: `npm install`.
2. Start local dev: `npm run dev` (runs Tailwind watcher + `hugo server -D`).
3. Work from branch `001-about-page-refresh` and confirm a clean `git status`.

## 2. Layout Updates
1. Open `C:\home\ykazheka\personal-site\static-site\layouts\about\single.html` (or the existing About page partial).
2. Ensure the wrapper uses `about-shell` styles (`mx-auto w-full max-w-[720px] px-4 md:px-0`) to enforce width and mobile padding.
3. Apply body text styling via the `about-body` class to set `text-base`, `leading-[1.7]`, and `mb-[1.4em]` paragraph spacing.
4. Ensure `h2` headings use existing styles and add spacing utilities (`mt-12 mb-5`) via the `about-body` overrides.

## 3. Author Section Styling
1. Render the author name with `text-[22px] font-semibold text-brand-text-heading`.
2. Render the author role (if present) with `text-[15px] text-brand-text-muted`.
3. Render the author description with `text-base leading-[1.7] text-brand-text-primary`.
4. Avoid new colors or decorative backgrounds; use existing Tailwind classes only.

## 4. Verification & QA
1. **Responsive**: Validate at 375px, 768px, and 1024px. Confirm 16px side padding on mobile and centered 720px width on larger viewports.
2. **Typography**: Verify body text size, line height, and paragraph spacing match the requirements.
3. **Headings**: Confirm `h2` spacing matches ~48px top / ~20px bottom margins.
4. **Author block**: Check colors and sizes against the spec and ensure missing role text collapses spacing cleanly.
5. **Performance/Accessibility**: Run `npm run build` and `hugo --environment production --minify`, then perform Lighthouse and axe checks.

## 5. Deployment Notes

- Inspect `C:\home\ykazheka\personal-site\static-site\public\about\index.html` to confirm spacing and styles before deploying via GitHub Pages.

## 6. QA Log

- **Responsive checks**: Not run yet (requires manual browser review at 375px/768px/1024px).
- **Build output**: `npm run build` failed due to `pagination-controls.html` referencing `PagerSize` on `*page.Pager`; rerun after existing pagination template issue is resolved. `hugo --environment production --minify` not run because the same error is expected.
- **Lighthouse/axe**: Not run yet (requires Lighthouse + axe tooling against a running preview).
