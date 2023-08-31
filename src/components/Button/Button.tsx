import React from "react";
import { styled } from "styled-components";

type TButtonProps = {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const StyledButton = styled.button<{ $marginTop?: string; $width?: string }>`
  max-width: ${(props) => props.$width || "100%"};
  width: 100%;
  margin-top: ${(props) => props.$marginTop || "16px"};
  background-color: #fff;
  color: #000;
  border: 2px solid #000;
  height: 48px;
  border-radius: 6px;
  transition: all 150ms cubic-bezier(0.2, 0.175, 0.8, 0.4);
  &:hover {
    background-color: #000;
    color: #fff;
  }
  /* box-shadow: 0px 14px 21px 0px rgba(20, 92, 230, 0.12); */
`;

const Button = ({ children, className }: TButtonProps) => {
  return <StyledButton className={className}>{children}</StyledButton>;
};

export default Button;
