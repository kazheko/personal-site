---

description: "Task list for production typography system implementation"
---

# Tasks: Production Typography System

**Input**: Design documents from `/specs/001-typography-system/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Verification**: Each story delivers typography updates with Hugo builds, responsive checks, Lighthouse, and accessibility validation.

**Organization**: Tasks are grouped by user story so each story can ship independently while honoring the constitution.

## Format: [ID] [P?] [Story] Description

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Ensure font assets are available before styling work.

- [x] T001 Add Inter and JetBrains Mono font files under `assets/fonts/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish typography tokens used by all stories.

- [x] T002 Update font families and weight tokens in `tailwind.config.js`
- [x] T003 [P] Add `@font-face` declarations in `assets/css/tailwind.css`

**Checkpoint**: Typography tokens are defined and ready for story-specific styling.

---

## Phase 3: User Story 1 - Read long-form articles comfortably (Priority: P1) - MVP

**Goal**: Deliver calm, readable body typography with proper rhythm and container widths.

**Independent Test**: Use `hugo server -D` to view a long-form post at 375px/768px/1024px; confirm body size, line height, paragraph spacing, and content width match the spec.

### Implementation for User Story 1

- [x] T004 [US1] Set base body, paragraph, and link typography rules in `assets/css/tailwind.css`
- [x] T005 [US1] Update content wrapper widths/padding in `layouts/_default/baseof.html`
- [x] T006 [US1] Align long-form content wrapper classes in `layouts/_default/single.html`

**Checkpoint**: User Story 1 is production-ready and independently testable.

---

## Phase 4: User Story 2 - Scan structure and hierarchy quickly (Priority: P2)

**Goal**: Ensure heading hierarchy and metadata sizing align with the defined scale.

**Independent Test**: View posts and list pages at 375px/768px/1024px; confirm h1-h4 sizing, weights, and metadata text sizes match the spec.

### Implementation for User Story 2

- [x] T007 [US2] Update heading scale classes in `assets/css/tailwind.css`
- [x] T008 [US2] Adjust metadata text sizing in `assets/css/tailwind.css`
- [x] T009 [US2] Ensure list page heading hierarchy matches scale in `layouts/_default/list.html`

**Checkpoint**: User Stories 1 & 2 both pass hierarchy and rhythm checks.

---

## Phase 5: User Story 3 - Interact with UI text and code snippets (Priority: P3)

**Goal**: Align navigation/UI text sizing and code block readability with the typography system.

**Independent Test**: Check menu, pagination, tags, and code blocks on mobile and desktop; confirm UI size/weight, 44px tap targets, and code sizing/scroll behavior.

### Implementation for User Story 3

- [x] T010 [P] [US3] Update navigation typography and tap sizing in `layouts/partials/site-header.html`
- [x] T011 [P] [US3] Align pagination and tag UI styles in `layouts/partials/pagination-controls.html` and `layouts/partials/post-meta-row.html`
- [x] T012 [US3] Apply code block typography rules in `assets/css/tailwind.css`

**Checkpoint**: All prioritized stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Record verification outcomes and ensure cross-page consistency.

- [x] T013 [P] Document breakpoint reviews in `specs/001-typography-system/qa-notes.md`
- [x] T014 [P] Record Lighthouse + axe summaries in `specs/001-typography-system/qa-notes.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion - blocks all user stories.
- **User Stories (Phase 3+)**: Depend on Foundational tokens; can proceed in order once tokens are ready.
- **Polish**: Depends on all targeted user stories finishing.

### User Story Dependencies

- **US1** precedes **US2** and **US3** because body typography and container widths are foundational for hierarchy and UI tuning.
- **US2** and **US3** can run in parallel after US1 if they touch different files.

### Parallel Execution Examples

- After T002-T003, one contributor can handle T007 while another completes T010.
- T013 and T014 can be completed in parallel after story work is finished.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup + Foundational work.
2. Deliver User Story 1 end-to-end.
3. Validate readability and responsive widths.
4. Ship or demo the slice.

### Incremental Delivery

1. Complete shared setup and foundation.
2. Ship User Story 1 and validate.
3. Ship User Story 2 and validate.
4. Ship User Story 3 and validate.
