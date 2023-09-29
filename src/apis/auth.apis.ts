import { AUTH_ENDPOINTS } from "src/constants/endpoints";
import { TAuthResponse } from "src/types/auth-response.types";
import http from "src/utils/http";

export const authApi = {
  register: (body: { fullName: string; captcha: string; email: string; password: string; rePassword: string }) =>
    http.post<TAuthResponse>(AUTH_ENDPOINTS.REGISTER, body),
  login: (body: { email: string; password: string }) => http.post<TAuthResponse>(AUTH_ENDPOINTS.LOGIN, body),
  logout: (body: { refreshToken: string }) => http.post(AUTH_ENDPOINTS.LOGOUT, body),
  refreshToken: (body: { refreshToken: string }) => http.post<TAuthResponse>(AUTH_ENDPOINTS.REFRESH_TOKEN, body),
  getRecaptcha: () => http.get<Blob>(AUTH_ENDPOINTS.GET_RECAPTCHA),
  verifyCaptcha: (params: { captcha: string }) =>
    http.post(
      AUTH_ENDPOINTS.VERIFY_RECAPTCHA,
      {},
      {
        params,
      },
    ),
};
