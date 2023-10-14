import { useIsPresent } from "framer-motion";
import React from "react";
import AuthenticatedNavbar from "src/components/AuthenticatedNavbar";
import ExploreNavbar from "src/components/ExploreNavbar";
import PageTransition from "src/components/PageTransition";
import UnauthenticatedNavbar from "src/components/UnauthenticatedNavbar";
import { styled } from "styled-components";

type TExploreLayoutProps = {
  children: React.ReactNode;
};

const MainLayoutWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  @media screen and (max-width: 1320px) {
    padding-inline: 16px;
  }
  @media screen and (max-width: 767px) {
    padding-inline: 12px;
  }
`;

const ExploreLayout = ({ children }: TExploreLayoutProps) => {
  const isPresent = useIsPresent();

  return (
    <>
      <ExploreNavbar></ExploreNavbar>
      <MainLayoutWrapper>{children}</MainLayoutWrapper>
      <PageTransition isPresent={isPresent}></PageTransition>
    </>
  );
};

export default ExploreLayout;
