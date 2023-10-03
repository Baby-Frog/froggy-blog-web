import { STORY_ENDPOINTS } from "src/constants/endpoints";
import { TStorySchema } from "src/schemas/story.schemas";
import { TSuccessApiResponse } from "src/types/response.types";
import { TStory } from "src/types/story.types";
import http from "src/utils/http";

export const storyApi = {
  getRecentStories: (params: { keyword?: string; pageSize?: number }) =>
    http.get<TSuccessApiResponse<TStory>>(STORY_ENDPOINTS.GET_RECENT_STORIES, { params }),
  createStory: (body: Omit<TStorySchema, "id">) => http.post(STORY_ENDPOINTS.CREATE_NEW_STORY, body),
  updateStory: (body: TStorySchema) => http.post(STORY_ENDPOINTS.CREATE_NEW_STORY, body),
};
