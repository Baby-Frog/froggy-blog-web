import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useMedia from "react-use/lib/useMedia";
import { authApi } from "src/apis/auth.apis";
import Logo from "src/assets/logo-4.png";
import { path } from "src/constants/path";
import { AuthContext } from "src/contexts/auth.contexts";
import { getRefreshTokenFromLS } from "src/utils/auth";
import { hideEmail } from "src/utils/hideEmail";
import { styled } from "styled-components";
import Divider from "../Divider";
import BellIcon from "../Icon/BellIcon";
import ChevronIcon from "../Icon/ChevronIcon";
import EditIcon from "../Icon/EditIcon";
import ProfileIcon from "../Icon/ProfileIcon";
import SearchIcon from "../Icon/SearchIcon";
import SettingIcon from "../Icon/SettingIcon";
import SuccessToastIcon from "../Icon/ToastIcon/SuccessToastIcon";
import PopoverDismiss from "../PopoverDismiss";
import StatsIcon from "../Icon/StatsIcon";
import DashboardIcon from "../Icon/DashboardIcon";

type TAuthenticatedNavbarProps = {
  title?: string;
};

const AuthenticatedNavbarContainer = styled.div<{ $hasTitle?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: ${(props) => (props.$hasTitle ? "static" : "fixed")};
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding: 24px;
  height: 60px;
  z-index: 1;
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
      background-color: #f9f9f9;
      border-radius: 32px;
      &::placeholder {
        color: ${(props) => props.theme.colors.normalGrey};
      }
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
    border: 1px solid black;
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

const StyledDropdownLogout = styled(Link)<{ $displayColumn?: boolean }>`
  font-size: 14px;
  font-weight: 400;
  display: flex;
  align-items: ${(props) => (props.$displayColumn ? "flex-start" : "center")};
  flex-direction: ${(props) => (props.$displayColumn ? "column" : "row")};
  gap: ${(props) => (props.$displayColumn ? "0px" : "12px")};
  padding: 0px 24px 8px 24px;
  color: ${(props) => props.theme.colors.lightGrey};
  &:hover {
    color: ${(props) => props.theme.colors.darkGrey};
  }
`;

const AuthenticatedNavbar = ({ title }: TAuthenticatedNavbarProps) => {
  const { userProfile } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const isMobile = useMedia("(max-width: 767px)");
  const { data: meData } = useQuery({
    queryKey: ["me"],
    queryFn: () => authApi.getMe(),
  });
  const me = meData?.data.data;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      toast.success("Logout successfully!", {
        icon: <SuccessToastIcon></SuccessToastIcon>,
      });
      navigate(path.HOMEPAGE);
      queryClient.resetQueries({ queryKey: ["infiniteStories"] });
    },
    onError: () => {
      toast.error("Oops! Something went wrong. Please try again later");
    },
  });
  const handleLogout = () => {
    logoutMutation.mutate({ refreshToken: getRefreshTokenFromLS() as string });
  };
  const handleSearch = handleSubmit((data) => {
    navigate({
      pathname: path.SEARCH,
      search: createSearchParams({
        q: data.search,
      }).toString(),
    });
  });
  return (
    <AuthenticatedNavbarContainer $hasTitle={Boolean(title)}>
      <AuthenticatedNavbarLeft>
        <Link
          to={path.HOMEPAGE}
          className="logo-wrapper"
        >
          <img
            src={Logo}
            alt="Logo"
          />
        </Link>
        {!isMobile && !title && (
          <form
            className="navbar-search"
            onSubmit={handleSearch}
          >
            <SearchIcon className="navbar-search-icon"></SearchIcon>
            <input
              type="text"
              placeholder="Search"
              className="navbar-search-input"
              {...register("search")}
            />
          </form>
        )}
        {!isMobile && title && <div className="text-[24px] font-[Pacifico] font-medium tracking-wide">{title}</div>}
      </AuthenticatedNavbarLeft>
      <AuthenticatedNavbarRight>
        {!isMobile ? (
          <Link
            to={path.NEWSTORY}
            className="default-row default-row--grey cursor-pointer"
          >
            <EditIcon
              width={24}
              height={24}
            ></EditIcon>
            <span>Write</span>
          </Link>
        ) : (
          <SearchIcon variants="secondary"></SearchIcon>
        )}
        <BellIcon className="cursor-pointer"></BellIcon>
        <PopoverDismiss
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
              <StyledDropdownLink to={path.STATISTICS}>
                <StatsIcon
                  width={24}
                  height={24}
                ></StatsIcon>
                <span>Stats</span>
              </StyledDropdownLink>
              {userProfile?.roles.includes("ADMINISTRATOR") && (
                <StyledDropdownLink to={path.DASHBOARD}>
                  <DashboardIcon
                    width={24}
                    height={24}
                  ></DashboardIcon>
                  <span>Dashboard</span>
                </StyledDropdownLink>
              )}
              <Divider></Divider>
              <StyledDropdownLink
                to={path.SETTING}
                $displayColumn
              >
                <div>Settings</div>
              </StyledDropdownLink>
              <StyledDropdownLogout
                to={path.HOMEPAGE}
                onClick={handleLogout}
                $displayColumn
              >
                <div>Sign out</div>
                <div>{hideEmail(me?.email)}</div>
              </StyledDropdownLogout>
            </UserDropdown>
          }
          placement="bottom-end"
          sameWidthWithChildren={false}
        >
          <UserAvatar>
            <img
              src={me?.avatarPath}
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
