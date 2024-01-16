<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import { ref } from 'vue';

import './assets/css/main.css';
import 'vue-toastification/dist/index.css';

const isReady = ref(false);

const router = useRouter();

router.isReady().then(() => {
  isReady.value = true;
});
</script>

<template>
  <RouterView v-if="isReady" class="router-view" v-slot="{ Component }">
    <Transition name="page-opacity" mode="out-in">
      <component :is="Component"></component>
    </Transition>
  </RouterView>
  <section v-else :aria-busy="true"></section>
</template>
