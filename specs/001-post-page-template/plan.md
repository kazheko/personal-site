# Implementation Plan: Single Post Page Template

**Branch**: `001-post-page-template` | **Date**: 2025-11-21 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-post-page-template/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a dedicated single-post page experience so every article renders with a prominent title, a consolidated metadata row (tags + publication date), and the authored body content in the correct order. Implementation will add a Hugo `_default/single.html` that composes an accessible article shell, a reusable metadata partial, and Tailwind utility classes that match the typography spacing tokens already in use.

## Technical Context

**Site Generator**: Hugo Extended 0.126.x (already configured; no version bump needed)  
**Styling Stack**: Tailwind CSS 3.x driven by `tailwind.config.js` tokens; typography utilities (`prose`, spacing, font weights) cover all needs  
**Content Source**: Markdown files with front matter in `content/` (title, date, tags, body)  
**Reusable Components**: `layouts/_default/baseof.html`, site header/footer partials, and a new `partials/post-meta-row.html` to keep metadata logic isolated  
**Assets Pipeline**: Hugo Pipes + PostCSS compile Tailwind from `assets/css/tailwind.css` to `resources/`/`static/` via `npm run dev` and `npm run build`  
**Testing & Verification**: `npm run dev` for live preview, `hugo --environment production --minify` for release build, Lighthouse + axe checks on representative posts, keyboard/Screen Reader spot checks  
**Deployment Target**: GitHub Pages (static artifacts from `public/` published via repository actions; no competing provider configuration detected)  
**Constraints**: Must keep UX minimal (title + metadata + body only), ensure responsive stacks for mobile-first layouts, and preserve performance budgets (no new JS bundles)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Hugo-Driven Architecture**: Plan scopes all work to Hugo layouts/partials plus front matter; no alternate generators introduced. [PASS]
- **Tailwind-Centric Styling**: Styling relies exclusively on existing Tailwind utilities with optional config token references; no external CSS frameworks. [PASS]
- **Simple UX Paths**: The template surfaces only title, metadata, and inline tag links; no extra navigation or interactive widgets added. [PASS]
- **Responsive-First Layouts**: Template will define mobile-first stack classes with tablet/desktop modifiers and will be tested at 375px, 768px, and 1280px widths. [PASS]
- **Static Performance & Accessibility**: No new scripts; semantic `<article>`/`<header>` markup, focusable tags, and Lighthouse + axe verifications baked into the implementation checklist. [PASS]

## Project Structure

### Documentation (this feature)

```text
specs/001-post-page-template/
|-- plan.md          # This file (/speckit.plan command output)
|-- research.md      # Phase 0 output (/speckit.plan command)
|-- data-model.md    # Phase 1 output (/speckit.plan command)
|-- quickstart.md    # Phase 1 output (/speckit.plan command)
|-- contracts/
|   `-- post-page-template.openapi.yaml # Phase 1 contract output
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
|   `-- single.html  # New single-post template introduced by this feature
|-- partials/        # Shared fragments and components (new post-meta-row partial lives here)
`-- shortcodes/      # Reusable content macros

assets/
|-- css/
|   `-- tailwind.css # Tailwind entrypoint
`-- images/          # Source media for optimization

