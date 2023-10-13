import { TabsProps } from "antd";
import { useContext, useRef, useState } from "react";
import { useQuery } from "react-query";
import { authApi } from "src/apis/auth.apis";
import { storyApi } from "src/apis/story.apis";
import { toast } from "react-toastify";
import CustomTabs from "src/components/CustomTabs";
import EllipsisIcon from "src/components/Icon/EllipsisIcon";
import { AuthContext } from "src/contexts/auth.contexts";
import { styled } from "styled-components";
import HomepageRecentPost from "../Homepage/components/HomepageRecentPost";
import PopoverDismiss from "src/components/PopoverDismiss";
import useShareLink from "src/hooks/useShareLink";
import CopyIcon from "src/components/Icon/CopyIcon";
import EditAvatarIcon from "src/components/Icon/EditAvatarIcon";
import InputFile from "src/components/InputFile";
import ErrorToastIcon from "src/components/Icon/ToastIcon/ErrorToastIcon";
import { Link } from "react-router-dom";
import { path } from "src/constants/path";
import EmailIcon from "src/components/Icon/UserProfileIcon/EmailIcon";
import PhoneNumberIcon from "src/components/Icon/UserProfileIcon/PhoneNumberIcon";
import AddressIcon from "src/components/Icon/UserProfileIcon/AddressIcon";
import DateOfBirthIcon from "src/components/Icon/UserProfileIcon/DateOfBirthIcon";

const ProfileLeft = styled.div`
  width: calc(65% - 24px);
`;
const ProfileRight = styled.div`
  width: calc(35% - 24px);
`;

const AvatarWrapper = styled(Link)`
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

const THREE_MEGABYTE_TO_BYTES = 3 * 1024 * 1024;

const UserProfilePage = () => {
  const { userProfile } = useContext(AuthContext);
  const [previewImageFile, setPreviewImageFile] = useState<Blob>();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const { handleCopyCurrentLink } = useShareLink({});
  const profileLink = `${window.location.origin}/user/profile/${userProfile?.id as string}`;
  const { data: meData } = useQuery({
    queryKey: ["me"],
    queryFn: () => authApi.getMe(),
    refetchOnMount: true,
  });
  const me = meData?.data.data;
  const { data: userStoriesData } = useQuery({
    queryKey: ["yourStories", { userId: userProfile?.id as string }],
    queryFn: () => storyApi.getStoriesByUserId(userProfile?.id as string),
    refetchOnMount: true,
  });
  const userStories = userStoriesData?.data.data.data;
  const { data: userSavedStoriesData } = useQuery({
    queryKey: ["savedStories"],
    queryFn: () => storyApi.getFavoriteStories(),
  });
  const userSavedStories = userSavedStoriesData?.data.data.data;
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Your stories",
      children: (
        <div className="flex flex-col gap-2">
          {userStories && userStories.map((story) => <HomepageRecentPost story={story}></HomepageRecentPost>)}
          {userStories?.length === 0 && <div className="text-base">You haven't written any stories yet</div>}
        </div>
      ),
    },
    {
      key: "2",
      label: "Saved",
      children: (
        <div className="flex flex-col gap-2">
          {userSavedStories?.map((story) => <HomepageRecentPost story={story}></HomepageRecentPost>)}
          {userSavedStories?.length === 0 && <div className="text-base">No saved stories yet</div>}
        </div>
      ),
    },
  ];
  const handleClickOnInput = () => {
    inputFileRef.current?.click();
  };
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    setPreviewImageFile(fileFromLocal);
  };
  return (
    <>
      <div className="flex mt-10 gap-12 justify-between">
        <ProfileLeft>
          {me?.coverImgPath ? (
            <img
              src={me.coverImgPath}
              alt=""
              className="w-full h-[150px] mb-10 object-cover"
            />
          ) : (
            <></>
          )}
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold tracking-tighter">{me?.fullName}</h3>
            <PopoverDismiss
              offsetPx={5}
              placement="bottom-end"
              sameWidthWithChildren={false}
              renderPopover={
                <div className="shadow-niceShadowSpread">
                  <Link
                    to={path.EDIT_PROFILE}
                    className="p-2 text-normalGrey  hover:bg-black hover:bg-opacity-10 cursor-pointer flex items-center gap-2"
                  >
                    <EditAvatarIcon
                      width={24}
                      height={24}
                      color="#6b6b6b"
                    ></EditAvatarIcon>
                    <span>Edit Profile</span>
                  </Link>
                  <div
                    className="p-2 text-normalGrey  hover:bg-black hover:bg-opacity-10 cursor-pointer flex items-center gap-2"
                    onClick={() => handleCopyCurrentLink(profileLink)}
                    aria-hidden
                  >
                    <CopyIcon color="#6b6b6b"></CopyIcon>
                    <span>Share your profile link</span>
                  </div>
                </div>
              }
            >
              <EllipsisIcon className="cursor-pointer"></EllipsisIcon>
            </PopoverDismiss>
          </div>
          <div className="mt-10">
            <CustomTabs items={items}></CustomTabs>
          </div>
        </ProfileLeft>
        <ProfileRight>
          <AvatarWrapper
            to={path.EDIT_PROFILE}
            className="rounded-full object-cover block w-[90px] h-[90px]"
          >
            <img
              src={me?.avatarPath}
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

          <div className="mt-4 font-semibold">{me?.fullName}</div>
          {me?.bio ? (
            <div className="mt-1 font-medium break-words">{me.bio}</div>
          ) : (
            <div className="mt-1 font-light break-words">No bio</div>
          )}
          {me?.email && (
            <>
              <h5 className="mt-4 flex items-center gap-1 font-semibold">
                <EmailIcon
                  width={20}
                  height={20}
                  color="#6b6b6b"
                ></EmailIcon>
                <span>Email</span>
              </h5>
              <div className="mt-1 font-normal break-words">{me?.email}</div>
            </>
          )}
          <h5 className="mt-3 flex items-center gap-1 font-semibold">
            <PhoneNumberIcon
              width={18}
              height={18}
              color="#6b6b6b"
            ></PhoneNumberIcon>
            <span>Phone Number</span>
          </h5>
          {me?.phoneNumber ? (
            <div className="mt-1 font-normal break-words">{me?.phoneNumber}</div>
          ) : (
            <div className="mt-1 font-light break-words">Not updated yet</div>
          )}
          <h5 className="mt-3 flex items-center gap-1 font-semibold">
            <AddressIcon
              width={20}
              height={20}
              color="#6b6b6b"
            ></AddressIcon>
            <span>Address</span>
          </h5>
          {me?.address ? (
            <div className="mt-1 font-normal break-words">{me?.address}</div>
          ) : (
            <div className="mt-1 font-light break-words">Not updated yet</div>
          )}
          <h5 className="mt-3 flex items-center gap-1 font-semibold">
            <DateOfBirthIcon
              width={20}
              height={20}
              color="#6b6b6b"
            ></DateOfBirthIcon>
            <span>Date of birth</span>
          </h5>
          {me?.birthDay ? (
            <div className="mt-1 font-normal break-words">{me?.birthDay}</div>
          ) : (
            <div className="mt-1 font-light break-words">Not updated yet</div>
          )}
        </ProfileRight>
      </div>
    </>
  );
};

export default UserProfilePage;
