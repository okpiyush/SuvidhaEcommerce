import React from 'react';
import Product from './Product';
import styled from 'styled-components';
import useGetAxios from "../../Hooks/useGetAxios";
import Loading from '../Loader/Loading';
import { API_BASE_URL } from "../../config";

const Wrapper = styled.div`
  max-width: 1248px;
  margin: 40px auto;
  padding: 0 16px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #212121;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -8px;
`;

const Products = ({ cat, search }) => {
  let url = `${API_BASE_URL}/products/`;
  let title = "Featured Products";

  if (cat) {
    url = `${API_BASE_URL}/products/?category=${cat}`;
    title = `Products in ${cat}`;
  } else if (search) {
    url = `${API_BASE_URL}/products?q=${search}`;
    title = `Search Results for "${search}"`;
  } else {
    url = `${API_BASE_URL}/products/?featured=true`;
    title = "Featured Products";
  }

  const products = useGetAxios(url);

  return (
    <Wrapper>
      <Header>
        <Title>{title}</Title>
      </Header>
      <Container>
        {!products ? (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '50px' }}>
            <Loading />
          </div>
        ) : products.length === 0 ? (
          <div style={{ width: '100%', padding: '50px', textAlign: 'center', color: '#878787' }}>
            No products found matches your criteria.
          </div>
        ) : (
          products.map((item) => (
            <Product item={item} key={item._id} />
          ))
        )}
      </Container>
    </Wrapper>
  );
};

export default Products;