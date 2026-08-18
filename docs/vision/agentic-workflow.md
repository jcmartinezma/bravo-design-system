---
title: Agentic Workflow
status: draft
owner: community
update: January 1, 2026
---

# Agentic Workflow

How AI agents should use this repository when helping build or extend a design system.

## Before generating UI or copy

1. Read [AGENTS.md](../../AGENTS.md) at the repo root.
2. Apply rules in `.cursor/rules/`.
3. Follow the read order below for domain context.

## Read order

When answering design system questions or implementing UI, consult docs in this order:

1. **Governance** — [contribution-model.md](../governance/contribution-model), [quality-bar.md](../governance/quality-bar), [decisions-backlog.md](../governance/decisions-backlog)
2. **Vision** — [design-principles.md](design-principles), [voice-and-tone.md](voice-and-tone), [writing-guidelines.md](writing-guidelines)
3. **Foundations** — [color](../foundations/color), [typography](../foundations/typography), [spacing](../foundations/spacing), [effects](../foundations/effects), [motion](../foundations/motion), [accessibility](../foundations/accessibility), [tokens catalog](../foundations/tokens)
4. **Token values** — `docs/tokens/core/`, `semantic/`, and `composite/` (example DTCG JSON)
5. **Patterns** — check `docs/patterns/` for existing compositions
6. **Components** — check `docs/components/` for individual element specs

Dependencies flow **downward**: foundations support components; components support patterns. Do not invent token names that contradict foundation guidelines.

## When information is missing

If a guideline, token, component spec, or pattern does not exist:

1. **Do not silently guess** or hardcode values that contradict principles.
2. **Tell the user** what is missing and the impact.
3. **Ask the user** to add an entry to [decisions-backlog.md](../governance/decisions-backlog) with: date, category, description, severity, and suggested action.

## When adding documentation

- Copy from [components/_template/](../components/_template/) or [patterns/_template.md](../patterns/_template.md).
- Update [docs/README.md](../readme) with links to new files.
- Cross-link related vision and foundation docs.

## Layering reminder

```
vision → foundations → components → patterns
         (why)         (visual)      (pieces)    (compositions)
```

Governance wraps all layers and defines how changes are proposed and reviewed.

## Related docs

- [Design principles](design-principles)
- [Decisions backlog](../governance/decisions-backlog)
