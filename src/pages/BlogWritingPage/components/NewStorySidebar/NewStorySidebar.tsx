import PointUpIcon from "src/components/Icon/PointUpIcon";
import { styled } from "styled-components/";
import $ from "jquery";
type TNewStorySidebarProps = {
  something: string;
};

const NewStorySidebarWrapper = styled.div`
  height: max-content;
  width: 76px;
  padding: 32px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 12px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.15) 2.95px 2.95px 3.8px;
  border-radius: 12px;
  position: sticky;
  top: 0;
  left: 0;
`;

const NewStorySidebarItem = styled.button<{ $isActive?: boolean }>`
  width: 44px;
  height: 44px;
  padding: 10px;
  border-radius: 12px;
  border: none;
  &:hover {
    background: rgba(255, 201, 71, 0.3);
    * {
      color: ${(props) => props.theme.colors.primary};
    }
  }
  &:last-of-type {
    transform: rotate(180deg);
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
  const handleScrollToBottom = () => {
    $("html, body").animate(
      {
        scrollTop: $(document).height(),
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
      <NewStorySidebarItem onClick={handleScrollToBottom}>
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
