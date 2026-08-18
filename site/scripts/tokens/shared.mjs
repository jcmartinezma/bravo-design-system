/**
 * Shared paths and small helpers for the token build pipeline.
 *
 * Paths are anchored to this file (not process.cwd()) so the same build works:
 * - locally (`cd site && npm run …`)
 * - in CI / Netlify / Vercel (root directory = site/, or any cwd)
 * - when the Vite plugin dynamically imports the builder
 *
 * Layout assumed (repo checkout must include both folders):
 *   <repo>/site/scripts/tokens/shared.mjs  ← this file
 *   <repo>/docs/tokens/                    ← token JSON source
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Absolute path to site/scripts/tokens/ */
const TOKENS_SCRIPTS_DIR = dirname(fileURLToPath(import.meta.url));

/** Absolute path to site/ (parent of scripts/) */
export const SITE_ROOT = resolve(TOKENS_SCRIPTS_DIR, '../..');

/** Absolute path to the repo root (parent of site/) */
export const REPO_ROOT = resolve(SITE_ROOT, '..');

/** Absolute path to docs/tokens/ */
export const TOKENS_DIR = join(REPO_ROOT, 'docs', 'tokens');

export const GENERATED_DIR = join(SITE_ROOT, 'src', 'styles', 'generated');
export const DATA_DIR = join(SITE_ROOT, 'src', 'data');

export const OUT_TOKENS_CSS = join(GENERATED_DIR, 'tokens.css');
export const OUT_TEXT_STYLES_CSS = join(GENERATED_DIR, 'text-styles.css');
export const OUT_COLOR_SWATCHES = join(DATA_DIR, 'color-swatches.json');
export const OUT_TEXT_STYLES_DATA = join(DATA_DIR, 'text-styles.json');
export const OUT_SPACING_SWATCHES = join(DATA_DIR, 'spacing-swatches.json');
export const OUT_MOTION_PREVIEWS = join(DATA_DIR, 'motion-previews.json');
export const OUT_EFFECTS_PREVIEWS = join(DATA_DIR, 'effects-previews.json');

/** DTCG typography $value keys → CSS property names */
export const TYPOGRAPHY_CSS_PROPS = {
	fontFamily: 'font-family',
	fontSize: 'font-size',
	fontWeight: 'font-weight',
	lineHeight: 'line-height',
	letterSpacing: 'letter-spacing',
};

/** Keys in DTCG JSON that are metadata, not token names. */
export const META_KEYS = new Set(['$schema', '$description', '$type', '$extensions']);

/**
 * Token path segments → CSS custom-property / class pieces.
 * Letters, digits, _ and - only (blocks `;{}` breakouts in --names and style="" attrs).
 */
const SAFE_PATH_SEGMENT = /^[a-zA-Z0-9_-]+$/;

/**
 * Characters that must not appear in the *final* CSS value we write.
 * - `;` `{` `}` → break out of a declaration / rule
 * - `\` → CSS escape tricks
 * - newlines / NUL → parser confusion
 * - `</` → can close a surrounding HTML `<style>` element
 *
 * DTCG `{token.path}` embeds are resolved to var()/literals *before* this check.
 */
const UNSAFE_CSS_VALUE = /[;{}\\\n\r\f\u0000]|<\//i;

/**
 * Reject unsafe path segments before they become --var names or class selectors.
 * Throws so `astro build` fails instead of shipping injectable CSS.
 */
export function assertSafePathSegment(segment, context = 'token path') {
	const s = String(segment);
	if (!SAFE_PATH_SEGMENT.test(s)) {
		throw new Error(
			`Unsafe ${context} segment ${JSON.stringify(s)} — only letters, digits, _ and - are allowed`,
		);
	}
	return s;
}

/**
 * Reject CSS values that could inject rules or break out of `<style>`.
 * Allows normal token strings (hex, rgb(), font stacks with commas, etc.).
 */
export function assertSafeCssValue(value, context = 'token value') {
	const s = String(value);
	if (UNSAFE_CSS_VALUE.test(s)) {
		throw new Error(
			`Unsafe ${context} ${JSON.stringify(s)} — must not contain ; { } \\ newlines or </`,
		);
	}
	return s;
}

/** Turn a path segment into kebab-case for CSS: fontSize → font-size */
export function toKebab(segment) {
	return String(segment)
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.replace(/_/g, '-')
		.toLowerCase();
}

/** A "token node" is an object that has a $value (the actual value). */
export function isTokenNode(node) {
	return node !== null && typeof node === 'object' && !Array.isArray(node) && '$value' in node;
}

/** True when value is a DTCG dimension object `{ value, unit }`. */
export function isDimensionObject(value) {
	return (
		value !== null &&
		typeof value === 'object' &&
		!Array.isArray(value) &&
		'value' in value &&
		'unit' in value
	);
}

/**
 * Compare token paths with numeric steps (100 < 200 < … < 1000), not string order.
 * Fixes color.gray.1000 sorting next to color.gray.100.
 */
export function compareTokenPaths(aPath, bPath) {
	const len = Math.max(aPath.length, bPath.length);
	for (let i = 0; i < len; i++) {
		const a = aPath[i] ?? '';
		const b = bPath[i] ?? '';
		const aNum = Number(a);
		const bNum = Number(b);
		const aIsStep = a !== '' && Number.isFinite(aNum) && String(aNum) === String(a);
		const bIsStep = b !== '' && Number.isFinite(bNum) && String(bNum) === String(b);
		if (aIsStep && bIsStep && aNum !== bNum) return aNum - bNum;
		const cmp = String(a).localeCompare(String(b));
		if (cmp !== 0) return cmp;
	}
	return 0;
}

/** CSS variable name from a path: ['color', 'bg', 'primary'] → --color-bg-primary */
export function pathToCssName(path) {
	return `--${path.map((seg) => toKebab(assertSafePathSegment(seg))).join('-')}`;
}

/** Class name without leading dots: text.heading.1 → text-heading-1 */
export function tokenPathToClassName(path) {
	return path.map((seg) => toKebab(assertSafePathSegment(seg, 'class path'))).join('-');
}

export async function writeJson(file, data) {
	await mkdir(dirname(file), { recursive: true });
	await writeFile(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}
