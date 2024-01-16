<template>
  <div class="flex items-center">
    <Star v-for="(type, index) in stars" :key="index" :type="type" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Star from './Star.vue';

const props = defineProps(['rating']);
const stars = ref([]);

// Whole stars
const wholeStars = Math.floor(props.rating);
for (let i = 0; i < wholeStars; i++) {
  stars.value.push('full');
}

// Check for 3/4 stars
if (props.rating % 1 === 0.75) {
  stars.value.push('three-quarters');
} else if (props.rating % 1 === 0.25) {
  // Check for 1/4 stars
  stars.value.push('quarter');
} else {
  // Half star
  if (props.rating % 1 !== 0) {
    stars.value.push('half');
  }

  // Remaining stars (if any)
  const remainingStars = Math.floor(5 - props.rating);
  for (let i = 0; i < remainingStars; i++) {
    stars.value.push('empty');
  }
}
</script>
