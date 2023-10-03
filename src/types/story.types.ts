import { TTopics } from "./topic.types";

export type TStory = {
  id: string;
  content: string;
  raw: string;
  thumbnail?: string;
  title: string;
  credit?: string;
  topicId: string[];
  publishDate: string;
  listTopic: TTopics[];
};
