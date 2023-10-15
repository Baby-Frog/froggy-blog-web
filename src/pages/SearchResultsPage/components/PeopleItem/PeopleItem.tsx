import React from "react";
import { Link } from "react-router-dom";
import { TUserProfile } from "src/types/user.types";
import { styled } from "styled-components";

type TPeopleItemProps = {
  user: TUserProfile;
};

const PeopleItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 150px;
  padding: 32px 16px;
  border-bottom: 1px solid ${(props) => props.theme.colors.whiteF2};
`;

const PeopleItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-shrink: 0;
`;

const PeopleItemAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 100rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PeopleItemFullName = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const GoToProfileButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  padding: 8px 16px;
  background-color: ${(props) => props.theme.colors.normalGreen};
  font-weight: 500;
  border-radius: 24px;
  flex-shrink: 0;
  color: #fff;
  &:hover {
    background-color: ${(props) => props.theme.colors.normalGreenHover};
    color: #fff !important;
  }
`;

const PeopleItem = ({ user }: TPeopleItemProps) => {
  return (
    <PeopleItemWrapper>
      <PeopleItemLeft>
        <PeopleItemAvatar>
          <img
            src={user.avatarPath}
            alt={user.fullName}
          />
        </PeopleItemAvatar>
        <PeopleItemFullName>{user.fullName}</PeopleItemFullName>
      </PeopleItemLeft>
      <GoToProfileButton to={"/"}>Go to profile</GoToProfileButton>
    </PeopleItemWrapper>
  );
};

export default PeopleItem;
