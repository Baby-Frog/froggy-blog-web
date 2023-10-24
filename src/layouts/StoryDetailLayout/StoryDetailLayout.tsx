import { useIsPresent } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { useScroll } from "react-use";
import AuthenticatedNavbar from "src/components/AuthenticatedNavbar";
import ExploreNavbar from "src/components/ExploreNavbar";
import PageTransition from "src/components/PageTransition";
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
  const [showNavbar, setShowNavbar] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = currentScrollPos < prevScrollPos;
      setShowNavbar(isScrollingUp);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
  return (
    <>
      {!isAuthenticated ? (
        <>
          {showNavbar && <ExploreNavbar></ExploreNavbar>}
          <div className="pt-[60px]">{children}</div>
          <PageTransition isPresent={isPresent}></PageTransition>
        </>
      ) : (
        <>
          {showNavbar && <AuthenticatedNavbar></AuthenticatedNavbar>}
          <div className="pt-[60px]">{children}</div>
          <PageTransition isPresent={isPresent}></PageTransition>
        </>
      )}
    </>
  );
};

export default StoryDetailLayout;
