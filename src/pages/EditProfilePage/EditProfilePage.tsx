import { useContext, useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { authApi } from "src/apis/auth.apis";
import EditAvatarIcon from "src/components/Icon/EditAvatarIcon";
import ErrorToastIcon from "src/components/Icon/ToastIcon/ErrorToastIcon";
import InputFile from "src/components/InputFile";
import { AuthContext } from "src/contexts/auth.contexts";
import useShareLink from "src/hooks/useShareLink";
import { styled } from "styled-components";
import DefaultCoverImage from "src/assets/linkedin-default.png";
const ProfileLeft = styled.div`
  flex: 6;
`;
const ProfileRight = styled.div`
  flex: 4;
`;

const AvatarWrapper = styled.div`
  position: relative;
  .edit-overlay {
    cursor: pointer;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: none;
    border-radius: 100rem;
  }

  &:hover .edit-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CoverImageWrapper = styled.div`
  position: relative;
  width: 100%;
  .edit-overlay {
    cursor: pointer;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: none;
  }

  &:hover .edit-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const THREE_MEGABYTE_TO_BYTES = 3 * 1024 * 1024;

const EditProfilePage = () => {
  const { userProfile } = useContext(AuthContext);
  const [previewAvatarFile, setPreviewAvatarFile] = useState<Blob>();
  const [previewCoverImageFile, setPreviewCoverImageFile] = useState<Blob>();
  const previewCoverImageURL = useMemo(() => {
    return previewCoverImageFile ? URL.createObjectURL(previewCoverImageFile) : "";
  }, [previewCoverImageFile]);
  const previewAvatarURL = useMemo(() => {
    return previewAvatarFile ? URL.createObjectURL(previewAvatarFile) : "";
  }, [previewAvatarFile]);
  const avatarInputFileRef = useRef<HTMLInputElement>(null);
  const coverImageInputFileRef = useRef<HTMLInputElement>(null);

  const { data: meData } = useQuery({
    queryKey: ["me"],
    queryFn: () => authApi.getMe(),
    refetchOnMount: true,
  });
  const me = meData?.data.data;
  const handleClickOnAvatarInput = () => {
    avatarInputFileRef.current?.click();
  };
  const handleClickOnCoverImageInput = () => {
    coverImageInputFileRef.current?.click();
  };
  const handleChangeCoverImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = e.target.files?.[0];
    if (fileFromLocal && !fileFromLocal.type.includes("image") && fileFromLocal?.type.includes("gif")) {
      toast.error(<div className="text-sm">Wrong file format, we only accept .JPEG, .PNG, .JPG file format</div>, {
        icon: (
          <ErrorToastIcon
            width={40}
            height={40}
          />
        ),
      });
      // Set lại value để có thể hiển thị lại lỗi đề phòng có chuyện gì xảy ra
      e.target.value = "";
      return;
    }
    if (fileFromLocal && fileFromLocal.size >= THREE_MEGABYTE_TO_BYTES) {
      toast.error("Your image size is too big, we only accept image size under 3MB", {
        icon: (
          <ErrorToastIcon
            width={40}
            height={40}
          />
        ),
      });
      // Set lại value để có thể chọn lại bức ảnh trước một lần nữa đề phòng có chuyện gì xảy ra
      e.target.value = "";
      return;
    }
    setPreviewCoverImageFile(fileFromLocal);
  };
  const handleChangeAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = e.target.files?.[0];
    if (fileFromLocal && !fileFromLocal.type.includes("image") && fileFromLocal?.type.includes("gif")) {
      toast.error(<div className="text-sm">Wrong file format, we only accept .JPEG, .PNG, .JPG file format</div>, {
        icon: (
          <ErrorToastIcon
            width={40}
            height={40}
          />
        ),
      });
      // Set lại value để có thể hiển thị lại lỗi đề phòng có chuyện gì xảy ra
      e.target.value = "";
      return;
    }
    if (fileFromLocal && fileFromLocal.size >= THREE_MEGABYTE_TO_BYTES) {
      toast.error("Your image size is too big, we only accept image size under 3MB", {
        icon: (
          <ErrorToastIcon
            width={40}
            height={40}
          />
        ),
      });
      // Set lại value để có thể chọn lại bức ảnh trước một lần nữa đề phòng có chuyện gì xảy ra
      e.target.value = "";
      return;
    }
    setPreviewAvatarFile(fileFromLocal);
  };
  return (
    <>
      <div className="flex mt-10 gap-12 justify-between">
        <ProfileLeft>
          {!me?.coverImgPath ? (
            <InputFile
              handleChangeFile={handleChangeCoverImageFile}
              handleClickOnInput={handleClickOnCoverImageInput}
              inputFileRef={coverImageInputFileRef}
              buttonClassName="w-full"
              className="w-full h-[150px]"
            >
              <CoverImageWrapper>
                <img
                  src={previewCoverImageURL || DefaultCoverImage}
                  alt=""
                  className="w-full h-full object-cover object-center"
                />
                <div className="edit-overlay z-10 flex items-center justify-center">
                  <EditAvatarIcon
                    width={36}
                    height={36}
                    color="#fff"
                  ></EditAvatarIcon>
                </div>
              </CoverImageWrapper>
            </InputFile>
          ) : (
            <InputFile
              handleChangeFile={handleChangeCoverImageFile}
              handleClickOnInput={handleClickOnCoverImageInput}
              inputFileRef={coverImageInputFileRef}
              buttonClassName="w-full"
              className="w-full h-[150px]"
            >
              <CoverImageWrapper>
                <img
                  src={me.coverImgPath}
                  alt=""
                  className="w-full h-full object-cover object-center"
                />
                <div className="edit-overlay z-10 flex items-center justify-center">
                  <EditAvatarIcon
                    width={36}
                    height={36}
                    color="#fff"
                  ></EditAvatarIcon>
                </div>
              </CoverImageWrapper>
            </InputFile>
          )}
        </ProfileLeft>
        <ProfileRight>
          <InputFile
            handleChangeFile={handleChangeAvatarFile}
            handleClickOnInput={handleClickOnAvatarInput}
            inputFileRef={avatarInputFileRef}
          >
            <AvatarWrapper className="rounded-full object-cover w-[90px] h-[90px]">
              <img
                src={previewAvatarURL || me?.avatarPath}
                alt=""
                className="rounded-full object-cover w-full h-full"
              />
              <div className="edit-overlay flex items-center justify-center">
                <EditAvatarIcon
                  width={36}
                  height={36}
                  color="#fff"
                ></EditAvatarIcon>
              </div>
            </AvatarWrapper>
          </InputFile>
          <div className="mt-4 font-semibold">{me?.fullName}</div>
          <div className="mt-4 font-medium">{me?.bio || "No bio"}</div>
        </ProfileRight>
      </div>
    </>
  );
};

export default EditProfilePage;
