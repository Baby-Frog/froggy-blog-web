import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import CloseButtonIcon from "src/components/Icon/CloseButtonIcon";
import { TComment } from "src/types/comment.types";
import { styled } from "styled-components";

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
  transition: all 150ms cubic-bezier(0.075, 0.82, 0.165, 1);
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
  padding: 12px 24px;
  bottom: 0;
  right: 0;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 12px;
  transition: all 550ms cubic-bezier(0.075, 0.82, 0.165, 1);
  transform: ${(props) => (props.$isShown ? "translateX(0)" : "translateX(100%)")};
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

const CommentSection = ({
  setShowCommentSection,
  showCommentSection,
  comments,
  commentsCount,
}: TCommentSectionProps) => {
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
        <div>{comments?.map((comment) => <>{comment.content}</>)}</div>
      </CommentSectionBody>
    </CommentSectionWrapper>,
    document.body,
  );
};

export default CommentSection;
