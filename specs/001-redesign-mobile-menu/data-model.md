# Data Model: Mobile Header Menu Toggle

## Navigation Toggle Control
- **Purpose**: Interactive control replacing inline links on sub-`sm` viewports to reveal the navigation list.
- **Fields**:
  - `id` (string): Unique identifier referenced by `aria-controls` (e.g., `primary-nav`).
  - `label` (string): Visible button text (default "Menu").
  - `aria_expanded` (boolean): Reflects open/closed state for assistive technologies.
  - `aria_controls` (string): Matches dropdown container id.
  - `icon` (optional string): Reference to Tailwind utility or SVG partial for hamburger/close icon.
- **Relationships**: Controls the Mobile Navigation Container; receives focus by default when header loads.

## Mobile Navigation Container
- **Purpose**: Responsive wrapper for the primary navigation list when presented vertically.
- **Fields**:
  - `id` (string): Anchor for `aria-controls` (e.g., `primary-nav`).
  - `state_class` (enum): `hidden` or `flex` to represent collapsed vs expanded states.
  - `divider_class` (string): Tailwind classes providing the top border separating it from the header (e.g., `border-t border-brand-border`).
  - `background_class` (string): Tailwind class aligning background color with header (e.g., `bg-brand-surface`).
  - `padding_class` (string): Tailwind spacing utilities for vertical rhythm (e.g., `py-3`).
  - `menu_items` (array<Menu Item>): Reuses Hugo-generated navigation items.
- **Relationships**: Renders immediately after header main row; toggled by Navigation Toggle Control and hidden on >= `sm` viewports.

## Menu Item (Reused)
- **Purpose**: Represents each navigation link, reusing existing Hugo menu data.
- **Fields**:
  - `label` (string): Display text from `menu.Name`.
  - `url` (string): Relative URL (`menu.URL | relURL`).
  - `active` (boolean): Flags current page for accent styling.
  - `order` (int): Hugo menu weight controlling list order.
- **Relationships**: Aggregated by both the desktop inline list and the mobile dropdown; no duplication of data sources.

## Focus Sequence
- **Purpose**: Defines deterministic keyboard navigation when the dropdown is open.
- **Fields**:
  - `first_focusable` (string): CSS selector for first link in the dropdown.
  - `last_focusable` (string): Selector for the last link, used to cycle focus back to the toggle when tabbing forward past the menu.
  - `escape_target` (string): Selector referencing the toggle button for `Escape` handling.
- **Relationships**: Implemented within `mobile-menu.js`; relies on DOM nodes declared in `site-header.html`.
