# Data Model: Base Layout Template

## Global Layout
- **Purpose**: Defines reusable page shell with named regions for head assets, header, main content, and footer.
- **Fields**:
  - `header_partial` (string): Path to header partial (`partials/site-header.html`).
  - `footer_partial` (string): Path to footer partial (`partials/site-footer.html`).
  - `head_assets_partial` (string): Path to shared head include.
  - `foot_scripts_partial` (string): Path to shared script include.
  - `content_block` (block): Hugo `block "main"` region where individual pages inject markup.
  - `page_css_block` (optional block): For page-level CSS injections.
  - `page_scripts_block` (optional block): For page-level script injections.

## Navigation Menu Item
- **Purpose**: Represents header navigation links.
- **Fields**:
  - `name` (string): Display label (defaults to "Home" or "About").
  - `url` (string): Canonical destination.
  - `weight` (int): Ordering value from Hugo menu config.
  - `aria_label` (string): Assistive description; falls back to `name`.
- **Relationships**: Aggregated by Hugo's `site.Menus.main` collection.

## Social Link
- **Purpose**: Footer contact target for Gmail, LinkedIn, Twitter, GitHub.
- **Fields**:
  - `platform` (enum): One of `gmail`, `linkedin`, `twitter`, `github`.
  - `label` (string): Readable link text (e.g., "Email", "LinkedIn").
  - `url` (string): Destination (mailto or profile URL).
  - `icon` (optional string): Reference to icon partial/class if added later.
  - `aria_label` (string): Descriptive text like "Open Yauheni Kazheka on GitHub".
- **Relationships**: Listed within footer partial; values sourced from `site.Params.social` map.

## Layout Settings (Site Params)
- **Purpose**: Configuration bucket for header/footer values exposed via Hugo params.
- **Fields**:
  - `logo_text` (string): Defaults to "Yauheni Kazheka".
  - `social` (map): Keys match platforms, values include `label` and `url`.
  - `copyright` (string): Format string such as "© {{ year }} Yauheni Kazheka".
- **Relationships**: Consumed by header/footer partials; editable via `config/_default/params.toml`.
