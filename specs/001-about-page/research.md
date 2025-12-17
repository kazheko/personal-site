# Research - About Page Template

## Decision 1: Template structure
- **Decision**: Implement a dedicated `layouts/about/single.html` (or `_default/single-about.html`) that extends `baseof.html` and includes a reusable partial for the split layout.
- **Rationale**: Hugo lets content types pick templates by section; placing the About content under `content/about/` automatically binds to `layouts/about/single.html`. This keeps the rest of the site on the standard `single.html` while letting us tailor markup and data bindings for the About page only.
- **Alternatives considered**: Conditional logic inside `_default/single.html` (adds branching for one-off content), shortcode-driven layout (pushes layout concerns into Markdown, hurts maintainability), or creating a theme-level override (heavyhanded for a single page).

## Decision 2: Portrait asset handling
- **Decision**: Store the portrait in `assets/images/about/portrait.(jpg|webp)` and pipe it through Hugo image processing (`resources.Get`, `Fit`) before emitting responsive `<img>` markup.
- **Rationale**: Assets in `assets/` keep source files optimized by Hugo Pipes, allowing size constraints (e.g., 1200px max) and automatic WebP output while still referencing the asset with cache-busting fingerprints.
- **Alternatives considered**: Dropping the photo into `static/` (no optimization, heavier payload), hosting externally (breaks performance/offline guarantees), or embedding base64 data (bloats HTML and complicates caching).

## Decision 3: Contact CTA pattern
- **Decision**: Use an `<a href="mailto:..." class="btn">` element styled as a button with Tailwind, placed after the text sections with clear focus states.
- **Rationale**: Mailto links trigger the user's email client without scripting, satisfy the spec's requirement, and remain accessible when treated as a standard link styled as a button (per WAI guidance). Positioning it immediately below the copy keeps the CTA in the reading flow.
- **Alternatives considered**: `<button>` with JS handler (adds unnecessary script), contact form (expands scope + backend), or social/profile links (not requested and dilutes the CTA).

## Decision 4: Responsive layout pattern
- **Decision**: Build the layout with a single flex container (`lg:flex-row`) that stacks (`flex-col`) by default, reserving `lg:w-1/2` widths for text vs. photo, and apply `object-cover` plus max-height utilities to keep the portrait anchored.
- **Rationale**: A mobile-first flex approach keeps markup simple (two sibling divs), supports order control (e.g., `lg:order-2` for the photo), and reuses Tailwind utilities already compiled. It also avoids grid complexity for a two-column layout.
- **Alternatives considered**: CSS Grid (overkill for two items), background-image hero (would hide the portrait from assistive tech), separate templates per breakpoint (duplicated markup).
