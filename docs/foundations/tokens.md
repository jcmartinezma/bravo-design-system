---
title: Tokens
status: draft
owner: community
update: August 17, 2026
---

# Tokens

The design system includes a collection of tokens ready to use or customize.

```
docs/tokens/
├── core/                 # Layer 1 — raw values (hex, px, ms, font stacks)
│   ├── color.core.json
│   ├── spacing.core.json
│   ├── typography.core.json
│   ├── motion.core.json
│   ├── radius.core.json
│   ├── shadow.core.json
│   └── border.core.json  
├── semantic/             # Layer 2 — UI roles referencing core
│   ├── color.semantic.json
│   ├── spacing.semantic.json
│   ├── typography.semantic.json
│   ├── motion.semantic.json
│   └── radius.semantic.json
├── composite/            # Layer 2.5 — multi-property DTCG composites
│   ├── typography.composite.json
│   ├── shadow.composite.json
│   ├── motion.composite.json
│   ├── border.composite.json
│   └── gradient.composite.json
└── theme/                # Layer 2b — per-mode semantic overrides
    └── dark/
        └── color.semantic.json   # dark aliases; light = semantic/ default
```

## Format

All token files use [DTCG](https://www.designtokens.org/tr/2025.10/format/) JSON:

- `$schema`, `$value`, `$type`, `$description`
- Semantic and composite tokens reference other tokens with `{group.token.step}` (e.g. `{color.gray.100}`)
- Default interactive state uses `$root` when sibling states exist
- **Composite** types (`typography`, `shadow`, `transition`, `border`, `gradient`) group several sub-values that are applied together

## Layer rules

| Layer | Contains | Must not contain |
|-------|----------|------------------|
| **Core** | Raw values only | Semantic roles, component names |
| **Semantic** | Roles + references to core | Hardcoded hex/px (use references) |
| **Composite** | Multi-property styles referencing core/semantic | Component names, raw palettes |
| **Theme** | Mode-specific semantic overrides | Duplicate core palettes |
| **Component** (future) | `button.bg` → `{color.surface.primary}` | Raw values |

## Figma mapping

Git (`docs/tokens/`) is the source of truth. When syncing into Figma Variables, mirror the same layers:

| Docs | Figma |
|------|-------|
| `docs/tokens/core/` | Collection **Core** (raw values) |
| `docs/tokens/semantic/` | Collection **Semantic** (aliases to Core) |
| `docs/tokens/composite/` | Text styles, effect styles, and paint styles for gradients (not variables) |
| `docs/tokens/theme/dark/` | Extra mode on Semantic (Dark; light = default semantic) |

Agents (and anyone using Cursor on this repo) should follow the project skill:

[`.cursor/skills/figma-token-sync/SKILL.md`](../../.cursor/skills/figma-token-sync/SKILL.md)

Ask the agent something like: “Sync tokens to this Figma file …” and point at a Figma URL. Do not invent a different collection layout (for example Primitives + Color + Spacing).

Also listed in root [AGENTS.md](../../AGENTS.md#figma-token-sync).

## Build (site CSS)

The Astro docs site generates CSS from these JSON files so the site and the design system stay in sync:

1. Edit values in `docs/tokens/core/`, `semantic/`, `composite/`, or `theme/dark/`.
2. Run `npm run tokens:build` in `site/`, or start `npm run dev` / `npm run build` (Vite regenerates automatically).
3. Outputs under `site/src/styles/generated/` — **do not edit by hand**:
   - `tokens.css` — CSS variables (core, semantic, composite; dark overrides under `[data-theme="dark"]`)
   - `text-styles.css` — rules from typography composites (`h1`–`h6`, `.text-body`, …)
4. Editable site CSS in `site/src/styles/` loads after generated files and may override them.
5. Composites expand in CSS: typography → `--text-body-font-size`, etc.; shadow / border / transition / gradient → one shorthand variable.

Generate tokens
```sh
npm run tokens:build
```

Later you can point Style Dictionary (or similar) at the same sources for other platforms:

```js
source: [
  'docs/tokens/core/**/*.json',
  'docs/tokens/semantic/**/*.json',
  'docs/tokens/composite/**/*.json',
  'docs/tokens/theme/dark/**/*.json',
]
```

## Foundation guides

Each foundation doc explains *why* and *how to name* tokens; JSON files hold *values*:

| Foundation | Guide | Core file | Semantic file | Composite (examples) |
|------------|-------|-----------|---------------|----------------------|
| Color | [color.mdx](color) | [color.core.json](../tokens/core/color.core.json) | [color.semantic.json](../tokens/semantic/color.semantic.json) (+ [theme/dark](../tokens/theme/dark/color.semantic.json)) | — |
| Spacing | [spacing.mdx](spacing) | [spacing.core.json](../tokens/core/spacing.core.json) | [spacing.semantic.json](../tokens/semantic/spacing.semantic.json) | — |
| Typography | [typography.mdx](typography) | [typography.core.json](../tokens/core/typography.core.json) | [typography.semantic.json](../tokens/semantic/typography.semantic.json) | [typography.composite.json](../tokens/composite/typography.composite.json) |
| Effects | [effects.mdx](effects) | [shadow.core.json](../tokens/core/shadow.core.json) | shadow tints in [color.semantic.json](../tokens/semantic/color.semantic.json) | [shadow.composite.json](../tokens/composite/shadow.composite.json), [gradient.composite.json](../tokens/composite/gradient.composite.json) |
| Motion | [motion.mdx](motion) | [motion.core.json](../tokens/core/motion.core.json) (`duration`, `delay`, `easing`) | [motion.semantic.json](../tokens/semantic/motion.semantic.json) | [motion.composite.json](../tokens/composite/motion.composite.json) |
| Border | — | [border.core.json](../tokens/core/border.core.json) (`border-width`, `border-style`) | — | [border.composite.json](../tokens/composite/border.composite.json) |

## Related docs

- [Color](color)
- [Versioning](../governance/versioning)
