import styled from "styled-components"
import Navbar from "../Components/Navbar"
import Announcement from "../Components/Announcement"
import Discountsubs from "../Components/Discountsubs"
import Footer from "../Components/Footer"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
const Container = styled.div`

`
const Wrapper = styled.div`
     display:flex;
    flex-wrap:wrap;
`
const ImgContainer = styled.div`
    flex:1;
    padding:50px;    
`
const Image = styled.img`
     
`
const InfoContainer = styled.div`
     flex:1;
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
    font-size:15px;   
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
  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Wrapper>
            <ImgContainer>
                <Image src="https://www.aashirvaad.com/img/nsfo/Atta.png"></Image>
            </ImgContainer>
            <More>
            <InfoContainer>
                <Title>Aashirwad Atta</Title>
                <Info>AASHIRVAAD Whole Wheat Atta is made from the grains which are heavy on the palm, golden amber in colour and hard in bite. It is carefully ground using modern 'chakki - grinding' process which ensures that AASHIRVAAD Atta contains 0% Maida and is 100% Sampoorna Atta.</Info>
                <Price>Rs. 210</Price>
                <FilterContainer>
                
                    <Filter>
                        <FilterOption disabled selected>
                            Weight
                        </FilterOption>
                        <FilterOption>
                            1Kg
                        </FilterOption>
                        <FilterOption>
                            5Kg
                        </FilterOption>
                        <FilterOption>
                            10Kg
                        </FilterOption>
                        <FilterOption>
                            20Kg
                        </FilterOption>
                    </Filter>
                </FilterContainer>
            </InfoContainer>
            <AddContainer>
                <Button>
                -
                </Button>
                <Qty max="99" placeholder='1' active />
                <Button>
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
                        <RevBody>Отличная компания для покупки товаров для повседневного использования</RevBody>
                        <Reviewer>-Vladimir Putin</Reviewer>
                    </Review>
                    <Review>
                        <RevBody>The value of this newly budding company is still better than some countries</RevBody>
                        <Reviewer>-Desh ka beta</Reviewer>
                    </Review>
                </Reviews>
            </ReviewContainer>
            </More>
            
        </Wrapper>
        
        
        <Discountsubs/>
        <Footer/>
    </Container>
  )
}

export default SingleProduct