import React from "react";

type TLabelProps = {
  htmlFor: string;
  children: React.ReactNode;
};

const Label = ({ children, htmlFor }: TLabelProps) => {
  return <label htmlFor={htmlFor}>{children}</label>;
};

export default Label;
