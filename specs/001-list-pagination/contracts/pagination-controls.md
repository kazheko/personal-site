# Contract: pagination-controls.partial.md

**Purpose**: Defines the data contract required by `layouts/partials/pagination-controls.html` so any list template can render consistent pagination UI and metadata.

## Input Context

```yaml
paginator:
  page_number: 2              # int, current page
  total_pages: 5              # int, total number of pages
  page_size: 10               # int, items per page
  total_posts: 47             # int, total items
  range_start: 11             # int, 1-based index of first item on this page
  range_end: 20               # int, 1-based index of last item on this page
controls:
  - type: previous
    label: "Newer posts"
    url: "/posts/"
    is_active: false
    is_disabled: false
    aria_label: "Go to newer posts"
  - type: page
    label: "1"
    page_number: 1
    url: "/posts/"
    is_active: false
    is_disabled: false
    aria_label: "Go to page 1"
  - type: page
    label: "2"
    page_number: 2
    url: "/posts/page/2/"
    is_active: true
    is_disabled: false
    aria_label: "Current page, page 2"
  - type: next
    label: "Older posts"
    url: "/posts/page/3/"
    is_active: false
    is_disabled: false
    aria_label: "Go to older posts"
summary:
  display_text: "Page 2 of 5 (Posts 11-20 of 47)"
  canonical_url: "/posts/"
```

## Rendering Rules

1. When `controls[*].is_disabled` is true, render the element as a `<span>` or `<button disabled>` with `aria-disabled="true"` and no `href`.
2. When `controls[*].is_active` is true, add `aria-current="page"`, `aria-label="Current page, page {{page_number}}"`, and Tailwind states (e.g., `bg-gray-900 text-white`).
3. Stack controls vertically on screens `<sm` by applying `flex-col gap-2`; align horizontally with `justify-between` on `md+` screens.
4. The summary text must sit adjacent to the controls and reflect `range_start`/`range_end` so analytics instrumentation can scrape it if needed.
5. Partial callers must always provide `paginator` even if `total_pages == 1`; the partial will short-circuit rendering when `total_pages <= 1`.

## SEO Metadata Contract (`pagination-meta.html`)

```yaml
meta:
  current_url: "/posts/page/2/"
  rel_prev: "/posts/"          # null when page 1
  rel_next: "/posts/page/3/"    # null when last page
  canonical: "/posts/"
```

- Include `<link rel="prev" href="{{ rel_prev }}">` only when `rel_prev` exists.
- Include `<link rel="next" href="{{ rel_next }}">` only when `rel_next` exists.
- Always emit `<link rel="canonical" href="{{ canonical }}">` for consistency across paginated URLs.

