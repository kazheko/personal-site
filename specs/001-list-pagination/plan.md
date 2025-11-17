# Implementation Plan: Paginated List Navigation

**Branch**: `001-list-pagination` | **Date**: 2025-11-07 | **Spec**: specs/001-list-pagination/spec.md
**Input**: Feature specification from `specs/001-list-pagination/spec.md`

## Summary

Add archive pagination to the two-column list template so readers can browse older posts, always know their position in the archive, and access responsive, accessible controls on every device. Hugo's built-in `.Paginator` API will drive page slicing, dedicated pagination partials will output numbered/prev/next controls plus SEO metadata, and a lightweight 404/redirect pattern will keep users on valid pages.

## Technical Context

**Site Generator**: Hugo Extended 0.126.x (current toolchain; no upgrade required)  
**Styling Stack**: Tailwind CSS 3.x via `tailwind.config.js` and PostCSS build; new utilities limited to spacing/typography tokens if needed  
**Content Source**: Markdown with front matter under `content/posts/`; pagination size defaults to `paginate = 10` in `config.toml` but can be overridden per section  
**Reusable Components**: Primary logic belongs in `layouts/_default/list.html` plus two new partials: `layouts/partials/pagination-controls.html` (markup) and `layouts/partials/pagination-meta.html` (head links)  
**Assets Pipeline**: Hugo Pipes compiles `assets/css/tailwind.css` during `npm run dev` / `npm run build`; no new asset types are introduced  
**Testing & Verification**: `hugo server -D` for draft-inclusive previews, `hugo --environment production --minify` for release build, Lighthouse + axe runs on the first three pagination pages, manual checks at 375/768/1024px, and `hugo list all` to confirm total post counts match paginator metadata  
**Deployment Target**: GitHub Pages (assumed current static host until maintainers confirm); canonical URLs and redirects default to this target per Research Decision 5  
**Constraints**: Must uphold constitution principles by relying only on Hugo/Tailwind primitives, avoiding new JavaScript, keeping layouts responsive, and preserving performance/accessibility budgets.

## Constitution Check

- **Hugo-Driven Architecture**: PASS; pagination relies on Hugo `.Paginator`, list templates, and partials only.
- **Tailwind-Centric Styling**: PASS; controls styled with Tailwind utilities; any new tokens documented in `tailwind.config.js`.
- **Simple UX Paths**: PASS; controls expose Older/Newer + numbered links without extra interaction layers; copy stays concise.
- **Responsive-First Layouts**: PASS; design explicitly covers stacking behavior at <=640px and inline layout on >=768px.
- **Static Performance & Accessibility**: PASS; no scripts added; plan includes Lighthouse/a11y checks and `aria-current` / disabled states on controls.

## Project Structure

### Documentation (this feature)

```text
specs/001-list-pagination/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
`-- tasks.md          # produced later by /speckit.tasks
```

### Site Structure (repository root)

```text
layouts/_default/
|-- list.html                    # Updated to request pagination partials

layouts/partials/
|-- pagination-controls.html     # New partial for numbered/prev/next markup
|-- pagination-meta.html         # New partial for <link rel="prev/next"> + summary meta

layouts/404.html                 # Gains friendly guidance/redirect for out-of-range pages

assets/css/tailwind.css          # Tailwind entry; may add utility classes for control spacing
```

**Structure Decision**: Introduce dedicated pagination partials so list templates stay focused on content loops and multiple sections can reuse identical controls/metadata. Update `layouts/404.html` (already part of Hugo structure) instead of adding new directories; no additional folders are required beyond these partials.

## Complexity Tracking

No constitutional violations identified; the feature operates entirely within Hugo layouts/partials and Tailwind utilities with zero client-side scripting.



