import { axiosInstance, baseUrls } from 'api/axiosConfig';
import { CreateStoreBody } from './storeSchemas';

export const store = {
  create: (body: CreateStoreBody) => axiosInstance.post(`${baseUrls.store}`, body),
};
