import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { authApi } from "src/apis/auth.apis";
import ArrowLeftIcon from "src/components/Icon/ArrowLeftIcon";
import { styled } from "styled-components";
import { options } from "./statsConfig";
import { useContext, useMemo, useState } from "react";
import CountUp from "react-countup";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getCustomDate, getCustomDateByString } from "src/utils/formatDate";
import CustomChartTooltip from "./components/CustomChartTooltip";
import { TabsProps } from "antd";
import CustomTabs from "src/components/CustomTabs";
import { storyApi } from "src/apis/story.apis";
import { AuthContext } from "src/contexts/auth.contexts";
import Footer from "src/components/Footer";
import LongArrowDownIcon from "src/components/Icon/LongArrowDownIcon";
import { chartApi } from "src/apis/chart.api";

type TChartValue = {
  date: string;
  likes: number;
  posts: number;
  comments: number;
};

const StatsPageWrapper = styled.div`
  padding-top: 32px;
`;

const StatsGoBack = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.darkGrey};
  color: ${(props) => props.theme.colors.darkGrey};
  padding: 4px 12px 4px 6px;
  border-radius: 100rem;
  font-weight: 400;
  transition: all 150ms ease-in-out;
  &:hover {
    background-color: ${(props) => props.theme.colors.darkGrey};
    color: white;
  }
`;

const StatsModifier = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
`;

const StatsHeading = styled.h1`
  font-size: 32px;
  font-weight: 600;
`;

const StatsDescription = styled.div`
  padding-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: 16px;
    color: ${(props) => props.theme.colors.lightGrey};
  }
  span {
    font-size: 14px;
    color: ${(props) => props.theme.colors.lightGrey};
  }
`;

const StatsOverview = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatsActivities = styled.div`
  padding-top: 28px;
`;

