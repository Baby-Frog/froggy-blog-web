export type TCommentReqBody = {
  content: string;
  userId: string;
  postId: string;
  parentId?: string;
};

export type TComment = {
  id: string;
  content: string;
  userId: string;
  postId: string;
  parentId?: string;
};
