/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import Input from "src/components/Input";
import Label from "src/components/Label";
import TextEditor from "src/components/TextEditor";
import { styled } from "styled-components";
import { Select } from "antd";
import MultipleSelect from "src/components/MultipleSelect";
import { topicApi } from "src/apis/topic.apis";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
type TNewStoryMainProps = {
  something: string;
};

type ValueType = { key?: string; label: React.ReactNode; value: string | number };

const NewStoryMainWrapper = styled.div`
  flex: 7.5;
  margin: 0 auto;
`;

const NewStoryHeading = styled.h1`
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 56px;
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const NewStoryMain = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
  });
  const [value, setValue] = useState<ValueType[]>([]);
  const { data: topicData, isLoading } = useQuery({
    queryKey: ["topics"],
    queryFn: () => topicApi.getTopics(),
  });
  useEffect(() => {
    const newOptions =
      topicData?.data?.data?.data?.map((topic) => ({
        value: topic.id,
        label: topic.topicName,
      })) || [];
    setOptions(newOptions);
  }, [topicData]);

  return (
    <NewStoryMainWrapper>
      <NewStoryHeading>Write your new story 🚀</NewStoryHeading>
      <GridRow>
        <FlexColumn>
          <Label htmlFor="title">Your story title</Label>
          <Input
            name="title"
            register={register}
          ></Input>
        </FlexColumn>
        <FlexColumn>
          <Label htmlFor="title">Your story topics</Label>
          <MultipleSelect
            fetchOptions={(search: string) => topicApi.getTopicsByKeyword(search) as Promise<any>}
            value={value}
            isLoading={isLoading}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          ></MultipleSelect>
        </FlexColumn>
      </GridRow>
      <TextEditor></TextEditor>
    </NewStoryMainWrapper>
  );
};

export default NewStoryMain;
