import { useIsPresent } from "framer-motion";
import React, { useContext } from "react";
import AuthenticatedNavbar from "src/components/AuthenticatedNavbar";
import ExploreNavbar from "src/components/ExploreNavbar";
import Footer from "src/components/Footer";
import MainNavbar from "src/components/MainNavbar/MainNavbar";
import PageTransition from "src/components/PageTransition";
import StatsNavbar from "src/components/StatsNavbar";
import { AuthContext } from "src/contexts/auth.contexts";
import { styled } from "styled-components";

type TExploreLayoutProps = {
  children: React.ReactNode;
};

const MainLayoutWrapper = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  @media screen and (max-width: 999px) {
    padding-inline: 16px;
  }
  @media screen and (max-width: 767px) {
    padding-inline: 12px;
  }
`;

const StatsLayout = ({ children }: TExploreLayoutProps) => {
  const isPresent = useIsPresent();
  return (
    <>
      <StatsNavbar title="Statistics"></StatsNavbar>
      <MainLayoutWrapper>{children}</MainLayoutWrapper>
      <PageTransition isPresent={isPresent}></PageTransition>
    </>
  );
};

export default StatsLayout;
