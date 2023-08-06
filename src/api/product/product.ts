import { axiosInstance, baseUrls } from 'api/axiosConfig';
import { CrearCategoriaBody, CrearProductoBody } from './productSchemas';

export const product = {
  create: (body: CrearProductoBody) => axiosInstance.post(baseUrls.product, body),

  createCategory: (body: CrearCategoriaBody) => axiosInstance.post(`${baseUrls.product}/categories`, body),
};
