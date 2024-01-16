<script lang="ts">
export default {
  name: 'base-button',
  props: {
    tag: {
      type: String,
      default: 'button',
      description: 'Button html tag',
    },
    round: Boolean,
    icon: Boolean,
    block: Boolean,
    loading: Boolean,
    wide: Boolean,
    disabled: Boolean,
    type: {
      type: String,
      default: 'default',
      description: 'Button type (primary|secondary|danger etc)',
    },
    nativeType: {
      type: String,
      default: 'button',
      description: 'Button native type (e.g button, input etc)',
    },
    size: {
      type: String,
      default: '',
      description: 'Button size (xs|sm|base|lg|xl)',
    },
    color: {
      type: String,
      default: 'blue',
      description: 'Button color (sm|lg)',
    },
    outline: {
      type: Boolean,
      description: 'Whether button is outlined (only border has color)',
    },
    link: {
      type: Boolean,
      description: 'Whether button is a link (no borders or background)',
    },
    customClass: {
      type: String,
      default: '',
      description: 'Additional custom class to append to the button',
    },
  }
};
</script>

<template>
  <component
    v-if="tag || $attrs.href"
    :is="tag"
    :type="tag === 'button' ? nativeType : ''"
    :disabled="disabled || loading"
    class="text-center items-center relative"
    :class="[
      { 'rounded-full': round },
      { block: block },
      { 'w-full': wide },
      { 'px-3 py-2 text-xs font-medium': size == 'xs' },
      { 'px-3 py-2 text-sm font-medium': size == 'sm' },
      { 'px-5 py-2.5 text-sm font-medium': size == 'base' },
      { 'px-5 py-3 text-base font-medium': size == 'lg' },
      { 'px-6 py-3.5 text-base font-medium': size == 'xl' },
      { [`border`]: outline && type },
      { disabled: disabled && tag !== 'button' },
      { [`bg-${color}`]: color },
      { [`hover:bg-${color}-800 focus:ring-2 focus:outline-none focus:ring-${color}-300`]: color },
      { 'opecity-20 cursor-not-allowed': disabled },
      customClass,
    ]"
  >
    <slot name="loading">
      <i v-if="loading" class="fas fa-circle-notch fa-spin left-4 top-3 absolute"></i>
    </slot>
    <slot></slot>
  </component>
</template>
