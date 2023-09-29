export const TOPIC_ENDPOINTS = {
  GET_TOPICS: "/api/topic/search",
} as const;

export const AUTH_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  LOGOUT: "/api/logout",
  REFRESH_TOKEN: "/refreshToken",
  GET_RECAPTCHA: "/api/captcha/generate",
  VERIFY_RECAPTCHA: "/api/captcha/verify",
} as const;

export const IMAGE_ENPOINTS = {
  GET_IMAGE_DEFAULT: "/api/image/get/f581b622-adb3-40e1-b09b-1bd80a9697f7.jpg",
  UPLOAD_IMAGE: "/api/image/upload",
};

export const STORY_ENDPOINTS = {
  CREATE_NEW_STORY: "/api/post/save",
};
