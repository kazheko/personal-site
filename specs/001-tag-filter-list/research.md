# Research: Tag Filtered List Template

## Decision 1: Use existing taxonomy list templates and add a minimal header block
- **Rationale**: Hugo already routes tag lists through taxonomy templates. Adding a small header block for the back link and tag title keeps the change scoped and consistent with the existing layout system.
- **Alternatives considered**:
  - **Create a new template type**: Adds complexity without new functionality.
  - **Inject header via JavaScript**: Violates the static and simplicity principles.

## Decision 2: Reuse existing typography utilities and color tokens
- **Rationale**: The requirements prohibit new fonts/colors and call for a strict editorial style. Using existing h1 styles and muted text tokens keeps the design consistent while meeting the new hierarchy rules.
- **Alternatives considered**:
  - **Custom CSS values per component**: Risks drifting from the design system.
  - **New UI patterns (badges/buttons)**: Conflicts with the minimal, content-first requirement.
