# Data Model: Blog Post Image Zoom

## Entity: Inline Post Image
- **Source**: Markdown or shortcode within `content/`
- **Fields**:
  - `src` (string, required): relative path/URL to the image asset.
  - `alt` (string, required): descriptive alternative text from front matter or markdown alt text.
  - `caption` (string, optional): caption text rendered below the image.
  - `zoomable` (boolean, default `false`): flag denoting whether the zoom overlay should attach.
  - `inlineSrc` (string, derived): Hugo-processed rendition used within the article body (e.g., `.Resize 800x`).
  - `originalSrc` (string, derived): full-resolution asset reserved for the overlay view.
  - `data-focus-label` (string, optional): label read by screen readers when the overlay opens (e.g., "Expanded view of <caption>").
- **Relationships**: Belongs to a blog post; may reference a corresponding `Zoom Overlay Session` when activated.
- **Validation Rules**:
  - `alt` text cannot be empty if `zoomable = true`.
  - Image must reside under `assets/images` or `static/` for build-time processing so Hugo transforms are available.

## Entity: Zoom Overlay Session
- **Source**: Client-side state created when a user activates zoom.
- **Fields**:
  - `active` (boolean): whether the overlay is visible.
  - `imageSrc` (string): URL of the full-resolution image (copied from Inline Post Image `originalSrc`).
  - `imageAlt` (string): alt text mirrored from Inline Post Image for accessibility.
  - `scrollPosition` (number): vertical scroll offset captured before locking the background.
  - `triggerElementId` (string): DOM id or selector used to return focus on close.
- **Relationships**: Tied to exactly one Inline Post Image per activation.
- **State Transitions**:
  1. `idle` > `activating`: user clicks/taps zoomable image.
  2. `activating` > `active`: overlay renders, body scroll locked, focus moves to overlay container.
  3. `active` > `closing`: user clicks overlay, clicks image, or scrolls.
  4. `closing` > `idle`: overlay hidden, body scroll restored, focus returned to trigger element.
- **Validation Rules**:
  - `scrollPosition` captured before locking; reused to prevent jumps when closing.
  - Overlay must clear state on dismissal to avoid memory leaks when navigating multiple images.
