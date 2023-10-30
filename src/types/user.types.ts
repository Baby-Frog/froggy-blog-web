export type TUserProfile = {
  id: string;
  fullName: string;
  email: string;
  avatarPath: string;
  address?: string;
  birthDay?: string;
  phoneNumber?: string;
  coverImgPath?: string;
  bio?: string;
  roles: ("ADMINISTRATOR" | "USER" | "MODERATOR")[];
  // more will be applied later
};

export type TAnonymousProfile = {
  id: string;
  fullName: string;
  avatarPath: string;
  address?: string;
  birthDay?: string;
  phoneNumber?: string;
  coverImgPath?: string;
  bio?: string;
  // more will be applied later
};
