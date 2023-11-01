import { Pagination, PaginationProps } from "antd";
import { debounce } from "lodash";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useKeyboardJs from "react-use/lib/useKeyboardJs";
import { adminApi } from "src/apis/admin.apis";
import ArrowLeftIcon from "src/components/Icon/ArrowLeftIcon";
import ArrowRightIcon from "src/components/Icon/ArrowRightIcon";
import EditIcon from "src/components/Icon/EditIcon";
import EllipsisIcon from "src/components/Icon/EllipsisIcon";
import LongArrowDownIcon from "src/components/Icon/LongArrowDownIcon";
import LongArrowUpIcon from "src/components/Icon/LongArrowUpIcon";
import SearchIcon from "src/components/Icon/SearchIcon";
import ShowPasswordIcon from "src/components/Icon/ShowPasswordIcon";
import TrashIcon from "src/components/Icon/TrashIcon";
import Popover from "src/components/Popover";
import SkeletonLoading from "src/components/SkeletonLoading";
import { path } from "src/constants/path";
import useAdminQueryConfig from "src/hooks/useAdminQueryConfig";
import Swal from "sweetalert2";

type TDashboardUsersPageProps = {
  something: string;
};

const DashboardTopicsPage = () => {
  const navigate = useNavigate();
  const [isPressed] = useKeyboardJs("c + f");
  const queryClient = useQueryClient();
  const queryConfig = useAdminQueryConfig();
  const { data: topicListData, isLoading: topicListIsLoading } = useQuery({
    queryKey: ["dashboardTopics", queryConfig],
    queryFn: () => adminApi.searchTopicsAdmin(queryConfig),
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
    refetchOnMount: false,
  });
  const deleteTopicMutation = useMutation({
    mutationFn: adminApi.deleteTopic,
  });
  const topicList = topicListData?.data.data.data;
  const topicListTotal = topicListData?.data.data.totalRecord;
  const handleChangeCurrentPage = (pageNumber: number) => {
    navigate({
      pathname: path.DASHBOARD_TOPICS,
      search: createSearchParams({
        ...queryConfig,
        pageNumber: pageNumber?.toString(),
      }).toString(),
    });
  };
  const handleSearch = debounce((keyword: string) => {
    navigate({
      pathname: path.DASHBOARD_TOPICS,
      search: createSearchParams({
        ...queryConfig,
        keyword: keyword,
      }).toString(),
    });
  }, 1000);
  const handleSort = (column: string) => {
    navigate({
      pathname: path.DASHBOARD_TOPICS,
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

  const handleDeleteTopic = async (topicId: string) => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this story?",
      icon: "question",
      cancelButtonColor: "#EB5757",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (isConfirmed) {
      deleteTopicMutation.mutate(topicId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["dashboardTopics", queryConfig] });
          toast.success("Delete topic successfully");
        },
        onError: () => {
          toast.error("Delete topic failed");
        },
      });
    }
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter">Topics</h1>
          <h2 className="text-xl font-medium text-lightGrey">Manage your topics</h2>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to={path.DASHBOARD_CREATE_TOPIC}
            className="flex items-center justify-center px-3 py-2 bg-normalGreen hover:!bg-normalGreenHover text-white hover:!text-white"
          >
            + Create topics
          </Link>
          <input
            className="w-72 h-10 px-4 rounded-md border border-gray-200 focus:outline-none"
            placeholder="Search topics"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-6 mx-4 mt-4 gap-4">
        <div className="col-span-1 font-medium cursor-pointer">ID</div>
        <div
          className="col-span-1 font-medium cursor-pointer flex items-center gap-1"
          onClick={() => handleSort("topicName")}
          aria-hidden
        >
          <span>Topic Name</span>
          {renderSortArrow("topicName")}
        </div>
        <div
          className="col-span-1 font-medium cursor-pointer flex items-center gap-1"
          onClick={() => handleSort("topicCode")}
          aria-hidden
        >
          <span>Topic Code</span>
          {renderSortArrow("topicCode")}
        </div>
        <div
          className="col-span-1 font-medium cursor-pointer flex items-center gap-1"
          onClick={() => handleSort("createDate")}
          aria-hidden
        >
          <span>Created at</span>
          {renderSortArrow("createDate")}
        </div>
        <div
          className="col-span-1 font-medium cursor-pointer flex items-center gap-1"
          onClick={() => handleSort("updateDate")}
          aria-hidden
        >
          <span>Updated at</span>
          {renderSortArrow("updateDate")}
        </div>
        <div className="col-span-1 font-medium cursor-pointer">Actions</div>
      </div>
      {topicListIsLoading && (
        <>
          <SkeletonLoading quantity={10}></SkeletonLoading>
        </>
      )}
      {topicList?.map((topic) => (
        <div
          key={topic.id}
          className="grid grid-cols-6 gap-4 mt-4 py-2 items-center px-4 rounded-md cursor-pointer bg-white shadow-boxShadow1"
          aria-hidden
        >
          <div className="col-span-1 font-medium cursor-pointer">
            {topic.id.substring(0, 7) + "..." + topic.id.substring(20, 27)}
          </div>
          <div className="col-span-1 font-medium cursor-pointer line-clamp-1">{topic.topicName}</div>
          <div className="col-span-1 font-medium cursor-pointer line-clamp-1">{topic.topicCode}</div>
          <div className="col-span-1 font-medium cursor-pointer line-clamp-1">
            {new Date(topic?.updateDate as string).toLocaleDateString("en-GB")}
          </div>
          <div className="col-span-1 font-medium cursor-pointer line-clamp-1 uppercase">
            {topic.updateDate ? (
              new Date(topic?.updateDate as string).toLocaleDateString("en-GB")
            ) : (
              <span className="italic capitalize text-xs">Not updated yet</span>
            )}
          </div>
          <div className="col-span-1 font-medium cursor-pointer flex items-center gap-2">
            <button className="flex items-center justify-center w-7 h-7 border border-gray-200 rounded cursor-pointe">
              <EditIcon
                width={20}
                height={20}
                color="#6b6b6b"
              ></EditIcon>
            </button>
            <Popover
              sameWidthWithChildren={false}
              placement="bottom"
              renderPopover={
                <div
                  className={`bg-black bg-opacity-60 p-2 max-w-[200px] text-center flex items-center justify-center text-white ${
                    isPressed && "opacity-0 hidden"
                  }`}
                >
                  You must hold c + f in order to press this button
                </div>
              }
            >
              {isPressed ? (
                <button
                  className="flex items-center justify-center w-7 h-7 border border-gray-200 rounded cursor-pointer"
                  onClick={() => handleDeleteTopic(topic.id)}
                >
                  <TrashIcon
                    width={20}
                    height={20}
                    color="#6b6b6b"
                  ></TrashIcon>
                </button>
              ) : (
                <button
                  className="flex items-center justify-center w-7 h-7 border border-gray-200 opacity-50 rounded cursor-pointer"
                  disabled
                >
                  <TrashIcon
                    width={20}
                    height={20}
                    color="#6b6b6b"
                  ></TrashIcon>
                </button>
              )}
            </Popover>
          </div>
        </div>
      ))}
      <Pagination
        total={topicListTotal}
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

export default DashboardTopicsPage;
