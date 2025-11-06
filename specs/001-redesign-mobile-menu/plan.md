# Implementation Plan: Mobile Header Menu Toggle

**Branch**: `001-redesign-mobile-menu` | **Date**: 2025-11-06 | **Spec**: specs/001-redesign-mobile-menu/spec.md
**Input**: Feature specification from `specs/001-redesign-mobile-menu/spec.md`

## Summary

Retrofit the existing header partial so large screens keep the current inline navigation while sub-`sm` breakpoints swap to a single toggle button. The button drives a Tailwind-styled dropdown panel that reuses Hugo menu data, opens below the header with a divider, and closes on selection or viewport changes. Minimal progressive-enhancement JavaScript manages the expanded state, focus loop, and escape handling without introducing new frameworks.

## Technical Context

**Site Generator**: Hugo Extended 0.126.x (no version bump required)  
**Styling Stack**: Tailwind CSS 3.x via PostCSS pipeline defined in `tailwind.config.js` and `postcss.config.cjs`  
**Content Source**: Markdown with front matter under `content/`; navigation sourced from `config/_default/menus.toml` with Hugo fallbacks  
**Reusable Components**: Header lives in `layouts/partials/site-header.html`; additional structural helpers already exist under `layouts/partials/`  
**Assets Pipeline**: Hugo Pipes compiles `assets/css/tailwind.css` and fingerprints output; JavaScript lives in `assets/js/` and is bundled through Hugo’s asset pipeline  
**Testing & Verification**: `npm run dev` for watch mode, `npm run build` plus `hugo --environment production --minify` for release, Lighthouse (mobile + desktop) and axe scans on header states, manual responsive checks at 360/414/768/1024 px  
**Deployment Target**: Existing static hosting/CDN (unchanged; provider unspecified)  
**Constraints**: Maintain constitution principles—Hugo-only templates, Tailwind utilities, simple UX, responsive-first layouts, and performance/accessibility budgets

## Constitution Check

- **Hugo-Driven Architecture**: PASS – plan confines changes to Hugo partials and assets compiled through Hugo Pipes; no alternate generator introduced.
- **Tailwind-Centric Styling**: PASS – dropdown styling relies on Tailwind utilities and existing design tokens; any new tokens land in `tailwind.config.js`.
- **Simple UX Paths**: PASS – mobile toggle exposes the same concise navigation, keeps interaction to a single button, and closes automatically after selection.
- **Responsive-First Layouts**: PASS – breakpoint logic is expressed with Tailwind responsive classes; testing matrix covers common mobile and tablet widths.
- **Static Performance & Accessibility**: PASS – reuse existing asset pipeline, defer tiny script bundle, and include accessible button semantics plus Lighthouse/axe verification.

## Project Structure

### Documentation (this feature)

```text
specs/001-redesign-mobile-menu/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
`-- tasks.md          # produced by /speckit.tasks
```

### Site Structure (repository root)

```text
layouts/partials/
|-- site-header.html         # Updated to conditionally render toggle and dropdown

assets/js/
|-- mobile-menu.js           # New progressive-enhancement script controlling toggle state

assets/css/tailwind.css      # Gains classes for mobile dropdown spacing/divider
```

**Structure Decision**: Keep all logic inside the existing header partial and Tailwind entrypoint; add a single `mobile-menu.js` module under `assets/js/` so Hugo Pipes can fingerprint and include it via `partials/foot-scripts.html` without new directories.

## Complexity Tracking

No constitutional violations identified; minimal script addition stays within progressive enhancement limits and uses existing bundling.

