# static-site Development Guidelines

Auto-generated from feature plans. Last updated: 2025-11-05

## Active Technologies

- Hugo Extended 0.126.x for static site generation
- Tailwind CSS 3.x via PostCSS
- Lighthouse and axe for performance/accessibility validation

## Project Structure

```text
layouts/
|-- _default/
|   `-- baseof.html
`-- partials/
    |-- site-header.html
    |-- site-footer.html
    |-- head-assets.html
    `-- foot-scripts.html

assets/
`-- css/
    `-- tailwind.css
```

## Commands

- `npm run dev` – watch Tailwind and rebuild assets during local development
- `npm run build` – produce optimized Tailwind output for production
- `hugo server -D` – preview site with drafts
- `hugo --environment production --minify` – generate static output

## Code Style

- Use Tailwind utility classes for styling; extend design tokens in `tailwind.config.js`
- Keep header/footer markup semantic (header/nav/footer elements) with accessible link labels
- Avoid inline styles or JavaScript for layout adjustments unless documented

## Recent Changes

- Added plan for reusable base layout with header/footer partials and shared asset slots.

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
