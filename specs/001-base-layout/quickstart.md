# Quickstart: Base Layout Template

## Prerequisites
1. Install Node.js 18+ and npm.
2. Install the Hugo Extended binary (v0.126.x) and ensure hugo is on PATH.
3. Run 
pm install to pull Tailwind and PostCSS dependencies (listed in package.json).

## Local Development
1. Start the preview server: 
pm run dev (invokes hugo server -D --disableFastRender and processes Tailwind through PostCSS automatically).
2. Visit http://localhost:1313 and confirm the fixed header and footer render on Home and About pages.

## Verification Checklist
- Resize the browser to 360px, 768px, 1024px, and 1440px to verify header/footer responsiveness, and capture notes or screenshots in specs/001-base-layout/artifacts/responsive-check.md.
- Scroll through long content and ensure the fixed header never overlaps the first heading.
- Click each footer link (Gmail, LinkedIn, Twitter, GitHub) and confirm they open in new tabs with correct destinations.
- Run a Lighthouse performance and accessibility audit; both categories should remain "green".
- Execute an axe accessibility scan to confirm header navigation and footer links expose descriptive labels.

## Production Build
1. Run 
pm run build to produce the optimized Tailwind bundle and static output (requires the Hugo Extended binary).
2. Inspect the generated HTML under public/ for the shared header/footer partial markup and fingerprinted asset URLs.