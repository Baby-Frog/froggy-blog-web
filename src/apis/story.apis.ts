import { STORY_ENDPOINTS } from "src/constants/endpoints";
import { TStorySchema } from "src/schemas/story.schemas";
import { TApiQueryParams } from "src/types/query.types";
import { TQueryResponse, TSuccessApiResponse } from "src/types/response.types";
import { TStory } from "src/types/story.types";
import http from "src/utils/http";

export const storyApi = {
  getRecentStories: (params: { keyword?: string; pageSize?: number; pageNumber?: number }) =>
    http.get<TQueryResponse<TStory[]>>(STORY_ENDPOINTS.GET_RECENT_STORIES, { params }),
  getTrendingStories: () => http.get<TSuccessApiResponse<TStory[]>>(STORY_ENDPOINTS.GET_TRENDING_STORIES),
  getStoryById: (storyId: string) =>
    http.get<TSuccessApiResponse<TStory>>(`${STORY_ENDPOINTS.GET_STORY_BY_ID}/${storyId}`),
  getStoriesByUserId: (userId: string) =>
    http.get<TQueryResponse<TStory[]>>(`${STORY_ENDPOINTS.GET_STORIES_BY_USER_ID}/${userId}`),
  getStoriesByTopicId: (topicId: string) =>
    http.get<TQueryResponse<TStory[]>>(`${STORY_ENDPOINTS.GET_STORIES_BY_TOPIC_ID}/${topicId}`),
  searchStories: ({ keyword, pageSize, column, orderBy, pageNumber }: TApiQueryParams) =>
    http.get<TQueryResponse<TStory[]>>(`${STORY_ENDPOINTS.SEARCH_STORIES}`, {
      params: {
        keyword: keyword || "",
        pageSize: pageSize || 7,
        column: column || "createdAt",
        orderBy: orderBy || "desc",
        pageNumber: pageNumber || 1,
      },
    }),
  createStory: (body: Omit<TStorySchema, "id">) =>
    http.post<TSuccessApiResponse<TStory>>(STORY_ENDPOINTS.CREATE_NEW_STORY, body),
  updateStory: (body: TStorySchema) => http.post(STORY_ENDPOINTS.CREATE_NEW_STORY, body),
  getFavoriteStories: () => http.get<TQueryResponse<TStory[]>>(STORY_ENDPOINTS.GET_FAVORITE_STORIES),
  saveStoryToFavorites: (storyId: string) => http.post(`${STORY_ENDPOINTS.SAVE_STORY_TO_FAVORITES}/${storyId}`),
};
