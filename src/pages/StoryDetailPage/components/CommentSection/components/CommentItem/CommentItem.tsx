import React from "react";
import ClapIcon from "src/components/Icon/ClapIcon";
import CommentIcon from "src/components/Icon/CommentIcon";
import EllipsisIcon from "src/components/Icon/EllipsisIcon";
import { TComment } from "src/types/comment.types";

type TCommentItemProps = {
  comment: TComment;
  authorId: string;
};

const CommentItem = ({ comment, authorId }: TCommentItemProps) => {
  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <div className="rounded-full w-8 h-8 overflow-hidden">
            <img
              src={comment.profileDto.avatarPath}
              alt={comment.profileDto.fullName}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-medium">{comment.profileDto.fullName}</span>
              {comment.profileDto.id === authorId && (
                <span className="min-w-[52px] flex items-center justify-center text-[11px] uppercase p-[2px] bg-normalGreen !text-white">
                  Author
                </span>
              )}
            </div>
            <span className="text-xs text-lightGrey">{new Date(comment.createDate).toLocaleDateString("en-GB")}</span>
          </div>
        </div>
        <span className="text-sm text-lightGrey">
          <EllipsisIcon
            width={24}
            height={24}
          ></EllipsisIcon>
        </span>
      </div>
      <div className="text-sm mt-1">{comment.content}</div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            <ClapIcon
              width={26}
              height={26}
              color="#6b6b6b"
            ></ClapIcon>
            <span className="text-xs">0</span>
          </div>
          <div className="flex items-center">
            <CommentIcon
              width={24}
              height={24}
              color="#6b6b6b"
            ></CommentIcon>
            <span className="text-xs">0</span>
          </div>
        </div>
        <div className="text-sm font-medium cursor-pointer">Reply</div>
      </div>
    </div>
  );
};

export default CommentItem;
