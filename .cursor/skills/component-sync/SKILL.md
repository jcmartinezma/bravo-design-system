---
name: component-sync
description: >-
  Validates design-system component folders (metadata.json + spec.md) against
  required fields and Figma IDs. Use when the user asks to sync, check, lint,
  or verify components against Figma. Read-only: do not rewrite the Figma file.
---

# Validate component specs

**Read-only.** Report problems. Do not create or edit nodes in Figma. Do not invent variants or tokens.

## What a valid component is

Each published component is a folder `docs/components/{slug}/` with **both**:

- `metadata.json`
- `spec.md`

Ignore `_template/` and any folder whose name starts with `_`.

Incomplete folders (only JSON or only markdown) must **not** appear on the site. That is expected. Still report them as errors so the author can finish or delete the folder.

## Checks

For every folder under `docs/components/` except `_` prefixes:

1. Both files exist.
2. `metadata.json` parses as JSON.
3. `identification.name`, `identification.fileKey`, and `identification.nodeId` are non-empty for a Figma-backed component. Empty IDs are a warning (page shows a missing-embed note).
4. `spec.md` has frontmatter (`title`, `status`, `owner`, `update`) and an **Accessibility** section.
5. If the user provided a Figma file, compare `fileKey` / `nodeId` / `componentKey` to the file. Report mismatches. Do not “fix” Figma.

## Site behavior (do not “fix” with code)

- Deleting a complete folder removes the page and nav item on the next build. That is success, not an error.
- Do not add fallbacks, stubs, or hardcoded nav entries for missing components.

## After reporting

List: valid components, incomplete folders, JSON/Figma mismatches. Ask the user before editing any spec.
