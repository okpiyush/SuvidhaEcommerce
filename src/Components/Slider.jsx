import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loader/Loading";
import useGetAxios from "../Hooks/useGetAxios";
import { API_BASE_URL } from "../config";

const Container = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  position: relative;
  overflow: hidden;
  background-color: #f8fafc;

  @media (max-width: 768px) {
    height: 500px;
  }
`;

const Arrow = styled.div`
  width: 44px;
  height: 44px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  transition: all 0.2s;
  left: ${props => props.direction === "left" && "30px"};
  right: ${props => props.direction === "right" && "30px"};

  &:hover {
    background-color: white;
    scale: 1.1;
  }

  svg {
    font-size: 20px;
    color: var(--primary);
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(${props => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 100px;
  background-color: #${props => props.bg || 'f8fafc'};

  @media (max-width: 900px) {
    flex-direction: column-reverse;
    padding: 40px 20px;
    justify-content: center;
    text-align: center;
  }
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    height: 50%;
  }
`;

const Image = styled.img`
  height: 80%;
  object-fit: contain;

  @media (max-width: 900px) {
    height: 100%;
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 900px) {
    padding: 20px;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 64px;
  font-weight: 800;
  color: var(--primary);
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -2px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Desc = styled.p`
  margin-bottom: 40px;
  font-size: 18px;
  max-width: 500px;
  color: var(--text-muted);
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const SlideButton = styled.button`
  padding: 16px 40px;
  font-size: 16px;
  font-weight: 700;
  background-color: var(--accent);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  width: fit-content;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  box-shadow: 0 10px 20px rgba(16, 185, 129, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(16, 185, 129, 0.3);
  }
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const navigate = useNavigate();
  const slidesData = useGetAxios(`${API_BASE_URL}/slideshow/`);

  const handleClick = (direction) => {
    if (!slidesData) return;
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : slidesData.length - 1);
    } else {
      setSlideIndex(slideIndex < slidesData.length - 1 ? slideIndex + 1 : 0);
    }
  };

  if (!slidesData) return (
    <Container>
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Loading />
      </div>
    </Container>
  );

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {slidesData.map((item) => (
          <Slide bg={item.color} key={item._id}>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <SlideButton onClick={() => navigate(item.link || "/")}>SHOP NOW</SlideButton>
            </InfoContainer>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;