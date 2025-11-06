# Tasks: Mobile Header Menu Toggle

**Input**: Design documents from `/specs/001-redesign-mobile-menu/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Verification**: Each story delivers Tailwind + Hugo updates verified with `npm run build`, `hugo --environment production --minify`, responsive checks at 360/414/480/768/1024 px, Lighthouse (mobile & desktop), and axe scans focused on the header region.

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

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Ensure tooling and baseline artifacts are ready before altering the header.

- [X] T001 Sync project dependencies with `npm install` to align Tailwind/PostCSS pipeline (package.json)
- [X] T002 [P] Run `npm run build` to confirm Hugo/Tailwind assets compile prior to changes (package.json)
- [X] T003 [P] Capture current mobile header baseline notes in `specs/001-redesign-mobile-menu/baseline.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared assets every user story will reuse.

- [X] T004 Create `assets/js/mobile-menu.js` module with exported `initMobileMenu` scaffold
- [X] T005 [P] Wire the new script through `layouts/partials/foot-scripts.html` using Hugo Pipes so bundles fingerprint correctly
- [X] T006 [P] Create `specs/001-redesign-mobile-menu/artifacts/` directory structure for validation evidence

**Checkpoint**: Foundation ready -> user story implementation can start.

---

## Phase 3: User Story 1 - Reveal Mobile Navigation (Priority: P1) - MVP

**Goal**: Mobile visitors see only the logo + toggle at < `sm` and can reveal the full-width dropdown beneath the header.

**Independent Test**: On a viewport <= 639px, toggle the menu and verify the dropdown appears below the header, inherits header color, and stays visible until dismissed.

### Implementation for User Story 1

- [X] T007 [US1] Restructure `layouts/partials/site-header.html` to render the toggle button and vertical dropdown container for sub-`sm` viewports
- [X] T008 [P] [US1] Apply Tailwind utilities in `assets/css/tailwind.css` to style the dropdown background, divider line, and spacing
- [X] T009 [US1] Implement open-state handling in `assets/js/mobile-menu.js` to set `aria-expanded` and reveal `[data-mobile-menu]`
- [X] T010 [P] [US1] Document mobile reveal validation results in `specs/001-redesign-mobile-menu/artifacts/us1-validation.md`

**Checkpoint**: User Story 1 is production-ready and independently testable.

---

## Phase 4: User Story 2 - Dismiss Mobile Navigation (Priority: P2)

**Goal**: The dropdown closes when a link is chosen, the toggle is activated again, `Escape` is pressed, or viewport widens past `sm`.

**Independent Test**: With the dropdown expanded, activate links, click the toggle, press `Escape`, and resize past 640px to confirm the menu collapses and focus returns to the toggle.

### Implementation for User Story 2

- [X] T011 [US2] Extend `assets/js/mobile-menu.js` to close the dropdown on link selection, toggle reactivation, and `Escape`
- [X] T012 [P] [US2] Add necessary data attributes to dropdown links in `layouts/partials/site-header.html` for close-on-select behavior
- [X] T013 [US2] Implement breakpoint listener in `assets/js/mobile-menu.js` that resets menu state when `(min-width: 640px)` matches
- [X] T014 [P] [US2] Record dismissal behavior checks in `specs/001-redesign-mobile-menu/artifacts/us2-validation.md`

**Checkpoint**: User Stories 1 & 2 pass constitutional gates independently.

---

## Phase 5: User Story 3 - Preserve Desktop Navigation (Priority: P3)

**Goal**: Desktop/tablet visitors retain the existing inline navigation without toggles or mobile dropdown artifacts.

**Independent Test**: At >= 640px, reload pages to confirm the inline menu renders once, toggle is hidden, and no mobile scripts leave residual state.

### Implementation for User Story 3

- [X] T015 [US3] Audit `layouts/partials/site-header.html` responsive classes to ensure inline menu remains visible and toggle hidden at >= `sm`
- [X] T016 [P] [US3] Validate large-screen regression tests and log notes in `specs/001-redesign-mobile-menu/artifacts/us3-validation.md`

**Checkpoint**: All prioritized stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and documentation across stories.

- [X] T017 [P] Consolidate responsive + accessibility findings into `specs/001-redesign-mobile-menu/artifacts/summary.md`
- [X] T018 Re-run `npm run build` and `hugo --environment production --minify` to confirm final assets (package.json)
- [X] T019 [P] Capture Lighthouse and axe reports post-implementation in `specs/001-redesign-mobile-menu/artifacts/audits.md`
- [X] T020 Update `specs/001-redesign-mobile-menu/quickstart.md` with final viewport notes and verification steps

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies – start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion – blocks user story work.
- **User Story Phases (3-5)**: Each depends on foundational assets; US2 builds on US1 script work, US3 can begin after US1 markup is stable.
- **Polish (Phase 6)**: Runs after all user stories are complete.

### User Story Dependencies

- **US1 (Reveal)**: First slice, no dependencies beyond Phase 2.
- **US2 (Dismiss)**: Depends on US1 toggle markup and script scaffold.
- **US3 (Preserve Desktop)**: Depends on US1 layout structure being finalized; independent of US2 logic beyond shared script.

### Parallel Opportunities

- Setup tasks T002 and T003 can run in parallel after T001.
- Foundational tasks T005 and T006 can proceed once T004 starts since they touch different files.
- Within US1, Tailwind styling (T008) and validation notes (T010) can run alongside markup/script work once selectors are outlined.
- US2 data attribute wiring (T012) can happen in parallel with validation logging (T014) after T011 establishes behavior.
- Polish tasks T017 and T019 can run concurrently after stories finalize while T018 ensures the final build succeeds.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup and Foundational tasks (T001–T006).
2. Deliver US1 tasks (T007–T010) to ship the mobile reveal experience.
3. Run Lighthouse + axe, capture evidence, and demo the working toggle.

### Incremental Delivery

1. Ship US1 as the MVP.
2. Layer in US2 dismissal behavior (T011–T014) to harden UX.
3. Finalize US3 regression safeguards (T015–T016) before polish.

### Parallel Team Strategy

1. One contributor owns script logic (T004, T009, T011, T013) while another focuses on markup/styling (T007, T008, T012, T015).
2. A third contributor can maintain verification artifacts (T010, T014, T016, T017, T019).
3. Sync after each phase to keep Tailwind utilities and partial changes aligned.

## Notes

- Reference constitution principles in PR descriptions to show compliance with Tailwind-centric styling and responsive-first layouts.
- Keep the dropdown markup semantic (`nav`, `ul`, `li`, `a`) and avoid introducing non-Hugo data sources.
- Remove any temporary console logging from `assets/js/mobile-menu.js` before completion.
- Store verification evidence in the `artifacts/` directory so audits remain reproducible.
- If additional navigation items surface, ensure both inline and dropdown variants pull from the same Hugo menu data.










