import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  flex: 1;
  min-width: 280px;
  height: 350px;
  margin: 15px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;

  ${Container}:hover & {
    transform: scale(1.1);
  }
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(2px);
  transition: background 0.3s;

  ${Container}:hover & {
    background: rgba(15, 23, 42, 0.2);
    backdrop-filter: blur(0px);
  }
`;

const Title = styled.h2`
  color: white;
  font-size: 28px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
`;

const Button = styled.button`
  background-color: var(--accent);
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  text-transform: uppercase;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
  transition: all 0.2s;

  &:hover {
    transform: scale(1.05);
    background-color: white;
    color: var(--accent);
  }
`;

const CategoryItem = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate(`/products/${item.cat}`)}>
      <Image src={item.img} />
      <Info>
        <Title>{item.cat}</Title>
        <Button>Shop Now</Button>
      </Info>
    </Container>
  );
};

export default CategoryItem;