import { useIsPresent } from "framer-motion";
import { useContext } from "react";
import PageTransition from "src/components/PageTransition";
import { AuthContext } from "src/contexts/auth.contexts";

type TUserProfilePageProps = {
  something: string;
};

const UserProfilePage = () => {
  return (
    <div className="relative -z-10">
      <div>Hello User Profile Page</div>
    </div>
  );
};

export default UserProfilePage;
