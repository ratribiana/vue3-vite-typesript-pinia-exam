import { ACCESS_TOKEN_KEY } from '@/utils/constants';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const checkLoggedIn = async (from: RouteLocationNormalized, to: RouteLocationNormalized, next: NavigationGuardNext) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (accessToken) {
    next('/');
  } else {
    next();
  }
};

export { checkLoggedIn };
