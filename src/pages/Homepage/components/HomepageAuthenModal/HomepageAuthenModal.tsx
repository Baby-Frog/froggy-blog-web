import Modal from "src/components/Modal";
import { FacebookIcon, GoogleIcon } from "src/components/Icon";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "src/schemas/authentication.schemas";
import "./HomepageAuthenModal.scss";
import Label from "src/components/Label";
import Input from "src/components/Input";
import Button from "src/components/Button";

type THomepageAuthenModalProps = {
  isOpen?: boolean;
  handleClose?: () => void;
};

type TLoginForm = {
  email: string;
  password: string;
  // rePassword: string;
};

const HomepageAuthenModal = ({ handleClose, isOpen }: THomepageAuthenModalProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TLoginForm>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(loginSchema),
  });
  const handleLogin = handleSubmit((data) => {
    console.log(data);
  });
  console.log(errors);
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
          <Label
            htmlFor="email"
            className="mb-1"
          >
            E-mail address
          </Label>
          <Input
            name="email"
            register={register}
            placeholder="Enter your e-mail address"
            errorMsg={errors.email?.message}
          ></Input>
          <Label
            htmlFor="password"
            className="mb-1"
          >
            Password
          </Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            register={register}
            errorMsg={errors.password?.message}
          />
          <Button type="submit">Sign in</Button>
        </form>
      </div>
    </Modal>
  );
};

export default HomepageAuthenModal;
