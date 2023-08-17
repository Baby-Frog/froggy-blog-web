import { useRoutes } from "react-router-dom";
import MainLayout from "src/layouts/MainLayout/MainLayout";
import Homepage from "src/pages/Homepage";

// function ProtectedRoute() {
//   const { isAuthenticated } = useContext(AuthContext);
//   return isAuthenticated ? <Outlet></Outlet> : <Navigate to={path.login}></Navigate>;
// }

// function RejectedRoute() {
//   const { isAuthenticated } = useContext(AuthContext);
//   return !isAuthenticated ? <Outlet></Outlet> : <Navigate to={path.home}></Navigate>;
// }

export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: "/",
      index: true,
      element: (
        <MainLayout>
          <Homepage></Homepage>
        </MainLayout>
      ),
    },
  ]);
  return routeElements;
}
