import { STORY_ENDPOINTS } from "src/constants/endpoints";
import { TStorySchema } from "src/schemas/story.schemas";
import { TQueryResponse, TSuccessApiResponse } from "src/types/response.types";
import { TStory } from "src/types/story.types";
import http from "src/utils/http";

export const storyApi = {
  getRecentStories: (params: { keyword?: string; pageSize?: number }) =>
    http.get<TQueryResponse<TStory[]>>(STORY_ENDPOINTS.GET_RECENT_STORIES, { params }),
  getStoryById: (storyId: string) =>
    http.get<TSuccessApiResponse<TStory>>(`${STORY_ENDPOINTS.GET_STORY_BY_ID}/${storyId}`),
  getStoriesByUserId: (userId: string) =>
    http.get<TQueryResponse<TStory[]>>(`${STORY_ENDPOINTS.GET_STORIES_BY_USER_ID}/${userId}`),
  createStory: (body: Omit<TStorySchema, "id">) =>
    http.post<TSuccessApiResponse<TStory>>(STORY_ENDPOINTS.CREATE_NEW_STORY, body),
  updateStory: (body: TStorySchema) => http.post(STORY_ENDPOINTS.CREATE_NEW_STORY, body),
  getFavoriteStories: () => http.get<TQueryResponse<TStory[]>>(STORY_ENDPOINTS.GET_FAVORITE_STORIES),
  saveStoryToFavorites: (storyId: string) => http.post(`${STORY_ENDPOINTS.SAVE_STORY_TO_FAVORITES}/${storyId}`),
};
