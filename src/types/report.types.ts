import { TUserProfile } from "./user.types";

export type TReport = {
  id: string;
  reason: string;
  idComment: string;
  createDate: string;
  userDto: TUserProfile;
};
