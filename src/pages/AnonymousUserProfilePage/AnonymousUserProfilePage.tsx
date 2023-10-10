import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { authApi } from "src/apis/auth.apis";

type TAnonymousUserProfilePageProps = {
  something: string;
};

const AnonymousUserProfilePage = () => {
  const { userId } = useParams();
  const { data: userData } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => authApi.getAnonymousProfile(userId as string),
  });
  return <div></div>;
};

export default AnonymousUserProfilePage;
