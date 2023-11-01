import { TOPIC_ENDPOINTS } from "src/constants/endpoints";
import { TApiQueryParams } from "src/types/query.types";
import { TQueryResponse, TSuccessApiResponse } from "src/types/response.types";
import { TTopics } from "src/types/topic.types";
import http from "src/utils/http";

export const topicApi = {
  getTopics: () => http.get<TQueryResponse<TTopics[]>>(TOPIC_ENDPOINTS.GET_TOPICS),
  getTopicById: (topicId: string) =>
    http.get<TSuccessApiResponse<TTopics>>(`${TOPIC_ENDPOINTS.GET_TOPIC_BY_ID}/${topicId}`),
  getTopicsByKeyword: ({ keyword, pageNumber, pageSize, orderBy, column }: TApiQueryParams) =>
    http.get<TQueryResponse<TTopics[]>>(TOPIC_ENDPOINTS.GET_TOPICS, {
      params: {
        keyword: keyword,
        orderBy: orderBy || "asc",
        column: column || "topicCode",
        pageNumber: pageNumber || 1,
        pageSize: pageSize || 7,
      },
    }),
};
