import { TComment } from "./comment.types";
import { TUserProfile } from "./user.types";

export type TReport = {
  id: string;
  reason: string;
  idComment: string;
  createDate: string;
  comment: TComment;
  userDto: TUserProfile;
};
