import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    {
      directory: '../src/stories',
      files: '**/*.mdx',
    },
    {
      directory: '../src/components',
      files: '**/*.stories.@(js|jsx|mjs|ts|tsx)',
    },
  ],
  addons: [
    '@storybook/addon-docs',
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-mcp',
  ],
  framework: '@storybook/react-vite',
  staticDirs: [
    '../public',
    { from: '../src/fonts', to: '/fonts' },
  ],
};


export default config;
