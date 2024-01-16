<template>
  <Splide aria-labelledby="product-heading" :options="mainOptions" ref="main">
    <SplideSlide v-for="(image, key) in images" :key="key">
      <img :src="image" :alt="image" class="w-full h-full" />
    </SplideSlide>
  </Splide>
  <Splide aria-label="Carousel thumbnails." :options="thumbsOptions" ref="thumbs">
    <SplideSlide v-for="(image, key) in images" :key="key">
      <img :src="image" :alt="image" />
    </SplideSlide>
  </Splide>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { Options, Splide, SplideSlide } from '@splidejs/vue-splide';

import '@splidejs/vue-splide/css';

interface IProps {
  images: string[];
}

const { images } = defineProps<IProps>();
const main = ref<InstanceType<typeof Splide>>();
const thumbs = ref<InstanceType<typeof Splide>>();

const mainOptions: Options = {
  type: 'loop',
  perPage: 1,
  perMove: 1,
  pagination: false,
  autoplay: true,
  start: 1,
};

const thumbsOptions: Options = {
  type: 'slide',
  rewind: true,
  gap: '1rem',
  pagination: false,
  fixedWidth: 110,
  fixedHeight: 70,
  cover: true,
  focus: 'center',
  isNavigation: true,
  updateOnMove: true,
  arrows: false,
};

onMounted(() => {
  const thumbsSplide = thumbs.value?.splide;

  if (thumbsSplide) {
    main.value?.sync(thumbsSplide);
  }
});

// Watch for changes in the images prop
watch(images, () => {
  // Pause the main Splide instance
  main.value?.splide?.pause();

  // Wait for the next tick to ensure the DOM has been updated with new images
  setTimeout(() => {
    // Resume the main Splide instance and update synchronization
    main.value?.splide?.refresh();
    main.value?.splide?.sync(thumbs.value?.splide);
  });
});
</script>
