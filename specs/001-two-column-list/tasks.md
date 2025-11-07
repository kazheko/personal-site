# Tasks: Two-Column List Template

**Input**: Design documents from `/specs/001-two-column-list/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Verification**: Each story delivers Hugo layout + Tailwind styling updates validated with `npm run build`, `hugo --environment production --minify`, responsive checks at 360/414/768/1024 px, Lighthouse (mobile & desktop), and axe scans focused on the updated list page.

**Organization**: Tasks are grouped by user story so each slice can ship independently while honoring the constitution.

## Format: [ID] [P?] [Story] Description

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Content**: `content/[section]/[page]/index.md`
- **Layouts**: `layouts/_default/`, `layouts/partials/`, `layouts/shortcodes/`
- **Styling**: Tailwind entrypoint at `assets/css/tailwind.css`, configuration in `tailwind.config.js`
- **Static Assets**: Optimized output in `assets/` routed through Hugo Pipes
- **Data**: `config/_default/params.toml` and `data/` for structured content

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Ensure Hugo/Tailwind pipelines and documentation scaffolding are ready before template changes.

- [X] T001 Run `npm install` to refresh Tailwind/PostCSS dependencies per `package.json`
- [X] T002 [P] Run `npm run build` once (package.json) to verify Hugo + Tailwind compile cleanly before modifications
- [X] T003 [P] Create `specs/001-two-column-list/artifacts/` and capture current list-layout notes in `specs/001-two-column-list/artifacts/baseline.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared data sources and partial scaffolding used by every story.

- [X] T004 Add an `author` params block (name, bio, photo path, alt text) to `config/_default/params.toml`
- [X] T005 [P] Add/optimize the author photo asset at `assets/images/author.jpg` (or equivalent) so Hugo Pipes can fingerprint it
- [X] T006 [P] Scaffold `layouts/partials/list-sidebar.html` with safe wrappers for the author profile + tag sections (no final content yet)

**Checkpoint**: Site-wide data + partial scaffolds are in place for story work.

---

## Phase 3: User Story 1 - Scan Posts at a Glance (Priority: P1) - MVP

**Goal**: Render the primary column of the list template with title, tags, publish date, and 2–3 line excerpts for every post.

**Independent Test**: `hugo server -D`, load the list page at desktop width, confirm each post shows the required metadata plus a truncated excerpt.

### Implementation for User Story 1

- [X] T007 [US1] Update `layouts/_default/list.html` main column to iterate `.RegularPages` (or paginator) and output title links, formatted publish dates, and `.Summary`/`.PlainWords` excerpts
- [X] T008 [P] [US1] Within `layouts/_default/list.html`, emit a comma-separated tag row with a "No tags" fallback and semantic text wrapping
- [X] T009 [P] [US1] Add Tailwind component classes for the grid container and post cards in `assets/css/tailwind.css` (e.g., spacing, typography, tag text styles)
- [X] T010 [US1] Document validation notes (desktop + small post-without-tags scenario) in `specs/001-two-column-list/artifacts/us1-validation.md`

**Checkpoint**: User Story 1 is production-ready and independently testable.

---

## Phase 4: User Story 2 - Understand the Author Context (Priority: P2)

**Goal**: Show the author photo and bio in the sidebar with graceful fallbacks.

**Independent Test**: Load the list page at desktop width and confirm the sidebar displays the author profile; temporarily remove the photo to verify fallback handling.

### Implementation for User Story 2

- [X] T011 [US2] Flesh out `layouts/partials/list-sidebar.html` to render the author figure (via `resources.Get`), alt text, and bio sourced from `site.Params.author`
- [X] T012 [P] [US2] Include the sidebar partial from `layouts/_default/list.html`, ensuring the DOM order keeps posts before sidebar for accessibility
- [X] T013 [P] [US2] Extend `assets/css/tailwind.css` with sidebar-specific styles (figure sizing, typography, spacing) and ensure focus-visible states are preserved
- [X] T014 [US2] Capture validation notes (photo present + missing) in `specs/001-two-column-list/artifacts/us2-validation.md`

