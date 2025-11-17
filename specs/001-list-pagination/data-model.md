# Data Model: Paginated List Navigation

## Paginated Post Collection
- **Purpose**: Represents the slice of posts displayed on the current archive page plus bookkeeping needed for totals and ranges.
- **Fields**:
  - `page_number` (int): 1-based index of the current page (`.Paginator.PageNumber`).
  - `total_pages` (int): Total number of pages available (`.Paginator.TotalPages`).
  - `page_size` (int): Number of posts shown per page (default 10 via `paginate`).
  - `total_posts` (int): Aggregate count across all pages (`.Paginator.TotalNumberOfElements`).
  - `range_start` (int): Ordinal position of the first post on the page (e.g., 11 for page 2 when size=10).
  - `range_end` (int): Ordinal position of the last post on the page (min of total posts vs. `range_start + page_size - 1`).
  - `items` (array<Post Summary Card>): The actual posts already modeled in the two-column list feature.
- **Relationships**: Consumed by `list.html` to render the main column and to feed Pagination Summary + Controls.

## Pagination Control Item
- **Purpose**: Defines each interactive element (previous, next, numbered link) rendered inside the pagination controls partial.
- **Fields**:
  - `type` (enum: `previous`, `next`, `page`): Distinguishes control behavior.
  - `label` (string): Visible text such as "Older", "Newer", or the page number.
  - `url` (string|null): Target permalink for the control; null/empty when disabled.
  - `page_number` (int|null): Numeric value for `page` type to support `aria-label="Go to page X"`.
  - `is_active` (bool): True when the control represents the current page (`aria-current="page"`).
  - `is_disabled` (bool): True when a direction is unavailable (e.g., no previous page).
  - `aria_label` (string): Screen-reader description such as "Go to newer posts".
- **Relationships**: A list of Control Items renders inside `pagination-controls.html` using Tailwind components.

## Pagination Summary
- **Purpose**: Human-readable recap of the reader's position within the archive.
- **Fields**:
  - `display_text` (string): Sentence such as "Page 2 of 5 (Posts 11-20 of 47)".
  - `page_number` (int): Mirrors Paginated Post Collection for templating reuse.
  - `total_pages` (int): Displayed in copy and analytics tracking.
  - `range_start` / `range_end` (int): Reused for textual summary.
  - `canonical_url` (string): Base URL for the archive root, used for rel tags and fallback links.
- **Relationships**: Rendered adjacent to controls; also informs metadata partial for `<link rel="next">`/`rel="prev"`.

## Out-of-Range Redirect Notice
- **Purpose**: Data payload consumed by `layouts/404.html` when the request path resembles `/page/<n>/` but no page was generated.
- **Fields**:
  - `detect_pattern` (regex): `^/([^/]+)/page/\d+/` to detect pagination URLs.
  - `redirect_target` (string): Last known valid archive URL (defaults to section root).
  - `message` (string): Copy shown to users before redirect (e.g., "Those posts stop at page 5; showing the latest articles instead.").
  - `delay_seconds` (int): Optional meta-refresh delay (e.g., 2 seconds) to give users context.
- **Relationships**: Stored in `site.Params.pagination` (or similar) so the 404 template can react consistently across sections.

