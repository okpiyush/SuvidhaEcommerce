import React from 'react';
import styled from "styled-components";
import Products from "../Components/Products/Products";
import Discountsubs from "../Components/Discountsubs";
import { useLocation } from 'react-router-dom';

const Container = styled.div`
  background-color: #f1f3f6;
  min-height: 100vh;
`;

const FilterContainer = styled.div`
  max-width: 1248px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 24px 16px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FilterText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #212121;
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: #2874f0;
  }
`;

const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cat = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  return (
    <Container>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select defaultValue="type">
            <Option value="type" disabled>Category</Option>
            <Option>Baked Products</Option>
            <Option>Consumables</Option>
            <Option>Cooking Essentials</Option>
          </Select>
          <Select defaultValue="price">
            <Option value="price" disabled>Price Range</Option>
            <Option>₹0 - ₹500</Option>
            <Option>₹500 - ₹1000</Option>
            <Option>₹1000+</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort By:</FilterText>
          <Select defaultValue="newest">
            <Option value="newest">Newest First</Option>
            <Option>Price (High-Low)</Option>
            <Option>Price (Low-High)</Option>
            <Option>Rating (High-Low)</Option>
          </Select>
        </Filter>
      </FilterContainer>

      <Products cat={cat} search={searchQuery} />
      <div style={{ marginTop: '40px' }}>
        <Discountsubs />
      </div>
    </Container>
  );
};

export default ProductList;