import { useIsPresent } from "framer-motion";
import { useContext } from "react";
import PageTransition from "src/components/PageTransition";
import { AuthContext } from "src/contexts/auth.contexts";

type TUserProfilePageProps = {
  something: string;
};

const UserProfilePage = () => {
  const isPresent = useIsPresent();
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div className="relative -z-10">
      <div>Hello User Profile Page</div>
      <PageTransition isPresent={isPresent && isAuthenticated}></PageTransition>
    </div>
  );
};

export default UserProfilePage;
