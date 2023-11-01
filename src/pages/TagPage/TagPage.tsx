import { useContext, useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { storyApi } from "src/apis/story.apis";
import { topicApi } from "src/apis/topic.apis";
import Footer from "src/components/Footer";
import HandledImage from "src/components/HandledImage";
import ArrowLeftIcon from "src/components/Icon/ArrowLeftIcon";
import ArrowRightIcon from "src/components/Icon/ArrowRightIcon";
import ClapIcon from "src/components/Icon/ClapIcon";
import CommentIcon from "src/components/Icon/CommentIcon";
import ExploreIcon from "src/components/Icon/ExploreIcon";
import SaveToFavoritesIcon from "src/components/Icon/SaveToFavoritesIcon";
import Popover from "src/components/Popover";
import { path } from "src/constants/path";
import { AuthContext } from "src/contexts/auth.contexts";
import { getCustomDate } from "src/utils/formatDate";
import http from "src/utils/http";
import { generateSlug, getFirstSegmentFromSlug, getIdFromSlug } from "src/utils/slugify";
import { styled } from "styled-components";

type TTagPageProps = {
  something: string;
};

const ExploreSectionWrapper = styled.div`
  position: relative;
`;

const ExploreSelection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 16px;
  overflow-x: scroll;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ExploreTopicsButton = styled.button`
  background-color: ${(props) => props.theme.colors.whiteF2};
  padding: 8px 12px 8px 8px;
  border: 1px solid ${(props) => props.theme.colors.darkGrey};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  gap: 8px;
  height: 38px;
  flex-shrink: 0;
  font-weight: 500;
  cursor: pointer;
`;

const ExploreSelectionList = styled.div`
  height: 38px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  width: 100%;
`;

const ExploreSelectionItem = styled.button`
  background-color: ${(props) => props.theme.colors.whiteF2};
  padding: 8px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 38px;
  flex-shrink: 0;
  border-radius: 24px;
  cursor: pointer;
`;

const ExploreHeading = styled.h1`
  font-size: 42px;
  font-weight: 600;
  text-align: center;
  margin-top: 48px;
`;

const ExploreInputWrapper = styled.form`
  background-color: #f9f9f9;
  position: relative;
  padding: 12px 16px;
  border-radius: 36px;
  margin: 32px auto 0;
  width: 624px;
`;

const ExploreScrollRight = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1;
  width: 120px;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.75) 25%,
    rgba(255, 255, 255, 0.9) 50%,
    rgba(255, 255, 255, 1) 75%
  );
`;

const ExploreScrollLeft = styled.div`
  position: absolute;
  top: 50%;
  left: 0px;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1;
  width: 120px;
  height: 100%;
  background: linear-gradient(
    270deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.75) 25%,
    rgba(255, 255, 255, 0.9) 50%,
    rgba(255, 255, 255, 1) 75%
  );
`;

const TagHeading = styled.h1`
  font-size: 42px;
  font-weight: 600;
  letter-spacing: -0.3px;
  text-align: center;
  margin-top: 48px;
`;

const TagMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: ${(props) => props.theme.colors.lightGrey};
`;

const TagInfo = styled.div`
  padding-bottom: 48px;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TagMain = styled.div`
  padding-top: 24px;
`;

const TagMainHeading = styled.h2`
  font-size: 36px;
  font-weight: 600;
`;

const TagMainStoryGrid = styled.div`
  padding-top: 16px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 36px;
  grid-template-areas:
    "g1 g1 g1 g2 g2 g2"
    "g1 g1 g1 g2 g2 g2"
    "g3 g3 g4 g4 g5 g5";
