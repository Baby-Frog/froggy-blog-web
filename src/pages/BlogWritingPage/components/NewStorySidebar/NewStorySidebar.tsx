import PointUpIcon from "src/components/Icon/PointUpIcon";
import { styled } from "styled-components/";
import $ from "jquery";
type TNewStorySidebarProps = {
  something: string;
};

const NewStorySidebarWrapper = styled.div`
  height: max-content;
  width: 76px;
  padding: 40px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 30px;
  background-color: #fff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 12px;
  position: sticky;
  top: 0;
  left: 0;
`;

const NewStorySidebarItem = styled.button<{ $isActive?: boolean }>`
  width: 44px;
  height: 44px;
  padding: 10px;
  background-color: #fff;
  border-radius: 12px;
  border: none;
  &:hover {
    background: rgba(255, 201, 71, 0.3);
    * {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

const NewStorySidebar = () => {
  const handleScrollUp = () => {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      400,
    );
  };
  return (
    <NewStorySidebarWrapper>
      <NewStorySidebarItem onClick={handleScrollUp}>
        <PointUpIcon
          color="#000"
          width={24}
          height={24}
        ></PointUpIcon>
      </NewStorySidebarItem>
    </NewStorySidebarWrapper>
  );
};

export default NewStorySidebar;
