import { TabsProps } from "antd";
import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import { authApi } from "src/apis/auth.apis";
import { storyApi } from "src/apis/story.apis";
import { topicApi } from "src/apis/topic.apis";
import CustomTabs from "src/components/CustomTabs";
import { path } from "src/constants/path";
import useQueryConfig from "src/hooks/useQueryConfig";
import { styled } from "styled-components";
import PeopleItem from "./components/PeopleItem";
import HomepageRecentPost from "../Homepage/components/HomepageRecentPost";
import { getCustomDate } from "src/utils/formatDate";
import { generateSlug } from "src/utils/slugify";
import HandledImage from "src/components/HandledImage";

type TSearchResultsPageProps = {
  something: string;
};

const MainContentWrapper = styled.div`
  margin-top: 48px;
  display: flex;
  align-items: flex-start;
  gap: 64px;
  justify-content: space-between;
`;

const MainStuffsWrapper = styled.div`
  gap: 32px;
  width: calc(65% - 16px);
  flex-shrink: 0;
`;

const MainStuffsHeading = styled.h2`
  font-size: 42px;
  font-weight: 600;
  margin-bottom: 24px;
  span:first-of-type {
    color: #7c7c7c;
  }
`;

const SideStuffsWrapper = styled.div`
  flex-shrink: 1;
  width: calc(35% - 16px);
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
  const [currentActiveKey, setCurrentActiveKey] = useState<string>("");
  useEffect(() => {
    if (location?.state?.from && location.state.from === path.EXPORE_TOPICS) {
      setCurrentActiveKey("3");
    } else {
      setCurrentActiveKey("1");
    }
  }, []);
  const {
    data: topicsData,
    isLoading: isTopicsLoading,
    fetchNextPage: topicsFetchNextPage,
    hasNextPage: topicsHasNextPage,
    isFetchingNextPage: topicsIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["topicsResult", { q: queryConfig.q }],
    queryFn: ({ pageParam = 1 }) =>
      topicApi.getTopicsByKeyword({
        pageSize: 40,
        keyword: queryConfig.q as string,
        pageNumber: pageParam,
        column: "topicName",
        orderBy: "asc",
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.data.data.length === 0) return undefined;
      return lastPage.data.data.pageNumber + 1;
    },
  });

  const { data: sideStuffTopicsData } = useQuery({
    queryKey: ["sideStufftopics", { q: queryConfig.q }],
    queryFn: () =>
      topicApi.getTopicsByKeyword({
        pageSize: 9,
        keyword: queryConfig.q as string,
        pageNumber: 1,
        column: "topicName",
        orderBy: "asc",
      }),
  });
  const sideStuffTopics = sideStuffTopicsData?.data.data.data;

  const {
    data: storiesData,
    isLoading: isStoriesLoading,
    fetchNextPage: storiesFetchNextPage,
    hasNextPage: storiesHasNextPage,
    isFetchingNextPage: storiesIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["searchResults", { q: queryConfig.q }],
    queryFn: ({ pageParam = 1 }) =>
      storyApi.searchStories({
        pageSize: 5,
        keyword: queryConfig.q as string,
        pageNumber: pageParam,
        column: "publishDate",
        orderBy: "desc",
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.data.data.length === 0) return undefined;
      return lastPage.data.data.pageNumber + 1;
    },
  });
  const storiesLoadMoreRef = useRef<HTMLDivElement>(null);
  // const handleLoadMoreStories = useCallback(
  //   (entries: IntersectionObserverEntry[]) => {
  //     const target = entries[0];
  //     if (target.isIntersecting && storiesHasNextPage && !storiesIsFetchingNextPage) {
  //       storiesFetchNextPage();
  //     }
  //   },
  //   [storiesHasNextPage, storiesIsFetchingNextPage, storiesFetchNextPage],
  // );

  // useEffect(() => {
  //   const observer = new IntersectionObserver(handleLoadMoreStories, {
  //     rootMargin: "0px 0px 0px 0px",
  //   });

  //   if (storiesLoadMoreRef.current) {
  //     observer.observe(storiesLoadMoreRef.current);
  //   }

  //   return () => {
  //     observer.disconnect();
  //   };
  // }, [handleLoadMoreStories]);
  const { data: sideStuffsStoriesData } = useQuery({
    queryKey: ["sideStuffsStories", { q: queryConfig.q }],
    queryFn: () =>
      storyApi.searchStories({
        pageSize: 3,
        keyword: queryConfig.q as string,
        pageNumber: 1,
      }),
  });
  const sideStuffsStories = sideStuffsStoriesData?.data.data.data;
  const {
    data: usersData,
    isLoading: isUsersLoading,
    fetchNextPage: usersFetchNextPage,
    hasNextPage: usersHasNextPage,
    isFetchingNextPage: usersIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["users", { q: queryConfig.q }],
    queryFn: ({ pageParam = 1 }) =>
      authApi.searchUsers({
        pageSize: 6,
        keyword: queryConfig.q as string,
        pageNumber: pageParam,
        column: "fullName",
        orderBy: "asc",
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.data.data.length === 0) return undefined;
      return lastPage.data.data.pageNumber + 1;
    },
  });

  const { data: sideStuffsUsersData } = useQuery({
    queryKey: ["sideStuffUsers", { q: queryConfig.q }],
    queryFn: () =>
      authApi.searchUsers({
        keyword: queryConfig.q as string,
        pageSize: 3,
        column: "fullName",
        orderBy: "asc",
      }),
  });
  const sideStuffsUsers = sideStuffsUsersData?.data.data.data;
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Stories",
      children: (
        <div className="flex flex-col gap-6">
          {storiesData?.pages[0].data.data.data.length === 0 && (
            <div className="text-base">No stories matching {queryConfig.q}</div>
          )}
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
          <button
            onClick={() => storiesFetchNextPage()}
            className="text-normalGreen my-4 cursor-pointer"
            disabled={!storiesHasNextPage || storiesIsFetchingNextPage}
          >
            {storiesIsFetchingNextPage ? "Loading more..." : storiesHasNextPage ? "Load More" : ""}
          </button>
        </div>
      ),
    },
    {
      key: "2",
      label: "People",
      children: (
        // <div className="flex flex-col w-full">{users?.map((user) => <PeopleItem user={user}></PeopleItem>)}</div>
        <div className="flex flex-col w-full">
          {usersData?.pages[0].data.data.data.length === 0 && (
            <div className="text-base">No people matching {queryConfig.q}</div>
          )}
          {usersData?.pages.map((userGroup, index) => (
            <Fragment key={index}>
              {userGroup.data.data.data.map((user) => (
                <PeopleItem
                  key={user.id}
                  user={user}
                ></PeopleItem>
              ))}
            </Fragment>
          ))}
          <button
            onClick={() => usersFetchNextPage()}
            className="text-normalGreen my-4 cursor-pointer"
            disabled={!usersHasNextPage || usersIsFetchingNextPage}
          >
            {usersIsFetchingNextPage ? "Loading more..." : usersHasNextPage ? "Load More" : ""}
          </button>
        </div>
      ),
    },
    {
      key: "3",
      label: "Topics",
      children: (
        <>
          <TopicList>
            {topicsData?.pages[0].data.data.data.length === 0 && (
              <div className="text-base">No stories matching {queryConfig.q}</div>
            )}
            {topicsData?.pages.map((topicGroup, index) => (
              <Fragment key={index}>
                {topicGroup.data.data.data.map((topic) => (
                  <Link
                    key={topic.id}
                    className="min-w-[53px] flex items-center justify-center px-4 py-2 bg-[#f2f2f2] text-sm rounded-3xl"
                    to={`/tag/${topic.topicName}-${topic.id}`}
                  >
                    {topic.topicName}
                  </Link>
                ))}
              </Fragment>
            ))}
          </TopicList>
          <button
            onClick={() => topicsFetchNextPage()}
            className="text-normalGreen my-4 mx-auto block cursor-pointer"
            disabled={!topicsHasNextPage || topicsIsFetchingNextPage}
          >
            {topicsIsFetchingNextPage ? "Loading more..." : topicsHasNextPage ? "Load More" : ""}
          </button>
        </>
      ),
    },
  ];
  return (
    <MainContentWrapper>
      <MainStuffsWrapper>
        <MainStuffsHeading>
          <span>Results for </span>
          <span> {queryConfig.q || "everything 🤔"}</span>
        </MainStuffsHeading>
        <CustomTabs
          activeKey={currentActiveKey}
          items={items}
          onChange={(activeKey) => {
            setCurrentActiveKey(activeKey);
          }}
        ></CustomTabs>
      </MainStuffsWrapper>
      <SideStuffsWrapper>
        {currentActiveKey !== "1" && (
          <>
            <p className="font-semibold text-lg tracking-tight">Stories matching {queryConfig.q || "everything 🤔"}</p>
            <TopicsWrapper>
              <TopicList>
                {sideStuffsStories?.map((story) => (
                  <Link
                    key={story.id}
                    className="block"
                    to={`/${generateSlug({ name: story.title, id: story.id })}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full overflow-hidden">
                        <HandledImage
                          src={story.author.avatarPath}
                          alt={story.author.fullName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs font-semibold">{story.author.fullName}</span>
                    </div>
                    <h5 className="font-bold mt-1 text-[16px] leading-5 tracking-tighter">{story.title}</h5>
                    <span className="flex text-xs mt-[6px] items-center gap-2">
                      <span>{getCustomDate(new Date(story.publishDate))}</span>
                      <span>•</span>
                      <span>{story.timeRead} read</span>
                    </span>
                  </Link>
                ))}
              </TopicList>
              <span
                onClick={() => setCurrentActiveKey("1")}
                className="text-sm mt-4 block cursor-pointer text-normalGreen hover:text-normalGreenHover "
                aria-hidden
              >
                See all
              </span>
            </TopicsWrapper>
          </>
        )}
        {currentActiveKey !== "3" && (
          <>
            <p className="font-semibold text-lg tracking-tight">Topics matching {queryConfig.q || "everything 🤔"}</p>
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
              <span
                onClick={() => setCurrentActiveKey("3")}
                className="text-sm mt-4 block cursor-pointer text-normalGreen hover:text-normalGreenHover "
                aria-hidden
              >
                See all
              </span>
            </TopicsWrapper>
          </>
        )}

        {currentActiveKey !== "2" && (
          <>
            <p className="font-semibold text-lg tracking-tight">People matching {queryConfig.q || "everything 🤔"}</p>
            <TopicsWrapper>
              <TopicList>
                {sideStuffsUsers?.map((user) => (
                  <div
                    key={user.id}
                    className="flex w-full items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 flex-shrink-0 rounded-full overflow-hidden">
                        <HandledImage
                          src={user.avatarPath}
                          alt={user.fullName}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="font-semibold">{user.fullName}</div>
                        <div className="text-sm text-normalGrey line-clamp-2">{user.bio}</div>
                      </div>
                    </div>
                    <Link
                      to={`/user/profile/${user.id}`}
                      className="text-sm text-darkGrey flex-shrink-0 p-[5px_12px] w-[66px] h-[32px] flex items-center justify-center transition-all bg-white border border-darkGrey rounded-2xl hover:bg-darkGrey hover:!text-white"
                    >
                      Go
                    </Link>
                  </div>
                ))}
              </TopicList>
              <span
                onClick={() => setCurrentActiveKey("2")}
                className="text-sm mt-4 block cursor-pointer text-normalGreen hover:text-normalGreenHover "
                aria-hidden
              >
                See all
              </span>
            </TopicsWrapper>
          </>
        )}

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
