/**
 * Vite plugin: keep site CSS + preview JSON in sync with docs/tokens
 * ==================================================================
 *
 * WHY THIS EXISTS
 * ---------------
 * The site styles use CSS variables generated from docs/tokens/*.json.
 * Preview components read site/src/data/*.json from the same build.
 * Without this plugin you would have to remember to run
 * `npm run tokens:build` every time you change a token.
 *
 * WHAT IT DOES
 * ------------
 * 1. Early in Vite config (`config` hook) → run buildTokens() so
 *    `styles/generated/*.css` exist BEFORE PostCSS resolves @imports.
 * 2. Again on `buildStart` (build / prerender). Failures here abort the
 *    production build so a broken token pipeline cannot ship silently.
 * 3. While `astro dev` runs → watch docs/tokens JSON and rebuild + reload.
 *
 * Deploy note: token generation runs at build time (CI / host). The static
 * `dist/` output does not need docs/tokens at runtime on the server — but the
 * full repo (site/ + docs/) must be present when `astro build` runs.
 *
 * IMPORTANT
 * ---------
 * build-tokens.mjs is loaded with a cache-busting dynamic import on every run.
 * A static import would freeze the builder in memory for the whole `astro dev`
 * session — after updating the script, watch rebuilds could keep writing an
 * old tokens.css and wipe newer sections.
 */

import { relative, resolve, dirname, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { TOKENS_DIR } from './tokens/shared.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BUILDER_URL = pathToFileURL(resolve(__dirname, './build-tokens.mjs')).href;

/** Editors often save as truncate → write; wait before reading JSON. */
const WATCH_DEBOUNCE_MS = 120;
/** Retries when JSON is briefly empty/invalid mid-save (load.mjs also retries). */
const BUILD_RETRIES = 2;
const BUILD_RETRY_MS = 80;

function sleep(ms) {
	return new Promise((resolveSleep) => setTimeout(resolveSleep, ms));
}

/**
 * True only for .json files that resolve under docs/tokens/ (path containment).
 * Avoids triggering rebuilds from unrelated paths that merely contain the string.
 */
function isTokenJsonFile(file) {
	const resolved = resolve(file);
	const rel = relative(TOKENS_DIR, resolved);
	if (!rel || rel.startsWith(`..${sep}`) || rel === '..') return false;
	if (rel.split(/[/\\]/).includes('..')) return false;
	return rel.endsWith('.json');
}

export function dsTokensPlugin() {
	let building = false;
	/** Another change arrived while a build was running — rebuild once more. */
	let pendingReason = null;
	let debounceTimer = null;
	/** Share one in-flight build so config + buildStart do not race. */
	let lastRun = null;

	async function loadBuilder() {
		// Query param busts Node's ESM cache so script edits apply without restart.
		// file:// URL loads the source on disk (not a Vite-bundled copy), so
		// import.meta.url paths inside the builder stay correct in CI/deploy.
		return import(`${BUILDER_URL}?t=${Date.now()}`);
	}

	async function buildOnce() {
		const { buildTokens } = await loadBuilder();
		let lastError;
		for (let attempt = 1; attempt <= BUILD_RETRIES; attempt++) {
			try {
				return await buildTokens();
			} catch (err) {
				lastError = err;
				const msg = String(err?.message ?? err);
				const maybeMidSave =
					err instanceof SyntaxError ||
					msg.includes('Unexpected end of JSON') ||
					msg.includes('Unexpected token');
				if (!maybeMidSave || attempt === BUILD_RETRIES) throw err;
				await sleep(BUILD_RETRY_MS * attempt);
			}
		}
		throw lastError;
	}

	/**
	 * @param {string} reason
	 * @param {{ fatal?: boolean }} [opts] — when fatal, rethrow so `astro build` fails
	 */
	async function run(reason, { fatal = false } = {}) {
		if (building) {
			pendingReason = reason;
			return lastRun;
		}
		building = true;
		pendingReason = null;
		const work = (async () => {
			let result = null;
			try {
				result = await buildOnce();
				console.log(
					`[ds-tokens] ${reason}: ${result.count} tokens ` +
						`(${result.coreCount} core, ${result.semanticCount} semantic, ${result.compositeCount} composite), ` +
						`${result.textStyleCount} text styles → ${result.outFile}`,
				);
			} catch (err) {
				console.error('[ds-tokens] build failed:', err);
				if (fatal) throw err;
			} finally {
				building = false;
				if (pendingReason) {
					const next = pendingReason;
					pendingReason = null;
					const pendingResult = await run(next, { fatal });
					if (pendingResult) result = pendingResult;
				}
			}
			return result;
		})();
		lastRun = work;
		return work;
	}

	function scheduleWatch(server) {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			// Watch failures should not kill the dev server.
			run('watch', { fatal: false }).then((result) => {
				if (result) server.ws.send({ type: 'full-reload' });
			});
		}, WATCH_DEBOUNCE_MS);
	}

	return {
		name: 'ds-tokens',
		// Run before other plugins so generated CSS is on disk for @import.
		enforce: 'pre',

		/**
		 * Vite resolves CSS imports very early. Generate here first so
		 * `@import './generated/tokens.css'` never hits ENOENT on cold start.
		 * Fatal: a failed token build must not produce a deployable site.
		 */
		async config() {
			await run('config', { fatal: true });
		},

		async buildStart() {
			await run('build', { fatal: true });
		},

		// Only used in `astro dev`: watch token JSON and rebuild + reload.
		configureServer(server) {
			server.watcher.add(TOKENS_DIR);
			server.watcher.on('change', (file) => {
				if (!isTokenJsonFile(file)) return;
				scheduleWatch(server);
			});
		},
	};
}
