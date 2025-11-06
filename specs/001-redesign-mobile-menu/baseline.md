# Baseline Notes: Mobile Header (Pre-Redesign)

## Layout Snapshot
- Header renders as a fixed bar with logo left and inline navigation list always visible.
- Navigation list uses `<nav aria-label="Primary">` containing `<ul>` with flex row layout via `flex flex-wrap items-center gap-4` classes.
- No breakpoint-specific logic; menu stays inline at all widths, leading to cramped layout on sub-`sm` viewports.

## Interaction Behavior
- No toggle button exists; links remain focusable regardless of viewport size.
- Keyboard navigation flows left-to-right through all menu items with default tab order; no script manages focus or dismissal.

## Styling Reference
- Header background uses `bg-brand-surface/95` with shadow and backdrop blur.
- Links apply Tailwind classes for spacing (`px-2 py-1`), typography, and focus rings.
- Active link state relies on `text-brand-accent`; inactive links use `text-brand-text/80` hover to `text-brand-text`.

## Known Pain Points
- On narrow screens, inline list wraps to multiple lines and competes with logo space.
- Lack of menu toggle prevents hiding navigation on small devices, conflicting with redesign requirements.
