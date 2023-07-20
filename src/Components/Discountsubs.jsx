
import styled from "styled-components";
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useEffect, useState } from "react";
import Loading from "./Loader/Loading";

const Wrapper = styled.div`
  background-color:#fcf5f5;
  height:50vh;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`;

const Title = styled.h1`
  font-size:70px;
  margin-bottom:10px;
`;

const Info = styled.div`
  font-size:24px;
  margin:10px;
`;

const InputContainer = styled.div`
  display:flex;
  width:40%;
  background-color:white;
  justify-content:center;
  align-items:center;
`;

const Input = styled.input`
  font-size:18px;
  flex:8;
  border:none;
`;

const Button = styled.button`
  display:flex;
  background-color:teal;
  color:white;
  border:none;
  cursor:pointer;
  justify-content:center;
  flex:1;
`;

const Discountsubs = () => {
  const [Mail, setMailstate] = useState();
    const [eLoading,setLoading]=useState(false);
    const handleChange=(e)=>{
        setMailstate(e.target.value);
        setLoading(false);
        console.log(Mail)
    }
  const makeRequest = async () => {
    console.log("I made a request");
    try {

        console.log(Mail);
        if(Mail===undefined)return
        setLoading(true);
      const response = await axios.post(`https://businessmanagementsolutionapi.onrender.com/api/mail/`,{
        "email":Mail
      },
      );
      
      console.log(response.data.reso);
      setMailstate(response.data.reso);
    }catch (err) {
      console.log(err);
    }
  };

  const handleButtonClick = () => {
    makeRequest();
  };

  return (
    <Wrapper>
      <Title>Monthly Updates</Title>
      <Info>
        Get the latest information about discounts and offers
      </Info>
      <InputContainer>
        <Input onChange={handleChange} placeholder="Your Email" />
        <Button onClick={handleButtonClick}>
          <SendIcon />
        </Button>
      </InputContainer>
      {Mail === undefined ? (
        <div>Subscribe to our services for free</div>
      ) : !eLoading ? (
        <Loading/>
      ) :( Mail === "done")? (
        <div>Already subscribed to our services</div>
      ) : (
        <div>{Mail} has been added to our services</div>
      )}
    </Wrapper>
  );
};

export default Discountsubs;
