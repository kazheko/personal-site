# Research Notes: Mobile Header Menu Toggle

## Accessible Toggle Semantics
- **Decision**: Use a `<button>` with `aria-expanded`, `aria-controls`, and an inline label ("Menu") paired with visually hidden text announcing open/closed state.
- **Rationale**: Matches WAI-ARIA Authoring Practices for disclosure menus and allows screen readers to understand when the navigation is exposed.
- **Alternatives considered**: Using a div with click handlers (fails keyboard users), relying solely on `aria-pressed` (less clear for assistive tech than `aria-expanded`).

## Dropdown Visibility & Layout
- **Decision**: Render the full navigation list in DOM order and toggle Tailwind utility classes (`hidden`, `flex`, `border-t`, `bg-brand-surface`) for sub-`sm` breakpoints, letting CSS handle width and spacing.
- **Rationale**: Keeps markup declarative, aligns with Tailwind pipeline, and ensures the dropdown inherits the header background and divider without inline styles.
- **Alternatives considered**: Creating a separate mobile-only menu partial (duplicates logic) or injecting inline styles (violates Tailwind-centric styling principle).

## State Management & Breakpoint Reset
- **Decision**: Add a lightweight script (`mobile-menu.js`) that attaches click and `keydown` listeners to the toggle, closes the menu on `Escape`, and listens to `matchMedia('(min-width: 640px)')` changes to reset when crossing the `sm` breakpoint.
- **Rationale**: Keeps behavior progressive (menu defaults open in markup), avoids heavy frameworks, and explicitly handles viewport resizing edge cases.
- **Alternatives considered**: Pure CSS checkbox hack (harder to manage focus/escape), using Alpine.js (adds dependency not justified by scope).

## Deployment Target Clarification
- **Decision**: Maintain the existing static hosting workflow (unchanged) because the feature only touches templates/assets and Hugo already emits static output compatible with any CDN.
- **Rationale**: No evidence of provider-specific constraints; keeping the pipeline agnostic satisfies constitution guidance.
- **Alternatives considered**: Updating deployment docs for Netlify/Vercel specifically (unsupported by current repo metadata).
