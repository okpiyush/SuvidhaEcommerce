import React,{useContext, useState} from 'react'
import styled from 'styled-components'
import ReactSearchBox from 'react-search-box'
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import { LoginContext } from '../Contexts/LoginContext';
const Container = styled.div`
    height:50px;
    // background-color: Grey;
    display : flex;
    justify-content : space-between;
`
const Wrapper = styled.div`padding : 10px 15px;`

const Left = styled.div`
    display:flex;
    flex:1;
    align-items:center;
    justify-content:flex-start;
`;
const Center = styled.div`
flex:1;
display:flex;
align-items: center;
justify-content: center;
`;
const Right = styled.div`
flex:1;
display:flex;
align-items: center;
justify-content : flex-end;

`;
const Language = styled.div`
    font-size:20px;
`
const MenuItem= styled.a`
cursor :pointer;
font-size:16px;
padding:2px;
margin-right:10px;
color:black;
text-decoration:none;
`
const SearchContainer = styled.div`
    // border :1px solid lightgray;
    height: fit-content;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:0px;
    margin-left : 10px;
`

const Logo = styled.h1`
    font-weight: bold;
`

const Navbar = () => {
    const {loginData,handleLogout}=useContext(LoginContext);
    const [showLogout, setShowLogout] = useState(false);
    const toggleLogout = () => {
      setShowLogout(!showLogout);
    };
const A=styled.a`
color:black;
text-decoration:none;
`
  return (
        <Wrapper>
        <Container>
            <Left>
                <Language>EN</Language>
                <SearchContainer>
                   <ReactSearchBox placeholder="Search" inputHeight="30px"></ReactSearchBox>
                   <SearchOutlinedIcon></SearchOutlinedIcon>
                </SearchContainer>
                
            </Left>
            <Center>
                <Logo><A href="/home">Suvidha</A></Logo>
            </Center>
            <Right>
           
            {
                !loginData?(
                    <div>
                    <MenuItem href="/register">Register</MenuItem>
                    <MenuItem href="/login">Sign in</MenuItem>
                    </div>
                ):(
                    <div>
                    
                    {!showLogout && <MenuItem onClick={toggleLogout}>{loginData.username}</MenuItem>}
                    {showLogout &&  <MenuItem onClick={toggleLogout}><A href="/profile">Profile</A></MenuItem> }
                    {showLogout&&<MenuItem onClick={handleLogout}>Logout</MenuItem>}
                    <MenuItem>
            <Badge style={{cursor:'pointer'}} color="primary">
                <A href="/chat"><HeadsetMicIcon></HeadsetMicIcon></A>
            </Badge>
            </MenuItem>
            <MenuItem>
            <Badge style={{cursor:'pointer'}} color="primary">
                <A href="/cart"><ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon></A>
            </Badge>
            </MenuItem>
                    </div>
                )
            }
            
            </Right>
        </Container>
    </Wrapper>
  )
}

export default Navbar