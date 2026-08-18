---
name: figma-token-sync
description: >-
  Syncs design tokens from docs/tokens/ DTCG JSON into Figma Variables using
  Core and Semantic collections. Use when the user asks to move, replicate,
  push, import, or sync tokens to Figma, or to update Figma Variables from
  this design system.
---

# Figma token sync

Push `docs/tokens/` into a Figma file as Variables. **Source of truth is the repo JSON**, not invented palettes or Figma Simple Design System (SDS) layouts.

Also load Figma MCP skills `figma-use` and `figma-generate-library` for Plugin API rules — but **override** their default Primitives / Color / Spacing / Typography collection split with this repo’s architecture below.

## Architecture (required)

| Docs folder | Figma | Contents |
|-------------|-------|----------|
| `docs/tokens/core/` | Collection **`Core`** (mode `Value`) | Raw values only |
| `docs/tokens/semantic/` | Collection **`Semantic`** (modes below) | Roles aliased to Core |
| `docs/tokens/composite/` | **Styles** (not variables) | Text styles, effect styles, paint styles (gradients) |
| `docs/tokens/theme/` | Extra modes on Semantic | Light / Dark when `theme/dark/` exists |

**Do not** create collections named Primitives, Color, Spacing, or Typography for this project.

**Semantic modes:** if `docs/tokens/theme/dark/` exists, Semantic has **`Light`** (default `semantic/*.json`) and **`Dark`** (overrides). If no theme folder yet: one mode named `Value` on both collections.

## Source files (sync this inventory)

Do not skip a file because Figma has no matching picker. Every JSON below is in scope unless the composite table says skip.

### Core → collection `Core`

| File | JSON groups | Figma names | Type |
|------|-------------|-------------|------|
| `docs/tokens/core/color.core.json` | `color.{gray,blue,teal,green,amber,red,violet}.{100–1000}`, `color.alpha.{100–500}`, `color.white`, `color.black`, `color.transparent` | `color/gray/100`, `color/alpha/100`, `color/white`, … | COLOR |
| `docs/tokens/core/spacing.core.json` | `spacing.{100–2000}` | `spacing/100` … `spacing/2000` | FLOAT (px) |
| `docs/tokens/core/radius.core.json` | `radius.{100–500}` | `radius/100` … `radius/500` (`500` = 9999) | FLOAT (px) |
| `docs/tokens/core/border.core.json` | `border-width.{100,200}`, `border-style.{solid,dashed}` | `border-width/100`, `border-width/200`, `border-style/solid`, `border-style/dashed` | FLOAT / STRING |
| `docs/tokens/core/shadow.core.json` | `shadow.offset`, `shadow.blur`, `shadow.spread` | `shadow/offset/0`, `shadow/blur/100`, `shadow/spread/0`, … | FLOAT (px) |
| `docs/tokens/core/typography.core.json` | `fontFamily`, `fontWeight`, `fontSize`, `lineHeight`, `letterSpacing` | `fontFamily/sans`, `fontWeight/400`, `fontSize/100`, `lineHeight/100`, `letterSpacing/0`, … | STRING / FLOAT |
| `docs/tokens/core/motion.core.json` | `duration`, `delay`, `easing` | `duration/100`, `delay/0`, `easing/100`, … | FLOAT (ms) / STRING (`cubic-bezier(…)`) |

**Hyphenated JSON keys stay hyphenated in Figma.** `border-width.100` → `border-width/100`. Never camelCase (`borderWidth`) — those names hide the tokens in a group designers will not look for.

### Semantic → collection `Semantic`

