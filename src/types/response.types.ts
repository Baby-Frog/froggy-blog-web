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
