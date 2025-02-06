import parse from "html-react-parser";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { commentApi } from "src/apis/comments.api";
import { likeApi } from "src/apis/like.apis";
import { storyApi } from "src/apis/story.apis";
import HandledImage from "src/components/HandledImage";
import ClapIcon from "src/components/Icon/ClapIcon";
import CommentIcon from "src/components/Icon/CommentIcon";
import CopyIcon from "src/components/Icon/CopyIcon";
import RemoveIcon from "src/components/Icon/RemoveIcon";
import SaveToFavoritesIcon from "src/components/Icon/SaveToFavoritesIcon";
import ShareStoryIcon from "src/components/Icon/ShareStoryIcon";
import TwitterIcon from "src/components/Icon/SocialIcon/TwitterIcon";
import ErrorToastIcon from "src/components/Icon/ToastIcon/ErrorToastIcon";
import SuccessToastIcon from "src/components/Icon/ToastIcon/SuccessToastIcon";
import Popover from "src/components/Popover";
import PopoverDismiss from "src/components/PopoverDismiss";
import TextToSpeech from "src/components/TextToSpeech";
import { path } from "src/constants/path";
import { AuthContext } from "src/contexts/auth.contexts";
import useShareLink from "src/hooks/useShareLink";
import { TStory } from "src/types/story.types";
import { getCustomDate } from "src/utils/formatDate";
import { getIdFromSlug } from "src/utils/slugify";
import { styled } from "styled-components";
import CommentSection from "./components/CommentSection";
import MoreFromAuthorSection from "./components/MoreFromAuthorSection";

const MainLayoutWrapper = styled.div`
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
  @media screen and (max-width: 1320px) {
    padding-inline: 16px;
  }
  @media screen and (max-width: 767px) {
    padding-inline: 12px;
  }
`;

