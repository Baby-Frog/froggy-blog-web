import React from "react";
import Modal from "src/components/Modal";
import { FacebookIcon, GoogleIcon } from "src/components/Icon";
import { SubmitHandler, useForm } from "react-hook-form";
import "./HomepageAuthenModal.scss";

type THomepageAuthenModalProps = {
  isOpen?: boolean;
  handleClose?: () => void;
};

type TLoginForm = {
  email: string;
  password: string;
  rePassword: string;
};

const HomepageAuthenModal = ({ handleClose, isOpen }: THomepageAuthenModalProps) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const handleLogin: SubmitHandler<TLoginForm> = (data) => {
    console.log(data);
  };
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
        <form onSubmit={handleSubmit(handleLogin)}></form>
      </div>
    </Modal>
  );
};

export default HomepageAuthenModal;
