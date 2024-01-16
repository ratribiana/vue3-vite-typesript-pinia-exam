<script setup lang="ts">
import { Ref, reactive, ref, watch } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useAuth } from 'composables/useAuth';
import { IError } from 'types/error.types';
import BaseInput from 'components/base/BaseInput';
import BaseButton from 'components/base/BaseButton';
import { useAuthStore } from 'stores';

interface RegisterForm {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  formIsValid?: boolean;
  disable?: boolean;
  errorMessage?: Ref<IError | object>;
}

const authStore = useAuthStore();

const registerForm: RegisterForm = reactive({
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
  formIsValid: true,
  disable: false,
  errorMessage: '',
});

const { isSignUpLoading, signUpError, signUp } = useAuth();

const passwordScore = ref('');
const criteriaMet = ref({});
const criteria = ref({
  length: 'Minimum of 8 characters',
  digit: 'At least one digit',
  uppercase: 'At least one uppercase letter',
  lowercase: 'At least one lowercase letter',
  specialChar: 'At least one special character',
});

const checkpasswordScore = (event) => {
  const criteria: Record<string, number | boolean> = {
    length: event.target.value.length >= 8 ? 18 : 0,
    uppercase: /[A-Z]/.test(event.target) ? 4 : 0,
    uppercaseCount: (event.target.value.match(/[A-Z]/g) || []).length >= 2 ? 10 : 0,
    digit: /\d/.test(event.target.value) ? 5 : 0,
    digitCount: (event.target.value.match(/\d/g) || []).length > 1 ? 12 : 0,
    lowercase: /[a-z]/.test(event.target) ? 5 : 0,
    lowercaseCount: (event.target.value.match(/[a-z]/g) || []).length > 1 ? 10 : 0,
    mixedCase: /[a-z]/.test(event.target) && /[A-Z]/.test(event.target.value) ? 22 : 0,
    multipleCase: (event.target.value.match(/[a-z]/g) || []).length > 1 && (event.target.value.match(/[A-Z]/g) || []).length > 1 ? 10 : 0,
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(event.target.value) ? 23 : 0,
    specialCharCount:
      (event.target.value.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length === 2
        ? 10
        : (event.target.value.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length >= 3
          ? 12
          : 0,
  };

  const strength = Object.values(criteria).reduce((acc, curr) => acc + curr, 0);

  const { length, digit, lowercase, uppercase, specialChar } = criteria;

  criteriaMet.value = { length, digit, lowercase, uppercase, specialChar };
  passwordScore.value = strength > 100 ? 100 : strength;

  clearErrors();
};

const getProgressBarColor = (score: number): string => {
  if (score >= 85) {
    return 'bg-green-500';
  } else if (score >= 50) {
    return 'bg-orange-300';
  } else {
    return 'bg-red-300';
  }
};

const validationSchema = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().required('Email address is required').email('Please provide valid email address'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const { handleSubmit, errors } = useForm<RegisterForm>({ validationSchema });

const onRegister = handleSubmit(async (values) => {
  signUp(values).catch((error) => {
    registerForm.errorMessage = error;
  });
});

watch([errors, signUpError], () => {
  registerForm.formIsValid = !Object.keys(errors.value).length;
});

const clearErrors = () => {
  registerForm.errorMessage = null;
};
</script>
<template>
  <form ref="baseForm" class="space-y-4 md:space-y-6">
    <div class="text-red dark:text-[#f78181] text-center normal-case" v-if="registerForm.errorMessage?.message">
      {{ registerForm.errorMessage?.message }}
    </div>
    <div>
      <BaseInput
        name="firstName"
        type="text"
        :label="'First Name'"
        placeholder="Please Enter Your First Name"
        v-model="registerForm.firstName"
        @input="clearErrors"
        required="required"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    <div>
      <BaseInput
        name="lastName"
        type="text"
        :label="'Last Name'"
        placeholder="Please Enter Your Last Name"
        v-model="registerForm.lastName"
        @input="clearErrors"
        required="required"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    <div>
      <BaseInput
        name="email"
        type="email"
        :label="'Email'"
        placeholder="Please Enter Your Email"
        autocomplete="email"
        v-model="authStore.email"
        @input="clearErrors"
        required="required"
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
        v-model="registerForm.password"
        @input="checkpasswordScore"
        required="required"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>

    <div class="container mx-auto">
      <div v-if="registerForm.password" class="mt-4">
        <div class="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
          <div class="h-1.5 rounded-full" :style="{ width: passwordScore + '%' }" :class="getProgressBarColor(passwordScore)"></div>
        </div>
        <ul class="list-style-none">
          <li v-for="(score, value) in criteriaMet" :key="value" class="list-disc ml-4 list-none ml-0">
            <i v-if="score == 0" class="fa-regular fa-circle-xmark text-red-300 mr-2"></i>
            <i v-if="score > 0" class="fa-regular fa-circle-check text-green-500 mr-2"></i>
            {{ criteria[value] }}
          </li>
        </ul>
      </div>
    </div>
    <div>
      <BaseInput
        name="confirmPassword"
        type="password"
        :label="'Confirm Password'"
        placeholder="Enter Password Confirmation"
        v-model="authStore.confirmPassword"
        @input="clearErrors"
        required="required"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    <div>
      <BaseButton
        type="submit"
        @click="onRegister()"
        :disabled="!registerForm.formIsValid || registerForm.disabled || authStore.isLoading || isSignUpLoading || passwordScore < 85"
        :loading="isSignUpLoading"
        class="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
      >
        Sign Up
      </BaseButton>
    </div>
  </form>

  <p class="text-center text-sm font-light text-gray-500 dark:text-gray-400">
    Already have an account?
    <RouterLink to="/" class="font-medium text-gray-500 dark:text-gray-300"> Login </RouterLink>
  </p>
</template>
