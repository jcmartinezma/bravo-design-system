# Agent instructions

Onboarding for AI agents helping someone **use and extend this design system** (vision, foundations, tokens, components, patterns).

## Start here

1. Read this file.
2. Apply `.cursor/rules/` (especially `design-system-core.mdc`, which is always on).
3. Use [docs/README.md](docs/README.md) to locate domain docs.
4. For Figma Variables sync, load [`.cursor/skills/figma-token-sync/SKILL.md`](.cursor/skills/figma-token-sync/SKILL.md).
5. For new or existing **components**, load [`.cursor/skills/component-create/SKILL.md`](.cursor/skills/component-create/SKILL.md) or [`.cursor/skills/component-sync/SKILL.md`](.cursor/skills/component-sync/SKILL.md).

## Starter pack scope

This repo is a **starter template**, not a complete design system. Do not try to fill every token slot or component — extend only what the user asks for. Example tokens and one pattern show the pattern; the user adds brand-specific content.

## Repository map

```
agentic-design-system/
├── README.md              # Human-facing project overview
├── AGENTS.md              # This file — agent onboarding
├── CONTRIBUTING.md        # Contribution process
├── docs/
│   ├── README.md          # Human doc navigation hub
│   ├── vision/            # Principles, voice, agent workflow
│   ├── foundations/       # Guidelines (.md) — color, type, spacing, motion, a11y
│   ├── components/        # One folder per component (metadata.json + spec.md)
│   ├── patterns/          # Pattern specs + _template.md
│   └── governance/        # Contribution, versioning, backlog
├── tokens/                # Example values (.json) — core/, semantic/, composite/, theme/
├── src/                   # Stories + generated token CSS (Storybook)
├── .storybook/            # Storybook config — npm run storybook
└── .cursor/
    ├── rules/             # Scoped agent rules
    └── skills/            # Project Agent Skills (e.g. Figma token sync)
```

## Read order for design tasks

When generating UI, copy, or documentation:

1. **Governance** — [quality-bar.md](docs/governance/quality-bar.md), [decisions-backlog.md](docs/governance/decisions-backlog.md)
2. **Vision** — [design-principles.md](docs/vision/design-principles.md), [voice-and-tone.md](docs/vision/voice-and-tone.md), [writing-guidelines.md](docs/vision/writing-guidelines.md)
3. **Foundations** — [docs/foundations/](docs/foundations/) (guidelines)
4. **Tokens** — [docs/foundations/tokens.md](docs/foundations/tokens.md) and [tokens/](tokens/) (values)
5. **Patterns** — [docs/patterns/](docs/patterns/) (check before inventing layouts)
6. **Components** — [docs/components/](docs/components/)

Full details: [agentic-workflow.md](docs/vision/agentic-workflow.md).

## Layering rules

- Dependencies flow **down**: foundations → components → patterns.
- Foundation **guides** are in `docs/foundations/*.md`; token **values** are in `tokens/`.
- Do not invent token or color values — reference token **names** from foundation docs and JSON files.
- Prefer extending existing docs over duplicating guidance.

## When information is missing

**Do not guess** or silently workaround.

1. Tell the user what is missing and the impact.
2. Ask them to add an entry to [docs/governance/decisions-backlog.md](docs/governance/decisions-backlog.md) with:
   - Date
   - Category (foundation, component, pattern, governance, tooling)
   - Description
   - Severity (low / medium / high)
   - Suggested action

## When adding docs

- Copy [docs/components/_template/](docs/components/_template/) (both `metadata.json` and `spec.md`) or [docs/patterns/_template.md](docs/patterns/_template.md).
- Update [docs/README.md](docs/README.md) with links to new files.
- Follow [quality-bar.md](docs/governance/quality-bar.md).
- New token values go in `tokens/core/`, `semantic/`, or `composite/`; update [tokens.md](docs/foundations/tokens.md) when adding files. Run `npm run tokens:build` after JSON changes.

## Figma file

Designer surface for this design system:

https://www.figma.com/design/ArGL69PcOZxU1vSAjdXz5b/Bravo-Demo?node-id=60-6

## Figma token sync

When asked to move, replicate, push, or sync tokens into Figma:

1. **Source of truth** is [`tokens/`](tokens/) (DTCG JSON), not invented values.
2. **Load and follow** [`.cursor/skills/figma-token-sync/SKILL.md`](.cursor/skills/figma-token-sync/SKILL.md).
3. Figma must use two collections — **`Core`** and **`Semantic`** — matching `tokens/core/` and `tokens/semantic/`.
4. Do **not** invent SDS-style collections (Primitives / Color / Spacing / Typography).
5. Composites become text styles, effect styles, and paint styles (gradients); see [tokens.md](docs/foundations/tokens.md#figma-mapping).

## Component specs

When asked to add or check a UI component spec:

1. **Create:** follow [`.cursor/skills/component-create/SKILL.md`](.cursor/skills/component-create/SKILL.md). Copy `_template/`; do not add a loose `.md` under `docs/components/`.
2. **Validate:** follow [`.cursor/skills/component-sync/SKILL.md`](.cursor/skills/component-sync/SKILL.md). Sync is read-only against Figma.

## Do

- Use plain language in docs; explain terms for beginners.
- Include accessibility in every component and pattern spec.
- Cross-link related files.
- Keep new token examples minimal unless the user asks for full coverage.

## Don't

- Hardcode hex colors or pixel values in specs without mapping to token names.
- Create per-section README files — only root and `docs/README.md` exist.
- Commit secrets, client data, or proprietary brand assets to the public starter.
- Generate exhaustive token matrices by default — this is a starter pack.
