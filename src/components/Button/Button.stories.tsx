import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { iconNames } from '../../icons';

import { Button } from './Button';

const iconOptions = iconNames;

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    appearance: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    leadingIcon: {
      control: 'select',
      options: iconOptions,
    },
    trailingIcon: {
      control: 'select',
      options: iconOptions,
    },
    iconOnly: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onClick: { table: { disable: true } },
  },
  args: {
    onClick: fn(),
    label: 'Create project',
    appearance: 'primary',
    size: 'medium',
    iconOnly: false,
    loading: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    appearance: 'secondary',
    label: 'Cancel',
  },
};

export const Ghost: Story = {
  args: {
    appearance: 'ghost',
    label: 'Learn more',
  },
};

export const Danger: Story = {
  args: {
    appearance: 'danger',
    label: 'Delete project',
  },
};

export const WithLeadingIcon: Story = {
  args: {
    label: 'Back',
    leadingIcon: 'arrow-left',
    appearance: 'secondary',
  },
};

export const WithTrailingIcon: Story = {
  args: {
    label: 'Continue',
    trailingIcon: 'arrow-right',
  },
};

export const WithBothIcons: Story = {
  args: {
    label: 'Navigate',
    leadingIcon: 'arrow-left',
    trailingIcon: 'arrow-right',
    appearance: 'ghost',
  },
};

export const IconOnly: Story = {
  args: {
    label: 'Go forward',
    iconOnly: true,
    leadingIcon: 'arrow-right',
  },
};

export const IconOnlySecondary: Story = {
  args: {
    label: 'Go back',
    iconOnly: true,
    leadingIcon: 'arrow-left',
    appearance: 'secondary',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Compact',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Continue',
    trailingIcon: 'arrow-right',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Unavailable',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    label: 'Saving',
  },
};

export const FocusRing: Story = {
  args: {
    label: 'Tab to focus',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use keyboard focus to see the token-backed focus ring (`color.outline.focus`).',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('button');
    button?.focus();
  },
};

export const AllAppearances: Story = {
  args: {
    leadingIcon: undefined,
    trailingIcon: undefined,
    iconOnly: false,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
      <Button
        appearance="primary"
        size={args.size}
        label="Primary"
        trailingIcon="arrow-right"
        disabled={args.disabled}
        loading={args.loading}
        onClick={args.onClick}
      />
      <Button
        appearance="secondary"
        size={args.size}
        label="Secondary"
        leadingIcon="arrow-left"
        disabled={args.disabled}
        loading={args.loading}
        onClick={args.onClick}
      />
      <Button
        appearance="ghost"
        size={args.size}
        label="Ghost"
        disabled={args.disabled}
        loading={args.loading}
        onClick={args.onClick}
      />
      <Button
        appearance="danger"
        size={args.size}
        label="Danger"
        disabled={args.disabled}
        loading={args.loading}
        onClick={args.onClick}
      />
      <Button
        appearance="primary"
        size={args.size}
        label="Next"
        iconOnly
        leadingIcon="arrow-right"
        disabled={args.disabled}
        loading={args.loading}
        onClick={args.onClick}
      />
    </div>
  ),
};
