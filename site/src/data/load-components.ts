/**
 * Discover component folders that have both metadata.json and spec.md.
 * Folders starting with _ (e.g. _template) and incomplete folders are skipped
 * so deleting a component folder removes it from the site without a build error.
 */

export type ComponentMetadata = {
	identification?: {
		name?: string;
		nodeId?: string;
		componentKey?: string;
		fileKey?: string;
	};
	metadata?: {
		description?: string;
	};
};

const metadataFiles = import.meta.glob<ComponentMetadata>(
	'../../../docs/components/*/metadata.json',
	{ eager: true, import: 'default' },
);

const specFiles = import.meta.glob('../../../docs/components/*/spec.md', {
	eager: true,
	query: '?raw',
	import: 'default',
});

function folderSlug(filePath: string) {
	const match = filePath.match(/\/components\/([^/]+)\//);
	return match?.[1] ?? '';
}

const specSlugs = new Set(
	Object.keys(specFiles)
		.map(folderSlug)
		.filter((slug) => slug && !slug.startsWith('_')),
);

export const components = Object.entries(metadataFiles)
	.flatMap(([filePath, metadata]) => {
		const slug = folderSlug(filePath);
		if (!slug || slug.startsWith('_') || !specSlugs.has(slug)) return [];
		return [{ slug, metadata: metadata ?? {} }];
	})
	.sort((a, b) => a.slug.localeCompare(b.slug));

export const componentNavItems = components.map(({ slug, metadata }) => ({
	label: metadata.identification?.name || slug,
	href: `/components/${slug}`,
}));

export function figmaEmbedUrl(metadata: ComponentMetadata) {
	const fileKey = metadata.identification?.fileKey;
	const nodeId = metadata.identification?.nodeId;
	if (!fileKey || !nodeId) return '';
	const node = String(nodeId).replace(/:/g, '-');
	const fileUrl = `https://www.figma.com/design/${fileKey}?node-id=${node}`;
	return `https://www.figma.com/embed?embed_host=astro&url=${encodeURIComponent(fileUrl)}`;
}
