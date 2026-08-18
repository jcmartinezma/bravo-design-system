---
title: Versioning
status: draft
owner: community
update: January 1, 2026
---

# Versioning

How documentation and (future) tokens and components are versioned.

## Documentation (v1)

This starter uses **semantic intent** for doc changes:

| Change | Version bump | Example |
|--------|--------------|---------|
| Typo, clarify without changing meaning | Patch | Fix link in color.mdx |
| New pattern or foundation section | Minor | Add form-validation pattern |
| Restructure folders or rename files | Major | Move content/ into vision/ |

Tag releases in git when you publish meaningful snapshots of your fork (optional for early adopters).

## Tokens

Token files live under `docs/tokens/` (`core/`, `semantic/`, `theme/`). See [tokens.md](../foundations/tokens).

- **Patch** — Value tweak that preserves token names (e.g. slightly adjust primary hue).
- **Minor** — New tokens, new theme variants, backward compatible.
- **Major** — Rename or remove tokens; requires migration notes in PR and docs.

Document breaking token changes in `docs/governance/` and link from affected foundation files.

## Components (when you add code)

When code ships:

- Follow semver for package releases if published to npm or similar.
- Pair code releases with updated component specs in `docs/components/`.

## Changelog

Maintain a `CHANGELOG.md` at the repo root when you begin tagging releases. Until then, use git history and [decisions-backlog.md](decisions-backlog) for notable decisions.

## Related docs

- [Tokens catalog](../foundations/tokens)
- [Contribution model](contribution-model)
