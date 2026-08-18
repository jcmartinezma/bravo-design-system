/**
 * Generate docs-site preview JSON (color, spacing, motion, effects).
 * Shared display helpers live here so each gallery does not duplicate logic.
 */

import {
	OUT_COLOR_SWATCHES,
	OUT_EFFECTS_PREVIEWS,
	OUT_MOTION_PREVIEWS,
	OUT_SPACING_SWATCHES,
	compareTokenPaths,
	isDimensionObject,
	pathToCssName,
	writeJson,
} from './shared.mjs';
import {
	formatGradientCss,
	formatShadowCss,
	formatTransitionCss,
	getReference,
	resolveCssSubValue,
} from './resolve.mjs';

// --- Shared display helpers ------------------------------------------------

function formatSwatchDisplayValue(token, byPath, preferReference) {
	const ref = getReference(token.value);
	if (preferReference && ref) return `→ ${ref}`;
	return resolveCssSubValue(token.value, byPath, false);
}

function toSwatch(token, byPath, { preferReference = false, darkByPath = null } = {}) {
	const displayValue = formatSwatchDisplayValue(token, byPath, preferReference);
	const swatch = {
		tokenName: token.path.join('.'),
		cssName: pathToCssName(token.path),
		displayValue,
	};

	if (darkByPath) {
		const darkToken = darkByPath.get(token.path.join('.'));
		swatch.displayValueDark = darkToken
			? formatSwatchDisplayValue(darkToken, byPath, preferReference)
			: displayValue;
	}

	return swatch;
}

/**
 * Generic preview row for spacing / motion / effects galleries.
 * preferReference: show → path for semantic aliases (like color semantic).
 */
function toPreviewToken(token, byPath, { preferReference = false } = {}) {
	const ref = getReference(token.value);
	let displayValue;

	if (preferReference && ref) {
		displayValue = `→ ${ref}`;
	} else if (token.type === 'shadow') {
		displayValue = formatShadowCss(token.value, byPath, false);
	} else if (token.type === 'gradient') {
		displayValue = formatGradientCss(token.value, byPath, false);
	} else if (token.type === 'transition') {
		displayValue = formatTransitionCss(token.value, byPath, false);
	} else if (
		token.value &&
		typeof token.value === 'object' &&
		!Array.isArray(token.value) &&
		!isDimensionObject(token.value) &&
		!getReference(token.value)
	) {
		displayValue = 'composite';
	} else {
		displayValue = resolveCssSubValue(token.value, byPath, false);
	}

	return {
		tokenName: token.path.join('.'),
		cssName: pathToCssName(token.path),
		displayValue,
		description: token.description || '',
		type: token.type || null,
	};
}

function sortPreviews(items) {
	return [...items].sort((a, b) =>
		compareTokenPaths(a.tokenName.split('.'), b.tokenName.split('.')),
	);
}

/**
 * Group color tokens by path segment at `groupIndex` (e.g. 1 = gray / bg).
 * Returns [{ name, swatches }] sorted A→Z by group name; steps ordered numerically.
 */
function groupColorSwatches(tokens, byPath, groupIndex, options) {
	const groups = new Map();
	for (const token of tokens) {
		if (token.path[0] !== 'color') continue;
		const name = token.path[groupIndex] ?? 'other';
		if (!groups.has(name)) groups.set(name, []);
		groups.get(name).push({ token, swatch: toSwatch(token, byPath, options) });
	}

	return [...groups.entries()]
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([name, items]) => ({
			name,
			swatches: [...items]
				.sort((a, b) => compareTokenPaths(a.token.path, b.token.path))
				.map((item) => item.swatch),
		}));
}

// --- Per-gallery builders --------------------------------------------------

function buildColorSwatches(coreTokens, semanticTokens, darkTokens, byPath) {
	return {
		core: groupColorSwatches(coreTokens, byPath, 1, { preferReference: false }),
		semantic: groupColorSwatches(semanticTokens, byPath, 1, {
			preferReference: true,
			darkByPath: new Map(darkTokens.map((t) => [t.path.join('.'), t])),
		}),
	};
}

function buildSpacingPreviews(coreTokens, semanticTokens, byPath) {
	const core = sortPreviews(
		coreTokens
			.filter((t) => t.path[0] === 'spacing')
			.map((t) => toPreviewToken(t, byPath, { preferReference: false })),
	);
	// Order by referenced core step (xs→100 … 16xl→2000), not name alphabet (10xl before 2xl).
	const semantic = semanticTokens
		.filter((t) => t.path[0] === 'spacing')
		.sort((a, b) => {
			const aRef = getReference(a.value);
			const bRef = getReference(b.value);
			if (aRef && bRef) {
				return compareTokenPaths(aRef.split('.'), bRef.split('.'));
			}
			return compareTokenPaths(a.path, b.path);
		})
		.map((t) => toPreviewToken(t, byPath, { preferReference: true }));
	return { core, semantic };
}

function buildMotionPreviews(coreTokens, semanticTokens, compositeTokens, byPath) {
	const duration = sortPreviews(
		coreTokens
			.filter((t) => t.path[0] === 'duration')
			.map((t) => toPreviewToken(t, byPath, { preferReference: false })),
	);
	const delay = sortPreviews(
		coreTokens
			.filter((t) => t.path[0] === 'delay')
			.map((t) => toPreviewToken(t, byPath, { preferReference: false })),
	);
	const speed = sortPreviews(
		semanticTokens
			.filter((t) => t.path[0] === 'motion' && t.path[1] === 'speed')
			.map((t) => toPreviewToken(t, byPath, { preferReference: true })),
	);
	const easing = sortPreviews(
		semanticTokens
			.filter((t) => t.path[0] === 'motion' && t.path[1] === 'easing')
			.map((t) => toPreviewToken(t, byPath, { preferReference: false })),
	);
	const transition = sortPreviews(
		compositeTokens
			.filter((t) => t.type === 'transition')
			.map((t) => toPreviewToken(t, byPath, { preferReference: false })),
	);
	return { duration, delay, speed, easing, transition };
}

function buildEffectsPreviews(compositeTokens, byPath) {
	const shadows = sortPreviews(
		compositeTokens
			.filter((t) => t.type === 'shadow')
			.map((t) => toPreviewToken(t, byPath, { preferReference: false })),
	);
	const gradients = sortPreviews(
		compositeTokens
			.filter((t) => t.type === 'gradient')
			.map((t) => toPreviewToken(t, byPath, { preferReference: false })),
	);
	return { shadows, gradients };
}

/**
 * Write all docs preview JSON files used by foundation MDX components.
 */
export async function generatePreviews({
	coreTokens,
	semanticTokens,
	compositeTokens,
	darkTokens,
	byPath,
}) {
	await writeJson(
		OUT_COLOR_SWATCHES,
		buildColorSwatches(coreTokens, semanticTokens, darkTokens, byPath),
	);
	await writeJson(OUT_SPACING_SWATCHES, buildSpacingPreviews(coreTokens, semanticTokens, byPath));
	await writeJson(
		OUT_MOTION_PREVIEWS,
		buildMotionPreviews(coreTokens, semanticTokens, compositeTokens, byPath),
	);
	await writeJson(OUT_EFFECTS_PREVIEWS, buildEffectsPreviews(compositeTokens, byPath));

	return {
		colorFile: OUT_COLOR_SWATCHES,
		spacingFile: OUT_SPACING_SWATCHES,
		motionFile: OUT_MOTION_PREVIEWS,
		effectsFile: OUT_EFFECTS_PREVIEWS,
	};
}
