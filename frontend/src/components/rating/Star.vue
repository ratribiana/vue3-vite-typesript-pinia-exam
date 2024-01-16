<script setup>
import { defineProps } from 'vue';

const props = defineProps(['type']);

const getStarClass = (type) => {
  if (type === 'half') {
    return 'half-filled';
  } else if (type === 'quarter') {
    return 'quarter-filled';
  } else if (type === 'three-quarters') {
    return 'three-quarters-filled';
  } else if (type === 'empty') {
    return 'empty';
  } else {
    return ''; // Add other classes as needed for 'full' or default styles
  }
};
</script>
<template>
  <div>
    <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="half-fill-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" style="stop-color: #fcd34d; stop-opacity: 1" />
          <stop offset="50%" style="stop-color: #e5e7eb; stop-opacity: 1" />
        </linearGradient>
        <linearGradient id="quarter-fill-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="25%" style="stop-color: #fcd34d; stop-opacity: 1" />
          <stop offset="25%" style="stop-color: #d1d5db; stop-opacity: 1" />
        </linearGradient>
        <linearGradient id="three-quarters-fill-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="75%" style="stop-color: #fcd34d; stop-opacity: 1" />
          <stop offset="75%" style="stop-color: #e5e7eb; stop-opacity: 1" />
        </linearGradient>
        <linearGradient id="empty" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="100%" style="stop-color: #e5e7eb; stop-opacity: 1" />
          <stop offset="100%" style="stop-color: #e5e7eb; stop-opacity: 1" />
        </linearGradient>
      </defs>
      <path
        :class="getStarClass(type)"
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
      ></path>
    </svg>
  </div>
</template>

<style scoped>
.half-filled {
  fill: url(#half-fill-gradient);
}

.quarter-filled {
  fill: url(#quarter-fill-gradient);
}

.three-quarters-filled {
  fill: url(#three-quarters-fill-gradient);
}

.empty {
  fill: url(#empty);
}
</style>
