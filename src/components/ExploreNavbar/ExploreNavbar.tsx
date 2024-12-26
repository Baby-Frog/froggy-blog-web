import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useMedia from "react-use/lib/useMedia";
import { authApi } from "src/apis/auth.apis";
import Logo from "src/assets/logo-4.png";
import UnauthenticatedAvatar from "src/assets/unauthen-avatar.png";
import { path } from "src/constants/path";
import HomepageAuthenModal from "src/pages/Homepage/components/HomepageAuthenModal/HomepageAuthenModal";
import { getRefreshTokenFromLS } from "src/utils/auth";
import { styled } from "styled-components";
import SearchIcon from "../Icon/SearchIcon";
import SuccessToastIcon from "../Icon/ToastIcon/SuccessToastIcon";
import PopoverDismiss from "../PopoverDismiss";

type TAuthenticatedNavbarProps = {
  title?: string;
};

const ExploreNavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  padding: 24px;
  height: 60px;
  z-index: 1;
`;

const ExploreNavbarLeft = styled.div`
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

const ExploreNavbarRight = styled.div`
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

const ExploreNavbar = ({ title }: TAuthenticatedNavbarProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const isMobile = useMedia("(max-width: 767px)");
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
    <ExploreNavbarContainer>
      <ExploreNavbarLeft>
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
      </ExploreNavbarLeft>
      <ExploreNavbarRight>
        <button
          onClick={() => setModalIsOpen(true)}
          className="cursor-pointer text-sm text-normalGreen hover:text-normalGreenHover"
          aria-hidden
        >
          Sign in
        </button>
        <PopoverDismiss
          as="button"
          renderPopover={<UserDropdown></UserDropdown>}
          placement="bottom-start"
          sameWidthWithChildren={false}
        >
          <UserAvatar>
            <img
              src={UnauthenticatedAvatar}
              alt="Avatar"
            />
          </UserAvatar>
        </PopoverDismiss>
      </ExploreNavbarRight>
      <HomepageAuthenModal
        handleClose={() => setModalIsOpen(false)}
        isOpen={modalIsOpen}
      ></HomepageAuthenModal>
    </ExploreNavbarContainer>
  );
};

export default ExploreNavbar;
