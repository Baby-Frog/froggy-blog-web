import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { authApi } from "src/apis/auth.apis";
import ArrowLeftIcon from "src/components/Icon/ArrowLeftIcon";
import { styled } from "styled-components";
import { options } from "./statsConfig";
import { useMemo, useState } from "react";
import CountUp from "react-countup";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getCustomDate, getCustomDateByString } from "src/utils/formatDate";
import CustomChartTooltip from "./components/CustomChartTooltip";

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
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const StatsPage = () => {
  const [period, setPeriod] = useState<string>("30");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: chartData } = useQuery({
    queryKey: ["chart", { period }],
    queryFn: () => authApi.getChartData({ period }),
  });
  const chart = chartData?.data.data;
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
      <ResponsiveContainer
        width="100%"
        height={300}
        style={{ marginTop: "12px" }}
      >
        <ComposedChart
          width={500}
          height={200}
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
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#fff",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            }}
            itemStyle={{ color: "#1a8917" }}
            content={<CustomChartTooltip />}
          />

          <Bar
            dataKey="likes"
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
            dot={false}
            stroke="#008AB3"
          />
          <Line
            type="monotone"
            dataKey="posts"
            dot={false}
            stroke="#9999CC"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </StatsPageWrapper>
  );
};

export default StatsPage;
