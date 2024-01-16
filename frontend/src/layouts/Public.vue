<script setup lang="ts">
import Header from 'components/base/Header';
import Footer from 'components/base/Footer';
</script>
<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>
