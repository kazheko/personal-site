---

description: "Task list for light minimal color scheme"
---

# Tasks: Light Minimal Color Scheme

**Input**: Design documents from `C:\home\ykazheka\personal-site\static-site\specs\001-blog-color-scheme\`
**Prerequisites**: `C:\home\ykazheka\personal-site\static-site\specs\001-blog-color-scheme\plan.md`, `C:\home\ykazheka\personal-site\static-site\specs\001-blog-color-scheme\spec.md`, `C:\home\ykazheka\personal-site\static-site\specs\001-blog-color-scheme\research.md`, `C:\home\ykazheka\personal-site\static-site\specs\001-blog-color-scheme\data-model.md`, `C:\home\ykazheka\personal-site\static-site\specs\001-blog-color-scheme\quickstart.md`

**Verification**: Each story delivers styling updates validated with Hugo builds, responsive checks, and contrast accessibility review.

**Organization**: Tasks are grouped by user story so each story can ship independently while honoring the constitution.

## Format: [ID] [P?] [Story] Description

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish the new palette tokens for consistent use across templates.

- [x] T001 Update palette tokens (backgrounds, text, borders, accents) in `C:\home\ykazheka\personal-site\static-site\tailwind.config.js`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Apply base background and default text colors used by every page.

- [x] T002 Update body background/text classes in `C:\home\ykazheka\personal-site\static-site\layouts\_default\baseof.html`
- [x] T003 Update base body and skip-link styles in `C:\home\ykazheka\personal-site\static-site\assets\css\tailwind.css`

**Checkpoint**: Foundation ready -> user story implementation can start.

---

## Phase 3: User Story 1 - Read articles with a calm palette (Priority: P1) - MVP

**Goal**: Ensure article pages, lists, and metadata use the light, readable palette.

**Independent Test**: Render a post and list page to confirm background (#FFFFFF), secondary background (#F8F9FA), primary text (#3A3A3A), headings (#111111), and muted metadata (#6B6B6B) appear as specified.

### Implementation for User Story 1

- [x] T004 [US1] Update typography defaults for body text, headings, blockquotes, and code blocks in `C:\home\ykazheka\personal-site\static-site\tailwind.config.js`
- [x] T005 [US1] Refresh post, list, and sidebar component colors in `C:\home\ykazheka\personal-site\static-site\assets\css\tailwind.css`
- [x] T006 [P] [US1] Adjust metadata text classes in `C:\home\ykazheka\personal-site\static-site\layouts\partials\post-meta-row.html`
- [x] T007 [P] [US1] Update article prose wrapper classes in `C:\home\ykazheka\personal-site\static-site\layouts\_default\single.html`

**Checkpoint**: User Story 1 is production-ready and independently testable.

---

## Phase 4: User Story 2 - Recognize interactive accents (Priority: P2)

**Goal**: Apply green accent colors to links, tags, and pagination for clear interactive affordances.

**Independent Test**: Hover links, tags, and pagination controls to verify #8BC34A defaults, #649130 hover states, and #E6F4EA soft backgrounds.

### Implementation for User Story 2

- [x] T008 [US2] Update global link styles and hover underline behavior in `C:\home\ykazheka\personal-site\static-site\assets\css\tailwind.css`
- [x] T009 [US2] Update tag chip and tag directory styles in `C:\home\ykazheka\personal-site\static-site\assets\css\tailwind.css`
- [x] T010 [P] [US2] Update pagination wrapper border styling in `C:\home\ykazheka\personal-site\static-site\layouts\partials\pagination-controls.html`
- [x] T011 [US2] Update pagination button colors for default, hover, active, and disabled states in `C:\home\ykazheka\personal-site\static-site\assets\css\tailwind.css`

**Checkpoint**: User Stories 1 & 2 both pass constitutional gates independently.

---

## Phase 5: User Story 3 - Navigate with a consistent header and footer (Priority: P3)

**Goal**: Align header and footer colors with the light minimal palette.

**Independent Test**: Confirm header uses #FFFFFF background with #111111 text and #EAEAEA border, and footer uses #F3F4F6 background with #4A4A4A text and #E0E0E0 border.

### Implementation for User Story 3

- [x] T012 [P] [US3] Update header background, text, and hover colors in `C:\home\ykazheka\personal-site\static-site\layouts\partials\site-header.html`
- [x] T013 [P] [US3] Update footer background, text, link, and border colors in `C:\home\ykazheka\personal-site\static-site\layouts\partials\site-footer.html`

**Checkpoint**: All prioritized stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Capture verification results for accessibility and visual consistency.

- [x] T014 [P] Record contrast and visual review notes in `C:\home\ykazheka\personal-site\static-site\specs\001-blog-color-scheme\quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories.
- **User Stories (Phase 3+)**: Depend on Foundational components; can run in parallel after Phase 2.
- **Polish**: Depends on all targeted user stories finishing.

### User Story Dependencies

- **US1** is the MVP slice and should complete before shipping.
- **US2** and **US3** can proceed after Phase 2 but should follow US1 for incremental delivery.

### Within Each User Story

- Update tokens/classes first, then verify pages visually and for contrast.

### Parallel Opportunities

- After T001-T003, tasks marked [P] can be split across contributors.
- US1 layout updates (T006, T007) can run alongside style updates in T005.
- US3 header/footer tasks (T012, T013) can run in parallel.

---

## Parallel Execution Examples

- **US1**: One contributor handles `C:\home\ykazheka\personal-site\static-site\assets\css\tailwind.css` while another updates `C:\home\ykazheka\personal-site\static-site\layouts\partials\post-meta-row.html` and `C:\home\ykazheka\personal-site\static-site\layouts\_default\single.html`.
- **US2**: One contributor updates pagination layout in `C:\home\ykazheka\personal-site\static-site\layouts\partials\pagination-controls.html` while another adjusts link and tag styles in `C:\home\ykazheka\personal-site\static-site\assets\css\tailwind.css`.
- **US3**: Split header (`C:\home\ykazheka\personal-site\static-site\layouts\partials\site-header.html`) and footer (`C:\home\ykazheka\personal-site\static-site\layouts\partials\site-footer.html`) updates across contributors.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2.
2. Deliver US1 tasks (T004-T007).
3. Validate contrast and readability before moving on.

### Incremental Delivery

1. Finish Setup + Foundational tasks.
2. Ship US1, validate, and demo.
3. Ship US2 and US3 in order, verifying after each phase.
4. Capture final review notes in Phase 6.

---

## Notes

- Reference constitution principles in PR descriptions as evidence of compliance.
- Keep tasks scoped to one file and update tokens/utilities intentionally.
- Verify that green remains accent-only and does not replace primary text colors.
