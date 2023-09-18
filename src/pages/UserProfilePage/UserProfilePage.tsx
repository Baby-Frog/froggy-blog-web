import { useIsPresent } from "framer-motion";
import PageTransition from "src/components/PageTransition";

type TUserProfilePageProps = {
  something: string;
};

const UserProfilePage = () => {
  const isPresent = useIsPresent();
  return (
    <div>
      <div className="">Hello User Profile Page</div>
      <PageTransition isPresent={isPresent}></PageTransition>
    </div>
  );
};

export default UserProfilePage;
