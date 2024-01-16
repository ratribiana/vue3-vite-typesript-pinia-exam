import { defineStore } from 'pinia';
import state from './state';
import { getUser } from 'services/auth';
import type { IUser } from 'types/user.types';
import { ACCESS_TOKEN_KEY, EXTERNAL_API_ACCESS_TOKEN_KEY, REGISTER_ACCESS_TOKEN_KEY, USER_ID } from 'utils/constants';

export const useAuthStore = defineStore({
  id: 'auth',
  state,
  actions: {
    async getUserInfo(): Promise<IUser> {
      try {
        const user = await getUser();
        if (user) {
          this.userInfo = user?.data;
          this.userInfo.fullName = `${user?.data.firstName} ${user?.data.lastName}`;

          return Promise.resolve(this.userInfo);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
    updateUserInfo(user: IUser) {
      this.userInfo = user;
    },
    logout() {
      this.accessToken = null;
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(USER_ID);
      localStorage.removeItem(REGISTER_ACCESS_TOKEN_KEY);
      localStorage.removeItem(EXTERNAL_API_ACCESS_TOKEN_KEY);
      this.userInfo.value = {};
    },
  },
  getters: {
    loggedIn: (state) => !!state.accessToken,
    registering: (state) => !!state.registerToken,
  },
});
