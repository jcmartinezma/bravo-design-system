// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { dsTokensPlugin } from './scripts/ds-tokens-plugin.mjs';

/**
 * Astro config for the docs site.
 *
 * - MDX: docs can embed Astro components (e.g. ColorCore / ColorSemantic).
 * - dsTokensPlugin: turns docs/tokens JSON into CSS variables on every
 *   build/dev start, and again when those JSON files change.
 */
export default defineConfig({
	integrations: [mdx()],
	vite: {
		plugins: [dsTokensPlugin()],
	},
});
