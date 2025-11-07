# Feature Specification: Two-Column List Template

**Feature Branch**: [001-two-column-list]  
**Created**: 2025-11-06  
**Status**: Draft  
**Input**: User description: "create a hugo list template. Split content on two columns. The left column is the main column and displays a list of posts. For each post, display the title, below  post's tags (separated by commas) and the publication date. Then display 2-3 lines of text from the beginning of the post. The right column should display my photo, followed by a brief description of me. Then comes a section listing all unique tags from all posts. On large and medium screens, the columns are displayed horizontally. On small screens, the second column is displayed vertically under the first column."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Scan Posts at a Glance (Priority: P1)

A reader landing on the blog list wants to scan recent posts quickly, seeing each title, its tags, publish date, and a short preview without opening every detail page.

**Why this priority**: This is the primary reason people visit a list template—discovering posts efficiently determines whether they read further.

**Independent Test**: Load the list page at desktop width, confirm every visible post entry shows a clickable title, comma-separated tags directly below it, the publication date, and a truncated excerpt of approximately the first two to three lines of body copy.

**Acceptance Scenarios**:

1. **Given** multiple published posts with tags and dates, **When** the list template renders, **Then** each entry shows the title, tags, date, and a text teaser drawn from the beginning of the post content.
2. **Given** a post that lacks tags, **When** the list renders, **Then** the template either omits the tag line or substitutes an accessible "No tags" label so spacing stays consistent.

---

### User Story 2 - Understand the Author Context (Priority: P2)

A first-time visitor wants quick context about the site owner while browsing posts, including a recognizable photo and short bio blurb.

**Why this priority**: Establishing credibility and personality beside the content increases trust and keeps the experience cohesive.

**Independent Test**: Inspect the right column at desktop width and verify it contains the author photo, alt text, and a short paragraph describing the person regardless of post count.

**Acceptance Scenarios**:

1. **Given** the list page loads, **When** the sidebar is visible, **Then** it displays the configured photo above a short descriptive paragraph about the author.
2. **Given** the configured photo asset is missing, **When** the sidebar renders, **Then** it gracefully falls back to a placeholder avatar or hides the image without breaking layout.

---

### User Story 3 - Explore Tags and Maintain Responsive Layout (Priority: P3)

A visitor wants to discover topics covered on the site and experience a layout that adapts cleanly from large screens to phones.

**Why this priority**: Tag discovery supports navigation while responsive behavior ensures usability on all devices.

**Independent Test**: Validate that the sidebar lists every unique tag found across posts (once each) and that the two-column layout collapses so the sidebar stacks beneath the post list when the viewport is below the small breakpoint.

**Acceptance Scenarios**:

1. **Given** there are posts with overlapping and unique tags, **When** the sidebar renders, **Then** it lists each tag exactly once (alphabetical or grouped) with optional counts, linking to the appropriate tag page.
2. **Given** the viewport width shrinks below the small breakpoint, **When** the layout reflows, **Then** the sidebar content appears below the posts column with appropriate spacing while preserving reading order.

---

### Edge Cases

- How does the list behave when there are fewer than two posts—does the layout still show the sidebar next to an empty or short list?
- What happens when a post lacks tags or publish dates (drafts or legacy content)?
- How are excessively long excerpts handled to maintain the "2-3 lines" guidance across different breakpoints?
- How does the tag list handle extremely long tag names or more tags than fit in the sidebar without scrolling?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The Hugo list template MUST render the main content column with all posts ordered by publish date (newest first) and include each post's title, tags (comma-separated), publish date, and an excerpt approximating the first two to three lines of body text.
- **FR-002**: Each post title in the list MUST link to the corresponding single post page, and the excerpt MUST avoid truncating mid-word or exceeding the visual two-to-three-line guideline at default font sizes.
- **FR-003**: The template MUST gracefully handle posts missing tags by either hiding the tag line or displaying a "No tags" label without leaving empty artifacts.
- **FR-004**: The right column MUST display (in order) an author photo, accompanying alt text, a short descriptive paragraph, and a "Browse Tags" section that enumerates every unique tag derived from the posts dataset.
- **FR-005**: The unique tags section MUST deduplicate tag names across all posts, sort them predictably (alphabetical unless otherwise configured), and link each tag to its taxonomy page; counts per tag are optional but, if shown, MUST reflect the number of associated posts.
- **FR-006**: On medium and large breakpoints, the layout MUST display the posts column and sidebar side-by-side with the posts column visually dominant; on small breakpoints the sidebar MUST stack beneath the posts column with consistent spacing and heading hierarchy.
- **FR-007**: The template MUST remain accessible by preserving semantic headings, ensuring the sidebar content follows a logical reading order, and providing descriptive alt text for the author photo and tag list.

### Key Entities

- **Post Summary Card**: Represents each post in the list and includes attributes for title, permalink, publish date, primary tag collection, and teaser text sourced from the post body or summary.
- **Author Profile Block**: Contains the author photo path or asset fingerprint, alt text, and a short biography paragraph sourced from site configuration to keep copy centralized.
- **Tag Directory Item**: A deduplicated tag name plus optional count and URL, derived from Hugo taxonomies so that sidebar links stay in sync with tag listing pages.

## Assumptions

- The author photo path, alt text, and bio copy already exist in site parameters or another centralized data file so the template can pull them without duplicating content.
- Post excerpts can rely on Hugo summary helpers to approximate two to three lines without manual per-post editing.
- All list pages using this template are blog-like contexts where tags are defined via Hugo's standard tags taxonomy; no custom taxonomy mapping is required.
- Styling and responsive behavior will be implemented with the existing Tailwind CSS pipeline described in the constitution.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In usability checks, 90% of readers can identify a post's title, publish date, and at least one tag within three seconds of viewing the list entry.
- **SC-002**: On mobile devices (<=640px), automated visual regression tests confirm the sidebar stacks below the posts column with no horizontal scrolling in 100% of sampled pages.
- **SC-003**: The unique tag list displays every tag present in the latest content build (spot-check against hugo list taxonomies) with zero duplicates or missing entries.
- **SC-004**: Lighthouse accessibility scores remain >=90 for the list page template after launch, demonstrating that the added sidebar content and responsive behavior do not introduce accessibility regressions.
