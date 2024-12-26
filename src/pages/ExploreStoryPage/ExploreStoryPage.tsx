import { Fragment, useCallback, useEffect, useRef } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { storyApi } from "src/apis/story.apis";
import { topicApi } from "src/apis/topic.apis";
import { styled } from "styled-components";
import HomepageRecentPost from "../Homepage/components/HomepageRecentPost";

type TExploreStoryPageProps = {
  something: string;
};

const LeftContent = styled.div`
  width: calc(40% - 32px);
  height: max-content;
  position: sticky;
  top: 120px;
  left: 0;
  margin-top: 60px;
`;

const RightContent = styled.div`
  width: calc(60% - 32px);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ExploreStoryPage = () => {
  const { topicId } = useParams();
  const { data: topicData } = useQuery({
    queryFn: () => topicApi.getTopicById(topicId as string),
  });
  const topic = topicData?.data.data;
  const {
    data: storiesData,
    fetchNextPage: storiesFetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["exploreStories"],
    queryFn: ({ pageParam = 1 }) =>
      storyApi.getStoriesByTopicId(topicId as string, {
        pageSize: 5,
        pageNumber: pageParam,
        column: "publishDate",
        orderBy: "desc",
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.data.data.length === 0) return undefined;
      return lastPage.data.data.pageNumber + 1;
    },
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
  return (
    <div className="flex gap-16 min-h-screen relative">
      <LeftContent>
        <div className="flex items-center gap-6">
          <div className="text-sm">{topic?.topicName}</div>
          <div className="text-sm">{">"}</div>
          <div className="text-sm">Recent stories</div>
        </div>
        <div className="block fixed top-[160px] text-6xl w-[400px] font-semibold">
          Recent stories for {topic?.topicName}
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 fixed w-[300px] bottom-8 text-lightGrey text-xs">
          <span>Help</span>
          <span>Status</span>
          <span>About</span>
          <span>Blog</span>
          <span>Privacy</span>
          <span>Terms</span>
          <span>Text to speech</span>
          <span>Teams</span>
        </div>
      </LeftContent>
      <RightContent>
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
      </RightContent>
    </div>
  );
};

export default ExploreStoryPage;
