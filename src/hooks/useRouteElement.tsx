import { useRoutes } from "react-router-dom";
import { path } from "src/constants/path";

import MainLayout from "src/layouts/MainLayout/MainLayout";
import NewStoryLayout from "src/layouts/NewStoryLayout";
import StoryDetailLayout from "src/layouts/StoryDetailLayout";
import AnonymousUserProfilePage from "src/pages/AnonymousUserProfilePage";
import NewStoryPage from "src/pages/BlogWritingPage";
import EditProfilePage from "src/pages/EditProfilePage";
import Homepage from "src/pages/Homepage";
import SettingPage from "src/pages/SettingPage";
import StoryDetailPage from "src/pages/StoryDetailPage";
import UserProfilePage from "src/pages/UserProfilePage";
import ProtectedRoute from "src/routes/ProtectedRoute";

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
      path: path.STORY_DETAIL,
      element: (
        <StoryDetailLayout>
          <StoryDetailPage></StoryDetailPage>
        </StoryDetailLayout>
      ),
    },
    {
      path: path.ANONYMOUS_PROFILE,
      element: (
        <StoryDetailLayout>
          <AnonymousUserProfilePage></AnonymousUserProfilePage>
        </StoryDetailLayout>
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
        {
          path: path.EDIT_PROFILE,
          element: (
            <MainLayout>
              <EditProfilePage></EditProfilePage>
            </MainLayout>
          ),
        },
      ],
    },
  ]);
  return routeElements;
}
