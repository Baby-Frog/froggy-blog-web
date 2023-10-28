import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "src/apis/auth.apis";
import ArrowLeftIcon from "src/components/Icon/ArrowLeftIcon";
import { styled } from "styled-components";

type TStatsPageProps = {
  something: string;
};

const StatsPageWrapper = styled.div`
  padding-top: 32px;
`;

const StatsGoBack = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.darkGrey};
  color: ${(props) => props.theme.colors.darkGrey};
  padding: 4px 12px 4px 6px;
  border-radius: 100rem;
  font-weight: 400;
  transition: all 150ms ease-in-out;
  &:hover {
    background-color: ${(props) => props.theme.colors.darkGrey};
    color: white;
  }
`;

const StatsHeading = styled.h1`
  margin-top: 24px;
  font-size: 32px;
  font-weight: 600;
`;

const StatsDescription = styled.div`
  padding-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: 16px;
    color: ${(props) => props.theme.colors.lightGrey};
  }
  span {
    font-size: 14px;
    color: ${(props) => props.theme.colors.lightGrey};
  }
`;

const StatsPage = () => {
  const navigate = useNavigate();
  const { data: chartData } = useQuery({
    queryKey: ["chart"],
    queryFn: () => authApi.getChartData({ period: 10 }),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  const chart = chartData?.data.data;
  const handleNavigateToPreviousPage = () => {
    navigate(-1);
  };
  return (
    <StatsPageWrapper>
      <StatsGoBack onClick={handleNavigateToPreviousPage}>
        <ArrowLeftIcon
          width={20}
          height={20}
        ></ArrowLeftIcon>
        <span>Go back</span>
      </StatsGoBack>
      <StatsHeading>Your story stats</StatsHeading>
      <StatsDescription>
        <p>Here's the overview of your story's performance.</p>
        <span>Updated 3 days ago</span>
      </StatsDescription>
    </StatsPageWrapper>
  );
};

export default StatsPage;
