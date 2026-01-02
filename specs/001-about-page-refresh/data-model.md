# Data Model - About Page Editorial Refresh

## Entity: AboutPageContent
- **Source**: `C:\home\ykazheka\personal-site\static-site\content\about\_index.md` (section page).
- **Fields**:
  - `title` (string, required): Display title for the About page.
  - `body` (markdown, required): Narrative body text rendered as the main story copy.
  - `sections` (array, optional): Optional subsections rendered as `h2` blocks in the narrative flow.
- **Validation rules**:
  - Body content must be present to avoid empty editorial layout.
  - Section headings must use existing `h2` styles; no custom heading levels introduced.
- **Relationships**:
  - Rendered by `layouts/about/single.html` or its partials to apply spacing and width rules.

## Entity: AuthorProfile
- **Source**: About page front matter or site params (e.g., `params.author` in config).
- **Fields**:
  - `name` (string, required): Author name displayed at ~22px weight 600.
  - `role` (string, optional): Short subtitle rendered at 15px.
  - `bio` (markdown/string, required): Description text at 16px with 1.7 line height.
- **Validation rules**:
  - If `role` is omitted, the layout must collapse spacing without visual gaps.
  - `name` and `bio` must render in the approved brand text colors.
- **Relationships**:
  - Consumed by About page template and displayed adjacent to the narrative content.
