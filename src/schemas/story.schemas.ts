import * as yup from "yup";

export const storySchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(6, "Title must be at least 6 characters long")
    .max(160, "Title must be at most 160 characters long"),
  content: yup
    .string()
    .required("Content is required")
    .min(6, "Content must be at least 6 characters long")
    .max(160, "Content must be at most 160 characters long"),
  // thumbnail: yup.string().required("Thumbnail is required"),
  // topicId is an array with string type, and it must has at least 1 item in the array
  topicId: yup.array().of(yup.string()).required("Topic is required"),
});

export type TStorySchema = yup.InferType<typeof storySchema>;
