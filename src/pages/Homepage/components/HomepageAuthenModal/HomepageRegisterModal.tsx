import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { authApi } from "src/apis/auth.apis";
import Button from "src/components/Button";
import Input from "src/components/Input";
import Label from "src/components/Label";
import Modal from "src/components/Modal";
import { registerSchema } from "src/schemas/authentication.schemas";
import "./HomepageAuthenModal.scss";
import FacebookIcon from "src/components/Icon/FacebookIcon";
import GoogleIcon from "src/components/Icon/GoogleIcon";
import { isAxiosError } from "axios";
import { isUnprocessableEntityError } from "src/utils/isAxiosError";
import { TErrorApiResponse } from "src/types/response.types";
import { toast } from "react-toastify";
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from "react-google-recaptcha";
import SuccessToastIcon from "src/components/Icon/ToastIcon/SuccessToastIcon";
import { useState } from "react";

type THomepageRegisterModalProps = {
  isOpen?: boolean;
  handleClose?: () => void;
  setIsLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleToggleBetweenLoginAndRegister?: () => void;
};

type TRegisterForm = {
  fullName: string;
  email: string;
  password: string;
  rePassword: string;
  captcha?: string;
};

const HomepageRegisterModal = ({
  isOpen,
  handleClose,
  setIsLoginModal,
  handleToggleBetweenLoginAndRegister,
}: THomepageRegisterModalProps) => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<TRegisterForm>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(registerSchema),
  });
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const registerAccountMutation = useMutation({
    mutationFn: authApi.register,
  });

  const handleRegister = handleSubmit((data) => {
    registerAccountMutation.mutate(
      { ...data, captcha: captchaToken },
      {
        onSuccess: (data) => {
          setIsLoginModal(true);
          toast.success(data.data.message, {
            icon: <SuccessToastIcon></SuccessToastIcon>,
          });
        },
        onError: (error) => {
          if (
            isAxiosError<TErrorApiResponse<Record<keyof TRegisterForm, { message: string }>>>(error) &&
            isUnprocessableEntityError<TErrorApiResponse<Record<keyof TRegisterForm, { message: string }>>>(error)
          ) {
            const formError = error.response?.data.data;
            setError("email", { message: formError?.email.message });
            setError("password", { message: formError?.password.message });
            setError("rePassword", { message: formError?.rePassword.message });
          }
        },
      },
    );
  });
  const handleVerifyCaptcha = (value: string | null) => {
    setCaptchaToken(value ?? "");
  };
  return (
    <Modal
      handleClose={handleClose}
      isOpen={isOpen}
      maxWidth="466px"
    >
      <div className="modal-content">
        <h2 className="modal-heading">Sign up your account!</h2>
        <div className="modal-login-methods">
          <button className="modal-login-method modal-login-method--google">
            <GoogleIcon colored></GoogleIcon>
            <span>Sign up with Google</span>
          </button>
          <button className="modal-login-method modal-login-method--facebook">
            <FacebookIcon></FacebookIcon>
          </button>
        </div>
        <div className="modal-text">or continue with</div>
        <form
          onSubmit={handleRegister}
          noValidate
          autoComplete="on"
        >
          <Label htmlFor="fullName">Full name</Label>
          <Input
            name="fullName"
            containerClassName="mt-1"
            register={register}
            placeholder="Enter your full name"
            errorMsg={errors.fullName?.message}
          ></Input>
          <Label
            htmlFor="email"
            className="mt-2"
          >
            E-mail address
          </Label>
          <Input
            name="email"
            containerClassName="mt-1"
            register={register}
            placeholder="Enter your e-mail address"
            errorMsg={errors.email?.message}
          ></Input>
          <Label
            htmlFor="password"
            className="mt-2"
          >
            Password
          </Label>
          <Input
            type="password"
            id="password"
            name="password"
            containerClassName="mt-1"
            placeholder="Enter your password"
            register={register}
            errorMsg={errors.password?.message}
          />
          <Label
            htmlFor="rePassword"
            className="mt-2"
          >
            Confirm password
          </Label>
          <Input
            name="rePassword"
            type="password"
            containerClassName="mt-1"
            register={register}
            placeholder="Enter your confirm password"
            errorMsg={errors.rePassword?.message}
          ></Input>
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            id="captcha"
            hl="en"
            onChange={handleVerifyCaptcha}
            style={{
              marginTop: "12px",
            }}
          ></ReCAPTCHA>
          {!captchaToken ? (
            <Button
              disabled
              type="button"
            >
              Sign up
            </Button>
          ) : (
            <Button type="submit">Sign up</Button>
          )}
        </form>

        <div className="modal-toggle">
          <span>Already have an account?</span>
          <button
            className="modal-toggle-button"
            onClick={handleToggleBetweenLoginAndRegister}
          >
            Sign in
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default HomepageRegisterModal;
