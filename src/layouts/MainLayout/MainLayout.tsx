import { useContext } from "react";
import MainNavbar from "src/components/MainNavbar/MainNavbar";
import { AuthContext } from "src/contexts/auth.contexts";
import HomepageBanner from "src/pages/Homepage/components/HomepageBanner";
import { styled } from "styled-components";

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
  console.log(isAuthenticated);
  return (
    <>
      {!isAuthenticated ? (
        <>
          <MainNavbar></MainNavbar>
          <HomepageBanner></HomepageBanner>
          <MainLayoutWrapper>{children}</MainLayoutWrapper>
        </>
      ) : (
        <div>Hello World!</div>
      )}
    </>
  );
};

export default MainLayout;
