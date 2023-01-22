import styled from "styled-components"
import Navbar from "../Components/Navbar"
import Announcement from "../Components/Announcement"
import Discountsubs from "../Components/Discountsubs"
import Footer from "../Components/Footer"
const Container = styled.div`

`
const Wrapper = styled.div`
     display:flex;

`
const ImgContainer = styled.div`
    flex:1    
`
const Image = styled.img`
     
`
const InfoContainer = styled.div`
     flex:1;
     display:flex;
     flex-direction:column;
     align-items:center;
     justify-content:center;
`
const Title = styled.h1`
     margin-bottom:20px;
     font-size:39px;
`
const Info = styled.p`
    margin-bottom:20px;
    font-size:15px;
     
`
const FilterOption = styled.div`
`
const Price = styled.span`
     
`

const SingleProduct = () => {
  return (
    <Container>
        <Navbar/>
        <Announcement/>


        <Wrapper>
            <ImgContainer>
                <Image src="https://www.aashirvaad.com/img/nsfo/Atta.png"></Image>
            </ImgContainer>
            <InfoContainer>
                <Title>Aashirwad Atta</Title>
                <Info>AASHIRVAAD Whole Wheat Atta is made from the grains which are heavy on the palm, golden amber in colour and hard in bite. It is carefully ground using modern 'chakki - grinding' process which ensures that AASHIRVAAD Atta contains 0% Maida and is 100% Sampoorna Atta.</Info>
                <Price>Rs. 178 per Unit</Price>
            </InfoContainer>
            <FilterOption>
                
            </FilterOption>
        </Wrapper>
        
        
        <Discountsubs/>
        <Footer/>
    </Container>
  )
}

export default SingleProduct