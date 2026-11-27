import type { CSSProperties } from 'react';

import { icons, iconNames, type IconName } from '../../icons';

const itemStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 'var(--spacing-xs, 0.5rem)',
  minWidth: 0,
};

const cardStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  aspectRatio: '1',
  padding: 'var(--spacing-md, 1rem)',
  border: '1px solid var(--color-border-neutral, #E8ECF1)',
  borderRadius: 'var(--radius-md, 6px)',
  background: 'transparent',
  color: 'var(--color-text-neutral-strong, #252B36)',
  boxSizing: 'border-box',
};

const nameStyle: CSSProperties = {
  fontFamily: 'var(--text-face-mono, "IBM Plex Mono", monospace)',
  fontSize: 'var(--text-size-xs, 0.75rem)',
  color: 'var(--color-text-neutral-subtle, #8793A3)',
  textAlign: 'center',
  wordBreak: 'break-all',
  background: 'transparent',
  padding: 0,
};

export function IconGallery() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(7.5rem, 1fr))',
        gap: 'var(--spacing-md, 1rem) var(--spacing-sm, 0.75rem)',
        marginTop: 'var(--spacing-md, 1rem)',
      }}
    >
      {iconNames.map((name: IconName) => {
        const Icon = icons[name];
        return (
          <div key={name} style={itemStyle}>
            <div style={cardStyle}>
              <Icon width={24} height={24} />
            </div>
            <code style={nameStyle}>{name}</code>
          </div>
        );
      })}
    </div>
  );
}
