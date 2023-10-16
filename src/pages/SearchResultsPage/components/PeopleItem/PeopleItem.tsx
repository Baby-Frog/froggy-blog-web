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
  height: 90px;
  padding: 32px 16px;
  gap: 12px;
  border-bottom: 1px solid ${(props) => props.theme.colors.whiteF2};
`;

const PeopleItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const PeopleItemAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 100rem;
  overflow: hidden;
  flex-shrink: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PeopleItemMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

const PeopleItemFullName = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const PeopleItemBio = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.lightGrey};
`;

const GoToProfileButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  padding: 6px 12px;
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
        <PeopleItemMeta>
          <PeopleItemFullName>{user.fullName}</PeopleItemFullName>
          <PeopleItemBio className="line-clamp-3">{user.bio || "No bio yet"}</PeopleItemBio>
        </PeopleItemMeta>
      </PeopleItemLeft>
      <GoToProfileButton to={`/user/profile/${user.id}`}>Go to profile</GoToProfileButton>
    </PeopleItemWrapper>
  );
};

export default PeopleItem;
