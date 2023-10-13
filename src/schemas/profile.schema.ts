import * as yup from "yup";

export const profileSchema = yup.object({
  id: yup.string().required(),
  email: yup.string(),
  fullName: yup.string().required("Full name is required").min(6, "Full name must be at least 6 characters long"),
  avatarPath: yup.string(),
  coverImgPath: yup.string(),
  address: yup.string().max(160, "Address must be at most 160 characters long"),
  birthDay: yup.string(),
  phoneNumber: yup.string().max(20, "Phone number must be at most 20 characters long"),
  bio: yup.string().max(160, "Bio must be at most 160 characters long"),
});

export type TProfileSchema = yup.InferType<typeof profileSchema>;
