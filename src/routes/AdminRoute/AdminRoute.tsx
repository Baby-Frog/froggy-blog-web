import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { path } from "src/constants/path";
import { AuthContext } from "src/contexts/auth.contexts";
//ADMINISTRATOR

const AdminRoute = () => {
  const { isAuthenticated, userProfile } = useContext(AuthContext);
  return isAuthenticated && userProfile?.roles.includes("ADMINISTRATOR") ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to={path.HOMEPAGE}></Navigate>
  );
};

export default AdminRoute;
