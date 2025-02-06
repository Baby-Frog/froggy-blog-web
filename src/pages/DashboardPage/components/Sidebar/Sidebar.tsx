import { NavLink } from "react-router-dom";
import DashboardOverviewIcon from "src/components/Icon/DashboardIcon/DashboardOverviewIcon";
import DashboardReportIcon from "src/components/Icon/DashboardIcon/DashboardReportIcon";
import DashboardStoryIcon from "src/components/Icon/DashboardIcon/DashboardStoryIcon";
import DashboardTopicIcon from "src/components/Icon/DashboardIcon/DashboardTopicIcon";
import DashboardUserIcon from "src/components/Icon/DashboardIcon/DashboardUserIcon";
import { path } from "src/constants/path";

type TSidebarProps = {
  something: string;
};

const Sidebar = () => {
  return (
    <div className="w-[15%] bg-white border-r-2 border-r-slate-300 min-h-screen">
      <ul>
        <li>
          <NavLink
            to={path.DASHBOARD}
            className={({ isActive, isPending }) =>
              `font-medium p-4 hover:text-darkGrey flex items-center gap-2 ${
                isPending
                  ? "text-gray-600 font-medium block p-4"
                  : isActive
                    ? "text-normalGreen bg-normalGreen bg-opacity-20 hover:!text-normalGreenHover"
                    : ""
              }`
            }
          >
            <DashboardOverviewIcon
              width={24}
              height={24}
            ></DashboardOverviewIcon>
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={path.DASHBOARD_TOPICS}
            className={({ isActive, isPending }) =>
              `font-medium p-4 hover:text-darkGrey flex items-center gap-2 ${
                isPending
                  ? "text-gray-600 font-medium block p-4"
                  : isActive
                    ? "text-normalGreen bg-normalGreen bg-opacity-20 hover:!text-normalGreenHover"
                    : ""
              }`
            }
          >
            <DashboardTopicIcon
              width={24}
              height={24}
            ></DashboardTopicIcon>
            <span>Topics</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={path.DASHBOARD_STORIES}
            className={({ isActive, isPending }) =>
              `font-medium p-4 hover:text-darkGrey flex items-center gap-2 ${
                isPending
                  ? "text-gray-600 font-medium block p-4"
                  : isActive
                    ? "text-normalGreen bg-normalGreen bg-opacity-20 hover:!text-normalGreenHover"
                    : ""
              }`
            }
          >
            <DashboardStoryIcon
              width={24}
              height={24}
            ></DashboardStoryIcon>
            <span>Stories</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={path.DASHBOARD_USERS}
            className={({ isActive, isPending }) =>
              `font-medium p-4 hover:text-darkGrey flex items-center gap-2 ${
                isPending
                  ? "text-gray-600 font-medium block p-4"
                  : isActive
                    ? "text-normalGreen bg-normalGreen bg-opacity-20 hover:!text-normalGreenHover"
                    : ""
              }`
            }
          >
            <DashboardUserIcon></DashboardUserIcon>
            <span>Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={path.DASHBOARD_REPORTS}
            className={({ isActive, isPending }) =>
              `font-medium p-4 hover:text-darkGrey flex items-center gap-2 ${
                isPending
                  ? "text-gray-600 font-medium block p-4"
                  : isActive
                    ? "text-normalGreen bg-normalGreen bg-opacity-20 hover:!text-normalGreenHover"
                    : ""
              }`
            }
          >
            <DashboardReportIcon></DashboardReportIcon>
            <span>Reports</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