`;

const TagMainStoryItem = styled(Link)`
  display: flex;
  flex-direction: column;
  &:nth-of-type(1),
  &:nth-of-type(2) {
    .image-wrapper {
      height: 400px;
    }
    h2 {
      font-size: 24px;
      font-weight: 700;
    }
  }
  &:nth-of-type(3),
  &:nth-of-type(4),
  &:nth-of-type(5) {
    .image-wrapper {
      height: 200px;
    }
    h2 {
      font-size: 20px;
      font-weight: 700;
    }
  }
  &:nth-of-type(1) {
    grid-area: g1;
  }
  &:nth-of-type(2) {
    grid-area: g2;
  }
  &:nth-of-type(3) {
    grid-area: g3;
  }
  &:nth-of-type(4) {
    grid-area: g4;
  }
  &:nth-of-type(5) {
    grid-area: g5;
  }
`;

const TagPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userProfile } = useContext(AuthContext);
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [showRightArrow, setShowRightArrow] = useState<boolean>(true);
  const exploreTopicsSectionRef = useRef<HTMLDivElement>(null);
  const { slug } = useParams();
  const idFromSlug = getIdFromSlug(slug as string);
  const topicName = getFirstSegmentFromSlug(slug as string);
  const { data: exploreTopicsData } = useQuery({
    queryKey: ["explore-topics"],
    queryFn: () => topicApi.getTopicsByKeyword({ keyword: "", pageSize: 20, column: "id", orderBy: "asc" }),
  });
  const { data: storiesByTagData } = useQuery({
    queryKey: ["storiesByTag", { tagId: idFromSlug }],
    queryFn: () =>
      storyApi.getStoriesByTopicId(idFromSlug, {
        pageSize: 5,
        pageNumber: 1,
        column: "publishDate",
        orderBy: "desc",
      }),
  });
  const storiesByTag = storiesByTagData?.data.data.data;
  const exploreTopics = exploreTopicsData?.data.data.data;
  const handleNavigateToTopic = (topicId: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const topicName = e.currentTarget.innerText;
    navigate(`/tag/${topicName}-${topicId}`);
  };
  const handleScrollRight = () => {
    exploreTopicsSectionRef?.current?.scrollBy({
      top: 0,
      left: 150,
    });
  };
  const handleScrollLeft = () => {
    exploreTopicsSectionRef?.current?.scrollBy({
      top: 0,
      left: -150,
    });
  };
  useEffect(() => {
    const handleScroll = () => {
      if (exploreTopicsSectionRef?.current?.scrollLeft && exploreTopicsSectionRef.current.scrollLeft > 0) {
        setShowLeftArrow(true);
      } else {
        setShowLeftArrow(false);
      }
      if (
        exploreTopicsSectionRef?.current?.scrollLeft &&
        exploreTopicsSectionRef.current.scrollLeft >=
          exploreTopicsSectionRef.current.scrollWidth - exploreTopicsSectionRef.current.clientWidth - 1
      ) {
        setShowRightArrow(false);
      } else {
        setShowRightArrow(true);
      }
    };

    const currentRef = exploreTopicsSectionRef.current;
    currentRef?.addEventListener("scroll", handleScroll);
    return () => {
      currentRef?.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <ExploreSectionWrapper>
        <ExploreSelection ref={exploreTopicsSectionRef}>
          {showLeftArrow && (
            <ExploreScrollLeft onClick={handleScrollLeft}>
              <ArrowLeftIcon></ArrowLeftIcon>
            </ExploreScrollLeft>
          )}
          <ExploreTopicsButton>
            <ExploreIcon></ExploreIcon>
            <span>Explore topics</span>
          </ExploreTopicsButton>
          <ExploreSelectionList>
            {exploreTopics?.map((topic) => (
              <ExploreSelectionItem onClick={handleNavigateToTopic(topic.id)}>{topic.topicName}</ExploreSelectionItem>
            ))}
          </ExploreSelectionList>
          {showRightArrow && (
            <ExploreScrollRight onClick={handleScrollRight}>
              <ArrowRightIcon></ArrowRightIcon>
            </ExploreScrollRight>
          )}
        </ExploreSelection>
      </ExploreSectionWrapper>
      <TagHeading>{topicName}</TagHeading>
      <TagInfo>
        <TagMeta>
          <span>Topic</span>
          <span className="text-3xl">·</span>
          <span>{storiesByTagData?.data.data.totalRecord} Stories</span>
        </TagMeta>
        <Link
          className="mt-4 flex w-max justify-center items-center bg-darkGrey font-medium shrink-0 text-white border border-darkGrey px-3 py-2 rounded-3xl transition-all hover:!text-white hover:!bg-darkGrey"
          to={`/explore-stories/${idFromSlug}`}
        >
          See more {topicName} stories
        </Link>
      </TagInfo>
      <TagMain>
        <TagMainHeading>Recent stories for {topicName}</TagMainHeading>
        <TagMainStoryGrid>
          {storiesByTag?.map((story) => (
            <TagMainStoryItem to={`/${generateSlug({ name: story.title, id: story.id })}`}>
              <div className="image-wrapper rounded-sm overflow-hidden">
                <HandledImage
                  className="w-full h-full object-cover"
                  src={story.thumbnail}
                  alt={story.title}
                />
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm font-semibold">
                <span className="rounded-full w-5 h-5 overflow-hidden">
                  <HandledImage
                    src={story.author.avatarPath}
                    alt={story.author.fullName}
                    className="w-full h-full object-cover"
                  />
                </span>
                <div className="flex items-center gap-1">
                  <span>{story.author.fullName}</span>
                  <span className="font-medium"> in</span>
                  <span> Froggy Blog</span>
                </div>
              </div>
              <h2 className="mt-2 text-xl font-bold line-clamp-2 tracking-tighter">{story.title}</h2>
              <p className="mt-2 text-base font-medium line-clamp-3 text-lightGrey">{story.raw}</p>
              <div className="mt-auto flex flex-col gap-2">
                <span className="mt-2 flex items-center gap-2">
                  <span>{getCustomDate(new Date(story.publishDate))}</span>
                  <span>•</span>
                  <span>{story.timeRead} read</span>
                </span>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 cursor-pointer hover:text-softBlack">
                      <ClapIcon
                        color="#6b6b6b"
                        width={28}
                        height={28}
                        className="hover:text-softBlack"
                      ></ClapIcon>
                      <span className="translate-y-[1px]">{story.likes || "0"}</span>
                    </button>
                    <button className="flex items-center gap-1 cursor-pointer hover:text-softBlack">
                      <CommentIcon
                        color="#6b6b6b"
                        width={24}
                        height={24}
                        className="hover:text-softBlack"
                      ></CommentIcon>
                      <span className="translate-y-[1px]">{story.comments || "0"}</span>
                    </button>
                  </div>
                  {isAuthenticated ? (
                    <Popover
                      backgroundColor="#000000a8"
                      sameWidthWithChildren={false}
                      placement="top"
                      offsetPx={5}
                      renderPopover={<div className="text-white p-1">Add to Saved List</div>}
                    >
                      <SaveToFavoritesIcon
                        color="#6b6b6b"
                        width={24}
                        height={24}
                        className="cursor-pointer hover:text-softBlack"
                      ></SaveToFavoritesIcon>
                    </Popover>
                  ) : (
                    <Popover
                      backgroundColor="#000000a8"
                      sameWidthWithChildren={false}
                      placement="top"
                      offsetPx={5}
                      renderPopover={<div className="text-white p-1">You must login to save this story</div>}
                    >
                      <SaveToFavoritesIcon
                        color="#bdbdbd"
                        width={24}
                        height={24}
                        className="cursor-default"
                      ></SaveToFavoritesIcon>
                    </Popover>
                  )}
                </div>
              </div>
            </TagMainStoryItem>
          ))}
        </TagMainStoryGrid>
        <Link
          className="mt-16 flex w-max justify-center items-center bg-white font-medium shrink-0 text-darkGrey border border-darkGrey px-3 py-2 rounded-3xl transition-all hover:!text-white hover:!bg-darkGrey"
          to={`/explore-stories/${idFromSlug}`}
        >
          See more {topicName} stories
        </Link>
      </TagMain>
    </>
  );
};

export default TagPage;
