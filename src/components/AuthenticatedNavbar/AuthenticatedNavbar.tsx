import { styled } from "styled-components";
import { path } from "src/constants/path";
import { NavLink } from "react-router-dom";
import Logo from "src/assets/logo-4.png";
import { useForm } from "react-hook-form";
import SearchIcon from "../Icon/SearchIcon";
import EditIcon from "../Icon/EditIcon";
import BellIcon from "../Icon/BellIcon";
import { useContext, useState } from "react";
import { AuthContext } from "src/contexts/auth.contexts";
import PopoverDismiss from "../PopoverDismiss";
import ChevronIcon from "../Icon/ChevronIcon";
type TAuthenticatedNavbarProps = {
  something: string;
};

const AuthenticatedNavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  height: 80px;
`;

const AuthenticatedNavbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  .logo-wrapper {
    width: 50px;
    height: 50px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .navbar-search {
    width: 276px;
    height: 50px;
    position: relative;

    .navbar-search-icon {
      position: absolute;
      width: 24px;
      height: 24px;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      path,
      circle {
        stroke: ${(props) => props.theme.colors.lightGrey};
      }
    }

    .navbar-search-input {
      padding: 12px 12px 12px 40px;
      height: 100%;
      width: 100%;
      background-color: #f0f0f0;
      border-radius: 16px;
    }
  }
`;

const AuthenticatedNavbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserAvatar = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 80px;
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const AuthenticatedNavbar = () => {
  const { userProfile } = useContext(AuthContext);
  const [popoverIsOpen, setPopoverIsOpen] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  return (
    <AuthenticatedNavbarContainer>
      <AuthenticatedNavbarLeft>
        <div className="logo-wrapper">
          <img
            src={Logo}
            alt="Logo"
          />
        </div>
        <form className="navbar-search">
          <SearchIcon className="navbar-search-icon"></SearchIcon>
          <input
            type="text"
            placeholder="Search Froggy Blog"
            className="navbar-search-input"
          />
        </form>
      </AuthenticatedNavbarLeft>
      <AuthenticatedNavbarRight>
        <div className="default-row default-row--grey cursor-pointer">
          <EditIcon
            width={24}
            height={24}
          ></EditIcon>
          <span>Write</span>
        </div>
        <BellIcon></BellIcon>
        <PopoverDismiss
          setIsOpen={setPopoverIsOpen}
          isOpen={popoverIsOpen}
          as="button"
          renderPopover={<div className="bg-gray-300 flex flex-col items-center justify-center">Sign out</div>}
          placement="bottom"
          enableArrow
        >
          <UserAvatar>
            <img
              src={userProfile?.avatarPath}
              alt="Avatar"
            />
            <ChevronIcon></ChevronIcon>
          </UserAvatar>
        </PopoverDismiss>
      </AuthenticatedNavbarRight>
    </AuthenticatedNavbarContainer>
  );
};

export default AuthenticatedNavbar;
