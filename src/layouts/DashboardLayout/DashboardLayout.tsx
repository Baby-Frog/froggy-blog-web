import React from "react";
import Footer from "src/components/Footer";
import StatsNavbar from "src/components/StatsNavbar";
import { styled } from "styled-components";

type TExploreLayoutProps = {
  children: React.ReactNode;
};

const MainLayoutWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  @media screen and (max-width: 999px) {
    padding-inline: 16px;
  }
  @media screen and (max-width: 767px) {
    padding-inline: 12px;
  }
`;

const DashboardLayout = ({ children }: TExploreLayoutProps) => {
  return (
    <>
      <StatsNavbar
        title="Dashboard"
        containerClassName="!max-w-full !w-full"
      ></StatsNavbar>
      <MainLayoutWrapper>{children}</MainLayoutWrapper>
      <Footer maxWidth="1000px"></Footer>
    </>
  );
};

export default DashboardLayout;
