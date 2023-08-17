import { NavLink } from "react-router-dom";
import Logo from "src/assets/logo-2.png";
import { path } from "src/constants/path";
import { styled } from "styled-components";
import { useMedia } from "react-use";
const MainNavbarWrapper = styled.div`
  background-color: ${(props) => props.theme.primaryGreen};
  border-bottom: 1px solid #000;
  .main-navbar {
    max-width: 1320px;
    width: 100%;
    padding: 12px 24px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .main-navbar-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    img {
      width: 50px;
      height: 50px;
      object-fit: cover;
    }
    .main-navbar-title {
      font-weight: 700;
      font-size: 24px;
      font-family: "Noe Display";
      color: #fff;
    }
  }
  .main-navbar-content {
  }
  .main-navbar-list {
    display: flex;
    gap: 36px;
    align-items: center;
    .main-navbar-item {
      color: #fff;
      font-weight: 500;
      &--button {
        background: #fff;
        border-radius: 24px;
        color: #000;
        padding: 6px 8px;
        width: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "Pacifico";
      }
    }
  }
`;

const MainNavbar = () => {
  // Khi xuống mobile thì navbar sẽ là một component hoàn toàn khác => đỡ suy nghĩ CSS responsive đau đầu
  const isMobile = useMedia("(max-width:767px)");
  return (
    <MainNavbarWrapper>
      <div className="main-navbar">
        <div className="main-navbar-logo">
          <img
            src={Logo}
            alt="Logo"
          />
          <span className="main-navbar-title">Froggy Blog</span>
        </div>
        <div className="main-navbar-content">
          <ul className="main-navbar-list">
            <li className="main-navbar-item">
              <NavLink to={path.HOMEPAGE}>Story</NavLink>
            </li>
            <li className="main-navbar-item">
              <NavLink to={path.HOMEPAGE}>About</NavLink>
            </li>
            <li className="main-navbar-item">
              <NavLink to={path.HOMEPAGE}>Sign in</NavLink>
            </li>
            <li className="main-navbar-item--button">
              <NavLink to={path.HOMEPAGE}>Start Writing</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </MainNavbarWrapper>
  );
};

export default MainNavbar;
