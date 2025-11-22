# Data Model – Single Post Page Template

**Date**: 2025-11-21  
**Source Spec**: [spec.md](./spec.md)

## Entities

### Post
- **Description**: Represents a single published article rendered by the template.
- **Fields**:
  - `title` (string, required) – Displayed as the `<h1>` headline; must be non-empty and under ~90 characters to avoid truncation.
  - `slug` (string, required) – Used in the page URL (`/posts/{slug}/`).
  - `publishDate` (datetime, required) – Controls ordering and metadata `<time>` output. Accepts ISO 8601 front matter values.
  - `tags` (array[string], optional) – Ordered collection of topical labels. Each entry maps to a taxonomy term with a permalink at `/tags/{tag}/`.
  - `summary` (string, optional) – Existing field for previews; not directly shown but can power meta tags.
  - `body` (Markdown/HTML, required) – Rich text content inserted after the metadata row, preserving authored structure.
  - `heroMedia` (asset ref, optional) – Optional lead image/video handled within the body or future template extensions.
- **Validation**:
  - Title and body must exist for the page to render.
  - Publish date must be present; if missing, editors must supply a fallback label (handled by CMS copy deck as per spec).
  - Tags array can be empty; template must render the "Untagged" pill when length is zero.

### Tag
- **Description**: Taxonomy label referenced by posts for navigation.
- **Fields**:
  - `label` (string, required) – User-facing name (e.g., "Tailwind").
  - `slug` (string, required) – Used to form `/tags/{slug}/` URLs.
  - `permalink` (string, derived) – Absolute/relative URL Hugo produces for the tag archive.
- **Relationships**:
  - Many-to-many between `Post` and `Tag`; a post can have multiple tags, and tags can appear on many posts.

## Relationships & Presentation Rules

- The Post entity owns the metadata row: `tags` display first, then the publish date.
- Tag chips should maintain insertion order to match author intent; duplicates are ignored.
- The publish date must always render even if tags are absent.
- Body content follows metadata immediately with no intervening widgets, ensuring continuity for screen readers and scroll depth tracking.

## State & Edge Handling

- Draft posts (`draft = true`) remain unaffected; template logic is purely presentational and applies when Hugo renders the page.
- Posts scheduled for future dates still show the metadata row but should reflect the scheduled date; editors may opt to add "Draft" copy if necessary.
- When localized builds run, the data model stays identical, but translations of `title`/`body` come from the localized content files while `tags` map to locale-specific taxonomy labels if defined.
