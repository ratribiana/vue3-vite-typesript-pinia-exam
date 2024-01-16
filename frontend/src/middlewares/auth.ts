import { nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from 'stores';
import { ACCESS_TOKEN_KEY, REGISTER_ACCESS_TOKEN_KEY } from 'utils/constants';

const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
const registerToken = localStorage.getItem(REGISTER_ACCESS_TOKEN_KEY);

export const auth = async (from: RouteLocationNormalized, to: RouteLocationNormalized, next: NavigationGuardNext) => {
  const { loggedIn, registering } = storeToRefs(useAuthStore());

  if (from.meta.requiresAuth && !loggedIn.value) {
    if (accessToken) {
      return next();
    } else {
      return next(`/login`);
    }
  } else {
    await nextTick();

    if (!registering.value && from.path == '/verify') {
      return next('/login');
    } else if (loggedIn.value && ['/login', '/verify', '/register'].includes(from.path)) {
      return next('/dashboard');
    } else if (registerToken && registerToken != '') {
      if (from.path == '/verify') {
        return next();
      } else {
        return next(`/verify`);
      }
    } else {
      return next();
    }
  }
};
