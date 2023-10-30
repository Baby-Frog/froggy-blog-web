import { AUTH_ENDPOINTS, CHART_ENDPOINTS } from "src/constants/endpoints";
import { TSuccessApiResponse } from "src/types/response.types";
import http from "src/utils/http";

export type TChartData = {
  date: string;
  likes: number;
  posts: number;
  comments: number;
};

export type TOverviewChartData = {
  date: string;
  posts: number;
  accounts: number;
};

export const chartApi = {
  getChartData: (params: { period?: string }) =>
    http.get<TSuccessApiResponse<TChartData[]>>(CHART_ENDPOINTS.GET_CHART_DATA, { params }),
  getDashboardChartData: (params: { period?: string }) =>
    http.get<TSuccessApiResponse<TOverviewChartData[]>>(CHART_ENDPOINTS.GET_DASHBOARD_CHART_DATA, { params }),
};
