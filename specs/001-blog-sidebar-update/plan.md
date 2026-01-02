# Implementation Plan: Blog Sidebar Update

**Branch**: `001-blog-sidebar-update` | **Date**: 2026-01-02 | **Spec**: C:\home\ykazheka\personal-site\static-site\specs\001-blog-sidebar-update\spec.md
**Input**: Feature specification from `C:\home\ykazheka\personal-site\static-site\specs\001-blog-sidebar-update\spec.md`

## Summary

Refresh the blog homepage sidebar to include only the author bio and tag list, styled with lighter typography, compact spacing, and subdued contrast so it remains secondary to the main article content. The plan keeps changes within Hugo list templates/partials and Tailwind utility classes, ensuring section labels, author block details, and tag chips adhere to the specified sizes, weights, colors, and spacing while preserving site-wide design tokens.

## Technical Context

**Site Generator**: Hugo Extended 0.126.x (current toolchain; no version change required)  
**Styling Stack**: Tailwind CSS 3.x via PostCSS with tokens managed in `tailwind.config.js`  
**Content Source**: Markdown with front matter in `content/` plus taxonomies for tags  
**Reusable Components**: Hugo list templates and sidebar partials under `layouts/`  
**Assets Pipeline**: Hugo Pipes and Tailwind build output in `assets/` -> `static/`  
**Testing & Verification**: `npm run build`, `hugo --environment production --minify`, Lighthouse/performance checks, accessibility audit  
**Deployment Target**: Existing static hosting/CDN (no changes required)  
**Constraints**: Uphold UX simplicity, responsive behavior, and performance budgets defined in the constitution

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Hugo-Driven Architecture**: PASS - updates stay within Hugo list templates/partials and content configuration.
- **Tailwind-Centric Styling**: PASS - typography and spacing adjustments use Tailwind utilities or tokens.
- **Simple UX Paths**: PASS - sidebar remains informational with no new navigation flows.
- **Responsive-First Layouts**: PASS - sidebar typography and spacing remain stable across breakpoints and are verified at 375px/768px/1280px.
- **Static Performance & Accessibility**: PASS - no new scripts added and contrast requirements remain enforced via QA.

## Project Structure

### Documentation (this feature)

```text
specs/001-blog-sidebar-update/
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

**Structure Decision**: No new directories required; update existing blog list template and/or sidebar partial within `layouts/` to keep changes localized.

### Post-Design Constitution Check

After drafting the research, data model, contracts, and quickstart, the plan remains Hugo-native, Tailwind-only for styling, and does not introduce new user paths. Responsive checks are documented at 375px/768px/1280px, and QA steps keep Lighthouse/axe validation in scope without adding JavaScript.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., Extra JS bundle] | [Document necessity] | [Explain why Hugo/Tailwind solution insufficient] |
| [e.g., Additional layout directory] | [Document necessity] | [Explain why existing structure insufficient] |
