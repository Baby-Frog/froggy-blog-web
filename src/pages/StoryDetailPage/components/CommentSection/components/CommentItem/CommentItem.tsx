import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { commentApi } from "src/apis/comments.api";
import CommentIcon from "src/components/Icon/CommentIcon";
import EllipsisIcon from "src/components/Icon/EllipsisIcon";
import LongText from "src/components/LongText";
import PopoverDismiss from "src/components/PopoverDismiss";
import { AuthContext } from "src/contexts/auth.contexts";
import { TComment } from "src/types/comment.types";
import Swal from "sweetalert2";
import HandledImage from "src/components/HandledImage";

type TCommentItemProps = {
  comment: TComment;
  authorId: string;
};

const CommentItem = ({ comment, authorId }: TCommentItemProps) => {
  const { userProfile, isAuthenticated } = useContext(AuthContext);
  const [reportContent, setReportContent] = useState<string>("");
  const [isResponseHidden, setIsResponseHidden] = useState<boolean>(false);
  const deleteMutation = useMutation(commentApi.deleteComment);
  const reportMutation = useMutation(commentApi.reportComment);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    mode: "onSubmit",
  });
  const queryClient = useQueryClient();
  const handleDeleteComment = () => {
    deleteMutation.mutate(comment.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["comments"] });
        queryClient.invalidateQueries({ queryKey: ["commentsCount"] });
      },
    });
  };
  const handleReportComment = (commentId: string) => {
    Swal.fire({
      title: "Why did you report this comment?",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Confirm",
      showLoaderOnConfirm: true,
      preConfirm: (reportContent) => {
        return reportMutation
          .mutateAsync({
            commentId: commentId,
            reason: reportContent,
          })
          .then((response) => {
            if (response.status !== 200) {
              throw new Error(response.statusText);
            }
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Reported!",
          text: "This comment has been reported",
          icon: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["dashboardReports"] });
      }
    });
  };
  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <div className="rounded-full w-8 h-8 overflow-hidden">
            <HandledImage
              src={comment.profileDto.avatarPath}
              alt={comment.profileDto.fullName}
              className="w-full h-full object-cover"
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
        <PopoverDismiss
          className="text-sm z-10 text-lightGrey"
          as="button"
          enableArrow={false}
          placement="bottom-end"
          sameWidthWithChildren={false}
          renderPopover={
            <div className="w-max text-left z-10 bg-white shadow-softShadowSpread text-black">
              {isAuthenticated && comment.profileDto.id === userProfile?.id && (
                <>
                  <div className="p-2 text-normalGrey font-medium hover:bg-black hover:bg-opacity-10 cursor-pointer">
                    Edit response
                  </div>
                  <div
                    onClick={handleDeleteComment}
                    className="p-2 text-failure font-medium hover:bg-black hover:bg-opacity-10 cursor-pointer"
                    aria-hidden
                  >
                    Delete response
                  </div>
                </>
              )}
              {isAuthenticated && comment.profileDto.id !== userProfile?.id && (
                <div
                  className="p-2 text-normalGrey font-medium hover:bg-black hover:bg-opacity-10 cursor-pointer"
                  onClick={() => handleReportComment(comment.id)}
                  aria-hidden
                >
                  Report response
                </div>
              )}
              <div
                className="p-2 text-normalGrey font-medium hover:bg-black hover:bg-opacity-10 cursor-pointer"
                onClick={() => setIsResponseHidden(!isResponseHidden)}
                aria-hidden
              >
                {!isResponseHidden ? "Hide response" : "Show response"}
              </div>
            </div>
          }
        >
          <EllipsisIcon
            width={24}
            height={24}
          ></EllipsisIcon>
        </PopoverDismiss>
      </div>
      <LongText className={`text-sm mt-1 ${isResponseHidden && "italic font-light"}`}>
        {!isResponseHidden ? comment.content : "This response has been hidden"}
      </LongText>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center">
          <CommentIcon
            width={24}
            height={24}
            color="#6b6b6b"
          ></CommentIcon>
          <span className="text-xs">0</span>
        </div>
        <div className="text-sm font-medium cursor-pointer">Reply</div>
      </div>
    </div>
  );
};

export default CommentItem;
