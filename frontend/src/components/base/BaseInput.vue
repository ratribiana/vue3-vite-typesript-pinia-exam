<script setup lang="ts">
import { useField } from 'vee-validate';

const props = defineProps({
  name: String,
  type: String,
  id: String,
  placeholder: String,
  disabled: Boolean,
  label: String,
  customClass: {
    type: String,
    default: '',
    description: 'Additional custom class to append to the text field',
  },
});

// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { value, errorMessage } = useField(() => props.name);
</script>
<template>
  <label v-if="label" :for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >{{ label }} <small v-if="$attrs.required == 'required'" class="required">*</small></label
  >
  <input
    v-model="value"
    :name="name"
    :type="type || 'text'"
    :id="id"
    :placeholder="placeholder"
    :disabled="disabled"
    :class="[{ error: errorMessage }, customClass]"
    v-bind="$attrs"
    class="normal-case"
  />
  <small class="text-red dark:text-[#f78181]">{{ errorMessage }}</small>
</template>
