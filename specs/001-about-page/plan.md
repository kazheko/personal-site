# Implementation Plan: About Page Template

**Branch**: `001-about-page` | **Date**: 2025-12-17 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-about-page/spec.md`

## Summary

Introduce a dedicated About page that communicates the blog's mission, shares the author bio, and surfaces a contact CTA. The page will use a purpose-built Hugo template that extends `layouts/_default/baseof.html`, rendering two stacked sections on the left for "About the Blog" and "About Me," plus a right-aligned portrait that remains full-height on desktop while reflowing beneath the copy on narrow screens. All styling will leverage existing Tailwind utilities from `assets/css/tailwind.css`, and page data (texts, portrait path, email) will be sourced from the About page front matter to keep content owner friendly. Implementation note: the page lives at `content/about/_index.md` with `layout = "single"` so Hugo routes it through `layouts/about/single.html`, and the template now injects a visually hidden `<h1>` to satisfy axe without changing the simple visual hierarchy.

## Technical Context

**Site Generator**: Hugo Extended 0.126.x (current toolchain per AGENTS.md; no version change required)  
**Styling Stack**: Tailwind CSS 3.x via PostCSS with tokens managed in `tailwind.config.js`  
**Content Source**: Markdown with front matter in `content/`; About page will live at `content/about/_index.md` with dedicated params for copy, portrait, and email  
**Reusable Components**: Hugo layouts/partials under `layouts/` and potential reusable block (e.g., `partials/about/hero.html`) for the two-column section  
**Assets Pipeline**: Hugo Pipes plus Tailwind build assets emitted from `assets/` to `resources/` and finally `static/`; portrait stored in `assets/images/about/` for processing  
**Testing & Verification**: `npm run build`, `hugo --environment production --minify`, Lighthouse mobile/desktop runs, and axe accessibility sweep  
**Constraints**: Uphold Hugo/Tailwind-only architecture, maintain simple UX with a single CTA, and validate responsive + accessibility budgets from the constitution

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Hugo-Driven Architecture**: PASS - effort scoped to Hugo content entry plus custom layout/partials; no new generators introduced.
- **Tailwind-Centric Styling**: PASS - layout built entirely with Tailwind utilities already compiled via PostCSS; no inline styles or third-party CSS frameworks planned.
- **Simple UX Paths**: PASS - page presents only two informational blocks and a single contact CTA, all inline with existing navigation.
- **Responsive-First Layouts**: PASS - plan defines desktop split layout with explicit stacking guidance for 768px and 1024px breakpoints plus portrait fallbacks.
- **Static Performance & Accessibility**: PASS - photo optimization handled through Hugo asset pipeline, CTA uses semantic button/link, and QA includes Lighthouse + axe runs.

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

- Create `content/about/_index.md` (or `index.md`) for the page's structured copy fields so authors edit content without touching templates.
- Add `layouts/about/single.html` (or equivalent partial under `layouts/partials/about/`) to encapsulate the two-column design without altering global defaults.
- Store the portrait asset under `assets/images/about/portrait.(jpg|webp)` so Hugo Pipes can resize/optimize it before publishing to `public/about/index.html`.

### Post-Design Constitution Check

After drafting the data model, contracts, and quickstart, the plan still satisfies all five constitutional pillars: work remains Hugo-native, Tailwind is the sole styling mechanism, the page introduces only one CTA, responsive breakpoints are documented (375px/768px/1280px), and QA includes Lighthouse plus axe to guard performance/accessibility budgets.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., Extra JS bundle] | [Document necessity] | [Explain why Hugo/Tailwind solution insufficient] |
| [e.g., Additional layout directory] | [Document necessity] | [Explain why existing structure insufficient] |
