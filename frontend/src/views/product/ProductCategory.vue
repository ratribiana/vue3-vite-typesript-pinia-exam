<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useGetProductsByCategory } from '@/services/products/query';
import Container from '@/components/base/Container.vue';
import ProductItem from '@/components/product/ProductItem.vue';

const {
  params: { category },
} = useRoute();

const { data } = useGetProductsByCategory(category as string);
</script>

<template>
  <Container>
    <div class="mb-10">
      <RouterLink :to="`/dashboard`" class="text-center text-accent-dark dark:text-white font-bold">
        <i class="fa-solid fa-angles-left"></i> Back to Categories
      </RouterLink>
    </div>
    <article class="prose max-w-full my-4">
      <h1 class="text-center text-accent-dark dark:text-white font-bold text-2xl">
        {{ category }}
      </h1>
    </article>
    <div class="md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid gap-5 mb-8 pt-10">
      <div v-for="product in data?.products" :key="product.id">
        <ProductItem :product="product" />
      </div>
    </div>
  </Container>
</template>
