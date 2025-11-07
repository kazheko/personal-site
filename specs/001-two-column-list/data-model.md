# Data Model: Two-Column List Template

## Post Summary Card
- **Purpose**: Represents each post entry rendered in the primary column of the list template.
- **Fields**:
  - `title` (string): Post title pulled from front matter.
  - `permalink` (string): Absolute or relative URL linking to the post detail page.
  - `publish_date` (datetime): Presentation-ready date string (e.g., `Jan 2, 2025`).
  - `tags` (array<string>): Ordered set of tag names associated with the post.
  - `excerpt` (string): Truncated summary from `.Summary` or `.PlainWords` fallback.
- **Relationships**: Collections of Post Summary Cards compose the main column; tags feed into Tag Directory Items for deduplication.

## Author Profile Block
- **Purpose**: Sidebar module that introduces the site owner via photo and description.
- **Fields**:
  - `photo_resource` (asset reference): Hugo resource handle for the author image.
  - `photo_alt` (string): Accessible description for the image.
  - `bio` (string): Short blurb describing the author.
  - `links` (optional array<object>): Future-proof space for social/contact links.
- **Relationships**: Lives in the sidebar column; content originates from `site.Params.author` or data files.

## Tag Directory Item
- **Purpose**: Represents a unique tag surfaced in the sidebar tag section.
- **Fields**:
  - `label` (string): Human-readable tag name.
  - `permalink` (string): URL to the tag taxonomy listing.
  - `post_count` (int, optional): Number of posts associated with the tag.
- **Relationships**: Derived from Hugo's `.Site.Taxonomies.tags`; clicking navigates to the taxonomy list while tags also appear inline beneath each Post Summary Card.
