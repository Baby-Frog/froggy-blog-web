import { COMMENT_ENDPOINTS } from "src/constants/endpoints";
import { TComment, TCommentReqBody } from "src/types/comment.types";
import { TQueryResponse } from "src/types/response.types";
import http from "src/utils/http";

export const commentApi = {
  comment: (body: TCommentReqBody) => http.post(COMMENT_ENDPOINTS.COMMENT, body),
  getCommentsByPostId: (
    postId: string,
    params: { pageSize?: number; pageNumber?: number; column?: string; orderBy?: string },
  ) => http.get<TQueryResponse<TComment[]>>(`${COMMENT_ENDPOINTS.GET_COMMENTS_BY_POST_ID}/${postId}`, { params }),
  getCommentsCount: (postId: string) => http.get(`${COMMENT_ENDPOINTS.GET_COMMENTS_COUNT}/${postId}`),
};
