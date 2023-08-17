import { NavLink } from "react-router-dom";
import Logo from "src/assets/logo.png";
import { path } from "src/constants/path";
import { styled } from "styled-components";

const MainNavbarWrapper = styled.div`
  background-color: white;
  border-bottom: 2px solid #ccc;
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
    width: 70px;
    height: 70px;
    object-fit: cover;
  }
`;

const MainNavbar = () => {
  return (
    <MainNavbarWrapper>
      <div className="main-navbar">
        <div className="main-navbar-logo">
          <img
            src={Logo}
            alt="Logo"
          />
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
              <NavLink to={path.HOMEPAGE}>About</NavLink>
            </li>
            <li className="main-navbar-item">
              <NavLink to={path.HOMEPAGE}>About</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </MainNavbarWrapper>
  );
};

export default MainNavbar;
