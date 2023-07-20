import styled from "styled-components"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import { useContext,useState} from "react";
import axios from "axios";
import { LoginContext } from "../../Contexts/LoginContext";
import { useNavigate } from "react-router-dom";
import { Debounce } from "../GlobalFunction/ThrottleDebounce";
const Container = styled.div`
  width:280px;
  height:300px;
  position:relative;
  padding:25px 30px;
  margin:5px;
  border-radius:10px;
  background-color:rgba(100,100,100,0.3);
  display:flex;
  align-content:center;
  justify-content:center;
` 

const Circle= styled.div`
  width:220px;
  height:220px;
  position:absolute;
  background-color:white;
  border-radius:50%;
  z-index:0;
`
const Image= styled.img`
  margin:20px;
  height:70%;
  border-radius:25%;
  z-index:2;
`

const Menu = styled.div`
  opacity:0;
  background-color:rgba(0,0,0,0.2);
  Width:100%;
  height:100%;
  display:flex;
  border-radius:10px;

  justify-content:center;
  align-items:center;
  position:absolute;
  z-index:3;
  top:0px;
  left:0px;

  &:hover{
    opacity:1;
  }

`
const Icon= styled.a`
color:black;
width:40px;
height:40px;
border-radius:50%;
background-color:white;
display:flex;
align-items:center;
margin:8px;
justify-content:center;
transistion :all 0.5s ease;
color:${(props)=>props.color?props.color:"#0000EE"};
&:hover{
    background-color:#e9f5f5;
    color:${(props)=>props.color?props.color:"blue"};
    transform:scale(1.2);
  }
`
const Product =({item,post,notpaper}) => {
  const {loginData}=useContext(LoginContext);
  const nav= useNavigate();
  const paper= async (item)=>{
    if(loginData){
      const data={
        wishlist:`${loginData.wishlist}`,
        product:`${item}`
      }
      const headers={
        token:`Bearer ${loginData.accessToken}`
      }
      const url="https://businessmanagementsolutionapi.onrender.com/api/wishlist/"
      await axios.patch(url,data,{headers}).then(()=>{
        alert("product added");
      });
      
    }else{
      alert("Login to Continue");
      nav("/login");
    }
  }


const AddToPaper=Debounce((item)=>saveInput(item));
const saveInput= async (item)=>{
  const data={
    product:{
      productId:item,
      quantity:1
    }
  }
  const headers={
    token:`Bearer ${loginData.accessToken}`
  }
  const url="https://businessmanagementsolutionapi.onrender.com/api/cart/add"
  await axios.put(url,data,{headers}).then(()=>{
    alert("product added to cart");
  });
}
  return (
    <Container>
      <Circle/>
      <Image src={item.img}/>
      <Menu>
        <Icon>
          <AddShoppingCartIcon onClick={()=>{AddToPaper(item._id)}}></AddShoppingCartIcon>
        </Icon>
        <Icon onClick={()=>{nav(`/product/${item._id}`)}}>
          <SearchIcon></SearchIcon>
        </Icon>
        {!post?
        <Icon >
          <FavoriteBorderIcon onClick={()=>{paper(item._id)}}></FavoriteBorderIcon>
        </Icon>
        :
        <Icon color="red">
          <FavoriteBorderIcon  onClick={()=>{notpaper(item._id)}}></FavoriteBorderIcon>
        </Icon>
        }
      </Menu>
    </Container>
  )
}

export default Product