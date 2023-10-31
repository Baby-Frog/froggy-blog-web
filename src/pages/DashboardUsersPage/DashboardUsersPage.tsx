import { Pagination } from "antd";
import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { createSearchParams, useNavigate } from "react-router-dom";
import { adminApi } from "src/apis/admin.apis";
import ArrowLeftIcon from "src/components/Icon/ArrowLeftIcon";
import ArrowRightIcon from "src/components/Icon/ArrowRightIcon";
import EllipsisIcon from "src/components/Icon/EllipsisIcon";
import { path } from "src/constants/path";
import useAdminQueryConfig from "src/hooks/useAdminQueryConfig";

type TDashboardUsersPageProps = {
  something: string;
};

const DashboardUsersPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const queryConfig = useAdminQueryConfig();
  const { data: userListData, isLoading: userListIsLoading } = useQuery({
    queryKey: ["dashboardUsers", queryConfig],
    queryFn: () => adminApi.searchUserAdmin(queryConfig),
    keepPreviousData: true,
  });
  console.log(queryConfig);
  const userListTotal = userListData?.data.data.totalRecord;
  const handleChangeCurrentPage = (pageNumber: number) => {
    navigate({
      pathname: path.DASHBOARD_USERS,
      search: createSearchParams({
        ...queryConfig,
        pageNumber: pageNumber?.toString(),
      }).toString(),
    });
  };
  return (
    <>
      <h1 className="text-3xl font-bold">Users List</h1>
      
      <Pagination
        total={userListTotal}
        jumpNextIcon={<EllipsisIcon></EllipsisIcon>}
        jumpPrevIcon={<EllipsisIcon></EllipsisIcon>}
        prevIcon={<ArrowLeftIcon></ArrowLeftIcon>}
        nextIcon={<ArrowRightIcon></ArrowRightIcon>}
        current={Number(queryConfig.pageNumber)}
        onChange={(page) => handleChangeCurrentPage(page)}
        showSizeChanger={false}
        pageSize={Number(queryConfig.pageSize)}
      ></Pagination>
    </>
  );
};

export default DashboardUsersPage;
