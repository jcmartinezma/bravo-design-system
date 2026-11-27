import { create } from 'storybook/theming';

const brand = {
  brandTitle: 'BRAVO',
  brandTarget: '_self' as const,
  fontBase: '"Asap", sans-serif',
  fontCode: '"IBM Plex Mono", monospace',
  appBorderRadius: 6,
  inputBorderRadius: 6,
};

/**
 * Manager + Docs chrome. Hex values map to semantic token roles
 * (light ≈ site; dark ≈ tokens.dark.css resolved cores).
 */
export const bravoThemeLight = create({
  ...brand,
  base: 'light',
  brandImage: '/bravo-full-logo-positive.svg',

  colorPrimary: '#2563EB',
  colorSecondary: '#2563EB',

  appBg: '#F7F8FA',
  appContentBg: '#FFFFFF',
  appPreviewBg: '#FFFFFF',
  appBorderColor: '#E8ECF1',

  textColor: '#252B36',
  textInverseColor: '#FFFFFF',
  textMutedColor: '#8793A3',

  barBg: '#FFFFFF',
  barTextColor: '#6B7585',
  barSelectedColor: '#2563EB',
  barHoverColor: '#1D4ED8',

  inputBg: '#FFFFFF',
  inputBorder: '#D1D7E0',
  inputTextColor: '#252B36',

  buttonBg: '#E8ECF1',
  buttonBorder: '#D1D7E0',
  booleanBg: '#E8ECF1',
  booleanSelectedBg: '#2563EB',
});

export const bravoThemeDark = create({
  ...brand,
  base: 'dark',
  brandImage: '/bravo-full-logo-negative.svg',

  colorPrimary: '#2669B7',
  colorSecondary: '#2669B7',

  appBg: '#141920',
  appContentBg: '#232B35',
  appPreviewBg: '#232B35',
  appBorderColor: '#343E4C',

  textColor: '#B8C5D5',
  textInverseColor: '#141920',
  textMutedColor: '#707F92',

  barBg: '#232B35',
  barTextColor: '#707F92',
  barSelectedColor: '#2669B7',
  barHoverColor: '#9CC7FF',

  inputBg: '#141920',
  inputBorder: '#343E4C',
  inputTextColor: '#B8C5D5',

  buttonBg: '#343E4C',
  buttonBorder: '#475363',
  booleanBg: '#343E4C',
  booleanSelectedBg: '#2669B7',
});

/** @deprecated Prefer bravoThemeLight / bravoThemeDark */
export const bravoTheme = bravoThemeLight;

export function getBravoTheme(mode: string | undefined) {
  return mode === 'dark' ? bravoThemeDark : bravoThemeLight;
}
