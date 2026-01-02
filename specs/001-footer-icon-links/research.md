# Research: Footer Social Icons

## Decision 1: Use inline SVG icons in the footer partial
- **Rationale**: Inline SVG keeps the icons lightweight, avoids new asset pipelines, and aligns with the static performance constraint. It also allows Tailwind color utilities to control icon color via `currentColor`.
- **Alternatives considered**:
  - **External icon font**: Adds additional font files and conflicts with the "no new fonts" requirement.
  - **Image assets in `static/`**: Introduces extra files and reduces flexibility for hover/focus styling.

## Decision 2: Reuse existing footer link styles and focus utilities
- **Rationale**: The footer already defines link spacing, focus rings, and color tokens. Keeping those classes ensures design-system consistency without introducing new styling rules.
- **Alternatives considered**:
  - **Create new button styles**: Increases maintenance and risks deviating from existing tokens.
  - **Inline styles per icon**: Conflicts with Tailwind-centric styling.
