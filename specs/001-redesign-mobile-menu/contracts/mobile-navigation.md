# Contract: Mobile Navigation Toggle

No external HTTP APIs are introduced for this feature. The interactions occur entirely within the static header markup. To document expected DOM contracts, the following table lists the selectors and states the JavaScript module depends on.

| Selector / Data Attribute | Element | Responsibility | Notes |
|---------------------------|---------|----------------|-------|
| `[data-mobile-toggle]` | `button` | Stores expanded state via `aria-expanded`; dispatches `click` and `keydown` events. | Button text must remain "Menu" (or localized equivalent) with an accessible label.
| `[data-mobile-menu]` | `nav` or `div` wrapping `<ul>` | Reveals vertical list on mobile viewports when `data-open="true"`. | Hidden by default using Tailwind (`hidden`) and shown with `flex`/`space-y` utilities.
| `[data-mobile-menu-link]` | `<a>` within dropdown | Receives focus cycling; triggers close-on-select behavior. | Links mirror Hugo `site.Menus.main` entries.
| `data-breakpoint="sm"` | Applied via script constant | Ensures resize listener collapses menu when `window.matchMedia('(min-width: 640px)')` becomes true. | Keeps responsive behavior consistent with Tailwind `sm` breakpoint.

Changes to these selectors or attributes must be reflected in `assets/js/mobile-menu.js` to preserve functionality.
