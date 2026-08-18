import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Load markdown / MDX from the repo's docs/ folder (one level above site/).
 * Relative path on purpose — simpler than fileURLToPath / @types/node.
 * Run npm commands from site/ (npm run dev, npm run build).
 * Use .mdx when the page needs Astro components (e.g. ColorCore).
 */
const docs = defineCollection({
	loader: glob({
		base: '../docs',
		pattern: '**/*.{md,mdx}',
	}),
	schema: z.object({
		title: z.string().optional(),
		status: z.string().optional(),
		owner: z.string().optional(),
		update: z.string().optional(),
	}),
});

export const collections = { docs };
