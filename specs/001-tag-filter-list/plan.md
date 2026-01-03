# Implementation Plan: Tag Filtered List Template

**Branch**: `001-tag-filter-list` | **Date**: 2026-01-02 | **Spec**: [spec.md](C:\home\ykazheka\personal-site\static-site\specs\001-tag-filter-list\spec.md)
**Input**: Feature specification from `C:\home\ykazheka\personal-site\static-site\specs\001-tag-filter-list\spec.md`

## Summary

Update the tag-filtered list template to surface the active tag, add a minimal back link, and preserve calm editorial hierarchy. The update will reuse existing typography and color tokens while keeping the list content-first and accessible.

## Technical Context

**Site Generator**: Hugo Extended 0.126.x (current toolchain per AGENTS.md; no version change required)  
**Styling Stack**: Tailwind CSS 3.x via PostCSS with tokens managed in `C:\home\ykazheka\personal-site\static-site\tailwind.config.js`  
**Content Source**: Markdown with front matter in `C:\home\ykazheka\personal-site\static-site\content\`  
**Reusable Components**: Hugo list templates under `C:\home\ykazheka\personal-site\static-site\layouts\_default\list.html` and taxonomy templates under `C:\home\ykazheka\personal-site\static-site\layouts\_default\terms.html` (and `layouts/taxonomy/` if present)  
**Assets Pipeline**: Hugo Pipes and Tailwind build output in `C:\home\ykazheka\personal-site\static-site\assets\` -> `C:\home\ykazheka\personal-site\static-site\static\`; no new assets required  
**Testing & Verification**: `npm run build`, `hugo --environment production --minify`, Lighthouse/performance checks, accessibility audit  
**Deployment Target**: GitHub Pages workflow publishing Hugo `public/` artifacts (consistent with prior specs; no alternate provider detected)  
**Constraints**: Uphold UX simplicity, responsive behavior, and performance budgets defined in the constitution

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Hugo-Driven Architecture**: PASS - list template changes remain in Hugo taxonomy layouts.
- **Tailwind-Centric Styling**: PASS - typography and spacing changes use existing Tailwind utilities.
- **Simple UX Paths**: PASS - navigation remains minimal with a single back link.
- **Responsive-First Layouts**: PASS - list remains single-column on mobile and spacing is verified across breakpoints.
- **Static Performance & Accessibility**: PASS - no new scripts; semantic h1 and focus styles retained.

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

**Structure Decision**: Keep the update scoped to list/taxonomy templates (for tag-filtered views) and reuse existing typography classes in `C:\home\ykazheka\personal-site\static-site\assets\css\tailwind.css` if spacing tweaks are required. No new directories outside existing layout structure.

### Post-Design Constitution Check

After drafting the data model, contracts, and quickstart, the plan still satisfies all five constitutional pillars: Hugo-native taxonomy list updates, Tailwind-only styling, minimal navigation changes, responsive validation at 375px/768px/1024px, and accessibility/performance checks for the filtered list view.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., Extra JS bundle] | [Document necessity] | [Explain why Hugo/Tailwind solution insufficient] |
| [e.g., Additional layout directory] | [Document necessity] | [Explain why existing structure insufficient] |
