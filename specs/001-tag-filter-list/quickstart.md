# Quickstart - Tag Filtered List Template

## 1. Environment Prep
1. Ensure dependencies are installed: `npm install`.
2. Start local dev: `npm run dev` (runs Tailwind watcher + `hugo server -D`).
3. Work from branch `001-tag-filter-list` and confirm a clean `git status`.

## 2. Template Updates
1. Open `C:\home\ykazheka\personal-site\static-site\layouts\_default\list.html`.
2. Add a back link labeled "View all posts" above the tag title using muted text styling and accent hover/focus.
3. Render the title as "Posts tagged with \"{Tag Name}\"" using the standard h1 styles.
4. Maintain ~12px spacing between back link and title, and ~24px between title and the post list.

## 3. Styling Verification
1. Confirm the back link uses muted text color (#6B6B6B) with accent hover/focus (#8BC34A).
2. Confirm no new colors, fonts, or UI patterns are introduced.
3. Validate the layout remains single-column on mobile.

## 4. Verification & QA
1. **Responsive**: Validate at 375px, 768px, and 1024px.
2. **Accessibility**: Confirm the title is semantic h1 and the back link is keyboard focusable.
3. **Build**: Run `npm run build` and `hugo --environment production --minify`.

## 5. Deployment Notes

- Inspect `C:\home\ykazheka\personal-site\static-site\public\tags\{tag}\index.html` to confirm header ordering before deploying via GitHub Pages.

## 6. QA Log

- **Responsive checks**: Not run yet (requires review at 375px/768px/1024px).
- **Build output**: `npm run build` failed due to `pagination-controls.html` referencing `PagerSize` on `*page.Pager`; rerun after the pagination template issue is resolved. `hugo --environment production --minify` not run because the same error is expected.
- **Accessibility**: Not run yet (verify keyboard focus and h1 semantics).
