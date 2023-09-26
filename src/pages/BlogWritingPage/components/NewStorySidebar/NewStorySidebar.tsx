import PointUpIcon from "src/components/Icon/PointUpIcon";
import { styled } from "styled-components/";
import $ from "jquery";
import { useContext, useEffect, useState } from "react";
import { motionValue, useScroll, useTransform } from "framer-motion";
import TickIcon from "src/components/Icon/TickIcon";

type TNewStorySidebarProps = {
  scrollY: number;
};

const NewStorySidebarWrapper = styled.div<{ $isScrolledDown?: boolean }>`
  height: max-content;
  width: 62px;
  padding: 32px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 12px;
  background-color: #fff;
  transition: all 350ms ease-in-out;

  border-radius: 12px;
  position: sticky;
  top: ${(props) => (props.$isScrolledDown ? "50%" : "0")};
  transform: ${(props) => (props.$isScrolledDown ? "translateY(-50%)" : "")};
  left: 0;
`;

const NewStorySidebarItem = styled.button<{ $isActive?: boolean; $backgroundColor?: string; $color?: string }>`
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
`;

const NewStorySidebar = () => {
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
    <NewStorySidebarWrapper $isScrolledDown={progress.get() >= 0.1}>
      <NewStorySidebarItem
        title="Scroll to top"
        onClick={handleScrollUp}
      >
        <PointUpIcon
          color="#000"
          width={24}
          height={24}
        ></PointUpIcon>
      </NewStorySidebarItem>
      <NewStorySidebarItem
        $color="#fff"
        $backgroundColor="#1DC071"
        onClick={handleScrollUp}
        title="Submit your story"
      >
        <TickIcon
          color="currentColor"
          width={24}
          height={24}
        ></TickIcon>
      </NewStorySidebarItem>
    </NewStorySidebarWrapper>
  );
};

export default NewStorySidebar;
