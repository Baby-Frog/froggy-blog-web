/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useMemo, useRef, useState, createRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { styled } from "styled-components";
import Swal from "sweetalert2";
import NewStorySidebar from "./components/NewStorySidebar";
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from "react-google-recaptcha";
import { useMutation, useQueryClient } from "react-query";
import useMedia from "react-use/lib/useMedia";
import { imageApi } from "src/apis/image.apis";
import { storyApi } from "src/apis/story.apis";
import { topicApi } from "src/apis/topic.apis";
import Signature from "src/assets/signature.png";
import Button from "src/components/Button";
import ImageIcon from "src/components/Icon/ImageIcon";
import ErrorToastIcon from "src/components/Icon/ToastIcon/ErrorToastIcon";
import SuccessToastIcon from "src/components/Icon/ToastIcon/SuccessToastIcon";
import Input from "src/components/Input";
import InputFile from "src/components/InputFile";
import Label from "src/components/Label";
import MultipleSelectV2 from "src/components/MultipleSelect/MultipleSelectV2";
import TextEditor from "src/components/TextEditor";
import { TStorySchema, storySchema } from "src/schemas/story.schemas";
import { yupResolver } from "@hookform/resolvers/yup";

type ValueType = { key?: string; label: React.ReactNode; value: string | number };

const NewStoryPageWrapper = styled.div`
  height: 155vh;
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

const LastRow = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
  @media screen and (max-width: 1023px) {
    grid-template-columns: 200px 1fr;
    gap: 16px;
  }
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Paragraph = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.colors.darkGrey};
`;

