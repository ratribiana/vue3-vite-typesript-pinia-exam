<script setup lang="ts">
import { Ref, reactive, watch } from 'vue';
import { useForm } from 'vee-validate';
import { useToast } from 'vue-toastification';
import * as yup from 'yup';
import { useAuth } from 'composables/useAuth';
import { IError } from 'types/error.types';
import BaseButton from 'components/base/BaseButton';
import BaseInput from 'components/base/BaseInput';

import { useAuthStore } from 'stores';

interface AuthForm {
  email: string;
  password: string;
  formIsValid?: boolean;
  disable?: boolean;
  errorMessage?: Ref<IError | object>; // Assuming signInError is of type string or null
}

const authStore = useAuthStore();
const notification = useToast();

/**
 * Note that we don't have the email here. Its in the authStore - we put it there so we can remember the email entered across the login, forgot password, and register pages.
 */
const authForm: AuthForm = reactive({
  password: '',
  formIsValid: true,
  disable: false,
  errorMessage: '',
});

const { isSignInLoading, signInError, signIn, loggedIn } = useAuth();

const validationSchema = yup.object({
  email: yup.string().required('Email address is required').email('Please provide valid email address'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 6 characters'),
});

const { handleSubmit, errors } = useForm<AuthForm>({ validationSchema });

const onLogin = handleSubmit(async (values) => {
  signIn(values)
    .then(() => {
      if (loggedIn) return notification.success('Login Successful');
    })
    .catch((error) => {
      authForm.errorMessage = error;
    });
});

watch([errors, signInError], () => {
  authForm.formIsValid = !Object.keys(errors.value).length;
});

const clearErrors = () => {
  authForm.errorMessage = null;
};
</script>

<template>
  <form ref="baseForm" class="space-y-4 md:space-y-6">
    <div class="text-red dark:text-[#f78181] text-center" v-if="authForm.errorMessage?.message">
      {{ authForm.errorMessage?.message }}
    </div>
    <div>
      <BaseInput
        ref="emailInput"
        name="email"
        type="email"
        :label="'Email'"
        placeholder="Please Enter Your Email"
        autocomplete="email"
        v-model="authStore.email"
        @input="clearErrors"
        autofocus
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    <div>
      <BaseInput
        name="password"
        type="password"
        :label="'password'"
        placeholder="Please Enter Your Password"
        autocomplete="current-password"
        v-model="authForm.password"
        @input="clearErrors"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    <div class="flex items-center justify-between">
      <div class="flex items-start">
        <div class="flex items-center h-5">
          <RouterLink to="/forgot-password" class="text-sm font-medium text-gray-500 dark:text-gray-300 hover:underline">Forgot password?</RouterLink>
        </div>
      </div>
      <div class="flex items-start">
        <div class="flex items-center h-5"></div>
      </div>
    </div>
    <BaseButton
      type="submit"
      @click="onLogin()"
      :disabled="!authForm.formIsValid || authForm.disabled || authStore.isLoading || isSignInLoading"
      :loading="isSignInLoading"
      class="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
    >
      Sign In
    </BaseButton>
  </form>

  <p class="text-center text-sm font-light text-gray-500 dark:text-gray-400">
    Don’t have an account yet?
    <RouterLink to="/register" class="font-medium text-gray-500 dark:text-gray-300"> Sign up </RouterLink>
  </p>
</template>
