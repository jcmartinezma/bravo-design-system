---
title: Accessibility
status: draft
owner: community
update: January 1, 2026
---

# Accessibility

Baseline accessibility expectations for the entire design system.

## What this covers

Accessibility is not a component-level afterthought. Every foundation, component, and pattern must meet these baselines unless a specific doc documents an exception.

## Standard

Target **WCAG 2.1 Level AA** as the default quality bar.

## Keyboard

- All interactive elements must be reachable and operable via keyboard.
- Focus order must follow a logical reading order.
- Focus indicators must be visible — do not remove outlines without a replacement.

## Screen readers

- Use semantic HTML or equivalent roles in component implementations.
- Images and icons that convey meaning need text alternatives.
- Dynamic updates (toasts, live regions) should use appropriate ARIA live regions.

## Color and contrast

- See [Color](color) for contrast ratios.
- Never use color as the only indicator of state or required fields.

## Motion

- See [Motion](motion) for `prefers-reduced-motion` requirements.

## Touch and pointer targets

- Minimum target size: **44×44 CSS pixels** where practical (WCAG 2.5.5 AAA is a good stretch goal).

## Testing checklist

- [ ] Tab through all interactive states
- [ ] Run automated checks (axe, Lighthouse)
- [ ] Test with at least one screen reader
- [ ] Verify contrast in light and dark themes

## When you add components

Every component spec in `docs/components/` must include an **Accessibility** section. Every pattern in `docs/patterns/` must describe keyboard flow and announcements.

## Accessibility

- Text on backgrounds must meet **WCAG 2.1 AA** contrast (4.5:1 normal text, 3:1 large text).
- Do not rely on color alone — pair with icons, labels, or patterns.
- Test semantic colors with common color-vision deficiencies.

## Related docs

- [Color](color)
- [Motion](motion)
- [Quality bar](../governance/quality-bar)
