<script setup lang="ts">
import Register from '@/forms/RegisterForm';
</script>

<template>
  <div>
    <div class="m-auto my-8 xl:my-20 lg:my-20">
      <section>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border border-gray-300 dark:bg-black dark:border-black opacity-60">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign up</h1>
              <Register />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
