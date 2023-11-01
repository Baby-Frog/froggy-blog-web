import * as yup from "yup";
export const topicSchema = yup.object({
  topicName: yup
    .string()
    .required("Please enter a topic name")
    .min(6, "Topic name must be at least 6 characters long")
    .max(35, "Topic name must be at most 35 characters long"),
});
