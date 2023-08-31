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
const InputEl = styled.input`
  width: 100%;
  border-radius: 6px;
  height: 34px;
  flex-shrink: 0;
  outline: none;
  padding: 10px;
  background-color: #e7ecf3;
`;
const ErrorMessage = styled.div`
  margin-top: 4px;
  min-height: 18px;
  font-weight: 500;
  font-size: 12px;

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
  if (type === "password") {
    return (
      <InputContainer>
        <InputEl
          type="password"
          placeholder={placeholder}
          className={inputClassName}
          {...registerResult}
        />
        <ErrorMessage>{errorMsg}</ErrorMessage>
      </InputContainer>
    );
  }
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
