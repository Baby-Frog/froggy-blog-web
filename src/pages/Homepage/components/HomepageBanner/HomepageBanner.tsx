import React from "react";
import { styled } from "styled-components";

type THomepageBannerProps = {
  something: string;
};

const HomepageBannerContainer = styled.section`
  border-bottom: 1px solid #000;
  background-color: #ffc017;
`;

const HomepageBannerMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1320px;
  width: 100%;
  background-image: url("/transparent-loading.gif");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 100% 50%;
  margin: 0 auto;
  padding-block: 100px;
  @media screen and (max-width: 1320px) {
    padding-inline: 16px;
  }
  @media screen and (max-width: 767px) {
    padding-inline: 12px;
  }
`;

const HomepageBannerLeft = styled.div`
  display: block;
`;

const HomepageBannerRight = styled.div``;

const HomepageBannerHeading = styled.h2`
  font-size: 92px;
  font-weight: 500;
  color: #000;
`;

const HomepageBannerDescription = styled.p`
  font-size: 20px;
  max-width: 500px;
  font-weight: 500;
  color: #000;
  margin-top: 32px;
`;

const HomepageBannerButton = styled.button`
  background: #000;
  color: #fff;
  padding: 8px 20px;
  border-radius: 100px;
  width: 200px;
  height: 40px;
  margin-top: 50px;
`;

const HomepageBanner = () => {
  return (
    <HomepageBannerContainer>
      <HomepageBannerMain>
        <HomepageBannerLeft>
          <HomepageBannerHeading>Stay curious!</HomepageBannerHeading>
          <HomepageBannerDescription>
            Every time you post something online, you have a choice. You can either make it something that adds to the
            happiness levels in the world—or you can make it something that takes away. ~ Zoe Sugg
          </HomepageBannerDescription>
          <HomepageBannerButton>Start reading</HomepageBannerButton>
        </HomepageBannerLeft>
        <HomepageBannerRight></HomepageBannerRight>
      </HomepageBannerMain>
    </HomepageBannerContainer>
  );
};

export default HomepageBanner;
