import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { storyApi } from "src/apis/story.apis";
import TrendingIcon from "src/components/Icon/TrendingIcon";
import { AuthContext } from "src/contexts/auth.contexts";
import { styled } from "styled-components";
import HomepageRecentPost from "./components/HomepageRecentPost";
import HomepageTrendingPost from "./components/HomepageTrendingPost";
import CustomTabs from "src/components/CustomTabs";
import { TabsProps } from "antd";
import { topicApi } from "src/apis/topic.apis";
import { Link } from "react-router-dom";
import { path } from "src/constants/path";

const HomepageHeading = styled.h2`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  font-weight: 500;
  letter-spacing: -0.1px;
`;

const MainContentWrapper = styled.div`
  margin-top: 48px;
  display: flex;
  align-items: flex-start;
  gap: 32px;
  justify-content: space-between;
`;

const MainStuffsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 32px;
  flex: 6;
  flex-shrink: 0;
`;

const SideStuffsWrapper = styled.div`
  flex-shrink: 1;
  flex: 4;
  transform: translateX(70px);
  position: sticky;
  top: 85px;
  right: 0;
`;

const TopicsWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-block: 16px;
  flex-wrap: wrap;
  max-width: 330px;
  width: 100%;
  padding-bottom: 24px;
  border-bottom: 2px solid #f2f2f2;
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

const Homepage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { data: recentStories, isLoading: recentStoriesIsLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: () => storyApi.getRecentStories({ keyword: "", pageSize: 5 }),
    refetchOnMount: true,
  });
  const { data: topics, isLoading: topicsIsLoading } = useQuery({
    queryKey: ["topics"],
    queryFn: () => topicApi.getTopicsByKeyword({ keyword: "", pageNumber: 1, pageSize: 9 }),
  });
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Recent",
      children: (
        <MainStuffsWrapper>
          {recentStories?.data.data.data.map((story) => (
            <HomepageRecentPost
              key={story.id}
              story={story}
            ></HomepageRecentPost>
          ))}
        </MainStuffsWrapper>
      ),
    },
    {
      key: "2",
      label: "Your stories",
      children: <div>3</div>,
    },
    {
      key: "3",
      label: "Trending",
      children: <div>1</div>,
    },
    {
      key: "4",
      label: "Saved",
      children: <div>2</div>,
    },
  ];
  // const [recentStories, setRecentStories] = useState<TStory[]>([]);
  const { data: storiesData, isLoading: storiesIsLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: () => storyApi.getRecentStories({ keyword: "", pageSize: 5 }),
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
    refetchOnMount: true,
  });
  return (
    <>
      {!isAuthenticated ? (
        <div className="h-[200vh]">
          <div className="flex items-center gap-x-2 mt-10">
            <TrendingIcon></TrendingIcon>
            <HomepageHeading>Trending on Froggy Blog</HomepageHeading>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <HomepageTrendingPost></HomepageTrendingPost>
            <HomepageTrendingPost></HomepageTrendingPost>
            <HomepageTrendingPost></HomepageTrendingPost>
            <HomepageTrendingPost></HomepageTrendingPost>
            <HomepageTrendingPost></HomepageTrendingPost>
            <HomepageTrendingPost></HomepageTrendingPost>
          </div>
          <MainContentWrapper>
            <MainStuffsWrapper>
              {storiesData?.data.data.data.map((story) => (
                <HomepageRecentPost
                  key={story.id}
                  story={story}
                ></HomepageRecentPost>
              ))}
            </MainStuffsWrapper>
            <SideStuffsWrapper>
              <p className="font-semibold text-lg tracking-tight">Discover more of what matters to you</p>
              <TopicsWrapper>
                {topics?.data.data.data.map((topic) => (
                  <Link
                    key={topic.id}
                    className="px-2 py-3 font-medium bg-[#f2f2f2] text-sm rounded-2xl"
                    to={path.HOMEPAGE}
                  >
                    {topic.topicName}
                  </Link>
                ))}
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
        </div>
      ) : (
        <MainContentWrapper>
          <MainStuffsWrapper>
            <CustomTabs items={items}></CustomTabs>
          </MainStuffsWrapper>
          <SideStuffsWrapper>
            <p className="font-semibold text-lg tracking-tight">Discover more of what matters to you</p>
            <TopicsWrapper>
              {topics?.data.data.data.map((topic) => (
                <Link
                  key={topic.id}
                  className="px-2 py-3 font-medium bg-[#f2f2f2] text-sm rounded-2xl"
                  to={path.HOMEPAGE}
                >
                  {topic.topicName}
                </Link>
              ))}
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
      )}
    </>
  );
};

export default Homepage;
