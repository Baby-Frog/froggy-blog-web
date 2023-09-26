/* eslint-disable @typescript-eslint/no-explicit-any */

import { styled } from "styled-components";
import NewStorySidebar from "./components/NewStorySidebar";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import useMedia from "react-use/lib/useMedia";
import { topicApi } from "src/apis/topic.apis";
import Button from "src/components/Button";
import Input from "src/components/Input";
import InputFile from "src/components/InputFile";
import Label from "src/components/Label";
import MultipleSelectV2 from "src/components/MultipleSelect/MultipleSelectV2";
import TextEditor from "src/components/TextEditor";
import { AuthContext } from "src/contexts/auth.contexts";
import { TStorySchema, storySchema } from "src/schemas/story.schemas";
import { useScroll } from "react-use";
type TNewStoryPageProps = {
  something: string;
};

type ValueType = { key?: string; label: React.ReactNode; value: string | number };

const NewStoryPageWrapper = styled.div`
  height: 200vh;
  position: relative;
  overflow: visible;
  display: flex;
  gap: 96px;
`;

const NewStoryMain = styled.div`
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

const THREE_MEGABYTE_TO_BYTES = 3 * 1024 * 1024;

const NewStoryPage = () => {
  const {
    handleSubmit,
    register,
    setValue,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<TStorySchema>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(storySchema),
  });
  const isTablet = useMedia("(max-width: 1024px)");
  const { userProfile } = useContext(AuthContext);
  const [topicValues, setTopicValues] = useState<ValueType[]>([]);
  const [textEditorValue, setTextEditorValue] = useState<string>("");
  const [previewImageFile, setPreviewImageFile] = useState<File>();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const previewImageURL = useMemo(() => {
    return previewImageFile ? URL.createObjectURL(previewImageFile) : "";
  }, [previewImageFile]);
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
  const handleClickOnInput = () => {
    inputFileRef.current?.click();
  };
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = e.target.files?.[0];
    if (fileFromLocal && !fileFromLocal.type.includes("image")) {
      toast.error(<div className="text-sm">Wrong file format, we only accept .JPEG, .PNG, .JPG file format</div>);
      // Set lại value để có thể hiển thị lại lỗi đề phòng có chuyện gì xảy ra
      e.target.value = "";
      return;
    }
    if (fileFromLocal && fileFromLocal.size >= THREE_MEGABYTE_TO_BYTES) {
      toast.error("Your image size is too big, we only accept image size under 3MB");
      // Set lại value để có thể chọn lại bức ảnh trước một lần nữa đề phòng có chuyện gì xảy ra
      e.target.value = "";
      return;
    }

    setPreviewImageFile(fileFromLocal);
  };
  return (
    <NewStoryPageWrapper>
      <NewStorySidebar></NewStorySidebar>
      <NewStoryMain>
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
          <h2>Your post will look like this:</h2>
          <InputFile
            handleChangeFile={handleChangeFile}
            handleClickOnInput={handleClickOnInput}
            inputFileRef={inputFileRef}
          >
            <div className="mt-2 flex w-[200px] h-[200px] rounded-lg items-center justify-center overflow-hidden">
              <img
                src={previewImageURL}
                alt="Something happened"
                className="object-cover w-full h-full"
              />
            </div>
          </InputFile>
          <Button
            type="submit"
            className="!w-[300px] !mx-auto !block !bg-normalGreen !outline-none !border-none !text-white hover:!bg-normalGreenHover !p-[13px] !rounded-xl !text-[16px] !font-medium"
          >
            Submit your story
          </Button>
        </form>
      </NewStoryMain>
    </NewStoryPageWrapper>
  );
};

export default NewStoryPage;
