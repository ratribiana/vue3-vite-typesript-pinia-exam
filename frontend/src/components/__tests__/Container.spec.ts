import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Container from '@/components/base/Container';

describe('Container', () => {
  it('renders the container with the provided slots', () => {
    const wrapper = mount(Container, {
      slots: {
        default: 'Your content goes here', // Replace with the actual content you want to test
      },
    });

    // Assert on the presence of the container element
    const container = wrapper.find('.container');
    expect(container.exists()).toBe(true);

    // Assert on the presence of the provided slots content
    expect(container.text()).toContain('Your content goes here');
  });
});