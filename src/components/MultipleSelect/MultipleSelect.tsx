/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, SelectProps } from "antd";
import { debounce } from "lodash";
import { useMemo, useRef, useState } from "react";
import "./MultipleSelect.scss";
type TMultipleSelectProps<ValueType = any> = {
  fetchOptions?: (search: string) => Promise<ValueType[]>;
  errorMsg?: string;
  debounceTimeout?: number;
  isLoading?: boolean;
} & SelectProps;

type ValueType = { key?: string; label: React.ReactNode; value: string | number };

const MultipleSelect = ({ fetchOptions, debounceTimeout, errorMsg = "", ...props }: TMultipleSelectProps) => {
  const [options, setOptions] = useState<ValueType[]>([]);
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      setOptions([]);
      fetchOptions?.(value).then((newOptions) => {
        setOptions(newOptions);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions]);
  return (
    <>
      <Select
        labelInValue
        mode="multiple"
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={
          options ? <div className="ant-type-something">Type something to begin searching...</div> : null
        }
        options={options}
        {...props}
      />
    </>
  );
};

export default MultipleSelect;
