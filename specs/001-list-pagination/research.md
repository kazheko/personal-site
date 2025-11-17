# Research: Paginated List Navigation

## Decision 1: Use Hugo `.Paginator` with global `paginate` size
- **Rationale**: `.Paginator` automatically slices `.Pages` respecting publish-state filters, produces URLs like `/page/2/`, and exposes helpers (`HasNext`, `Next.URL`, etc.) needed for numbered controls. Setting `paginate = 10` in `config/_default/config.toml` keeps page size centralized while allowing section-specific overrides via front matter if future lists need a different count.
- **Alternatives considered**:
  - Manual slicing via `first`/`after` on `.Pages`: more error-prone and would require duplicating paging math for counts and URLs.
  - Client-side infinite scroll: violates constitution (JS-free, static performance) and complicates SEO.

## Decision 2: Emit canonical `<link rel="prev/next">` metadata through a partial
- **Rationale**: Search engines expect `rel` hints on paginated archives for proper indexing. Adding a `pagination-meta.html` partial included from `head-assets.html` lets us centralize `<link rel="next">`, `<link rel="prev">`, and `<meta name="description">` updates without cluttering `list.html`.
- **Alternatives considered**:
  - Rely only on the sitemap: slower to propagate changes and offers no hints to crawlers visiting the page directly.
  - Inline tags in every list template: duplicates logic and increases drift if multiple sections paginate.

## Decision 3: Provide accessible controls with `aria-current` and descriptive labels
- **Rationale**: WCAG 2.1 requires more than color to indicate active states. Applying `aria-current="page"`, `aria-label="Go to page X"`, and `aria-disabled="true"` (or removing hrefs) ensures screen-reader users understand position and available actions. Tailwind utility states (focus-visible, contrast) keep the controls keyboard friendly.
- **Alternatives considered**:
  - Depend on visual styling only: fails accessibility requirement and spec's orientation goal.
  - Replace numbered controls with a select dropdown: adds interaction cost and diverges from the spec instruction to show numbered links.

## Decision 4: Handle out-of-range `/page/N/` visits via a friendly 404 redirect
- **Rationale**: Hugo only emits pages up to `.Paginator.TotalPages`, so `/page/99/` returns a static 404. Updating `layouts/404.html` to display a short explanation and a meta refresh (or large CTA) back to the archive root meets the spec's request without introducing JavaScript that could violate performance constraints.
- **Alternatives considered**:
  - Ignore the scenario: contradicts the spec requirement for a friendly fallback.
  - Add client-side routing logic: unnecessary complexity and against Tailwind-only styling guidance.

## Decision 5: Assume GitHub Pages as the deployment target until maintainers confirm otherwise
- **Rationale**: The repository already follows the GitHub Pages workflow (no custom deploy scripts, static output committed). Documenting the assumption keeps canonical URLs stable for pagination while flagging the need for confirmation.
- **Alternatives considered**:
  - Switch to Netlify/Cloudflare without approval: would introduce new tooling in conflict with the constitution.
  - Leave the deployment target unspecified: risks mismatched canonical URLs for rel links and analytics tracking.

## Deployment Notes (2025-11-08)
- `layouts/partials/pagination-meta.html` now emits canonical + rel navigation tags for every paginated page, keeping crawlers aligned with the GitHub Pages deployment path.
- `layouts/404.html` reads `site.Params.pagination` to render a CTA plus optional meta refresh back to `/posts/`, covering manual visits to `/page/N/` URLs beyond the generated range.
- `npm run build` (Hugo Extended 0.126.2) and `hugo list all` verified the paginator outputs five archive pages backed by 15 seeded fixtures, so production deploys inherit the tested structure.


