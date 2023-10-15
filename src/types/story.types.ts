import { TAuthor } from "./author.types";
import { TTopics } from "./topic.types";

export type TStory = {
  id: string;
  content: string;
  raw: string;
  thumbnail?: string;
  title: string;
  credit?: string;
  topicId: string[];
  timeRead: string;
  publishDate: string;
  listTopic: TTopics[];
  author: TAuthor;
};

export type TStoryConfig = {
  q: string;
};
