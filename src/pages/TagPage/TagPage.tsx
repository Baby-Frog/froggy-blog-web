import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { createSearchParams, useNavigate } from "react-router-dom";
import { topicApi } from "src/apis/topic.apis";
import { path } from "src/constants/path";

type TTagPageProps = {
  something: string;
};

const TagPage = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ search: string }>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const { data: exploreTopicsData } = useQuery({
    queryKey: ["explore-topics"],
    queryFn: () => topicApi.getTopicsByKeyword({ keyword: "", pageSize: 20, column: "id", orderBy: "asc" }),
  });
  const exploreTopics = exploreTopicsData?.data.data.data;
  const handleQueryTopics = handleSubmit((data) => {
    navigate(
      {
        pathname: path.SEARCH,
        search: createSearchParams({
          q: data.search,
        }).toString(),
      },
      {
        state: {
          from: path.EXPORE_TOPICS,
        },
      },
    );
  });
  const handleNavigateToTopic = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const topicName = e.currentTarget.innerText;
    navigate(
      {
        pathname: path.SEARCH,
        search: createSearchParams({
          q: topicName,
        }).toString(),
      },
      {
        state: {
          from: path.EXPORE_TOPICS,
        },
      },
    );
  };
  return <div></div>;
};

export default TagPage;
