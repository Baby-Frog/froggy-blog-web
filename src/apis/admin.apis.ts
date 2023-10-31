import { ADMIN_ENDPOINTS } from "src/constants/endpoints";
import { TAdminQueryConfig, TApiQueryParams } from "src/types/query.types";
import { TQueryResponse, TSuccessApiResponse } from "src/types/response.types";
import { TUserProfile } from "src/types/user.types";
import http from "src/utils/http";

export const adminApi = {
  getDashboardOverview: () =>
    http.get<TSuccessApiResponse<{ accounts: number; posts: number }>>(ADMIN_ENDPOINTS.GET_OVERVIEW),
  searchUserAdmin: (params: TAdminQueryConfig) =>
    http.get<TQueryResponse<TUserProfile[]>>(ADMIN_ENDPOINTS.SEARCH_USER_ADMIN, { params }),
};
