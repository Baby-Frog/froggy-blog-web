import { useRoutes } from "react-router-dom";
import { path } from "src/constants/path";

import MainLayout from "src/layouts/MainLayout/MainLayout";
import TitleLayout from "src/layouts/TitleLayout";
import StoryDetailLayout from "src/layouts/StoryDetailLayout";
import AnonymousUserProfilePage from "src/pages/AnonymousUserProfilePage";
import NewStoryPage from "src/pages/BlogWritingPage";
import EditProfilePage from "src/pages/EditProfilePage";
import Homepage from "src/pages/Homepage";
import SettingPage from "src/pages/SettingPage";
import StoryDetailPage from "src/pages/StoryDetailPage";
import UserProfilePage from "src/pages/UserProfilePage";
import ProtectedRoute from "src/routes/ProtectedRoute";
import ExploreLayout from "src/layouts/ExploreLayout";
import ExplorePage from "src/pages/ExplorePage";
import SearchResultsPage from "src/pages/SearchResultsPage";
import TagPage from "src/pages/TagPage";
import EditStoryPage from "src/pages/EditStoryPage";
import StatsLayout from "src/layouts/StatsLayout";
import StatsPage from "src/pages/StatsPage";
import AdminRoute from "src/routes/AdminRoute";
import DashboardLayout from "src/layouts/DashboardLayout";
import DashboardPage from "src/pages/DashboardPage";
import DashboardTopicsPage from "src/pages/DashboardTopicsPage";
import DashboardUsersPage from "src/pages/DashboardUsersPage";
import DashboardStoriesPage from "src/pages/DashboardStoriesPage";
import DashboardReportsPage from "src/pages/DashboardReportsPage";
import DashboardCreateTopicPage from "src/pages/DashboardCreateTopicPage";
import ExploreStoryPage from "src/pages/ExploreStoryPage";
import DashboardPendingStoriesPage from "src/pages/DashboardPendingStoriesPage";

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
        <ExploreLayout>
          <AnonymousUserProfilePage></AnonymousUserProfilePage>
        </ExploreLayout>
      ),
    },
    {
      path: path.EXPORE_TOPICS,
      element: (
        <ExploreLayout>
          <ExplorePage></ExplorePage>
        </ExploreLayout>
      ),
    },
    {
      path: path.SEARCH,
      element: (
        <ExploreLayout>
          <SearchResultsPage></SearchResultsPage>
        </ExploreLayout>
      ),
    },
    {
      path: path.TAG,
      element: (
        <ExploreLayout>
          <TagPage></TagPage>
        </ExploreLayout>
      ),
    },
    {
      path: path.EXPORE_STORIES,
      element: (
        <MainLayout>
          <ExploreStoryPage></ExploreStoryPage>
        </MainLayout>
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
            <TitleLayout title="Create your story">
              <NewStoryPage></NewStoryPage>
            </TitleLayout>
          ),
        },
        {
          path: path.EDIT_STORY,
          element: (
            <TitleLayout title="Edit your story">
              <EditStoryPage></EditStoryPage>
            </TitleLayout>
          ),
        },
        {
          path: path.EDIT_PROFILE,
          element: (
            <TitleLayout title="Edit profile">
              <EditProfilePage></EditProfilePage>
            </TitleLayout>
          ),
        },
        {
          path: path.STATISTICS,
          element: (
            <StatsLayout>
              <StatsPage></StatsPage>
            </StatsLayout>
          ),
        },
      ],
    },
    {
      path: "",
      element: <AdminRoute></AdminRoute>,
      children: [
        {
          path: path.DASHBOARD,
          element: (
            <DashboardLayout>
              <DashboardPage></DashboardPage>
            </DashboardLayout>
          ),
        },
        {
          path: path.DASHBOARD_TOPICS,
          element: (
            <DashboardLayout>
              <DashboardTopicsPage></DashboardTopicsPage>
            </DashboardLayout>
          ),
        },
        {
          path: path.DASHBOARD_STORIES,
          element: (
            <DashboardLayout>
              <DashboardStoriesPage></DashboardStoriesPage>
            </DashboardLayout>
          ),
        },
        {
          path: path.DASHBOARD_USERS,
          element: (
            <DashboardLayout>
              <DashboardUsersPage></DashboardUsersPage>
            </DashboardLayout>
          ),
        },
        {
          path: path.DASHBOARD_REPORTS,
          element: (
            <DashboardLayout>
              <DashboardReportsPage></DashboardReportsPage>
            </DashboardLayout>
          ),
        },
        {
          path: path.DASHBOARD_CREATE_TOPIC,
          element: (
            <DashboardLayout>
              <DashboardCreateTopicPage></DashboardCreateTopicPage>
            </DashboardLayout>
          ),
        },
        {
          path: path.DASHBOARD_PENDING_STORIES,
          element: (
            <DashboardLayout>
              <DashboardPendingStoriesPage></DashboardPendingStoriesPage>
            </DashboardLayout>
          ),
        },
      ],
    },
  ]);
  return routeElements;
}
