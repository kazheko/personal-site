# Implementation Plan: Base Layout Template

**Branch**: `001-base-layout` | **Date**: 2025-11-04 | **Spec**: specs/001-base-layout/spec.md
**Input**: Feature specification from `specs/001-base-layout/spec.md`

## Summary

Introduce a reusable Hugo base layout that wires shared head assets, a fixed site header, and a consistent footer. Header and footer move into dedicated partials styled with Tailwind, the base template exposes slots for page-level CSS and scripts, and the work begins by standing up the Tailwind/PostCSS toolchain the site currently lacks.

## Technical Context

**Site Generator**: Hugo Extended 0.126.x (target latest stable in build environment)  
**Styling Stack**: Tailwind CSS 3.x configured via `tailwind.config.js` with PostCSS pipeline  
**Content Source**: Markdown with front matter in `content/`; taxonomy kept lightweight per constitution  
**Reusable Components**: Hugo partials under `layouts/partials/` and `_default/baseof.html` with `block` regions  
**Assets Pipeline**: Hugo Pipes with PostCSS (Tailwind + Autoprefixer) emitting `/assets/css/tailwind.css` > `resources/_gen/` > `static/`  
**Testing & Verification**: `npm run build` (Tailwind compile) + `hugo --environment production --minify`, manual responsive audit, Lighthouse + axe accessibility scan  
**Build Tooling**: Introduce Node.js-based Tailwind/PostCSS pipeline (package.json, PostCSS config, npm scripts) to compile shared styles for Hugo.
**Deployment Target**: Existing static hosting pipeline (no changes required)  
**Constraints**: Preserve simple navigation, mobile-first responsiveness, and green performance/accessibility budgets

## Constitution Check

- **Hugo-Driven Architecture**: PASS – work lives entirely in `layouts/` partials and `baseof.html`; no alternate generators introduced.
- **Tailwind-Centric Styling**: PASS – header/footer styles rely solely on Tailwind utilities and shared tokens defined in `tailwind.config.js`.
- **Simple UX Paths**: PASS – header exposes only Home and About links; footer adds contact links without additional navigation complexity.
- **Responsive-First Layouts**: PASS – plan includes mobile-first Tailwind classes, flex wrapping, and breakpoint verification at 360/768/1024/1440px.
- **Static Performance & Accessibility**: PASS – shared assets load once through Hugo Pipes, link text and aria-labels documented, Lighthouse and axe checks baked into verification.

## Project Structure

### Documentation (this feature)

```text
specs/001-base-layout/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
`-- tasks.md        # produced by /speckit.tasks
```

### Site Structure (repository root)

```text
layouts/
|-- _default/
|   `-- baseof.html          # New base layout with header/footer partials and asset slots
`-- partials/
    |-- site-header.html     # Fixed header partial
    |-- site-footer.html     # Footer partial with social links
    |-- head-assets.html     # Shared head include (CSS + page-level slots)
    `-- foot-scripts.html    # Shared script include with page-level slots

assets/
`-- css/
    `-- tailwind.css         # Tailwind entrypoint importing shared design tokens

static/
`-- favicon.ico (placeholder for logo reference if needed)
```

**Structure Decision**: Introduce `layouts/partials/site-header.html`, `layouts/partials/site-footer.html`, and asset partials to keep the base template declarative. Tailwind entry file remains under `assets/css/tailwind.css`; no additional directories are required.

## Complexity Tracking

No constitutional violations identified; fixed header uses standard Tailwind utilities without extra JavaScript.
