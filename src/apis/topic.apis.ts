import { ENDPOINTS } from "src/constants/endpoints";
import { TSuccessApiResponse } from "src/types/response.types";
import { TTopics } from "src/types/topic.types";
import http from "src/utils/http";

export const topicApi = {
  getTopics: () => http.get<TSuccessApiResponse<TTopics>>(ENDPOINTS.GET_TOPICS),
};
