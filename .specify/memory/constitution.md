<!--
Sync Impact Report
Version change: N/A -> 1.0.0
Modified principles: (new) I. Hugo-Driven Architecture; (new) II. Tailwind-Centric Styling; (new) III. Simple UX Paths; (new) IV. Responsive-First Layouts; (new) V. Static Performance & Accessibility
Added sections: Core Principles; Technology Constraints; Development Workflow & Review; Governance
Removed sections: None
Templates requiring updates:
- .specify/templates/plan-template.md: updated 2025-11-04
- .specify/templates/spec-template.md: no change needed
- .specify/templates/tasks-template.md: updated 2025-11-04
Follow-up TODOs: None
-->
# Personal Site Constitution

## Spec-Kit Integration

We operate inside GitHub Spec-Kit and follow a Spec-Driven Development cadence. Every constitution update must respect the upstream spec (feature definitions), downstream plans, and task queues. Use the constitution to inform gating checks across speckit workflows before implementation work begins.

### Command Interpretation

speckit commands map directly to prompts in `.codex/prompts/` and workflow templates under `.specify/`:

- `speckit.constitution` -> use this document to regenerate `.specify/memory/constitution.md` and sync artifacts.
- `speckit.analyze` -> gather repo signals and readiness data before spec authoring.
- `speckit.specify` -> create or amend feature specs from templates.
- `speckit.plan` -> build implementation plans, ensuring Constitution Check gates remain satisfied.
- `speckit.tasks` -> derive task backlogs from the latest spec and plan alignment.
- `speckit.checklist` or other commands -> inspect the matching prompt and associated template to understand the expected deliverable and default to Spec-Kit conventions if unclear.

When encountering a `speckit.<name>` instruction, locate the corresponding prompt file and follow its flow. If the command references a new name, check `.specify/templates/commands/` for additional guidance or derive behavior from existing Spec-Kit patterns (analyze -> specify -> plan -> tasks -> implement).

## Core Principles

### I. Hugo-Driven Architecture
All site content MUST be authored and organized for Hugo. Markdown with front matter is the source of truth, taxonomies stay lightweight, and Hugo shortcodes or components encapsulate reusable layout logic. No alternative site generators or conflicting build systems may be introduced.

### II. Tailwind-Centric Styling
Visual design MUST be implemented with Tailwind CSS utility classes and shared design tokens. Custom CSS is limited to Tailwind layers (base, components, utilities) and lives alongside the Tailwind pipeline. External UI frameworks and ad-hoc inline styles are prohibited unless they extend Tailwind in a documented way.

### III. Simple UX Paths
User journeys MUST stay short, obvious, and distraction-free. Pages limit navigation options to essential destinations, prefer concise copy, and avoid interaction patterns that require JavaScript when static HTML suffices. Every addition must demonstrate how it keeps the UX simple.

### IV. Responsive-First Layouts
Layouts are designed mobile-first and MUST respond gracefully across breakpoints using Tailwind responsive utilities. Critical pages are verified on common viewport widths before release, and assets are optimized to maintain fast loads on constrained devices.

### V. Static Performance & Accessibility
The site MUST ship as static assets optimized for speed and inclusive access. Images are preprocessed for size, semantic HTML elements are used, and ARIA roles only appear when necessary. Lighthouse or equivalent audits back changes to ensure performance and accessibility budgets stay green.

## Technology Constraints

- Hugo is the only content build tool. The production build pipeline invokes `hugo` with configuration committed to version control.
- Tailwind CSS is required for styling. Its configuration file documents design tokens, color palette, and spacing scale.
- JavaScript usage is additive only when Hugo and Tailwind cannot meet the requirement; any script must be modular, deferred, and reviewed for size impact.
- Assets (images, fonts, downloads) live under `assets/` or `static/` with preprocessing steps defined in the build instructions.

## Development Workflow & Review

- Every change includes a local `hugo server` preview and cross-device responsive check before review.
- Pull requests reference the relevant principle(s) in their description and document any UX decision trade-offs.
- Content edits and styling adjustments are grouped per user journey to simplify review and rollback.
- Accessibility and performance checks (Lighthouse, pa11y, etc.) accompany changes that affect layout or assets.

## Governance

- This constitution governs all project plans, specs, and tasks. Reviews reject work that violates any principle or constraint.
- Amendments require consensus among maintainers, documented rationale, and updated checklists across templates before merging.
- Versioning follows semantic rules: major for breaking removals, minor for new principles or sections, patch for clarifications.
- Compliance is reviewed quarterly via a walkthrough of key pages, ensuring Hugo and Tailwind usage, UX simplicity, responsive behavior, and accessibility budgets remain intact.

**Version**: 1.1.0 | **Ratified**: 2025-11-04 | **Last Amended**: 2025-11-04
