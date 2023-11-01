import { Pagination } from "antd";
import { debounce } from "lodash";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { adminApi } from "src/apis/admin.apis";
import { storyApi } from "src/apis/story.apis";
import ArrowLeftIcon from "src/components/Icon/ArrowLeftIcon";
import ArrowRightIcon from "src/components/Icon/ArrowRightIcon";
import useKeyboardJs from "react-use/lib/useKeyboardJs";
import EllipsisIcon from "src/components/Icon/EllipsisIcon";
import LongArrowDownIcon from "src/components/Icon/LongArrowDownIcon";
import LongArrowUpIcon from "src/components/Icon/LongArrowUpIcon";
import ShowPasswordIcon from "src/components/Icon/ShowPasswordIcon";
import TrashIcon from "src/components/Icon/TrashIcon";
import Popover from "src/components/Popover";
import SkeletonLoading from "src/components/SkeletonLoading";
import { path } from "src/constants/path";
import useStoriesQueryConfig from "src/hooks/useStoriesQueryConfig";
import Swal from "sweetalert2";
import { getDateTime, getTime } from "src/utils/formatDate";

const DashboardPendingStoriesPage = () => {
  const [isPressed] = useKeyboardJs("c + f");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const queryConfig = useStoriesQueryConfig();
  const { data: pendingStoriesData, isLoading: pendingStoriesIsLoading } = useQuery({
    queryKey: ["dashboardPendingStories", queryConfig],
    queryFn: () => adminApi.getPendingStoriesAdmin(queryConfig),
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });
  const pendingStories = pendingStoriesData?.data.data.data;
  const pendingStoriesTotal = pendingStoriesData?.data.data.totalRecord;
  const handleChangeCurrentPage = (pageNumber: number) => {
    navigate({
      pathname: path.DASHBOARD_REPORTS,
      search: createSearchParams({
        ...queryConfig,
        pageNumber: pageNumber?.toString(),
      }).toString(),
    });
  };
  const handleApproveStory = (postId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        adminApi.changeStoryStatus({ postId, status: "PUBLISHED" }).then(() => {
          queryClient.invalidateQueries({ queryKey: ["dashboardPendingStories", queryConfig] });
        });
      }
    });
  };
  const handleRejectStory = (postId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        adminApi.changeStoryStatus({ postId, status: "PENDING" }).then(() => {
          queryClient.invalidateQueries({ queryKey: ["dashboardPendingStories", queryConfig] });
        });
      }
    });
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter">Pending stories</h1>
          <h2 className="text-xl font-medium text-lightGrey">Modify stories status</h2>
        </div>
      </div>
      {pendingStoriesIsLoading && (
        <>
          <SkeletonLoading quantity={10}></SkeletonLoading>
        </>
      )}
      <div className="flex flex-col gap-5 mt-4">
        {pendingStories?.map((story) => (
          <div className="grid grid-cols-8 rounded-lg py-5 px-6 gap-5 bg-white shadow-boxShadow1 h-[166px]">
            <div className="col-span-2">
              <div className="flex gap-4">
                <div className="rounded-md w-[70px] h-[70px]">
                  <img
                    src={story.thumbnail}
                    alt=""
                  />
                </div>
                <div>
                  <div className="text-[#475BE8] font-medium uppercase leading-[22px]">#{story.id.split("-")[0]}</div>
                  <div className="font-medium text-base">{story.title}</div>
                  {/* <div className="text-sm text-lightGrey">{story.author.email}</div> */}
                  <div className="text-sm text-lightGrey">Story created on {getDateTime(story.publishDate)}</div>
                  <div className="text-sm text-lightGrey">at {getTime(story.publishDate)}</div>
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col">
                <div className="text-sm font-medium flex items-center gap-1"></div>
              </div>
            </div>
            <div className="col-span-2 self-center">
              <div className="flex items-center gap-4">
                {isPressed ? (
                  <>
                    <button
                      onClick={() => handleApproveStory(story.id)}
                      className="w-[100px] h-[46px] flex items-center justify-center rounded-3xl px-3 py-2 border border-normalGreen text-normalGreen hover:bg-normalGreen hover:text-white"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejectStory(story.id)}
                      className="w-[100px] h-[46px] flex items-center justify-center rounded-3xl px-3 py-2 border border-failure text-failure hover:bg-failure hover:text-white"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      disabled
                      className="w-[100px] opacity-70 h-[46px] flex items-center justify-center rounded-3xl px-3 py-2 border border-normalGreen text-normalGreen"
                    >
                      Approve
                    </button>
                    <button
                      disabled
                      className="w-[100px] opacity-70 h-[46px] flex items-center justify-center rounded-3xl px-3 py-2 border border-failure text-failure"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        total={pendingStoriesTotal}
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

export default DashboardPendingStoriesPage;
