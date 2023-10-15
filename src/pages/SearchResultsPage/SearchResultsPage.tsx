import { TabsProps } from "antd";
import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import { authApi } from "src/apis/auth.apis";
import { storyApi } from "src/apis/story.apis";
import { topicApi } from "src/apis/topic.apis";
import CustomTabs from "src/components/CustomTabs";
import { path } from "src/constants/path";
import useQueryConfig from "src/hooks/useQueryConfig";
import { styled } from "styled-components";
import PeopleItem from "./components/PeopleItem";

type TSearchResultsPageProps = {
  something: string;
};

const MainContentWrapper = styled.div`
  margin-top: 48px;
  display: flex;
  align-items: flex-start;
  gap: 32px;
  justify-content: space-between;
`;

const MainStuffsWrapper = styled.div`
  gap: 32px;
  width: calc(60% - 16px);
  flex-shrink: 0;
  height: 100vh;
`;

const SideStuffsWrapper = styled.div`
  flex-shrink: 1;
  width: calc(40% - 16px);
  transform: translateX(70px);
  position: sticky;
  top: 0px;
  right: 0;
`;

const TopicsWrapper = styled.div`
  margin-block: 16px;
  max-width: 330px;
  width: 100%;
  padding-bottom: 18px;
  border-bottom: 2px solid #f2f2f2;
`;

const TopicList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const SideStuffsFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 330px;
  width: 100%;
  gap: 16px;
  align-items: center;
  span {
    font-size: 14px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.normalGrey};
  }
`;

const SearchResultsPage = () => {
  const queryConfig = useQueryConfig();
  const location = useLocation();
  const activeKeyAfterExplorePage = useMemo(() => {
    if (location?.state?.from && location.state.from === path.EXPORE_TOPICS) {
      return "3";
    }
    return "1";
  }, [location?.state?.from]);
  const { data: topicsData, isLoading: isTopicsLoading } = useQuery({
    queryKey: ["topics", { q: queryConfig.q }],
    queryFn: () =>
      topicApi.getTopicsByKeyword({
        pageSize: 15,
        keyword: queryConfig.q as string,
        pageNumber: 1,
        column: "topicName",
        orderBy: "asc",
      }),
  });
  const topics = topicsData?.data.data.data;
  const { data: sideStuffTopicsData } = useQuery({
    queryKey: ["topics"],
    queryFn: () =>
      topicApi.getTopicsByKeyword({
        pageSize: 9,
        keyword: "",
        pageNumber: 1,
        column: "topicName",
        orderBy: "asc",
      }),
  });
  const sideStuffTopics = sideStuffTopicsData?.data.data.data;
  const { data: storiesData, isLoading: isStoriesLoading } = useQuery({
    queryKey: ["stories", { q: queryConfig.q }],
    queryFn: () =>
      storyApi.searchStories({
        pageSize: 5,
        keyword: queryConfig.q as string,
        pageNumber: 1,
        column: "title",
        orderBy: "asc",
      }),
  });
  const stories = storiesData?.data.data.data;
  const { data: usersData } = useQuery({
    queryKey: ["users", { q: queryConfig.q }],
    queryFn: () =>
      authApi.searchUsers({
        pageSize: 5,
        keyword: queryConfig.q as string,
        pageNumber: 1,
        column: "fullName",
        orderBy: "asc",
      }),
  });
  const users = usersData?.data.data.data;
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Stories",
      children: <>1</>,
    },
    {
      key: "2",
      label: "People",
      children: (
        <div className="flex flex-col w-full">{users?.map((user) => <PeopleItem user={user}></PeopleItem>)}</div>
      ),
    },
    {
      key: "3",
      label: "Topics",
      children: (
        <TopicList>
          {topics?.map((topic) => (
            <Link
              key={topic.id}
              className="min-w-[53px] flex items-center justify-center px-4 py-2 bg-[#f2f2f2] text-sm rounded-3xl"
              to={path.HOMEPAGE}
            >
              {topic.topicName}
            </Link>
          ))}
        </TopicList>
      ),
    },
  ];
  return (
    <MainContentWrapper>
      <MainStuffsWrapper>
        <CustomTabs
          defaultActiveKey={activeKeyAfterExplorePage}
          items={items}
        ></CustomTabs>
      </MainStuffsWrapper>
      <SideStuffsWrapper>
        <p className="font-semibold text-lg tracking-tight">Discover more of what matters to you</p>
        <TopicsWrapper>
          <TopicList>
            {sideStuffTopics?.map((topic) => (
              <Link
                key={topic.id}
                className="px-2 py-3 bg-[#f2f2f2] text-sm rounded-2xl"
                to={path.HOMEPAGE}
              >
                {topic.topicName}
              </Link>
            ))}
          </TopicList>
          <Link
            to={path.EXPORE_TOPICS}
            className="text-sm mt-4 block text-normalGreen hover:text-normalGreenHover "
          >
            See more topics
          </Link>
        </TopicsWrapper>
        <SideStuffsFooter>
          <span>Help</span>
          <span>Status</span>
          <span>Writers</span>
          <span>Blog</span>
          <span>Privacy</span>
          <span>Terms</span>
          <span>About</span>
          <span>Teams</span>
        </SideStuffsFooter>
      </SideStuffsWrapper>
    </MainContentWrapper>
  );
};

export default SearchResultsPage;
