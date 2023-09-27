import React from "react";
import { styled } from "styled-components";

type TLabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  note?: string;
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

const Note = styled.span`
  margin-left: 4px;
  font-size: 12px;
  color: ${(props) => props.theme.colors.lightGrey};
`;

const Label = ({ children, htmlFor, className, note, isRequired = false }: TLabelProps) => {
  return (
    <StyledLabel
      htmlFor={htmlFor}
      className={className}
      $isRequired={isRequired}
    >
      {children}
      <Note>{note && `(${note})`}</Note>
    </StyledLabel>
  );
};

export default Label;
