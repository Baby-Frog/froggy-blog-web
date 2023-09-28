import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { path } from "src/constants/path";
import { AuthContext } from "src/contexts/auth.contexts";

export default function ProtectedRoute() {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Outlet></Outlet> : <Navigate to={path.HOMEPAGE}></Navigate>;
}
