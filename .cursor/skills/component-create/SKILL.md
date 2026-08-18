---
name: component-create
description: >-
  Creates a new design-system component folder from docs/components/_template/
  (metadata.json + spec.md), filled with Figma identification. Usage, variants,
  and accessibility live in spec.md. Use when the user asks to add, create, or
  scaffold a component spec from Figma or from scratch.
---

# Create a component spec

Scaffold **one folder** under `docs/components/{kebab-case}/`. Do not invent extra components. Do not build the Figma component unless the user asked for that separately.

## Folder contract

```
docs/components/{slug}/
├── metadata.json    # Figma IDs + short description / page
└── spec.md          # Human spec (purpose, variants, a11y, tokens, Figma mapping)
```

Copy **both** files from `docs/components/_template/`. Skip folders whose names start with `_`.

Worked example: `docs/components/button/`.

## Steps

1. Ask for a **kebab-case** folder name if missing. Do not overwrite an existing folder.
2. Copy `_template/metadata.json` and `_template/spec.md` into the new folder.
3. If the user has a Figma URL or selection, load Figma MCP skills (`figma-use`) and fill `identification`:
   - `name`, `nodeId`, `componentKey`, `fileKey` (and `assetId` / `libraryKey` when present)
4. Fill `metadata.description`, `path`, and `page` from Figma and the user.
5. Fill every section of `spec.md` (patterns, anti-patterns, variants, **Accessibility**). Use token **names**, not raw hex/px. Do not invent product rules.
6. Add a row in [docs/README.md](../../../docs/README.md). The docs site nav updates automatically — do **not** edit `site/src/data/nav.ts`.
7. Point the user at `/components/{slug}` after `cd site && npm run dev`.

## Do not

- Publish `_template` as a component.
- Create a loose `docs/components/{name}.md` (always a folder).
- Write the design back into Figma (use **component-sync** only to validate).
- Add npm packages or change site routing.
