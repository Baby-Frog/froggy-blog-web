import { useContext, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { authApi } from "src/apis/auth.apis";
import EditAvatarIcon from "src/components/Icon/EditAvatarIcon";
import ErrorToastIcon from "src/components/Icon/ToastIcon/ErrorToastIcon";
import InputFile from "src/components/InputFile";
import { AuthContext } from "src/contexts/auth.contexts";
import ReactDatePicker from "react-datepicker";
import { styled } from "styled-components";
import DefaultCoverImage from "src/assets/linkedin-default.png";
import ImageIcon from "src/components/Icon/ImageIcon";
import Label from "src/components/Label";
import Input from "src/components/Input";
import { useForm } from "react-hook-form";
import { TProfileSchema, profileSchema } from "src/schemas/profile.schema";
import Textarea from "src/components/Textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "src/components/Button";
import EmailIcon from "src/components/Icon/UserProfileIcon/EmailIcon";
import PhoneNumberIcon from "src/components/Icon/UserProfileIcon/PhoneNumberIcon";
import AddressIcon from "src/components/Icon/UserProfileIcon/AddressIcon";
import DateOfBirthIcon from "src/components/Icon/UserProfileIcon/DateOfBirthIcon";
import SuccessToastIcon from "src/components/Icon/ToastIcon/SuccessToastIcon";
import { imageApi } from "src/apis/image.apis";
const ProfileLeft = styled.div`
  width: calc(65% - 24px);
`;
const ProfileRight = styled.div`
  width: calc(35% - 24px);
`;

const AvatarWrapper = styled.div`
  position: relative;
  .edit-overlay {
    cursor: pointer;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: none;
    border-radius: 100rem;
  }

  &:hover .edit-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CoverImageWrapper = styled.div`
  position: relative;
  width: 100%;
  .edit-overlay {
    cursor: pointer;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: none;
  }

  &:hover .edit-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

const InputBlock = styled.div`
  display: block;
  margin-top: 24px;
`;

const THREE_MEGABYTE_TO_BYTES = 3 * 1024 * 1024;
const disabledYears = [2022, 2023];
const EditProfilePage = () => {
  const { userProfile } = useContext(AuthContext);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [previewAvatarFile, setPreviewAvatarFile] = useState<Blob>();
  const [previewCoverImageFile, setPreviewCoverImageFile] = useState<Blob>();
  const previewCoverImageURL = useMemo(() => {
    return previewCoverImageFile ? URL.createObjectURL(previewCoverImageFile) : userProfile?.coverImgPath;
  }, [previewCoverImageFile, userProfile?.coverImgPath]);
  const previewAvatarURL = useMemo(() => {
    return previewAvatarFile ? URL.createObjectURL(previewAvatarFile) : userProfile?.avatarPath;
  }, [previewAvatarFile, userProfile?.avatarPath]);
  const avatarInputFileRef = useRef<HTMLInputElement>(null);
  const coverImageInputFileRef = useRef<HTMLInputElement>(null);
  const { data: meData } = useQuery({
    queryKey: ["me"],
    queryFn: () => authApi.getMe(),
    refetchOnMount: true,
  });
  const me = meData?.data.data;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TProfileSchema>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      id: userProfile?.id || "",
      fullName: userProfile?.fullName || "",
      phoneNumber: userProfile?.phoneNumber || "",
      address: userProfile?.address || "",
      bio: userProfile?.bio || "",
      avatarPath: userProfile?.avatarPath || "",
      coverImgPath: userProfile?.coverImgPath || "",
    },
    resolver: yupResolver(profileSchema),
  });
  const queryClient = useQueryClient();
  const fullNameFormValue = watch("fullName");
  const bioFormValue = watch("bio");
  const addressFormValue = watch("address");
  const phoneNumberFormValue = watch("phoneNumber");
  const avatarFormValue = watch("avatarPath");
  const coverImageFormValue = watch("coverImgPath");
  const editProfileMutation = useMutation({
    mutationFn: authApi.updateMe,
  });
  const uploadImage = useMutation({
    mutationFn: imageApi.uploadImage,
  });
  const handleClickOnAvatarInput = () => {
    avatarInputFileRef.current?.click();
  };
  const handleClickOnCoverImageInput = () => {
    coverImageInputFileRef.current?.click();
  };
  const handleChangeCoverImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setPreviewCoverImageFile(fileFromLocal);
  };
  const handleChangeAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setPreviewAvatarFile(fileFromLocal);
  };
  const handleEditProfile = handleSubmit(async (data) => {
    let yourNewAvatar = avatarFormValue;
    let yourNewCoverImage = coverImageFormValue;
    if (previewAvatarFile) {
      const formData = new FormData();
      formData.append("file", previewAvatarFile);
      const uploadRes = await uploadImage.mutateAsync(formData);
      yourNewAvatar = uploadRes.data.data.urlImage;
      setValue("avatarPath", yourNewAvatar);
    }
    if (previewCoverImageFile) {
      const formData = new FormData();
      formData.append("file", previewCoverImageFile);
      const uploadRes = await uploadImage.mutateAsync(formData);
      yourNewCoverImage = uploadRes.data.data.urlImage;
      setValue("coverImgPath", yourNewCoverImage);
    }

    editProfileMutation.mutate(
      {
        ...data,
        birthDay: startDate.toISOString(),
        avatarPath: yourNewAvatar,
        coverImgPath: yourNewCoverImage,
        id: userProfile?.id as string,
        email: "",
      },
      {
        onSuccess: (data, variable) => {
          localStorage.setItem("user", JSON.stringify(variable));
          queryClient.invalidateQueries({ queryKey: ["me"] });
          toast.success("Edit profile successfully", {
            icon: <SuccessToastIcon></SuccessToastIcon>,
          });
        },
      },
    );
  });
  const isYearDisabled = (year: number) => {
    return disabledYears.includes(year);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderYearDropdownItem = (option: any, props: any) => {
    return (
      <option
        key={option}
        {...props}
        disabled={isYearDisabled(option)}
      >
        {option}
      </option>
    );
  };
  return (
    <>
      <form
        onSubmit={handleEditProfile}
        className="flex mt-10 gap-12 justify-between"
      >
        <ProfileLeft>
          {!me?.coverImgPath ? (
            <InputFile
              handleChangeFile={handleChangeCoverImageFile}
              handleClickOnInput={handleClickOnCoverImageInput}
              inputFileRef={coverImageInputFileRef}
              buttonClassName="w-full"
              className="w-full"
            >
              <CoverImageWrapper>
                <img
                  src={previewCoverImageURL || DefaultCoverImage}
                  alt=""
                  className="w-full h-[150px] object-cover object-center"
                />
                <div className="edit-overlay z-10 flex items-center justify-center gap-2">
                  <EditAvatarIcon
                    width={36}
                    height={36}
                    color="#fff"
                  ></EditAvatarIcon>
                  <span className="text-white font-medium">Change your banner</span>
                </div>
              </CoverImageWrapper>
            </InputFile>
          ) : (
            <InputFile
              handleChangeFile={handleChangeCoverImageFile}
              handleClickOnInput={handleClickOnCoverImageInput}
              inputFileRef={coverImageInputFileRef}
              buttonClassName="w-full"
              className="w-full"
            >
              <CoverImageWrapper>
                <img
                  src={previewCoverImageURL || me?.coverImgPath}
                  alt=""
                  className="w-full h-[150px] object-cover object-center"
                />
                <div className="edit-overlay z-10 flex items-center justify-center">
                  <ImageIcon
                    width={36}
                    height={36}
                    color="#fff"
                  ></ImageIcon>
                </div>
              </CoverImageWrapper>
            </InputFile>
          )}
          <h1 className="text-3xl font-bold mt-4">
            <span>Edit your profile 📝</span>
          </h1>

          <InputGroup>
            <div>
              <Label
                htmlFor="fullName"
                className="font-medium"
              >
                Full Name
              </Label>
              <Input
                name="fullName"
                id="fullName"
                placeholder="Enter your full name"
                register={register}
                errorMsg={errors.fullName?.message}
              ></Input>
            </div>
            <div>
              <Label
                htmlFor="phoneNumber"
                className="font-medium"
              >
                Phone Number
              </Label>
              <Input
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Enter your phone number"
                register={register}
                errorMsg={errors.phoneNumber?.message}
              ></Input>
            </div>
          </InputGroup>
          <InputGroup>
            <div>
              <Label
                htmlFor="address"
                className="font-medium"
              >
                Address
              </Label>
              <Input
                name="address"
                id="address"
                placeholder="Enter your address"
                register={register}
                errorMsg={errors.address?.message}
              ></Input>
            </div>
            <div>
              <Label
                htmlFor="address"
                className="font-medium"
              >
                Date Of Birth
              </Label>
              <ReactDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date as Date)}
                wrapperClassName="w-full h-[48px] bg-[#e7ecf3] rounded-md overflow-hidden"
                className="p-[10px_46px_10px_10px] text-sm font-medium w-full h-[48px] bg-[#e7ecf3] rounded-md border-2"
                dropdownMode="select"
                maxDate={new Date()}
                showYearDropdown
                showIcon
                shouldCloseOnSelect={false}
              ></ReactDatePicker>
            </div>
          </InputGroup>
          <InputBlock>
            <Textarea
              name="bio"
              register={register}
              placeholder="Enter your bio"
              errorMsg={errors.bio?.message}
            ></Textarea>
          </InputBlock>
          <Button
            type="submit"
            className="mb-10"
          >
            Submit
          </Button>
        </ProfileLeft>
        <ProfileRight>
          <InputFile
            handleChangeFile={handleChangeAvatarFile}
            handleClickOnInput={handleClickOnAvatarInput}
            inputFileRef={avatarInputFileRef}
          >
            <AvatarWrapper className="rounded-full object-cover w-[90px] h-[90px]">
              <img
                src={previewAvatarURL || me?.avatarPath}
                alt=""
                className="rounded-full object-cover w-full h-full"
              />
              <div className="edit-overlay flex items-center justify-center">
                <ImageIcon
                  width={36}
                  height={36}
                  color="#fff"
                ></ImageIcon>
              </div>
            </AvatarWrapper>
          </InputFile>
          <div className="mt-4 font-semibold">{fullNameFormValue || me?.fullName}</div>
          {bioFormValue ? (
            <div className="mt-1 font-normal break-words">{bioFormValue}</div>
          ) : (
            <div className="mt-1 font-light break-words">No bio</div>
          )}
          {me?.email && (
            <>
              <h5 className="mt-4 flex items-center gap-1 font-semibold">
                <EmailIcon
                  width={20}
                  height={20}
                  color="#6b6b6b"
                ></EmailIcon>
                <span>Email</span>
              </h5>
              <div className="mt-1 font-normal break-words">{me?.email}</div>
            </>
          )}
          <h5 className="mt-3 flex items-center gap-1 font-semibold">
            <PhoneNumberIcon
              width={18}
              height={18}
              color="#6b6b6b"
            ></PhoneNumberIcon>
            <span>Phone Number</span>
          </h5>
          {phoneNumberFormValue ? (
            <div className="mt-1 font-normal break-words">{phoneNumberFormValue}</div>
          ) : (
            <div className="mt-1 font-light break-words">Not updated yet</div>
          )}
          <h5 className="mt-3 flex items-center gap-1 font-semibold">
            <AddressIcon
              width={20}
              height={20}
              color="#6b6b6b"
            ></AddressIcon>
            <span>Address</span>
          </h5>
          {addressFormValue ? (
            <div className="mt-1 font-normal break-words">{addressFormValue}</div>
          ) : (
            <div className="mt-1 font-light break-words">Not updated yet</div>
          )}
          <h5 className="mt-3 flex items-center gap-1 font-semibold">
            <DateOfBirthIcon
              width={20}
              height={20}
              color="#6b6b6b"
            ></DateOfBirthIcon>
            <span>Date of birth</span>
          </h5>
          {me?.birthDay ? (
            <div className="mt-1 font-normal break-words">{me?.birthDay}</div>
          ) : (
            <div className="mt-1 font-light break-words">Not updated yet</div>
          )}
        </ProfileRight>
      </form>
    </>
  );
};

export default EditProfilePage;
