import { TUserProfile } from "./user.types";

export type TCommentReqBody = {
  content: string;
  userId: string;
  postId: string;
  parentId?: string;
};

export type TComment = {
  id: string;
  content: string;
  profileDto: TUserProfile;
  postId: string;
  parentId?: string;
  createDate: string;
  updateDate?: string;
};
