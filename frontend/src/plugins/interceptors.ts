import type { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosStatic } from 'axios';
import { ACCESS_TOKEN_KEY } from '@/utils/constants';
interface AxiosOriginalRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

export default function interceptors(axios: AxiosStatic) {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  axios.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (accessToken && config.headers) {
        config.headers.authorization = `Bearer ${accessToken}`;
      }

      return config;
    },

    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    async (error: AxiosError) => {
      const originalConfig: AxiosOriginalRequestConfig = error.config;

      if (error.response) {
        if (error.response.status === 401) {
          // refreshToken(originalConfig, axios); // enable if app's required refresh token
        }

        return Promise.reject(error.response.data);
      }
    },
  );
}

const refreshToken = async (originalConfig: AxiosRequestConfig<any>, axios: AxiosStatic) => {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    });
  }

  isRefreshing = true;

  try {
    const accessToken = ''; // fetch new token here and push new token for accessToken variable

    if (originalConfig?.headers) {
      originalConfig.headers.authorization = `Bearer ${accessToken}`;
    }

    processQueue(null, accessToken);

    return axios(originalConfig);
  } catch (error) {
    processQueue(error, null);
    return Promise.reject(error);
  } finally {
    isRefreshing = false;
  }
};
