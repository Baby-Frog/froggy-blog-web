export type TQueryConfig = {
  q?: string;
};

export type TApiQueryParams = {
  keyword: string;
  pageNumber?: number;
  pageSize: number;
  orderBy?: string;
  column?: string;
};
