import type { HTMLAttributes } from 'react';
import './badge.css';

export type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
export type BadgeAppearance = 'solid' | 'subtle';
export type BadgeSize = 'small' | 'medium';

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Status or category color */
  tone?: BadgeTone;
  /** Fill strength */
  appearance?: BadgeAppearance;
  /** Compact or default */
  size?: BadgeSize;
  /** Visible text */
  label: string;
}

/** Compact status or category label */
export const Badge = ({
  tone = 'neutral',
  appearance = 'subtle',
  size = 'medium',
  label,
  className,
  ...props
}: BadgeProps) => {
  const classes = [
    'ds-badge',
    `ds-badge--${tone}`,
    `ds-badge--${appearance}`,
    `ds-badge--${size}`,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...props}>
      {label}
    </span>
  );
};
