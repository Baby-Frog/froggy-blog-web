export type TSuccessApiResponse<Data> = {
  statusCode: number;
  message: string;
  data: Data;
};

export type TErrorApiResponse<Data> = {
  statusCode: number;
  message: string;
  data?: Data;
};

export type TQueryResponse<Data> = {
  pageNumber: number;
  pageSize: number;
  totalRecord: number;
  totalPage: number;
  data: {
    data: Data;
  };
};