const StoryDetailPage = () => {
  const { storyId } = useParams();
  const { isAuthenticated } = useContext(AuthContext);
  const [showCommentSection, setShowCommentSection] = useState<boolean>(false);
  const [currentAuthorId, setCurrentAuthorId] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const currentStoryUrl = window.location.href;
  const idFromSlug = getIdFromSlug(storyId as string);
  const { data: savedStoriesData } = useQuery({
    queryKey: ["savedStories"],
    queryFn: () => storyApi.getFavoriteStories(),
    enabled: isAuthenticated,
  });
  const { data: likesCountData } = useQuery({
    queryKey: ["likesCount", storyId],
    queryFn: () => likeApi.getLikesCount(idFromSlug as string),
  });
  const likesCount = likesCountData?.data.data;
  const { data: commentsCountData } = useQuery({
    queryKey: ["commentsCount", storyId],
    queryFn: () => commentApi.getCommentsCount(idFromSlug as string),
  });
  const commentsCount = commentsCountData?.data.data;
  const { data: commentsData } = useQuery({
    queryKey: ["comments", storyId],
    queryFn: () => commentApi.getCommentsByPostId(idFromSlug as string, {}),
  });
  const comments = commentsData?.data.data.data;
  const likeStoryMutation = useMutation({
    mutationFn: likeApi.toggleLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likesCount", storyId] });
    },
  });
  const saveToFavoritesMutation = useMutation({
    mutationFn: storyApi.saveStoryToFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedStories"] });
    },
  });
  const storyIsAlreadyInSavedList = Boolean(savedStoriesData?.data.data.data.find((story) => story.id === idFromSlug));
  const { data: storyDetailData } = useQuery({
    queryKey: ["story", storyId],
    queryFn: () => storyApi.getStoryById(idFromSlug as string),
  });
  const { data: currentAuthorStoriesData } = useQuery({
    queryKey: ["currentAuthorStories", idFromSlug],
    queryFn: () =>
      storyApi.getStoriesByUserId(currentAuthorId as string, {
        pageSize: 5,
        column: "publishDate",
        orderBy: "desc",
      }),
    enabled: Boolean(currentAuthorId),
  });
  const currentAuthorStories = currentAuthorStoriesData?.data.data.data;
  const filteredCurrentAuthorStories = currentAuthorStories?.filter((story) => {
    return story.id !== idFromSlug;
  });
  const { handleCopyCurrentLink, shareOnTwitter } = useShareLink({
    title: storyDetailData?.data.data.title,
    author: storyDetailData?.data.data.author.fullName,
    currentStoryUrl,
  });

  const handleSaveToFavorites = async () => {
    saveToFavoritesMutation.mutate(idFromSlug as string, {
      onSuccess: (data) => {
        toast.dismiss();
        toast.success(data.data.message, {
          icon: <SuccessToastIcon></SuccessToastIcon>,
        });
      },
    });
  };

  const handleLikeStory = () => {
    if (!isAuthenticated) {
      toast.error("You must login to like this story", {
        icon: <ErrorToastIcon></ErrorToastIcon>,
      });
      return;
    }
    likeStoryMutation.mutate(idFromSlug as string);
  };
  const handleShowCommentSection = () => {
    setShowCommentSection(true);
  };
  useEffect(() => {
    setCurrentAuthorId(storyDetailData?.data.data.author.id as string);
  }, [storyDetailData?.data.data.author.id]);
  return (
    <>
      <MainLayoutWrapper>
        <CommentSection
          postId={idFromSlug}
          comments={comments}
          authorId={storyDetailData?.data.data.author.id}
          commentsCount={commentsCount}
          showCommentSection={showCommentSection}
          setShowCommentSection={setShowCommentSection}
        ></CommentSection>
        <div className="mt-8">
          <h1 className="text-[40px] font-bold">{storyDetailData?.data.data.title}</h1>
          <div className="flex items-center gap-2 flex-wrap">
            {storyDetailData?.data.data.listTopic.map((topic) => (
              <Link
                to={`/tag/${topic.topicName}-${topic.id}`}
                key={topic.id}
                className="rounded-2xl text-black bg-[#f2f2f2] px-4 text-xs py-1 flex-shrink-0"
              >
                {topic.topicName}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4">
            <div className="rounded-full w-11 h-11">
              <HandledImage
                src={storyDetailData?.data.data.author.avatarPath}
                alt="Avatar"
                className="rounded-full w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{storyDetailData?.data.data.author.fullName}</span>
                <span className="text-xs text-normalGrey">•</span>
                <Link
                  to={`${path.PROFILE}/${storyDetailData?.data.data.author.id}`}
                  className="font-medium text-normalGreen hover:text-normalGreenHover"
                >
                  Go to profile
                </Link>
              </div>
              <div className="flex items-center gap-2 text-normalGrey">
                <span>{storyDetailData?.data.data.timeRead} read</span>
                <span className="text-xs text-normalGrey">•</span>
                <span>{getCustomDate(new Date(storyDetailData?.data.data.publishDate as string))}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 mb-7 px-2 py-3 border-t-2 border-b-2 border-[#F2F2F2] flex items-center justify-between">
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <Popover
                  backgroundColor="#000000a8"
                  sameWidthWithChildren={false}
                  placement="top"
                  enableArrow={false}
                  offsetPx={5}
                  renderPopover={<div className="text-white p-1">Clap</div>}
                >
                  <button
                    className="flex items-center gap-1 cursor-pointer hover:text-softBlack"
                    onClick={handleLikeStory}
                  >
                    <ClapIcon
                      color="#6b6b6b"
                      width={28}
                      height={28}
                      className="hover:text-softBlack"
                    ></ClapIcon>
                    <span className="translate-y-[1px]">{likesCount || "0"}</span>
                  </button>
                </Popover>
              ) : (
                <Popover
                  backgroundColor="#000000a8"
                  sameWidthWithChildren={false}
                  placement="top"
                  enableArrow={false}
                  offsetPx={5}
                  renderPopover={<div className="text-white p-1">You must login to like this story</div>}
                >
                  <button
                    className="flex items-center gap-1 cursor-default hover:text-softBlack"
                    onClick={handleLikeStory}
                  >
                    <ClapIcon
                      color="#bdbdbd"
                      width={28}
                      height={28}
                    ></ClapIcon>
                    <span className="translate-y-[1px]">{likesCount || "0"}</span>
                  </button>
                </Popover>
              )}
              <Popover
                backgroundColor="#000000a8"
                sameWidthWithChildren={false}
                placement="top"
                enableArrow={false}
                offsetPx={5}
                renderPopover={<div className="text-white p-1">Respond</div>}
              >
                <button
                  className="flex items-center gap-1 cursor-pointer hover:text-softBlack"
                  onClick={handleShowCommentSection}
                >
                  <CommentIcon
                    color="#6b6b6b"
                    width={24}
                    height={24}
                    className="hover:text-softBlack"
                  ></CommentIcon>
                  <span className="translate-y-[1px]">{commentsCount}</span>
                </button>
              </Popover>
            </div>
            <div className="flex items-center gap-6">
              {isAuthenticated ? (
                <Popover
                  backgroundColor="#000000a8"
                  sameWidthWithChildren={false}
                  placement="top"
                  offsetPx={5}
                  renderPopover={
                    <div className="text-white p-1">
                      {storyIsAlreadyInSavedList ? "Remove from Saved List" : "Add to Saved List"}
                    </div>
                  }
                >
                  {storyIsAlreadyInSavedList ? (
                    <RemoveIcon
                      color="#6b6b6b"
                      width={24}
                      height={24}
                      className="cursor-pointer hover:text-softBlack"
                      onClick={handleSaveToFavorites}
                    ></RemoveIcon>
                  ) : (
                    <SaveToFavoritesIcon
                      color="#6b6b6b"
                      width={24}
                      height={24}
                      className="cursor-pointer hover:text-softBlack"
                      onClick={handleSaveToFavorites}
                    ></SaveToFavoritesIcon>
                  )}
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
                    onClick={handleSaveToFavorites}
                  ></SaveToFavoritesIcon>
                </Popover>
              )}
              <Popover
                backgroundColor="#000000a8"
                sameWidthWithChildren={false}
                placement="top"
                offsetPx={5}
                className="w-6 h-6"
                renderPopover={<div className="text-white p-1">Hear this story</div>}
              >
                <TextToSpeech
                  text={storyDetailData?.data.data.raw as string}
                  onClick={() => setIsPlaying(!isPlaying)}
                ></TextToSpeech>
              </Popover>
              <PopoverDismiss
                sameWidthWithChildren={false}
                placement="bottom"
                renderPopover={
                  <div className="shadow-niceShadowSpread">
                    <div
                      className="p-2 text-normalGrey  hover:bg-black hover:bg-opacity-10 cursor-pointer flex items-center gap-2"
                      onClick={() => handleCopyCurrentLink(currentStoryUrl)}
                      aria-hidden
                    >
                      <CopyIcon color="#6b6b6b"></CopyIcon>
                      <span>Copy link</span>
                    </div>
                    <a
                      href={shareOnTwitter({
                        title: storyDetailData?.data.data.title as string,
                        author: storyDetailData?.data.data.author.fullName as string,
                        url: currentStoryUrl,
                      })}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 text-normalGrey  hover:bg-black hover:bg-opacity-10 cursor-pointer flex items-center gap-2"
                    >
                      <TwitterIcon color="#6b6b6b"></TwitterIcon>
                      <span>Share on Twitter</span>
                    </a>
                  </div>
                }
              >
                <ShareStoryIcon
                  color="#6b6b6b"
                  width={24}
                  height={24}
                  className="cursor-pointer hover:text-softBlack"
                ></ShareStoryIcon>
              </PopoverDismiss>
            </div>
          </div>
          {storyDetailData?.data.data.content && (
            <div className="entry-content">{parse(storyDetailData.data.data.content as string)}</div>
          )}
          {storyDetailData?.data.data.credit && (
            <div className="flex items-center justify-end gap-2">
              <span className="text-base">Credits:</span>
              <span className="text-base font-medium">{storyDetailData?.data.data.credit}</span>
            </div>
          )}
          <div className="text-center lg:text-3xl tracking-widest text-2xl">. . .</div>
          <div className="flex items-center gap-2 flex-wrap mt-4">
            {storyDetailData?.data.data.listTopic.map((topic) => (
              <div
                key={topic.id}
                className="rounded-2xl text-black bg-[#f2f2f2] px-4 font-medium text-sm py-2 flex-shrink-0"
              >
                {topic.topicName}
              </div>
            ))}
          </div>
          <div className="mt-4 mb-7 px-2 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <Popover
                  backgroundColor="#000000a8"
                  sameWidthWithChildren={false}
                  placement="top"
                  enableArrow={false}
                  offsetPx={5}
                  renderPopover={<div className="text-white p-1">Clap</div>}
                >
                  <button
                    className="flex items-center gap-1 cursor-pointer hover:text-softBlack"
                    onClick={handleLikeStory}
                  >
                    <ClapIcon
                      color="#6b6b6b"
                      width={28}
                      height={28}
                      className="hover:text-softBlack"
                    ></ClapIcon>
                    <span className="translate-y-[1px]">{likesCount || "0"}</span>
                  </button>
                </Popover>
              ) : (
                <Popover
                  backgroundColor="#000000a8"
                  sameWidthWithChildren={false}
                  placement="top"
                  enableArrow={false}
                  offsetPx={5}
                  renderPopover={<div className="text-white p-1">You must login to like this story</div>}
                >
                  <button
                    className="flex items-center gap-1 cursor-default hover:text-softBlack"
                    onClick={handleLikeStory}
                  >
                    <ClapIcon
                      color="#bdbdbd"
                      width={28}
                      height={28}
                    ></ClapIcon>
                    <span className="translate-y-[1px]">{likesCount || "0"}</span>
                  </button>
                </Popover>
              )}
              <Popover
                backgroundColor="#000000a8"
                sameWidthWithChildren={false}
                placement="top"
                enableArrow={false}
                offsetPx={5}
                renderPopover={<div className="text-white p-1">Respond</div>}
              >
                <button
                  className="flex items-center gap-1 cursor-pointer hover:text-softBlack"
                  onClick={handleShowCommentSection}
                >
                  <CommentIcon
                    color="#6b6b6b"
                    width={24}
                    height={24}
                    className="hover:text-softBlack"
                  ></CommentIcon>
                  <span className="translate-y-[1px]">{commentsCount}</span>
                </button>
              </Popover>
            </div>
            <div className="flex items-center gap-6">
              {isAuthenticated ? (
                <Popover
                  backgroundColor="#000000a8"
                  sameWidthWithChildren={false}
                  placement="top"
                  offsetPx={5}
                  renderPopover={
                    <div className="text-white p-1">
                      {storyIsAlreadyInSavedList ? "Remove from Saved List" : "Add to Saved List"}
                    </div>
                  }
                >
                  {storyIsAlreadyInSavedList ? (
                    <RemoveIcon
                      color="#6b6b6b"
                      width={24}
                      height={24}
                      className="cursor-pointer hover:text-softBlack"
                      onClick={handleSaveToFavorites}
                    ></RemoveIcon>
                  ) : (
                    <SaveToFavoritesIcon
                      color="#6b6b6b"
                      width={24}
                      height={24}
                      className="cursor-pointer hover:text-softBlack"
                      onClick={handleSaveToFavorites}
                    ></SaveToFavoritesIcon>
                  )}
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
                    onClick={handleSaveToFavorites}
                  ></SaveToFavoritesIcon>
                </Popover>
              )}
              <Popover
                backgroundColor="#000000a8"
                sameWidthWithChildren={false}
                placement="top"
                offsetPx={5}
                className="w-6 h-6"
                renderPopover={<div className="text-white p-1">Hear this story</div>}
              >
                <TextToSpeech
                  text={storyDetailData?.data.data.raw as string}
                  onClick={() => setIsPlaying(!isPlaying)}
                ></TextToSpeech>
              </Popover>
              <PopoverDismiss
                sameWidthWithChildren={false}
                placement="bottom"
                renderPopover={
                  <div className="shadow-niceShadowSpread">
                    <div
                      className="p-2 text-normalGrey  hover:bg-black hover:bg-opacity-10 cursor-pointer flex items-center gap-2"
                      onClick={() => handleCopyCurrentLink(currentStoryUrl)}
                      aria-hidden
                    >
                      <CopyIcon color="#6b6b6b"></CopyIcon>
                      <span>Copy link</span>
                    </div>
                    <a
                      href={shareOnTwitter({
                        title: storyDetailData?.data.data.title as string,
                        author: storyDetailData?.data.data.author.fullName as string,
                        url: currentStoryUrl,
                      })}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 text-normalGrey  hover:bg-black hover:bg-opacity-10 cursor-pointer flex items-center gap-2"
                    >
                      <TwitterIcon color="#6b6b6b"></TwitterIcon>
                      <span>Share on Twitter</span>
                    </a>
                  </div>
                }
              >
                <ShareStoryIcon
                  color="#6b6b6b"
                  width={24}
                  height={24}
                  className="cursor-pointer hover:text-softBlack"
                ></ShareStoryIcon>
              </PopoverDismiss>
            </div>
          </div>
        </div>
      </MainLayoutWrapper>
      <div className="pt-[64px] mt-12 pb-12 bg-[#f9f9f9]">
        <MainLayoutWrapper>
          <div className="lg:flex block items-center justify-between pb-8 border-b-2 border-whiteF2">
            <div>
              <div className="rounded-full w-20 h-20 overflow-hidden">
                <HandledImage
                  src={storyDetailData?.data.data.author.avatarPath}
                  alt=""
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <span className="block mt-4 font-semibold text-2xl tracking-tighter">
                Written by {storyDetailData?.data.data.author.fullName}
              </span>
              <span className="text-[13px] font-medium text-lightGrey">{storyDetailData?.data.data.author.bio}</span>
            </div>
            <Link
              className="mt-4 flex justify-center items-center w-[120px] bg-darkGrey font-medium shrink-0 text-white px-3 py-1.5 rounded-3xl hover:!text-white lg:mt-0"
              to={`${path.PROFILE}/${storyDetailData?.data.data.author.id}`}
            >
              Check profile
            </Link>
          </div>
          <h3 className="pt-8 text-lg">
            <span>More from</span>
            <span className="font-semibold"> {storyDetailData?.data.data.author.fullName}</span>
          </h3>
          <MoreFromAuthorSection
            story={storyDetailData?.data.data as TStory}
            currentAuthorStories={filteredCurrentAuthorStories as TStory[]}
            storiesLength={filteredCurrentAuthorStories?.length}
          ></MoreFromAuthorSection>
        </MainLayoutWrapper>
      </div>
    </>
  );
};

export default StoryDetailPage;
