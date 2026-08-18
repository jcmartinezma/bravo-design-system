/**
 * Generate text-styles.css + text-styles.json from typography composites.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import {
	OUT_TEXT_STYLES_CSS,
	OUT_TEXT_STYLES_DATA,
	TYPOGRAPHY_CSS_PROPS,
	pathToCssName,
	tokenPathToClassName,
	writeJson,
} from './shared.mjs';

/** True when token is a DTCG typography composite under the `text` group. */
function isTypographyComposite(token) {
	return token.type === 'typography' && token.path[0] === 'text';
}

/**
 * Heading composites also style the matching HTML element:
 * text.heading.1 → h1 (plus .text-heading-1). Other styles are class-only.
 */
function headingElementForPath(path) {
	if (path.length === 3 && path[0] === 'text' && path[1] === 'heading') {
		const level = Number(path[2]);
		if (level >= 1 && level <= 6) return `h${level}`;
	}
	return null;
}

/**
 * Build text-styles.css rules and a catalog for the TextStyles docs component.
 * Each rule uses var(--token-subprop) so values stay linked to tokens.css.
 */
function buildTextStylesOutputs(compositeTokens) {
	const typographyTokens = compositeTokens
		.filter(isTypographyComposite)
		.sort((a, b) => pathToCssName(a.path).localeCompare(pathToCssName(b.path)));

	const cssBlocks = [
		'/**',
		' * AUTO-GENERATED from docs/tokens/composite/typography.composite.json',
		' * Do not edit by hand. Run: npm run tokens:build',
		' *',
		' * Loaded before site SCSS (main.scss) so src/styles/*.scss can override',
		' * (e.g. change h1 color on the docs site without editing this file).',
		' */',
		'',
	];

	const catalog = [];

	for (const token of typographyTokens) {
		const className = tokenPathToClassName(token.path);
		const element = headingElementForPath(token.path);
		const selectors = element ? `${element},\n.${className}` : `.${className}`;
		const value = token.value && typeof token.value === 'object' ? token.value : {};

		const declarations = [];
		const properties = [];
		for (const [key, cssProp] of Object.entries(TYPOGRAPHY_CSS_PROPS)) {
			if (!(key in value)) continue;
			const cssVar = pathToCssName([...token.path, key]);
			declarations.push(`  ${cssProp}: var(${cssVar});`);
			properties.push({ key, cssProp, cssVar });
		}

		cssBlocks.push(`/* ${token.path.join('.')} */`);
		cssBlocks.push(`${selectors} {`);
		cssBlocks.push(...declarations);
		cssBlocks.push('}');
		cssBlocks.push('');

		catalog.push({
			tokenName: token.path.join('.'),
			className,
			element,
			description: token.description || '',
			properties,
		});
	}

	return {
		css: cssBlocks.join('\n'),
		catalog: { styles: catalog },
	};
}

/**
 * Write text-styles.css and text-styles.json.
 * @returns {{ textStyleCount: number, cssFile: string, dataFile: string }}
 */
export async function generateTextStyles(compositeTokens) {
	const textStyles = buildTextStylesOutputs(compositeTokens);

	await mkdir(dirname(OUT_TEXT_STYLES_CSS), { recursive: true });
	await writeFile(OUT_TEXT_STYLES_CSS, textStyles.css, 'utf8');
	await writeJson(OUT_TEXT_STYLES_DATA, textStyles.catalog);

	return {
		textStyleCount: textStyles.catalog.styles.length,
		cssFile: OUT_TEXT_STYLES_CSS,
		dataFile: OUT_TEXT_STYLES_DATA,
	};
}
