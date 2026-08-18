/**
 * Resolve DTCG references and format values for CSS output.
 */

import { assertSafeCssValue, isDimensionObject, pathToCssName } from './shared.mjs';

/** Dimension units we emit (px, rem, ms, %, …). Blocks `px; } .evil {`. */
const SAFE_DIMENSION_UNIT = /^[a-z%]+$/i;

/** Embedded `{token.path}` inside a longer string (e.g. color-mix). */
const EMBEDDED_REF = /\{([a-zA-Z0-9_.-]+)\}/g;

/**
 * Turn a DTCG $value into a CSS value string (after refs are resolved).
 * Handles plain strings, numbers, { value, unit } dimensions, and cubic-bezier arrays.
 * Rejects values that could inject extra CSS rules or break out of HTML `<style>`.
 */
export function formatCssValue(value) {
	if (typeof value === 'number' || typeof value === 'boolean') {
		return String(value);
	}
	if (typeof value === 'string') {
		return assertSafeCssValue(value);
	}
	if (Array.isArray(value) && value.length === 4 && value.every((n) => typeof n === 'number')) {
		return `cubic-bezier(${value.join(', ')})`;
	}
	if (isDimensionObject(value)) {
		if (typeof value.value !== 'number' || !Number.isFinite(value.value)) {
			throw new Error(`Unsafe dimension value: ${JSON.stringify(value.value)}`);
		}
		if (typeof value.unit !== 'string' || !SAFE_DIMENSION_UNIT.test(value.unit)) {
			throw new Error(`Unsafe dimension unit: ${JSON.stringify(value.unit)}`);
		}
		return `${value.value}${value.unit}`;
	}
	return assertSafeCssValue(String(value), 'fallback token value');
}

/**
 * If value is a single reference like "{color.gray.100}", return "color.gray.100".
 * Only dotted paths of safe segments — blocks `{foo};bar{…}` style tricks.
 */
export function getReference(value) {
	if (typeof value !== 'string') return null;
	const match = value.match(/^\{([a-zA-Z0-9_.-]+)\}$/);
	return match ? match[1] : null;
}

/**
 * Follow {references} until we reach a real value (hex, px, etc.).
 * Used when we need the final number for core tokens.
 */
export function resolveValue(raw, byPath, seen = new Set()) {
	const ref = getReference(raw);
	if (!ref) return raw;
	if (seen.has(ref)) {
		throw new Error(`Circular token reference: ${[...seen, ref].join(' → ')}`);
	}
	seen.add(ref);
	const target = byPath.get(ref);
	if (!target) throw new Error(`Unresolved token reference: {${ref}}`);
	return resolveValue(target.value, byPath, seen);
}

/**
 * Replace `{token.path}` embeds with var(--…) or concrete CSS, then sanitize.
 * Used for full-string refs and strings like color-mix(..., {color.gray.1000}, ...).
 */
function resolveCssString(raw, byPath, preferCssVar) {
	const sole = getReference(raw);
	if (sole) {
		if (preferCssVar && byPath.has(sole)) {
			return `var(${pathToCssName(sole.split('.'))})`;
		}
		return formatCssValue(resolveValue(raw, byPath));
	}

	if (!raw.includes('{')) {
		return formatCssValue(raw);
	}

	const replaced = raw.replace(EMBEDDED_REF, (_match, refPath) => {
		if (!byPath.has(refPath)) {
			throw new Error(`Unresolved token reference: {${refPath}}`);
		}
		if (preferCssVar) {
			return `var(${pathToCssName(refPath.split('.'))})`;
		}
		return formatCssValue(resolveValue(`{${refPath}}`, byPath));
	});

	// Any leftover `{` / `}` means a malformed / malicious brace, not a token ref.
	return assertSafeCssValue(replaced);
}

/** Resolve one sub-value for CSS: prefer var(--…) for references when requested. */
export function resolveCssSubValue(raw, byPath, preferCssVar) {
	if (typeof raw === 'string') {
		return resolveCssString(raw, byPath, preferCssVar);
	}
	return formatCssValue(resolveValue(raw, byPath));
}

