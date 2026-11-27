---
title: Contribution Model
status: draft
owner: community
update: January 1, 2026
---

# Contribution Model

How humans and agents propose changes to this design system.

## Who can contribute

Anyone using this starter is encouraged to adapt it for their team. For the public template:

- **Contributors** — Propose doc updates, new patterns, foundation improvements via pull requests.
- **Maintainers** — Review PRs, triage [decisions-backlog](decisions-backlog), align releases with [versioning](versioning).

## Contribution flow

1. **Check existing docs** — Avoid duplicating guidance in `docs/vision/`, `docs/foundations/`, `docs/patterns/`, or `docs/components/`.
2. **Open an issue or PR** — Describe the change and which layer it affects.
3. **Follow templates** — Copy `docs/components/_template/` for components, or `_template.md` for patterns.
4. **Update navigation** — Add links in [docs/README](/README).
5. **Review against [quality-bar](quality-bar)** — Self-check before requesting review.

## Agent-assisted contributions

When an AI agent drafts documentation:

- The **human owner** approves all merges.
- Agents must flag gaps in [decisions-backlog](decisions-backlog) instead of inventing conflicting rules.
- Agents should not commit secrets, proprietary brand assets, or client-specific data to the public starter.

## Scope of changes

| Change type | Typical path |
|-------------|--------------|
| Fix typo / clarify wording | Direct PR |
| New pattern doc | PR + update docs/README.md |
| New foundation guideline | PR + cross-links from related docs |
| Breaking rename | Issue first; follow versioning |

## Related docs

- [CONTRIBUTING.md](https://github.com/jcmartinezma/bravo-design-system/tree/main/CONTRIBUTING.md)
- [Quality bar](quality-bar)
- [Decisions backlog](decisions-backlog)
