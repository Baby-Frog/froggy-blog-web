export type TQueryConfig = {
  q?: string;
};

export type TAdminQueryConfig = {
  keyword?: string;
  pageNumber?: string;
  pageSize?: string;
  orderBy?: "desc" | "asc";
  column?: string;
};

export type TApiQueryParams = {
  keyword?: string;
  pageNumber?: number;
  pageSize?: number;
  orderBy?: string;
  column?: string;
};
