import {React, useEffect} from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { LoginContext } from '../Contexts/LoginContext'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
    background:url("https://png.pngtree.com/background/20220722/original/pngtree-photo-of-shelf-commodity-supermarket-picture-image_1711939.jpg");
    background-size: cover;
    height:100vh;
    display:flex;
    align-items:center;justify-content:center;
`
const Wrapper = styled.div`
    background-color:rgba(256,256,256,0.9);
    padding:10px;
    width:500px;
    display:flex;
    border-radius:20px;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    box-shadow: inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255),
    0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
`
const Title = styled.h1`



`
const Form = styled.form`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify:content:center;
`
const Input = styled.input`
    width:300px;
    height:25px;
    border:1px solid grey;
    border-radius:5px;
    padding:5px;
    margin-top:10px;
    font-size:20px;
`
const Takefile = styled.input`
    width:300px;
    height:45px;
    margin:10px;
    font-size:20px;
`
const Agreement=styled.span`
    width:auto;
    margin:10px;
`
const Button = styled.button`
    font-size:18px;
    width:150px;
    height:40px;
    padding:5px;
    background-color:white;
    border:2px solid grey;
    border-radius:20px;
    margin:10px;
    cursor:pointer;
    &:hover{
        background-color:lightgrey
    }
`
const Link=styled.a`
text-decoration:none;
color:blue;
cursor:pointer;
`
const Register = () => {
    const {handleLogin}=useContext(LoginContext);
    const [username,setUsername]=useState();
    const [Password,setPassword]=useState();
    const [Email,setEmail]=useState();
    const [ConfirmPass,setConfirmPass]=useState();
    const [info,setInfoState]=useState("empty")
    const navigate=useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        //validate email!
        const valid=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!Email.match(valid)){
            alert("Please enter a valid email address");
            return;
        }
        if(username===""||Password==="") return;
        const registeruser={
            "username":username,
            "email":Email,
            "password":Password,
        }

        try{
            const response = await axios.post("http://localhost:5001/api/auth/register",registeruser);
            //Once you are register you have to login 
            const userData = {
                "username" :response.data.username,
                "password" :Password
            };
            const response1 = await axios.post('http://localhost:5001/api/auth/login', userData);
            handleLogin(response1.data);
            navigate("/home", { replace: true });
        }catch(err){
            console.log(err);
        }
    }   
    const handleUsernameChange=(e)=>{
        setUsername(e.target.value);
    }
    
    const handleEmailChange=(e)=>{
        setEmail(e.target.value);
    }
    
    const handlePasswordChange=(e)=>{
        setPassword(e.target.value);
    }

    const handleConfirmPassChange=(e)=>{
        setConfirmPass(e.target.value);
    }



  return (
    <Container>
        <Wrapper>
            <Title>
                Create Account
            </Title>
            <Form onSubmit={handleSubmit}>
                <Input onChange={handleUsernameChange} placeholder="Username"/>
                <Input onChange={handleEmailChange} placeholder="E-mail"/>
                <Input type="password" onChange={handlePasswordChange} placeholder="Password"/>
                <Input type="password" onChange={handleConfirmPassChange} placeholder="Confirm Password"/>
                <Takefile type="file"></Takefile>
                <Agreement>
                    By clicking on Create account you automatically agree to the following terms and conditions mentioned in the Privacy Policy. <Link>Terms and Conditions</Link>
                </Agreement>
                <Button type="submit">Create Account</Button>
                <Agreement>Have an Account ? <Link href="/login">Sign in</Link></Agreement>
            </Form>
        </Wrapper>
    </Container>    
  )
}

export default Register