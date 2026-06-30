import { defineStoryFactory } from '@fumadocs/story/next/client';
import { CalloutStory } from './client';

const { defineStory } = defineStoryFactory();

export const story = defineStory({
  displayName: 'Callout',
  Component: CalloutStory,
  args: [
    {
      variant: 'Default',
      initial: {
        title: 'This is a Callout',
      },
    },
    {
      variant: 'Warning',
      fixed: {
        type: 'warning',
      },
      initial: {
        title: 'This is a Callout',
      },
    },
  ],
});
