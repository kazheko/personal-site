# Research - Production Typography System

## Decision 1: Self-host Inter and JetBrains Mono

**Decision**: Host Inter and JetBrains Mono font files within Hugo assets and reference them via Tailwind font family tokens.

**Rationale**: Self-hosting avoids third-party requests, supports performance budgets, and keeps typography consistent across deployments without external dependencies.

**Alternatives considered**: Google Fonts CDN (simpler setup but introduces third-party requests and privacy concerns).

## Decision 2: Base-layer typography rules with Tailwind tokens

**Decision**: Implement typography rules using Tailwind config tokens plus `@layer base` element styles for `body`, `h1-h4`, `p`, `a`, `code`, and `pre`.

**Rationale**: Base-layer styles keep typography consistent across layouts without requiring per-template utility classes, while still aligning with Tailwind-centric styling rules.

**Alternatives considered**: Tailwind Typography plugin (less control over exact sizing/weights), per-template utility class overrides (higher maintenance risk).

## Decision 3: Shared content wrapper for widths and padding

**Decision**: Enforce mobile padding and max-width constraints through a shared content wrapper in the base layout or existing content partial.

**Rationale**: Applying width rules in a shared wrapper ensures posts, lists, and static pages all follow the same typography rhythm without duplicating markup.

**Alternatives considered**: Apply widths on individual templates (more duplication) or rely on per-page utility classes (inconsistent enforcement).
