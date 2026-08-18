---
title: Documentation
status: draft
owner: community
update: August 18, 2026
---

# Documentation

Human-facing map of this design-system starter. AI agents should start at root [AGENTS.md](https://github.com/jcmartinezma/bravo-agentic-design-system/tree/main/AGENTS.md).

## Suggested reading path

1. [Get started](https://github.com/jcmartinezma/bravo-agentic-design-system/tree/main/README.md) — clone, tokens, and the docs site (starter pack). The site also has [`/getting-started`](/getting-started).
2. Vision — principles, voice, writing, agent workflow
3. Foundations — tokens and guidelines
4. Components and patterns — specs and examples
5. Governance — how *your* system evolves

## Vision

| Doc | Purpose |
|-----|---------|
| [Design principles](vision/design-principles) | Core principles with do/don't examples |
| [Agentic workflow](vision/agentic-workflow) | How agents should read and extend the system |
| [Voice and tone](vision/voice-and-tone) | Brand personality and tone by context |
| [Writing guidelines](vision/writing-guidelines) | UI copy rules for labels, errors, empty states |

## Foundations

Guideline docs live here; **values** live under [tokens/](https://github.com/jcmartinezma/bravo-agentic-design-system/tree/main/docs/tokens).

| Doc | Purpose |
|-----|---------|
| [Tokens](foundations/tokens) | Token layers, DTCG format, Figma mapping, CSS build |
| [Color](foundations/color) | Color roles and contrast |
| [Typography](foundations/typography) | Type scale and usage |
| [Spacing](foundations/spacing) | Spacing scale and layout rhythm |
| [Effects](foundations/effects) | Shadows and related effects |
| [Motion](foundations/motion) | Duration, easing, reduced motion |
| [Accessibility](foundations/accessibility) | WCAG baseline for the whole system |

## Components

Single reusable UI elements. Copy [`components/_template/`](https://github.com/jcmartinezma/bravo-agentic-design-system/tree/main/docs/components/_template) (`metadata.json` + `spec.md`) to add a new spec. The docs site publishes each complete folder as `/components/{name}` automatically.

| Doc | Purpose |
|-----|---------|
| [Button (example)](components/button) | Multi-variant button with Figma mapping |

**Component vs pattern:** a **component** is one element (Button, Input). A **pattern** combines components to solve a user scenario (empty state, form layout).

## Patterns

| Doc | Purpose |
|-----|---------|
| [_template.md](https://github.com/jcmartinezma/bravo-agentic-design-system/tree/main/docs/patterns/_template.md) | Template for new patterns |
| [Empty state (example)](patterns/example-empty-state) | Filled example pattern |

## Governance

| Doc | Purpose |
|-----|---------|
| [Contribution model](governance/contribution-model) | Who contributes and how |
| [Versioning](governance/versioning) | How **your** docs and tokens version |
| [Quality bar](governance/quality-bar) | Definition of done for specs |
| [Decisions backlog](governance/decisions-backlog) | Open gaps and deferred decisions |

## When you add or rename docs

1. Update **this file** with links.
2. Update the docs site sidebar in [`site/src/data/nav.ts`](https://github.com/jcmartinezma/bravo-agentic-design-system/tree/main/site/src/data/nav.ts) if the page should appear in navigation (not needed for **components** — complete folders appear automatically).
3. Follow [quality-bar](governance/quality-bar).
