<script lang="ts" setup>
import Categories from '@/components/categories/Categories.vue';
import Container from '@/components/base/Container.vue';
</script>
<template>
  <Container>
    <article class="prose max-w-full my-10">
      <h1 class="text-center text-accent-dark dark:text-white font-bold text-2xl">Products Categories</h1>
    </article>

    <Categories />
  </Container>
</template>
