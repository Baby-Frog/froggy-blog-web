import { useIsPresent } from "framer-motion";
import React from "react";
import AuthenticatedNavbar from "src/components/AuthenticatedNavbar";
import PageTransition from "src/components/PageTransition";
import { styled } from "styled-components";

type TNewStoryLayoutProps = {
  children: React.ReactNode;
};

const NewStoryLayoutWrapper = styled.div`
  max-width: 1320px;
  width: 100%;
  margin: 0 auto;
  @media screen and (max-width: 1320px) {
    padding-inline: 16px;
  }
  @media screen and (max-width: 767px) {
    padding-inline: 12px;
  }
`;

const NewStoryLayout = ({ children }: TNewStoryLayoutProps) => {
  const isPresent = useIsPresent();
  return (
    <>
      <AuthenticatedNavbar isWritingBlog></AuthenticatedNavbar>
      <NewStoryLayoutWrapper>{children}</NewStoryLayoutWrapper>
      <PageTransition isPresent={isPresent}></PageTransition>
    </>
  );
};

export default NewStoryLayout;
