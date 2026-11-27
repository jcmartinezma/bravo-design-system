import { addons } from 'storybook/manager-api';
import { GLOBALS_UPDATED, SET_GLOBALS, UPDATE_GLOBALS } from 'storybook/internal/core-events';

import { getBravoTheme } from './theme';

function themeFromUrl(): string | null {
  const globals = new URLSearchParams(window.location.search).get('globals');
  return globals?.match(/(?:^|;|,)theme:([^;,]+)/)?.[1] ?? null;
}

function applyTheme(mode: string | undefined) {
  addons.setConfig({
    theme: getBravoTheme(mode),
    sidebar: { showRoots: true },
  });
}

applyTheme(themeFromUrl() ?? 'light');

const channel = addons.getChannel();
const onGlobals = ({ globals }: { globals?: Record<string, unknown> }) => {
  if (typeof globals?.theme !== 'string') return;
  applyTheme(globals.theme);
};

channel.on(SET_GLOBALS, onGlobals);
channel.on(UPDATE_GLOBALS, onGlobals);
channel.on(GLOBALS_UPDATED, onGlobals);