| File | JSON groups | Figma names | Type |
|------|-------------|-------------|------|
| `docs/tokens/semantic/color.semantic.json` | `color.{bg,surface,text,border,icon,shadow}` + `$root` / states | `color/bg/primary`, `color/text/tertiary/inverse`, `color/border/primary`, … | COLOR alias |
| `docs/tokens/semantic/spacing.semantic.json` | `spacing.{xs…16xl}` | `spacing/xs` … `spacing/16xl` | FLOAT alias |
| `docs/tokens/semantic/radius.semantic.json` | `radius.{sm,md,lg,xl,full}` | `radius/sm`, … | FLOAT alias |
| `docs/tokens/semantic/typography.semantic.json` | `text.style`, `text.size`, `text.weight`, `text.leading`, `text.letterSpacing` | `text/style/base`, `text/size/md`, `text/weight/bold`, `text/leading/sm`, `text/letterSpacing/md` | STRING / FLOAT alias |
| `docs/tokens/semantic/motion.semantic.json` | `motion.speed`, `motion.delay`, `motion.easing` | `motion/speed/fast`, `motion/delay/none`, `motion/easing/in-out` | FLOAT / STRING alias |

There is **no** `border.semantic.json`. Stroke **color** is `color/border/*`. Stroke **width** and **style** are Core (`border-width/*`, `border-style/*`).

### Theme

| File | Figma |
|------|--------|
| `docs/tokens/theme/dark/color.semantic.json` | Dark-mode values for the same `color/*` Semantic names. Non-color Semantic tokens keep the Light alias in both modes. |

### Composite → styles (not variables)

| File | Figma |
|------|--------|
| `docs/tokens/composite/typography.composite.json` | Text styles: `Text/Heading 1`–`6`, `Text/Body`, `Text/Label`, `Text/Caption`, `Text/Code` |
| `docs/tokens/composite/shadow.composite.json` | Effect styles: `Shadow/sm`, `Shadow/md`, `Shadow/lg` |
| `docs/tokens/composite/border.composite.json` | **Skip as a single variable or style.** Apply by binding `border-width/*` (stroke weight) + `color/border/*` (stroke color) + note `border-style/*` (Figma has no stroke-style variable). Tokens: `border.default`, `border.strong`. |
| `docs/tokens/composite/gradient.composite.json` | **Paint styles** (not variables — Figma has no gradient variable type): `Gradient/primary`, `Gradient/secondary`, `Gradient/tertiary`. See Paint styles below. |
| `docs/tokens/composite/motion.composite.json` | Skip `motion.transition.*` as variables (no transition type). Duration / delay / easing already live in Semantic. |

## Naming

1. Map DTCG paths to slash paths: `color.gray.100` → `color/gray/100`, `fontFamily.sans` → `fontFamily/sans`, `border-width.100` → `border-width/100`.
2. Omit `$root` in Figma names: `color.bg.primary.$root` → `color/bg/primary`.
3. Keep nested states as path segments: `color.surface.primary.hover` → `color/surface/primary/hover`.
4. Match JSON group keys from the token files (including hyphens: `border-width`, `border-style`).

## Values and aliases

1. **Core** — write raw values (COLOR / FLOAT / STRING). Default `scopes = []` (hide from pickers). **Exception:** `border-width/*` uses `STROKE_FLOAT` so stroke-weight pickers show the tokens (there is no semantic width file).
2. **Semantic** — always `VARIABLE_ALIAS` to Core when the JSON uses `{token.path}`. Never duplicate hex/px in Semantic.
3. Raw Semantic values only when the JSON itself has no `{token.path}` reference (for example a `color-mix(…)` string). If the JSON aliases `{color.alpha.*}` or another Core color, use `VARIABLE_ALIAS` — do not bake a hex. Shadow tints (`color/shadow/*`) follow the JSON like any other semantic color.
4. `%` radius → use the px value in JSON (e.g. `9999`); do not invent a different full-radius convention.
5. `rgba()` / `transparent` → COLOR with alpha (`transparent` = `{r:0,g:0,b:0,a:0}`).
6. `cubicBezier` arrays → STRING `cubic-bezier(…)`.
7. **`fontFamily` MUST be a single family name** that exists in Figma and in `site/src/styles/fonts.scss` (`Asap`, `Domine`, `IBM Plex Mono`). Never write CSS stacks (`Inter, system-ui, sans-serif`) into STRING / FONT_FAMILY variables — Figma rejects them when the variable is applied. Load each family with `figma.loadFontAsync` **before** `setValueForMode` or `setBoundVariable("fontFamily", …)`. Discover exact style strings with `listAvailableFontsAsync()` (`Asap` uses `SemiBold` / `ExtraBold`, not `Semi Bold`).
8. **Line height in Figma is a bare number (FLOAT), never a `px` string.** JSON/CSS may say `12px` or `{lineHeight.100}px`; when writing Variables, use only the numeric `.value` (e.g. `12`, not `"12px"`, not `"12 px"`). Semantic `text/leading/*` **alias** Core `lineHeight/*` — if the JSON `$value` is `{lineHeight.100}px`, strip the trailing `px` and alias `lineHeight/100`. Do not create STRING variables for leading. WEB code syntax stays `var(--line-height-100)` / `var(--text-leading-xs)` from `tokens.css`.

