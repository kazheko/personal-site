# Quickstart: Mobile Header Menu Toggle

## Prerequisites
1. Install Node.js 18+ and npm.
2. Ensure Hugo Extended 0.126.x is installed. If you do not have Hugo globally, use the bundled binary at `tools/hugo/hugo.exe` and prepend that directory to your `PATH` for build commands.
3. Run `npm install` (if not already) to populate Tailwind/PostCSS dependencies referenced by the asset pipeline.

## Local Development
1. Start watchers with `npm run dev` to compile Tailwind and rebuild assets, then open a second terminal with `hugo server -D` (or run them separately, pointing to the bundled Hugo binary if needed).
2. Visit `http://localhost:1313` on a mobile-sized viewport (<= 639px) and confirm the header shows only the logo and menu button.
3. Toggle the menu open/closed, select each link, and verify focus returns to the button when the dropdown closes.

## Mobile Menu Validation
- Resize dev tools to 360px, 414px, 480px, 768px, and 1024px to confirm breakpoint behavior.
- Tab through the toggle and dropdown links to verify focus management and `Escape` dismissal.
- Confirm `aria-expanded` flips to `true` when the menu is exposed and reverts to `false` when dismissed.

## Verification Checklist
- Run `npm run build` followed by `hugo --environment production --minify --cleanDestinationDir` (via the bundled Hugo binary if required) to generate production assets.
- Execute Lighthouse (mobile + desktop) and axe scans focused on the header to capture scores ? 90 and no critical violations.
- Inspect the generated `public/js/mobile-menu*` asset to confirm the fingerprinted bundle is referenced once in HTML outputs.

## Production Build
1. Run `npm run build` to emit optimized Tailwind CSS and the minified mobile menu bundle.
2. Execute `hugo --environment production --minify` (include `--cleanDestinationDir` for a clean slate) to create the static site.
3. Deploy the contents of `public/` through the existing CDN pipeline after re-running Lighthouse/axe on a production preview.
