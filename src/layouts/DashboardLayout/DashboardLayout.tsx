import React from "react";
import Footer from "src/components/Footer";
import StatsNavbar from "src/components/StatsNavbar";
import Sidebar from "src/pages/DashboardPage/components/Sidebar";
import { styled } from "styled-components";

type TExploreLayoutProps = {
  children: React.ReactNode;
};

const MainLayoutWrapper = styled.div`
  width: 85%;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #fbfbfb;
  padding: 16px;
  @media screen and (max-width: 767px) {
    padding: 12px;
  }
`;

const DashboardLayout = ({ children }: TExploreLayoutProps) => {
  return (
    <>
      <StatsNavbar
        title="Dashboard"
        containerClassName="!max-w-full !w-full"
      ></StatsNavbar>
      <div className="flex">
        <Sidebar></Sidebar>
        <MainLayoutWrapper>{children}</MainLayoutWrapper>
      </div>
      <Footer maxWidth="1000px"></Footer>
    </>
  );
};

export default DashboardLayout;
