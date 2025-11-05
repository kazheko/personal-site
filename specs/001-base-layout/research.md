# Research Notes: Base Layout Template

## Header & Navigation Composition
- **Decision**: Use a `site-header.html` partial that renders the logo text and a two-item navigation list derived from Hugo menu configuration with Home/About fallbacks.
- **Rationale**: Keeps header markup reusable across layouts and lets menu labels/links evolve through `config/_default/menus.toml` without editing templates.
- **Alternatives considered**: Hard-coded navigation inside individual templates (would duplicate markup); using JavaScript for dynamic menus (unnecessary overhead for static site).

## Footer Contact Links
- **Decision**: Author a `site-footer.html` partial with structured data for copyright and social links, pulling URLs from `config/_default/params.toml`.
- **Rationale**: Centralizes ownership details and link targets while allowing non-code updates through site params; ensures consistent markup for accessibility labels.
- **Alternatives considered**: Embedding links directly in Markdown pages (breaks consistency); loading links from external JSON (extra processing without benefit).

## Shared CSS & Script Loading
- **Decision**: Compile Tailwind via Hugo Pipes/PostCSS into `resources/_gen/` and include the fingerprinted asset in `head-assets.html`; expose `block "page_css"` and `block "page_scripts"` for page overrides.
- **Rationale**: Hugo Pipes keeps the build pipeline within Hugo, ensures cache busting, and supports page-level injections through Hugo blocks without double-loading bundles.
- **Alternatives considered**: Managing assets with standalone bundlers (adds tooling); linking non-fingerprinted CSS (hurts caching/perf).

## Responsiveness & Accessibility
- **Decision**: Build mobile-first layout using Tailwind flexbox utilities, ensure header height offset is applied to main content, and annotate social links with descriptive `aria-label` and `rel="noopener"` attributes.
- **Rationale**: Satisfies constitutional responsiveness, keeps header readable at small widths, and ensures links meet accessibility best practices.
- **Alternatives considered**: Fixed pixel spacing (risks clipping on small screens); omitting ARIA labels (reduces clarity for assistive tech).
