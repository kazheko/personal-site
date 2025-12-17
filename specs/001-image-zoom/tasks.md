# Tasks: Blog Post Image Zoom

**Input**: Design documents from `/specs/001-image-zoom/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Verification**: Each story concludes with Hugo build/preview, responsive checks at 320/768/1280px, and Lighthouse + axe validation on an article containing zoomable images.

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

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Ensure Hugo, Tailwind, and npm workflows are ready for zoom development.

- [X] T001 Install dependencies defined in `package.json` via `npm install` so Tailwind/PostCSS builds succeed (package.json)
- [X] T002 [P] Verify Hugo preview baseline by running `hugo server -D` using `config.toml` and documenting any build warnings (config.toml)
- [X] T003 [P] Confirm Tailwind build/watch scripts in `package.json` output to `assets/css/tailwind.css` and capture notes in `specs/001-image-zoom/quickstart.md` (package.json)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create shared overlay scaffolding consumed by blog posts only.

- [X] T004 Add a hidden zoom overlay root container with `aria-live="polite"` inside `layouts/_default/single.html` right after the post content so it only renders on article pages
- [X] T005 [P] Create `layouts/partials/zoom-overlay.html` containing overlay markup (image slot, close button text, descriptive region labels) and include it from `single.html`
- [X] T006 [P] Scaffold `assets/js/image-zoom.js` with an exported initializer, overlay state object, and body class toggling hooks
- [X] T007 [P] Override the `page_scripts` block inside `layouts/_default/single.html` to include the built `assets/js/image-zoom.js` bundle so only single-page views load the zoom logic

**Checkpoint**: Overlay skeleton renders and script bundle loads with no runtime behavior yet.

---

## Phase 3: User Story 1 - Expand Inline Image (Priority: P1) - MVP

**Goal**: Readers click any zoom-enabled inline image and see it enlarged in the overlay without leaving their scroll position.

**Independent Test**: In `hugo server -D`, open `content/test-page-1/` and confirm each flagged image opens the overlay, blurs the background, and stays centered.

### Implementation for User Story 1

- [X] T008 [US1] Create Hugo image render hook `layouts/_default/_markup/render-image.html` that generates a resized inline rendition (e.g., `.Resize "900x"`), adds `data-zoomable="true"`, sets `data-original-src` to the unmodified asset, and applies accessible labels when front matter `zoom = true`
- [X] T009 [P] [US1] Update sample article `content/test-page-1/index.md` to flag at least two images with `zoom = true` front matter or shortcode parameters for regression coverage
- [X] T010 [P] [US1] Implement overlay activation logic in `assets/js/image-zoom.js` (click delegation, reading `data-original-src` for the full image, cloning alt text into overlay, storing scroll position, adding `zoom-active` body class)
- [X] T011 [US1] Add Tailwind utility layers in `assets/css/tailwind.css` to style the overlay container (`fixed inset-0 flex`), background blur, and max image sizing for desktop breakpoints
- [X] T012 [US1] Document the activation workflow and verification steps in `specs/001-image-zoom/quickstart.md#Local verification` after confirming acceptance scenarios

**Checkpoint**: Overlay opens reliably for zoomable images and meets FR-001 to FR-004.

---

## Phase 4: User Story 2 - Dismiss Zoom Overlay (Priority: P2)

**Goal**: Readers close the overlay via click/tap or scroll, regaining their previous scroll position instantly.

**Independent Test**: With the overlay open, click the enlarged image, click the dimmed backdrop, and scroll; each action must close the overlay and return focus to the original image.

### Implementation for User Story 2

- [X] T013 [US2] Extend `assets/js/image-zoom.js` to handle click/tap events on the overlay backdrop and image, close the overlay, and restore body scroll position + focus (FR-005, FR-006)
- [X] T014 [P] [US2] Add scroll listener logic in `assets/js/image-zoom.js` that dismisses the overlay immediately on wheel/touchmove events while preventing passive scrolling side effects (FR-007)
- [X] T015 [P] [US2] Update overlay markup in `layouts/partials/zoom-overlay.html` to include an accessible close label and ensure focus order cycles within the overlay during activation
- [X] T016 [US2] Capture dismissal test notes (click vs. scroll) and accessibility observations in `specs/001-image-zoom/quickstart.md#Local verification`

**Checkpoint**: Overlay closes via all required gestures with no lingering blur or scroll jumps.

---

