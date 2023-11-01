import isUndefined from "lodash/isUndefined";
import omitBy from "lodash/omitBy";
import useQueryParams from "./useQueryParams";
import { TAdminQueryConfig } from "src/types/query.types";
import { useLocation } from "react-router-dom";

export default function useStoriesQueryConfig() {
  const queryParams = useQueryParams();
  const queryConfig: TAdminQueryConfig = omitBy(
    {
      keyword: queryParams.keyword || "", // add a default value for the q property
      orderBy: queryParams.orderBy || "desc",
      column: queryParams.column || "publishDate",
      pageSize: queryParams.pageSize || "7",
      pageNumber: queryParams.pageNumber || "1",
    },
    isUndefined,
  ); // Add a type assertion to convert the type of the object to TQueryConfig
  return queryConfig;
}
