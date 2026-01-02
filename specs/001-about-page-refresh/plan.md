# Implementation Plan: About Page Editorial Refresh

**Branch**: `001-about-page-refresh` | **Date**: 2026-01-02 | **Spec**: [spec.md](C:\home\ykazheka\personal-site\static-site\specs\001-about-page-refresh\spec.md)
**Input**: Feature specification from `C:\home\ykazheka\personal-site\static-site\specs\001-about-page-refresh\spec.md`

## Summary

Refresh the About page to feel calm, personal, and editorial while staying within the existing typography, color, and layout system. The update will refine spacing, width, and author section hierarchy using Tailwind utilities and existing design tokens, with no new fonts, colors, or decorative backgrounds introduced.

## Technical Context

**Site Generator**: Hugo Extended 0.126.x (current toolchain per AGENTS.md; no version change required)  
**Styling Stack**: Tailwind CSS 3.x via PostCSS with tokens managed in `C:\home\ykazheka\personal-site\static-site\tailwind.config.js`  
**Content Source**: Markdown with front matter in `C:\home\ykazheka\personal-site\static-site\content\`; About content remains at `C:\home\ykazheka\personal-site\static-site\content\about\_index.md`  
**Reusable Components**: Hugo layouts/partials under `C:\home\ykazheka\personal-site\static-site\layouts\` (primary target: `layouts/about/single.html` and supporting partials if needed)  
**Assets Pipeline**: Hugo Pipes and Tailwind build output in `C:\home\ykazheka\personal-site\static-site\assets\` -> `C:\home\ykazheka\personal-site\static-site\static\`; no new assets required  
**Testing & Verification**: `npm run build`, `hugo --environment production --minify`, Lighthouse/performance checks, accessibility audit  
**Deployment Target**: GitHub Pages workflow publishing Hugo `public/` artifacts (consistent with prior specs; no alternate provider detected)  
**Constraints**: Uphold UX simplicity, responsive behavior, and performance budgets defined in the constitution

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Hugo-Driven Architecture**: PASS - updates are limited to Hugo content and layout templates.
- **Tailwind-Centric Styling**: PASS - spacing, typography, and color adjustments use Tailwind utilities and existing tokens.
- **Simple UX Paths**: PASS - no new navigation or interaction paths are introduced.
- **Responsive-First Layouts**: PASS - plan specifies mobile padding, centered content width, and breakpoint checks.
- **Static Performance & Accessibility**: PASS - no new scripts or assets; QA includes Lighthouse and accessibility audits.

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

**Structure Decision**: Keep the About page using existing content and layout paths. Update `C:\home\ykazheka\personal-site\static-site\layouts\about\single.html` (or its partials) and shared Tailwind typography classes in `C:\home\ykazheka\personal-site\static-site\assets\css\tailwind.css` only as needed, without adding new directories.

### Post-Design Constitution Check

After drafting the data model, contracts, and quickstart, the plan still satisfies all five constitutional pillars: Hugo-native content/layout updates, Tailwind-only styling, no new UX flows, documented responsive checks (375px/768px/1024px), and Lighthouse/axe validation for performance and accessibility.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., Extra JS bundle] | [Document necessity] | [Explain why Hugo/Tailwind solution insufficient] |
| [e.g., Additional layout directory] | [Document necessity] | [Explain why existing structure insufficient] |
