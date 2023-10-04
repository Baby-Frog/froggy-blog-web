import * as yup from "yup";

export const storySchema = yup.object({
  title: yup
    .string()
    .required("Please enter a title")
    .min(6, "Title must be at least 6 characters long")
    .max(160, "Title must be at most 160 characters long"),
  content: yup
    .string()
    .required("Please write something about your story")
    .min(30, "Your story is too short, it must be at least 30 characters long"),
  raw: yup.string(),
  // thumbnail: yup.string().required("Thumbnail is required"),
  // topicId is an array with string type, and it must not []
  topicId: yup.array().of(yup.string()).required("Please choose your topics").min(1, "Please choose your topics"),
  // Thumbnail should be an image, and is not required
  thumbnail: yup.string(),
  credit: yup.string(),
});

export type TStorySchema = yup.InferType<typeof storySchema>;
