import { Suspense, lazy, useContext } from "react";
const AuthenticatedNavbar = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import("src/components/AuthenticatedNavbar"),
    new Promise((resolve) => setTimeout(resolve, 4000)),
  ]);
  return moduleExports;
});
import MainNavbar from "src/components/MainNavbar/MainNavbar";
import { AuthContext } from "src/contexts/auth.contexts";
import HomepageBanner from "src/pages/Homepage/components/HomepageBanner";
import { styled } from "styled-components";
import LoadingPage from "src/pages/LoadingPage";

const MainLayoutWrapper = styled.div`
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

type TMainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: TMainLayoutProps) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      {!isAuthenticated ? (
        <>
          <MainNavbar></MainNavbar>
          <HomepageBanner></HomepageBanner>
          <MainLayoutWrapper>{children}</MainLayoutWrapper>
        </>
      ) : (
        <Suspense fallback={<LoadingPage>Please wait, we're loading your content</LoadingPage>}>
          <AuthenticatedNavbar></AuthenticatedNavbar>
        </Suspense>
      )}
    </>
  );
};

export default MainLayout;
