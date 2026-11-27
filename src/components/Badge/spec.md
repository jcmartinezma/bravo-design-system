---
title: Badge
status: draft
owner: community
update: November 17, 2026
---

## Purpose

Badges (pills) label status, category, or metadata in a compact form. They are not interactive controls.

**Use when:**

- You need a short status or category next to a title, table row, or card
- The meaning is one of a fixed set (info, success, warning, danger, neutral)

**Don't use when:**

- The control starts an action — use a Button
- The content is a long sentence — use body text or a banner
- The user must toggle a value — use a chip or filter control

## Anatomy

| Part | Description |
|------|-------------|
| Container | Pill-shaped surface with padding and radius |
| Label | Short status or category text (required) |

## Variants

### Tone

| Tone | Use |
|------|-----|
| Neutral | Default metadata without semantic weight |
| Info | Informational or in-progress context |
| Success | Completed or positive outcome |
| Warning | Caution that needs attention |
| Danger | Error, failure, or destructive context |

### Appearance

| Appearance | Use |
|------------|-----|
| Subtle | Default in dense UI; lower visual weight |
| Solid | Higher emphasis when the status must stand out |

### Size

| Size | Use |
|------|-----|
| Small | Tables and dense lists |
| Medium | Default next to titles and summaries |

## States

Badges are non-interactive. There is no hover, focus, disabled, or loading state. Color comes from **tone × appearance** only.

## Content

- Prefer 1–2 words: “Complete”, “Failed”, “Beta”
- Do not wrap; keep labels short
- Status language should match product voice

## Accessibility

- Badge text must meet WCAG 2.1 AA contrast against its fill for every tone × appearance
- Do not rely on color alone — the label carries the meaning
- If the badge is the only status indicator for a control, ensure surrounding copy or `aria` on the parent conveys the same meaning
- Not focusable; do not put click handlers on the badge

## Tokens

| Role | Token names |
|------|-------------|
| Neutral subtle fill / label / border | `color.bg.neutral.subtle`, `color.text.neutral`, `color.border.neutral.subtle` |
| Neutral solid fill / label | `color.bg.neutral.intense`, `color.text.on-neutral.intense` |
| Info / success / warning / danger solid fill | `color.bg.feedback.info.intense` / `success` / `warning` / `error` |
| Semantic subtle labels | `color.text.feedback.info` / `success` / `warning` / `error` |
| Feedback subtle borders | `color.border.feedback.*.subtle` |
| Padding | `spacing.2xs` / `spacing.xs` |
| Corner radius | `radius.rounded` |
| Typography | `text.size.xs` + `text.weight.medium` + `text.face.base` |

## Figma mapping

### Variant naming

```text
Tone=Neutral, Appearance=Subtle, Size=Medium
Tone=Danger, Appearance=Solid, Size=Small
```

### Component properties

| Property | Figma type | Maps to |
|----------|------------|---------|
| `Label` | TEXT | Visible label layer |

## Related components

- Button — for actions, not status

## Open questions

Log unresolved items in decisions-backlog.
