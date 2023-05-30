import styled from 'styled-components'
import { useState } from 'react'
import { useContext } from 'react'
import { LoginContext } from '../Contexts/LoginContext'
import { useNavigate } from 'react-router-dom'
import  axios  from 'axios'
import { useEffect } from 'react'
import { useDebugValue } from 'react'
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
const Login = () => {
    const { handleLogin,loginData } = useContext(LoginContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();


    const handleSubmit = async (e) => {
      e.preventDefault();
      if(username===""||password===""){
        alert("Please enter Username and Password");
        return;
      }
      const userData = {
        "username" :username,
        "password" :password
      };

      try{
        const response = await axios.post('http://localhost:5001/api/auth/login', userData);
        // Handle the response as needed
            console.log(response.data);
    
        handleLogin(response.data);
        navigate("/home", { replace: true });
        checkUser();
      }catch(err){
        console.log(err);
      }
    };

  const handleUserChange=(e)=>{
    setUsername(e.target.value);
  }
  const handlePasswordChange=(e)=>{
    setPassword(e.target.value);
  }
  const checkUser=()=>{
    if(loginData){
      navigate("/home",{replace:true});
    }
  }
  
  return (
    <Container>
        <Wrapper>
            <Title>
                Sign in
            </Title>
            <Form>
                <Input onChange={handleUserChange} placeholder="Username"/>
                
                <Input type="password"onChange={handlePasswordChange}placeholder="Password"/>
                <Button onClick={handleSubmit} >Sign in </Button>
                <Agreement>Forgot your Password? <Link href="/forgotpassword"> Forgot Password </Link></Agreement>
                <Agreement>Don't have an account ? <Link href="/register">Create account</Link></Agreement>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login