import { TabsProps } from "antd";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { authApi } from "src/apis/auth.apis";
import { storyApi } from "src/apis/story.apis";
import CustomTabs from "src/components/CustomTabs";
import CopyIcon from "src/components/Icon/CopyIcon";
import EllipsisIcon from "src/components/Icon/EllipsisIcon";
import PopoverDismiss from "src/components/PopoverDismiss";
import useShareLink from "src/hooks/useShareLink";
import { styled } from "styled-components";
import HomepageRecentPost from "../Homepage/components/HomepageRecentPost";
import { path } from "src/constants/path";
import PhoneNumberIcon from "src/components/Icon/UserProfileIcon/PhoneNumberIcon";
import AddressIcon from "src/components/Icon/UserProfileIcon/AddressIcon";
import DateOfBirthIcon from "src/components/Icon/UserProfileIcon/DateOfBirthIcon";
import { useContext, useEffect, useLayoutEffect } from "react";
import { AuthContext } from "src/contexts/auth.contexts";
const ProfileLeft = styled.div`
  width: calc(65% - 24px);
`;
const ProfileRight = styled.div`
  width: calc(35% - 24px);
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
const AnonymousUserProfilePage = () => {
  const { userId } = useParams();
  const { userProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const profileLink = `${window.location.origin}/user/profile/${userId}`;
  const { handleCopyCurrentLink } = useShareLink({});
  const { data: userData } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => authApi.getAnonymousProfile(userId as string),
  });
  const { data: userStoriesData } = useQuery({
    queryKey: ["yourStories", { userId: userId as string }],
    queryFn: () => storyApi.getStoriesByUserId(userId as string),
    refetchOnMount: true,
  });
  const userStories = userStoriesData?.data.data.data;
  const user = userData?.data.data;
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Stories",
      children: (
        <div className="flex flex-col gap-6">
          {userStories && userStories.map((story) => <HomepageRecentPost story={story}></HomepageRecentPost>)}
          {userStories?.length === 0 && <div className="text-base">No stories yet</div>}
        </div>
      ),
    },
  ];
  // useLayoutEffect(() => {
  //   if (userProfile?.id === userId) {
  //     navigate(path.PROFILE);
  //   }
  // }, [navigate, userId, userProfile?.id]);
  return (
    <div className="flex mt-10 gap-12 justify-between">
      <ProfileLeft>
        {user?.coverImgPath ? (
          <img
            src={user.coverImgPath}
            alt=""
            className="w-full h-[150px] mb-10 object-cover"
          />
        ) : (
          <></>
        )}
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-bold tracking-tighter">{user?.fullName}</h3>
          <PopoverDismiss
            offsetPx={5}
            placement="bottom-end"
            sameWidthWithChildren={false}
            renderPopover={
              <div className="shadow-niceShadowSpread">
                <div
                  className="p-2 text-normalGrey  hover:bg-black hover:bg-opacity-10 cursor-pointer flex items-center gap-2"
                  onClick={() => handleCopyCurrentLink(profileLink)}
                  aria-hidden
                >
                  <CopyIcon color="#6b6b6b"></CopyIcon>
                  <span>Share this profile link</span>
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
        <AvatarWrapper className="rounded-full object-cover block w-[90px] h-[90px]">
          <img
            src={user?.avatarPath}
            alt=""
            className="rounded-full object-cover w-full h-full"
          />
        </AvatarWrapper>

        <div className="mt-4 font-semibold">{user?.fullName}</div>
        {user?.bio ? (
          <div className="mt-1 break-words">{user.bio}</div>
        ) : (
          <div className="mt-1 font-light break-words">No bio</div>
        )}

        <h5 className="mt-3 flex items-center gap-1 font-semibold">
          <PhoneNumberIcon
            width={18}
            height={18}
            color="#6b6b6b"
          ></PhoneNumberIcon>
          <span>Phone Number</span>
        </h5>
        {user?.phoneNumber ? (
          <div className="mt-1 font-normal break-words">{user?.phoneNumber}</div>
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
        {user?.address ? (
          <div className="mt-1 font-normal break-words">{user?.address}</div>
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
        {user?.birthDay ? (
          <div className="mt-1 font-normal break-words">{new Date(user?.birthDay).toLocaleDateString("en-GB")}</div>
        ) : (
          <div className="mt-1 font-light break-words">Not updated yet</div>
        )}
      </ProfileRight>
    </div>
  );
};

export default AnonymousUserProfilePage;
