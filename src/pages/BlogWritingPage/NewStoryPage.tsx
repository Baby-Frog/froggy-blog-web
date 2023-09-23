import { styled } from "styled-components";
import NewStorySidebar from "./components/NewStorySidebar";
type TNewStoryPageProps = {
  something: string;
};

const NewStoryPageWrapper = styled.div`
  height: 300vh;
  position: relative;
  overflow: visible;
  display: flex;
`;

const NewStoryPage = () => {
  return (
    <NewStoryPageWrapper>
      <NewStorySidebar></NewStorySidebar>
    </NewStoryPageWrapper>
  );
};

export default NewStoryPage;
