# Maintainer agent guide (local)

Onboarding for AI agents **maintaining this starter pack** — not for teams using the starter to build their own design system.

End-user agent guidance lives in the published files: root `AGENTS.md`, `docs/vision/agentic-workflow.md`, and `.cursor/rules/` (except `project-dev.mdc`).

## Start here (maintainer work)

1. Read this file.
2. Read [plans/PLAN.md](plans/PLAN.md) — living roadmap, phases, and the simplicity rule.
3. Apply `.cursor/rules/project-dev.mdc` (local, always on for you).
4. For design-system *usage* tasks, still follow root `AGENTS.md`.

## What stays out of the published repo

| Local (gitignored) | Published (synced) |
|--------------------|--------------------|
| `.cursor/plans/PLAN.md` | `docs/` design-system docs |
| `.cursor/AGENTS.dev.md` | Root `AGENTS.md` |
| `.cursor/rules/project-dev.mdc` | Other `.cursor/rules/*.mdc` |
| `.cursor/plans/` | — |

Do not move roadmap status, phase checklists, or tooling war stories into `docs/` or public `AGENTS.md`.

## Two version numbers (never mix them)

The **starter pack** (this repo as a product) and a **team’s design system** (what they build *with* the starter) use independent SemVer. They must not be treated as one number.

Example: a team can use starter **0.1.0** and publish their design system as **2.4.1**. Those releases do not need to match.

| Version | Whose it is | Where it lives |
|---------|-------------|----------------|
| Starter pack | Maintainers of this template | Git tags / GitHub Releases for this repo; `package.json` version of this pack |
| Design system | Teams using the starter | [docs/governance/versioning.md](../docs/governance/versioning.md), their changelog, their tags — when *they* change docs, tokens, or components |

`versioning.md` is a **tool for consumers**. Do not rewrite it to narrate Bravo/starter releases, `0.x` of this pack, or maintainer tagging. Do not put starter-kit history into a root `CHANGELOG.md` in a way that looks like the consumer’s design-system changelog (that file, if they add one, is for *their* system per `versioning.md`).

## Phase awareness

See [plans/PLAN.md](plans/PLAN.md) for current status. Short map:

- **Starter:** Docs + example tokens under `tokens/`.
- **Phase 2b:** Figma designer surface (planned).
- **Phase 3:** Storybook + React/Vite, Style Dictionary CSS, Code Connect (in progress).

## Simplicity rule (tooling)

This starter must stay easy to read and change. Prefer the smallest solution that works for `npm run storybook` / `npm run tokens:build`.

Before adding code, ask:

1. Does a simpler option exist (relative path, fewer imports, no new package)?
2. Does this force a new dependency, `@types/*`, custom plugin, or cache workaround?
3. Would a beginner understand it without a paragraph of explanation?

If (2) is yes, stop and choose the simpler option unless there is a concrete bug you cannot fix otherwise.

Full detail: [plans/PLAN.md](plans/PLAN.md#simplicity-rule-for-humans-and-agents).

## Tooling notes

```sh
npm install
npm run storybook
npm run tokens:build
```

**Tokens → CSS:** `style-dictionary.config.js` reads `tokens/` and writes `src/styles/tokens.css` and `tokens.dark.css`. Do not hand-edit generated CSS.

**Storybook:** `.storybook/` + `src/stories/`. Fonts live in `src/fonts/` and are declared in `src/styles/fonts.css` (imported from `.storybook/preview.ts`). Style Dictionary only writes `tokens.css` / `tokens.dark.css`.

The former Astro docs site (`site/`) was removed; do not reintroduce it without an explicit product decision.

## Do / Don't (maintainer)

**Do**

- Keep published docs focused on *using and extending a design system*.
- Keep starter-pack SemVer (tags, `package.json`) separate from consumer DS SemVer (`versioning.md`).
- Log product/design gaps in `docs/governance/decisions-backlog.md`.
- Update `.cursor/plans/PLAN.md` when starter phases or scope change.
- Prefer extending existing published docs over duplicating guidance.

**Don't**

- Commit this file, `project-dev.mdc`, or `.cursor/plans/` (they are gitignored).
- Fold this pack’s version into `docs/governance/versioning.md` or imply consumers must match the starter’s pack tag.
- Put starter-build status tables or tooling essays into `docs/PLAN.md` (that path must not exist in the published tree).
- Edit `.cursor/plans/` unless the user explicitly asks.
- Add Node helpers, plugins, or `@types/*` “just in case.”

## Related

- [plans/PLAN.md](plans/PLAN.md)
- Published onboarding: [`../AGENTS.md`](../AGENTS.md)
