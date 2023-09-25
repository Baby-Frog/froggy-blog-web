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
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
  });
  const [values, setValues] = useState<ValueType[]>([]);
  const [textEditorValue, setTextEditorValue] = useState<string>("");
  async function fetchTopicList(keyword: string) {
    return topicApi.getTopicsByKeyword(keyword).then((res) => {
      return res.data.data.data.map((topic) => ({
        value: topic.id,
        label: topic.topicName,
      }));
    });
  }

  const handleCreateNewStory = handleSubmit((data) => {
    console.log({
      ...data,
      content: textEditorValue,
    });
  });
  return (
    <NewStoryMainWrapper>
      <NewStoryHeading>Write your new story 🚀</NewStoryHeading>
      <form onSubmit={handleCreateNewStory}>
        <GridRow>
          <FlexColumn>
            <Label htmlFor="title">Your story title</Label>
            <Input
              name="title"
              placeholder="Enter your story title"
              register={register}
            ></Input>
          </FlexColumn>
          <FlexColumn>
            <Label htmlFor="topicId">Your story topics</Label>
            <MultipleSelect
              id="topicId"
              fetchOptions={fetchTopicList}
              value={values}
              debounceTimeout={800}
              placeholder="Enter your story topics"
              onChange={(newValue) => {
                setValues(newValue.map((item: { value: string }) => item.value));
                setValue(
                  "topicId",
                  newValue.map((item: { value: string }) => item.value),
                );
              }}
            ></MultipleSelect>
          </FlexColumn>
        </GridRow>
        <TextEditor
          textEditorValue={textEditorValue}
          setTextEditorValue={setTextEditorValue}
        ></TextEditor>
        <button type="submit">Submit</button>
      </form>
    </NewStoryMainWrapper>
  );
};

export default NewStoryMain;
