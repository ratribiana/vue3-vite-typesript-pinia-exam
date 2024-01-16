import { $axios, setBaseUrl, setToken } from 'plugins/axios';
import type { IAuth, IRegister, IUserInfo } from 'types/auth.types';
import type { IUser } from 'types/user.types';
import { useAuthStore } from 'stores';

const auth = () => ({
  login(body: IAuth) {
    setBaseUrl($axios, import.meta.env.VITE_API_URL);
    return $axios.post<IUser, IUser>('/v1/login', body);
  },

  register(body: IRegister) {
    setBaseUrl($axios, import.meta.env.VITE_API_URL);
    return $axios.post('/v1/register', body);
  },

  verifyUser(body: IRegister) {
    const { registerToken } = useAuthStore();

    setBaseUrl($axios, import.meta.env.VITE_API_URL);
    setToken($axios, registerToken, 'Bearer');

    return $axios.post('/v1/verify', body);
  },

  requestNewOTP() {
    const { registerToken } = useAuthStore();

    setBaseUrl($axios, import.meta.env.VITE_API_URL);
    setToken($axios, registerToken, 'Bearer');

    return $axios.get('/v1/request-otp');
  },

  getUser() {
    const { accessToken } = useAuthStore();

    setBaseUrl($axios, import.meta.env.VITE_API_URL);
    setToken($axios, accessToken, 'Bearer');

    return $axios.get<unknown, IUserInfo>(`/v1/user`);
  },
});

export const { login, register, getUser, verifyUser, requestNewOTP } = auth();
