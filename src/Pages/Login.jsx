import styled from 'styled-components';
import { useState, useContext } from 'react';
import { LoginContext } from '../Contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg);
`;

const Wrapper = styled.div`
  background-color: white;
  padding: 48px;
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 8px;
  color: var(--primary);
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
`;

const Input = styled.input`
  padding: 14px 16px;
  margin-bottom: 20px;
  border: 2px solid #f1f5f9;
  border-radius: 12px;
  font-size: 15px;
  outline: none;
  transition: all 0.2s;
  background-color: #f8fafc;

  &:focus {
    border-color: var(--accent);
    background-color: white;
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
  }
`;

const Button = styled.button`
  background-color: var(--accent);
  color: white;
  border: none;
  padding: 16px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 12px;
  box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 25px -5px rgba(16, 185, 129, 0.3);
  }
`;

const LinkText = styled.div`
  margin-top: 24px;
  font-size: 14px;
  text-align: center;
  color: var(--text-muted);
  font-weight: 500;
`;

const GlobalLink = styled.span`
  color: var(--accent);
  cursor: pointer;
  font-weight: 700;
  margin-left: 6px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const { handleLogin } = useContext(LoginContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please enter Username and Password");
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
      handleLogin(response.data);
      navigate("/");
    } catch (err) {
      alert(err.response?.data || "Login failed");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </Form>
        <LinkText>
          Forgot your Password?
          <GlobalLink onClick={() => navigate("/forgotpassword")}>Reset here</GlobalLink>
        </LinkText>
        <LinkText>
          New to Suvidha?
          <GlobalLink onClick={() => navigate("/register")}>Create an account</GlobalLink>
        </LinkText>
      </Wrapper>
    </Container>
  );
};

export default Login;