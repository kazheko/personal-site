---

description: "Task list for blog sidebar update"
---

# Tasks: Blog Sidebar Update

**Input**: Design documents from `/specs/001-blog-sidebar-update/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Verification**: Each story delivers sidebar layout and styling updates validated with `hugo server -D`, responsive checks, Lighthouse/performance, and accessibility review as needed.

**Organization**: Tasks are grouped by user story so each story can ship independently while honoring the constitution.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Ensure the blog templates and Tailwind pipeline are ready.

- [x] T001 Confirm blog homepage template and sidebar partial locations in `layouts/_default/list.html` and `layouts/partials/`.
- [x] T002 [P] Review tag taxonomy availability in `content/` and configuration in `config/_default/` to ensure sidebar can list all tags.
- [x] T003 [P] Audit existing sidebar/tag styles in `assets/css/tailwind.css` to identify current typography and spacing utilities.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared structures every story uses.

- [x] T004 Define or update sidebar wrapper classes in `layouts/_default/list.html` (or relevant list template) to enforce compact spacing and 24px section separation.
- [x] T005 [P] Create or update a dedicated sidebar partial in `layouts/partials/` to host the author bio and tag list blocks.
- [x] T006 [P] Add or adjust sidebar-specific utility classes in `assets/css/tailwind.css` if existing utilities cannot express the required typography.

**Checkpoint**: Base sidebar structure ready for story-specific content.

---

## Phase 3: User Story 1 - Read secondary sidebar content (Priority: P1) - MVP

**Goal**: Sidebar feels visually quieter than the main article with defined typography hierarchy.

**Independent Test**: Run `hugo server -D` and verify sidebar typography hierarchy against main article content at 375px/768px/1280px.

### Implementation for User Story 1

- [x] T007 [P] [US1] Apply sidebar base text styles (14px, 1.6 line height, 400 weight, #3A3A3A) in `layouts/_default/list.html` or the sidebar partial.
- [x] T008 [P] [US1] Apply section title styling (13px, 600 weight, uppercase, 0.04em letter spacing, #6B6B6B) in `layouts/partials/` sidebar markup.
- [x] T009 [US1] Ensure sidebar titles avoid H1-H4 semantics by using appropriate elements in `layouts/partials/`.
- [x] T010 [US1] Validate 24px spacing between sidebar sections and compact internal spacing in `layouts/_default/list.html`.

**Checkpoint**: User Story 1 delivers secondary visual hierarchy without altering main content.

---

## Phase 4: User Story 2 - Read a short author bio (Priority: P2)

**Goal**: Author bio block renders with specified typography and optional secondary metadata.

**Independent Test**: Confirm author name, description, and secondary info render with specified styles on the blog homepage.

### Implementation for User Story 2

- [x] T011 [P] [US2] Wire author data (name, bio, secondary info) into the sidebar partial in `layouts/partials/`.
- [x] T012 [P] [US2] Apply author name styling (15px, 600 weight, #111111) in `layouts/partials/`.
- [x] T013 [P] [US2] Apply author description styling (14px, 1.6 line height, #3A3A3A) in `layouts/partials/`.
- [x] T014 [US2] Apply author secondary info styling (13px, #6B6B6B) and confirm layout stays compact in `layouts/partials/`.

**Checkpoint**: Author bio meets typography spec and stays secondary.

---

## Phase 5: User Story 3 - Scan all tags (Priority: P3)

**Goal**: Tag list shows all tags as compact informational chips, visually smaller than article tags.

**Independent Test**: Compare sidebar tag list with the site tag taxonomy and confirm all tags render with specified styles.

### Implementation for User Story 3

- [x] T015 [P] [US3] Render all tags from the taxonomy in `layouts/partials/` without truncation.
- [x] T016 [P] [US3] Apply sidebar tag typography (13px, 500 weight) and padding (3px 8px) in `layouts/partials/`.
- [x] T017 [US3] Verify sidebar tags appear smaller than article tag styling and remain informational in `layouts/_default/list.html`.

**Checkpoint**: Tag list is complete, readable, and visually secondary.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate final QA and documentation updates.

- [ ] T018 [P] Run responsive and hierarchy checks documented in `specs/001-blog-sidebar-update/quickstart.md` and capture notes in `specs/001-blog-sidebar-update/tasks.md`.
- [ ] T019 [P] Run Lighthouse and accessibility checks for `/blog/` and log results in `specs/001-blog-sidebar-update/tasks.md`.
- [ ] T020 Confirm Hugo production build succeeds with `hugo --environment production --minify` and document outcome in `specs/001-blog-sidebar-update/tasks.md`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion - blocks all user stories.
- **User Stories (Phase 3+)**: Depend on Foundational components; can proceed in order of priority.
- **Polish (Phase 6)**: Depends on all targeted user stories finishing.

### User Story Dependencies

- User Story 2 depends on User Story 1 typography hierarchy being established.
- User Story 3 depends on the shared sidebar structure from Phase 2.

### Within Each User Story

- Layout and data wiring precede styling validation.
- Responsive and accessibility checks conclude each story before moving on.

### Parallel Opportunities

- T001-T003 can proceed in parallel.
- T004-T006 can proceed in parallel once Phase 1 is done.
- Within each story, tasks marked [P] can run concurrently across different files.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup + Foundational tasks.
2. Deliver User Story 1 end-to-end.
3. Validate responsive hierarchy and contrast.
4. Ship or demo the slice.

### Incremental Delivery

1. Complete shared setup and foundation.
2. Ship User Story 1, validate, deploy if desired.
3. Ship User Story 2, validate, deploy.
4. Ship User Story 3, validate, deploy.

### Parallel Team Strategy

1. Collaborate on Setup + Foundation.
2. Assign user stories to different contributors.
3. Reconcile shared sidebar partial changes in sync.

---

## Notes

- Reference constitution principles in PR descriptions as evidence of compliance.
- Keep tasks scoped to a single file or component for clarity.
- Avoid introducing new sidebar content beyond author bio and tags.
- Verify typography uses the specified sizes, weights, and colors across breakpoints.
