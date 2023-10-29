import { AUTH_ENDPOINTS } from "src/constants/endpoints";
import { TProfileSchema } from "src/schemas/profile.schema";
import { TAuthResponse } from "src/types/auth-response.types";
import { TApiQueryParams } from "src/types/query.types";
import { TQueryResponse, TSuccessApiResponse } from "src/types/response.types";
import { TAnonymousProfile, TUserProfile } from "src/types/user.types";
import http from "src/utils/http";
import { TChartData } from "./chart.api";

export const authApi = {
  register: (body: { fullName: string; email: string; password: string; rePassword: string; captcha: string }) =>
    http.post<TAuthResponse>(AUTH_ENDPOINTS.REGISTER, body),
  login: (body: { email: string; password: string }) => http.post<TAuthResponse>(AUTH_ENDPOINTS.LOGIN, body),
  logout: (body: { refreshToken: string }) => http.post(AUTH_ENDPOINTS.LOGOUT, body),
  refreshToken: (body: { refreshToken: string }) => http.post<TAuthResponse>(AUTH_ENDPOINTS.REFRESH_TOKEN, body),
  getMe: () => http.get<TSuccessApiResponse<TUserProfile>>(AUTH_ENDPOINTS.GET_ME),
  updateMe: (body: TProfileSchema) => http.post<TSuccessApiResponse<TUserProfile>>(AUTH_ENDPOINTS.UPDATE_ME, body),
  searchUsers: ({ keyword, pageSize, column, orderBy, pageNumber }: TApiQueryParams) =>
    http.get<TQueryResponse<TUserProfile[]>>(AUTH_ENDPOINTS.SEARCH_USERS, {
      params: {
        keyword: keyword || "",
        pageSize: pageSize || 7,
        column: column || "createdAt",
        orderBy: orderBy || "desc",
        pageNumber: pageNumber || 1,
      },
    }),
  getAnonymousProfile: (userId: string) =>
    http.get<TSuccessApiResponse<TAnonymousProfile>>(`${AUTH_ENDPOINTS.GET_ANONYMOUS_PROFILE}/${userId}`),
  getChartData: (params: { period?: string }) =>
    http.get<TSuccessApiResponse<TChartData[]>>(AUTH_ENDPOINTS.GET_CHART_DATA, { params }),
};
