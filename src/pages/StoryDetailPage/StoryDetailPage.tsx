import parse from "html-react-parser";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { storyApi } from "src/apis/story.apis";
import ClapIcon from "src/components/Icon/ClapIcon";
import CommentIcon from "src/components/Icon/CommentIcon";
import CopyIcon from "src/components/Icon/CopyIcon";
import PlayVoiceIcon from "src/components/Icon/PlayVoiceIcon";
import SaveToFavoritesIcon from "src/components/Icon/SaveToFavoritesIcon";
import ShareStoryIcon from "src/components/Icon/ShareStoryIcon";
import TwitterIcon from "src/components/Icon/SocialIcon/TwitterIcon";
import Popover from "src/components/Popover";
import PopoverDismiss from "src/components/PopoverDismiss";
import TextToSpeech from "src/components/TextToSpeech";
import { AuthContext } from "src/contexts/auth.contexts";
import { toast } from "react-toastify";
import { getCustomDate } from "src/utils/formatDate";
import SuccessToastIcon from "src/components/Icon/ToastIcon/SuccessToastIcon";
import { path } from "src/constants/path";

const StoryDetailPage = () => {
  const { storyId } = useParams();
  const { isAuthenticated } = useContext(AuthContext);
  const currentStoryUrl = window.location.href;
  console.log(currentStoryUrl);
  const { data: storyDetailData, isLoading: storyDetailIsLoading } = useQuery({
    queryKey: ["story", storyId],
    queryFn: () => storyApi.getStoryById(storyId as string),
  });
  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentStoryUrl);
    toast.success("Copied link to clipboard", {
      icon: <SuccessToastIcon></SuccessToastIcon>,
    });
  };
  return (
    <div className="mt-8">
      <h1 className="text-[40px] font-bold">{storyDetailData?.data.data.title}</h1>
      <div className="flex items-center gap-2">
        {storyDetailData?.data.data.listTopic.map((topic) => (
          <div className="rounded-2xl text-white bg-normalGreen px-4 text-xs py-1">{topic.topicName}</div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <div className="rounded-full w-11 h-11">
          <img
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
            <span>{storyDetailData?.data.data.timeRead}</span>
            <span className="text-xs text-normalGrey">•</span>
            <span>{getCustomDate(new Date(storyDetailData?.data.data.publishDate as string))}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 mb-7 px-2 py-3 border-t-2 border-b-2 border-[#F2F2F2] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 cursor-pointer hover:text-softBlack">
            <ClapIcon
              color="#6b6b6b"
              width={28}
              height={28}
              className="hover:text-softBlack"
            ></ClapIcon>
            <span className="translate-y-[1px]">0</span>
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:text-softBlack">
            <CommentIcon
              color="#6b6b6b"
              width={24}
              height={24}
              className="hover:text-softBlack"
            ></CommentIcon>
            <span className="translate-y-[1px]">0</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          {isAuthenticated && (
            <Popover
              backgroundColor="#000000a8"
              sameWidthWithChildren={false}
              placement="top"
              offsetPx={5}
              renderPopover={<div className="text-white p-1">Save to favorites</div>}
            >
              <SaveToFavoritesIcon
                color="#6b6b6b"
                width={24}
                height={24}
                className="cursor-pointer hover:text-softBlack"
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
            <TextToSpeech text={storyDetailData?.data.data.raw as string}>
              <PlayVoiceIcon
                color="#6b6b6b"
                width={24}
                height={24}
                className="cursor-pointer hover:text-softBlack"
              ></PlayVoiceIcon>
            </TextToSpeech>
          </Popover>
          <PopoverDismiss
            sameWidthWithChildren={false}
            placement="bottom"
            renderPopover={
              <div className="shadow-niceShadowSpread">
                <div
                  className="p-2 text-normalGrey  hover:bg-black hover:bg-opacity-10 cursor-pointer flex items-center gap-2"
                  onClick={handleCopyLink}
                  aria-hidden
                >
                  <CopyIcon color="#6b6b6b"></CopyIcon>
                  <span>Copy link</span>
                </div>
                <a
                  href={`https://twitter.com/intent/tweet?text=${storyDetailData?.data.data.title}%20by%20${storyDetailData?.data.data.author.fullName}&url=${currentStoryUrl}`}
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
    </div>
  );
};

export default StoryDetailPage;
