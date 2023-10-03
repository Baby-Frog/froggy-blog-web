import { useContext } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { path } from "src/constants/path";
import { AuthContext } from "src/contexts/auth.contexts";
import MainLayout from "src/layouts/MainLayout/MainLayout";
import NewStoryLayout from "src/layouts/NewStoryLayout";
import NewStoryPage from "src/pages/BlogWritingPage";
import Homepage from "src/pages/Homepage";
import SettingPage from "src/pages/SettingPage";
import UserProfilePage from "src/pages/UserProfilePage";
import ProtectedRoute from "src/routes/ProtectedRoute";

function RejectedRoute() {}

export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: path.HOMEPAGE,
      element: (
        <>
          <MainLayout>
            <Homepage></Homepage>
          </MainLayout>
        </>
      ),
    },
    {
      path: "",
      element: <ProtectedRoute></ProtectedRoute>,
      children: [
        {
          path: path.PROFILE,
          element: (
            <MainLayout>
              <UserProfilePage></UserProfilePage>
            </MainLayout>
          ),
        },
        {
          path: path.SETTING,
          element: (
            <MainLayout>
              <SettingPage></SettingPage>
            </MainLayout>
          ),
        },
        {
          path: path.NEWSTORY,
          element: (
            <NewStoryLayout>
              <NewStoryPage></NewStoryPage>
            </NewStoryLayout>
          ),
        },
      ],
    },
  ]);
  return routeElements;
}
