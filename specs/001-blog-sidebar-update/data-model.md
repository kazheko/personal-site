# Data Model - Blog Sidebar Update

## Entity: SidebarAuthor
- **Source**: Site params or author data source used by the blog homepage.
- **Fields**:
  - `name` (string, required): Author display name.
  - `bio` (string, required): Short author description shown in the sidebar.
  - `role` (string, optional): Secondary metadata (e.g., role or title).
  - `links` (list of strings, optional): Secondary links or contact metadata shown in smaller text.
- **Validation rules**:
  - `name` must not be empty.
  - `bio` should be concise (recommended <= 280 characters) to keep the sidebar compact.
  - Secondary metadata should fit within a single line on desktop without truncation.
- **Relationships**:
  - Rendered exclusively in the blog homepage sidebar author block.

## Entity: SidebarTag
- **Source**: Hugo taxonomy for tags.
- **Fields**:
  - `label` (string, required): Tag display name.
  - `slug` (string, required): URL-friendly identifier.
  - `count` (integer, optional): Number of posts using the tag (if displayed).
- **Validation rules**:
  - All tags in the taxonomy must be included in the sidebar list.
  - Long labels should wrap without breaking layout.
- **Relationships**:
  - Rendered as a list of informational tags in the sidebar.

## Entity: SidebarSection
- **Source**: Sidebar layout configuration.
- **Fields**:
  - `title` (string, required): Section label (e.g., About, Tags).
  - `content_type` (enum: author, tags, required): Determines which content block renders.
- **Validation rules**:
  - Only two sections are allowed (author bio and tags).
- **Relationships**:
  - Orders the sidebar content and ensures consistent spacing between sections.
