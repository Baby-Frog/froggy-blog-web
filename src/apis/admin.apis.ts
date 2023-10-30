import { ADMIN_ENDPOINTS } from "src/constants/endpoints";
import { TQueryResponse, TSuccessApiResponse } from "src/types/response.types";
import http from "src/utils/http";

export const adminApi = {
  getDashboardOverview: () =>
    http.get<TSuccessApiResponse<{ accounts: number; posts: number }>>(ADMIN_ENDPOINTS.GET_OVERVIEW),
};
