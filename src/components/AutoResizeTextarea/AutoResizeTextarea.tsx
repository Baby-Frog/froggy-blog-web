import React, { InputHTMLAttributes, useEffect, useState } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import { styled } from "styled-components";
import FailureIcon from "../Icon/FailureIcon";
type TTextAreaProps = {
  type?: React.HTMLInputTypeAttribute;
  errorMsg?: string;
  placeholder?: string;
  name: string;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
} & InputHTMLAttributes<HTMLTextAreaElement>;

// First disable resize
// Second, add a max-height
// Code

const TextAreaInput = styled.textarea<{ $hasErrors?: boolean }>`
  resize: none;
  width: 100%;
  min-height: 100px;
  outline: none;
  border: ${(props) => (props.$hasErrors ? "1px solid red" : "1px solid transparent")};
  background-color: ${(props) => (props.$hasErrors ? "rgb(255, 215, 215)" : "#fff")};
  flex-shrink: 0;
  outline: none;
  padding: 10px 10px 10px 0;
  &::placeholder {
    color: ${(props) => (props.$hasErrors ? "rgb(255, 49, 49)" : "#9ca3be")};
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px ${(props) => (props.$hasErrors ? "rgb(255, 215, 215)" : "#e7ecf3")} inset !important;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

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

const Textarea = ({ name, register, className, placeholder, rules, errorMsg, ...rest }: TTextAreaProps) => {
  const registerResult = register(name, rules);

  return (
    <>
      <TextAreaInput
        id={name}
        className={className}
        $hasErrors={Boolean(errorMsg)}
        placeholder={placeholder}
        {...rest}
        {...registerResult}
      ></TextAreaInput>
      {errorMsg && (
        <ErrorWrapper>
          <FailureIcon></FailureIcon>
          <ErrorMessage>{errorMsg}</ErrorMessage>
        </ErrorWrapper>
      )}
    </>
  );
};

export default Textarea;
