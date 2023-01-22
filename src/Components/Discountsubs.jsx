import styled from "styled-components"
import SendIcon from '@mui/icons-material/Send';

const Wrapper= styled.div`
    background-color:#fcf5f5;
    height:50vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

`
const Title= styled.h1`
font-size:70px;
    margin-bottom:10px;
`
const Info= styled.div`
    font-size:24px;
    margin:10px;
    `
const InputContainer= styled.div`
    display:flex;
    width:40%;
    background-color:white;
    justify-content:center;
    align-items:center;
`
const Input= styled.input`
    // padding:2px;
    font-size:18px;
    flex:8;
    border:none;

`
const Button= styled.button`
    display:flex;
    background-color:teal;
    color:white;
    border:none;
    cursor:pointer;
    justify-content:center;
    flex:1;
`
const Discountsubs = () => {
  return (
    <Wrapper>
        <Title>Newsletter</Title>
        <Info>
            Get latest information about the discounts and  offers
        </Info>
        <InputContainer>
            <Input placeholder="Your Email">
            </Input>
            <Button>
                <SendIcon/>
            </Button>
        </InputContainer>
    </Wrapper>
  )
}

export default Discountsubs