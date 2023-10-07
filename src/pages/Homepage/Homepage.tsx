import { useContext } from "react";
import { useQuery } from "react-query";
import { storyApi } from "src/apis/story.apis";
import TrendingIcon from "src/components/Icon/TrendingIcon";
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
  gap: 22px;
  justify-content: space-between;
`;

const RecentPostsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 32px;
  flex: 6;
`;

const SideStuffsWrapper = styled.div`
  flex: 4;
`;

const Grid = styled.div<{ $itemsPerRow: number; $gap: number }>`
  display: grid;
  grid-template-columns: repeat(${($props) => $props.$itemsPerRow}, 1fr);
  gap: ${($props) => $props.$gap || "0px"};
`;

const Homepage = () => {
  const { isAuthenticated } = useContext(AuthContext);

  // const [recentStories, setRecentStories] = useState<TStory[]>([]);
  const { data: storiesData, isLoading: storiesIsLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: () => storyApi.getRecentStories({ keyword: "", pageSize: 5 }),
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
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
            <RecentPostsWrapper>
              {storiesData?.data.data.data.map((story) => <HomepageRecentPost story={story}></HomepageRecentPost>)}
            </RecentPostsWrapper>
            <SideStuffsWrapper>Hello side stuffs</SideStuffsWrapper>
          </MainContentWrapper>
        </div>
      ) : (
        <div className="">Hello man</div>
      )}
    </>
  );
};

export default Homepage;
