import type { IUserCarts } from 'types/cart.types';
import type { IParams, IProduct, IProductsListResponse } from 'types/product.types';
import { $axios, setBaseUrl, setToken } from 'plugins/axios';
import { EXTERNAL_API_ACCESS_TOKEN_KEY, USER_ID } from 'utils/constants';

const EXTERNAL_USER_ID = localStorage.getItem(USER_ID);
const EXTERNAL_ACCESS_TOKEN = localStorage.getItem(EXTERNAL_API_ACCESS_TOKEN_KEY);

export const fetchProduct = (params: IParams) => {
  setBaseUrl($axios, import.meta.env.VITE_API_DUMMY_BASE_URL);
  setToken($axios, EXTERNAL_ACCESS_TOKEN, 'Bearer');
  return $axios.get<unknown, IProductsListResponse>('/products', { params });
};

export const fetchCategories = () => {
  setBaseUrl($axios, import.meta.env.VITE_API_DUMMY_BASE_URL);
  setToken($axios, EXTERNAL_ACCESS_TOKEN, 'Bearer');
  return $axios.get<unknown, string[]>('/products/categories');
};

export const fetchProductOfCategory = (category: string, params?: IParams) => {
  setBaseUrl($axios, import.meta.env.VITE_API_DUMMY_BASE_URL);
  setToken($axios, EXTERNAL_ACCESS_TOKEN, 'Bearer');
  return $axios.get<unknown, IProductsListResponse>(`/products/category/${category}`, { params });
};

export const fetchUserCarts = (userId: string | number, params?: IParams) => {
  setBaseUrl($axios, import.meta.env.VITE_API_DUMMY_BASE_URL);
  setToken($axios, EXTERNAL_ACCESS_TOKEN, 'Bearer');
  return $axios.get<unknown, IUserCarts>(`/carts/user/${userId}`, { params });
};

export const fetchProductDetails = (productId: string | number) => {
  setBaseUrl($axios, import.meta.env.VITE_API_DUMMY_BASE_URL);
  setToken($axios, EXTERNAL_ACCESS_TOKEN, 'Bearer');
  return $axios.get<unknown, IProduct>(`/products/${productId}`);
};

export const addProductToCart = (userId: string | number, products: { id: string | number; quantity: number }[]) => {
  setBaseUrl($axios, import.meta.env.VITE_API_DUMMY_BASE_URL);
  setToken($axios, EXTERNAL_ACCESS_TOKEN, 'Bearer');
  return $axios.put<unknown, IProduct>(`/carts/${EXTERNAL_USER_ID}`, { userId, merge: true, products });
};
