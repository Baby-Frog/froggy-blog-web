import { ADMIN_ENDPOINTS, STORY_ENDPOINTS, TOPIC_ENDPOINTS } from "src/constants/endpoints";
import { TAdminQueryConfig } from "src/types/query.types";
import { TReport } from "src/types/report.types";
import { TQueryResponse, TSuccessApiResponse } from "src/types/response.types";
import { TStory } from "src/types/story.types";
import { TTopics } from "src/types/topic.types";
import { TUserProfile } from "src/types/user.types";
import http from "src/utils/http";

export const adminApi = {
  getDashboardOverview: () =>
    http.get<TSuccessApiResponse<{ accounts: number; posts: number }>>(ADMIN_ENDPOINTS.GET_OVERVIEW),
  searchUserAdmin: (params: TAdminQueryConfig) =>
    http.get<TQueryResponse<TUserProfile[]>>(ADMIN_ENDPOINTS.SEARCH_USER_ADMIN, { params }),
  searchTopicsAdmin: (params: TAdminQueryConfig) =>
    http.get<TQueryResponse<TTopics[]>>(TOPIC_ENDPOINTS.GET_TOPICS, { params }),
  searchStoriesAdmin: (params: TAdminQueryConfig) =>
    http.get<TQueryResponse<TStory[]>>(STORY_ENDPOINTS.GET_RECENT_STORIES, { params }),
  getPendingStoriesAdmin: (params: TAdminQueryConfig) =>
    http.get<TQueryResponse<TStory[]>>(ADMIN_ENDPOINTS.GET_PENDING_STORIES, { params }),
  changeStoryStatus: (body: { postId: string; status: "PUBLISHED" | "BANNED" }) =>
    http.post<TSuccessApiResponse<null>>(ADMIN_ENDPOINTS.CHANGE_STORY_STATUS, body),
  searchReports: () => http.get<TQueryResponse<TReport[]>>(ADMIN_ENDPOINTS.GET_REPORTS),
  acceptReport: (reportId: string) =>
    http.delete<TSuccessApiResponse<null>>(`${ADMIN_ENDPOINTS.ACCEPT_REPORT}/${reportId}`),
  denyReport: (reportId: string) =>
    http.delete<TSuccessApiResponse<null>>(`${ADMIN_ENDPOINTS.REJECT_REPORT}/${reportId}`),
  addRoleToUser: (body: { email: string; roleId: string }) =>
    http.post<TSuccessApiResponse<null>>(ADMIN_ENDPOINTS.ADD_ROLE_TO_USER, body),
  createNewTopic: (body: { topicName: string }) =>
    http.post<TSuccessApiResponse<null>>(TOPIC_ENDPOINTS.ADD_NEW_TOPIC, body),
  deleteTopic: (topicId: string) =>
    http.delete<TSuccessApiResponse<null>>(`${TOPIC_ENDPOINTS.DELETE_TOPIC}/${topicId}`),
};
