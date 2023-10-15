import isUndefined from "lodash/isUndefined";
import omitBy from "lodash/omitBy";
import useQueryParams from "./useQueryParams";
import { TQueryConfig } from "src/types/query.types";

export default function useQueryConfig() {
  const queryParams = useQueryParams();
  const queryConfig: TQueryConfig = omitBy(
    {
      q: queryParams.q || "", // add a default value for the q property
    },
    isUndefined,
  ); // Add a type assertion to convert the type of the object to TQueryConfig
  return queryConfig;
}
