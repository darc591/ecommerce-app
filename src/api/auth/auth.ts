import { axiosInstance, baseUrls } from 'api/axiosConfig';
import { LoginBody, SignUpBody } from './authSchemas';

export const auth = {
  signup: (body: SignUpBody) => axiosInstance.post(`${baseUrls.auth}/signup`, body),

  login: (body: LoginBody) => axiosInstance.post(`${baseUrls.auth}/login`, body),
};
