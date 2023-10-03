import { useContext } from "react";
import { useQuery } from "react-query";
import { storyApi } from "src/apis/story.apis";
import { AuthContext } from "src/contexts/auth.contexts";

const Homepage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { data: storiesData, isLoading: storiesIsLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: () => storyApi.getRecentStories({ keyword: "", pageSize: 5 }),
  });
  console.log(storiesData);
  return <></>;
};

export default Homepage;
