import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Information from './Information';
import Orders from './Orders';
import Wishlist from './Wishlist';
import { LoginContext } from '../../Contexts/LoginContext';
import { AccountCircle, ShoppingBag, Favorite, Person } from '@mui/icons-material';

const Container = styled.div`
  max-width: 1248px;
  margin: 20px auto;
  display: flex;
  gap: 16px;
  padding: 0 16px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const UserCard = styled.div`
  background: white;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
  border-radius: 2px;
`;

const UserIcon = styled.div`
  width: 50px;
  height: 50px;
  background: #2874f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const WelcomeText = styled.div`
  display: flex;
  flex-direction: column;
  span:first-child { font-size: 12px; color: #878787; }
  span:last-child { font-size: 16px; font-weight: 600; }
`;

const MenuCard = styled.div`
  background: white;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
  border-radius: 2px;
  overflow: hidden;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  color: ${props => props.active ? '#2874f0' : '#878787'};
  background: ${props => props.active ? '#f5faff' : 'white'};
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: #f5faff;
    color: #2874f0;
  }

  svg {
    color: #2874f0;
  }
`;

const Content = styled.div`
  flex: 3;
  background: white;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
  border-radius: 2px;
  padding: 24px;
  min-height: 400px;
`;

const ProfileSec = () => {
  const { loginData } = useContext(LoginContext);
  const [curr, setCurr] = useState(1);

  return (
    <Container>
      <Sidebar>
        <UserCard>
          <UserIcon><AccountCircle sx={{ fontSize: 32 }} /></UserIcon>
          <WelcomeText>
            <span>Hello,</span>
            <span>{loginData?.username || 'User'}</span>
          </WelcomeText>
        </UserCard>

        <MenuCard>
          <MenuItem active={curr === 2} onClick={() => setCurr(2)}>
            <ShoppingBag />
            MY ORDERS
          </MenuItem>
          <MenuItem active={curr === 1} onClick={() => setCurr(1)}>
            <Person />
            ACCOUNT SETTINGS
          </MenuItem>
          <MenuItem active={curr === 3} onClick={() => setCurr(3)}>
            <Favorite />
            MY WISHLIST
          </MenuItem>
        </MenuCard>
      </Sidebar>

      <Content>
        {curr === 1 ? <Information /> : curr === 2 ? <Orders /> : <Wishlist />}
      </Content>
    </Container>
  );
};

export default ProfileSec;