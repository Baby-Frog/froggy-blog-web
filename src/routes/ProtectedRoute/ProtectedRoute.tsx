import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { path } from "src/constants/path";
import { AuthContext } from "src/contexts/auth.contexts";

// This route is used to protect the route that requires authentication
// For example: if you are not logged in and you try to navigate to the write story page, you will be redirected back to the homepage
export default function ProtectedRoute() {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Outlet></Outlet> : <Navigate to={path.HOMEPAGE}></Navigate>;
}
