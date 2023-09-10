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

type THomepageRegisterModalProps = {
  isOpen?: boolean;
  handleClose?: () => void;
  handleToggleBetweenLoginAndRegister?: () => void;
};

type TRegisterForm = {
  email: string;
  password: string;
  rePassword: string;
};

const HomepageRegisterModal = ({
  handleClose,
  isOpen,
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
  const registerAccountMutation = useMutation({
    mutationFn: authApi.register,
  });
  const handleRegister = handleSubmit((data) => {
    registerAccountMutation.mutate(data, {
      onSuccess: (data) => {},
      onError: (error) => {
        if (
          isAxiosError<TErrorApiResponse<TRegisterForm>>(error) &&
          isUnprocessableEntityError<TErrorApiResponse<TRegisterForm>>(error)
        ) {
          const formError = error.response?.data.message;
          setError("email", { message: formError });
        }
      },
    });
  });
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
          <Label htmlFor="email">E-mail address</Label>
          <Input
            name="email"
            containerClassName="mt-1"
            register={register}
            placeholder="Enter your e-mail address"
            errorMsg={errors.email?.message}
          ></Input>
          <Label
            htmlFor="password"
            className="mt-1"
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
            className="mt-1"
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
          <Button type="submit">Sign up</Button>
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
