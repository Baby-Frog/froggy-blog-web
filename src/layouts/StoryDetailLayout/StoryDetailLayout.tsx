import { useIsPresent } from "framer-motion";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import AuthenticatedNavbar from "src/components/AuthenticatedNavbar";
import PageTransition from "src/components/PageTransition";
import UnauthenticatedNavbar from "src/components/UnauthenticatedNavbar";
import { AuthContext } from "src/contexts/auth.contexts";
import { styled } from "styled-components";

const MainLayoutWrapper = styled.div`
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
  @media screen and (max-width: 1320px) {
    padding-inline: 16px;
  }
  @media screen and (max-width: 767px) {
    padding-inline: 12px;
  }
`;

type TMainLayoutProps = {
  children: React.ReactNode;
};

const StoryDetailLayout = ({ children }: TMainLayoutProps) => {
  const { isAuthenticated } = useContext(AuthContext);

  const isPresent = useIsPresent();
  return (
    <>
      {!isAuthenticated ? (
        <>
          <UnauthenticatedNavbar></UnauthenticatedNavbar>
          <MainLayoutWrapper>{children}</MainLayoutWrapper>
          <PageTransition isPresent={isPresent}></PageTransition>
        </>
      ) : (
        <>
          <AuthenticatedNavbar></AuthenticatedNavbar>
          <MainLayoutWrapper>{children}</MainLayoutWrapper>
          <PageTransition isPresent={isPresent}></PageTransition>
        </>
      )}
    </>
  );
};

export default StoryDetailLayout;
