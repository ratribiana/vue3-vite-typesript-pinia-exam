import { useMutation } from 'vue-query';
import { login, register, requestNewOTP, verifyUser } from 'services/auth';
import type { IAuth, IRegister, IVerify } from 'types/auth.types';
import type { UseQueryOptions } from 'vue-query';

export const loginMutation = (options?: UseQueryOptions) => {
  return useMutation({
    mutationFn: (body: IAuth) => login(body),
  });
};

export const registerMutation = (options?: UseQueryOptions) => {
  return useMutation({
    mutationFn: (body: IRegister) => register(body),
  });
};

export const verifyMutation = (options?: UseQueryOptions) => {
  return useMutation({
    mutationFn: (body: IVerify) => verifyUser(body),
  });
};

export const requestNewOTPMutation = (options?: UseQueryOptions) => {
  return useMutation({
    mutationFn: () => requestNewOTP(),
  });
};
