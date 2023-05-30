import { white } from "material-ui/styles/colors"
import styled from "styled-components"
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useContext, useEffect,useState } from "react"
import { LoginContext } from "../Contexts/LoginContext"
import axios from "axios"
import Loading from "../Components/Loader/Loading"
import CartProduct from "../Components/CartProduct/CartProduct";

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
    const {loginData}=useContext(LoginContext);
    const [cart,setCart]=useState(null);
    const [productQuantity, setProductQuantity] = useState();
    const [Delivery,setDelivery]=useState(100);
    const [totalPrice,setTotalPrice]=useState(0);


    useEffect(() => {
        const makeRequest = async () => {
            if (loginData && loginData.accessToken) { // Add null check here
                const headers = {
                  token: `Bearer ${loginData.accessToken}`,
                };
          
            try {
              const response = await axios.get(`http://localhost:5001/api/cart/find/${loginData._id}`, { headers });
              console.log(response.data.products)
              setCart(response.data.products)
              console.log(cart);
            } catch (error) {
              console.error(error);
            }
          };
        }
        makeRequest();
    }, [loginData]);
    useEffect(()=>{

    },[totalPrice])

    //we will now be fetching specific products and making it an array so as to use it in for calculation of total price 
     

    // updating quantity at the fropnt and backend
    const updateQuantity = (productId, newQuantity,price) => {
        // Update the quantity of the product in the cart
        const updatedCart = cart.map((item) => {
          if (item.productId === productId && newQuantity!=0) {
            if(newQuantity>item.quantity){
                let val=totalPrice+price
                setTotalPrice(val);
            }else{
                let val=totalPrice-price;
                setTotalPrice(val);
            }
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        setCart(updatedCart);
    
        //updating the quantity in the backend

      };
      const setInitial=(price,quantity)=>{
        setTotalPrice(totalPrice+price*quantity);
      }
  return (
    <Container>
    {
        cart===null?

        (

        <Loading/>
        )
        :
        (
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
                    {cart.map((item,key)=>{
                        return <CartProduct product={item} key={key} updateQuantity={updateQuantity} updateTotal={setInitial}  />
                    })}
                </Info>
                {/*summary and coupon code */}
                <InfoTab>
                <Summary>
                    <Title>
                        Order Summary
                    </Title>
                    <SummaryType>
                        <SummaryName>Total Value</SummaryName>
                        <SummaryValue>+ ₹ {totalPrice}</SummaryValue>
                    </SummaryType>
                    <SummaryType>
                        <SummaryName>Delivery Charges</SummaryName>
                        <SummaryValue>+ ₹{Delivery}</SummaryValue>
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
        )
            }
        

    </Container>
    
  )
}

export default Cart