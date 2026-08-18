## Docs site

From the `site/` folder:

```sh
npm install
npm run dev
```

### Tokens and the site

Edit design tokens under `docs/tokens/` (repo root, sibling of `site/`). When you run `dev` or `build`, the site regenerates CSS and preview data automatically into:

- `src/styles/generated/` — `tokens.css`, `text-styles.css` (do not edit)
- `src/data/color-swatches.json`, `src/data/text-styles.json` (do not edit)

Editable site styles live in `src/styles/*.scss` and load **after** generated files, so you can override design-system defaults (for example change `h1` color on the docs site).

You can also rebuild tokens alone:

```sh
npm run tokens:build
```

For production deploys, set the host’s project root to `site/` and run `npm run build`. Token paths are resolved from the script location (not the shell cwd), but the checkout must still include `docs/` next to `site/` — generation happens at build time; the server only needs `dist/`.

### Previews in MDX

Use a `.mdx` file under `docs/` when the page needs live previews. Embed:

```mdx
<ColorCore />
<ColorSemantic />
<TextStyles />
<SpacingCore />
<SpacingSemantic />
<MotionSwatches />
<EffectsSwatches />
```

No import is required in the doc file; the site maps those components for you.

### Content

Markdown / MDX under `../docs/` becomes pages on this site, except **components**. Each folder `../docs/components/{name}/` with both `metadata.json` and `spec.md` becomes `/components/{name}` (template: `src/pages/components/[slug].astro`). Folders starting with `_` (including `_template`) and incomplete folders are skipped — deleting a component folder removes it from the site without a build error.

Use the **sidebar** to navigate. Component links are generated automatically; other sections are listed in `src/data/nav.ts`.

Internal links between docs omit the `.md` / `.mdx` extension so they match site routes (e.g. `../foundations/tokens`, not `tokens.md`). Links to root files such as `AGENTS.md` are for the repo/GitHub and will not resolve on the site. Template files (`_template.md`, `components/_template/`) are not published as pages.

## Documentation

- Design system docs (content): `../docs/`
- Agent onboarding (design system usage): `../AGENTS.md`
- Astro docs: https://docs.astro.build
