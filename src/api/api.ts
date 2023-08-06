import { auth } from './auth/auth';
import { product } from './product/product';
import { axiosInstance } from './axiosConfig';
import { store } from './store/store';

export const api = {
  ping: () => axiosInstance.get('/ping'),
  auth,
  store,
  product,
};
