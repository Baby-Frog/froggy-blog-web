import { styled } from "styled-components";
import NewStorySidebar from "./components/NewStorySidebar";
import NewStoryMain from "./components/NewStoryMain";
type TNewStoryPageProps = {
  something: string;
};

const NewStoryPageWrapper = styled.div`
  height: 200vh;
  position: relative;
  overflow: visible;
  display: flex;
  gap: 96px;
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