## Code syntax

After creating each variable, set WEB syntax from **actual** CSS names in `site/src/styles/generated/tokens.css` (regenerate with `cd site && npm run tokens:build` if stale):

```text
var(--color-gray-100)
var(--border-width-100)
var(--border-style-solid)
var(--color-bg-primary)
```

Use the `var()` wrapper. Do not invent CSS names from Figma paths alone. Hyphenated groups map as `--border-width-100`, not `--borderWidth-100`.

## Scopes (Semantic)

| Role | Scopes |
|------|--------|
| Background / surface | `FRAME_FILL`, `SHAPE_FILL` |
| Text | `TEXT_FILL` |
| Border **color** (`color/border/*`) | `STROKE_COLOR` |
| Icon | `SHAPE_FILL`, `STROKE_COLOR` |
| Spacing (`spacing/xs` … `spacing/16xl`) | `GAP`, `WIDTH_HEIGHT` |
| Radius | `CORNER_RADIUS` |
| Font size / weight / line height / family / letter spacing | matching `FONT_*` / `LETTER_SPACING` |
| Motion duration / easing / delay | `[]` (documentational) |
| Shadow tint (`color/shadow/*`) | `EFFECT_COLOR` |

**Core exception:** `border-width/*` → `STROKE_FLOAT`. Other Core variables stay `[]`.

Never use `ALL_SCOPES`.

## Composites → styles

| Composite | Figma |
|-----------|-------|
| `shadow.composite.json` | Effect styles (e.g. `Shadow/sm`) — bind `color` from the composite `$value.color` (usually Core `color/alpha/*`), plus offset / blur / spread floats |
| `typography.composite.json` | Text styles (e.g. `Text/Body`) — see below |
| `border.composite.json` | Skip as one object — bind Core width + Semantic color |
| `gradient.composite.json` | Paint styles (e.g. `Gradient/primary`) — see below |
| `motion.composite.json` (`transition`) | Skip as variables |

### Text styles (required)

For each entry in `typography.composite.json`:

1. Name: `Text/Heading 1` … `6`, `Text/Body`, `Text/Label`, `Text/Caption`, `Text/Code`.
2. **`style.description`** = the composite `$description` (e.g. `text-body — paragraphs and descriptions`).
3. **Bind Semantic variables** on the style with `textStyle.setBoundVariable(field, variable)` — do not only set raw `fontSize` / `fontName`. Fields and tokens:

| Style field | Bind to |
|-------------|---------|
| `fontFamily` | `text/style/display` (heading 1), `text/style/mono` (code), else `text/style/base` |
| `fontSize` | `text/size/*` from the composite `fontSize` ref |
| `fontWeight` | `text/weight/*` from the composite `fontWeight` ref |
| `lineHeight` | `text/leading/*` from the composite `lineHeight` ref |
| `letterSpacing` | `text/letterSpacing/*` from the composite `letterSpacing` ref |