static/              # Generated/static assets served as-is
```

**Structure Decision**: No extra directories are needed; a new `_default/single.html` and `partials/post-meta-row.html` reuse the existing Hugo layout hierarchy and satisfy the constitution.

## Complexity Tracking

No constitutional violations anticipated; complexity tracking table not required.

## Phase 0 - Outline & Research

### Open Questions & Research Tasks

1. **Template ownership** - Determine whether to override `_default/single.html` or create a section-specific template to ensure all posts inherit the new layout consistently.
2. **Metadata semantics & accessibility** - Validate the best markup pattern (list vs. chips) for tags + date so assistive technologies announce the row correctly.
3. **Date formatting & localization** - Confirm the Hugo date helpers used on list pages satisfy the human-readable requirement and respect localization.
4. **Deployment/channel confirmation** - Ensure publishing expectations align with GitHub Pages so the plan references the correct static delivery pipeline.

### Research Output

See [`research.md`](./research.md) for detailed findings:

- Hugo best practice is to implement `_default/single.html` that wraps `.Content` in an `<article>` with `header` and metadata partial so every section inherits the behavior. Section-specific templates were rejected because the site currently only hosts posts and duplicating layouts would be harder to maintain.
- Tag/date metadata will use a visually grouped flex row built from a `<ul>` of tags (each `li>a`) followed by a `<time>` element. This structure lets screen readers announce "Tags" once and preserves keyboard focus order. Chip styling will come from Tailwind `inline-flex`, `rounded-full`, and focus ring utilities.
- Date formatting will reuse `time.Format "Jan 2, 2006"` applied within the metadata partial, wrapped by `<time datetime="{{ .Date.Format "2006-01-02" }}">`. This satisfies the human-readable requirement yet keeps machine-readable data intact for SEO.
- With no Netlify/Vercel config present, the repo's GitHub orientation and existing `public/` output imply GitHub Pages. The plan therefore keeps the deployment target stable and documents it for QA/ops alignment.

All clarification items above are resolved; Phase 1 can proceed.

## Phase 1 - Design & Contracts

### Data Model

- Documented in [`data-model.md`](./data-model.md).
- Captures **Post** (title, slug, date, tags[], body, hero media placeholder) and **Tag** (label, permalink) entities, including validation (title required, at least date or fallback label), relationships (`Post` > many `Tag`), and presentation rules (title prominence, metadata row ordering).

### API / Content Contracts

- [`contracts/post-page-template.openapi.yaml`](./contracts/post-page-template.openapi.yaml) models static delivery endpoints:
  - `GET /posts/{slug}/` returns rendered HTML with title, metadata row, and content.
  - `GET /tags/{tag}/` already exists; contract reiterates expectations for tag navigation triggered from the metadata row.
- Responses describe required sections (title, metadata row, body) plus error handling for unknown slugs/tags.

### Quickstart & Implementation Guide

- [`quickstart.md`](./quickstart.md) outlines how to spin up `npm run dev`, scaffold the new metadata partial, wire `_default/single.html`, and validate across breakpoints with Lighthouse/axe.
- Includes verification checklist (keyboard focus on tag chips, screenshot diff for sample posts, run `npm run build` before PR).

### Post-Design Constitution Check

All design artifacts continue to satisfy the constitution: work stays in Hugo/Tailwind, UX is focused, responsive behaviors are defined per breakpoint, and no performance regressions are anticipated. Gate remains PASS.

## Phase 2 - Implementation Readiness

1. **Markup & Semantics**
   - Create `layouts/_default/single.html` that extends `baseof.html`, wraps content in `<article>`, and pulls in the metadata partial before `.Content`.
   - Ensure skip link target and heading hierarchy remain intact (`<h1>` for title).
2. **Metadata Partial**
   - Build `layouts/partials/post-meta-row.html` that receives `.Params.tags` and `.Date`, renders chips or an "Untagged" label, and formats the `<time>` element per research findings.
   - Include responsive wrapping classes and `sr-only` labels for accessibility.
3. **Styling**
   - Reuse Tailwind tokens (e.g., `text-4xl font-bold`, `mt-2 flex flex-wrap gap-3`). If new shades or spacing are required, extend them via `tailwind.config.js` instead of inline CSS.
4. **Content Validation**
   - Verify multiple representative posts (no tags, many tags, long titles) render correctly. Update sample content markdown if needed for QA fixtures.
5. **Testing & Performance**
   - Run `npm run build` + `hugo --environment production --minify` to ensure no build errors.
   - Capture Lighthouse/Axe runs for one standard post, focusing on headings, color contrast, and interactive chip focus states.
6. **Deployment Prep**
   - Confirm GitHub Pages workflow (or manual `gh-pages` branch) picks up the new layout by running `hugo` locally and reviewing `public/` output before pushing.

Once these steps are complete, hand off to `/speckit.tasks` to break implementation into executable issues.


