import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useContext, useRef } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import AutoResizeTextarea from "src/components/AutoResizeTextarea";
import Button from "src/components/Button";
import CloseButtonIcon from "src/components/Icon/CloseButtonIcon";
import { AuthContext } from "src/contexts/auth.contexts";
import { commentSchema } from "src/schemas/comment.schemas";
import { TComment } from "src/types/comment.types";
import { styled } from "styled-components";
import CommentItem from "./components/CommentItem";

type TCommentSectionProps = {
  comments?: TComment[];
  commentsCount?: number | string;
  showCommentSection: boolean;
  setShowCommentSection: React.Dispatch<React.SetStateAction<boolean>>;
};

const CommentSectionWrapper = styled.div<{ $isShown: boolean }>`
  position: fixed;
  //   width: 390px;
  //   height: 100%;
  opacity: ${(props) => (props.$isShown ? "1" : "0")};
  visibility: ${(props) => (props.$isShown ? "visible" : "hidden")};
  transition: all 150ms ease-in-out;
  z-index: 999;
`;

const CommentSectionOverlay = styled.div<{ $isShown: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0);
  opacity: ${(props) => (props.$isShown ? "0.4" : "0")};
`;

const CommentSectionBody = styled.div<{ $isShown?: boolean }>`
  position: fixed;
  width: 390px;
  height: 100%;
  background-color: #fff;
  padding: 12px 18px;
  bottom: 0;
  right: 0;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 12px;
  transition: all 350ms ease-in-out;
  transform: ${(props) => (props.$isShown ? "translateX(0)" : "translateX(100%)")};
  overflow-y: auto;
`;

const CommentSectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 {
    font-size: 24px;
    font-weight: 600;
  }
`;

const CommentSectionCloseIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const YourCommentWrapper = styled.div`
  margin-top: 16px;
  padding: 8px 14px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 8px;
`;

const CommentSectionContent = styled.div`
  margin-top: 16px;
`;

const CommentSection = ({
  setShowCommentSection,
  showCommentSection,
  comments,
  commentsCount,
}: TCommentSectionProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(commentSchema),
  });
  const { userProfile } = useContext(AuthContext);

  useEffect(() => {
    if (showCommentSection) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [showCommentSection]);

  const handleComment = handleSubmit((data) => {
    console.log(data);
  });
  return createPortal(
    <CommentSectionWrapper $isShown={showCommentSection}>
      <CommentSectionOverlay
        $isShown={showCommentSection}
        onClick={() => setShowCommentSection(false)}
      />
      <CommentSectionBody $isShown={showCommentSection}>
        <CommentSectionHeader>
          <h2>Responses ({commentsCount})</h2>
          <CommentSectionCloseIcon onClick={() => setShowCommentSection(false)}>
            <CloseButtonIcon></CloseButtonIcon>
          </CommentSectionCloseIcon>
        </CommentSectionHeader>
        <YourCommentWrapper>
          <div className="flex items-center gap-2">
            <div className="rounded-full w-8 h-8 overflow-hidden">
              <img
                src={userProfile?.avatarPath}
                alt={userProfile?.fullName}
              />
            </div>
            <span className="font-medium">{userProfile?.fullName}</span>
          </div>
          <form onSubmit={handleComment}>
            <AutoResizeTextarea
              name="comment"
              placeholder="What are your thoughts?"
              register={register}
            ></AutoResizeTextarea>
            <div className="flex items-center justify-between">
              <span className="text-sm text-red-500">{errors.comment?.message}</span>
              <button
                className="bg-normalGreen ml-auto rounded-3xl text-sm px-3 py-2 flex items-center justify-center text-white"
                type="submit"
              >
                Comment
              </button>
            </div>
          </form>
        </YourCommentWrapper>
        <CommentSectionContent>
          {comments?.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
            ></CommentItem>
          ))}
        </CommentSectionContent>
      </CommentSectionBody>
    </CommentSectionWrapper>,
    document.body,
  );
};

export default CommentSection;
