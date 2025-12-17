# Implementation Plan: Blog Post Image Zoom

**Branch**: `001-image-zoom` | **Date**: 2025-12-16 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-image-zoom/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Readers must be able to expand inline blog images into a centered, full-viewport overlay with a blurred background and dismiss the overlay via click/tap or scroll without losing their place. Inline content will use Hugo image processing to render lightweight thumbnails, while the overlay loads the original asset for clarity. Implementation stays within Hugo templates, Tailwind utilities, and a lightweight JavaScript enhancement with accessibility focus management.

## Technical Context

**Site Generator**: Hugo Extended 0.126.x (current baseline; no version bump anticipated)  
**Styling Stack**: Tailwind CSS 3.x via PostCSS with tokens defined in `tailwind.config.js`  
**Content Source**: Markdown with front matter in `content/`, using image shortcodes/markdown image syntax  
**Reusable Components**: Hugo partials `layouts/partials/site-header.html`, `site-footer.html`, and page templates in `layouts/_default/`; zoom affordance likely added via reusable partial or shortcode  
**Assets Pipeline**: Hugo Pipes for CSS/JS bundling plus Tailwind build from `assets/css/tailwind.css`; JavaScript modules under `assets/js` bundled into `static/` during build  
**Testing & Verification**: `hugo server -D` for preview, `hugo --environment production --minify` for release, plus Lighthouse + axe or equivalent accessibility review on pages with zoomable images  
**Deployment Target**: GitHub Pages workflow publishing Hugo `public/` artifacts (confirmed via prior specs and lack of alternate provider config)  
**Constraints**: Must uphold constitution principles: Hugo-only authoring, Tailwind utility styling, minimal UX paths, responsive-first behavior across 320/768/1280px, and static performance/accessibility budgets

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Hugo-Driven Architecture**: Image zoom markup will be implemented via Hugo templates/shortcodes with no additional generators or CMS layers. (Pass)
- **Tailwind-Centric Styling**: Overlay visuals will rely on Tailwind utility classes and, if needed, config tokens; no external CSS frameworks. (Pass)
- **Simple UX Paths**: Overlay interaction is a single click/tap with single-click dismissal, adding no extra navigation routes. (Pass)
- **Responsive-First Layouts**: Requirements explicitly include 320/768/1280px testing to ensure scaling and gesture parity. (Pass)
- **Static Performance & Accessibility**: Overlay script remains lightweight, defers execution, and includes focus management plus Lighthouse/axe validation. (Pass)

**Post-Design Re-evaluation**: Phase 1 artifacts continue to satisfy every gate, so no complexity tracking entries are required.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature-name]/
|-- plan.md          # This file (/speckit.plan command output)
|-- research.md      # Phase 0 output (/speckit.plan command)
|-- data-model.md    # Phase 1 output (/speckit.plan command)
|-- quickstart.md    # Phase 1 output (/speckit.plan command)
`-- tasks.md         # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Site Structure (repository root)

```text
content/
|-- _index.md        # Home page content
|-- [section]/       # Section content directories
`-- [page]/index.md  # Individual page content

layouts/
|-- _default/
|   |-- baseof.html  # Base layout
|   |-- list.html    # List page template
|   `-- single.html  # Default page template
|-- partials/        # Shared fragments and components
`-- shortcodes/      # Reusable content macros

assets/
|-- css/
|   `-- tailwind.css # Tailwind entrypoint
`-- images/          # Source media for optimization

static/              # Generated/static assets served as-is
```

**Structure Decision**: Document any additional directories (e.g., `data/`, `archetypes/`, custom themes) introduced for the feature and justify them against the constitution.
No new top-level directories are required; assets will remain under `assets/js` and template updates under `layouts/`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., Extra JS bundle] | [Document necessity] | [Explain why Hugo/Tailwind solution insufficient] |
| [e.g., Additional layout directory] | [Document necessity] | [Explain why existing structure insufficient] |
