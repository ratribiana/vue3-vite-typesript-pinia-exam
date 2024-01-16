import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseInput from '@/components/base/BaseInput';

describe('BaseInput', () => {
  it('renders correctly with name, type, id, label and placeholder props', () => {
    const wrapper = mount(BaseInput, {
      props: {
        name: 'customInput',
        type: 'password',
        id: 'customId',
        placeholder: 'Enter your password',
        label: 'Password',
      }
    });

    // Assert on the label existence
    const label = wrapper.find('label');
    expect(label.exists()).toBe(true);
    expect(label.text()).toContain('Password');

    // Assert on the input existence and attributes
    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
    expect(input.attributes('name')).toBe('customInput');
    expect(input.attributes('type')).toBe('password');
    expect(input.attributes('id')).toBe('customId');
    expect(input.attributes('placeholder')).toBe('Enter your password');
  });

  it('renders correctly with all props', () => {
    const wrapper = mount(BaseInput, {
      props: {
        name: 'customInput',
        type: 'password',
        id: 'customId',
        placeholder: 'Enter your password',
        disabled: false,
        label: 'Password',
        customClass: 'custom-input',
      },
      attrs: {
        required: 'required',
      },
    });

    // Assert on the rendered HTML
    expect(wrapper.html()).toMatchSnapshot();

    // Assert on the label existence
    const label = wrapper.find('label');
    expect(label.exists()).toBe(true);
    expect(label.text()).toContain('Password');

    // Assert on the small element existence and content
    const asterisk = wrapper.find('.required');
    expect(asterisk.exists()).toBe(true);
    expect(asterisk.text()).toBe('*');

    // Assert on the input existence and attributes
    const input = wrapper.find('input');

    expect(input.exists()).toBe(true);
    expect(input.attributes('name')).toBe('customInput');
    expect(input.attributes('type')).toBe('password');
    expect(input.attributes('id')).toBe('customId');
    expect(input.attributes('placeholder')).toBe('Enter your password');
    expect(input.attributes('disabled')).toBe(undefined); // Check that the 'disabled' attribute is not present
    expect(input.attributes('required')).toBe(''); // Check that the 'required' attribute is present
    expect(input.classes()).toContain('custom-input');
    
    // Assert on the error message existence
    const errorMessage = wrapper.find('.text-red');
    expect(errorMessage.exists()).toBe(true);
  });
});
