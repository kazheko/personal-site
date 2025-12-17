# Tasks: About Page Template

**Input**: Design documents from `/specs/001-about-page/`
**Prerequisites**: plan.md (required), spec.md (user stories), research.md, data-model.md, contracts/

**Verification**: Each story delivers Hugo content, layout, and Tailwind styling, then runs responsive previews (`npm run dev` / `hugo server -D`), Lighthouse (mobile + desktop), and axe scans per quickstart guidance.

**Organization**: Tasks are grouped by user story so each slice can ship independently while honoring the constitution.

## Format: [ID] [P?] [Story] Description

- **[P]**: Task may run in parallel (touches different files and has no unresolved dependencies)
- **[Story]**: Applies only in user story phases (US1, US2, US3)
- Include exact file paths in every description

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Ensure the Hugo/Tailwind toolchain and content scaffolding exist for the new page.

- [X] T001 Run `npm install` in repo root to refresh dependencies referenced by `package.json`.
- [X] T002 [P] Create `content/about/_index.md` with the front matter skeleton from `data-model.md` (about_blog, about_me, portrait, contact fields).
- [X] T003 [P] Add `assets/images/about/` directory plus placeholder `assets/images/about/portrait-source.jpg` so Hugo Pipes has a source asset during development.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared layout/partial work every story will reuse.

- [X] T004 Implement `layouts/about/single.html` scaffold (extends `layouts/_default/baseof.html`, sets flex container, placeholders for left/right columns).
- [X] T005 [P] Build `layouts/partials/about/portrait.html` that loads `.Params.portrait.src` via `resources.Get`, applies `.Fit "1200x1600"`, and outputs semantic `<img>` markup with `alt`.
- [X] T006 [P] Define reusable CTA + heading utility classes in `assets/css/tailwind.css` (e.g., `.btn-primary`, `prose-about`) to keep styling centralized for all stories.

**Checkpoint**: About section wiring is ready for content-specific slices.

---

## Phase 3: User Story 1 - Learn the blog mission (Priority: P1) - MVP

**Goal**: Make the About page immediately communicate the blog’s mission with accessible headings and copy.

**Independent Test**: `hugo server -D` on `/about/`, confirm mission section appears above the fold with proper heading levels, run axe to verify landmarks, and capture notes in quickstart.

### Implementation for User Story 1

- [X] T007 [US1] Populate `.Params.about_blog` heading/body copy in `content/about/_index.md` to describe the blog’s focus.
- [X] T008 [P] [US1] Render the mission block inside `layouts/about/single.html` with semantic `<section id="about">`, `<h2>`, and prose container sourced from `.Params.about_blog`.
- [X] T009 [P] [US1] Apply mission-specific typography spacing in `assets/css/tailwind.css` (e.g., `prose-about` modifiers) to keep text scannable on mobile.
- [X] T010 [US1] Document mission QA results (above-the-fold visibility + screen-reader headings) in `specs/001-about-page/quickstart.md#Verification`.

**Checkpoint**: Mission story can ship independently as MVP.

---

## Phase 4: User Story 2 - Get to know the author (Priority: P2)

**Goal**: Add the author bio and responsive portrait so readers can connect with the person behind the blog.

**Independent Test**: Preview `/about/` at 375px/768px/1280px confirming bio + portrait layout per quickstart, ensure portrait alt text works when image fails, and log results.

### Implementation for User Story 2

- [X] T011 [US2] Extend `content/about/_index.md` with `.Params.about_me` body copy plus portrait metadata (`params.portrait.src`, `params.portrait.alt`).
- [X] T012 [P] [US2] Add the author section markup to `layouts/about/single.html` (`<section id="author">`) with headings, copy, and container structure matching mission block spacing.
- [X] T013 [P] [US2] Wire `layouts/partials/about/portrait.html` into the layout, ensuring Hugo Pipes outputs responsive dimensions and lazy-loading attributes for `assets/images/about/portrait-source.jpg`.
- [X] T014 [P] [US2] Tune responsive classes in `assets/css/tailwind.css` (`flex-col lg:flex-row`, `aspect-[3/4]`, `object-cover`) so portrait stacks under text on small screens.
- [X] T015 [US2] Capture breakpoint + accessibility observations for the author section in `specs/001-about-page/quickstart.md#Verification`.

