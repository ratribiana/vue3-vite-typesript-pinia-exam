import { nextTick } from 'vue';
import { storeToRefs } from 'pinia';

import router from '@/router';
import { useAuthStore } from '@/stores';

import { $axios, setToken } from '@/plugins/axios';
import { loginMutation, registerMutation, requestNewOTPMutation, verifyMutation } from '@/services/auth/query';

import { ACCESS_TOKEN_KEY, EXTERNAL_API_ACCESS_TOKEN_KEY, FULL_NAME, REGISTER_ACCESS_TOKEN_KEY, USER_EMAIL, USER_ID } from '@/utils/constants';

export const useAuth = () => {
  const { getUserInfo: fetchUser, updateUserInfo, logout } = useAuthStore();
  const { loggedIn, userInfo: user, accessToken, registerToken } = storeToRefs(useAuthStore());

  const { data: loginData, isLoading: isSignInLoading, error: signInError, mutateAsync: loginMutateAsync } = loginMutation();

  const { data: registerData, isLoading: isSignUpLoading, error: signUpError, mutateAsync: registerMutateAsync } = registerMutation();

  const { data: verifyUserData, isLoading: isVerifyUserLoading, error: verifyUserError, mutateAsync: verifyUserMutateAsync } = verifyMutation();

  const {
    data: requestNewOTPData,
    isLoading: isRequestNewOTPLoading,
    error: requestNewOTPError,
    mutateAsync: requestNewOTPMutateAsync,
  } = requestNewOTPMutation();

  const signIn = async (values: { email: string; password: string }) => {
    const { password, email } = values;
    useAuthStore().isLoading = true;
    try {
      await loginMutateAsync({
        password,
        email,
      });

      if (loginData && loginData.value) {
        localStorage.setItem(ACCESS_TOKEN_KEY, loginData.value?.data?.token);
        localStorage.setItem(USER_ID, loginData.value?.data?.apiUser?.id);
        localStorage.setItem(EXTERNAL_API_ACCESS_TOKEN_KEY, loginData.value?.data?.apiUser?.token);
        accessToken.value = loginData.value?.data?.token;

        setToken($axios, loginData.value?.token, 'Bearer');

        const user = await fetchUser();

        localStorage.setItem(USER_EMAIL, user?.email);
        localStorage.setItem(FULL_NAME, `${user?.firstName} ${user?.lastName}`);

        router.push('/dashboard');
      }
    } finally {
      useAuthStore().isLoading = false;
    }
  };

  const signUp = async (values: { firstName: string; lastName: string; email: string; password: string }) => {
    const { lastName, firstName, email, password } = values;

    useAuthStore().isLoading = true;

    try {
      await registerMutateAsync({
        firstName,
        lastName,
        email,
        password,
      });

      if (registerData && registerData.value) {
        localStorage.setItem(REGISTER_ACCESS_TOKEN_KEY, registerData.value?.data?.token);
        localStorage.setItem(USER_EMAIL, email);
        registerToken.value = registerData.value?.data?.token;

        nextTick(() => {
          router.push('/verify');
        });
      }
    } finally {
      useAuthStore().isLoading = false;
    }
  };

  const verifyUser = async (values: { otp: string }) => {
    const { otp } = values;
    useAuthStore().isLoading = true;
    try {
      await verifyUserMutateAsync({
        otp,
      });

      if (verifyUserData && verifyUserData.value) {
        if (verifyUserData.value?.success) {
          localStorage.removeItem(REGISTER_ACCESS_TOKEN_KEY);
        }

        return verifyUserData.value;
      }
    } finally {
      useAuthStore().isLoading = false;
    }
  };

  const requestNewOTP = async () => {
    useAuthStore().isLoading = true;
    try {
      await requestNewOTPMutateAsync();

      if (requestNewOTPData && requestNewOTPData.value) {
        return requestNewOTPData.value;
      }
    } finally {
      useAuthStore().isLoading = false;
    }
  };

  const signOut = () => {
    logout();

    setToken($axios, '', 'Bearer');
    router.push('/login');
  };

  return {
    loggedIn,
    user,
    fetchUser,
    updateUserInfo,
    isSignInLoading,
    isSignUpLoading,
    isVerifyUserLoading,
    isRequestNewOTPLoading,
    signInError,
    signUpError,
    verifyUserError,
    requestNewOTPError,
    signIn,
    signUp,
    signOut,
    verifyUser,
    requestNewOTP,
  };
};
