# Quickstart - About Page Template

## 1. Environment Prep
1. Ensure dependencies are installed: `npm install` (safe to rerun).
2. Start the local toolchain: `npm run dev` (watches Tailwind + runs `hugo server -D`).
3. Work from branch `001-about-page`; verify `git status` is clean before edits.
4. Create/confirm the content stub at `content/about/_index.md` with front matter fields from `data-model.md`.

## 2. Layout Implementation
1. Create `layouts/about/single.html` extending `baseof.html` and wrapping content with `<section class="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-16 lg:flex-row">`.
2. Split the layout into two divs:
   - Left column (`lg:w-1/2 flex flex-col gap-10`): render the two headings/bodies within `prose` containers using data from `.Params.about_blog` and `.Params.about_me`.
   - Right column (`lg:w-1/2`): include a partial (e.g., `partials/about/portrait.html`) that reads `.Params.portrait` and outputs a processed `<img>`.
3. Position the Contact CTA below the text stack with `<a class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-semibold text-white transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" href="mailto:{{ .Params.contact.email }}">{{ with .Params.contact.label }}{{ . }}{{ else }}Contact{{ end }}</a>`.
4. Use Hugo Pipes to process the portrait: `{{ with resources.Get .Params.portrait.src }}{{ $resized := .Fit "1200x1600" }}` etc., and emit responsive attributes (`width`, `height`, `loading="lazy"`).

## 3. Styling Guidance
1. Prefer Tailwind utility classes already defined; extend `tailwind.config.js` only if brand colors or spacing tokens are missing.
2. Default stack is columnar (`flex-col`); apply `lg:flex-row`/`lg:gap-16` for desktop splits.
3. Keep typography inside `prose` with `prose-headings:text-primary` overrides in `tailwind.css` if needed to differentiate the two headings.
4. Ensure portrait container uses `aspect-[3/4]`, `overflow-hidden`, and `object-cover` to maintain edge-to-edge fill without distortion.

## 4. Content Authoring
1. Front matter example:
   ```toml
   +++
   title = "About"
   [params.about_blog]
   heading = "About the Blog"
   body = "Write about mission..."
   [params.about_me]
   heading = "About Me"
   body = "Introduce yourself..."
   +++
   ```
2. Portrait path/alt and contact email default to `config/_default/params.toml` (`params.author` + `params.social.gmail`). Add `[params.portrait]` or `[params.contact]` in the page only when you need to override those global defaults.
3. Keep copy concise (<=200 words per section) to satisfy Simple UX.

## 5. Verification & QA
1. **Responsive**: Validate at 375px, 768px, and 1280px. Confirm portrait moves below text on mobile and fills the right column on desktop without horizontal scroll.
2. **Accessibility**: Tab through headings + CTA, confirm focus states, and run axe to ensure zero critical violations (landmarks, contrast, button labels).
3. **Performance**: `npm run build && hugo --environment production --minify`, then run Lighthouse (mobile + desktop) focusing on LCP for the portrait.
4. **Content validation**: Temporarily blank one of the section bodies to verify graceful handling (fallback text or build warning) and test missing portrait behavior (should show placeholder or alt copy).
5. **Deployment check**: Inspect `public/about/index.html` to ensure canonical URL uses `/about/` and assets load with hashed filenames before pushing to GitHub Pages.
6. **Mission section check (US1)**: During `hugo server -D` preview, confirm the mission heading stays above the fold at 1280px and VoiceOver/NVDA announce it as an `h2`, ensuring navigation landmarks remain discoverable without additional context.
7. **Author + portrait check (US2)**: Validate at 375px/768px/1280px that the bio stays ahead of the portrait (mobile-first order), the portrait fills its container without cropping, and a forced broken image shows the “Portrait coming soon” fallback with preserved alt text in screen readers.
8. **Contact CTA check (US3)**: Trigger the button on desktop + mobile; confirm `mailto:hello@yauheni.dev` opens with the correct subject placeholder, keyboard focus stays visible with `btn-primary` states, and browser status text still shows the email when local clients are unavailable.
9. **Automated audits**: `npx @lhci/cli collect --staticDistDir=public --url=http://localhost/about/` returned avg scores P100/A100/BP96/SEO92, and `npx @axe-core/cli file:///.../public/about/index.html` now reports zero violations after adding a hidden `<h1>` for the page.

## 6. Deployment Notes

- `npm run build` (wrapping `node tools/hugo/run-hugo.js --environment production --minify`) succeeds and emits the optimized `/public/about/index.html` plus the processed portrait asset under `public/images/about/`.
- Running `hugo --environment production --minify` directly requires Hugo on the PATH; the repo currently relies on the script wrapper instead. If you install Hugo globally, rerun the direct command for parity.
