import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "src/assets/logo-4.png";
import { path } from "src/constants/path";
import HomepageAuthenModal from "src/pages/Homepage/components/HomepageAuthenModal/HomepageAuthenModal";
import { styled } from "styled-components";

const MainNavbarWrapper = styled.div`
  background-color: #fff;
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
    gap: 12px;
    img {
      width: 50px;
      height: 50px;
      object-fit: cover;
    }
    .main-navbar-title {
      font-weight: 700;
      font-size: 32px;
      letter-spacing: -2px;
      /* font-family: "Noe Display"; */
      color: #000;
    }
    @media screen and (max-width: 600px) {
      .main-navbar-title {
        display: none;
      }
    }
  }
  .main-navbar-content {
  }
  .main-navbar-list {
    display: flex;
    gap: 36px;
    align-items: center;
    .main-navbar-item {
      color: #000;
      font-weight: 500;
      &--button {
        background: ${(props) => props.theme.colors.normalGreen};
        border-radius: 24px;
        color: #fff;
        padding: 6px 8px;
        width: 150px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          background: ${(props) => props.theme.colors.normalGreenHover};
        }
      }
      @media screen and (max-width: 767px) {
        &:nth-of-type(1),
        &:nth-of-type(2) {
          display: none;
        }
      }
    }
  }
`;

const MainNavbar = () => {
  // Khi xuống mobile thì navbar sẽ là một component hoàn toàn khác => đỡ suy nghĩ CSS responsive đau đầu
  // const isMobile = useMedia("(max-width:767px)");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  return (
    <MainNavbarWrapper>
      <div className="main-navbar">
        <Link
          to={path.HOMEPAGE}
          className="main-navbar-logo"
        >
          <img
            src={Logo}
            alt="Logo"
          />
          <span className="main-navbar-title">Froggy Blog</span>
        </Link>
        <div className="main-navbar-content">
          <ul className="main-navbar-list">
            <li className="main-navbar-item">
              <NavLink to={path.HOMEPAGE}>Story</NavLink>
            </li>
            <li className="main-navbar-item">
              <NavLink to={path.HOMEPAGE}>About</NavLink>
            </li>
            <li
              className="main-navbar-item--button"
              onClick={() => setModalIsOpen(true)}
              aria-hidden
            >
              <button type="button">Start Writing</button>
            </li>
          </ul>
        </div>
      </div>
      <HomepageAuthenModal
        handleClose={() => setModalIsOpen(false)}
        isOpen={modalIsOpen}
      ></HomepageAuthenModal>
    </MainNavbarWrapper>
  );
};

export default MainNavbar;
