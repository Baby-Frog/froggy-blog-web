import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { path } from "src/constants/path";
import Sidebar from "./components/Sidebar";
import OverviewCard from "./components/OverviewCard";
import { styled } from "styled-components";
import DashboardTopicIcon from "src/components/Icon/DashboardIcon/DashboardTopicIcon";
import { useQuery } from "react-query";
import { chartApi } from "src/apis/chart.api";
import { adminApi } from "src/apis/admin.apis";
import DashboardUserIcon from "src/components/Icon/DashboardIcon/DashboardUserIcon";
import DashboardWriteIcon from "src/components/Icon/DashboardIcon/DashboardWriteIcon";
import DashboardAccountIcon from "src/components/Icon/DashboardIcon/DashboardAccountIcon";
import { Bar, BarChart, CartesianGrid, Rectangle, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { getCustomDate, getCustomDateByString } from "src/utils/formatDate";
import CustomChartTooltip from "./components/CustomChartTooltip";
import { storyApi } from "src/apis/story.apis";
import HandledImage from "src/components/HandledImage";

type TDashboardPageProps = {
  something: string;
};

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Overview = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

const DashboardPage = () => {
  const [period, setPeriod] = useState<string>("7");
  const { data: dashboardChartData } = useQuery({
    queryKey: ["mainDashboardChart", { period }],
    queryFn: () => chartApi.getDashboardChartData({ period: "7" }),
  });
  const dashboardChart = dashboardChartData?.data.data;
  const { data: todayData } = useQuery({
    queryKey: ["dashboardChart", { period: "1" }],
    queryFn: () => chartApi.getDashboardChartData({ period: "1" }),
  });
  const today = todayData?.data.data;
  const { data: dashboardTotalData } = useQuery({
    queryKey: ["dashboardTotal"],
    queryFn: () => adminApi.getDashboardOverview(),
  });
  const dashboardTotal = dashboardTotalData?.data.data;
  const { data: trendingStoriesData } = useQuery({
    queryKey: ["trendingStories"],
    queryFn: () => storyApi.getTrendingStories(),
  });
  const trendingStories = trendingStoriesData?.data.data;
  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <div className="w-[85%] bg-white p-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Overview>
          <OverviewCard
            title="Total stories"
            value={dashboardTotal?.posts}
            icon={
              <DashboardTopicIcon
                color="#475BE8"
                width={50}
                height={50}
              ></DashboardTopicIcon>
            }
          ></OverviewCard>
          <OverviewCard
            title="Accounts created"
            value={dashboardTotal?.accounts}
            icon={
              <DashboardUserIcon
                width={50}
                height={50}
                color="#FD8539"
              ></DashboardUserIcon>
            }
          ></OverviewCard>
          <OverviewCard
            title="Stories written today"
            value={today?.[0]?.posts as number}
            icon={
              <DashboardWriteIcon
                width={50}
                height={50}
                color="#2ED480"
              ></DashboardWriteIcon>
            }
          ></OverviewCard>
          <OverviewCard
            title="Accounts created today"
            value={today?.[0]?.accounts as number}
            icon={
              <DashboardAccountIcon
                width={50}
                height={50}
                color="#FE6D8E"
              ></DashboardAccountIcon>
            }
          ></OverviewCard>
        </Overview>
        <div className="grid grid-cols-5 mt-6 gap-6">
          <div className="col-span-3">
            <h3 className="text-2xl font-bold">Overview</h3>
            <ResponsiveContainer
              width="100%"
              height={300}
              style={{
                marginTop: "24px",
              }}
            >
              <BarChart
                data={dashboardChart}
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
                <Legend />
                <YAxis
                  width={45}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  itemStyle={{ color: "#1a8917" }}
                  content={<CustomChartTooltip />}
                />
                <Bar
                  dataKey="posts"
                  name="Stories"
                  fill="#B5E5A4"
                  stroke="#45B153"
                  minPointSize={10}
                  activeBar={
                    <Rectangle
                      fill="#B5E5A4"
                      stroke="#45B153"
                    />
                  }
                />
                <Bar
                  dataKey="accounts"
                  name="Accounts"
                  fill="#8fbbc8"
                  stroke="#008AB3"
                  minPointSize={10}
                  activeBar={
                    <Rectangle
                      fill="#B5E5A4"
                      stroke="#45B153"
                    />
                  }
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="col-span-2">
            <h2 className="text-2xl font-bold">Trending stories</h2>
            <div className="flex flex-col gap-2 mt-2">
              {trendingStories?.slice(0, 4).map((story) => (
                <Link
                  to={"/"}
                  key={story.id}
                  className="block"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full overflow-hidden">
                      <HandledImage
                        src={story.author.avatarPath}
                        alt={story.author.fullName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs font-semibold">{story.author.fullName}</span>
                  </div>
                  <h5 className="font-bold mt-1 text-[16px] leading-5 tracking-tighter">{story.title}</h5>
                  <span className="flex text-xs mt-[6px] items-center gap-2">
                    <span>{getCustomDate(new Date(story.publishDate))}</span>
                    <span>•</span>
                    <span>{story.timeRead} read</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
