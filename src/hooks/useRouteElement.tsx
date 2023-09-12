import { useContext } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { path } from "src/constants/path";
import { AuthContext } from "src/contexts/auth.contexts";
import MainLayout from "src/layouts/MainLayout/MainLayout";
import Homepage from "src/pages/Homepage";

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Outlet></Outlet> : <Navigate to={path.HOMEPAGE}></Navigate>;
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? <Outlet></Outlet> : <Navigate to={path.HOMEPAGE}></Navigate>;
}

export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: "/",
      index: true,
      element: (
        <>
          <MainLayout>
            <Homepage></Homepage>
          </MainLayout>
        </>
      ),
    },
  ]);
  return routeElements;
}
