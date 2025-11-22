---

description: "Task list template for feature implementation"
---

# Tasks: Single Post Page Template

**Input**: Design documents from `/specs/001-post-page-template/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Verification**: Each story delivers Hugo layout updates with Tailwind styling plus Lighthouse + axe validation on representative posts.

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

**Purpose**: Ensure Node/Hugo tooling is ready for the new single-post template workflows documented in quickstart.md.

- [ ] T001 Run `npm install` at repository root (`package.json`) to refresh Tailwind/PostCSS dependencies before editing layouts.
- [ ] T002 [P] Confirm the `npm run dev` script in `package.json` still runs the Tailwind watcher and `hugo server -D`; update the script if the concurrent watch chain drifted.
- [ ] T003 [P] Run `hugo --environment production --minify` using `config/_default/config.toml` to capture baseline `public/` output before modifying `_default/single.html`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared fixtures and localization strings every story reuses.

- [ ] T004 Create a QA fixture markdown file at `content/posts/post-template-fixture/index.md` with varied front matter (0 tags, >5 tags, long title) for template validation.
- [ ] T005 [P] Update `specs/001-post-page-template/quickstart.md` with instructions referencing the new fixture and required 375px/768px/1280px breakpoint checks.
- [ ] T006 [P] Add metadata translation keys (`TagsLabel`, `UntaggedLabel`, `PublishLabel`) to `i18n/en.toml` so partials can localize accessibility copy.

**Checkpoint**: Foundation ready -> user story implementation can start.

---

## Phase 3: User Story 1 - Quickly understand the post context (Priority: P1) - MVP

**Goal**: Present the title and metadata row immediately on every post page using semantic markup.

**Independent Test**: Load any published post URL and verify the title and metadata row are visible without scrolling and communicate post context.

### Implementation for User Story 1

- [ ] T007 [US1] Scaffold `layouts/_default/single.html` from `layouts/_default/baseof.html` using an `<article>` wrapper and render `.Title` inside an `<h1>` before any other content.
- [ ] T008 [P] [US1] Build `layouts/partials/post-meta-row.html` with a `header` section, visually hidden tags label, `<ul>` chip list placeholder, and `<time>` element fed by `.Date`/i18n strings.
- [ ] T009 [US1] Include `{{ partial "post-meta-row.html" . }}` immediately after the `<h1>` in `layouts/_default/single.html`, ensuring skip links/headings still match `baseof.html` expectations.
- [ ] T010 [US1] Apply Tailwind spacing/typography utilities directly in `layouts/_default/single.html` and `layouts/partials/post-meta-row.html` so the title + metadata row stay above the fold on mobile.
- [ ] T011 [US1] Preview the fixture and an existing tagged post via `npm run dev`, documenting pass/fail notes for the independent test in `specs/001-post-page-template/artifacts/us1-context.md`.

**Parallel Execution Example**: After T007 defines the template block, T008 can progress independently because it only touches `layouts/partials/post-meta-row.html`.

**Checkpoint**: User Story 1 is production-ready and independently testable.

---

## Phase 4: User Story 2 - Jump to related topics (Priority: P2)

**Goal**: Ensure each metadata tag chip routes to its tag archive with accessible focus states.

**Independent Test**: Activate any tag chip on the metadata row and confirm it navigates to the associated tag listing without breaking page structure.

### Implementation for User Story 2

- [ ] T012 [US2] Implement tag iteration in `layouts/partials/post-meta-row.html` using Hugo taxonomy lookups so each chip links to `/tags/{slug}/` or `.RelPermalink` per `contracts/post-page-template.openapi.yaml`.
- [ ] T013 [US2] Add accessible labeling (aria-label, sr-only text, focus order) for the tag list inside `layouts/partials/post-meta-row.html` leveraging the `i18n/en.toml` strings.
- [ ] T014 [P] [US2] Extend chip focus and hover styles in `assets/css/tailwind.css` or `tailwind.config.js` to provide visible focus rings without new color debt.
- [ ] T015 [US2] Validate keyboard and mouse activation on tag chips using the fixture + live content, logging navigation proof in `specs/001-post-page-template/artifacts/us2-tag-nav.md`.

**Parallel Execution Example**: T014 styling work in `assets/css/tailwind.css` can run in parallel with T012 logic because it does not depend on data binding.

**Checkpoint**: User Stories 1 & 2 both pass constitutional gates independently.

---

## Phase 5: User Story 3 - Read the full post comfortably (Priority: P3)

**Goal**: Preserve authored content order and readability across breakpoints using Tailwind typography tokens.

**Independent Test**: Scroll through the post body on mobile and desktop breakpoints and confirm typography, spacing, and media flow remain legible.

### Implementation for User Story 3

- [ ] T016 [US3] Wrap `.Content` within a `prose` container and responsive padding block inside `layouts/_default/single.html` to keep headings, lists, and embeds sequential.
- [ ] T017 [P] [US3] Adjust typography scale or spacing via `assets/css/tailwind.css` (`@layer components` overrides) so long-form copy remains readable at 375px/768px/1280px.
- [ ] T018 [P] [US3] Update `tailwind.config.js` if additional typography plugin options or spacing tokens are required for the prose block.
- [ ] T019 [US3] Run breakpoint sweeps on the fixture and a media-heavy post via `npm run dev`, capturing screenshots + notes in `specs/001-post-page-template/artifacts/us3-readability.md`.

**Parallel Execution Example**: T017 utility tweaks in `assets/css/tailwind.css` and T018 configuration adjustments can proceed simultaneously because they touch distinct files.

**Checkpoint**: All prioritized stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final audits spanning multiple stories.

- [ ] T020 [P] Record Lighthouse + axe reports for the updated template and store them in `specs/001-post-page-template/artifacts/audits.md`.
- [ ] T021 Run `npm run build` followed by `hugo --environment production --minify`, reviewing generated `public/posts/*/index.html` for regressions before opening the PR.
- [ ] T022 Update any affected release notes or README sections referencing single post behavior in `README.md` to document the new metadata row.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories because fixtures/i18n strings are shared.
- **User Stories (Phase 3-5)**: Depend on Foundational assets; once ready, US2 only depends on US1 (metadata shell) and US3 depends on US1 for layout scaffolding but not on US2.
- **Polish (Phase 6)**: Depends on all user stories finishing.

### User Story Dependencies

1. **US1 -> US2 -> US3**: User Story 2 needs the metadata structure from US1 before wiring navigation, and User Story 3 needs the `_default/single.html` shell from US1 but can proceed without US2 once the header region is stable.
2. No additional coupling exists; each user story remains testable once its prerequisites finish.

### Parallel Opportunities

- Setup tasks T002-T003 can run concurrently while T001 installs dependencies.
- Foundation tasks T005-T006 are parallel-friendly because they target documentation vs. localization files.
- Within US1, T008 (partial) and T010 (styling) can overlap after T007 defines the block.
- Within US2, T014 styling can progress while T012 logic finalizes, enabling independent QA.
- Within US3, typography config (T018) and utility overrides (T017) can split across contributors.
- Polish tasks allow T020 audits and T022 documentation updates to run while T021 final build/regression wrap up.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup + Foundational work.
2. Deliver User Story 1 end-to-end using the new single template and metadata partial.
3. Run Lighthouse and accessibility checks for a tagged + untagged post.
4. Ship or demo the slice.

### Incremental Delivery

1. Finish shared setup/foundation tasks.
2. Implement and validate US1, then merge/deploy.
3. Implement US2 tag navigation, validate, and deploy.
4. Implement US3 readability polish, validate, and deploy.
5. Close with Polish phase audits/documentation.

### Parallel Team Strategy

1. Collaborate on Setup/Foundation to produce fixtures + translation strings.
2. Assign US1 to the layout specialist, US2 to accessibility/navigation, and US3 to typography/responsive specialist.
3. Sync on shared partial updates before merging to avoid Tailwind class conflicts.

---

## Notes

- Reference constitution principles in PR descriptions as evidence of compliance.
- Keep tasks specific and scoped to one output (layout file, tailwind file, documentation artifact).
- Ensure Tailwind utility usage remains purposeful; remove dead CSS before completion.
- Capture audit artifacts (screenshots, Lighthouse/axe reports) when stories modify UX or performance.
- Stop after each story to confirm the site remains simple, responsive, and performant.

