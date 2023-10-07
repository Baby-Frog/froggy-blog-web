import { AUTH_ENDPOINTS } from "src/constants/endpoints";
import { TAuthResponse } from "src/types/auth-response.types";
import { TSuccessApiResponse } from "src/types/response.types";
import { TUserProfile } from "src/types/user.types";
import http from "src/utils/http";

export const authApi = {
  register: (body: { fullName: string; email: string; password: string; rePassword: string; captcha: string }) =>
    http.post<TAuthResponse>(AUTH_ENDPOINTS.REGISTER, body),
  login: (body: { email: string; password: string }) => http.post<TAuthResponse>(AUTH_ENDPOINTS.LOGIN, body),
  logout: (body: { refreshToken: string }) => http.post(AUTH_ENDPOINTS.LOGOUT, body),
  refreshToken: (body: { refreshToken: string }) => http.post<TAuthResponse>(AUTH_ENDPOINTS.REFRESH_TOKEN, body),
  getMe: () => http.get<TSuccessApiResponse<TUserProfile>>(AUTH_ENDPOINTS.GET_ME),
  getAnonymousProfile: (userId: string) =>
    http.get<TSuccessApiResponse<TUserProfile>>(`${AUTH_ENDPOINTS.GET_ANONYMOUS_PROFILE}/${userId}`),
};
