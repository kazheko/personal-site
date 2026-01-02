# Data Model - Footer Social Icons

## Entity: SocialLink
- **Source**: `C:\home\ykazheka\personal-site\static-site\config\_default\params.toml` under `site.Params.social`.
- **Fields**:
  - `label` (string, required): Human-readable name used for accessible labels.
  - `url` (string, required): Destination for the social link.
  - `aria_label` (string, optional): Custom accessible label for the link.
  - `icon` (string, implicit): Icon identifier mapped to Email, LinkedIn, Twitter, GitHub.
- **Validation rules**:
  - Links without a URL are omitted from the footer.
  - Accessible label must be present either via `aria_label` or derived from `label`.
- **Relationships**:
  - Rendered in `C:\home\ykazheka\personal-site\static-site\layouts\partials\site-footer.html` as icon links.
