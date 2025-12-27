# Quickstart: Light Minimal Color Scheme

## Goal

Apply the new palette across blog templates using Tailwind tokens and verify readability, accents, and borders.

## Implementation Steps

1. Update Tailwind theme tokens to include the new background, text, border, and accent colors.
2. Map template classes for body text, headings, metadata, links, tags, header/footer, and pagination to the updated tokens.
3. Verify hover/active states use the specified accent and soft accent backgrounds.

## Verification

- Run `npm run build` to regenerate Tailwind output.
- Run `hugo --environment production --minify` to build the site.
- Spot-check home, list, and post pages for correct colors, including header/footer and pagination.
- Run a Lighthouse or axe audit to confirm contrast targets for primary and secondary text.

## Review Notes

- Contrast review: Pending formal Lighthouse/axe verification.
- Visual review: Palette updates applied; verify header/footer, tags, and pagination on core pages.
