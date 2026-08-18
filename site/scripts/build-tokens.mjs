/**
 * Token build script (orchestrator)
 * =================================
 *
 * WHAT THIS DOES
 * --------------
 * Reads design tokens from docs/tokens/ and writes:
 *   site/src/styles/generated/tokens.css
 *   site/src/styles/generated/text-styles.css
 *   site/src/data/*-swatches.json / *-previews.json / text-styles.json
 *
 * Modules under scripts/tokens/:
 *   shared.mjs              — paths + small helpers
 *   load.mjs                — read / merge / flatten JSON
 *   resolve.mjs             — references + CSS value formatting
 *   generate-css.mjs        — tokens.css
 *   generate-text-styles.mjs— text-styles.css + catalog JSON
 *   generate-previews.mjs   — color / spacing / motion / effects JSON
 *
 * HOW TO RUN
 * ----------
 *   cd site && npm run tokens:build
 * Or start/build the site — the Vite plugin calls this for you.
 *
 * Paths are file-anchored (see tokens/shared.mjs), so this also works when CI
 * or a host runs the build with a different cwd. The repo checkout must include
 * both site/ and docs/ (tokens are read at build time; the server only serves dist/).
 *
 * DO NOT edit files under styles/generated/ or the generated data JSON.
 * Edit the JSON under docs/tokens/ instead.
 */

import { relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { REPO_ROOT } from './tokens/shared.mjs';
import { loadAllTokens } from './tokens/load.mjs';
import { generateTokensCss } from './tokens/generate-css.mjs';
import { generateTextStyles } from './tokens/generate-text-styles.mjs';
import { generatePreviews } from './tokens/generate-previews.mjs';

/**
 * Build generated CSS + docs JSON from docs/tokens.
 * Called by `npm run tokens:build` and by the Vite plugin on start / watch.
 */
export async function buildTokens() {
	const tokens = await loadAllTokens();
	const { coreTokens, semanticTokens, compositeTokens, darkTokens } = tokens;

	const css = await generateTokensCss(tokens);
	const textStyles = await generateTextStyles(compositeTokens);
	const previews = await generatePreviews(tokens);

	return {
		count: coreTokens.length + semanticTokens.length + compositeTokens.length,
		coreCount: coreTokens.length,
		semanticCount: semanticTokens.length,
		compositeCount: compositeTokens.length,
		darkCount: darkTokens.length,
		textStyleCount: textStyles.textStyleCount,
		outFile: relative(REPO_ROOT, css.outFile),
		textStylesCssFile: relative(REPO_ROOT, textStyles.cssFile),
		swatchesFile: relative(REPO_ROOT, previews.colorFile),
		textStylesDataFile: relative(REPO_ROOT, textStyles.dataFile),
		spacingFile: relative(REPO_ROOT, previews.spacingFile),
		motionFile: relative(REPO_ROOT, previews.motionFile),
		effectsFile: relative(REPO_ROOT, previews.effectsFile),
	};
}

// Allow: node scripts/build-tokens.mjs
const isCli = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isCli) {
	const result = await buildTokens();
	console.log(
		`Wrote ${result.count} tokens (${result.coreCount} core, ${result.semanticCount} semantic, ${result.compositeCount} composite` +
			(result.darkCount ? `, ${result.darkCount} dark overrides` : '') +
			`) → ${result.outFile}`,
	);
	console.log(
		`Wrote ${result.textStyleCount} text styles → ${result.textStylesCssFile}, catalog → ${result.textStylesDataFile}`,
	);
	console.log(`Wrote color swatches → ${result.swatchesFile}`);
	console.log(`Wrote spacing swatches → ${result.spacingFile}`);
	console.log(`Wrote motion previews → ${result.motionFile}`);
	console.log(`Wrote effects previews → ${result.effectsFile}`);
}
