import { axiosInstance, baseUrls } from 'api/axiosConfig';
import { CrearCategoriaBody, CrearProductoBody, CrearVarianteBody } from './productSchemas';

export const product = {
  listVariants: () => axiosInstance.get(`${baseUrls.product}/variants`),

  create: (body: CrearProductoBody) => axiosInstance.post(baseUrls.product, body),

  createCategory: (body: CrearCategoriaBody) =>
    axiosInstance.post(`${baseUrls.product}/categories`, body),

  createVariant: (body: CrearVarianteBody) =>
    axiosInstance.post(`${baseUrls.product}/variants`, body),
};
