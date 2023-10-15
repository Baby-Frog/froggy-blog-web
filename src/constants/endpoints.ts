export const TOPIC_ENDPOINTS = {
  GET_TOPICS: "/api/topic/search",
} as const;

export const AUTH_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  LOGOUT: "/api/logout",
  REFRESH_TOKEN: "/refreshToken",
  GET_ME: "/api/user/me",
  UPDATE_ME: "/api/user/profile/update",
  SEARCH_USERS: "/api/user/search",
  GET_ANONYMOUS_PROFILE: "/api/user/findById",
} as const;

export const IMAGE_ENPOINTS = {
  GET_IMAGE_DEFAULT: "/api/image/get/f581b622-adb3-40e1-b09b-1bd80a9697f7.jpg",
  UPLOAD_IMAGE: "/api/image/upload",
} as const;

export const STORY_ENDPOINTS = {
  GET_RECENT_STORIES: "/api/post/search",
  CREATE_NEW_STORY: "/api/post/save",
  GET_STORY_BY_ID: "/api/post/findById",
  GET_STORIES_BY_USER_ID: "/api/post/findPostByUserId",
  SEARCH_STORIES: "/api/post/search",
  GET_FAVORITE_STORIES: "/api/post/findPostUserSaved",
  SAVE_STORY_TO_FAVORITES: "/api/user/savePost",
} as const;
