/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, SelectProps, Spin } from "antd";
import React from "react";
import { useQuery } from "react-query";
import { topicApi } from "src/apis/topic.apis";

type TMultipleSelectProps<ValueType = any> = {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
} & Omit<SelectProps<ValueType | ValueType[]>, "options" | "children">;

const MultipleSelect = ({
  fetchOptions,
  debounceTimeout,
  ...props
}: TMultipleSelectProps & { key?: string; label: React.ReactNode; value: string | number }) => {
  const { data: topicData, isLoading } = useQuery({
    queryKey: ["topics"],
    queryFn: () => topicApi.getTopics(),
  });
  console.log(topicData?.data.data.data);
  return (
    <Select
      labelInValue
      filterOption={false}
      notFoundContent={isLoading ? <Spin size="small" /> : null}
      {...props}
    />
  );
};

export default MultipleSelect;
