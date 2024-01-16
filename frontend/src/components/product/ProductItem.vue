<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStorage } from '@vueuse/core';
import { useToast } from 'vue-toastification';
import { USER_ID } from 'utils/constants';
import { useAddProductToCartMutation } from '@/services/products/query';
import { IProduct } from '@/types/product.types';
import { formatMoney } from '@/utils/functions';
import StarRating from '@/components/rating/StarRating';
import CartIcon from '@/assets/svg/cart.svg?component';

const { product } = defineProps<{ product: IProduct }>();
const {
  params: { category },
} = useRoute();

const notification = useToast();

const { mutate } = useAddProductToCartMutation();

const EXTERNAL_USER_ID = useStorage(USER_ID);

const realPrice = computed(() => {
  const discountPercentagePrice = (product.price * product.discountPercentage) / 100;

  return +(product.price + discountPercentagePrice).toFixed(0);
});

const onAddToCart = () => {
  mutate({
    userId: EXTERNAL_USER_ID?.value,
    products: [
      {
        id: product.id,
        quantity: 3,
      },
    ],
  });
  notification.success('Item successfully added to cart');
};
</script>

<template>
  <div class="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-grey-50 bg-white shadow-md mb-4">
    <RouterLink :to="`/${category}/product/${product.id}`">
      <img class="object-cover h-40 w-full" :src="product.thumbnail" alt="product image" />
      <span class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
        {{ product.discountPercentage }}% OFF
      </span>
    </RouterLink>
    <div class="mt-4 px-5 pb-5">
      <RouterLink :to="`/${category}/product/${product.id}`">
        <h5 class="text-lg tracking-tight text-slate-900 h-10 capitalize">
          {{ product.title }}
        </h5>
      </RouterLink>
      <div class="mt-2 mb-5">
        <div class="flex items-end mb-2">
          <p class="text-xl font-bold text-slate-900 mr-4 text-red-500">
            {{ formatMoney(product.price) }}
          </p>
          <p class="text-sm text-slate-900 line-through mb-2 font-bold">
            {{ formatMoney(realPrice) }}
          </p>
        </div>
        <div class="flex items-center">
          <StarRating :rating="product.rating" />

          <span class="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
            {{ product.rating }}
          </span>
        </div>
      </div>
      <button
        href="#"
        class="w-full flex font-bold items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        @click="onAddToCart"
      >
        <CartIcon />
        Add to cart
      </button>
    </div>
  </div>
</template>
