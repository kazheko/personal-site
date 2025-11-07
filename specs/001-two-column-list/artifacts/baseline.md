# Baseline Notes: List Template (Pre-Implementation)

- The list template at layouts/_default/list.html currently renders only a placeholder paragraph with no columns or metadata.
- No sidebar partial exists; author information and tag directories are absent from the layout.
- Tailwind CSS includes only global/base utilities plus unrelated components; there are no classes for two-column grids or post summary cards.
- config/_default/params.toml does not define an author object, so sidebar content cannot be sourced from site parameters yet.
