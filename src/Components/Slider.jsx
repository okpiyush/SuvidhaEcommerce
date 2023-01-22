import styled from "styled-components"
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { sliderItems } from "../data";
import { useState } from "react";
const Container= styled.div`
width:100%;
height:100vh;
display:flex;
overflow:hidden;
position:relative;

`
const Arrow= styled.div`
width:50px;
height:50px;
background-color:white;
align-items:center;
display:flex;
border-radius:50%;
justify-content:center;
position : absolute;
top:0;
bottom:0;
margin:auto;
left:${ props=>props.direction==="left" && "10px" };
right:${ props=>props.direction==="right" && "10px" };
cursor : pointer;
opacity:.5;
`
const Slide= styled.div`
    width:100vw;
    height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    background-color:${props=>props.bgcolor};
`
const Wrapper= styled.div`
height:100%;
display:flex;
align-items:center;
transform : translateX(${props=>props.slideIndex * -100}vw);
`
const Imgcontainer= styled.div`
    height:100%;
    flex:1

`
const Image= styled.img`
    height:80%;
`
const Infocontainer=styled.div`
    flex:1;
    justify-content:center;
    align-items:center;
    padding:50px;
    
`
const Title=styled.h1`
    font-size:70px;
`
const Description=styled.p`
    margin:50px 0px;
    font-size:20px;
    letter-spacing:3px;
`
const Button=styled.button`
    padding:10px;
    font-size:30px;
    background-color:transparent;
    border:2px solid black;
    cursor:pointer;
`

const Slider = () => {
    const [slideIndex,setSlideIndex]=useState(0);
    const handleClick=(direction)=>{
            if(direction==="left"){
                setSlideIndex(slideIndex>0?slideIndex-1:3)
            }else if(direction==="right"){
                setSlideIndex(slideIndex<3?slideIndex+1:0)
            }
    }
    return (
    <Container>
        
        <Arrow direction="left" onClick={()=>handleClick("left")}>
            <ArrowLeftOutlinedIcon></ArrowLeftOutlinedIcon>
        </Arrow>

        <Wrapper slideIndex={slideIndex}>
            {sliderItems.map((props)=>(
                <Slide bgcolor={props.color}>
                    <Imgcontainer>
                        <Image src={props.img}/>
                    </Imgcontainer>
                    <Infocontainer>
                        <Title>{props.title}</Title>
                        <Description> {props.desc}</Description>
                        <Button> Shop Now</Button>
                    </Infocontainer>
                </Slide>
            ))}
            
        </Wrapper>
        <Arrow direction="right" onClick={()=>handleClick("right")}>
            <ArrowRightOutlinedIcon></ArrowRightOutlinedIcon>
        </Arrow>
    </Container>
  )
}

export default Slider