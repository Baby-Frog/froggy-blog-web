import { Pagination } from "antd";
import debounce from "lodash/debounce";
import { useQuery, useQueryClient } from "react-query";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { adminApi } from "src/apis/admin.apis";
import ArrowLeftIcon from "src/components/Icon/ArrowLeftIcon";
import ArrowRightIcon from "src/components/Icon/ArrowRightIcon";
import EllipsisIcon from "src/components/Icon/EllipsisIcon";
import LongArrowDownIcon from "src/components/Icon/LongArrowDownIcon";
import LongArrowUpIcon from "src/components/Icon/LongArrowUpIcon";
import ShowPasswordIcon from "src/components/Icon/ShowPasswordIcon";
import SkeletonLoading from "src/components/SkeletonLoading";
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
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });
  const userList = userListData?.data.data.data;
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
  const handleSearch = debounce((keyword: string) => {
    navigate({
      pathname: path.DASHBOARD_USERS,
      search: createSearchParams({
        ...queryConfig,
        keyword: keyword,
      }).toString(),
    });
  }, 1000);
  const handleSort = (column: string) => {
    navigate({
      pathname: path.DASHBOARD_USERS,
      search: createSearchParams({
        ...queryConfig,
        column: column,
        orderBy: queryConfig.column === column && queryConfig.orderBy === "desc" ? "asc" : "desc",
      }).toString(),
    });
  };
  const renderSortArrow = (column: string) => {
    if (queryConfig.column === column) {
      if (queryConfig.orderBy === "asc") {
        return <LongArrowUpIcon />;
      } else {
        return <LongArrowDownIcon />;
      }
    } else {
      return <LongArrowDownIcon opacity={0.2} />;
    }
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter">Users</h1>
          <h2 className="text-xl font-medium text-lightGrey">Manage your users</h2>
        </div>
        <div className="flex items-center gap-4">
          <input
            className="w-72 h-10 px-4 rounded-md border border-gray-200 focus:outline-none"
            placeholder="Search user"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-7 mx-4 mt-4 gap-4">
        <div className="col-span-1 font-medium cursor-pointer">ID</div>
        <div className="col-span-1 font-medium cursor-pointer">Avatar</div>
        <div
          className="col-span-1 font-medium cursor-pointer flex items-center gap-1"
          onClick={() => handleSort("email")}
          aria-hidden
        >
          <span>Email</span>
          {renderSortArrow("email")}
        </div>
        <div
          className="col-span-1 font-medium cursor-pointer flex items-center gap-1"
          onClick={() => handleSort("fullName")}
          aria-hidden
        >
          <span>Fullname</span>
          {renderSortArrow("fullName")}
        </div>
        <div
          className="col-span-1 font-medium cursor-pointer flex items-center gap-1"
          onClick={() => handleSort("updateDate")}
          aria-hidden
        >
          <span>Created at</span>
          {renderSortArrow("updateDate")}
        </div>
        <div className="col-span-1 font-medium cursor-pointer">Role</div>
        <div className="col-span-1 font-medium cursor-pointer">Actions</div>
      </div>
      {userListIsLoading && (
        <>
          <SkeletonLoading quantity={10}></SkeletonLoading>
        </>
      )}
      {userList?.map((user) => (
        <div
          key={user.id}
          className="grid grid-cols-7 gap-4 mt-4 py-2 items-center px-4 rounded-md cursor-pointer bg-white shadow-boxShadow1"
          aria-hidden
        >
          <div className="col-span-1 font-medium cursor-pointer">
            {user.id.substring(0, 7) + "..." + user.id.substring(20, 27)}
          </div>
          <div className="col-span-1 font-medium cursor-pointer">
            <img
              className="w-10 h-10 rounded-full"
              src={user.avatarPath}
              alt={user.fullName}
            />
          </div>
          <div className="col-span-1 font-medium cursor-pointer line-clamp-1">{user.email}</div>
          <div className="col-span-1 font-medium cursor-pointer line-clamp-1">{user.fullName}</div>
          <div className="col-span-1 font-medium cursor-pointer line-clamp-1">
            {new Date(user?.updateDate as string).toLocaleDateString("en-GB")}
          </div>
          <div className="col-span-1 font-medium cursor-pointer line-clamp-1 uppercase">
            {user?.role[1]?.name || user.role[0].name}
          </div>
          <div className="col-span-1 font-medium cursor-pointer flex items-center gap-2">
            <Link
              to={`/user/profile/${user.id}`}
              className="flex items-center justify-center w-7 h-7 border border-gray-200 rounded cursor-pointe"
            >
              <ShowPasswordIcon
                width={20}
                height={20}
                color="#6b6b6b"
              ></ShowPasswordIcon>
            </Link>
          </div>
        </div>
      ))}
      <Pagination
        total={userListTotal}
        defaultPageSize={Number(queryConfig.pageSize)}
        jumpNextIcon={<EllipsisIcon></EllipsisIcon>}
        jumpPrevIcon={<EllipsisIcon></EllipsisIcon>}
        prevIcon={<ArrowLeftIcon></ArrowLeftIcon>}
        nextIcon={<ArrowRightIcon></ArrowRightIcon>}
        current={Number(queryConfig.pageNumber)}
        showQuickJumper
        showSizeChanger={false}
        onChange={(page) => handleChangeCurrentPage(page)}
        pageSize={Number(queryConfig.pageSize)}
        locale={{ jump_to: "Jump to page", page: "" }}
      ></Pagination>
    </>
  );
};

export default DashboardUsersPage;
