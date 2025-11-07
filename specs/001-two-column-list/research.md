# Research Notes: Two-Column List Template

## Excerpt Strategy
- **Decision**: Use Hugo's `.Summary` value and fall back to `.PlainWords | truncate 200` to capture the first two to three lines of each post.
- **Rationale**: `.Summary` respects front-matter overrides, and the word-based fallback avoids manual excerpts while keeping previews consistent.
- **Alternatives considered**: Hand-authored excerpts (high maintenance) or client-side trimming (requires extra JavaScript and delays paint).

## Sidebar Data Source
- **Decision**: Store author photo path, alt text, and bio copy under `site.Params.author` so templates can read the profile from one canonical location.
- **Rationale**: Centralized data keeps copy consistent across layouts and enables localization or future reuse without editing multiple templates.
- **Alternatives considered**: Embedding the content directly in the list template (hard-coded) or scattering values across section-specific data files.

## Tag Aggregation Method
- **Decision**: Build the unique tag list from `.Site.Taxonomies.tags`, rendering each taxonomy entry once with optional counts and linking via the taxonomy page's permalink.
- **Rationale**: Hugo already maintains tag membership; reusing it ensures counts stay accurate even when list pages filter content.
- **Alternatives considered**: Iterating only over the current page's `.RegularPages` (misses tags from excluded posts) or maintaining a manual tag manifest.

## Responsive Layout & Column Balance
- **Decision**: Use a Tailwind grid (`md:grid md:grid-cols-[minmax(0,_3fr)_minmax(0,_1.2fr)]`) that collapses to a single column below `md`, ensuring the sidebar always follows the posts column in DOM order.
- **Rationale**: CSS grid handles unequal column widths without extra wrappers and stacks naturally on small viewports, satisfying responsive-first requirements.
- **Alternatives considered**: Duplicating markup in separate mobile/desktop templates or relying on floats/flex hacks that complicate accessibility.

## Author Image Handling
- **Decision**: Load the author photo through Hugo Pipes (`resources.Get`) to fingerprint optimized formats and hide the `<figure>` entirely if the asset is missing.
- **Rationale**: Asset pipeline guarantees cache-busting URLs and protects against broken references; graceful fallback preserves layout.
- **Alternatives considered**: Referencing static image paths (no fingerprinting) or embedding external image URLs (introduces third-party dependency).
