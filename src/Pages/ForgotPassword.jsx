import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

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

color:blue;
text-decoration:none;
cursor:pointer;
`
const ForgotPassword = () => {
    const [stat,setStat]=useState(1);
    const [email,setEmail]=useState();
    const nav= useNavigate();
    const okay=async (e)=>{
        e.preventDefault();
        const regex="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";

        if(e.target.email.value.match(regex)){
            const payload={
                "email":e.target.email.value
            }
            const url="http://localhost:5001/api/auth/forgotpassword"
            try{
                const res=await axios.post(url,payload);
                setEmail(e.target.email.value);
                console.log(email);
                setStat(2);
            }catch(err){
                if(err.response.status===409){
                    setStat(2);
                }else{
                    alert(err.response.data);
                }
            }
            e.target.email.value="";
        }else{
            console.log("Not Valid Email");
        }
        
    }
    const notOkay=async (e)=>{
        e.preventDefault();
        const payload={
            email:email,
            otp:e.target.otp.value
        }
        const url="http://localhost:5001/api/auth/setotp"
        try{
            const res=await axios.post(url,payload);
            alert("Check your email for the new password")
            nav("/login");
        }catch(err){
            if(err.response.status===429 || err.response.status===498){
                alert(`${err.response.data} \n Try again later`);
                window.location.reload();
            }else{
                alert(err.response.data);
                e.target.otp.value="";
            }
            

        }
        return false;
    }
    
    return (
    <Container>
        <Wrapper>
            {stat===1?
            <Form onSubmit={okay}>
            <Title>
                Forgot Password
            </Title>
                <Input name="email" placeholder="Email"/>
                <Button>Search Acoount</Button>
            </Form>
            :
            <Form onSubmit={notOkay}>
            <Title>
                OTP Submission
            </Title>
                <Input name="otp" placeholder="OTP"/>
                <Button>Submit OTP</Button>
            </Form>
            }
            
        </Wrapper>
    </Container>
  )
}

export default ForgotPassword