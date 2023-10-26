import { motionValue, useTransform } from "framer-motion";
import $ from "jquery";
import { useEffect, useState } from "react";
import PointUpIcon from "src/components/Icon/PointUpIcon";
import RewindIcon from "src/components/Icon/RewindIcon";
import TickIcon from "src/components/Icon/TickIcon";
import { styled } from "styled-components/";

type TNewStorySidebarProps = {
  captchaToken?: string;
  handleResetForm: () => void;
  handleEditStory: (e?: React.BaseSyntheticEvent<object, unknown, unknown> | undefined) => Promise<void>;
};

const EditStorySidebarWrapper = styled.div<{ $isScrolledDown?: boolean }>`
  height: max-content;
  width: 62px;
  padding: 32px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background-color: transparent;
  transition: all 350ms ease-in-out;
  border-radius: 12px;
  position: sticky;
  top: ${(props) => (props.$isScrolledDown ? "35%" : "0")};
  transform: ${(props) => (props.$isScrolledDown ? "translate(40px, -50%)" : "translate(40px, 0)")};
  left: 0;
  @media screen and (max-width: 767px) {
    position: fixed;
    gap: 8px;
    z-index: 999;
    top: 0;
    transform: unset;
    left: 0;
  }
`;

const EditStorySidebarItem = styled.button<{ $isActive?: boolean; $backgroundColor?: string; $color?: string }>`
  width: 47px;
  height: 47px;
  padding: 10px;
  border-radius: 12px;
  border: none;
  background: ${(props) => props.$backgroundColor || "#fff"};
  color: ${(props) => props.$color || "#000"};
  transition: all 250ms cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  &:hover {
    transform: translateY(-4px);
    box-shadow:
      rgba(50, 50, 93, 0.45) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.55) 0px 8px 16px -8px;
  }
  @media screen and (max-width: 767px) {
    width: 36px;
    height: 36px;
  }
`;

const EditStorySidebar = ({ handleResetForm, handleEditStory, captchaToken }: TNewStorySidebarProps) => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const progress = useTransform(motionValue(scrollY), [0, document.body.offsetHeight], [0, 1]);
  const handleScrollUp = () => {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      400,
    );
  };

  return (
    <EditStorySidebarWrapper $isScrolledDown={progress.get() >= 0.1}>
      <EditStorySidebarItem
        title="Scroll to top"
        onClick={handleScrollUp}
      >
        <PointUpIcon
          color="#000"
          width={24}
          height={24}
        ></PointUpIcon>
      </EditStorySidebarItem>
      {captchaToken ? (
        <EditStorySidebarItem
          $color="#fff"
          $backgroundColor="#1DC071"
          onClick={handleEditStory}
          title="Submit your story"
        >
          <TickIcon
            color="currentColor"
            width={24}
            height={24}
          ></TickIcon>
        </EditStorySidebarItem>
      ) : (
        <EditStorySidebarItem
          $color="#fff"
          $backgroundColor="#B1B5C3"
          style={{
            cursor: "not-allowed",
          }}
          title="Submit your story"
        >
          <TickIcon
            color="currentColor"
            width={24}
            height={24}
          ></TickIcon>
        </EditStorySidebarItem>
      )}
      <EditStorySidebarItem
        $color="#fff"
        $backgroundColor="#EB5757"
        onClick={handleResetForm}
        title="Reset"
      >
        <RewindIcon
          width={24}
          height={24}
          color="currentColor"
        ></RewindIcon>
      </EditStorySidebarItem>
    </EditStorySidebarWrapper>
  );
};

export default EditStorySidebar;
