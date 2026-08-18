/**
 * Generate tokens.css (Core + Semantic + Composite + optional dark theme).
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { compareTokenPaths, OUT_TOKENS_CSS } from './shared.mjs';
import { renderTokenLines } from './resolve.mjs';

/**
 * Write one CSS section (Core, Semantic, or Composite), sorted A→Z by variable name.
 *
 * Semantic/composite tokens that point at another token become:
 *   --color-bg-primary: var(--color-gray-25);
 * so changing the referenced value updates dependents in the browser.
 */
function renderSection(label, tokens, byPath, preferCssVar) {
	const sorted = [...tokens].sort((a, b) => compareTokenPaths(a.path, b.path));

	const lines = [`  /* ${label} */`];
	for (const token of sorted) {
		lines.push(...renderTokenLines(token, byPath, preferCssVar));
	}
	return lines;
}

/**
 * Build and write tokens.css from loaded token lists.
 * @returns {{ outFile: string }}
 */
export async function generateTokensCss({
	coreTokens,
	semanticTokens,
	compositeTokens,
	darkTokens,
	byPath,
}) {
	const lines = [
		'/**',
		' * AUTO-GENERATED from docs/tokens/ — do not edit by hand.',
		' * Run: npm run tokens:build  (or start astro; Vite regenerates on change)',
		' */',
		':root {',
		...renderSection('Core', coreTokens, byPath, false),
		'',
		...renderSection('Semantic', semanticTokens, byPath, true),
		'',
		...renderSection('Composite', compositeTokens, byPath, true),
		'}',
		'',
	];

	if (darkTokens.length > 0) {
		lines.push(
			'[data-theme="dark"] {',
			...renderSection('Theme dark (semantic overrides)', darkTokens, byPath, true),
			'}',
			'',
		);
	}

	await mkdir(dirname(OUT_TOKENS_CSS), { recursive: true });
	await writeFile(OUT_TOKENS_CSS, lines.join('\n'), 'utf8');
	return { outFile: OUT_TOKENS_CSS };
}