const SignatureImage = styled.img`
  width: 100%;
  height: 100px;
  margin-top: -10px;
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
  const queryClient = useQueryClient();
  const recaptchaRef = createRef<ReCAPTCHA>();
  const [topicValues, setTopicValues] = useState<ValueType[]>([]);
  const [textEditorValue, setTextEditorValue] = useState<string>("");
  const [rawText, setRawText] = useState<string>("");
  const [previewImageFile, setPreviewImageFile] = useState<Blob>();
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const thumbnail = watch("thumbnail");
  const previewImageURL = useMemo(() => {
    return previewImageFile ? URL.createObjectURL(previewImageFile) : "";
  }, [previewImageFile]);

  const createPostMutation = useMutation({
    mutationFn: storyApi.createStory,
    onSuccess: () => {
      queryClient.invalidateQueries("stories");
    },
  });

  const uploadThumbnail = useMutation({
    mutationFn: imageApi.uploadImage,
  });

  async function fetchTopicList(keyword: string) {
    return topicApi.getTopicsByKeyword({ keyword: keyword, pageSize: 8 }).then((res) => {
      return res.data.data.data.map((topic) => ({
        value: topic.id,
        label: topic.topicName,
      }));
    });
  }
  const handleResetForm = () => {
    Swal.fire({
      title: "Do you want to reset what you've filled in?",
      showDenyButton: true,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        reset({
          title: "",
          topicId: [],
          content: "",
          thumbnail: "",
          raw: "",
          credit: "",
        });
        setTopicValues([]);
        setTextEditorValue("");
        setRawText("");
        setPreviewImageFile(undefined);
      } else if (result.isDenied) {
        Swal.fire("You're safe to go", "", "success");
      }
    });
  };

  const handleCreateNewStory = handleSubmit(async (data) => {
    recaptchaRef?.current?.reset();

    try {
      Swal.fire({
        title: "Are you sure you want to submit this story 🤔?",
        text: "You can still edit this story after submitting!",
        showDenyButton: true,
        confirmButtonText: `Yes`,
        denyButtonText: `No`,
      }).then(async (result) => {
        if (result.isConfirmed) {
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
              raw: rawText,
              thumbnail: yourThumbnail,
            },
            {
              onSuccess: (data) => {
                queryClient.invalidateQueries({ queryKey: ["stories"] });
                reset({
                  title: "",
                  topicId: [],
                  content: "",
                  thumbnail: "",
                  raw: "",
                  credit: "",
                });
                setTopicValues([]);
                setTextEditorValue("");
                setRawText("");
                setPreviewImageFile(undefined);
                toast.success(`Your story: "${data.data.data.title}" has been submitted, please wait for censhorship`, {
                  icon: <SuccessToastIcon></SuccessToastIcon>,
                });
              },
            },
          );
        } else if (result.isDenied) {
          Swal.fire("You're safe to go", "", "success");
        }
      });
    } catch (err) {
      return err;
    }
  });
  const handleClickOnInput = () => {
    inputFileRef.current?.click();
  };
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = e.target.files?.[0];
    if (fileFromLocal && !fileFromLocal.type.includes("image") && fileFromLocal?.type.includes("gif")) {
      toast.error(<div className="text-sm">Wrong file format, we only accept .JPEG, .PNG, .JPG file format</div>, {
        icon: (
          <ErrorToastIcon
            width={40}
            height={40}
          />
        ),
      });
      // Set lại value để có thể hiển thị lại lỗi đề phòng có chuyện gì xảy ra
      e.target.value = "";
      return;
    }
    if (fileFromLocal && fileFromLocal.size >= THREE_MEGABYTE_TO_BYTES) {
      toast.error("Your image size is too big, we only accept image size under 3MB", {
        icon: (
          <ErrorToastIcon
            width={40}
            height={40}
          />
        ),
      });
      // Set lại value để có thể chọn lại bức ảnh trước một lần nữa đề phòng có chuyện gì xảy ra
      e.target.value = "";
      return;
    }

    setPreviewImageFile(fileFromLocal);
  };
  useEffect(() => {
    if (errors.content) {
      toast.error(<div className="text-sm">{errors.content.message}</div>, {
        icon: (
          <ErrorToastIcon
            width={40}
            height={40}
          />
        ),
      });
    }
  }, [errors.content]);
  const handleVerifyCaptcha = (value: string | null) => {
    setCaptchaToken(value ?? "");
  };
  return (
    <NewStoryPageWrapper>
      <NewStorySidebar
        captchaToken={captchaToken}
        handleResetForm={handleResetForm}
        handleCreateNewStory={handleCreateNewStory}
      ></NewStorySidebar>
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
                  rawText={rawText}
                  setRawText={setRawText}
                  {...field}
                  onChange={(newValue, editor) => {
                    setTextEditorValue(newValue);
                    setRawText(editor.getContent({ format: "text" }));
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
          <LastRow>
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
                      color="#222"
                    ></ImageIcon>
                    <span className="text-[14px] w-[180px] font-medium text-center text-black text-opacity-40">
                      Upload high-quality thumbnail to make it more inviting to readers
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
            <FlexColumn
              style={{
                marginTop: "-22px",
              }}
            >
              <Label
                htmlFor="credit"
                className="font-medium"
                note="Do you copy this article from anywhere?"
              >
                Credits
              </Label>
              <Input
                name="credit"
                id="credit"
                placeholder="Enter your credit"
                register={register}
              ></Input>
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                id="captcha"
                ref={recaptchaRef}
                onError={(error) => recaptchaRef.current?.reset()}
                onChange={handleVerifyCaptcha}
                style={{
                  marginTop: "12px",
                }}
              ></ReCAPTCHA>
            </FlexColumn>
            <FlexColumn
              style={{
                marginTop: "-22px",
              }}
            >
              <Label
                htmlFor="note"
                className="font-medium"
              >
                Notes:
              </Label>
              <Paragraph>
                - Thanks for using our services, your story will be reviewed by our team before being published, it will
                take about 2-3 hours please be patient 🤗
              </Paragraph>
              <Paragraph>
                - If your story is not published after 3 hours, please contact us via email: froggyblog@blog.com
              </Paragraph>
              <SignatureImage
                src={Signature}
                alt="Signature"
              />
            </FlexColumn>
          </LastRow>
          {!captchaToken ? (
            <Button
              type="button"
              className="!w-[300px] !mx-auto !block !outline-none !p-[13px] !rounded-xl !text-[16px] !font-medium"
              disabled
            >
              Submit your story
            </Button>
          ) : (
            <Button
              type="submit"
              className="!w-[300px] !mx-auto !block !bg-normalGreen !outline-none !border-none !text-white hover:!bg-normalGreenHover !p-[13px] !rounded-xl !text-[16px] !font-medium"
            >
              Submit your story
            </Button>
          )}
        </form>
      </NewStoryMain>
    </NewStoryPageWrapper>
  );
};

export default NewStoryPage;
