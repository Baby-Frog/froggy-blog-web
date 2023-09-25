/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, SelectProps } from "antd";
import { debounce } from "lodash";
import { forwardRef, useMemo, useState } from "react";
import "./MultipleSelect.scss";
import { styled } from "styled-components";
import FailureIcon from "../Icon/FailureIcon";
type ValueType = { key?: string; label: React.ReactNode; value: string | number };

type TMultipleSelectProps<ValueType = any> = {
  fetchOptions?: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
  isLoading?: boolean;
  errorMsg?: string;
  onChange?: (value: ValueType) => void;
} & SelectProps &
  ValueType;

const ErrorWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  margin-top: 4px;
  /* min-height: 10px; */
`;

const ErrorMessage = styled.div`
  font-weight: 500;
  font-size: 12px;
  color: ${(props) => props.theme.colors.failure};
`;

const MultipleSelectV2 = forwardRef<SelectProps<ValueType>, TMultipleSelectProps & ValueType>(
  function MultipleSelectInner({ fetchOptions, debounceTimeout, errorMsg, onChange, ...props }, ref) {
    const [options, setOptions] = useState<ValueType[]>([]);
    const debounceFetcher = useMemo(() => {
      const loadOptions = (value: string) => {
        setOptions([]);
        fetchOptions?.(value).then((newOptions: ValueType[]) => {
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
          ref={ref}
          filterOption={false}
          onChange={onChange}
          onSearch={debounceFetcher}
          notFoundContent={
            options ? <div className="ant-type-something">Type something to begin searching...</div> : null
          }
          className={errorMsg ? "ant-select-has-error" : ""}
          options={options}
          {...props}
        />
        {/* err */}
        {errorMsg && (
          <ErrorWrapper>
            <FailureIcon></FailureIcon>
            <ErrorMessage>{errorMsg}</ErrorMessage>
          </ErrorWrapper>
        )}
      </>
    );
  },
);

export default MultipleSelectV2;
