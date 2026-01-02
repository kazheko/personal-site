# Implementation Plan: Footer Social Icons

**Branch**: `001-footer-icon-links` | **Date**: 2026-01-02 | **Spec**: [spec.md](C:\home\ykazheka\personal-site\static-site\specs\001-footer-icon-links\spec.md)
**Input**: Feature specification from `C:\home\ykazheka\personal-site\static-site\specs\001-footer-icon-links\spec.md`

## Summary

Replace footer text links (Email, LinkedIn, Twitter, GitHub) with icons while preserving existing link destinations, accessibility labels, and design system styling. The update will focus on the footer partial and shared Tailwind utilities without introducing new colors, fonts, or layout changes.

## Technical Context

**Site Generator**: Hugo Extended 0.126.x (current toolchain per AGENTS.md; no version change required)  
**Styling Stack**: Tailwind CSS 3.x via PostCSS with tokens managed in `C:\home\ykazheka\personal-site\static-site\tailwind.config.js`  
**Content Source**: Markdown with front matter in `C:\home\ykazheka\personal-site\static-site\content\`  
**Reusable Components**: Hugo partials under `C:\home\ykazheka\personal-site\static-site\layouts\partials\` (primary target: `C:\home\ykazheka\personal-site\static-site\layouts\partials\site-footer.html`)  
**Assets Pipeline**: Hugo Pipes and Tailwind build output in `C:\home\ykazheka\personal-site\static-site\assets\` -> `C:\home\ykazheka\personal-site\static-site\static\`; no new assets required  
**Testing & Verification**: `npm run build`, `hugo --environment production --minify`, Lighthouse/performance checks, accessibility audit  
**Deployment Target**: GitHub Pages workflow publishing Hugo `public/` artifacts (consistent with prior specs; no alternate provider detected)  
**Constraints**: Uphold UX simplicity, responsive behavior, and performance budgets defined in the constitution

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Hugo-Driven Architecture**: PASS - footer updates are confined to Hugo partials and configuration.
- **Tailwind-Centric Styling**: PASS - icons inherit existing Tailwind utility styles and tokens.
- **Simple UX Paths**: PASS - no new interactions beyond existing footer links.
- **Responsive-First Layouts**: PASS - icon sizing and spacing will be validated at common breakpoints.
- **Static Performance & Accessibility**: PASS - inline SVG icons avoid new scripts and maintain accessible labels.

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

**Structure Decision**: Keep the footer update scoped to `C:\home\ykazheka\personal-site\static-site\layouts\partials\site-footer.html`, with optional icon partials in `C:\home\ykazheka\personal-site\static-site\layouts\partials\icons\` and any shared styles in `C:\home\ykazheka\personal-site\static-site\assets\css\tailwind.css`. No new directories outside existing layout/asset structure.

### Post-Design Constitution Check

After drafting the data model, contracts, and quickstart, the plan still satisfies all five constitutional pillars: Hugo-native layout changes, Tailwind-only styling, no added UX flows, responsive validation at 375px/768px/1024px, and accessibility/performance checks for the footer.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., Extra JS bundle] | [Document necessity] | [Explain why Hugo/Tailwind solution insufficient] |
| [e.g., Additional layout directory] | [Document necessity] | [Explain why existing structure insufficient] |
