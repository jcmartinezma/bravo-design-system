import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tone: {
      control: 'select',
      options: ['neutral', 'info', 'success', 'warning', 'danger'],
    },
    appearance: {
      control: 'select',
      options: ['subtle', 'solid'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
  },
  args: {
    label: 'In progress',
    tone: 'neutral',
    appearance: 'subtle',
    size: 'medium',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};

export const Info: Story = {
  args: {
    tone: 'info',
    label: 'Info',
  },
};

export const Success: Story = {
  args: {
    tone: 'success',
    label: 'Complete',
  },
};

export const Warning: Story = {
  args: {
    tone: 'warning',
    label: 'Needs review',
  },
};

export const Danger: Story = {
  args: {
    tone: 'danger',
    label: 'Failed',
  },
};

export const Solid: Story = {
  args: {
    appearance: 'solid',
    tone: 'info',
    label: 'Beta',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    tone: 'success',
    label: 'New',
  },
};

export const AllTones: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-xs)' }}>
        <Badge {...args} appearance="subtle" tone="neutral" label="Neutral" />
        <Badge {...args} appearance="subtle" tone="info" label="Info" />
        <Badge {...args} appearance="subtle" tone="success" label="Success" />
        <Badge {...args} appearance="subtle" tone="warning" label="Warning" />
        <Badge {...args} appearance="subtle" tone="danger" label="Danger" />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-xs)' }}>
        <Badge {...args} appearance="solid" tone="neutral" label="Neutral" />
        <Badge {...args} appearance="solid" tone="info" label="Info" />
        <Badge {...args} appearance="solid" tone="success" label="Success" />
        <Badge {...args} appearance="solid" tone="warning" label="Warning" />
        <Badge {...args} appearance="solid" tone="danger" label="Danger" />
      </div>
    </div>
  ),
};
