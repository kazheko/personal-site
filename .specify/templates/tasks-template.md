---

description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
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

- [ ] T001 Run `hugo mod tidy` / dependency sync if modules changed
- [ ] T002 [P] Confirm Tailwind build configuration for the feature (update `tailwind.config.js` if needed)
- [ ] T003 [P] Prepare required archetypes or data files under `archetypes/` or `data/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core pieces every user story will reuse.

- [ ] T004 Create/adjust base partials in `layouts/partials/` for shared layout needs
- [ ] T005 [P] Add or update shortcodes under `layouts/shortcodes/`
- [ ] T006 [P] Optimize shared assets in `assets/` and ensure responsive variants exist
- [ ] T007 Document navigation updates in `config/_default/menus.toml`

**Checkpoint**: Foundation ready -> user story implementation can start.

---

## Phase 3: User Story 1 - [Title] (Priority: P1) - MVP

**Goal**: [Describe the slice delivered]

**Independent Test**: `hugo server -D`, responsive preview, Lighthouse/performance + accessibility check for affected pages.

### Tests for User Story 1 (OPTIONAL - only if spec requests separate test artifacts)

- [ ] T010 [P] Capture Lighthouse report evidence in `/specs/[###-feature-name]/artifacts/`
- [ ] T011 [P] Record accessibility notes / axe scan results

### Implementation for User Story 1

- [ ] T012 [P] [US1] Author/adjust content in `content/[path]/index.md`
- [ ] T013 [P] [US1] Update layout or partial in `layouts/[path].html`
- [ ] T014 [US1] Apply Tailwind classes and tokens in `assets/css/tailwind.css`
- [ ] T015 [US1] Verify responsive behavior across breakpoints (document findings)

**Checkpoint**: User Story 1 is production-ready and independently testable.

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Describe the slice delivered]

**Independent Test**: Same validation loop as User Story 1.

### Implementation for User Story 2

- [ ] T020 [P] [US2] Author/adjust content in `content/[path]/index.md`
- [ ] T021 [P] [US2] Update partials/shortcodes as needed
- [ ] T022 [US2] Extend Tailwind styles or tokens responsibly
- [ ] T023 [US2] Validate navigation simplicity and responsive behavior

**Checkpoint**: User Stories 1 & 2 both pass constitutional gates independently.

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Describe the slice delivered]

**Independent Test**: Same validation loop as prior stories.

### Implementation for User Story 3

- [ ] T030 [P] [US3] Content updates in `content/[path]/index.md`
- [ ] T031 [P] [US3] Layout/partial adjustments scoped to this story
- [ ] T032 [US3] Tailwind styling updates with responsive verification
- [ ] T033 [US3] Confirm accessibility/performance still within budgets

**Checkpoint**: All prioritized stories are independently functional.

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Enhancements spanning multiple stories.

- [ ] T0PX [P] Update documentation, including screenshots and audit summaries
- [ ] T0PY Refine Tailwind tokens or reduce unused utilities (purge review)
- [ ] T0PZ [P] Run full Lighthouse + accessibility regression on key pages
- [ ] T0QA Performance/image budget tuning in `assets/`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories.
- **User Stories (Phase 3+)**: Depend on Foundational components; can continue in parallel once ready.
- **Polish**: Depends on all targeted user stories finishing.

### User Story Dependencies

- User stories should avoid coupling. If a story requires another's artifacts (partial, shortcode, etc.), document the dependency explicitly.

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
3. Run Lighthouse and accessibility checks.
4. Ship or demo the slice.

### Incremental Delivery

1. Complete shared setup and foundation.
2. Ship User Story 1, validate, deploy if desired.
3. Ship User Story 2, validate, deploy.
4. Continue with additional stories.

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
