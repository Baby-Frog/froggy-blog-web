import { styled } from "styled-components";
import { path } from "src/constants/path";
import { NavLink } from "react-router-dom";
import Logo from "src/assets/logo-4.png";
import { useForm } from "react-hook-form";
import SearchIcon from "../Icon/SearchIcon";
import EditIcon from "../Icon/EditIcon";
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
    height: 24px;
    position: relative;

    .navbar-search-icon {
      position: absolute;
      width: 24px;
      height: 24px;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
    }

    .navbar-search-input {
      padding-left: 40px;
      height: 100%;
      width: 100%;
    }

    &::after {
      content: "";
      position: absolute;
      width: 50px;
      height: 1px;
      background-color: #ccc;
      transform: translateY(-50%) rotate(90deg);
      top: 50%;
      left: -16px;
    }
  }
`;

const AuthenticatedNavbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AuthenticatedNavbar = () => {
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
        <EditIcon
          width={24}
          height={24}
        ></EditIcon>
      </AuthenticatedNavbarRight>
    </AuthenticatedNavbarContainer>
  );
};

export default AuthenticatedNavbar;
