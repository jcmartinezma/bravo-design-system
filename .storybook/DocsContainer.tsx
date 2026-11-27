import type { PropsWithChildren } from 'react';
import { DocsContainer as BaseContainer } from '@storybook/addon-docs/blocks';
import type { DocsContainerProps } from '@storybook/addon-docs/blocks';

import { getBravoTheme } from './theme';

function resolveMode(): string {
  if (typeof document !== 'undefined') {
    const fromDom = document.documentElement.getAttribute('data-theme');
    if (fromDom === 'light' || fromDom === 'dark') return fromDom;
  }
  const globals = new URLSearchParams(window.location.search).get('globals');
  return globals?.match(/(?:^|;|,)theme:([^;,]+)/)?.[1] ?? 'light';
}

/**
 * Stateless docs shell. Theme switches via the preview decorator
 * (`data-theme` on <html>) — hooks are not safe inside DocsContainer.
 */
export function DocsContainer({ children, context }: PropsWithChildren<DocsContainerProps>) {
  return (
    <BaseContainer context={context} theme={getBravoTheme(resolveMode())}>
      {children}
    </BaseContainer>
  );
}
