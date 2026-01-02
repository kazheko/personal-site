# Research - Blog Sidebar Update

## Decision 1: Sidebar structure ownership
- **Decision**: Keep the blog sidebar implemented as a Hugo list template fragment (existing list template or dedicated sidebar partial) so the author bio and tag list stay confined to the blog homepage layout.
- **Rationale**: Sidebar content is specific to the blog homepage and should not leak into global templates. A localized template/partial keeps scope tight and preserves the base layout.
- **Alternatives considered**: Embedding sidebar markup directly into `baseof.html` (would affect all pages), or using shortcodes inside Markdown (pushes layout into content and reduces consistency).

## Decision 2: Visual hierarchy enforcement
- **Decision**: Use smaller uppercase section labels with reduced contrast and avoid article heading styles for any sidebar titles.
- **Rationale**: The specification requires the sidebar to stay secondary; smaller uppercase labels and subdued color prevent competition with main headings while remaining readable.
- **Alternatives considered**: Reusing article heading styles (violates hierarchy), or hiding section titles entirely (reduces clarity and scanability).

## Decision 3: Tag presentation
- **Decision**: Render tags as compact, informational chips with smaller typography and padding than article tags, while maintaining readable contrast.
- **Rationale**: Tags should support discovery without feeling like primary actions; compact chips preserve the visual hierarchy and fit within the sidebar footprint.
- **Alternatives considered**: Full-size tag buttons (too dominant), or plain text lists (loses structure and scanability).
