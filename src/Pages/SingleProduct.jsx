import styled from "styled-components"
import Discountsubs from "../Components/Discountsubs"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import useGetAxios from "../Hooks/useGetAxios"
import { useParams } from "react-router-dom";
import { useState } from "react";
import Loading from "../Components/Loader/Loading";
const Container = styled.div`

`
const Wrapper = styled.div`
     display:flex;
    flex-wrap:wrap;
`
const ImgContainer = styled.div`
    flex:1;
    display:flex;
    justify-content:center

`
const Image = styled.img`
    
`
const InfoContainer = styled.div`
     flex:2;
     padding:20px;
     display:flex;
     flex-direction:column;
     align-items:left;
     justify-content:center;
`
const Title = styled.h1`
     margin-bottom:20px;
     font-size:39px;
`
const Info = styled.p`
    margin-bottom:20px;
    font-size:20px;   
`
const Filter = styled.select`

    display:flex;
    width:80px;
    height:30px;
    font-size:18px;
`
const FilterOption=styled.option`
width:35px;
height:35px;
display:flex;
margin:20px 20px 20px 0px;
font-size:15px;
align-items:center;
justify-content:center;
border 1px solid lightgrey;
`
const Price = styled.span`
     font-weight:600;
     font-size:35px;
     margin:20px 0px;;
`
const More = styled.div`
    flex:1;
    display:flex;
    flex-direction :column;
`
const FilterContainer = styled.div`
    display:flex;
    justify-content:space-between;
`
const AddContainer = styled.div`

    display:flex;
    justify-content:Left;
    align-items:center;
    flex:1
    `

const Button=styled.button`
    font-size:30px;
    width:30px;
    height:30px;
    display:flex;
    border:1px solid lightgrey;
    align-items:center;
    justify-content:center;
    border-radius:50%;
    background-color:white;
    margin:10px;
    cursor:pointer;
    
`
const Qty=styled.div`
    font-size:25px;
    width:35px;
    height:30px;
    display:flex;
    border:2px solid teal;
    border-radius:15%;
    align-items:center;
    justify-content:center;
`
const AddButton=styled.button`
    Width:120px;
    height:50px;
    font-size:15px;
    border-radius:25px;
    border:3px solid teal;
    background-color:white;
    display:flex;   
    justify-content:center;
    align-items:center;
    margin:10px;
    text-spacing:3;
    cursor:pointer;
`
const ReviewContainer= styled.div`
    flex:1;
    padding:20px 10px 10px 0px;
    display:flex;
    flex-direction:column;
    align-items:left;
    justify-content:Center;
`
const RevTitle=styled.h1`
    font-size:25px;
    margin:10px 0px 0px 10px;
`
const Reviews=styled.div`
    display:flex;
    margin:10px;
    font-size:16px;
    border:3px solid teal;
    border-radius:10px;
    flex-direction:row;
    margin-right:20px;
    width:100%;
`
const Review=styled.div`
    border:2px solid lightgrey;
    border-radius:10px;
    width:240px;
    margin:10px;
    padding:10px;
    height:140px;
`
const RevBody=styled.div`
    height:70%;
`
const Reviewer=styled.div`
    height:30%;
    font-weight:600;
`
const SingleProduct = () => {
    const [num,setNum]=useState(0);
    const {id}= useParams(); //use parameter hook
    console.log(id);
    const url =`http://localhost:5001/api/products/find/${id}`;
    const data=useGetAxios(url);
    console.log(data);
    
    
    const handleIncrease=()=>{
        if(num<100) setNum(num+1);
    }
    const handleDecrease=()=>{
        if(num>0) setNum(num-1);
    }


    //add to cart functionality

    return (
    <Container>
        {
            !data?
            (
                <Loading/>
            ):
            (
            <Wrapper>
                <ImgContainer>
                    <Image src={`${data.img}`}/>
                </ImgContainer>
                <More>
                <InfoContainer>
                    <Title>{data.title}</Title>
                    <Info>{data.desc}</Info>
                    <Price>₹{data.price}</Price>
                    <FilterContainer>

                        <Filter>
                            <FilterOption disabled selected>
                                Weight
                            </FilterOption>
                            <FilterOption>
                                {data.size}
                            </FilterOption>
                        </Filter>
                    </FilterContainer>
                </InfoContainer>
                <AddContainer>
                    <Button onClick={handleDecrease}>
                    -
                    </Button>
                    <Qty>{num}</Qty>
                    <Button onClick={handleIncrease}>
                        +
                    </Button>

                    <AddButton>
                          <ShoppingBasketIcon color="66CC66"></ShoppingBasketIcon>  Buy Now
                    </AddButton>
                    <AddButton>
                        <AddShoppingCartIcon></AddShoppingCartIcon>  Add Cart
                    </AddButton>
                </AddContainer>
                <ReviewContainer>
                    <RevTitle>Reviews</RevTitle>
                    <Reviews>
                        <Review>
                            <RevBody>Amazing Company and Low Price</RevBody>
                            <Reviewer>-Kunal</Reviewer>
                        </Review>
                        <Review>
                            <RevBody>Good Product</RevBody>
                            <Reviewer>-Ravi</Reviewer>
                        </Review>
                    </Reviews>
                </ReviewContainer>
                </More>
            
        </Wrapper>
            )
        }
        <Discountsubs/>
    </Container>
  )
}

export default SingleProduct