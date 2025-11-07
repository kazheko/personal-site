# Contracts: Two-Column List Template

This feature renders existing Hugo content and taxonomies; no external APIs or service contracts are introduced.

- Data flows originate from Markdown front matter (`.Title`, `.Date`, `.Params.tags`) and global taxonomies (`.Site.Taxonomies.tags`).
- Sidebar author metadata comes from `site.Params.author` (photo, alt text, bio) or an optional data file reference.
- Since no HTTP endpoints are added, testing focuses on template output and taxonomy correctness rather than API contracts.
