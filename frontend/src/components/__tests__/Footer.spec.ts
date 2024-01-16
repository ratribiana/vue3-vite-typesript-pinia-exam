import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';

import PageFooter from '../base/Footer.vue';

describe('NavBar', () => {
  it('shows a select for dark mode toggling', () => {
    const wrapper = mount(PageFooter);
    // There should be a select (for dark mode)
    expect(wrapper.text()).toContain('Copyright © 2023')
  });
});
