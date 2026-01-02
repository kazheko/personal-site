# Implementation Plan: Production Typography System

**Branch**: `001-typography-system` | **Date**: 2025-12-29 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-typography-system/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Deliver a calm, readable, mobile-first typography system for the blog by defining font families, weights, type scale, vertical rhythm, and responsive container widths. The plan emphasizes Tailwind-driven tokens and Hugo layout updates so every content page, navigation element, and code block follows the same typography rules without introducing extra JavaScript or new build tooling.

## Technical Context

**Site Generator**: Hugo Extended 0.126.x (already configured; no version bump required)  
**Styling Stack**: Tailwind CSS 3.x with typography tokens managed in `tailwind.config.js` and base layer styles in `assets/css/tailwind.css`  
**Content Source**: Markdown with front matter in `content/`  
**Reusable Components**: Base layout in `layouts/_default/baseof.html` plus existing partials for header/footer and shared content wrappers  
**Assets Pipeline**: Hugo Pipes + PostCSS compile Tailwind from `assets/css/tailwind.css` to `resources/`/`static/` via `npm run dev` and `npm run build`  
**Testing & Verification**: `hugo --environment production --minify`, Lighthouse and axe audits, breakpoint review at 375px/768px/1024px  
**Deployment Target**: GitHub Pages (static output from `public/` published via repository workflow; no alternate provider detected)  
**Constraints**: Uphold UX simplicity, responsive behavior, and performance budgets defined in the constitution; no inline styles or unnecessary JS

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Hugo-Driven Architecture**: Typography updates stay within Hugo layouts, partials, and configuration; no alternate generators introduced. [PASS]
- **Tailwind-Centric Styling**: All typography rules derive from Tailwind utilities and config tokens; no inline CSS. [PASS]
- **Simple UX Paths**: Navigation and reading flows remain unchanged while improving legibility. [PASS]
- **Responsive-First Layouts**: Breakpoint-specific typography and container widths are defined and tested at 375px/768px/1024px. [PASS]
- **Static Performance & Accessibility**: No new scripts; font loading and styles are optimized for static delivery with accessibility audits planned. [PASS]

## Project Structure

### Documentation (this feature)

```text
specs/001-typography-system/
|-- plan.md          # This file (/speckit.plan command output)
|-- research.md      # Phase 0 output (/speckit.plan command)
|-- data-model.md    # Phase 1 output (/speckit.plan command)
|-- quickstart.md    # Phase 1 output (/speckit.plan command)
|-- contracts/      # (not used in this feature)
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

**Structure Decision**: No new directories are required; typography changes live in existing layout, Tailwind config, and CSS entrypoints.

## Complexity Tracking

No constitutional violations anticipated; complexity tracking table not required.

## Phase 0 - Outline & Research

### Open Questions & Research Tasks

1. **Font delivery strategy** - Determine whether to self-host Inter and JetBrains Mono or rely on a CDN while staying performant and privacy-friendly.
2. **Tailwind typography approach** - Confirm whether the system should use base-layer element styles, utility classes, or the Tailwind Typography plugin.
3. **Container width enforcement** - Validate where max-width and padding should be enforced (base layout vs content templates) to cover posts, lists, and static pages consistently.

### Research Output

See [`research.md`](./research.md) for detailed findings:

- Inter and JetBrains Mono will be self-hosted via Hugo assets and referenced through Tailwind `fontFamily` tokens to avoid external requests while ensuring consistent rendering.
- Typography rules will be implemented with Tailwind config tokens plus base-layer element styles (`body`, `h1-h4`, `p`, `a`, `code`, `pre`) to keep the system predictable without adding new plugins.
- Content width and padding will be applied through a shared content wrapper in the base layout so posts, lists, and static pages inherit the same 16px mobile padding and 640px/680px max widths at `md`/`lg` breakpoints.

All clarification items above are resolved; Phase 1 can proceed.

## Phase 1 - Design & Contracts

### Data Model

- Documented in [`data-model.md`](./data-model.md).
- Defines the typography system configuration (fonts, weights, scales, breakpoints, spacing) and validation rules that every page must follow.

### Quickstart & Implementation Guide

- [`quickstart.md`](./quickstart.md) covers font token setup, base layer rules, responsive width changes, and verification steps across breakpoints.

### Post-Design Constitution Check

All design artifacts remain within Hugo/Tailwind conventions, keep UX paths unchanged, define responsive verification steps, and avoid new scripts or non-essential assets. Gate remains PASS.

## Phase 2 - Implementation Readiness

1. **Typography Tokens**
   - Configure `tailwind.config.js` with Inter/JetBrains Mono font families, font weights, and responsive font sizes/line heights aligned to the spec.
2. **Base Styles**
   - Apply base-layer element styles for headings, paragraphs, links, code blocks, and metadata to establish rhythm and hierarchy without inline styling.
3. **Content Layout**
   - Update the shared content wrapper (base layout or content partial) to enforce mobile padding and max-width constraints at `md`/`lg` breakpoints.
4. **UI Text & Tap Targets**
   - Ensure navigation, pagination, and tag elements use the UI font size/weight and meet the 44px minimum tap height.
5. **Code Blocks**
   - Apply monospace fonts, sizes, line height, and overflow handling for `pre` and inline `code` elements.
6. **QA & Audits**
   - Verify typography at 375px/768px/1024px, run `npm run build` and `hugo --environment production --minify`, and capture Lighthouse + axe results for a representative post.

Once these steps are complete, hand off to `/speckit.tasks` to break implementation into executable tasks.
