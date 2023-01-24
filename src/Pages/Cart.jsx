import { white } from "material-ui/styles/colors"
import styled from "styled-components"
import Announcement from "../Components/Announcement"
import CartProduct from "../Components/CartProduct"
import Footer from "../Components/Footer"
import Navbar from "../Components/Navbar"
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const Container= styled.div``
const Wrapper= styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    padding:0px 20px;
`

const Title=styled.h1`
    font-weight:300;
    text-align:center;    
`

const Top=styled.div`
    width:100%;
    display: flex;
    align-items:center;
    justify-content:space-between;
    margin-bottom:10px;
`
const TopButton=styled.button`
    padding:20px;
    margin:0px 5px;
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:600;
    background-color:${props=>props.type==="filled"?"black":"white"};
    color:${props=>props.type==="filled"?"white":"black"};
    border:2px solid ${props=>props.type==="filled"?"grey":"black"};
    cursor:pointer;
`
const Bottom=styled.div`
    display:flex;
    flex-wrap:wrap;
    width:100%;
    justify-content:space-between;
`



const  Info=styled.div`
    flex:3;
`
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

const TopTexts=styled.div`
    display:flex;
`
const TopText=styled.div`
    text-decoration: Underline;
    margin:0px 20px;
    cursor:pointer;

`
const Summary=styled.div`
flex:1;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
margin:10px 10px;  
height:350px;  
border:2px solid grey;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
border-radius:10px;
padding:10px;
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
const CouponCode=styled.div`
margin:20px;
display:flex;
height:30px;
align-items:center;
padding:1px;
justify-content:space-around;
background-color:white;
border:1px solid gray;
border-radius:4px;
`
const CoupInput=styled.input`
flex:2;
width:200px;
font-size:20px;
border:none
`
const InfoTab=styled.div`
flex:1;
`
const CheckButton=styled.button`
    flex:1;
    height:inherit;
    background-color:white;
    padding:5px;
    border:3px solid gray;
    cursor:pointer;
`
const SummaryItem=styled.button`
    margin:auto;
    font-size:20px;
    background-color:#228B22;
    border:2px solid black;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2), 0 4px 8px 0 rgba(0, 0, 0, 0.19);
    padding:3px;
    color:white;
    display:flex;
    align-items:center;
    cursor:pointer;
`
const SummaryName=styled.div`
    flex:1;
`
const SummaryValue=styled.div`
flex:1;
text-align:right;

`
const SummaryType=styled.div`
    flex:1;   
    font-size:20px;
    display:flex;
    align-items:center;
    justify:space-between;
    width:100%;
    margin:10px;
    border-top:${props=>props.top==="yes"?"1px solid black":"none"};
`







const Cart = () => {
  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Wrapper>
            <Title> Your Bag</Title>
            <Top>
                <TopButton>CONTINUE SHOPPING</TopButton>
                <TopTexts>
                    <TopText>Shopping Bag(2)</TopText>
                    <TopText>Your Buy Later(0)</TopText>

                </TopTexts>
                <TopButton type="filled">CHECKOUT NOW <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon></TopButton>
            </Top>
            <Bottom>
                {/*the products itself*/}
                <Info>
                    <Product>
                        <ProductDetail>
                            <Image src="https://www.modernfoods.co.in/wp-content/uploads/2021/02/cremeburst-berrypunch-product-category-newfinal.png"/>
                            <Details>
                                <ProductName>
                                    <b>Product :</b> Modern Cremeburst Cupcake
                                </ProductName>
                                <ProductId>
                                    <b>ID :</b>
                                    <span>123456789</span>
                                </ProductId>
                                <ProductWeight>
                                    <b>Weight </b>: 50gm
                                </ProductWeight>
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                                <TypeContainer>
                                    <Button>
                                    -
                                    </Button>
                                    <Qty max="99" placeholder='1' active />
                                    <Button>
                                        +
                                    </Button>

                                </TypeContainer>
                                <Price>₹ 800</Price>
                        </PriceDetail>
                    </Product>
                    <Product>
                        <ProductDetail>
                            <Image src="https://www.modernfoods.co.in/wp-content/uploads/2021/02/cremeburst-berrypunch-product-category-newfinal.png"/>
                            <Details>
                                <ProductName>
                                <b>Product :</b> Modern Cremeburst
                                </ProductName>
                                <ProductId>
                                    <b>ID :</b>
                                    <span>123456789</span>
                                </ProductId>
                                <ProductWeight>
                                    <b>Weight </b>: 50gm
                                </ProductWeight>
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                                <TypeContainer>
                                    <Button>
                                    -
                                    </Button>
                                    <Qty max="99" placeholder='1' active />
                                    <Button>
                                        +
                                    </Button>

                                </TypeContainer>
                                <Price>₹ 800</Price>
                        </PriceDetail>
                    </Product>
                </Info>
                {/*summary and coupon code */}
                <InfoTab>
                <Summary>
                    <Title>
                        Order Summary
                    </Title>
                    <SummaryType>
                        <SummaryName>Total Value</SummaryName>
                        <SummaryValue>+ ₹ 1600</SummaryValue>
                    </SummaryType>
                    <SummaryType>
                        <SummaryName>Delivery Charges</SummaryName>
                        <SummaryValue>+ ₹ 300</SummaryValue>
                    </SummaryType>
                    <SummaryType>
                        <SummaryName>Coupon Discount</SummaryName>
                        <SummaryValue>-₹300</SummaryValue>
                    </SummaryType>
                    <SummaryType top="yes">
                        <SummaryName>Final Value</SummaryName>
                        <SummaryValue>₹ 1600</SummaryValue>
                    </SummaryType>
                    <SummaryType>
                        <SummaryItem>CHECKOUT NOW <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon></SummaryItem>
                    </SummaryType>
                </Summary>
                
                <CouponCode>
                    <CoupInput placeholder="Coupon code"></CoupInput>
                    <CheckButton>Check</CheckButton>
                </CouponCode>
                </InfoTab>
            </Bottom>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Cart