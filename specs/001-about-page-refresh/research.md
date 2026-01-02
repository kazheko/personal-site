# Research: About Page Editorial Refresh

## Decision 1: Preserve the existing About page template and update spacing with Tailwind utilities
- **Rationale**: The requirements only adjust spacing, typography emphasis, and layout width. Updating `C:\home\ykazheka\personal-site\static-site\layouts\about\single.html` (and any related partials) keeps the change scoped to Hugo templates without introducing new layouts or templates.
- **Alternatives considered**:
  - **Create a new layout type**: Adds maintenance overhead and violates the preference for minimal structural change.
  - **Add inline styles inside Markdown**: Conflicts with Tailwind-centric styling and the constitution's simplicity mandate.

## Decision 2: Use existing Tailwind tokens and brand colors for the author block
- **Rationale**: Colors in the spec (#111111, #6B6B6B, #3A3A3A) align with `brand.text.heading`, `brand.text.muted`, and `brand.text.primary` in `C:\home\ykazheka\personal-site\static-site\tailwind.config.js`. This maintains the design system while satisfying the precise color requirements.
- **Alternatives considered**:
  - **Introduce new hex values in CSS**: Not allowed by the "no new colors" requirement.
  - **Custom CSS file outside Tailwind layers**: Violates the Tailwind-centric styling principle.

## Decision 3: Set the 720px content width using Tailwind arbitrary value utilities
- **Rationale**: The existing typography max width is 65ch and does not match 720px. Tailwind supports `max-w-[720px]`, allowing the exact width without adding a new design token or changing configuration.
- **Alternatives considered**:
  - **Add a new `maxWidth` token**: Unnecessary configuration change for a single page.
  - **Use the default `max-w-3xl`**: Maps to 768px and exceeds the specified maximum width.
