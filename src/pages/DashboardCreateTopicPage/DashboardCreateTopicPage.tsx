import { useForm } from "react-hook-form";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { topicSchema } from "src/schemas/topic.schema";
import { toast } from "react-toastify";
import Input from "src/components/Input";
import Button from "src/components/Button";
import { useMutation } from "react-query";
import { adminApi } from "src/apis/admin.apis";
import { useNavigate } from "react-router-dom";
import { path } from "src/constants/path";

type TDashboardCreateTopicPageProps = {
  something: string;
};

const DashboardCreateTopicPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    reValidateMode: "onBlur",
    mode: "onSubmit",
    resolver: yupResolver(topicSchema),
  });
  const addNewTopicMutation = useMutation({
    mutationFn: adminApi.createNewTopic,
  });

  const handleCreateNewTopic = handleSubmit((data) => {
    addNewTopicMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Create new topic successfully");
        navigate(path.DASHBOARD_TOPICS);
      },
      onError: () => {
        toast.error("Oops! Create new topic failed");
      },
    });
  });

  return (
    <div>
      <h1 className="text-3xl font-bold">Create new topic</h1>
      <form onSubmit={handleCreateNewTopic}>
        <Input
          name="topicName"
          register={register}
          className="flex-shrink-0"
          placeholder="Enter topic name"
        ></Input>
        <Button type="submit">Create topic</Button>
      </form>
    </div>
  );
};

export default DashboardCreateTopicPage;
