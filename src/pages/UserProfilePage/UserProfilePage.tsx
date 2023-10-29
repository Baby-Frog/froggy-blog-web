import { TabsProps } from "antd";
import { Fragment, useContext, useRef } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { authApi } from "src/apis/auth.apis";
import { storyApi } from "src/apis/story.apis";
import CustomTabs from "src/components/CustomTabs";
import CopyIcon from "src/components/Icon/CopyIcon";
import EditAvatarIcon from "src/components/Icon/EditAvatarIcon";
import EllipsisIcon from "src/components/Icon/EllipsisIcon";
import AddressIcon from "src/components/Icon/UserProfileIcon/AddressIcon";
import DateOfBirthIcon from "src/components/Icon/UserProfileIcon/DateOfBirthIcon";
import EmailIcon from "src/components/Icon/UserProfileIcon/EmailIcon";
import PhoneNumberIcon from "src/components/Icon/UserProfileIcon/PhoneNumberIcon";
import PopoverDismiss from "src/components/PopoverDismiss";
import { path } from "src/constants/path";
import { AuthContext } from "src/contexts/auth.contexts";
import useShareLink from "src/hooks/useShareLink";
import { styled } from "styled-components";
import HomepageRecentPost from "../Homepage/components/HomepageRecentPost";
import HandledImage from "src/components/HandledImage";

const ProfileLeft = styled.div`
  width: calc(65% - 24px);
`;
const ProfileRight = styled.div`
  width: calc(35% - 24px);
  height: max-content;
  position: sticky;
  top: 60px;
  right: 0;
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

const UserProfilePage = () => {
  const { userProfile } = useContext(AuthContext);
  const { handleCopyCurrentLink } = useShareLink({});
  const profileLink = `${window.location.origin}/user/profile/${userProfile?.id as string}`;
  const { data: meData } = useQuery({
    queryKey: ["me"],
    queryFn: () => authApi.getMe(),
    refetchOnMount: true,
  });
  const me = meData?.data.data;
  const {
    data: userStoriesData,
    isLoading: isUserStoriesLoading,
    fetchNextPage: userStoriesFetchNextPage,
    hasNextPage: userStoriesHasNextPage,
    isFetchingNextPage: userStoriesIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["yourStories", { userId: userProfile?.id as string }],
    queryFn: ({ pageParam = 1 }) =>
      storyApi.getStoriesByUserId(userProfile?.id as string, {
        pageSize: 5,
        pageNumber: pageParam,
        column: "publishDate",
        orderBy: "desc",
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.data.data.length === 0) return undefined;
      return lastPage.data.data.pageNumber + 1;
    },
    refetchOnMount: true,
  });
  const { data: userSavedStoriesData } = useQuery({
    queryKey: ["savedStories"],
    queryFn: () => storyApi.getFavoriteStories(),
  });
  const userSavedStories = userSavedStoriesData?.data.data.data;
  const { data: pendingStoriesData } = useQuery({
    queryKey: ["pendingStories", { userId: userProfile?.id as string }],
    queryFn: () => storyApi.getMyPendingStories(),
  });
  const pendingStories = pendingStoriesData?.data.data.data;
  console.log(pendingStories);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Your stories",
      children: (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            {userStoriesData?.pages.map((storyGroup, index) => (
              <Fragment key={index}>
                {storyGroup.data.data.data.map((story) => (
                  <HomepageRecentPost
                    key={story.id}
                    story={story}
                  ></HomepageRecentPost>
                ))}
              </Fragment>
            ))}
          </div>
          <button
            onClick={() => userStoriesFetchNextPage()}
            className="text-normalGreen my-4 cursor-pointer"
            disabled={!userStoriesHasNextPage || userStoriesIsFetchingNextPage}
          >
            {userStoriesIsFetchingNextPage ? "Loading more..." : userStoriesHasNextPage ? "Load More" : ""}
          </button>
          {/* {userStories && userStories.map((story) => <HomepageRecentPost story={story}></HomepageRecentPost>)} */}
          {/* {userStories?.length === 0 && <div className="text-base">You haven't written any stories yet</div>} */}
        </div>
      ),
    },
    {
      key: "2",
      label: "Saved",
      children: (
        <div className="flex flex-col gap-6">
          {userSavedStories?.map((story) => <HomepageRecentPost story={story}></HomepageRecentPost>)}
          {userSavedStories?.length === 0 && <div className="text-base">No saved stories yet</div>}
        </div>
      ),
    },
    {
      key: "3",
      label: pendingStories && pendingStories?.length <= 0 ? `Pending (0)` : `Pending (${pendingStories?.length})`,
      disabled: Boolean(pendingStories && pendingStories?.length <= 0),
      children: (
        <div className="flex flex-col gap-6">
          {pendingStories?.map((story) => (
            <div className="relative">
              <div className="absolute top-2 right-2 cursor-pointer bg-darkGrey bg-opacity-70 text-white rounded-full px-3 py-1 font-medium text-sm">
                Pending
              </div>
              <HomepageRecentPost story={story}></HomepageRecentPost>
            </div>
          ))}
          {pendingStories?.length === 0 && <div className="text-base">No pending stories yet</div>}
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="flex mt-10 gap-12 justify-between">
        <ProfileLeft>
          {me?.coverImgPath ? (
            <HandledImage
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
            <HandledImage
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
            <div className="mt-1 break-words">{me.bio}</div>
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
            <div className="mt-1 font-normal break-words">{new Date(me?.birthDay).toLocaleDateString("en-GB")}</div>
          ) : (
            <div className="mt-1 font-light break-words">Not updated yet</div>
          )}
          <div className="flex flex-wrap gap-x-3 gap-y-1 fixed w-[300px] bottom-8 text-lightGrey text-xs">
            <span>Help</span>
            <span>Status</span>
            <span>About</span>
            <span>Blog</span>
            <span>Privacy</span>
            <span>Terms</span>
            <span>Text to speech</span>
            <span>Teams</span>
          </div>
        </ProfileRight>
      </div>
    </>
  );
};

export default UserProfilePage;
