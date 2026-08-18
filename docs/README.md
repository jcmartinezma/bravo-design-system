---
title: Documentation
status: draft
owner: community
update: August 18, 2026
---

# Documentation

Human-facing map of this design-system starter. AI agents should start at root [AGENTS.md](../AGENTS.md).

## Suggested reading path

1. [Get started](../README.md) — clone, tokens, and the docs site (starter pack). The site also has `/getting-started`.
2. Vision — principles, voice, writing, agent workflow
3. Foundations — tokens and guidelines
4. Components and patterns — specs and examples
5. Governance — how *your* system evolves

## Vision

| Doc | Purpose |
|-----|---------|
| [Design principles](vision/design-principles.md) | Core principles with do/don't examples |
| [Agentic workflow](vision/agentic-workflow.md) | How agents should read and extend the system |
| [Voice and tone](vision/voice-and-tone.md) | Brand personality and tone by context |
| [Writing guidelines](vision/writing-guidelines.md) | UI copy rules for labels, errors, empty states |

## Foundations

Guideline docs live here; **values** live under [tokens/](tokens/).

| Doc | Purpose |
|-----|---------|
| [Tokens](foundations/tokens.md) | Token layers, DTCG format, Figma mapping, CSS build |
| [Color](foundations/color.mdx) | Color roles and contrast |
| [Typography](foundations/typography.mdx) | Type scale and usage |
| [Spacing](foundations/spacing.mdx) | Spacing scale and layout rhythm |
| [Effects](foundations/effects.mdx) | Shadows and related effects |
| [Motion](foundations/motion.mdx) | Duration, easing, reduced motion |
| [Accessibility](foundations/accessibility.md) | WCAG baseline for the whole system |

## Components

Single reusable UI elements. Copy [`components/_template/`](components/_template/) (`metadata.json` + `spec.md`) to add a new spec. The docs site publishes each complete folder as `/components/{name}` automatically.

| Doc | Purpose |
|-----|---------|
| [Button (example)](components/button/spec.md) | Multi-variant button with Figma mapping |

**Component vs pattern:** a **component** is one element (Button, Input). A **pattern** combines components to solve a user scenario (empty state, form layout).

## Patterns

| Doc | Purpose |
|-----|---------|
| [_template.md](patterns/_template.md) | Template for new patterns |
| [Empty state (example)](patterns/example-empty-state.md) | Filled example pattern |

## Governance

| Doc | Purpose |
|-----|---------|
| [Contribution model](governance/contribution-model.md) | Who contributes and how |
| [Versioning](governance/versioning.md) | How **your** docs and tokens version |
| [Quality bar](governance/quality-bar.md) | Definition of done for specs |
| [Decisions backlog](governance/decisions-backlog.md) | Open gaps and deferred decisions |

## When you add or rename docs

1. Update **this file** with links.
2. Update the docs site sidebar in [`site/src/data/nav.ts`](../site/src/data/nav.ts) if the page should appear in navigation (not needed for **components** — complete folders appear automatically).
3. Follow [quality-bar.md](governance/quality-bar.md).
