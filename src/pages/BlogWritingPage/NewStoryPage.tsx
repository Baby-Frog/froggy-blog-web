/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { styled } from "styled-components";
import NewStorySidebar from "./components/NewStorySidebar";

import { useMutation } from "react-query";
import useMedia from "react-use/lib/useMedia";
import { storyApi } from "src/apis/story.apis";
import { topicApi } from "src/apis/topic.apis";
import Button from "src/components/Button";
import ImageIcon from "src/components/Icon/ImageIcon";
import Input from "src/components/Input";
import InputFile from "src/components/InputFile";
import Label from "src/components/Label";
import MultipleSelectV2 from "src/components/MultipleSelect/MultipleSelectV2";
import TextEditor from "src/components/TextEditor";
import { TStorySchema, storySchema } from "src/schemas/story.schemas";
import _ from "lodash";
import { imageApi } from "src/apis/image.apis";
import { yupResolver } from "@hookform/resolvers/yup";

type ValueType = { key?: string; label: React.ReactNode; value: string | number };

const NewStoryPageWrapper = styled.div`
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
  @media screen and (max-width: 767px) {
    font-size: 20px;
  }
`;

const NewStorySubheading = styled.h2`
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 40px;
  color: ${(props) => props.theme.colors.lightGrey};
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  margin-bottom: 24px;
  @media screen and (max-width: 1023px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
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
    watch,
    setError,
    formState: { errors },
  } = useForm<TStorySchema>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    defaultValues: {
      thumbnail: "",
      content: "",
      title: "",
      topicId: [],
    },
    resolver: yupResolver(storySchema),
  });
  const isTablet = useMedia("(max-width: 1024px)");
  const [topicValues, setTopicValues] = useState<ValueType[]>([]);
  const [textEditorValue, setTextEditorValue] = useState<string>("");
  const [previewImageFile, setPreviewImageFile] = useState<Blob>();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const thumbnail = watch("thumbnail");
  const previewImageURL = useMemo(() => {
    return previewImageFile ? URL.createObjectURL(previewImageFile) : "";
  }, [previewImageFile]);

  const createPostMutation = useMutation({
    mutationFn: storyApi.createStory,
  });

  const uploadThumbnail = useMutation({
    mutationFn: imageApi.uploadImage,
  });

  async function fetchTopicList(keyword: string) {
    return topicApi.getTopicsByKeyword(keyword).then((res) => {
      return res.data.data.data.map((topic) => ({
        value: topic.id,
        label: topic.topicName,
      }));
    });
  }
  const handleResetForm = () => {
    reset({
      title: "",
      topicId: [],
      content: "",
    });
    setTopicValues([]);
    setTextEditorValue("");
    setPreviewImageFile(undefined);
  };
  const handleCreateNewStory = handleSubmit(async (data) => {
    try {
      let yourThumbnail = thumbnail;
      if (previewImageFile) {
        const formData = new FormData();
        formData.append("file", previewImageFile);
        const uploadRes = await uploadThumbnail.mutateAsync(formData);
        yourThumbnail = uploadRes.data.data.urlImage;
        setValue("thumbnail", yourThumbnail);
      }
      createPostMutation.mutate(
        {
          ...data,
          content: textEditorValue,
          thumbnail: yourThumbnail,
          credit: "hehe",
        },
        {
          onSuccess: () => {
            toast.success("Yes sir");
          },
        },
      );
    } catch (err) {
      console.log(err);
      return err;
    }
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
  useEffect(() => {
    if (errors.content) {
      toast.error(<div className="text-sm">{errors.content.message}</div>);
    }
  }, [errors.content]);
  return (
    <NewStoryPageWrapper>
      <NewStorySidebar handleResetForm={handleResetForm}></NewStorySidebar>
      <NewStoryMain>
        <NewStoryHeading>Write your new story 🚀</NewStoryHeading>
        <NewStorySubheading>Share your story with us ^o^</NewStorySubheading>
        <form onSubmit={handleCreateNewStory}>
          <GridRow>
            <FlexColumn>
              <Label
                htmlFor="title"
                className="font-medium"
                note="Must be more than 5 characters"
                isRequired
              >
                Your story title
              </Label>
              <Input
                name="title"
                id="title"
                placeholder="Enter your story title"
                register={register}
                errorMsg={errors.title?.message}
              ></Input>
            </FlexColumn>
            <FlexColumn>
              <Label
                htmlFor="topicId"
                className="font-medium"
                note="You can choose up to 5 topics"
                isRequired
              >
                Your story topics
              </Label>
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
          <Label
            htmlFor="content"
            className="font-medium"
            isRequired
          >
            Write your story here 📖
          </Label>
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
          <Label
            htmlFor="thumbnail"
            className="mt-2 md:mx-0 mx-auto font-medium text-sm"
          >
            Thumbnail
          </Label>
          <InputFile
            handleChangeFile={handleChangeFile}
            handleClickOnInput={handleClickOnInput}
            inputFileRef={inputFileRef}
            className="flex items-center justify-center md:block"
          >
            <div className="flex md:w-[200px] md:h-[200px] rounded-lg items-center justify-center overflow-hidden w-[300px] h-[300px]">
              {!previewImageFile ? (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center flex-col gap-2">
                  <ImageIcon
                    width={36}
                    height={36}
                    opacity={0.6}
                  ></ImageIcon>
                  <span className="text-[14px] w-[150px] font-medium text-center text-black text-opacity-40">
                    Upload thumbnail to make it more inviting to readers
                  </span>
                </div>
              ) : (
                <img
                  src={previewImageURL}
                  alt="Failed to load"
                  className="object-cover w-full h-full rounded-lg"
                />
              )}
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
