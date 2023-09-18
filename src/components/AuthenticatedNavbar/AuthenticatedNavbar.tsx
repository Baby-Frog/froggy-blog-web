import { styled } from "styled-components";
import { path } from "src/constants/path";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "src/assets/logo-4.png";
import { useForm } from "react-hook-form";
import SearchIcon from "../Icon/SearchIcon";
import EditIcon from "../Icon/EditIcon";
import BellIcon from "../Icon/BellIcon";
import { useContext, useState } from "react";
import { AuthContext } from "src/contexts/auth.contexts";
import PopoverDismiss from "../PopoverDismiss";
import ChevronIcon from "../Icon/ChevronIcon";
import { useMutation } from "react-query";
import { authApi } from "src/apis/auth.apis";
import { getRefreshTokenFromLS } from "src/utils/auth";
import { toast } from "react-toastify";
import ProfileIcon from "../Icon/ProfileIcon";
import SettingIcon from "../Icon/SettingIcon";
import LogoutIcon from "../Icon/LogoutIcon";
import Divider from "../Divider";
import { hideEmail } from "src/utils/hideEmail";
import { useMedia } from "react-use";
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
  gap: 16px;
`;

const UserAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 80px;
  cursor: pointer;
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const UserDropdown = styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

const StyledDropdownLink = styled(Link)<{ $displayColumn?: boolean }>`
  font-size: 14px;
  font-weight: 400;
  display: flex;
  align-items: ${(props) => (props.$displayColumn ? "flex-start" : "center")};
  flex-direction: ${(props) => (props.$displayColumn ? "column" : "row")};
  gap: ${(props) => (props.$displayColumn ? "0px" : "12px")};
  padding: 8px 24px;
  color: ${(props) => props.theme.colors.lightGrey};
  &:hover {
    color: ${(props) => props.theme.colors.darkGrey};
  }
`;

const AuthenticatedNavbar = () => {
  const { userProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const isMobile = useMedia("(max-width: 767px)");
  const [popoverIsOpen, setPopoverIsOpen] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      toast.success("Logout successfully!");
      navigate(path.HOMEPAGE);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Oops! Something went wrong. Please try again later");
    },
  });
  const handleLogout = () => {
    logoutMutation.mutate({ refreshToken: getRefreshTokenFromLS() as string });
  };
  return (
    <AuthenticatedNavbarContainer>
      <AuthenticatedNavbarLeft>
        <div className="logo-wrapper">
          <img
            src={Logo}
            alt="Logo"
          />
        </div>
        {!isMobile && (
          <form className="navbar-search">
            <SearchIcon className="navbar-search-icon"></SearchIcon>

            <input
              type="text"
              placeholder="Search Froggy Blog"
              className="navbar-search-input"
            />
          </form>
        )}
      </AuthenticatedNavbarLeft>
      <AuthenticatedNavbarRight>
        {!isMobile ? (
          <div className="default-row default-row--grey cursor-pointer">
            <EditIcon
              width={24}
              height={24}
            ></EditIcon>
            <span>Write</span>
          </div>
        ) : (
          <SearchIcon variants="secondary"></SearchIcon>
        )}
        <BellIcon className="cursor-pointer"></BellIcon>
        <PopoverDismiss
          setIsOpen={setPopoverIsOpen}
          isOpen={popoverIsOpen}
          as="button"
          renderPopover={
            <UserDropdown>
              {isMobile && (
                <StyledDropdownLink to={path.NEWSTORY}>
                  <EditIcon
                    width={24}
                    height={24}
                  ></EditIcon>
                  <span>Write</span>
                </StyledDropdownLink>
              )}
              <StyledDropdownLink to={path.PROFILE}>
                <ProfileIcon
                  width={24}
                  height={24}
                  color="#000"
                ></ProfileIcon>
                <span>Profile</span>
              </StyledDropdownLink>
              <StyledDropdownLink to={path.SETTING}>
                <SettingIcon
                  width={24}
                  height={24}
                  color=""
                ></SettingIcon>
                <span>Settings</span>
              </StyledDropdownLink>
              <Divider></Divider>
              <StyledDropdownLink
                to={path.HOMEPAGE}
                onClick={handleLogout}
                $displayColumn
              >
                <div>Sign out</div>
                <div>{hideEmail(userProfile?.email)}</div>
              </StyledDropdownLink>
            </UserDropdown>
          }
          placement="bottom-start"
          sameWidthWithChildren={false}
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
