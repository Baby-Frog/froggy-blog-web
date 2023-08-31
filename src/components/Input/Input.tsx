import React, { InputHTMLAttributes } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import { styled } from "styled-components";

type TInputProps = {
  type?: React.HTMLInputTypeAttribute;
  errorMsg?: string;
  placeholder?: string;
  name: string;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  inputClassName?: string;
  rules?: RegisterOptions;
} & InputHTMLAttributes<HTMLInputElement>;

const InputContainer = styled.div``;
const InputEl = styled.input``;
const ErrorMessage = styled.div`
  margin-top: 4px;
  min-height: 5px;
  font-weight: 500;
  font-size: 10px;
  color: ${(props) => props.theme.colors.failure};
`;

const Input = ({
  type = "text",
  errorMsg,
  name,
  register,
  className,
  inputClassName,
  rules,
  placeholder = "Some random placeholder...",
  ...rest
}: TInputProps) => {
  const registerResult = register(name, rules);

  return (
    <InputContainer>
      <InputEl
        type={type}
        placeholder={placeholder}
        className={inputClassName}
        {...registerResult}
      />
      <ErrorMessage>{errorMsg}</ErrorMessage>
    </InputContainer>
  );
};

export default Input;
