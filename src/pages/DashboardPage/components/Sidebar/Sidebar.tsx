import { NavLink } from "react-router-dom";
import { path } from "src/constants/path";

type TSidebarProps = {
  something: string;
};

const Sidebar = () => {
  return (
    <div className="w-[294px] bg-white border-r-2 border-r-slate-300 h-screen">
      <ul className="mt-4">
        <li>
          <NavLink
            to={path.DASHBOARD}
            className={({ isActive, isPending }) =>
              `font-medium block px-4 py-2 hover:text-darkGrey ${
                isPending ? "text-gray-600 font-medium block px-4 py-2" : isActive ? " text-gray-600" : ""
              }`
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to={path.DASHBOARD_TOPICS}
            className="text-gray-600 hover:text-gray-900 font-medium block px-4 py-2"
          >
            Topics
          </NavLink>
        </li>
        <li>
          <NavLink
            to={path.DASHBOARD_STORIES}
            className="text-gray-600 hover:text-gray-900 font-medium block px-4 py-2"
          >
            Stories
          </NavLink>
        </li>
        <li>
          <NavLink
            to={path.DASHBOARD_USERS}
            className="text-gray-600 hover:text-gray-900 font-medium block px-4 py-2"
          >
            Users
          </NavLink>
        </li>
        <li>
          <NavLink
            to={path.DASHBOARD_REPORTS}
            className="text-gray-600 hover:text-gray-900 font-medium block px-4 py-2"
          >
            Reports
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
