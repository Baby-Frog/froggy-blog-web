import { useState } from "react";
import { NavLink } from "react-router-dom";
import { path } from "src/constants/path";
import Sidebar from "./components/Sidebar";

type TDashboardPageProps = {
  something: string;
};

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex">
      <Sidebar></Sidebar>
    </div>
  );
};

export default DashboardPage;
