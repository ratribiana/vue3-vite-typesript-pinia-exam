<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useDark, useToggle } from '@vueuse/core';

import { isMobile } from '@/utils/functions';

import LightIcon from '@/assets/svg/sun.svg?component';
import DarkIcon from '@/assets/svg/moon.svg?component';
import MobileMenuIcon from '@/assets/svg/mobile-menu.svg?component';
import CloseIcon from '@/assets/svg/close.svg?component';

import { useAuth } from '@/composables/useAuth';

const { user, loggedIn, signOut } = useAuth();

const isDark = useDark();

const isMobileMenuOpen = ref(false);
const userAvatar = `${import.meta.env.VITE_APP_URL}/image/user/user-avatar.png`;

const APP_NAME = import.meta.env.VITE_APP_NAME;

const navigationList = [
  {
    name: 'Home',
    link: '/login',
    showInSecured: false,
  },
  {
    name: 'About',
    link: '/about',
    showInSecured: true,
  },
  {
    name: 'Register',
    link: '/register',
    showInSecured: false,
  },
];

const navigations: object[] = computed(() => {
  return loggedIn.value ? navigationList.filter((item) => item.showInSecured) : navigationList;
});

const toggleDark = useToggle(isDark);

const toggleMobileMenu = (): void => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = (): void => {
  isMobileMenuOpen.value = false;
};

watch(isMobileMenuOpen, () => {
  isMobileMenuOpen.value ? document.body.classList.add('nav-open-noscroll') : document.body.classList.remove('nav-open-noscroll');
});

