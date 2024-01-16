import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import Header from '@/components/base/Header';

import { useAuthStore } from '@/stores';

describe('NavBar', () => {
  it('renders properly when logged out', () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });

    const store = useAuthStore();

    expect(store.loggedIn).toBe(false);

    expect(wrapper.find("[aria-roledescription='logo']").exists()).toBe(true);

    expect(wrapper.text()).toContain('Home');
    expect(wrapper.text()).toContain('About');
    expect(wrapper.text()).toContain('Register');

    expect(wrapper.find("[aria-label='Toggle dark and light mode - big screens']").exists()).toBe(true);
    expect(wrapper.find("[aria-roledescription='Dark mode toggle']").exists()).toBe(true);
  });

  it('renders properly when logged in', async () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });

    const store = useAuthStore();

    store.loggedIn = true;

    // Await the nextTick
    await wrapper.vm.$nextTick();

     expect(store.loggedIn).toBe(true);

    expect(wrapper.find("[aria-roledescription='logo']").exists()).toBe(true);
    expect(wrapper.text()).toContain('About');
    
    console.log(wrapper.text())

    expect(wrapper.find("[aria-label='Toggle dark and light mode - big screens']").exists()).toBe(true);
    expect(wrapper.find("[aria-roledescription='Dark mode toggle']").exists()).toBe(true);
    expect(wrapper.find("[aria-label='Profile dropdown']").exists()).toBe(true);
  });
});
