# Quickstart - Production Typography System

## 1. Environment Prep
1. Install dependencies: `npm install`.
2. Start the Hugo/Tailwind watcher: `npm run dev`.
3. Open a representative long-form post and the posts list page to verify typography across templates.

## 2. Configure Typography Tokens
1. Update `tailwind.config.js`:
   - Add Inter and JetBrains Mono to `theme.fontFamily` with the specified fallback stacks.
   - Define font sizes and line heights for body, headings, metadata, and code blocks per breakpoint.
   - Confirm font weights match 400/500/600/700 hierarchy.
2. Add base typography rules in `assets/css/tailwind.css` under `@layer base` for `body`, `p`, `h1-h4`, `a`, `code`, and `pre`.

## 3. Apply Layout Widths and Padding
1. Update the shared content wrapper (base layout or content partial) to enforce:
   - 16px horizontal padding on mobile.
   - 640px max width at `md` (>=768px) and 680px max width at `lg` (>=1024px).
2. Ensure posts, list pages, and static pages all use the shared wrapper.

## 4. UI Text and Tap Targets
1. Confirm menu, pagination, and tag elements use the UI text size/weight and ~1.4 line height.
2. Validate minimum 44px tap height for interactive elements on mobile.

## 5. Code Block Styling
1. Apply JetBrains Mono (or monospace fallback) to `pre` and `code`.
2. Set code font size to 13px on mobile and 14px on desktop with a 1.5-1.6 line height.
3. Ensure code blocks allow horizontal scrolling on mobile.

## 6. Verification & QA
1. Check typography at 375px, 768px, and 1024px widths for hierarchy, spacing, and rhythm.
2. Run `npm run build` and `hugo --environment production --minify` to confirm builds succeed.
3. Capture Lighthouse and axe results for a long-form post to confirm accessibility and performance targets.

Following these steps prepares the repo for `/speckit.tasks` and implementation work.
