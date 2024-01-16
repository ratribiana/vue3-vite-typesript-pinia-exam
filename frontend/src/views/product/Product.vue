<script lang="ts" setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useGetProductDetails } from '@/services/products/query';
import Container from '@/components/base/Container.vue';
import { formatMoney } from '@/utils/functions';
import ImageSwiper from '@/components/base/ImageSwiper.vue';
import StarRating from '@/components/rating/StarRating';
import HeartIcon from '@/assets/svg/heart.svg?component';
import CartIcon from '@/assets/svg/cart.svg?component';
import FacebookIcon from '@/assets/svg/facebook.svg?component';
import TwitterIcon from '@/assets/svg/twitter.svg?component';
import ChatIcon from '@/assets/svg/chat.svg?component';

const {
  params: { category, productId },
} = useRoute();

const { data: product } = useGetProductDetails(productId as string);

const realPrice = computed(() => {
  if (!product.value) return null;

  const discountPercentagePrice = (product.value?.price * product.value.discountPercentage) / 100;

  return +(product.value.price + discountPercentagePrice).toFixed(0);
});
</script>

<template>
  <Container>
    <div class="mb-10">
      <RouterLink :to="`/categories/${category}`" class="text-center text-accent-dark dark:text-white font-bold">
        <i class="fa-solid fa-angles-left"></i> Back to {{ category }}
      </RouterLink>
    </div>
    <section class="text-gray-700 body-font overflow-hidden bg-white">
      <div class="px-5 py-10 relative">
        <button
          class="absolute right-8 rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 hover:bg-red-300"
        >
          <HeartIcon class="text-sm" />
        </button>
        <div class="mx-auto flex flex-wrap">
          <div class="lg:w-5/12 w-full object-cover object-center rounded border border-gray-200 bg-black">
            <ImageSwiper :images="product?.images ?? []" />
          </div>

          <div class="lg:w-7/12 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 class="text-sm title-font text-gray-500 tracking-widest capitalize">
              {{ product?.brand }}
            </h2>
            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1 capitalize">
              {{ product?.title }}
            </h1>
            <div class="flex mb-4">
              <span class="flex items-center" v-if="product?.rating">
                <StarRating :rating="product.rating" />
                <span class="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                  {{ product.rating }}
                </span>
              </span>
              <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                <a class="text-blue-500">
                  <FacebookIcon />
                </a>
                <a class="ml-2 text-sky-400">
                  <TwitterIcon />
                </a>
                <a class="ml-2 text-accent-dark">
                  <ChatIcon />
                </a>
              </span>
            </div>
            <p class="leading-relaxed mb-4">
              {{ product?.description }}
            </p>

            <div class="flex items-center">
              <div class="flex items-end mb-2">
                <p class="text-2xl font-bold text-slate-900 mr-4 text-red-500">
                  {{ formatMoney(product?.price ?? 0) }}
                </p>
                <p class="title-font font-medium text-lg text-gray-900 line-through mb-1">
                  {{ formatMoney(realPrice ?? 0) }}
                </p>
              </div>
            </div>

            <div class="w-full">
              <div class="flex mt-4">
                <button
                  class="flex font-bold items-center justify-center text-white bg-indigo-600 px-5 py-2.5 text-center text-sm text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg w-[80%] text-center"
                >
                  <CartIcon /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Container>
</template>
