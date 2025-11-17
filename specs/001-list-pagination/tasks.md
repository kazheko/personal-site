---
description: "Actionable task list for Paginated List Navigation"
---

# Tasks: Paginated List Navigation

**Input**: Design artifacts from `specs/001-list-pagination/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/pagination-controls.md, quickstart.md

**Verification**: `npm run dev` + `hugo server -D --disableFastRender`, Lighthouse + axe on `/posts/` and `/posts/page/2/`, manual checks at 375/768/1024px, `hugo list all` to confirm paginator counts, 404 redirect test for `/posts/page/99/`.

**Organization**: Tasks grouped by user story priority to keep increments independently deployable while honoring constitution principles.

## Format: [ID] [P?] [Story] Description

- **[P]**: Task can proceed in parallel once its dependencies are satisfied.
- **[Story]**: Applies only to user-story phases (e.g., [US1]).
- All descriptions include explicit file paths for traceability.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm Hugo pagination settings, site parameters, and content volume before implementing controls.

- [X] T001 Ensure `paginate = 10` and `paginatePath = "page"` plus relevant comments in `config/_default/config.toml`.
- [X] T002 [P] Define `site.Params.pagination` defaults (redirect target, friendly message, delay) in `config/_default/params.toml` for downstream templates.
- [X] T003 [P] Seed at least 15 dated posts using `content/posts/pagination-fixture-*.md` (or similar) so manual pagination QA has enough items.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Introduce reusable partials/hooks required by every user story.

- [X] T004 Reserve a pagination include slot under the post loop and pass a placeholder context object in `layouts/_default/list.html`.
- [X] T005 [P] Scaffold `layouts/partials/pagination-controls.html` with early return logic when `.Paginator.TotalPages <= 1` and containers for controls + summary.
- [X] T006 [P] Scaffold `layouts/partials/pagination-meta.html` and register it from `layouts/partials/head-assets.html` so future stories can emit rel metadata.

**Checkpoint**: Partial files exist and list template can call them without breaking current output.

---

## Phase 3: User Story 1 - Continue Browsing Older Posts (Priority: P1) - MVP

**Goal**: Readers can move forward/back through paginated archives using prev/next and numbered controls backed by Hugo `.Paginator`.

**Independent Test**: Seed ≥15 posts, load `/posts/` via `hugo server -D`, confirm only page-size posts render and "Older" reveals additional pages until the final page disables forward navigation.

**Tests**: Manual verification per Quickstart; no standalone automated tests requested.

### Implementation for User Story 1

- [X] T007 [US1] Call `.Paginate .Pages` before the list loop, replace `.Pages` iteration with `.Paginator.Pages`, and pass `.Paginator` into the pagination partial in `layouts/_default/list.html`.
- [X] T008 [P] [US1] Generate "Newer"/"Older" anchors plus numbered buttons using `.Paginator.HasPrev`, `.HasNext`, and `.PageNumber` inside `layouts/partials/pagination-controls.html`.
- [X] T009 [P] [US1] Render disabled states (spans or inert buttons) when a direction is unavailable so keyboard users avoid dead links in `layouts/partials/pagination-controls.html`.
- [X] T010 [US1] Detect `/page/N/` misses in `layouts/404.html` using `site.Params.pagination` and emit redirect copy/links back to the last valid archive.

**Checkpoint**: Readers can page through all posts without encountering empty pages, and invalid URLs guide them back gracefully.

---

## Phase 4: User Story 2 - Understand Where I Am (Priority: P2)

**Goal**: Provide clear orientation via "Page X of Y" summaries, accessible labels, and SEO rel metadata.

**Independent Test**: Load page 1 and a middle page, confirm textual indicator plus numbered links show the active page without relying solely on color, and head metadata exposes correct rel hints.

**Tests**: Manual orientation checklist; no additional automated tests requested.

### Implementation for User Story 2

- [X] T011 [US2] Output "Page X of Y (Posts A-B of Total)" copy adjacent to controls using `.Paginator.PageNumber`, `.TotalPages`, `.FirstIndex`, and `.LastIndex` within `layouts/partials/pagination-controls.html`.
- [X] T012 [P] [US2] Add `aria-current`, `aria-label`, and `aria-disabled` attributes (e.g., "Go to page N") for each control element inside `layouts/partials/pagination-controls.html`.
- [X] T013 [P] [US2] Implement canonical + `<link rel="prev/next">` emission in `layouts/partials/pagination-meta.html` and ensure `layouts/partials/head-assets.html` only includes the tags when `.IsNode` and `.Paginator` exist.
- [X] T014 [US2] Document the `hugo list all` orientation check plus expected page summary copy inside `specs/001-list-pagination/checklists/orientation.md`.

**Checkpoint**: Orientation cues (visual + metadata) are accurate on any page and meet accessibility requirements.

---

## Phase 5: User Story 3 - Navigate on Any Device (Priority: P3)

**Goal**: Keep pagination controls readable/tappable under the two-column layout across mobile and desktop breakpoints.

**Independent Test**: At 375px width, controls stack vertically with ≥44px tap targets; at 768px+ they align horizontally under the main column without overlapping the sidebar.

**Tests**: Manual responsive walkthrough documented in checklists.

### Implementation for User Story 3

- [X] T015 [P] [US3] Apply responsive Tailwind utilities (e.g., `flex-col gap-3 sm:flex-row`) so pagination controls sit below the posts column on narrow screens in `layouts/partials/pagination-controls.html`.
- [X] T016 [P] [US3] Add a `.pagination-button` component in `assets/css/tailwind.css` to enforce 44px min height, focus-visible rings, and consistent spacing tokens.
- [X] T017 [US3] Capture responsive QA notes + screenshots for 375/768/1024px viewports inside `specs/001-list-pagination/checklists/responsive.md`.

**Checkpoint**: Controls meet responsive + accessibility budgets across breakpoints.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final audits, documentation, and performance tuning across the feature.

- [X] T018 Record Lighthouse (mobile + desktop) and axe outputs for `/posts/` and `/posts/page/2/` in `specs/001-list-pagination/checklists/audits.md`.
- [X] T019 [P] Review `content` globs and purge configuration in `tailwind.config.js`, then re-run `npm run build` to confirm no unused utilities remain from the new components.
- [X] T020 [P] Update `specs/001-list-pagination/research.md` with final deployment notes (GitHub Pages assumption, rel metadata verification) and link to QA evidence.

---

## Dependencies & Execution Order

- **Phase order**: Setup → Foundational → US1 → US2 → US3 → Polish. Each phase depends on completion of the previous one.
- **Story dependencies**: US2 and US3 depend on US1's paginator wiring; US2 must finish before US3 audits stack alignment relying on summary copy; Polish waits until all stories pass.
- **Task dependencies**: T007 requires T004–T006; T013 depends on T006; T015–T016 rely on T008–T012 so responsive classes wrap finalized markup.

## Parallel Execution Examples

- **US1**: T008 and T009 can run in parallel once T007 provides `.Paginator`; T010 can proceed independently after T002 seeds redirect params.
- **US2**: T012 and T013 may advance concurrently after T011 introduces summary markup.
- **US3**: T015 (layout utilities) and T016 (Tailwind component) can be split across contributors; T017 trails them to document verification.

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Finish Setup + Foundational tasks (T001–T006).
2. Deliver US1 tasks (T007–T010) and verify manual pagination plus 404 redirect.
3. Ship or demo MVP once navigation across multiple pages works without regressions.

### Incremental Delivery

1. Complete shared setup/foundation.
2. Merge US1 for functional pagination.
3. Layer US2 orientation enhancements (T011–T014).
4. Finish US3 responsive tuning (T015–T017) before polishing tasks (T018–T020).

### Parallel Team Strategy

1. Assign Setup/Foundation to one contributor while another seeds fixture content.
2. After T007, split UI work: one focuses on accessibility + metadata (T011–T014), another on responsive styling (T015–T016).
3. Rejoin for QA artifacts and polish tasks (T017–T020).

---

## Notes

- Reference constitution principles (Hugo-driven, Tailwind-centric, responsive-first) in PR descriptions to document compliance.
- Keep pagination logic Hugo-native; avoid client-side scripts.
- Document Lighthouse/a11y outputs so reviewers can validate performance and accessibility budgets remain green.
