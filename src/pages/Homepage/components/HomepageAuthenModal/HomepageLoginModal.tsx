import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "src/components/Button";
import Input from "src/components/Input";
import Label from "src/components/Label";
import Modal from "src/components/Modal";
import { loginSchema } from "src/schemas/authentication.schemas";
import "./HomepageAuthenModal.scss";
import GoogleIcon from "src/components/Icon/GoogleIcon";
import FacebookIcon from "src/components/Icon/FacebookIcon";
import { useMutation } from "react-query";
import { authApi } from "src/apis/auth.apis";
import { useContext, useMemo } from "react";
import { isAxiosError } from "axios";
import { isUnprocessableEntityError } from "src/utils/isAxiosError";
import { TErrorApiResponse } from "src/types/response.types";
import { AuthContext } from "src/contexts/auth.contexts";

type THomepageAuthenModalProps = {
  isOpen?: boolean;
  handleClose?: () => void;
  handleToggleBetweenLoginAndRegister?: () => void;
};

type TLoginForm = {
  email: string;
  password: string;
};

const HomepageLoginModal = ({
  handleClose,
  isOpen,
  handleToggleBetweenLoginAndRegister,
}: THomepageAuthenModalProps) => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<TLoginForm>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(loginSchema),
  });
  const loginAccountMutation = useMutation({
    mutationFn: authApi.login,
  });
  const handleLogin = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true);
      },
      onError: (error) => {
        if (
          isAxiosError<TErrorApiResponse<TLoginForm>>(error) &&
          isUnprocessableEntityError<TErrorApiResponse<TLoginForm>>(error)
        ) {
          // console.log("Error!");
          const formError = error.response?.data.message;
          setError("email", { message: formError });
          setError("password", { message: formError });
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
        <h2 className="modal-heading">Welcome back!</h2>
        <div className="modal-login-methods">
          <button className="modal-login-method modal-login-method--google">
            <GoogleIcon colored></GoogleIcon>
            <span>Sign in with Google</span>
          </button>
          <button className="modal-login-method modal-login-method--facebook">
            <FacebookIcon></FacebookIcon>
          </button>
        </div>
        <div className="modal-text">or continue with</div>
        <form
          onSubmit={handleLogin}
          noValidate
          autoComplete="on"
        >
          <Label htmlFor="email">E-mail address</Label>
          <Input
            type="email"
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
          <Button type="submit">Sign in</Button>
        </form>
        <div className="modal-toggle">
          <span>Don't have an account?</span>
          <button
            className="modal-toggle-button"
            onClick={handleToggleBetweenLoginAndRegister}
          >
            Sign up
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default HomepageLoginModal;
