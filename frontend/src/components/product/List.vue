<script setup lang="ts">
import { Waypoint } from 'vue-waypoint';
import { useListProductsInfiniteQuery } from '@/api/products/query';
import ProductItem from './ProductItem.vue';

const router = useRouter();
const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading, isSuccess } = useListProductsInfiniteQuery();

const onLoadMore = () => {
  if (!isFetchingNextPage.value) {
    fetchNextPage.value();
  }
};

const goProfile = () => {
  router.push('/profile');
};
</script>

<template>
  <div class="container mx-auto">
    <span v-if="isLoading">Loading...</span>
    <div v-else>
      <span v-if="isFetching && !isFetchingNextPage">Fetching...</span>

      <div v-for="(productsGroup, index) in data?.pages" :key="index" class="products-group">
        <div v-for="product in productsGroup.products" :key="product.id" class="px-6 py-3 bg-gray-100 gap-10" @click="goProfile">
          <ProductItem :product="product" />
        </div>
      </div>

      <Waypoint :active="hasNextPage && isSuccess" @change="onLoadMore">
        <div>
          <div role="status" class="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
            <div class="flex items-center mt-4 space-x-3">
              <svg
                class="text-gray-200 w-14 h-14 dark:text-gray-700"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <div>
                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                <div class="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
            </div>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </Waypoint>
    </div>
  </div>
</template>
