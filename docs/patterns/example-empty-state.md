---
title: Empty State
status: draft
owner: community
update: January 1, 2026
---

# Empty State

A pattern for views with no data yet — lists, dashboards, search results, or first-time experiences.

## Problem

Users land on a screen that has nothing to show: no items, no results, or no content created yet. Without guidance, they may not know what this area is for or what to do next.

## Solution

Center (or top-align on mobile) a concise message with optional illustration, explanatory copy, and a single primary action that starts the happy path.

## When to use

- First visit to a feature with no user-created content
- Filters or search return zero results
- A list or table is legitimately empty (not an error)

## When not to use

- **Loading** — use a skeleton or spinner pattern instead
- **Error** — use an error pattern with retry guidance
- **Permission denied** — explain lack of access, not "empty"

## Composition

| Element | Component | Notes |
|---------|-----------|-------|
| Container | Layout stack | Vertically centered group |
| Illustration | Image / icon | Optional; decorative if empty alt |
| Heading | Text (H2) | What this area is |
| Body | Text (body) | Why it's empty + what to do |
| Action | Button (primary) | One clear next step |

## Layout

- Max content width ~400–480px for readability
- `spacing-lg` between illustration and text (when tokens exist)
- `spacing-md` between heading and body
- `spacing-lg` between body and button

## Responsive behavior

| Breakpoint | Changes |
|------------|---------|
| Mobile | Top-aligned with padding; illustration smaller or hidden |
| Desktop | Vertically centered in content area |

## Content

Follow [writing-guidelines](../vision/writing-guidelines).

- **Heading:** Noun phrase — "No projects yet"
- **Body:** One sentence — purpose + encouragement
- **Primary CTA:** Verb + object — "Create project"

Example:

> **No documents yet**  
> Create a document to share and collaborate with your team.  
> [Create document]

## States

| State | Behavior |
|-------|----------|
| Default | Message + primary action |
| Loading | Do not show empty state; show loading indicator |
| Error | Switch to error pattern with retry |

## Accessibility

- Heading uses a proper heading level (usually `h2`) so screen reader users understand context
- Illustration: `alt=""` if decorative; descriptive alt if it conveys meaning
- Primary button is keyboard-focusable and has an accessible name matching visible label
- Do not rely on illustration alone to explain the empty state

## Related docs

- [Button (example)](../components/button)
- [Writing guidelines](../vision/writing-guidelines)
- [Voice and tone](../vision/voice-and-tone)
- [Spacing](../foundations/spacing)

## Open questions

- Should empty states support a secondary link (e.g. "Learn more")? Log decision in [decisions-backlog](../governance/decisions-backlog) when resolved.
