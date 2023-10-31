import isUndefined from "lodash/isUndefined";
import omitBy from "lodash/omitBy";
import useQueryParams from "./useQueryParams";
import { TAdminQueryConfig } from "src/types/query.types";

export default function useAdminQueryConfig() {
  const queryParams = useQueryParams();
  const queryConfig: TAdminQueryConfig = omitBy(
    {
      keyword: queryParams.keyword || "", // add a default value for the q property
      orderBy: queryParams.orderBy || "desc",
      column: queryParams.column || "updateDate",
      pageSize: queryParams.pageSize || "7",
      pageNumber: queryParams.pageNumber || "1",
    },
    isUndefined,
  ); // Add a type assertion to convert the type of the object to TQueryConfig
  return queryConfig;
}
