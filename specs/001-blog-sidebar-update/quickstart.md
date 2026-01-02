# Quickstart - Blog Sidebar Update

## 1. Environment Prep
1. Install dependencies: `npm install`.
2. Start the local toolchain: `npm run dev` (Tailwind + `hugo server -D`).
3. Work from branch `001-blog-sidebar-update`; confirm `git status` is clean.

## 2. Sidebar Layout Updates
1. Locate the blog homepage list template and existing sidebar partial under `layouts/`.
2. Ensure the sidebar only renders two blocks: author bio and tags.
3. Keep section titles styled as uppercase labels (no H1-H4 tags) and confirm the author block contains name, description, and optional secondary metadata.
4. Render the full tag list from the taxonomy without truncation or omission.

## 3. Typography & Spacing Guidance
1. Base sidebar text uses 14px, 1.6 line height, 400 weight, and color `#3A3A3A` across all breakpoints.
2. Section titles use 13px, 600 weight, uppercase, `0.04em` letter spacing, and `#6B6B6B`.
3. Author name uses 15px, 600 weight, and `#111111`; secondary info uses 13px and `#6B6B6B`.
4. Tags use 13px, 500 weight, and `3px 8px` padding, visually smaller than article tags.
5. Maintain 24px spacing between sidebar sections with compact, consistent internal spacing.

## 4. Verification & QA
1. **Responsive**: Validate at 375px, 768px, and 1280px. Confirm sidebar typography does not scale and spacing remains consistent.
2. **Hierarchy check**: Compare sidebar typography against main article text to verify the sidebar reads as secondary.
3. **Accessibility**: Confirm contrast for 14px text meets WCAG AA and that section titles are not rendered as H1-H4.
4. **Content completeness**: Ensure all tags appear and the author bio renders correctly without overflow.
5. **Build**: Run `npm run build` followed by `hugo --environment production --minify` before final review.
