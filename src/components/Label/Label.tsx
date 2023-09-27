import React from "react";
import { styled } from "styled-components";

type TLabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
  isRequired?: boolean;
};

const StyledLabel = styled.label<{ $isRequired: boolean }>`
  color: ${(props) => props.theme.colors.charcoal};
  display: block;
  width: max-content;
  position: relative;
  &::after {
    content: ${(props) => (props.$isRequired ? "'*'" : "''")};
    color: ${(props) => props.theme.colors.failure};
    position: absolute;
    right: -12px;
    font-size: 16px;
    top: 0px;
  }
`;

const Label = ({ children, htmlFor, className, isRequired = false }: TLabelProps) => {
  return (
    <StyledLabel
      htmlFor={htmlFor}
      className={className}
      $isRequired={isRequired}
    >
      {children}
    </StyledLabel>
  );
};

export default Label;
