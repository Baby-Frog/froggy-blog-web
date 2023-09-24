/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, SelectProps, Spin } from "antd";
import { useState } from "react";

type TMultipleSelectProps<ValueType = any> = {
  fetchOptions?: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
  isLoading?: boolean;
} & SelectProps;

type ValueType = { key?: string; label: React.ReactNode; value: string | number };

const MultipleSelect = ({ fetchOptions, debounceTimeout, isLoading, ...props }: TMultipleSelectProps) => {
  const [options, setOptions] = useState<ValueType[]>([]);
  return (
    <Select
      labelInValue
      mode="multiple"
      fetchOptions={fetchOptions}
      filterOption={false}
      notFoundContent={isLoading ? <Spin size="small" /> : null}
      options={options}
      {...props}
    />
  );
};

export default MultipleSelect;
