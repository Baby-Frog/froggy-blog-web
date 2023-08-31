import React from "react";
import { styled } from "styled-components";

type TLabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
};

const StyledLabel = styled.label`
  color: ${(props) => props.theme.colors.charcoal};
`;

const Label = ({ children, htmlFor, className }: TLabelProps) => {
  return (
    <StyledLabel
      htmlFor={htmlFor}
      className={className}
    >
      {children}
    </StyledLabel>
  );
};

export default Label;
