import type { ButtonHTMLAttributes } from 'react';

import { buttonIcons, type ButtonIconName } from '../../icons';
import './button.css';

export type ButtonAppearance = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';
export type { ButtonIconName };

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Visual emphasis of the control */
  appearance?: ButtonAppearance;
  /** Control size */
  size?: ButtonSize;
  /**
   * Visible label. For icon-only buttons this is the accessible name
   * (rendered as `aria-label`, not visible text).
   */
  label: string;
  /** Icon before the label */
  leadingIcon?: ButtonIconName;
  /** Icon after the label */
  trailingIcon?: ButtonIconName;
  /** Show only the icon (uses leadingIcon, or trailingIcon as fallback) */
  iconOnly?: boolean;
  /** Shows a spinner and blocks interaction */
  loading?: boolean;
}

/** Primary UI control for committing to an action */
export const Button = ({
  appearance = 'primary',
  size = 'medium',
  label,
  leadingIcon,
  trailingIcon,
  iconOnly = false,
  loading = false,
  disabled = false,
  type = 'button',
  className,
  'aria-label': ariaLabel,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;
  const resolveIcon = (name?: ButtonIconName) =>
    name && name in buttonIcons ? buttonIcons[name] : null;
  const Leading = resolveIcon(leadingIcon);
  const Trailing = iconOnly ? null : resolveIcon(trailingIcon);
  const OnlyIcon = iconOnly ? resolveIcon(leadingIcon ?? trailingIcon) : null;

  const classes = [
    'ds-button',
    `ds-button--${appearance}`,
    `ds-button--${size}`,
    iconOnly ? 'ds-button--icon-only' : '',
    loading ? 'ds-button--loading' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      aria-disabled={isDisabled || undefined}
      aria-label={iconOnly ? (ariaLabel ?? label) : ariaLabel}
      {...props}
    >
      {loading ? (
        <span className="ds-button__spinner" aria-hidden="true" />
      ) : null}

      <span
        className={
          loading ? 'ds-button__content ds-button__content--hidden' : 'ds-button__content'
        }
      >
        {OnlyIcon ? <OnlyIcon className="ds-button__icon" /> : null}
        {!iconOnly && Leading ? <Leading className="ds-button__icon" /> : null}
        {!iconOnly ? <span className="ds-button__label">{label}</span> : null}
        {!iconOnly && Trailing ? <Trailing className="ds-button__icon" /> : null}
      </span>
    </button>
  );
};