**Checkpoint**: User Stories 1 & 2 both pass constitutional gates independently.

---

## Phase 5: User Story 3 - Explore Tags & Responsive Layout (Priority: P3)

**Goal**: List every unique tag once in the sidebar and make the two-column layout stack vertically on small screens.

**Independent Test**: Resize the list page through 360/414/768/1024 px breakpoints, confirming the sidebar stacks below the posts column on small viewports and the tag directory links remain accurate.

### Implementation for User Story 3

- [X] T015 [US3] Implement the unique tag directory within `layouts/partials/list-sidebar.html` using `.Site.Taxonomies.tags`, including optional counts and tag links
- [X] T016 [P] [US3] Add Tailwind utilities in `assets/css/tailwind.css` for tag list badges, multi-column spacing, and stacked layout adjustments
- [X] T017 [US3] Update `layouts/_default/list.html` wrappers to use a responsive grid (e.g., `md:grid-cols-[minmax(0,_3fr)_minmax(0,_1.2fr)]`) that stacks the sidebar beneath the posts column below the `md` breakpoint
- [X] T018 [US3] Record responsive + tag completeness results in `specs/001-two-column-list/artifacts/us3-validation.md`

**Checkpoint**: All prioritized stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and documentation across stories.

- [X] T019 Run `npm run build` and `hugo --environment production --minify --cleanDestinationDir` (package.json) to produce final assets and confirm no build errors
- [X] T020 [P] Capture Lighthouse (mobile + desktop) and axe reports for the updated list page in `specs/001-two-column-list/artifacts/audits.md`
- [X] T021 Update `specs/001-two-column-list/quickstart.md` with final viewport guidance, tag validation steps, and author-profile instructions

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies—run immediately.
- **Foundational (Phase 2)**: Depends on Setup completion; blocks all user stories.
- **User Story Phases (3-5)**: Each depends on foundational data and should proceed in priority order (US1 → US2 → US3) for clean increments.
- **Polish (Phase 6)**: Runs after all user stories finalize.

### User Story Dependencies

- **US1**: Depends only on Setup/Foundational; delivers MVP list card experience.
- **US2**: Depends on US1 structure plus foundational sidebar params.
- **US3**: Builds on US2 sidebar implementation to add tags/responsive behavior.

### Within Each User Story

- Implement template/layout changes before Tailwind styling tweaks.
- Styling updates precede validation/notes capture.
- Validation files (artifacts) finalize each story and unblock the next phase.

### Parallel Opportunities

- Setup tasks T002 and T003 can run alongside T001 once dependencies install.
- Foundational tasks T005 and T006 operate on different paths and can run in parallel.
- Within user stories, styling tasks (e.g., T009, T013, T016) can progress alongside template updates after shared selectors exist.
- Polish tasks T019–T021 can overlap (audits vs documentation) once implementation is code-complete.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Finish Setup + Foundational tasks.
2. Ship User Story 1 (post list column) end-to-end.
3. Validate with `hugo server -D` and record results.

### Incremental Delivery

1. Deploy/preview after US1.
2. Layer in US2 sidebar profile, validate, release.
3. Complete US3 tag directory + responsive stack, validate, release.

### Parallel Team Strategy

1. Pair on Foundational work; one person owns templates while another handles assets/params.
2. Assign User Story 1 to the layout-focused contributor while another prepares sidebar assets for US2.
3. Merge changes frequently and rerun `npm run build` plus responsive checks after each story to guard against regressions.

---

## Notes

- Reference constitution principles (Tailwind-centric, responsive-first, accessibility) in PR descriptions and validation artifacts.
- Keep template logic Hugo-native—avoid JavaScript for layout concerns.
- Ensure author data stored in `config/_default/params.toml` stays localized and free of hard-coded copy in templates.
- Remove any temporary console logs or TODO comments before final build.
