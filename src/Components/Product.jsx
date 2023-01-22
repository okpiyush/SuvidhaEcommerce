import styled from "styled-components"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
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
  jsutify-content:center;
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
  height:75%;
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
const Icon= styled.div`
width:40px;
height:40px;
border-radius:50%;
background-color:white;
display:flex;
align-items:center;
margin:8px;
justify-content:center;
transistion :all 0.5s ease;

&:hover{
    background-color:#e9f5f5;
    transform:scale(1.2);
  }
`
const Product = ({item}) => {
  return (
    <Container>
      <Circle/>
      <Image src={item.img}/>
      <Menu>
        <Icon>
          <AddShoppingCartIcon></AddShoppingCartIcon>
        </Icon>
        <Icon>
          <SearchIcon></SearchIcon>
        </Icon>
        <Icon>
          <FavoriteBorderIcon></FavoriteBorderIcon>
        </Icon>

        
      </Menu>
    </Container>
  )
}

export default Product