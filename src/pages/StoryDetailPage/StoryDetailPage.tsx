import parse from "html-react-parser";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { storyApi } from "src/apis/story.apis";
import ClapIcon from "src/components/Icon/ClapIcon";
import CommentIcon from "src/components/Icon/CommentIcon";
import { getCustomDate } from "src/utils/formatDate";

const StoryDetailPage = () => {
  const { storyId } = useParams();
  const { data: storyDetailData, isLoading: storyDetailIsLoading } = useQuery({
    queryKey: ["story", storyId],
    queryFn: () => storyApi.getStoryById(storyId as string),
  });

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
              to="/123"
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
      <div className="my-4 px-2 py-3 border-t-2 border-b-2 border-[#F2F2F2] flex items-center justify-betweenf">
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
        <div className="flex items-center gap-4"></div>
      </div>
      {storyDetailData?.data.data.content && (
        <div className="entry-content">{parse(storyDetailData.data.data.content as string)}</div>
      )}
    </div>
  );
};

export default StoryDetailPage;
