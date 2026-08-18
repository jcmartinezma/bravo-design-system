---
title: Button example
status: draft
owner: community
update: January 1, 2026
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
- Multiple actions sit in a dense toolbar and space is tight — consider icon-only buttons with accessible names (future spec) or a menu

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

Hover and focus are **interaction** states. In Figma they are usually shown with Interactive Components or a documentation row — they are not every combination in the published variant matrix (see [Figma mapping](#figma-mapping)).

## Content

Follow [writing-guidelines](../vision/writing-guidelines).

- **Label:** Verb + object when helpful — “Create project”, not “Submit”
- **Length:** Aim for 1–3 words; avoid wrapping on medium/large sizes
- **Danger:** Name the object when possible — “Delete project”, not “Delete”
- **Loading:** Keep the same accessible name as the resting label (e.g. still “Save changes”) so screen readers do not hear a mystery control

Example:

> [Create document] ← Primary, medium  
> [Cancel] ← Secondary, medium

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
| Primary fill | Prefer a strong action color for AA contrast with white labels. Starter Figma Button uses `color.icon.accent` until a dedicated action-surface token exists. Avoid weak fills with `color.text.tertiary.inverse`. Hover/active: `color.icon.accent.hover` / `color.icon.accent.active` |
| Secondary fill | `color.surface.secondary` (`$root`), `color.surface.secondary.active` |
| Label on primary | `color.text.tertiary.inverse` |
| Label on secondary / ghost | `color.text.primary` |
| Danger label / emphasis | `color.text.danger` |
| Border (secondary) | `color.border.primary` |
| Icon accent (ghost) | `color.icon.accent`, `color.icon.accent.hover`, `color.icon.accent.active` |
| Disabled label | `color.text.secondary.disabled` |
| Disabled border | `color.border.primary.disabled` |
| Padding (horizontal) | `spacing.sm` (small), `spacing.md` (medium), `spacing.lg` (large) |
| Gap (icon ↔ label) | `spacing.xs` |
| Corner radius | `radius.md` |
| Label typography | Composite `text.label` (or `text.size.xs` + `text.weight.medium` + `text.style.base`) |
| Hover / press motion | `motion.speed.fast`, `motion.easing.out` |

**Figma Variables:** bind fills, strokes, padding, gap, and radius to the **Semantic** collection (aliases into **Core**). Do not paste raw Core hex into the component. See [tokens](../foundations/tokens#figma-mapping).

## Figma mapping

Use this section when building or syncing the Button in Figma so the library matches this doc and stays under the ~30-variant cap.

### Component properties (not variants)

| Property | Figma type | Maps to |
|----------|------------|---------|
| `Label` | TEXT | Visible label layer |
| `Has leading icon` | BOOLEAN | Show/hide leading icon slot |
| `Leading icon` | INSTANCE_SWAP | Swap icon instance; **do not** create a variant per icon |
| `Has trailing icon` | BOOLEAN | Show/hide trailing icon slot |
| `Trailing icon` | INSTANCE_SWAP | Same as leading |
| `Loading` | BOOLEAN | When true: show spinner, hide label/icons, treat as non-interactive in prototypes |

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
