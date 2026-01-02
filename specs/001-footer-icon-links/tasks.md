---

description: "Task list for Footer Social Icons"
---

# Tasks: Footer Social Icons

**Input**: Design documents from `C:\home\ykazheka\personal-site\static-site\specs\001-footer-icon-links\`
**Prerequisites**: `C:\home\ykazheka\personal-site\static-site\specs\001-footer-icon-links\plan.md` (required), `C:\home\ykazheka\personal-site\static-site\specs\001-footer-icon-links\spec.md` (required), `C:\home\ykazheka\personal-site\static-site\specs\001-footer-icon-links\research.md`, `C:\home\ykazheka\personal-site\static-site\specs\001-footer-icon-links\data-model.md`, `C:\home\ykazheka\personal-site\static-site\specs\001-footer-icon-links\contracts\footer-links.md`, `C:\home\ykazheka\personal-site\static-site\specs\001-footer-icon-links\quickstart.md`

**Verification**: Each story delivers footer layout + styling updates with Hugo builds, responsive checks, Lighthouse, and accessibility validation.

**Organization**: Tasks are grouped by user story so each story can ship independently while honoring the constitution.

## Format: [ID] [P?] [Story] Description

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm footer configuration and existing link styles.

- [x] T001 Review footer social link config in `C:\home\ykazheka\personal-site\static-site\config\_default\params.toml`
- [x] T002 [P] Review footer markup in `C:\home\ykazheka\personal-site\static-site\layouts\partials\site-footer.html`
- [x] T003 [P] Review existing footer link styles in `C:\home\ykazheka\personal-site\static-site\assets\css\tailwind.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Prepare reusable icon snippets for footer use.

- [x] T004 Create icon partials for Email, LinkedIn, Twitter, GitHub in `C:\home\ykazheka\personal-site\static-site\layouts\partials\icons\`
- [x] T005 [P] Document icon naming/usage in `C:\home\ykazheka\personal-site\static-site\layouts\partials\icons\README.md`

**Checkpoint**: Icon assets ready -> user story implementation can start.

---

## Phase 3: User Story 1 - Scan footer links quickly (Priority: P1) - MVP

**Goal**: Replace footer text links with icon-only links while keeping accessible labels.

**Independent Test**: Inspect footer to confirm icon-only links for Email/LinkedIn/Twitter/GitHub with accessible labels announced by a screen reader.

### Implementation for User Story 1

- [x] T006 [P] [US1] Swap footer link text for icon partials in `C:\home\ykazheka\personal-site\static-site\layouts\partials\site-footer.html`
- [x] T007 [US1] Ensure each icon link retains descriptive `aria-label` in `C:\home\ykazheka\personal-site\static-site\layouts\partials\site-footer.html`
- [x] T008 [P] [US1] Validate missing social entries omit the icon in `C:\home\ykazheka\personal-site\static-site\layouts\partials\site-footer.html`

**Checkpoint**: User Story 1 is production-ready and independently testable.

---

## Phase 4: User Story 2 - Maintain consistent styling (Priority: P2)

**Goal**: Keep icon styling aligned with existing design tokens and spacing rules.

**Independent Test**: Verify icon color, hover/focus, and spacing match existing footer link styling across breakpoints.

### Implementation for User Story 2

- [x] T009 [P] [US2] Apply existing footer link utility classes to icon links in `C:\home\ykazheka\personal-site\static-site\layouts\partials\site-footer.html`
- [x] T010 [US2] Update any icon sizing or spacing utilities in `C:\home\ykazheka\personal-site\static-site\assets\css\tailwind.css` if needed for alignment
- [x] T011 [US2] Confirm icon-only layout spacing in `C:\home\ykazheka\personal-site\static-site\layouts\partials\site-footer.html`

**Checkpoint**: User Stories 1 & 2 both pass constitutional gates independently.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Validate responsive, performance, and accessibility requirements.

- [x] T012 [P] Document responsive checks (375/768/1024px) in `C:\home\ykazheka\personal-site\static-site\specs\001-footer-icon-links\quickstart.md`
- [x] T013 [P] Record production build results from `npm run build` and `hugo --environment production --minify` in `C:\home\ykazheka\personal-site\static-site\specs\001-footer-icon-links\quickstart.md`
- [x] T014 [P] Record Lighthouse + accessibility summaries in `C:\home\ykazheka\personal-site\static-site\specs\001-footer-icon-links\quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion - blocks user stories.
- **User Stories (Phases 3-4)**: Depend on Foundational components; can proceed in priority order.
- **Polish (Phase 5)**: Depends on all targeted user stories finishing.

### User Story Dependencies

- **US1**: Depends on icon partials from Phase 2.
- **US2**: Depends on US1 icon usage; otherwise mostly independent.

### Within Each User Story

- Update footer markup first, then adjust styles and spacing.
- Confirm accessibility labels before finishing the story.

### Parallel Opportunities

- T002 and T003 can run in parallel during setup.
- T004 and T005 can run in parallel once setup reviews are done.
- Within US1, T006 and T008 can run in parallel after icons exist.
- Polish tasks T012-T014 can run in parallel after stories complete.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup + Foundational tasks.
2. Deliver US1 tasks T006-T008 end-to-end.
3. Perform responsive and accessibility checks, then share the update.

### Incremental Delivery

1. Complete shared setup and foundation.
2. Ship US1, validate.
3. Ship US2, validate.

### Parallel Team Strategy

1. Collaborate on Setup + Foundational tasks.
2. Assign US1/US2 tasks to different contributors once foundation is stable.
3. Reconcile shared footer styling during a sync review.

---

## Notes

- Reference constitution principles in PR descriptions as evidence of compliance.
- Keep tasks scoped to a single output file per task.
- Capture audit artifacts in quickstart notes when UX or performance changes are made.
