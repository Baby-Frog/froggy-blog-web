import { Pagination } from "antd";
import { debounce } from "lodash";
import { useQuery, useQueryClient } from "react-query";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { adminApi } from "src/apis/admin.apis";
import ArrowLeftIcon from "src/components/Icon/ArrowLeftIcon";
import ArrowRightIcon from "src/components/Icon/ArrowRightIcon";
import EllipsisIcon from "src/components/Icon/EllipsisIcon";
import SkeletonLoading from "src/components/SkeletonLoading";
import { path } from "src/constants/path";
import useStoriesQueryConfig from "src/hooks/useStoriesQueryConfig";
import { getDateTime, getTime } from "src/utils/formatDate";

const DashboardUsersPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const queryConfig = useStoriesQueryConfig();
  const { data: reportListData, isLoading: reportListIsLoading } = useQuery({
    queryKey: ["dashboardReports"],
    queryFn: () => adminApi.searchReports(),
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });
  const reportList = reportListData?.data.data.data;
  const reportListTotal = reportListData?.data.data.totalRecord;
  const handleChangeCurrentPage = (pageNumber: number) => {
    navigate({
      pathname: path.DASHBOARD_REPORTS,
      search: createSearchParams({
        ...queryConfig,
        pageNumber: pageNumber?.toString(),
      }).toString(),
    });
  };
  const handleSearch = debounce((keyword: string) => {
    navigate({
      pathname: path.DASHBOARD_REPORTS,
      search: createSearchParams({
        ...queryConfig,
        keyword: keyword,
      }).toString(),
    });
  }, 1000);
  const handleSort = (column: string) => {
    navigate({
      pathname: path.DASHBOARD_REPORTS,
      search: createSearchParams({
        ...queryConfig,
        column: column,
        orderBy: queryConfig.column === column && queryConfig.orderBy === "desc" ? "asc" : "desc",
      }).toString(),
    });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter">Reports</h1>
          <h2 className="text-xl font-medium text-lightGrey">Check out these reports</h2>
        </div>
      </div>
      {reportListIsLoading && (
        <>
          <SkeletonLoading quantity={10}></SkeletonLoading>
        </>
      )}
      <div className="flex flex-col gap-5">
        {reportList?.map((report) => (
          <div className="grid grid-cols-8 rounded-lg py-5 px-6 gap-5 bg-white shadow-boxShadow1 h-[166px]">
            <div className="col-span-2">
              <div className="flex gap-4">
                <div className="rounded-md w-[70px] h-[70px]">
                  <img
                    src={report.userDto.avatarPath}
                    alt=""
                  />
                </div>
                <div>
                  <div className="text-[#475BE8] font-medium uppercase leading-[22px]">#{report.id.split("-")[0]}</div>
                  <div className="font-medium text-base">{report.userDto.fullName}</div>
                  <div className="text-sm text-lightGrey">{report.userDto.email}</div>
                  <div className="text-sm text-lightGrey">Report created on {getDateTime(report.createDate)}</div>
                  <div className="text-sm text-lightGrey">at {getTime(report.createDate)}</div>
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col">
                <div className="text-sm font-medium flex items-center gap-1">
                  <Link
                    to={`/user/profile/${report.comment.profileDto.id}`}
                    className="text-normalGreen flex items-center gap-2"
                  >
                    <img
                      src={report.comment.profileDto.avatarPath}
                      alt=""
                      className="rounded-full w-6 h-6 object-cover"
                    />
                    <span>{report.comment.profileDto.fullName}</span>
                  </Link>
                  <span className="text-sm font-medium"> commented:</span>
                </div>
                <div
                  className="text-sm font-medium line-clamp-4"
                  title={report.comment.content}
                >
                  {report.comment.content}
                </div>
                <div className="text-sm text-lightGrey">Report Reason: {report.reason}</div>
              </div>
            </div>
            <div className="col-span-2 self-center">
              <div className="flex items-center gap-4">
                <button className="w-[100px] h-[46px] flex items-center justify-center rounded-3xl px-3 py-2 border border-failure text-failure">
                  Reject
                </button>
                <button className="w-[100px] h-[46px] flex items-center justify-center rounded-3xl px-3 py-2 border border-normalGreen text-normalGreen">
                  Approve
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        total={reportListTotal}
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
