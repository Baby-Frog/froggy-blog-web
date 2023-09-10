import { useState } from "react";
import "./HomepageAuthenModal.scss";
import HomepageLoginModal from "./HomepageLoginModal";
import HomepageRegisterModal from "./HomepageRegisterModal";
type THomepageAuthenModalProps = {
  isOpen?: boolean;
  handleClose?: () => void;
};

const HomepageAuthenModal = ({ handleClose, isOpen }: THomepageAuthenModalProps) => {
  const [isLoginModal, setIsLoginModal] = useState<boolean>(true);
  const handleToggleBetweenLoginAndRegister = () => {
    setIsLoginModal(!isLoginModal);
  };
  return (
    <>
      {isLoginModal ? (
        <HomepageLoginModal
          handleClose={handleClose}
          isOpen={isOpen}
          handleToggleBetweenLoginAndRegister={handleToggleBetweenLoginAndRegister}
        ></HomepageLoginModal>
      ) : (
        <HomepageRegisterModal
          handleClose={handleClose}
          setIsLoginModal={setIsLoginModal}
          isOpen={isOpen}
          handleToggleBetweenLoginAndRegister={handleToggleBetweenLoginAndRegister}
        ></HomepageRegisterModal>
      )}
    </>
  );
};

export default HomepageAuthenModal;
