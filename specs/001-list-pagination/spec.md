# Feature Specification: Paginated List Navigation

**Feature Branch**: [001-list-pagination]  
**Created**: 2025-11-07  
**Status**: Draft  
**Input**: User description: "implement pagination for the list page."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Continue Browsing Older Posts (Priority: P1)

A returning reader wants to page through earlier posts without scrolling an endlessly long column, so they can reach content published weeks or months ago.

**Why this priority**: Without pagination, legacy posts become undiscoverable, cutting off traffic to the archive and defeating the list template's purpose.

**Independent Test**: Seed at least 15 posts, open the list page, and confirm only the configured page-size worth of posts render while "Older" navigation exposes the remaining posts on successive pages.

**Acceptance Scenarios**:

1. **Given** more posts exist than the per-page limit, **When** the reader clicks the "Older posts" control, **Then** the template loads the next page showing the subsequent batch of posts.
2. **Given** the reader reaches the final page, **When** the template renders, **Then** the "Older" control is disabled or hidden while the "Newer" control remains available.

---

### User Story 2 - Understand Where I Am (Priority: P2)

A first-time visitor needs clear feedback about how many pages exist and which page they are on before they decide to keep browsing.

**Why this priority**: Orientation reduces bounce rates; readers who know there are more pages stay longer.

**Independent Test**: Load both the first and middle pagination pages and verify a "Page X of Y" indicator plus numbered links make it clear which page is active without relying on color alone.

**Acceptance Scenarios**:

1. **Given** the reader is on page 1, **When** the page renders, **Then** the indicator shows "Page 1 of Y" and the page-one control is visually marked as active.
2. **Given** the reader is on page 3, **When** they view the pagination controls, **Then** both "Newer" (to go backward) and "Older" (forward) options appear with accessible labels.

---

### User Story 3 - Navigate on Any Device (Priority: P3)

A mobile visitor needs pagination controls that remain tappable and readable under the responsive two-column layout, stacking below the post list on small screens without crowding the content.

**Why this priority**: Pagination that only works on desktop breaks the responsive promise from the base list template.

**Independent Test**: Use responsive mode at 375px width and confirm pagination controls wrap into a single column with adequate spacing and hit targets of at least 44px height.

**Acceptance Scenarios**:

1. **Given** the viewport is below the small breakpoint, **When** pagination renders, **Then** controls stack vertically with consistent spacing and remain keyboard-focusable.
2. **Given** the viewport is desktop width, **When** pagination renders, **Then** controls align with the bottom of the main column without overlapping the sidebar or exceeding container width.

---

### Edge Cases

- How should the template behave when the number of posts is less than or equal to the page-size limit (pagination controls should not appear)?
- What happens if a user manually visits a non-existent page (e.g., `/page/99/`)? Provide a friendly message and redirect to the last available page.
- How is pagination handled when drafts are visible (`hugo server -D`) versus production (ensure counts only include published posts in each context)?
- How are query parameters (filters, search) preserved when moving between pages, if such parameters are later introduced?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The Hugo list template MUST paginate published posts using a configurable page size (default 10 posts per page) so that only that number of entries renders in the main column at once.
- **FR-002**: Pagination controls MUST include "Newer" and "Older" buttons plus numbered page links that indicate the active page with both visual styling and `aria-current="page"` for assistive tech.
- **FR-003**: The template MUST display a textual summary (e.g., "Page X of Y" or "Showing 11-20 of 42 posts") nearby the controls so users know their position in the archive.
- **FR-004**: Page URLs MUST follow Hugo's canonical pattern (`/page/2/`, `/page/3/`, etc.) and inject `<link rel="next">` / `<link rel="prev">` metadata inside the head to support SEO crawlers.
- **FR-005**: Pagination controls MUST inherit the existing responsive behavior: aligned horizontally under the posts column on medium+ screens and stacking beneath the column (and above the sidebar content) on small screens without causing layout shift.
- **FR-006**: When no additional posts exist in a given direction, the respective control MUST be disabled, hidden, or replaced with inert text so keyboard users are not taken to empty pages.
- **FR-007**: If a user navigates to a page number beyond the total, the template MUST gracefully handle it by showing the last valid page content and surfacing a notice or redirect without throwing a 404.
- **FR-008**: The pagination logic MUST respect Hugo filters for drafts/future content so that production builds only count published posts while `-D` previews include drafts consistently across pages.

### Key Entities

- **Paginated Post Collection**: Represents the subset of posts for the current page, including metadata such as total pages, total posts, and the index range currently visible.
- **Pagination Control Item**: A navigation element (previous, next, or numbered link) with attributes for target URL, label text, accessibility state, and disabled/active flags.
- **Pagination Summary**: Derived data describing the currently displayed range (start/end indices) that feeds both on-page copy and SEO metadata.

## Assumptions

- Page size of 10 posts is acceptable for both desktop and mobile experiences; maintainers can override this via Hugo configuration without changing the template.
- The existing two-column list template already outputs posts ordered by publish date descending, and pagination will preserve that order across pages.
- Site metadata partials (e.g., `head-assets.html`) can be extended to add `<link rel="next">`/`<link rel="prev">` tags without conflicting with other features.
- No faceted filters exist yet; pagination only needs to consider the full post collection.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In usability tests with at least five participants, 100% can reach posts older than the first page in two or fewer clicks.
- **SC-002**: Automated visual regression tests confirm pagination controls render on all pages greater than one with zero overlap or overflow incidents across breakpoints.
- **SC-003**: Lighthouse accessibility score remains >=90 for the list page after pagination ships, demonstrating the controls and ARIA states introduce no accessibility regressions.
- **SC-004**: Analytics show at least a 25% increase in pageviews of posts older than 30 days within one month of launch, indicating deeper archive discovery.
