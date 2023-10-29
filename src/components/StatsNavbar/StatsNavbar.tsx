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

type TStatsNavbarProps = {
  title?: string;
};

const StatsNavbarContainer = styled.div<{ $hasTitle?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: ${(props) => (props.$hasTitle ? "static" : "fixed")};
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow:
    rgba(0, 0, 0, 0.05) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  padding: 24px;
  height: 65px;
  z-index: 1;
`;

const StatsNavbarLeft = styled.div`
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

const StatsNavbarRight = styled.div`
  display: flex;
  align-items: center;
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

const StatsNavbar = ({ title }: TStatsNavbarProps) => {
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
    <StatsNavbarContainer $hasTitle={Boolean(title)}>
      <div className="max-w-[1000px] w-full flex items-center justify-between">
        <StatsNavbarLeft>
          <Link
            to={path.HOMEPAGE}
            className="logo-wrapper"
          >
            <img
              src={Logo}
              alt="Logo"
            />
          </Link>
          {!isMobile && title && <div className="text-[24px] font-bold tracking-tighter">{title}</div>}
        </StatsNavbarLeft>
        <StatsNavbarRight>
          <BellIcon className="cursor-pointer"></BellIcon>
          <PopoverDismiss
            as="button"
            offsetPx={20}
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
                <StyledDropdownLink to={path.DASHBOARD}>
                  <DashboardIcon
                    width={24}
                    height={24}
                  ></DashboardIcon>
                  <span>Dashboard</span>
                </StyledDropdownLink>
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
            </UserAvatar>
          </PopoverDismiss>
        </StatsNavbarRight>
      </div>
    </StatsNavbarContainer>
  );
};

export default StatsNavbar;
