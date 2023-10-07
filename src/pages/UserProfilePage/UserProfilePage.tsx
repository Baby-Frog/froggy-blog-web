import { TabsProps } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { authApi } from "src/apis/auth.apis";
import CustomTabs from "src/components/CustomTabs";
import EllipsisIcon from "src/components/Icon/EllipsisIcon";
import { styled } from "styled-components";

const ProfileLeft = styled.div`
  flex: 6;
`;
const ProfileRight = styled.div`
  flex: 4;
`;

const tabItems = [
  {
    key: "1",
    label: "Tab 1",
    children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "Tab 2",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Tab 3",
    children: "Content of Tab Pane 3",
  },
];

const UserProfilePage = () => {
  const [tabContent, setTabContent] = useState();
  const [count, setCount] = useState(1);
  const { data: meData } = useQuery({
    queryKey: ["me"],
    queryFn: () => authApi.getMe(),
  });
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Your stories",
      children: <>{meData?.data.data.email}</>,
    },
    {
      key: "2",
      label: "About",
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
