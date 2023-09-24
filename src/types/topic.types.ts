export type TTopics = {
  pageNumber: number;
  pageSize: number;
  totalRecord: number;
  totalPage: number;
  data: Array<{
    id: string;
    topicName: string;
    topicCode: string;
    updateDate: string;
  }>;
};
