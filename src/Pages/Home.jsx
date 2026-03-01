import React from 'react';
import styled from 'styled-components';
import Slider from "../Components/Slider";
import Categories from "../Components/Categories";
import Products from '../Components/Products/Products';
import Discountsubs from '../Components/Discountsubs';

const Container = styled.div`
  background-color: #f1f3f6;
  min-height: 100vh;
`;

const Home = () => {
  return (
    <Container>
      <Slider />
      <Categories />
      <Products />
      <Discountsubs />
    </Container>
  );
};

export default Home;