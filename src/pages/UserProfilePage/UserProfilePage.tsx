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

const ProfileLeft = styled.div`
  flex: 6;
`;
const ProfileRight = styled.div`
  flex: 4;
`;

const UserProfilePage = () => {
  const [count, setCount] = useState(1);
  const { userProfile } = useContext(AuthContext);
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
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Your stories",
      children: (
        <>
          {userStoriesData?.data.data.data &&
            userStoriesData.data.data.data.map((story) => <HomepageRecentPost story={story}></HomepageRecentPost>)}
          {!userStoriesData?.data.data.data && userStoriesData?.data.data.data.length === 0 && <div>No stories</div>}
        </>
      ),
    },
    {
      key: "2",
      label: "Saved",
      children: (
        <div
          onClick={() => setCount(count + 1)}
          aria-hidden
        >
          {count}
        </div>
      ),
    },
  ];
  return (
    <div className="flex mt-10 gap-12 justify-between">
      <ProfileLeft>
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-bold">{meData?.data.data.fullName}</h3>
          <EllipsisIcon></EllipsisIcon>
        </div>
        <div className="mt-10">
          <CustomTabs items={items}></CustomTabs>
        </div>
      </ProfileLeft>
      <ProfileRight>
        <div className="rounded-full object-cover w-[90px] h-[90px]">
          <img
            src={meData?.data.data.avatarPath}
            alt=""
            className="rounded-full object-cover w-full h-full"
          />
        </div>
        <div className="mt-4 font-semibold">{meData?.data.data.fullName}</div>
        <div className="mt-4 font-medium">{meData?.data.data.bio || "No bio"}</div>
      </ProfileRight>
    </div>
  );
};

export default UserProfilePage;
