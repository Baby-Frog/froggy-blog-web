import React from "react";
import { useForm } from "react-hook-form";
import ExploreIcon from "src/components/Icon/ExploreIcon";
import SearchIcon from "src/components/Icon/SearchIcon";
import { styled } from "styled-components";

type TExplorePageProps = {
  something: string;
};

const ExploreSelection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 16px;
  overflow: hidden;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 120px;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.75) 25%,
      rgba(255, 255, 255, 0.9) 50%,
      rgba(255, 255, 255, 1) 75%
    );
  }
`;

const ExploreTopicsButton = styled.button`
  background-color: ${(props) => props.theme.colors.whiteF2};
  padding: 8px 12px 8px 8px;
  border: 1px solid ${(props) => props.theme.colors.darkGrey};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  gap: 8px;
  height: 38px;
  flex-shrink: 0;
  font-weight: 500;
  cursor: pointer;
`;

const ExploreSelectionList = styled.div`
  height: 38px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

const ExploreSelectionItem = styled.button`
  background-color: ${(props) => props.theme.colors.whiteF2};
  padding: 8px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 38px;
  border-radius: 24px;
  cursor: pointer;
`;

const ExploreHeading = styled.h1`
  font-size: 42px;
  font-weight: 600;
  text-align: center;
  margin-top: 48px;
`;

const ExploreInputWrapper = styled.form`
  background-color: #f9f9f9;
  position: relative;
  padding: 12px 16px;
  border-radius: 36px;
  margin: 32px auto 0;
  width: 624px;
`;

const ExploreInputElemet = styled.input`
  padding: 12px 16px 12px 32px;
  background-color: inherit;
`;

const ExploreInputIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ExplorePage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  // const something = useMemo(() => {
  //   if (window.location.pathname === path.HOMEPAGE) {
  //     return "3";
  //   }
  // }, []);
  return (
    <>
      <ExploreSelection>
        <ExploreTopicsButton>
          <ExploreIcon></ExploreIcon>
          <span>Explore topics</span>
        </ExploreTopicsButton>
        <ExploreSelectionList>
          <ExploreSelectionItem>Life</ExploreSelectionItem>
          <ExploreSelectionItem>Software Engineering</ExploreSelectionItem>
          <ExploreSelectionItem>Adoption</ExploreSelectionItem>
          <ExploreSelectionItem>UX</ExploreSelectionItem>
          <ExploreSelectionItem>Storytelling</ExploreSelectionItem>
          <ExploreSelectionItem>Hierachy</ExploreSelectionItem>
          <ExploreSelectionItem>Programming</ExploreSelectionItem>
          <ExploreSelectionItem>Esport</ExploreSelectionItem>
          <ExploreSelectionItem>League Of Legends</ExploreSelectionItem>
          <ExploreSelectionItem>Tips and Tricks</ExploreSelectionItem>
          <ExploreSelectionItem>Dota 2</ExploreSelectionItem>
        </ExploreSelectionList>
      </ExploreSelection>
      <ExploreHeading>Explore topics</ExploreHeading>
      <ExploreInputWrapper>
        <ExploreInputElemet
          placeholder="Search for topics"
          {...register}
        ></ExploreInputElemet>
        <ExploreInputIcon>
          <SearchIcon
            width={24}
            height={24}
            color="#6b6b6b"
          ></SearchIcon>
        </ExploreInputIcon>
      </ExploreInputWrapper>
    </>
  );
};

export default ExplorePage;
