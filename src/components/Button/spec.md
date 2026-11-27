---
title: Button
status: draft
owner: community
update: November 17, 2026
---

<!-- Metadata Area -->

## Purpose

Buttons are the primary way users commit to an action. Prefer one clear primary button per view so hierarchy stays obvious.

**Use when:**

- The user starts or confirms an action (save, create, continue)
- You need a visible, focusable control with a verb label

**Don't use when:**

- The control only navigates to another page with no side effect — prefer a text link
- You need a binary on/off control — prefer a toggle or checkbox
- Multiple actions sit in a dense toolbar — prefer icon-only buttons with accessible names, or a menu

## Anatomy

| Part | Description |
|------|-------------|
| Container | Hit target; holds padding, background, border, and radius |
| Label | Visible text that names the action (required unless loading or icon-only) |
| Leading icon (optional) | Icon before the label; decorative or reinforces the action |
| Trailing icon (optional) | Icon after the label (e.g. chevron for “open”) |
| Spinner (loading) | Replaces label/icons while the action is in progress |

## Variants

### Appearance

| Variant | Use |
|---------|-----|
| Primary | The single most important action on the screen |
| Secondary | Alternative or cancel-style actions next to primary |
| Ghost | Low-emphasis actions in toolbars or dense UI (no fill by default) |
| Danger | Destructive actions (delete, remove) — pair with a confirmation pattern when irreversible |

### Size

| Size | Use |
|------|-----|
| Small | Compact toolbars, tables, dense forms |
| Medium | Default for most product UI |

Do not invent ad-hoc sizes. Stick to these three so Figma variants and code props stay in sync.

## States

| State | Behavior |
|-------|----------|
| Default | Resting appearance; interactive |
| Hover | Stronger surface or border feedback; pointer cursor |
| Active (pressed) | Brief pressed appearance while the pointer is down |
| Focus | Visible focus ring using `color.outline.focus` (keyboard / `:focus-visible`) |
| Disabled | Non-interactive; muted fill, border, and label |
| Loading | Shows spinner, keeps accessible name, sets `aria-busy`, blocks activation |

Hover and focus are **interaction** states. In Figma they are usually shown with Interactive Components or a documentation row — they are not every combination in the published variant matrix (see [Figma mapping](#figma-mapping)).

## Content

Follow [writing-guidelines](../vision/writing-guidelines).

- **Label:** Verb + object when helpful — “Create project”, not “Submit”
- **Length:** Aim for 1–3 words; avoid wrapping on medium/large sizes
- **Danger:** Name the object when possible — “Delete project”, not “Delete”
- **Loading:** Keep the same accessible name as the resting label (e.g. still “Save changes”) so screen readers do not hear a mystery control
- **Icon-only:** Always provide an accessible name via `label` / `aria-label` (e.g. “Go back”). Icons alone are not enough.

Example:

> [← Back] ← Secondary, medium, leading icon  
> [Continue →] ← Primary, medium, trailing icon  
> [→] ← Primary, icon-only, accessible name “Go forward”

## Accessibility

Baselines: [accessibility](../foundations/accessibility).

- **Keyboard:** Focusable in tab order. Activate with **Enter** or **Space**.
- **Focus:** Always show a visible focus indicator. Do not remove outlines without a token-backed replacement.
- **Role:** Native `<button>` (or `role="button"` only when native is impossible). Use `type="button"` unless it submits a form (`type="submit"`).
- **Name:** Accessible name must match or reasonably include the visible label. Icon-only buttons need `aria-label`.
- **Disabled:** Prefer `disabled` on native buttons. If the control stays focusable, use `aria-disabled="true"` and ignore activation.
- **Loading:** Set `aria-busy="true"` while loading; announce completion via the resulting UI change (toast, navigation) rather than only a visual spinner.
- **Contrast:** Label and icons must meet WCAG 2.1 AA against the button background in every appearance × state you ship.
- **Target size:** Aim for at least **44×44 CSS px** hit area (padding can enlarge a visually smaller control).
- **Motion:** Spinner and hover transitions honor `prefers-reduced-motion` — see [motion](../foundations/motion).

## Tokens (when available)

Use **semantic** token names (and composites) — never hardcode hex or px in specs or Figma fills.

| Role | Token names |
|------|-------------|
| Primary fill | `color.bg.action.intense`, hover `color.bg.action.intense.hover`, active `color.bg.action.intense.active` |
| Secondary fill | `color.bg.neutral`, hover/active `color.bg.neutral.hover` / `color.bg.neutral.active` |
| Ghost hover fill | `color.bg.action.subtle.hover` |
| Danger fill | `color.bg.action.error.intense` (+ hover/active intense states) |
| Label on primary | `color.text.on-action.intense` |
| Label on danger | `color.text.on-action.error.intense` |
| Label on secondary | `color.text.neutral` (hover `color.text.neutral.hover`) |
| Label on ghost | `color.text.action` (hover `color.text.action.hover`) |
| Border (secondary) | `color.border.neutral` (hover `color.border.neutral.hover`) |
| Focus ring | `color.outline.focus`, width `border.width.md`, offset `spacing.2xs` |
| Disabled label | `color.text.action.disabled` |
| Disabled fill / border | `color.bg.action.disabled`, `color.border.action.disabled` |
| Padding (horizontal) | `spacing.sm` (small/medium), `spacing.md` (large) |
| Gap (icon ↔ label) | `spacing.xs` |
| Corner radius | `radius.md` |
| Label typography | `text.size.xs` + `text.weight.medium` + `text.face.base` (large: `text.size.sm`) |
| Hover / press motion | `transition.fast` (`motion.speed.fast` + `motion.easing.in-out`) |

**Figma Variables:** bind fills, strokes, padding, gap, and radius to the **Semantic** collection (aliases into **Core**). Do not paste raw Core hex into the component. See [tokens](../foundations/tokens#figma-mapping).

## Figma mapping

Use this section when building or syncing the Button in Figma so the library matches this doc and stays under the ~30-variant cap.

### Component properties (not variants)

| Property | Figma type | Maps to |
|----------|------------|---------|
| `Label` | TEXT | Visible label layer (also accessible name for icon-only) |
| `Show label` | BOOLEAN | When false + leading icon → icon-only button |
| `Has leading icon` | BOOLEAN | Show/hide leading slot (`icon-arrow-left` from `public/svg`) |
| `Has trailing icon` | BOOLEAN | Show/hide trailing slot (`icon-arrow-right` from `public/svg`) |
| `Loading` | BOOLEAN | When true: show spinner, hide label/icons, treat as non-interactive in prototypes |

Swap the leading/trailing instance manually when a different icon is needed — do **not** add a variant per icon.

### Variant naming (Figma)

Use comma-separated property pairs Figma expects, for example:

```text
Appearance=Primary, Size=Medium, State=Default
Appearance=Danger, Size=Small, State=Disabled
```

## Related components

- …

## Open questions

Log unresolved items in [decisions-backlog](../governance/decisions-backlog).

- …
