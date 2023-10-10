import { TabsProps } from "antd";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { authApi } from "src/apis/auth.apis";
import { storyApi } from "src/apis/story.apis";
import CustomTabs from "src/components/CustomTabs";
import EllipsisIcon from "src/components/Icon/EllipsisIcon";
import { AuthContext } from "src/contexts/auth.contexts";
import { styled } from "styled-components";
import HomepageRecentPost from "../Homepage/components/HomepageRecentPost";
import PopoverDismiss from "src/components/PopoverDismiss";
import useShareLink from "src/hooks/useShareLink";
import CopyIcon from "src/components/Icon/CopyIcon";

const ProfileLeft = styled.div`
  flex: 6;
`;
const ProfileRight = styled.div`
  flex: 4;
`;

const AvatarWrapper = styled.div`
  position: relative;
  &::after {
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
  &:hover::after {
    display: block;
  }
`;

const UserProfilePage = () => {
  const { userProfile } = useContext(AuthContext);
  const { handleCopyCurrentLink } = useShareLink({});
  const profileLink = `${window.location.origin}/user/profile/${userProfile?.id as string}`;
  const { data: meData } = useQuery({
    queryKey: ["me"],
    queryFn: () => authApi.getMe(),
    refetchOnMount: true,
  });
  const { data: userStoriesData } = useQuery({
    queryKey: ["stories", { userId: userProfile?.id as string }],
    queryFn: () => storyApi.getStoriesByUserId(userProfile?.id as string),
    refetchOnMount: true,
  });
  const { data: userSavedStoriesData } = useQuery({
    queryKey: ["savedStories"],
    queryFn: () => storyApi.getFavoriteStories(),
  });
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Your stories",
      children: (
        <>
          {userStoriesData?.data.data.data &&
            userStoriesData.data.data.data.map((story) => <HomepageRecentPost story={story}></HomepageRecentPost>)}
          {userStoriesData?.data.data.data.length === 0 && (
            <div className="text-base">You haven't written any stories yet</div>
          )}
        </>
      ),
    },
    {
      key: "2",
      label: "Saved",
      children: (
        <>
          {userSavedStoriesData?.data.data.data.map((story) => <HomepageRecentPost story={story}></HomepageRecentPost>)}
          {userSavedStoriesData?.data.data.data.length === 0 && <div className="text-base">No saved stories yet</div>}
        </>
      ),
    },
  ];
  return (
    <>
      <div className="flex mt-10 gap-12 justify-between">
        <ProfileLeft>
          {meData?.data.data.coverImgPath ? (
            <img
              src={meData?.data.data.coverImgPath}
              alt=""
              className="w-full h-[150px] mb-10 object-cover"
            />
          ) : (
            <></>
          )}
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold tracking-tighter">{meData?.data.data.fullName}</h3>
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
          <AvatarWrapper className="rounded-full object-cover w-[90px] h-[90px]">
            <img
              src={meData?.data.data.avatarPath}
              alt=""
              className="rounded-full object-cover w-full h-full"
            />
          </AvatarWrapper>
          <div className="mt-4 font-semibold">{meData?.data.data.fullName}</div>
          <div className="mt-4 font-medium">{meData?.data.data.bio || "No bio"}</div>
        </ProfileRight>
      </div>
    </>
  );
};

export default UserProfilePage;
