---

description: "Task list for About Page Editorial Refresh"
---

# Tasks: About Page Editorial Refresh

**Input**: Design documents from `C:\home\ykazheka\personal-site\static-site\specs\001-about-page-refresh\`
**Prerequisites**: `C:\home\ykazheka\personal-site\static-site\specs\001-about-page-refresh\plan.md` (required), `C:\home\ykazheka\personal-site\static-site\specs\001-about-page-refresh\spec.md` (required), `C:\home\ykazheka\personal-site\static-site\specs\001-about-page-refresh\research.md`, `C:\home\ykazheka\personal-site\static-site\specs\001-about-page-refresh\data-model.md`, `C:\home\ykazheka\personal-site\static-site\specs\001-about-page-refresh\contracts\about-page.md`, `C:\home\ykazheka\personal-site\static-site\specs\001-about-page-refresh\quickstart.md`

**Verification**: Each story delivers layout + styling updates with Hugo builds, responsive checks, Lighthouse, and accessibility validation.

**Organization**: Tasks are grouped by user story so each story can ship independently while honoring the constitution.

## Format: [ID] [P?] [Story] Description

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm current About page sources and baseline styling inputs.

- [x] T001 Review About page content structure in `C:\home\ykazheka\personal-site\static-site\content\about\_index.md`
- [x] T002 [P] Review About page layout entry points in `C:\home\ykazheka\personal-site\static-site\layouts\about\single.html`
- [x] T003 [P] Review typography defaults and brand tokens in `C:\home\ykazheka\personal-site\static-site\assets\css\tailwind.css` and `C:\home\ykazheka\personal-site\static-site\tailwind.config.js`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Ensure shared content data exists for narrative and author blocks.

- [x] T004 Align About page narrative + section fields in `C:\home\ykazheka\personal-site\static-site\content\about\_index.md` to match the data model
- [x] T005 [P] Align author profile defaults in `C:\home\ykazheka\personal-site\static-site\config\_default\params.toml` (or the About page front matter) with required name/role/bio fields

**Checkpoint**: Shared content fields ready -> user story implementation can start.

---

## Phase 3: User Story 1 - Read a calm, narrative About page (Priority: P1) - MVP

**Goal**: Deliver editorial spacing, width, and narrative rhythm for the About body copy.

**Independent Test**: `hugo server -D`, verify body text at 16px/1.7 line height, ~1.4em paragraph spacing, 720px centered width on tablet/desktop, and 16px padding on mobile.

### Implementation for User Story 1

- [x] T006 [P] [US1] Apply 720px max width and centered layout wrapper in `C:\home\ykazheka\personal-site\static-site\layouts\about\single.html`
- [x] T007 [P] [US1] Apply body text size, line height, and paragraph spacing utilities in `C:\home\ykazheka\personal-site\static-site\layouts\about\single.html`
- [x] T008 [US1] Apply h2 spacing utilities (`mt-12 mb-5`) using existing heading styles in `C:\home\ykazheka\personal-site\static-site\layouts\about\single.html`
- [x] T009 [P] [US1] Update narrative copy structure for spacing validation in `C:\home\ykazheka\personal-site\static-site\content\about\_index.md`

**Checkpoint**: User Story 1 is production-ready and independently testable.

---

## Phase 4: User Story 2 - Preserve design system consistency (Priority: P2)

**Goal**: Ensure typography, colors, and accents stay within existing design tokens.

**Independent Test**: Verify About page uses Inter-based typography, existing brand text colors, and accent link color without introducing new tokens.

### Implementation for User Story 2

- [x] T010 [P] [US2] Align narrative and heading classes to existing brand text colors in `C:\home\ykazheka\personal-site\static-site\layouts\about\single.html`
- [x] T011 [US2] Confirm accent link styling uses existing brand accent rules in `C:\home\ykazheka\personal-site\static-site\assets\css\tailwind.css`
- [x] T012 [US2] Remove or avoid section background utilities in `C:\home\ykazheka\personal-site\static-site\layouts\about\single.html`

**Checkpoint**: User Stories 1 & 2 both pass constitutional gates independently.

---

## Phase 5: User Story 3 - Understand the author profile quickly (Priority: P3)

**Goal**: Provide a clear, styled author block that fits the editorial tone.

**Independent Test**: Verify author name, role, and bio typography/color values and confirm missing role collapses spacing without gaps.

### Implementation for User Story 3

- [x] T013 [P] [US3] Render author profile structure with optional role handling in `C:\home\ykazheka\personal-site\static-site\layouts\about\single.html`
- [x] T014 [P] [US3] Apply author typography utilities (22px/15px/16px, colors) in `C:\home\ykazheka\personal-site\static-site\layouts\about\single.html`
- [x] T015 [US3] Update author profile data values in `C:\home\ykazheka\personal-site\static-site\content\about\_index.md` or `C:\home\ykazheka\personal-site\static-site\config\_default\params.toml`

**Checkpoint**: All prioritized stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate responsive, performance, and accessibility requirements.

- [x] T016 [P] Document responsive checks (375/768/1024px) in `C:\home\ykazheka\personal-site\static-site\specs\001-about-page-refresh\quickstart.md`
- [x] T017 [P] Record production build results from `npm run build` and `hugo --environment production --minify` in `C:\home\ykazheka\personal-site\static-site\specs\001-about-page-refresh\quickstart.md`
- [x] T018 [P] Record Lighthouse + axe summaries in `C:\home\ykazheka\personal-site\static-site\specs\001-about-page-refresh\quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion - blocks all user stories.
- **User Stories (Phases 3-5)**: Depend on Foundational components; can proceed in order of priority.
- **Polish (Phase 6)**: Depends on all targeted user stories finishing.

### User Story Dependencies

- **US1**: No dependency on other stories.
- **US2**: Can follow US1 once layout changes land, but mostly independent.
- **US3**: Requires shared content fields from Phase 2; otherwise independent from US1/US2.

### Within Each User Story

- Layout updates precede Tailwind class tuning.
- Content adjustments follow layout structure changes.
- Responsive/accessibility checks close out each story.

### Parallel Opportunities

- T002 and T003 can run in parallel during setup.
- T004 and T005 can run in parallel once setup reviews are done.
- Within US1, T006, T007, and T009 can run in parallel (different files).
- Within US3, T013 and T014 can run in parallel.
- Polish tasks T016-T018 can run in parallel after stories complete.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup + Foundational tasks.
2. Deliver US1 tasks T006-T009 end-to-end.
3. Perform responsive and QA checks, then share the editorial update.

### Incremental Delivery

1. Complete shared setup and foundation.
2. Ship US1, validate, deploy if desired.
3. Ship US2, validate.
4. Ship US3, validate.

### Parallel Team Strategy

1. Collaborate on Setup + Foundational tasks.
2. Assign US1/US2/US3 tasks to different contributors once foundation is stable.
3. Reconcile any shared layout or Tailwind changes during a sync review.

---

## Notes

- Reference constitution principles in PR descriptions as evidence of compliance.
- Keep tasks scoped to a single output file per task.
- Capture audit artifacts in quickstart notes when UX or performance changes are made.
