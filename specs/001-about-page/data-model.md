# Data Model - About Page Template

## Entity: AboutPage
- **Source**: `content/about/_index.md` (section page) with `type = "about"`.
- **Fields**:
  - `title` (string, required): Page `<h1>` rendered in layout and metadata.
  - `summary` (string, optional): Used for metadata descriptions/preview cards.
  - `params.about_blog.heading` (string, default "About the Blog"): Label for the first text block.
  - `params.about_blog.body` (markdown/string, required): Rich text describing the blog mission; rendered inside a prose container.
  - `params.about_me.heading` (string, default "About Me"): Label for the author bio block.
  - `params.about_me.body` (markdown/string, required): Short bio copy; may include inline links.
  - `params.portrait.src` (path, required): Relative path to asset in `assets/images/about/`; used by Hugo Pipes.
  - `params.portrait.alt` (string, required): Accessible description of the portrait.
  - `params.contact.email` (email string, required): Value injected into the `mailto:` CTA.
  - `params.contact.label` (string, default "Contact"): Button text.
- **Validation rules**:
  - Heading/body pairs must not be empty; if missing, build should fail or fallback text should display.
  - Email must match standard format (e.g., `name@example.com`) to avoid broken mailto links.
  - Portrait source must resolve to an existing asset; include fallback placeholder when build resource missing.
- **Relationships**:
  - Consumed by `layouts/about/single.html` and an optional partial `partials/about/layout.html`.
  - Shares global header/footer partials via `baseof.html` to keep navigation consistent.

## Entity: PortraitAsset
- **Source**: `assets/images/about/portrait.(jpg|png|webp)`.
- **Fields**:
  - `file` (binary image): High-resolution source image.
  - `alt_text` (string): Provided through AboutPage params to describe the subject.
  - `max_dimensions` (int pair): Target size (e.g., 1200x1600) enforced through Hugo `Fit` to keep loads efficient.
- **Validation rules**:
  - Asset must be at least 2x target resolution to avoid pixelation on retina displays.
  - Processed output should not exceed ~400 KB to maintain performance budgets.
- **Relationships**:
  - Referenced exclusively by AboutPage layout; processed resource emitted to `resources/_gen/images/...` and linked via `<img>`.

## Entity: ContactCTA
- **Source**: Derived from AboutPage contact params.
- **Fields**:
  - `label` (string): Visible text on the CTA button.
  - `email` (string): Used in `mailto:{email}`; required.
  - `subject` (string, optional): Optional prefilled mail subject if stakeholders desire (default empty to keep flow simple).
- **Validation rules**:
  - Must include `aria-label` or descriptive text referencing author to help assistive tech users.
  - CTA must remain single action; no multi-destination branching allowed per Simple UX principle.
- **Relationships**:
  - Rendered inside AboutPage layout below copy blocks.
  - Styled using Tailwind component classes defined in `assets/css/tailwind.css`.
