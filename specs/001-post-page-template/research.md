# Research Log – Single Post Page Template

**Date**: 2025-11-21
**Feature**: [spec.md](./spec.md)

## Decision 1: Template Ownership
- **Decision**: Override `layouts/_default/single.html` so every content type that inherits the default layout gains the new title + metadata treatment. Use an `article` wrapper with a `header` block and inject a metadata partial before `.Content`.
- **Rationale**: `_default/single.html` is currently missing, so creating it avoids editing numerous section-specific templates later. Hugo automatically falls back to this file for single pages, guaranteeing consistency and honoring the "single-page template" requirement.
- **Alternatives considered**: 
  - *Section-specific templates* (e.g., `layouts/posts/single.html`) would work but add maintenance overhead and risk divergence if future sections are added.
  - *Inline markup inside markdown content* would violate the constitution (authors shouldn't manage layout) and duplicate metadata logic.

## Decision 2: Metadata Semantics & Accessibility
- **Decision**: Build a `partials/post-meta-row.html` that renders tags as a `<ul class="flex flex-wrap">` of `<li>` items each containing a focusable `<a>`, followed by a `<time>` element describing the publish date. Include an `aria-label` or visually hidden "Tags" label to provide context when screen readers encounter the chip list.
- **Rationale**: A list structure communicates the number of tags, preserves keyboard order, and aligns with WCAG guidance for sets of interactive chips. Keeping the partial separate ensures the markup can be unit-tested and reused if the design expands.
- **Alternatives considered**:
  - *Plain comma-delimited text* keeps markup simple but fails the "clickable tags" requirement.
  - *Button elements* would require JavaScript for navigation, conflicting with the static, anchor-based expectation.

## Decision 3: Date Formatting & Localization
- **Decision**: Format the publish date with Hugo's `time.Format "Jan 2, 2006"` and expose ISO values through the `<time datetime>` attribute. Pull locale from `site.Language.Lang` to respect multilingual builds automatically.
- **Rationale**: This mirrors the list template's human-readable style while keeping machine-readable metadata for SEO and assistive tooling. Using `.Date` plus `i18n` ensures future localization is possible without editing the template again.
- **Alternatives considered**:
  - *Hard-coding month/day order* could confuse non-US readers.
  - *Displaying raw front matter values* risks inconsistent formatting and doesn't add semantic context.

## Decision 4: Deployment / Delivery Channel
- **Decision**: Treat GitHub Pages (or equivalent GitHub Actions workflow) as the deployment target, reviewing `public/` output before publishing.
- **Rationale**: The repository lacks Netlify/Vercel config files, but it already contains `public/` artifacts and uses GitHub-centric tooling, suggesting Pages is the established pipeline. Documenting this ensures QA verifies the correct channel after structural changes.
- **Alternatives considered**:
  - *Netlify/Vercel assumptions* would be speculative and introduce unnecessary provider-specific instructions.
  - *Leaving deployment unspecified* would fail the Technical Context requirement and hinder release coordination.

## Decision 5: Handling Missing Tags
- **Decision**: When no tags exist, the metadata partial will render a textual "Untagged" pill in place of a tag list while keeping the date visible to preserve layout stability.
- **Rationale**: The spec demands the metadata row remain present even without tags. Rendering a placeholder maintains consistent spacing and informs readers that tagging is intentionally absent.
- **Alternatives considered**:
  - *Hiding the tag group entirely* would cause the date to shift positions and violate the "row" requirement.
  - *Inserting "—" or blank space* offers no semantic clarity and degrades accessibility.
