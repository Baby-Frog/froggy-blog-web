import { ENDPOINTS } from "src/constants/endpoints";
import { TAuthResponse } from "src/types/auth-response.types";
import http from "src/utils/http";

export const authApi = {
  register: (body: { email: string; password: string; rePassword: string }) =>
    http.post<TAuthResponse>(ENDPOINTS.REGISTER, {
      body,
    }),
  login: (body: { email: string; password: string }) => http.post<TAuthResponse>(ENDPOINTS.LOGIN, { body }),
  logout: () => http.post(ENDPOINTS.LOGOUT),
};
