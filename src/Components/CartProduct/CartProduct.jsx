import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import Loading from '../Loader/Loading'
const Product = styled.div`
padding:5px;
display:flex;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
margin-bottom:10px; 
border-radius:10px;

 `
const ProductDetail = styled.div`
   display:flex;
   flex:2;
   `
const Image = styled.img`
height:200px;
width:200px;
flex:1;
`
const Details = styled.div`
flex:2;
margin-left:40px;
font-size:20px;
display:flex; 
flex-direction:column;
justify-content:space-around;
padding:10px;
`
const ProductName = styled.span`
`
const ProductId = styled.span``
const ProductWeight = styled.span``
const PriceDetail=styled.div`
flex:1;
display:flex;
flex-direction:column;
align-items:center;
justify-content:space-around;

`

const TypeContainer=styled.div`
display:flex;

align-items:center;
justify-content:center;
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
const Qty=styled.input`
    font-size:25px;
    width:35px;
    height:30px;
    display:flex;
    border:2px solid teal;
    border-radius:15%;
    align-items:center;
    justify-content:center;
`
const Price= styled.span`
font-size :30px;
font-weight:600;
`
const CartProduct = (props) => {
const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);
const [Delivery,setDelivery]=useState(100);
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const productInfo = await axios.get(`https://businessmanagementsolutionapi.onrender.com/api/products/find/${props.product.productId}`);
        setProduct(productInfo.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.log(error);
      }
    };
    
    makeRequest();
  }, [props.product]);
  
  const handleQuantityChange = (newQuantity) => {
    props.updateQuantity(props.product.productId, newQuantity,product.price);
  };
  if (loading) {
    return <Loading/>;
  }
    return (
    <Product>
        <ProductDetail>
            <Image src={product.img}/>
            <Details>
                <ProductName>
                    <b>Product :</b> {product.title}
                </ProductName>
                <ProductId>
                    <b>ID :</b>
                    <span>{product._id}</span>
                </ProductId>
                <ProductWeight>
                    <b>Weight </b>: {product.size}
                </ProductWeight>
            </Details>
        </ProductDetail>
        <PriceDetail>
                <TypeContainer>
                    <Button onClick={() => handleQuantityChange(props.product.quantity - 1)}>
                    -
                    </Button>
                    <Qty max="99" min="1" placeholder={props.product.quantity} disabled/>
                    <Button onClick={() => handleQuantityChange(props.product.quantity + 1)}>
                        +
                    </Button>
                </TypeContainer>
                <Price><b>Price :</b>₹{product.price*props.product.quantity}</Price>
        </PriceDetail>
    </Product>
  )
}

export default CartProduct