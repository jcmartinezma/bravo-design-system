import type { Preview } from '@storybook/react';

import '../src/styles/tokens.css';
import '../src/styles/tokens.dark.css';
import '../src/styles/fonts.css';
import './preview.css';

import { DocsContainer } from './DocsContainer';
import { bravoThemeLight } from './theme';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      container: DocsContainer,
      theme: bravoThemeLight,
    },
    backgrounds: {
      disabled: true,
    },
    layout: 'centered',
  },
  globalTypes: {
    theme: {
      description: 'Color theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, { globals }) => {
      const theme = (globals.theme as string) || 'light';
      document.documentElement.setAttribute('data-theme', theme);
      document.body.style.background = 'var(--color-bg-surface-canvas)';
      document.body.style.color = 'var(--color-text-neutral)';
      return Story();
    },
  ],
};

export default preview;
