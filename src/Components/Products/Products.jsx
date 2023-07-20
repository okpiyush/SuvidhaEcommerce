import {useState,React} from 'react'
import { popularProducts } from '../../data';
import Product from './Product'
import styled from 'styled-components';
import useGetAxios from "../../Hooks/useGetAxios"
import { useEffect } from 'react';
import Loading from '../Loader/Loading';
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

const Products = () => {
  const url="https://businessmanagementsolutionapi.onrender.com/api/products/?featured=true"
  const getData=useGetAxios(url);
  const products = !getData?null:getData;
  

  return (

    <Wrapper>
      <Title>Popular Products</Title>
      <Container>
      {
        !products?
        (<Loading/>)
        :
        (
          products.map(
          (item,key)=>(
            <Product item={item} post={false} key={key}/>
          )
        )
        )
      }
    </Container>
    </Wrapper>
  )
}

export default Products