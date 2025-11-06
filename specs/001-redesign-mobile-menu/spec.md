# Feature Specification: Mobile Header Menu Toggle

**Feature Branch**: `[001-redesign-mobile-menu]`  
**Created**: 2025-11-06  
**Status**: Draft  
**Input**: User description: "The current menu in the header needs to be redesigned. For medium and large screens, the current implementation is suitable: a single-line menu is placed to the right of the logo. For small screens, a only a menu button should be placed to the right of the logo. Clicking the button should show a drop-down menu as a vertical list. This drop-down list should appear below the logo and the button, visually separated by a line. The drop-down list should be displayed full-width and match the header color."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Reveal Mobile Navigation (Priority: P1)

A mobile visitor wants to access the primary navigation from the header without scrolling or guessing where links live.

**Why this priority**: Until mobile users can reliably reach the navigation, they cannot reach interior pages; this is critical for site usability.

**Independent Test**: Load the homepage at a sub-`sm` breakpoint, toggle the menu, and confirm the full navigation list appears in a vertical layout below the header.

**Acceptance Scenarios**:

1. **Given** a viewport narrower than the Tailwind `sm` breakpoint, **When** the page loads, **Then** the header shows the logo and a single accessible menu button with no inline links.
2. **Given** the same viewport, **When** the visitor activates the menu button, **Then** a full-width navigation list drops down below the header, matches the header background, and remains visible until dismissed.

---

### User Story 2 - Dismiss Mobile Navigation (Priority: P2)

A mobile visitor wants to close the navigation after choosing an option so the header stops covering content.

**Why this priority**: Collapsing the menu maintains reading flow and prevents persistent obstruction of the page.

**Independent Test**: With the dropdown open, activate a link or the toggle control again and verify the menu collapses while focus stays visible.

**Acceptance Scenarios**:

1. **Given** the dropdown menu is expanded, **When** the visitor selects a navigation link, **Then** the dropdown closes and the page begins navigating to the chosen destination.
2. **Given** the dropdown menu is expanded, **When** the visitor activates the menu button a second time or presses `Escape`, **Then** the dropdown collapses and focus returns to the toggle control.

---

### User Story 3 - Preserve Desktop Navigation (Priority: P3)

A desktop or tablet visitor (>= `sm` breakpoint) expects the header menu to stay visible inline to the right of the logo.

**Why this priority**: Existing larger-screen experience already works well; keeping it intact avoids regressions.

**Independent Test**: Resize the viewport to >= `sm`, reload the page, and ensure the inline menu renders exactly once without the mobile dropdown behavior.

**Acceptance Scenarios**:

1. **Given** a viewport at or wider than the Tailwind `sm` breakpoint, **When** the page loads, **Then** the header displays the horizontal menu beside the logo without the mobile toggle button.

---

### Edge Cases

- How does the menu behave when the viewport crosses the `sm` breakpoint while the dropdown is open?
- What happens if the navigation list has more items than fit on small screens without scrolling?
- How does the interaction work for keyboard-only or screen-reader users toggling the menu repeatedly?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The header MUST hide inline navigation links and display a single menu toggle button to the right of the logo on viewports narrower than Tailwind `sm`.
- **FR-002**: The menu toggle button MUST expose an accessible label (e.g., "Menu") and convey expanded/collapsed state via ARIA attributes or equivalent semantics.
- **FR-003**: Activating the menu toggle on small screens MUST reveal a vertical navigation list that spans the full viewport width, matches the header background color, and is visually separated from the header by a divider line.
- **FR-004**: The vertical dropdown MUST present the same navigation items, order, and active-state styling as the existing desktop menu while supporting keyboard focus movement within the list.
- **FR-005**: The dropdown MUST close when a navigation link is chosen, the toggle is reactivated, focus leaves the menu via `Escape`, or the viewport expands to the `sm` breakpoint or above.
- **FR-006**: Viewports at or above the Tailwind `sm` breakpoint MUST continue rendering the one-line inline navigation to the right of the logo with no toggle button visible.
- **FR-007**: The transition between breakpoints MUST reset any open mobile dropdown state so lingering overlays do not persist on larger screens.

## Assumptions

- Existing Hugo menu definitions remain the single source of navigation links; no new menu data sources are introduced.
- Tailwind and minimal progressive-enhancement JavaScript can deliver the toggle behavior without adding third-party libraries.
- Visual styling (colors, typography) will reuse existing design tokens from `tailwind.config.js` and current header variables.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In mobile usability checks, 100% of testers can reveal the navigation within two interactions from page load.
- **SC-002**: Mobile Lighthouse accessibility audits score >= 90 for the header component, confirming semantics and focus management.
- **SC-003**: Responsive testing across three common mobile widths (375px, 414px, 480px) shows the dropdown renders without horizontal scrolling or clipped content.
- **SC-004**: Desktop Lighthouse performance and accessibility scores remain within two points of current baselines after the redesign, indicating no regressions for larger screens.
