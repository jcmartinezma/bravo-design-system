/**
 * Load and flatten DTCG token JSON from docs/tokens/.
 */

import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { META_KEYS, TOKENS_DIR, isTokenNode } from './shared.mjs';

/** Find every .json file under a folder (including nested folders). */
async function loadJsonFiles(dir) {
	const entries = await readdir(dir, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await loadJsonFiles(path)));
		} else if (entry.name.endsWith('.json')) {
			files.push(path);
		}
	}
	return files;
}

/**
 * Read + parse one token JSON file.
 * Retries briefly when the editor has truncated the file mid-save (empty / invalid JSON).
 */
async function readTokenJson(file, attempts = 3) {
	let lastError;
	for (let i = 1; i <= attempts; i++) {
		try {
			const raw = await readFile(file, 'utf8');
			if (!raw.trim()) {
				throw new SyntaxError(`Empty token file (mid-save?): ${file}`);
			}
			return JSON.parse(raw);
		} catch (err) {
			lastError = err;
			if (i === attempts) break;
			await new Promise((r) => setTimeout(r, 40 * i));
		}
	}
	throw lastError;
}

/** Shallow-deep merge: combine nested objects, skip metadata keys. */
function mergeInto(target, source) {
	for (const [key, value] of Object.entries(source)) {
		if (META_KEYS.has(key)) continue;
		const bothObjects =
			value &&
			typeof value === 'object' &&
			!Array.isArray(value) &&
			!isTokenNode(value) &&
			target[key] &&
			typeof target[key] === 'object' &&
			!isTokenNode(target[key]);
		if (bothObjects) {
			mergeInto(target[key], value);
		} else {
			target[key] = value;
		}
	}
}

/** Merge several JSON token files into one tree object. */
async function loadTokenTree(subdir) {
	const files = await loadJsonFiles(join(TOKENS_DIR, subdir));
	const tree = {};
	for (const file of files) {
		const json = await readTokenJson(file);
		mergeInto(tree, json);
	}
	return tree;
}

/**
 * Walk the token tree and return a flat list:
 *   { path: ['color', 'gray', '25'], value: '#FCFCFD', type: 'color' }
 *
 * $root means "default state" — we skip the $root name so
 * color.bg.primary.$root → path ['color', 'bg', 'primary'].
 * $type on a group is inherited by child tokens (DTCG).
 */
export function flattenTokens(node, path = [], out = [], inheritedType) {
	if (!node || typeof node !== 'object' || Array.isArray(node)) return out;

	if (isTokenNode(node)) {
		out.push({
			path: [...path],
			value: node.$value,
			type: node.$type ?? inheritedType,
			description: typeof node.$description === 'string' ? node.$description : '',
		});
		return out;
	}

	const nextType = typeof node.$type === 'string' ? node.$type : inheritedType;

	for (const [key, child] of Object.entries(node)) {
		if (META_KEYS.has(key)) continue;
		if (key === '$root') {
			flattenTokens(child, path, out, nextType);
		} else {
			flattenTokens(child, [...path, key], out, nextType);
		}
	}
	return out;
}

/** Optional theme mode (e.g. theme/dark). Missing folder → empty list (light-only). */
async function loadThemeModeTokens(mode) {
	try {
		return flattenTokens(await loadTokenTree(join('theme', mode)));
	} catch (err) {
		if (err && err.code === 'ENOENT') return [];
		throw err;
	}
}

/** Load core + semantic + composite + dark theme tokens and a path→token map. */
export async function loadAllTokens() {
	const coreTokens = flattenTokens(await loadTokenTree('core'));
	const semanticTokens = flattenTokens(await loadTokenTree('semantic'));
	const compositeTokens = flattenTokens(await loadTokenTree('composite'));
	const darkTokens = await loadThemeModeTokens('dark');
	const byPath = new Map(
		[...coreTokens, ...semanticTokens, ...compositeTokens].map((t) => [t.path.join('.'), t]),
	);
	return { coreTokens, semanticTokens, compositeTokens, darkTokens, byPath };
}
