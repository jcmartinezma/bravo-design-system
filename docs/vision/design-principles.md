---
title: Design Principles
status: draft
owner: community
update: January 1, 2026
---

# Design Principles

Core principles that guide every decision in this design system. When in doubt, prefer the principle over convenience.

## 1. Token-first

Every visual property — color, spacing, typography, radius, shadow, motion — should come from a named token, not a hardcoded value.

**Do:** Reference `color-primary-default` or `spacing-md` in specs and code.

**Don't:** Write `#3B82F6` or `16px` directly in component docs unless illustrating a token definition.

## 2. Accessible by default

If it is not keyboard-operable, perceivable, and understandable, it is not done. Accessibility is a release criterion, not a polish pass.

**Do:** Include focus states, labels, and contrast in the first draft.

**Don't:** Ship patterns that rely on color alone or remove focus rings without a replacement.

## 3. Progressive disclosure

Show only what users need for the current task. Advanced options and secondary detail belong behind clear affordances.

**Do:** Use defaults, collapsed sections, and stepped flows for complex tasks.

**Don't:** Expose every setting on first load.

## 4. Consistency over novelty

Reuse existing components and patterns before inventing new ones. Familiarity reduces cognitive load.

**Do:** Check `docs/patterns/` and `docs/components/` before designing something new.

**Don't:** Create a one-off button style for a single screen.

## 5. Clear hierarchy

Typography, spacing, and color work together to show what matters most. One primary action per view when possible.

**Do:** Use scale and weight to establish a single focal point.

**Don't:** Compete for attention with multiple equally prominent CTAs.

## 6. Honest feedback

The system should tell users what happened, what went wrong, and what to do next — in plain language.

**Do:** Pair errors with recovery steps. Confirm destructive actions.

**Don't:** Show generic "Something went wrong" without context.

## 7. Agent-readable structure

Documentation is written so humans and AI agents can find authoritative answers without guessing.

**Do:** Follow folder layers, link related docs, log open questions in [decisions-backlog](../governance/decisions-backlog).

**Don't:** Scatter rules in chat threads or duplicate conflicting guidance.

## Related docs

- [Agentic workflow](agentic-workflow)
- [Voice and tone](voice-and-tone)
- [Foundations](../foundations/accessibility)