## Phase 5: User Story 3 - Mobile-Friendly Focus (Priority: P3)

**Goal**: Mobile readers on ~360px viewports can zoom images without layout glitches, horizontal scrolling, or blocked gestures.

**Independent Test**: Using Chrome DevTools mobile emulation (320px/360px) or a device, ensure overlay occupies up to 90% of the viewport, pinch gestures remain unnecessary, and dismissal gestures still work.

### Implementation for User Story 3

- [X] T017 [US3] Add responsive Tailwind classes in `assets/css/tailwind.css` to constrain overlay image size (`max-h-[90vh]`, `max-w-[90vw]`) and adjust padding/gaps on small breakpoints
- [X] T018 [P] [US3] Ensure `assets/js/image-zoom.js` centers tall/wide images by applying CSS custom properties or inline styles calculated from viewport ratios for mobile
- [X] T019 [P] [US3] Update `content/test-page-1/index.md` (or add a fixture entry) with at least one tall image and one panoramic image to validate responsive scaling
- [X] T020 [US3] Record mobile-specific validation steps and screenshots/notes under `specs/001-image-zoom/quickstart.md#Local verification`

**Checkpoint**: Mobile overlay experience matches desktop gestures and maintains SC-004 viewport coverage.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final QA, documentation, and performance passes before handoff.

- [ ] T021 [P] Run `npm run build` + `hugo --environment production --minify` and attach Lighthouse/axe summaries to `specs/001-image-zoom/quickstart.md`
- [ ] T022 Review `tailwind.config.js` and `assets/css/tailwind.css` for unused utilities introduced by the overlay, removing any dead styles
- [ ] T023 [P] Update `AGENTS.md` and `specs/001-image-zoom/plan.md` with any final implementation notes discovered during coding
- [ ] T024 Confirm GitHub Pages deploy instructions in `specs/001-image-zoom/quickstart.md` align with the overlay changes and include a regression checklist for future posts

---

## Dependencies & Execution Order

### Phase Dependencies

1. **Setup** must finish before Foundational work begins.
2. **Foundational** must finish before any user story tasks (US1-US3) start.
3. **User Story 1 (P1)** must complete before US2 and US3 begin, since they extend its behavior.
4. **User Story 2 (P2)** should complete before US3 to guarantee dismissal logic is stable on mobile.
5. **Polish** depends on all user stories finishing.

### User Story Dependency Graph

- US1 ? US2 ? US3 (linear progression; each builds on overlay behavior from the previous story).

### Parallel Execution Examples

- Setup: T002 and T003 can run alongside T001 once npm install starts.
- Foundational: T005, T006, and T007 are parallel-friendly after T004 creates the root container.
- US1: Content wiring (T008/T009) can run while engineering implements JS + Tailwind (T010/T011); documentation (T012) waits for verification.
- US2: Scroll dismissal (T014) and overlay markup updates (T015) can proceed concurrently after T013 defines the close routine.
- US3: Responsive CSS (T017) and JS centering logic (T018) can run in parallel; content fixture updates (T019) unblock QA (T020).
- Polish: T021 and T023 can be parallel while Tailwind pruning (T022) and documentation updates (T024) proceed separately.

### Independent Test Criteria

- **US1**: Clicking any zoom-enabled image opens the overlay with blurred background and centered content without scroll jumps.
- **US2**: Overlay closes reliably via click/tap or scroll, restoring focus and scroll position instantly.
- **US3**: On 320-360px viewports, overlay images stay within 90% viewport coverage, no horizontal scrolling appears, and dismissal gestures still work.

### MVP Scope

- Ship Setup + Foundational + US1 to deliver the first independently testable overlay experience; subsequent stories enhance dismissal ergonomics and mobile behavior.

## Implementation Strategy

### MVP First

1. Finish Setup and Foundational scaffolding.
2. Deliver US1 end-to-end, validating overlay activation and styling.
3. Demo/ship US1 if stakeholders need early wins.

### Incremental Delivery

1. Complete US2 to stabilize dismissal flows.
2. Complete US3 for mobile polish.
3. Run full Polish phase prior to deploy.

### Parallel Team Strategy

1. Assign Setup/Foundational to one contributor while another drafts render hooks.
2. After US1 activates overlays, split US2 (dismissal logic) and US3 (mobile tuning) between different contributors using the [P] opportunities listed above.
3. Reconvene for Polish to coordinate audits and docs.
