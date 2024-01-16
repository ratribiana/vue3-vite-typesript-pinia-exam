<script setup lang="ts">
import { useProductsCategories } from '@/services/products/query';

const { data: categories } = useProductsCategories();

const tailwindColors = [
  'bg-red-400',
  'bg-orange-400',
  'bg-amber-400',
  'bg-yellow-400',
  'bg-lime-400',
  'bg-green-400',
  'bg-emerald-400',
  'bg-teal-400',
  'bg-cyan-400',
  'bg-sky-400',
  'bg-blue-400',
  'bg-indigo-400',
  'bg-violet-400',
  'bg-purple-400',
  'bg-fuchsia-400',
  'bg-pink-400',
  'bg-rose-400',
];

const getColor = (index: number) => {
  return tailwindColors[index % tailwindColors.length];
};
</script>
<template>
  <div class="md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid gap-5 mb-8">
    <div v-for="(category, index) in categories" :key="index">
      <RouterLink :to="`/categories/${category}`">
        <div
          class="px-4 py-12 rounded-md border-gray-400 text-gray-800 border cursor-pointer text-center capitalize bg-slate-400 font-bol dark:text-white dark:border-gray-300"
          :class="getColor(index)"
        >
          {{ category?.replaceAll('-', ' ') }}
        </div>
      </RouterLink>
    </div>
  </div>
</template>
