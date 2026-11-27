import type { CSSProperties } from 'react';

import colorCore from '../../../tokens/core/color.core.json';

type ColorToken = {
  $type: string;
  $description?: string;
  $value: {
    hex?: string;
    alpha?: number;
  };
};

const familyStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-sm, 0.75rem)',
  marginTop: 'var(--spacing-lg, 1.5rem)',
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontFamily: 'var(--text-face-base, Asap, sans-serif)',
  fontSize: 'var(--text-size-sm, 0.875rem)',
  fontWeight: 600,
  color: 'var(--color-text-neutral-strong, #252B36)',
  textTransform: 'capitalize',
};

const rampStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(5.5rem, 1fr))',
  gap: 'var(--spacing-md, 1rem) var(--spacing-sm, 0.75rem)',
};

const itemStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 'var(--spacing-xs, 0.5rem)',
  minWidth: 0,
};

const swatchStyle: CSSProperties = {
  width: '100%',
  aspectRatio: '1',
  borderRadius: 'var(--radius-md, 6px)',
  border: '1px solid var(--color-border-neutral, #E8ECF1)',
  boxSizing: 'border-box',
};

const metaStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.125rem',
  width: '100%',
};

const labelStyle: CSSProperties = {
  fontFamily: 'var(--text-face-mono, "IBM Plex Mono", monospace)',
  fontSize: 'var(--text-size-xs, 0.75rem)',
  color: 'var(--color-text-neutral-subtle, #8793A3)',
  textAlign: 'center',
  wordBreak: 'break-all',
  background: 'transparent',
  padding: 0,
};

const hexStyle: CSSProperties = {
  ...labelStyle,
  fontSize: '0.6875rem',
};

function isColorToken(value: unknown): value is ColorToken {
  return (
    typeof value === 'object' &&
    value !== null &&
    '$type' in value &&
    (value as ColorToken).$type === 'color' &&
    typeof (value as ColorToken).$value?.hex === 'string'
  );
}

const families = Object.entries(colorCore.color);

/** Visual catalog of core color ramps from `tokens/core/color.core.json`. */
export function ColorPalette() {
  return (
    <div>
      {families.map(([family, steps]) => (
        <section key={family} style={familyStyle}>
          <h3 style={titleStyle}>{family}</h3>
          <div style={rampStyle}>
            {Object.entries(steps).map(([step, token]) => {
              if (!isColorToken(token)) return null;
              const hex = token.$value.hex!;
              const name = `color.${family}.${step}`;
              return (
                <div key={name} style={itemStyle}>
                  <div
                    style={{ ...swatchStyle, background: hex }}
                    title={token.$description ?? name}
                  />
                  <div style={metaStyle}>
                    <code style={labelStyle}>{name}</code>
                    <code style={hexStyle}>{hex}</code>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
