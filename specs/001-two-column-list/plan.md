# Implementation Plan: Two-Column List Template

**Branch**: `001-two-column-list` | **Date**: 2025-11-06 | **Spec**: specs/001-two-column-list/spec.md
**Input**: Feature specification from `specs/001-two-column-list/spec.md`

## Summary

Create a reusable Hugo list template that presents posts in a primary column (title, comma-separated tags, publish date, 2–3 line excerpt) alongside a sidebar containing the author profile and a unique tag directory. Tailwind-powered grid/flex utilities will manage the responsive two-column layout, while Hugo taxonomies, summaries, and site parameters provide all data with no external services.

## Technical Context

**Site Generator**: Hugo Extended 0.126.x (no version bump required)  
**Styling Stack**: Tailwind CSS 3.x with configuration in `tailwind.config.js` and processed via PostCSS (`postcss.config.js`)  
**Content Source**: Markdown content under `content/` leveraging front matter for titles, dates, and tags; author metadata comes from `site.Params.author`  
**Reusable Components**: Primary work happens in `layouts/_default/list.html` plus a new sidebar partial under `layouts/partials/list-sidebar.html` (or similar) to keep markup maintainable  
**Assets Pipeline**: Hugo Pipes compiles `assets/css/tailwind.css`; author photo processed through `resources.Get` before emitting to `public/`  
**Testing & Verification**: `npm run dev` for watch mode, `npm run build` + `hugo --environment production --minify` for production builds, responsive spot checks at 360/414/768/1024px, Lighthouse + axe scans on the list page, and `hugo list taxonomies` to validate tag coverage  
**Deployment Target**: Existing static hosting/CDN (unchanged; provider not specified)  
**Constraints**: Honor constitution principles—Hugo-driven templates, Tailwind utilities, simple UX, responsive-first layout, and strong performance/accessibility budgets.

## Constitution Check

- **Hugo-Driven Architecture**: PASS – work stays within Hugo list templates, partials, and site params; no alternate generators are introduced.
- **Tailwind-Centric Styling**: PASS – layout and typography rely on Tailwind utility classes; any extra tokens will be added to `tailwind.config.js`.
- **Simple UX Paths**: PASS – the template surfaces essential post metadata and a concise sidebar without extra interaction layers, keeping the page scannable.
- **Responsive-First Layouts**: PASS – grid/flex utilities define column behavior with explicit breakpoints and verification at common viewport widths.
- **Static Performance & Accessibility**: PASS – no new client-side scripts, author assets use Hugo Pipes, and accessibility checks (headings, alt text, focus order) are built into validation.

## Project Structure

### Documentation (this feature)

```text
specs/001-two-column-list/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
`-- tasks.md          # produced later by /speckit.tasks
```

### Site Structure (repository root)

```text
layouts/_default/
|-- list.html                # Updated to emit two-column layout and post summaries

layouts/partials/
|-- list-sidebar.html        # New partial for author profile + tag directory

assets/images/
|-- author.jpg               # Source photo optimized via Hugo Pipes

assets/css/tailwind.css      # Gains utilities for grid columns, tag badges, and sidebar spacing
```

**Structure Decision**: Introduce a dedicated `list-sidebar.html` partial to isolate sidebar markup, keeping `list.html` focused on page orchestration. Store the author photo inside `assets/images/` so Hugo Pipes can fingerprint it; no additional directories are required beyond these adjustments.

## Complexity Tracking

No constitutional violations identified; the feature uses existing Hugo/Tailwind primitives with no extra JavaScript or external services.
