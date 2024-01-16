<script setup lang="ts">
import Header from 'components/base/Header';
import Footer from 'components/base/Footer';

// Use this component for any pages that is secured.
</script>
<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>
