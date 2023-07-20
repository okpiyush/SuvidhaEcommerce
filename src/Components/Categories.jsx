import CategoryItem from "./CategoryItem"
import styled from "styled-components"
import {useState} from "react";
import { categories } from "../data";
const Container = styled.div`
    display :flex;
    padding:20px;
    justify-content:space-around;
    align-items:center;
    flex-wrap:wrap;
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
const Categories = () => {
  const [category,setCategories]=useState(categories);

  return (
    <Wrapper>
    <Title>Categories</Title>
    <Container>
        
        {category.map((item)=>(
            <CategoryItem item={item}/>
        ))}
    </Container>
    </Wrapper>
  )
}

export default Categories