const onSignOut = async (): Promise<void> => {
  signOut();
};
</script>
<template>
  <div>
    <!-- Header -->
    <header
      class="js-page-header top-0 z-20 w-full backdrop-blur transition-colors bg-white dark:bg-black"
      :class="{ 'h-full fixed': isMobileMenuOpen, 'opacity-60': !isMobileMenuOpen }"
    >
      <nav class="flex items-center px-6 py-4 xl:px-24">
        <!-- Logo -->
        <RouterLink
          v-track-click="{
            eventName: 'button_click',
            eventCategory: 'Button Actions',
            eventLabel: isMobile ? 'Logo Button in Mobile' : 'Logo Button',
          }"
          to="/"
          class="shrink-1 text-jacarta-700 text-bolder dark:text-white"
          aria-roledescription="logo"
        >
          {{ APP_NAME }}
        </RouterLink>
        <!-- Menu / Actions -->
        <div
          class="js-mobile-menu dark:bg-jacarta-800 invisible fixed inset-0 z-20 ml-auto items-center bg-white opacity-0 lg:visible lg:relative lg:inset-auto lg:bg-transparent lg:opacity-100 dark:lg:bg-transparent"
          :class="{ 'nav-menu--is-open': isMobileMenuOpen }"
        >
          <!-- Mobile Logo / Menu Close -->
          <div
            class="t-0 fixed left-0 z-10 flex w-full items-center justify-between bg-white px-6 py-4 dark:bg-jacarta-800 lg:hidden xsm:border-b xsm:border-[#241e5f]"
          >
            <!-- Mobile Logo -->
            <RouterLink
              v-track-click="{
                eventName: 'button_click',
                eventCategory: 'Button Actions',
                eventLabel: 'Logo Button',
              }"
              to="/"
              class="shrink-1"
              aria-roledescription="Mobile Logo"
            >
              {{ APP_NAME }}
            </RouterLink>

            <!-- Mobile Menu Close Button-->
            <button
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="js-mobile-close group ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-accent focus:border-transparent focus:bg-accent dark:border-transparent dark:bg-white/[.15] dark:hover:bg-accent"
              aria-label="Close mobile menu"
              aria-roledescription="Close mobile menu"
            >
              <CloseIcon />
            </button>
          </div>

          <!-- Primary Nav -->
          <nav v-if="!isMobileMenuOpen" class="navbar w-full mt-24 lg:mt-0 xl:mt-0">
            <ul class="flex flex-col lg:flex-row">
              <li class="group relative" v-for="link in navigations" :key:="link.name">
                <RouterLink
                  :to="link.link"
                  v-track-click="{
                    eventName: 'button_click',
                    eventCategory: 'Button Actions',
                    eventLabel: `${link.name} header link clicked`,
                  }"
                  class="flex items-center justify-between py-3.5 font-display text-base text-jacarta-700 hover:text-accent focus:text-accent dark:text-white dark:hover:text-accent dark:focus:text-accent lg:px-5"
                  ><span
                    >{{ link.name }}</span
                  >
                </RouterLink>
              </li>
              <li class="invisible lg:visible xl:visible">
                <!-- Dark Mode -->
                <a
                  @click="toggleDark()"
                  class="ml-6 mr-6 cursor-pointer js-dark-mode-trigger group flex h-10 w-10 items-center justify-center rounded-full border border-transparent bg-transparent transition-colors hover:border-transparent hover:bg-[#415cf4] focus:border-transparent focus:bg-[#415cf4] dark:border-transparent dark:bg-transparent dark:hover:bg-white/[.15]"
                  aria-label="Toggle dark and light mode - big screens"
                  aria-roledescription="Dark mode toggle"
                >
                  <LightIcon class="dark-mode-light text-md h-5 w-5" />
                  <DarkIcon class="dark-mode-light text-md h-5 w-5" />
                </a>
              </li>
              <li class="invisible lg:visible xl:visible" v-if="loggedIn">
                <!-- Profile -->
                <div class="js-nav-dropdown group-dropdown relative">
                  <RouterLink
                    :to="'/dashboard'"
                    v-track-click="{
                      eventName: 'button_click',
                      eventCategory: 'Button Actions',
                      eventLabel: `User Icon Dasboard link clicked`,
                    }"
                    class="mr-6 dropdown-toggle group flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-200 bg-white transition-colors hover:border-transparent hover:bg-accent focus:border-transparent focus:bg-accent dark:border-transparent dark:bg-white/[.15] dark:hover:bg-accent"
                    id="profileDropdown"
                    aria-expanded="false"
                    aria-label="Profile dropdown"
                  >
                    <img :src="userAvatar" />
                  </RouterLink>
                  <div
                    class="dropdown-menu group-dropdown-hover:visible lg:invisible !-right-4 !top-[85%] !left-auto z-10 hidden min-w-[14rem] whitespace-nowrap rounded-xl bg-white transition-all will-change-transform before:absolute before:-top-3 before:h-3 before:w-full group-dropdown-hover:opacity-100 dark:bg-jacarta-800 lg:absolute lg:grid lg:!translate-y-4 lg:py-4 lg:px-2 lg:opacity-0 lg:shadow-2xl"
                    aria-labelledby="profileDropdown"
                  >
                    <span
                      class="js-copy-clipboard my-4 flex flex-col select-none items-center whitespace-nowrap px-5 font-display leading-none text-jacarta-700 dark:text-white"
                    >
                      <span class="w-full relative overflow-hidden text-ellipsis">{{ user.fullName }} </span>
                      <span class="w-full relative overflow-hidden text-ellipsis text-xs text-light lowercase mt-2">{{ user.email }} </span>
                    </span>

                    <RouterLink
                      :to="'/profile'"
                      v-track-click="{
                        eventName: 'button_click',
                        eventCategory: 'Button Actions',
                        eventLabel: `Dropdown Dashboard link clicked`,
                      }"
                      class="flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-accent focus:text-accent dark:hover:bg-jacarta-600"
                      aria-label="profile"
                    >
                      <i class="fa-regular fa-user text-jacarta-700 dark:text-white"></i>

                      <span class="mt-1 font-display text-sm text-jacarta-700 dark:text-white">Profile</span>
                    </RouterLink>
                    <a
                      @click="onSignOut"
                      class="cursor-pointer flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-accent focus:text-accent dark:hover:bg-jacarta-600"
                    >
                      <i class="fa-solid fa-arrow-right-from-bracket text-jacarta-700 dark:text-white"></i>
                      <span class="mt-1 font-display text-sm text-jacarta-700 dark:text-white">Sign out</span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </nav>

          <Transition name="slide">
            <nav class="navbar w-full mt-24 lg:mt-0 xl:mt-0" v-if="isMobileMenuOpen">
              <ul class="flex flex-col lg:flex-row">
                <li class="group relative" v-for="link in navigations" :key="link.name">
                  <RouterLink
                    :to="link.link"
                    @click="closeMobileMenu"
                    v-track-click="{
                      eventName: 'button_click',
                      eventCategory: 'Button Actions',
                      eventLabel: `${link.name} mobile header link clicked`,
                    }"
                    class="flex items-center justify-between py-3.5 font-display text-base text-jacarta-700 hover:text-accent focus:text-accent dark:text-white dark:hover:text-accent dark:focus:text-accent lg:px-5"
                    >
                    <span>{{ link.name }}</span>
                  </RouterLink>
                </li>
                <li class="xsm:hidden">
                  <!-- Dark Mode -->
                  <a
                    @click="toggleDark()"
                    class="ml-6 mr-6 cursor-pointer js-dark-mode-trigger group ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-accent focus:border-transparent focus:bg-accent dark:border-transparent dark:bg-white/[.15] dark:hover:bg-accent"
                    aria-label="Toggle dark and light mode - big screens"
                    aria-roledescription="Dark mode toggle"
                  >
                    <LightIcon class="dark-mode-light text-md" />
                    <DarkIcon class="dark-mode-light text-md" />
                  </a>
                </li>
              </ul>
            </nav>
          </Transition>
        </div>

        <!-- Mobile Menu Actions -->
        <div class="ml-auto flex lg:hidden">
          <!-- Dark/Light Mode -->
          <a
            @click="toggleDark()"
            class="js-dark-mode-trigger group ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-accent focus:border-transparent focus:bg-accent dark:border-transparent dark:bg-white/[.15] dark:hover:bg-accent"
            aria-label="Toggle dark and light mode - small screens"
            aria-roledescription="Dark mode toggle"
          >
            <LightIcon class="dark-mode-light text-md" />
            <DarkIcon class="dark-mode-light text-md" />
          </a>

          <!-- Mobile Menu Open Button -->
          <button
            @click="toggleMobileMenu"
            class="js-mobile-toggle group ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-accent focus:border-transparent focus:bg-accent dark:border-transparent dark:bg-white/[.15] dark:hover:bg-accent"
            aria-label="Open mobile menu"
            aria-roledescription="Open mobile menu"
          >
            <MobileMenuIcon />
          </button>
        </div>
      </nav>
    </header>
  </div>
</template>