4. Load the **current** style font and the **target** family/style before mutating. If a weight is missing (e.g. Domine has no ExtraBold), use the closest installed style (Bold) and still bind the weight variable; tell the user.
5. Site faces live in `site/src/assets/fonts/` (`Asap`, `Domine`, `IBM_Plex_Mono`) and are declared in `site/src/styles/fonts.scss`. Core `fontFamily.sans` / `serif` / `monospace` must match those `@font-face` `font-family` names (`Asap`, `Domine`, `IBM Plex Mono`).
6. **Pair `lineHeight` with `fontSize`.** Bind `text/leading/{step}` to the same semantic step as `text/size/{step}` when the leading px is **greater than** the font size. If same-step leading ≤ font size (e.g. `3xl` type 40 vs `3xl` leading 36), step **up** one leading token (`4xl`). Compact UI (`label`, `caption`, `heading 6` at `xs`) uses `text/leading/sm` so line-height is not equal to font size. Body (`md`) uses `text/leading/lg` (~1.5×). Code (`sm`) uses `text/leading/md`.

### Paint styles (gradients, required)

For each entry in `gradient.composite.json` (`primary`, `secondary`, `tertiary`):

1. Name: `Gradient/primary`, `Gradient/secondary`, `Gradient/tertiary`.
2. **`style.description`** = the composite `$description` (e.g. `gradient-primary — brand accent wash (hero, banners)`).
3. One **`GRADIENT_LINEAR`** paint. CSS in this repo is `linear-gradient(to bottom, …)` (top → bottom). Use:
   `gradientTransform: [[0, 1, 0], [-1, 0, 1]]`.
4. **Stops** from the JSON array: `position` is already 0–1. Resolve each `{color.*}` to Core (`color/blue/100`, `color/transparent`, …). Write RGBA on the stop (including `a: 0` for transparent).
5. **Bind stop colors** to those Core COLOR variables when the API allows it (`ColorStop.boundVariables.color` as `VARIABLE_ALIAS`). `setBoundVariableForPaint` only works on **solid** paints — do not use it on the gradient paint itself. If stop bindings throw, keep resolved RGBA and report the fallback.
6. Idempotency: update the existing paint style with the same name; do not duplicate. Do **not** create Variables named `gradient/*`.

## Workflow

1. Confirm target Figma `fileKey` (from URL).
2. Read **every** file in the inventory above, plus `site/src/styles/generated/tokens.css`.
3. Inspect the file (collections, variables, styles). Prefer update-in-place; if replacing a wrong architecture, remove old collections **dependents first** (Semantic-like → Core-like), using exact IDs — never delete by name prefix.
4. Ensure collections `Core` and `Semantic` exist (mode `Value`, or Light/Dark when themes exist).
5. Create/update **Core** tokens (including `border-width` and `border-style`), then **Semantic** aliases, then composite styles.
6. Validate: every planned token from the inventory exists; hyphenated border names (not camelCase); Semantic aliases resolve; WEB code syntax set; no `ALL_SCOPES`; Semantic spacing includes `WIDTH_HEIGHT`; each text style has `$description` and bound `fontFamily` / `fontSize` / `fontWeight` / `lineHeight` / `letterSpacing`; **every `lineHeight/*` and `text/leading/*` value is a number or alias — no `px` in the Figma value**; effect styles `Shadow/sm|md|lg` exist with bound color from the composite; paint styles `Gradient/primary|secondary|tertiary` exist as top-to-bottom linear gradients.
7. Summarize collections, counts by top-level group, styles created, and any fallbacks/skips.

Work in small sequential `use_figma` calls. Do not parallelize mutating Figma scripts.

## Idempotency

Before create: if a variable with the same name already exists in the target collection, update value/scopes/syntax instead of duplicating. If an old camelCase name exists (`borderWidth/100`), **rename** it to the JSON key (`border-width/100`) instead of creating a duplicate.

## Starter scope

This repo is a starter — sync **existing** example tokens only unless the user asks to expand the token set first. Expanding means editing JSON first, then syncing; do not invent Figma-only tokens.
