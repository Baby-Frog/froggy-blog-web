import { useIsPresent } from "framer-motion";
import React from "react";
import MainNavbar from "src/components/MainNavbar/MainNavbar";
import PageTransition from "src/components/PageTransition";
import HomepageBanner from "src/pages/Homepage/components/HomepageBanner";

type TNewStoryLayoutProps = {
  children: React.ReactNode;
};

const NewStoryLayout = ({ children }: TNewStoryLayoutProps) => {
  const isPresent = useIsPresent();

  return (
    <>
      <MainNavbar></MainNavbar>
      <HomepageBanner></HomepageBanner>
      <NewStoryLayout>{children}</NewStoryLayout>
      <PageTransition isPresent={isPresent}></PageTransition>
    </>
  );
};

export default NewStoryLayout;
