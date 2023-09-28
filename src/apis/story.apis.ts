import { STORY_ENDPOINTS } from "src/constants/endpoints";
import { TStorySchema } from "src/schemas/story.schemas";
import http from "src/utils/http";

export const storyApi = {
  createStory: (body: Omit<TStorySchema, "id">) => http.post(STORY_ENDPOINTS.CREATE_NEW_STORY, body),
  updateStory: (body: TStorySchema) => http.post(STORY_ENDPOINTS.CREATE_NEW_STORY, body),
};
