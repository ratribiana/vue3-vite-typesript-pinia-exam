<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { useStorage } from '@vueuse/core';
import VOtpInput from 'vue3-otp-input';
import BaseButton from 'components/base/BaseButton';
import { useAuth } from 'composables/useAuth';
import { IError } from 'types/error.types';
import { maskEmail } from 'utils/functions';
import { USER_EMAIL } from 'utils/constants';

const { isVerifyUserLoading, verifyUser, isRequestNewOTPLoading, requestNewOTP } = useAuth();

interface VerifyForm {
  otp?: string;
  hasError?: boolean;
  errorMessage?: Ref<IError | object>;
}

const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null);
const otp: string = ref('');
const requestOTPMessage: string = ref('');
const requestOTPDisabled: boolean = ref('');
const verified: boolean = ref(false);
const userEmail: string = useStorage(USER_EMAIL);

const verifyForm: VerifyForm = reactive({
  otp: '',
  hasError: false,
  disabled: true,
  errorMessage: '',
});

const handleOnChange = () => {
  clearErrors();
};

watch([otp], () => {
  verifyForm.disabled = !(otp.value && otp.value.length == 6);
});

const onVerify = async (): Promise<void> => {
  requestOTPMessage.value = '';

  if (otp.value && otp.value.length == 6) {
    const values = { otp: otp.value };

    verifyUser(values)
      .then((response) => {
        verified.value = !!response?.success;
      })
      .catch((error) => {
        verifyForm.errorMessage = error;
        requestOTPDisabled.value = false;
        otp.value = '';
      });
  }
};

const onRequestNewOTP = async (): Promise<void> => {
  otp.value = '';
  verifyForm.errorMessage = null;

  requestNewOTP()
    .then(() => {
      requestOTPMessage.value = 'New 6-Digit OTP has been sent to your email';
    })
    .catch((error) => {
      verifyForm.errorMessage = error;
    });
};

const clearErrors = () => {
  verifyForm.errorMessage = null;
  requestOTPMessage.value = '';
};
</script>
<template>
  <div v-if="!verified">
    <h2 class="text-jacarta-600 dark:text-white text-sm text-center normal-case mb-8">
      Please Enter 6-Digit One-Time Password sent to <span class="lowercase font-bold">{{ maskEmail(userEmail) }}</span>
    </h2>
    <form ref="baseForm" class="space-y-4 md:space-y-6" @submit.prevent="onVerify">
      <div class="text-red dark:text-[#f78181] text-center normal-case" v-if="verifyForm.errorMessage?.message">
        {{ verifyForm.errorMessage?.message }} by clicking request another OTP button
      </div>
      <div class="text-green-600 dark:text-green-300 text-center normal-case" v-if="requestOTPMessage && requestOTPMessage != ''">
        {{ requestOTPMessage }}
      </div>
      <div class="flex flex-row">
        <v-otp-input
          ref="otpInput"
          v-model:value="otp"
          input-classes="otp-input"
          separator="-"
          :num-inputs="6"
          :should-auto-focus="true"
          input-type="number"
          :placeholder="['*', '*', '*', '*', '*', '*']"
          @on-change="handleOnChange"
        />
      </div>
      <div>
        <BaseButton
          v-if="!verifyForm.errorMessage"
          type="submit"
          @click="onVerify()"
          :disabled="verifyForm.hasError || verifyForm.disabled"
          :loading="isVerifyUserLoading"
          class="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
        >
          Verify
        </BaseButton>
        <BaseButton
          v-if="verifyForm.errorMessage"
          type="submit"
          @click="onRequestNewOTP()"
          :loading="isRequestNewOTPLoading"
          :disabled="requestOTPDisabled"
          class="w-full mt-6 text-white bg-purple-700 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-700 dark:hover:bg-purple-900 dark:focus:ring-purple-800"
        >
          Request Another OTP
        </BaseButton>
      </div>
    </form>
  </div>
  <div v-else>
    <div class="text-green-400 text-center normal-case text-6xl text-bold"><i class="fa-regular fa-circle-check m-auto"></i></div>
    <h2 class="text-jacarta-600 dark:text-white text-center normal-case text-md text-bold">Your account is verified</h2>
    <p class="text-jacarta-600 dark:text-white text-center normal-case mt-10">
      We have verified your account. Please go to <RouterLink to="/login" class="normal-case font-bold text-green-400">login</RouterLink> page to sign
      in.
    </p>
  </div>
</template>
<style>
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 8px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
/* Background colour of an input field with value */
.otp-input.is-complete {
  background-color: #e4e4e4;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}
</style>
