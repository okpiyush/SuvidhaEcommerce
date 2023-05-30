import styled from "styled-components"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from "@mui/icons-material/Twitter";
import MapIcon from '@mui/icons-material/Map';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
const Wrapper=styled.div`
    display:flex;
    flex-wrap:wrap;
`
const Left=styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    padding:20px;
`
const Right=styled.div`
flex:1;
padding:20px;
display:flex;
flex-direction:column;
align-items:left;
justify-content:center;

`
const Center=styled.div`
flex:1;
padding:20px;

display:flex;
flex-direction:column;
align-items:center;
justify-content:center;

`

const Logo=styled.h1`
`
const Info=styled.p``
const Socials=styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    padding:5px;
    background-color:transparent;
`
const Button=styled.button`
    height:40px;
    width:40px;
    margin-bottom:10px;
    margin-right:10px;
    border:none;
    color:white;
    border-radius:10px;
    background-color:#${props=>props.color};
    cursor:pointer;
`
const Title=styled.h3`
margin:0;
margin-bottom:20px;
`
const List=styled.ul`
    margin:0;
    padding:0;
    list-style:none;
    display:flex;
    flex-wrap:wrap;
    padding-left:40px;
`
const ListItem=styled.li`
width:180px;

padding:5px;

`
const ContactItem=styled.div`
margin:5px;

padding:10px;
display:flex;
align-items:center;
`
const Payment=styled.img`
flex:1;
margin:0;
width:400px;
height:50px;

`
const A=styled.a`
text-decoration:none;
`
const Footer = () => {
  return (
    <Wrapper>
        <Left>
            <Logo>
                Suvidha
            </Logo>
            <Info>
                Lorem ipsum dolor sit amet, consectetur50 lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lore
            </Info>
            <Socials>
                <Button color="3b5998">
                    <FacebookIcon></FacebookIcon>
                </Button>
                <Button color="e95950">
                    <InstagramIcon></InstagramIcon>
                </Button>
                <Button color="55acee">
                    <TwitterIcon ></TwitterIcon>
                </Button>
                <Button color="007bb5">
                    <LinkedInIcon></LinkedInIcon>
                </Button>
                
            </Socials>
        </Left>
        <Center>
            <Title>
                Useful Links
            </Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Personal Care</ListItem>
                <ListItem>Fruits & Vegetables</ListItem>
                <ListItem>Snacks & Branded Food</ListItem>
                <ListItem>Home Care</ListItem>
                <ListItem>Dairy & Bakery</ListItem>
                <ListItem>Order Tracking</ListItem>
                <ListItem>Favourites</ListItem>
                <ListItem>Terms and Conditions</ListItem>

            </List>
        </Center>
        <Right>
            <Title>
                Contact us
            </Title>
            <ContactItem>
            <MapIcon></MapIcon><A href="https://goo.gl/maps/BhR8gT7zRdjhXLRg8" target="_blank">XYZ road, Deoghar, Jharkhand, Pin :814112 </A>
            </ContactItem>
            <ContactItem>
                <PhoneIcon/>+91 XXX-XXX-4577
            </ContactItem>
            <ContactItem>
                <EmailIcon/>contactSuvidha@gmail.com
            </ContactItem>
            <Payment src="https://user-images.githubusercontent.com/52581/44514079-4219bb80-a713-11e8-83a4-88f26bd07e2a.png"/>
        </Right>
    </Wrapper>
  )
}

export default Footer