/** CSS box-shadow from a DTCG shadow object (or list of them). */
export function formatShadowCss(value, byPath, preferCssVar) {
	const layers = Array.isArray(value) ? value : [value];
	return layers
		.map((layer) => {
			const inset = layer.inset ? 'inset ' : '';
			const x = resolveCssSubValue(layer.offsetX, byPath, preferCssVar);
			const y = resolveCssSubValue(layer.offsetY, byPath, preferCssVar);
			const blur = resolveCssSubValue(layer.blur, byPath, preferCssVar);
			const spread = resolveCssSubValue(layer.spread, byPath, preferCssVar);
			const color = resolveCssSubValue(layer.color, byPath, preferCssVar);
			return `${inset}${x} ${y} ${blur} ${spread} ${color}`;
		})
		.join(', ');
}

/** CSS transition shorthand from a DTCG transition object. */
export function formatTransitionCss(value, byPath, preferCssVar) {
	const duration = resolveCssSubValue(value.duration, byPath, preferCssVar);
	const delay = resolveCssSubValue(value.delay, byPath, preferCssVar);
	const easing = resolveCssSubValue(value.timingFunction, byPath, preferCssVar);
	return `${duration} ${delay} ${easing}`;
}

/** CSS border shorthand from a DTCG border object. */
export function formatBorderCss(value, byPath, preferCssVar) {
	const width = resolveCssSubValue(value.width, byPath, preferCssVar);
	const style = resolveCssSubValue(value.style, byPath, preferCssVar);
	const color = resolveCssSubValue(value.color, byPath, preferCssVar);
	return `${width} ${style} ${color}`;
}

/**
 * CSS linear-gradient from a DTCG gradient (array of { color, position }).
 * Position is 0–1 in the spec; we emit percentages. Direction defaults to to bottom.
 */
export function formatGradientCss(value, byPath, preferCssVar) {
	const stops = Array.isArray(value) ? value : [value];
	const parts = stops.map((stop) => {
		const color = resolveCssSubValue(stop.color, byPath, preferCssVar);
		const position = resolveValue(stop.position, byPath);
		const pct =
			typeof position === 'number'
				? `${Math.min(1, Math.max(0, position)) * 100}%`
				: formatCssValue(position);
		return `${color} ${pct}`;
	});
	return `linear-gradient(to bottom, ${parts.join(', ')})`;
}

/**
 * Emit CSS custom-property lines for one flattened token.
 * Composite types expand (typography → sub-properties; shadow/border/transition/gradient → shorthand).
 */
export function renderTokenLines(token, byPath, preferCssVar) {
	const name = pathToCssName(token.path);
	const { value, type } = token;
	const lines = [];

	if (type === 'typography' && value && typeof value === 'object' && !isDimensionObject(value)) {
		for (const [key, sub] of Object.entries(value)) {
			const subName = pathToCssName([...token.path, key]);
			lines.push(`  ${subName}: ${resolveCssSubValue(sub, byPath, preferCssVar)};`);
		}
		return lines;
	}

	if (type === 'shadow') {
		lines.push(`  ${name}: ${formatShadowCss(value, byPath, preferCssVar)};`);
		return lines;
	}

	if (type === 'transition') {
		lines.push(`  ${name}: ${formatTransitionCss(value, byPath, preferCssVar)};`);
		return lines;
	}

	if (type === 'border') {
		lines.push(`  ${name}: ${formatBorderCss(value, byPath, preferCssVar)};`);
		return lines;
	}

	if (type === 'gradient') {
		lines.push(`  ${name}: ${formatGradientCss(value, byPath, preferCssVar)};`);
		return lines;
	}

	// Fallback: composite-shaped object without $type — expand keys (avoid [object Object]).
	if (
		value &&
		typeof value === 'object' &&
		!Array.isArray(value) &&
		!isDimensionObject(value) &&
		!getReference(value)
	) {
		for (const [key, sub] of Object.entries(value)) {
			const subName = pathToCssName([...token.path, key]);
			lines.push(`  ${subName}: ${resolveCssSubValue(sub, byPath, preferCssVar)};`);
		}
		return lines;
	}

	lines.push(`  ${name}: ${resolveCssSubValue(value, byPath, preferCssVar)};`);
	return lines;
}
