// @
import { TabsProps } from "antd";
import { Fragment, useCallback, useContext, useEffect, useRef } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { storyApi } from "src/apis/story.apis";
import { topicApi } from "src/apis/topic.apis";
import CustomTabs from "src/components/CustomTabs";
import TrendingIcon from "src/components/Icon/TrendingIcon";
import { path } from "src/constants/path";
import { AuthContext } from "src/contexts/auth.contexts";
import { styled } from "styled-components";
import HomepageRecentPost from "./components/HomepageRecentPost";
import HomepageTrendingPost from "./components/HomepageTrendingPost";

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
  gap: 32px;
  width: calc(65% - 16px);
  flex-shrink: 0;
`;

const SideStuffsWrapper = styled.div`
  flex-shrink: 1;
  width: calc(35% - 16px);
  position: sticky;
  top: 85px;
  right: 0;
`;

const AuthenticatedSideStuffWrapper = styled.div`
  flex-shrink: 1;
  width: calc(35% - 16px);
  position: sticky;
  top: 0;
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

const Homepage = () => {
  const { isAuthenticated, userProfile } = useContext(AuthContext);

  const { data: topics, isLoading: topicsIsLoading } = useQuery({
    queryKey: ["topics"],
    queryFn: () =>
      topicApi.getTopicsByKeyword({ keyword: "", pageNumber: 1, pageSize: 9, column: "createDate", orderBy: "desc" }),
  });
  const {
    data: storiesData,
    fetchNextPage: storiesFetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["infiniteStories"],
    queryFn: ({ pageParam = 1 }) => storyApi.getRecentStories({ keyword: "", pageSize: 5, pageNumber: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.data.data.length === 0) return undefined;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (lastPage.data.data as any).pageNumber + 1;
    },
    refetchOnMount: true,
  });
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const handleLoadMore = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        storiesFetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, storiesFetchNextPage],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleLoadMore, {
      rootMargin: "0px 0px 0px 0px",
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [handleLoadMore]);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Recent",
      children: (
        <div className="flex flex-col gap-6">
          {storiesData?.pages.map((storyGroup, index) => (
            <Fragment key={index}>
              {storyGroup.data.data.data.map((story) => (
                <HomepageRecentPost
                  key={story.id}
                  story={story}
                ></HomepageRecentPost>
              ))}
            </Fragment>
          ))}
          {hasNextPage && <div ref={loadMoreRef}>Loading more stories...</div>}
        </div>
      ),
    },
    {
      key: "2",
      label: "Trending",
      children: <div>1</div>,
    },
  ];

  // const [recentStories, setRecentStories] = useState<TStory[]>([]);
  // const { data: storiesData, isLoading: storiesIsLoading } = useQuery({
  //   queryKey: ["stories"],
  //   queryFn: () => storyApi.getRecentStories({ keyword: "", pageSize: 5 }),
  //   staleTime: 1000 * 60 * 5,
  //   keepPreviousData: true,
  //   refetchOnMount: true,
  // });

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
              <div className="flex flex-col gap-6">
                {storiesData?.pages.map((storyGroup, index) => (
                  <Fragment key={index}>
                    {storyGroup.data.data.data.map((story) => (
                      <HomepageRecentPost
                        key={story.id}
                        story={story}
                      ></HomepageRecentPost>
                    ))}
                  </Fragment>
                ))}
              </div>
              {hasNextPage && <div ref={loadMoreRef}>Loading more stories...</div>}
            </MainStuffsWrapper>
            <SideStuffsWrapper>
              <p className="font-semibold text-lg tracking-tight">Discover more of what matters to you</p>
              <TopicsWrapper>
                <TopicList>
                  {topics?.data.data.data.map((topic) => (
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
        </div>
      ) : (
        <MainContentWrapper>
          <MainStuffsWrapper>
            <CustomTabs
              defaultActiveKey="1"
              items={items}
            ></CustomTabs>
          </MainStuffsWrapper>
          <AuthenticatedSideStuffWrapper>
            <p className="font-semibold text-lg tracking-tight">Discover more of what matters to you</p>
            <TopicsWrapper>
              <TopicList>
                {topics?.data.data.data.map((topic) => (
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
          </AuthenticatedSideStuffWrapper>
        </MainContentWrapper>
      )}
    </>
  );
};

export default Homepage;
