import React from 'react'
import { popularProducts } from '../data';
import Product from './Product'
import styled from 'styled-components';
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
  return (

    <Wrapper>
      <Title>Popular Products</Title>
      <Container>
      {popularProducts.map((item)=>(
            <Product item={item}/>
        ))}
    </Container>
    </Wrapper>
  )
}

export default Products