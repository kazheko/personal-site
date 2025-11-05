---

description: "Task list template for feature implementation"
---

# Tasks: Base Layout Template

**Input**: Design documents from `/specs/001-base-layout/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Verification**: Unless the spec says otherwise, each story delivers content, layout, and styling updates with Hugo builds, responsive checks, Lighthouse, and accessibility validation.

**Organization**: Tasks are grouped by user story so each story can ship independently while honoring the constitution.

## Format: [ID] [P?] [Story] Description

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Content**: `content/[section]/[page]/index.md`
- **Layouts**: `layouts/_default/`, `layouts/partials/`, `layouts/shortcodes/`
- **Styling**: Tailwind entrypoint at `assets/css/tailwind.css`, configuration in `tailwind.config.js`
- **Static Assets**: Optimized output in `static/`, source files in `assets/`
- **Data** (optional): `data/` for structured content pulled into templates

<!-- ========================================================================
IMPORTANT: Replace the sample tasks below with real tasks generated from
spec.md user stories, plan.md decisions, and supporting documents. Keep
user stories independent and reference constitution principles where relevant.
======================================================================== -->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Ensure Hugo and Tailwind pipelines are ready for the feature.

- [ ] T001 Initialize Tailwind toolchain by creating `package.json` with Tailwind, PostCSS, Autoprefixer, and npm scripts (`npm run dev`, `npm run build`).
- [ ] T002 [P] Add PostCSS configuration in `postcss.config.js` enabling Tailwind and Autoprefixer processors.
- [ ] T003 [P] Create Tailwind configuration in `tailwind.config.js` with content glob for `layouts/**/*` and design tokens for header/footer colors.
- [ ] T004 [P] Add Tailwind entry stylesheet at `assets/css/tailwind.css` including `@tailwind base`, `components`, and `utilities` directives.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core pieces every user story will reuse.

- [ ] T005 Scaffold the base layout shell in `layouts/_default/baseof.html` with partial includes for head assets, site header, main content block, footer, and foot scripts.
- [ ] T006 [P] Create placeholder head asset include at `layouts/partials/head-assets.html` exposing a `block "page_css"` hook.
- [ ] T007 [P] Create placeholder script include at `layouts/partials/foot-scripts.html` exposing a `block "page_scripts"` hook.
- [ ] T008 Establish shared site parameters in `config/_default/params.toml` with `logo_text` and social link placeholders.
- [ ] T009 Register global navigation items in `config/_default/menus.toml` for Home (`/`) and About (`/about/`).

**Checkpoint**: Foundation ready -> user story implementation can start.

---

## Phase 3: User Story 1 - Consistent Header Shell (Priority: P1) - MVP

**Goal**: Deliver a fixed header that renders brand text and Home/About navigation on every base-layout page.

**Independent Test**: Run `hugo server -D` and confirm the header appears on Home and About, stays fixed on scroll, and does not overlap top content.

### Implementation for User Story 1

- [ ] T010 [US1] Implement fixed header markup and Tailwind classes in `layouts/partials/site-header.html` pulling links from `site.Menus.main` with logo fallbacks.
- [ ] T011 [US1] Update `layouts/_default/baseof.html` main container to include top padding utility that offsets the fixed header height.
- [ ] T012 [US1] Extend `assets/css/tailwind.css` with `@layer base` rules (e.g., `body` padding, skip link) to keep header accessible.
- [ ] T013 [US1] Record header verification results (screenshots/notes) in `specs/001-base-layout/artifacts/header-check.md` after confirming behavior via `hugo server -D`.

**Checkpoint**: User Story 1 is production-ready and independently testable.

---

## Phase 4: User Story 2 - Shared Footer With Contact Links (Priority: P1)

**Goal**: Provide a consistent footer containing copyright text and contact links to Gmail, LinkedIn, Twitter, and GitHub.

**Independent Test**: Scroll to footer on preview build, verify copyright format, and ensure each social link opens the intended destination in a new tab.

### Implementation for User Story 2

- [ ] T014 [US2] Implement `layouts/partials/site-footer.html` with dynamic year, attribution, and social link list sourced from `site.Params.social`.
- [ ] T015 [US2] Populate `config/_default/params.toml` social map with Gmail mailto, LinkedIn profile, Twitter profile, and GitHub profile URLs plus aria labels.
- [ ] T016 [US2] Capture footer verification log in `specs/001-base-layout/artifacts/footer-check.md` after validating each link and new-tab behavior.

**Checkpoint**: User Stories 1 & 2 both pass constitutional gates independently.

---

## Phase 5: User Story 3 - Page-Level Asset Slots (Priority: P2)

**Goal**: Ensure shared CSS/scripts load once while exposing hooks for page-specific assets.

**Independent Test**: Run `npm run build` + `hugo --environment production --minify`, then inspect generated HTML to confirm fingerprinted CSS/script includes and successful page-level overrides.

### Implementation for User Story 3

- [ ] T017 [US3] Enhance `layouts/partials/head-assets.html` to pipe Tailwind CSS via Hugo resources, emit fingerprinted `<link>` tags, and render `block "page_css"` after shared assets.
- [ ] T018 [US3] Enhance `layouts/partials/foot-scripts.html` to include global script bundle (if present) and render `block "page_scripts"` for per-page injections.
- [ ] T019 [US3] Update `assets/css/tailwind.css` with comments or utility classes documenting how page-level styles should extend shared tokens.
- [ ] T020 [US3] Document asset pipeline verification in `specs/001-base-layout/artifacts/assets-check.md` after confirming no duplicate bundle loads in generated HTML.

**Checkpoint**: All prioritized stories are independently functional.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Enhancements spanning multiple stories.

- [ ] T021 Run Lighthouse (performance, accessibility) and axe scans from repository root; archive findings in `specs/001-base-layout/artifacts/audit-report.md`.
- [ ] T022 Review Tailwind config and purge settings in `tailwind.config.js` to ensure unused utilities are removed before deployment.
- [ ] T023 Update project documentation in `AGENTS.md` or root README (if present) summarizing header/footer usage and verification results.
- [ ] T024 Run manual responsive QA across 360px/768px/1024px/1440px viewports via `hugo server -D`; log findings in `specs/001-base-layout/artifacts/responsive-check.md`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories.
- **User Stories (Phase 3+)**: Depend on Foundational components; can continue in parallel once ready.
- **Polish**: Depends on all targeted user stories finishing.

### User Story Dependencies

- User Story 1 (P1) provides header structure required by the base layout.
- User Story 2 (P1) depends on shared params from Phase 2 but is otherwise independent of User Story 1 implementation details.
- User Story 3 (P2) depends on head/foot partial placeholders from Phase 2 and assumes header/footer markup exists.

### Within Each User Story

- Content updates precede layout adjustments.
- Layout adjustments precede Tailwind styling tweaks.
- Responsive + accessibility checks conclude each story before moving on.

### Parallel Opportunities

- Setup and Foundational tasks marked [P] can run concurrently.
- Once the foundation is ready, different contributors can own separate user stories.
- Within a story, content, layout, and styling tasks marked [P] can proceed in parallel when they touch different files.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup + Foundational work.
2. Deliver User Story 1 end-to-end.
3. Run header verification checklist and capture results.
4. Ship or demo the slice.

### Incremental Delivery

1. Complete shared setup and foundation.
2. Ship User Story 1, validate, deploy if desired.
3. Ship User Story 2, validate, deploy.
4. Ship User Story 3, validate, deploy.
5. Execute polish tasks and final audits.

### Parallel Team Strategy

1. Collaborate on Setup + Foundation.
2. Assign user stories to different contributors.
3. Reconcile shared partials or Tailwind tokens in scheduled syncs.

---

## Notes

- Reference constitution principles in PR descriptions as evidence of compliance.
- Keep tasks specific and scoped to one output (content file, layout, asset).
- Ensure Tailwind utility usage remains purposeful; remove dead CSS before completion.
- Capture audit artifacts (screenshots, reports) when stories modify UX or performance.
- Stop after each story to confirm the site remains simple, responsive, and performant.