const StatsPage = () => {
  const { userProfile } = useContext(AuthContext);
  const [period, setPeriod] = useState<string>("30");
  const [currentOrder, setCurrentOrder] = useState<"desc" | "asc">("desc");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: chartData } = useQuery({
    queryKey: ["chart", { period }],
    queryFn: () => chartApi.getChartData({ period }),
  });
  const chart = chartData?.data.data;
  const { data: userStoriesData, isLoading: userStoriesIsLoading } = useQuery({
    queryKey: ["userStories", { orderBy: currentOrder }],
    queryFn: () =>
      storyApi.getStoriesByUserId(userProfile?.id as string, {
        pageSize: 99,
        pageNumber: 1,
        column: "publishDate",
        orderBy: currentOrder,
      }),
    staleTime: 1000 * 60 * 5,
  });
  const userStories = userStoriesData?.data.data.data;
  const totalLikes = useMemo(() => {
    const calculated = chart?.reduce((acc: number, cur: TChartValue) => {
      return acc + cur.likes;
    }, 0);
    return calculated;
  }, [chart]);
  const totalStories = useMemo(() => {
    const calculated = chart?.reduce((acc: number, cur: TChartValue) => {
      return acc + cur.posts;
    }, 0);
    return calculated;
  }, [chart]);
  const handleSortByDate = () => {
    setCurrentOrder(currentOrder === "desc" ? "asc" : "desc");
    queryClient.invalidateQueries({ queryKey: ["userStories", { orderBy: currentOrder }] });
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Stories",
      children: (
        <div>
          <div className="py-3 px-6 bg-darkGrey text-white">
            Responses tab is temporarily disabled, but it will be released later in the nearest future
          </div>
          <div className="mt-4 grid grid-cols-5">
            <div
              className="col-span-3 cursor-pointer flex items-center gap-1"
              onClick={handleSortByDate}
              aria-hidden
            >
              <span className="text-xl font-semibold">Date</span>
              <span className="text-sm font-semibold">
                {currentOrder === "desc" ? (
                  <LongArrowDownIcon></LongArrowDownIcon>
                ) : (
                  <LongArrowDownIcon
                    style={{
                      transform: "rotate(180deg)",
                    }}
                  ></LongArrowDownIcon>
                )}
              </span>
            </div>
            <div className="col-span-1 text-center text-xl font-semibold">Claps</div>
            <div className="col-span-1 text-center text-xl font-semibold">Responses</div>
          </div>
          {userStoriesIsLoading ? (
            <div
              role="status"
              className="max-w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-5 items-end">
              {userStories?.map((story) => (
                <>
                  <div className="col-span-3 cursor-pointer flex flex-col">
                    <span className="text-[18px] font-medium">{story.title}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-lightGrey">{story.timeRead} read</span>
                      <span>•</span>
                      <span className="text-sm text-lightGrey">{getCustomDate(new Date(story.publishDate))}</span>
                    </div>
                  </div>
                  <div className="col-span-1 text-center text-[18px] font-semibold">{story.likes}</div>
                  <div className="col-span-1 text-center text-[18px] font-semibold">{story.comments}</div>
                </>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: "Responses",
      disabled: true,
      children: <>HEY! How did you get here, get back now</>,
    },
  ];
  const totalComments = useMemo(() => {
    const calculated = chart?.reduce((acc: number, cur: TChartValue) => {
      return acc + cur.comments;
    }, 0);
    return calculated;
  }, [chart]);
  const handleNavigateToPreviousPage = () => {
    navigate(-1);
  };
  return (
    <StatsPageWrapper>
      <StatsGoBack onClick={handleNavigateToPreviousPage}>
        <ArrowLeftIcon
          width={20}
          height={20}
        ></ArrowLeftIcon>
        <span>Go back</span>
      </StatsGoBack>
      <StatsModifier>
        <StatsHeading>Your story stats</StatsHeading>
        <Select
          className="period-filter"
          classNamePrefix="period"
          isSearchable={false}
          name="period"
          value={options.find((option) => option.value === period)}
          onChange={(option) => {
            setPeriod(option?.value as string);
            queryClient.invalidateQueries({ queryKey: ["chart", { period: option?.value }] });
          }}
          options={options}
        />
      </StatsModifier>
      <StatsDescription>
        <p>Here's the overview of your story's performance.</p>
        <span>Updated {period !== "1" ? `${period} days ago` : "today"}</span>
      </StatsDescription>
      <StatsOverview>
        <div className="flex flex-col">
          <span className="text-3xl font-semibold">
            <CountUp
              duration={2}
              end={totalLikes || 0}
            />
          </span>
          <span className="text-darkGrey text-lg font-medium">
            Likes ({period !== "1" ? `${period} days` : "Today"})
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-semibold">
            <CountUp
              duration={2}
              end={totalComments || 0}
            />
          </span>
          <span className="text-darkGrey text-lg font-medium">
            Comments ({period !== "1" ? `${period} days` : "Today"})
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-semibold">
            <CountUp
              duration={2}
              end={totalStories || 0}
            />
          </span>
          <span className="text-darkGrey text-lg font-medium">
            Stories ({period !== "1" ? `${period} days` : "Today"})
          </span>
        </div>
      </StatsOverview>
      {chart && chart?.length > 0 && (
        <ResponsiveContainer
          width="100%"
          height={300}
          style={{ marginTop: "12px" }}
        >
          <ComposedChart
            data={chart}
            margin={{
              left: -20,
              top: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="date"
              tickFormatter={getCustomDateByString}
              tickLine={false}
            />
            <YAxis
              width={45}
              tickLine={false}
            />
            <Tooltip
              itemStyle={{ color: "#1a8917" }}
              content={<CustomChartTooltip />}
            />
            <Legend />
            <Bar
              dataKey="posts"
              name="Stories"
              fill="#B5E5A4"
              stroke="#45B153"
              activeBar={
                <Rectangle
                  fill="#B5E5A4"
                  stroke="#45B153"
                />
              }
            />
            <Line
              type="monotone"
              dataKey="comments"
              name="Comments"
              dot={false}
              stroke="#008AB3"
            />
            <Line
              type="monotone"
              dataKey="likes"
              name="Likes"
              dot={false}
              stroke="#9999CC"
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
      <StatsActivities>
        <CustomTabs items={items}></CustomTabs>
      </StatsActivities>
    </StatsPageWrapper>
  );
};

export default StatsPage;
