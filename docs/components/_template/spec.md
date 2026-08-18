---
title: Component Name
status: draft
owner: community
update: January 1, 2026
---

<!-- Metadata Area -->

> Copy `docs/components/_template/` to `docs/components/{kebab-case-name}/` and replace all placeholders in `spec.md` and `metadata.json`.

## Purpose

What job does this component do? When should teams use it?

**Use when:** …

**Don't use when:** … (prefer another component or pattern)

## Anatomy

Describe parts of the component:

| Part | Description |
|------|-------------|
| Container | … |
| Label | … |
| Icon (optional) | … |

## Variants

| Variant | Use |
|---------|-----|
| default | … |
| secondary | … |

## States

| State | Behavior |
|-------|----------|
| default | … |
| hover | … |
| focus | … |
| disabled | … |
| loading | … |
| error | … |

## Content

- Label rules: see [writing-guidelines](../vision/writing-guidelines)
- Max length / truncation: …

## Accessibility

Required for every component spec.

- **Keyboard:** Tab order, Enter/Space behavior, Escape if dismissible
- **Focus:** Visible focus indicator; trap focus if modal
- **ARIA:** Roles, labels, `aria-*` attributes
- **Contrast:** Meets WCAG AA for text and interactive states
- **Screen reader:** What is announced on state changes?

## Tokens (when available)

List token names used — no raw values:

- Background: `color-*`
- Spacing: `spacing-*`
- Typography: `font-*`

## Related components

- …

## Open questions

Log unresolved items in [decisions-backlog](../governance/decisions-backlog).

- …
