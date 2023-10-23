import * as yup from "yup";

export const commentSchema = yup.object({
  comment: yup.string().required("Please enter your response"),
});

export type TCommentSchema = yup.InferType<typeof commentSchema>;