**Checkpoint**: Author story is production-ready alongside US1.

---

## Phase 5: User Story 3 - Contact the author (Priority: P3)

**Goal**: Provide a clear contact CTA that opens the visitor’s mail client with the configured address.

**Independent Test**: Click the Contact button on `/about/` in desktop + mobile browsers, verify `mailto:` launches with the configured email, ensure keyboard focus and contrast meet guidelines.

### Implementation for User Story 3

- [X] T016 [US3] Add `.Params.contact.email` (and optional label) to `content/about/_index.md`, verifying configuration matches the desired inbox.
- [X] T017 [P] [US3] Insert the CTA markup into `layouts/about/single.html` below the text stack (semantic `<a>` styled as button, `aria-label`, `id="contact-cta"`).
- [X] T018 [P] [US3] Style the CTA in `assets/css/tailwind.css` using existing palette (`bg-primary`, `focus-visible:outline-primary`) and ensure hover/focus states meet accessibility requirements.
- [X] T019 [US3] Test and record CTA behavior + keyboard flow in `specs/001-about-page/quickstart.md#Verification`, including fallback messaging if the email client is missing.

**Checkpoint**: All user stories satisfy their acceptance scenarios independently.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification, docs, and performance hardening after all stories.

- [X] T020 Run `npm run build && hugo --environment production --minify` from repo root and store success notes + any warnings in `specs/001-about-page/quickstart.md#Deployment`.
- [X] T021 [P] Capture Lighthouse (mobile + desktop) and axe summaries for `/about/`, attaching links or notes to `specs/001-about-page/quickstart.md#Verification`.
- [X] T022 Update `specs/001-about-page/plan.md` and `specs/001-about-page/spec.md` with any implementation learnings, asset paths, or responsive nuances discovered during build verification.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)** → required before any layout/content work.
- **Foundational (Phase 2)** → depends on Setup; blocks all user stories until `layouts/about/` scaffolding exists.
- **User Stories (Phases 3-5)** → each depends on Foundational; US2 also references portrait partial introduced earlier; US3 relies on CTA styling utilities defined in Phase 2.
- **Polish (Phase 6)** → runs after US1–US3 complete.

### User Story Dependency Graph

1. **US1 (Mission)**: Base MVP; no upstream dependencies beyond foundation.
2. **US2 (Author)**: Requires mission container to exist so author section can share layout spacing; builds on US1.
3. **US3 (Contact)**: Depends on mission + author so CTA appears after text stack; final layer in page narrative.

### Parallel Execution Examples

- **US1**: T008 (layout markup) and T009 (styling) can run in parallel once T007 seeds content.
- **US2**: T012 (markup), T013 (portrait partial integration), and T014 (Tailwind responsiveness) can proceed concurrently after T011 defines content + asset references.
- **US3**: T017 (CTA markup) and T018 (CTA styling) can run side-by-side following T016’s content update.

---

## Implementation Strategy

### MVP First

1. Complete Phases 1–2 to establish scaffolding.
2. Deliver US1 (mission section) and validate via quickstart checks.
3. Optionally ship/demonstrate the About page with mission-only content if stakeholders need early feedback.

### Incremental Delivery

1. After MVP, implement US2 to add the author bio/portrait and revalidate breakpoints.
2. Layer on US3 for the contact CTA, ensuring performance + accessibility budgets remain green.
3. Finish with the Polish phase to document metrics and lessons learned.

### Parallel Team Strategy

1. Split Setup/Foundational tasks among contributors (content vs. layout vs. styling).
2. Assign US1/US2/US3 to different owners once foundation is ready, using the parallel examples above.
3. Schedule a final sync to run polish tasks and confirm constitution compliance before merging.

---

## Notes

- Reference constitution principles (Hugo-only, Tailwind-only, simple UX, responsive-first, performance/accessibility) in PR descriptions for each story.
- Keep portrait asset sizes under 400 KB and include descriptive alt text per data model guidance.
- Document any deviations or new learnings directly in `specs/001-about-page/quickstart.md` so future maintainers can reuse the workflow.
