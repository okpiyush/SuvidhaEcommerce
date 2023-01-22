import CategoryItem from "./CategoryItem"
import styled from "styled-components"
import {categories }from "../data.js"

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
  return (
    <Wrapper>
    <Title>Categories</Title>
    <Container>
        
        {categories.map((item)=>(
            <CategoryItem item={item}/>
        ))}
    </Container>
    </Wrapper>
  )
}

export default Categories