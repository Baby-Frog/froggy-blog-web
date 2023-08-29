import React from "react";
import Modal from "src/components/Modal";
import "./HomepageAuthenModal.scss";
import { FacebookIcon, GoogleIcon } from "src/components/Icon";
type THomepageAuthenModalProps = {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose?: () => void;
};

const HomepageAuthenModal = ({ handleClose, isOpen, setIsOpen }: THomepageAuthenModalProps) => {
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
            <span>Sign in with google</span>
          </button>
          <button className="modal-login-method modal-login-method--facebook">
            <FacebookIcon></FacebookIcon>
          </button>
        </div>
        <div className="modal-text">or continue with</div>
      </div>
    </Modal>
  );
};

export default HomepageAuthenModal;
