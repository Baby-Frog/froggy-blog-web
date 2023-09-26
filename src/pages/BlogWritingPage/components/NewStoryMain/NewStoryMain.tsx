/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Editor as TinyMCEEditor } from "tinymce";

import useMedia from "react-use/lib/useMedia";
import { topicApi } from "src/apis/topic.apis";
import Input from "src/components/Input";
import Label from "src/components/Label";
import MultipleSelect from "src/components/MultipleSelect";
import TextEditor from "src/components/TextEditor";
import { TStorySchema, storySchema } from "src/schemas/story.schemas";
import { styled } from "styled-components";
import MultipleSelectV2 from "src/components/MultipleSelect/MultipleSelectV2";
import Button from "src/components/Button";

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
    control,
    setError,
    getValues,
    formState: { errors },
  } = useForm<TStorySchema>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(storySchema),
  });
  const isTablet = useMedia("(max-width: 1024px)");
  const [topicValues, setTopicValues] = useState<ValueType[]>([]);
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
              errorMsg={errors.title?.message}
            ></Input>
          </FlexColumn>
          <FlexColumn>
            <Label htmlFor="topicId">Your story topics</Label>
            <Controller
              control={control}
              name="topicId"
              render={({ field }) => {
                return (
                  <MultipleSelectV2
                    id="topicId"
                    maxTagCount={isTablet ? 3 : 5}
                    allowClear
                    errorMsg={errors.topicId?.message}
                    fetchOptions={fetchTopicList}
                    debounceTimeout={800}
                    placeholder="Enter your story topics"
                    {...field}
                    value={topicValues}
                    onChange={(newValue: any[]) => {
                      if (newValue.length >= 6) {
                        setError("topicId", { message: "You can only choose up to 5 topics" });
                        return;
                      }
                      setTopicValues(newValue);
                      setValue(
                        "topicId",
                        newValue.map((item: { value: string }) => item.value),
                      );
                    }}
                  ></MultipleSelectV2>
                );
              }}
            ></Controller>
          </FlexColumn>
        </GridRow>
        <Controller
          control={control}
          name="content"
          render={({ field }) => {
            return (
              <TextEditor
                errorMsg={errors.content?.message}
                {...field}
                onChange={(newValue, editor) => {
                  setTextEditorValue(newValue);
                  field.onChange(editor.getContent({ format: "text" }));
                }}
                onBlur={() => {
                  field.onBlur();
                }}
                value={textEditorValue}
              ></TextEditor>
            );
          }}
        ></Controller>
        <Button
          type="submit"
          className="!w-[300px] !mx-auto !block !bg-normalGreen !outline-none !border-none !text-white hover:!bg-normalGreenHover !p-[13px] !rounded-xl !text-[16px] !font-medium"
        >
          Submit your story
        </Button>
      </form>
    </NewStoryMainWrapper>
  );
};

export default NewStoryMain;
