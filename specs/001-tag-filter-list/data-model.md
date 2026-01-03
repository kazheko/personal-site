# Data Model - Tag Filtered List Template

## Entity: TagListView
- **Source**: Hugo taxonomy list pages (tag context).
- **Fields**:
  - `tag_name` (string, required): Active tag label displayed in the page title.
  - `post_count` (number, derived): Number of posts in the filtered list.
  - `posts` (collection): Post entries rendered in the list.
  - `back_link_label` (string, fixed): "View all posts".
- **Validation rules**:
  - `tag_name` must render in the title without relying on color for meaning.
  - `post_count` of zero triggers the empty state messaging.
- **Relationships**:
  - Rendered by list/taxonomy templates in `C:\home\ykazheka\personal-site\static-site\layouts\_default\`.
