import { ENDPOINTS } from "src/constants/endpoints";
import { TAuthResponse } from "src/types/auth-response.types";
import http from "src/utils/http";

export const authApi = {
  register: (body: { email: string; password: string; rePassword: string }) =>
    http.post<TAuthResponse>(ENDPOINTS.REGISTER, body),
  login: (body: { email: string; password: string }) => http.post<TAuthResponse>(ENDPOINTS.LOGIN, body),
  logout: (body: { refreshToken: string }) => http.post(`/api${ENDPOINTS.LOGOUT}`, body),
  refreshToken: (body: { refreshToken: string }) => http.post<TAuthResponse>(ENDPOINTS.REFRESH_TOKEN, body),
};
