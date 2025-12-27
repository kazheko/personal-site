# Implementation Plan: Light Minimal Color Scheme

**Branch**: `001-blog-color-scheme` | **Date**: 2025-12-27 | **Spec**: `C:\home\ykazheka\personal-site\static-site\specs\001-blog-color-scheme\spec.md`
**Input**: Feature specification from `C:\home\ykazheka\personal-site\static-site\specs\001-blog-color-scheme\spec.md`

## Summary

Apply the new light, minimal color system across blog templates by updating Tailwind design tokens and template class usage to ensure readable typography, restrained green accents, and consistent header/footer/pagination styling.

## Technical Context

**Site Generator**: Hugo Extended 0.126.x (no version bump required)  
**Styling Stack**: Tailwind CSS 3.x (config at `C:\home\ykazheka\personal-site\static-site\tailwind.config.js`)  
**Content Source**: Markdown with front matter in `C:\home\ykazheka\personal-site\static-site\content`  
**Reusable Components**: Hugo partials and templates under `C:\home\ykazheka\personal-site\static-site\layouts`  
**Assets Pipeline**: Hugo Pipes and Tailwind build output in `C:\home\ykazheka\personal-site\static-site\assets` -> `C:\home\ykazheka\personal-site\static-site\static`  
**Testing & Verification**: `hugo --environment production --minify`, Lighthouse/performance checks, accessibility audit  
**Deployment Target**: Static hosting/CDN (current provider unchanged)  
**Constraints**: Uphold UX simplicity, responsive behavior, and performance budgets defined in the constitution

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Hugo-Driven Architecture**: Pass. Changes stay within Hugo layouts, assets, and configuration.
- **Tailwind-Centric Styling**: Pass. Colors are managed via Tailwind tokens/utilities, no inline styles.
- **Simple UX Paths**: Pass. No new navigation or interactions introduced.
- **Responsive-First Layouts**: Pass. Color updates preserve existing responsive layouts and require viewport spot checks.
- **Static Performance & Accessibility**: Pass. No new scripts; contrast checks included in validation.

## Project Structure

### Documentation (this feature)

```text
C:\home\ykazheka\personal-site\static-site\specs\001-blog-color-scheme\
|-- plan.md          # This file (/speckit.plan command output)
|-- research.md      # Phase 0 output (/speckit.plan command)
|-- data-model.md    # Phase 1 output (/speckit.plan command)
|-- quickstart.md    # Phase 1 output (/speckit.plan command)
`-- tasks.md         # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Site Structure (repository root)

```text
C:\home\ykazheka\personal-site\static-site\content\
|-- _index.md        # Home page content
|-- [section]\       # Section content directories
`-- [page]\index.md  # Individual page content

C:\home\ykazheka\personal-site\static-site\layouts\
|-- _default\
|   |-- baseof.html  # Base layout
|   |-- list.html    # List page template
|   `-- single.html  # Default page template
|-- partials\        # Shared fragments and components
`-- shortcodes\      # Reusable content macros

C:\home\ykazheka\personal-site\static-site\assets\
|-- css\
|   `-- tailwind.css # Tailwind entrypoint
`-- images\          # Source media for optimization

C:\home\ykazheka\personal-site\static-site\static\              # Generated/static assets served as-is
```

**Structure Decision**: No additional directories required for this feature.

## Phase 0: Outline & Research

- Review existing Tailwind tokens and map the new palette to semantic color roles.
- Identify all templates using body text, headings, links, tags, header/footer, and pagination to ensure coverage.
- Validate contrast expectations against the new palette and document results in `research.md`.

## Phase 1: Design & Contracts

- Document the color token mapping and usage rules in `data-model.md`.
- Confirm there are no API contracts required; record outcome in `C:\home\ykazheka\personal-site\static-site\specs\001-blog-color-scheme\contracts`.
- Draft `quickstart.md` with implementation and verification steps for the palette rollout.
- Run the agent context update script and re-check Constitution alignment after design artifacts are complete.

## Phase 2: Implementation Planning

- Hand off to `/speckit.tasks` to break the plan into executable tasks.

## Constitution Re-Check (Post-Design)

- **Hugo-Driven Architecture**: Pass. Design artifacts stay within Hugo content/layout configuration.
- **Tailwind-Centric Styling**: Pass. Color tokens and utility usage remain the primary styling mechanism.
- **Simple UX Paths**: Pass. No new flows required.
- **Responsive-First Layouts**: Pass. Validation includes mobile/tablet/desktop spot checks.
- **Static Performance & Accessibility**: Pass. Contrast checks and no new JavaScript.

## Complexity Tracking

No constitution violations to document.
