/**
 * Sidebar navigation for the docs site.
 * Paths match content collection ids (relative to docs/, without .md).
 * Components are listed from docs/components folders (see load-components.ts).
 */
import { componentNavItems } from './load-components';

export const navSections = [
	{
		items: [
			{ label: 'Get started', href: '/getting-started' },
		],
	},
	{
		label: 'Vision',
		items: [
			{ label: 'Design principles', href: '/vision/design-principles' },
			{ label: 'Agentic workflow', href: '/vision/agentic-workflow' },
			{ label: 'Voice and tone', href: '/vision/voice-and-tone' },
			{ label: 'Writing guidelines', href: '/vision/writing-guidelines' },
		],
	},
	{
		label: 'Foundations',
		items: [
			{ label: 'Tokens', href: '/foundations/tokens' },
			{ label: 'Color', href: '/foundations/color' },
			{ label: 'Typography', href: '/foundations/typography' },
			{ label: 'Spacing', href: '/foundations/spacing' },
			{ label: 'Effects', href: '/foundations/effects' },
			{ label: 'Motion', href: '/foundations/motion' },
			{ label: 'Accessibility', href: '/foundations/accessibility' },
		],
	},
	{
		label: 'Components',
		items: componentNavItems,
	},
	{
		label: 'Patterns',
		items: [
			{ label: 'Empty state (example)', href: '/patterns/example-empty-state' },
		],
	},
	{
		label: 'Governance',
		items: [
			{ label: 'Contribution model', href: '/governance/contribution-model' },
			{ label: 'Versioning', href: '/governance/versioning' },
			{ label: 'Quality bar', href: '/governance/quality-bar' },
			{ label: 'Decisions backlog', href: '/governance/decisions-backlog' },
		],
	}
];
