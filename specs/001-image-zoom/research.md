# Research: Blog Post Image Zoom

## Decision 1: Treat GitHub Pages as the deployment target
- **Rationale**: Previous specs (`001-post-page-template`, `001-list-pagination`) already document GitHub Pages as the publishing path, and the repo lacks Netlify/Vercel config. Keeping this assumption ensures QA validates the generated `public/` output against the existing GitHub-hosted workflow without inventing a new deploy channel.
- **Alternatives considered**:
  - **Netlify/Vercel**: No configuration or provider files exist; switching would violate the constitution's stability requirement.
  - **Cloudflare Pages**: Similar issue—no evidence in repo, so adding it would be speculative.

## Decision 2: Mark zoomable images via Hugo shortcodes/data attributes
- **Rationale**: Hugo already controls Markdown rendering, so extending the `figure` shortcode (or introducing a lightweight partial) to emit `data-zoomable="true"` plus accessible labels lets the JS enhancement attach behaviors without editing every template. This keeps content authors in Markdown while centralizing structure changes in Hugo layouts.
- **Alternatives considered**:
  - **Global selector on all `<img>` tags**: Risks zooming UI icons or decorative images, contradicting spec assumptions about explicitly marked assets.
  - **Manual HTML wrappers in Markdown**: Increases authoring burden and threatens content consistency.

## Decision 3: Use body-level class toggles for overlay/focus locking
- **Rationale**: Adding/removing a `zoom-active` class on `<body>` allows Tailwind to control blur/backdrop styles while simultaneously toggling `overflow-hidden` to freeze scroll. Focus can shift to the overlay container and return once dismissed, aligning with accessibility requirements without introducing extra libraries.
- **Alternatives considered**:
  - **Inline styles per overlay instance**: Harder to maintain, and does not expose global state for CSS.
  - **Third-party lightbox packages**: Adds heavy dependencies, conflicting with constitution emphasis on simplicity and performance.

## Decision 4: Serve downsized inline images while overlay keeps originals
- **Rationale**: Hugo's built-in image processing (`.Resize`, `.Fit`, `.Fill`) can emit multiple renditions. Rendering a smaller inline variant maintains quick article loads, while providing the original source to the overlay preserves fine detail when zoomed, satisfying the optimization requirement without extra services.
- **Alternatives considered**:
  - **Use only full-size images**: Simplifies rendering but hurts performance, especially on mobile networks.
  - **External thumbnail/CDN service**: Introduces a new dependency and conflicts with the Hugo-first architecture mandate.
