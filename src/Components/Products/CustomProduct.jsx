import {useState,React, useContext} from 'react'
import { popularProducts } from '../../data';
import Product from './Product'
import styled from 'styled-components';
import useGetAxios from "../../Hooks/useGetAxios"
import { useEffect } from 'react';
import Loading from '../Loader/Loading';
import { LoginContext } from '../../Contexts/LoginContext';
import axios from 'axios';
const Container = styled.div`
  display:flex;
  padding:30px 30px 0px 30px;
  margin:20px;
  flex-wrap:wrap;
  justify-content:space-around;
`
const Title = styled.h1`
`
const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-top:30px;
    justify-content:space-around;
    
`
const CustomProduct = (props) => {
  const { loginData } = useContext(LoginContext);
  const [products, setProducts] = useState(props.products);

  const notpaper = async (item) => {
    const data = {
      wishlist: `${loginData.wishlist}`,
      product: `${item}`,
    };
    const headers = {
      token: `Bearer ${loginData.accessToken}`,
    };
    const url = 'https://businessmanagementsolutionapi.onrender.com/api/wishlist/delete';
    const response = await axios.patch(url, data, { headers });
    console.log(response);

    // Remove the product from the state
    setProducts((products) =>
      products.filter((product) => product._id !== item)
    );
  };

  return (
    <Wrapper>
      <Title>{props.title}</Title>
      <Container>
        {!products ? (
          <Loading />
        ) : products.length===0?<div>Wishlist Empty</div> : (
          products.map((item, key) => (
            <Product
              item={item}
              post={true}
              notpaper={notpaper}
              key={key}
            />
          ))
        )}
      </Container>
    </Wrapper>
  );
};

export default CustomProduct;