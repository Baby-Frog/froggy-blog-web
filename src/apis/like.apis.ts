import { LIKE_ENDPOINTS } from "src/constants/endpoints";
import http from "src/utils/http";

export const likeApi = {
  getLikesCount: (postId: string) => http.get(`${LIKE_ENDPOINTS.GET_LIKES_COUNT}/${postId}`),
  toggleLike: (postId: string) => http.post(`${LIKE_ENDPOINTS.TOGGLE_LIKE}/${postId}`),
};
