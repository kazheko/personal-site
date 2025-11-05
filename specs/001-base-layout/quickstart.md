# Quickstart: Base Layout Template

## Prerequisites
1. Install Node.js 18+ and npm.
2. Install the Hugo Extended binary (v0.126.x) and ensure `hugo` is on PATH.
3. Run `npm install` to pull Tailwind and PostCSS dependencies (package.json will list them after implementation).

## Local Development
1. Build Tailwind in watch mode: `npm run dev` (runs PostCSS pipeline and watches `assets/css/tailwind.css`).
2. In a new terminal, start Hugo preview with drafts enabled:
   ```bash
   hugo server -D --bind 0.0.0.0 --baseURL http://localhost:1313
   ```
3. Visit `http://localhost:1313` and confirm the fixed header and footer render on Home and About pages.

## Verification Checklist
- Resize the browser to 360px, 768px, 1024px, and 1440px to verify header/footer responsiveness.
- Scroll through long content and ensure the fixed header never overlaps the first heading.
- Click each footer link (Gmail, LinkedIn, Twitter, GitHub) and confirm they open in new tabs with correct destinations.
- Run a Lighthouse performance and accessibility audit; both categories should remain "green".
- Execute an axe accessibility scan to confirm header navigation and footer links expose descriptive labels.

## Production Build
1. Run `npm run build` to produce the optimized Tailwind bundle.
2. Execute `hugo --environment production --minify` to generate the static site under `public/`.
3. Spot-check generated HTML for the presence of the shared header/footer partial markup and fingerprinted asset URLs.
