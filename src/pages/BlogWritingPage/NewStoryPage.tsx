import { styled } from "styled-components";
import NewStorySidebar from "./components/NewStorySidebar";
import NewStoryMain from "./components/NewStoryMain";
type TNewStoryPageProps = {
  something: string;
};

const NewStoryPageWrapper = styled.div`
  position: relative;
  overflow: visible;
  display: flex;
  gap: 32px;
`;

const NewStoryPage = () => {
  return (
    <NewStoryPageWrapper>
      <NewStorySidebar></NewStorySidebar>
      <NewStoryMain></NewStoryMain>
    </NewStoryPageWrapper>
  );
};

export default NewStoryPage;
