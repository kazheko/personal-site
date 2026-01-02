# Data Model - Production Typography System

## Overview

The typography system is configuration-driven and does not introduce persisted data entities. The model below defines the structured typography rules that each page must honor.

## Entities

### TypographySystem

- **Purpose**: Defines the global typography configuration applied across the site.
- **Fields**:
  - **primaryFont**: Inter with fallback stack.
  - **codeFont**: JetBrains Mono with system monospace fallback.
  - **weights**: Body 400, UI 500, h3-h4 600, h1-h2 700.
  - **paragraphSpacing**: ~1.2em bottom margin.
  - **uiText**: 14px size, ~1.4 line height, 500 weight.
  - **codeBlockLineHeight**: 1.55 target within the 1.5-1.6 range.

### BreakpointTypography

- **Purpose**: Stores per-breakpoint scale and layout constraints.
- **Fields**:
  - **breakpoint**: mobile, tablet (>=768px), desktop (>=1024px).
  - **bodySize**: 16px across breakpoints.
  - **bodyLineHeight**: 1.65 mobile, 1.7 tablet/desktop.
  - **headingSizes**: h1-h4 sizes per breakpoint.
  - **codeSize**: 13px mobile, 14px desktop.
  - **contentWidth**: full width with 16px padding mobile, 640px tablet, 680px desktop.

### InteractionSizing

- **Purpose**: Ensures UI text and controls remain accessible.
- **Fields**:
  - **minTapHeight**: 44px for interactive elements on mobile.
  - **uiLineHeight**: ~1.4 to maintain readable navigation and metadata.

## Relationships

- **TypographySystem** includes many **BreakpointTypography** entries (one per breakpoint).
- **TypographySystem** references **InteractionSizing** for UI elements.

## Validation Rules

- Font weights must match the specified scale and not exceed the defined hierarchy.
- Heading sizes must follow the mobile-first scale and expand at tablet/desktop breakpoints.
- Content widths must respect the max-widths and padding values per breakpoint.
- Interactive elements must meet the 44px minimum tap height on mobile.
