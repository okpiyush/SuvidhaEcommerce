import styled from "styled-components"
const Container= styled.div`
    flex=1;
    width:280px;
    height:45vh;
    margin:15px;
    border-radius:10px;
    padding:20px;
    border:2px solid lightgrey;
    position:relative;
    background-color:rgba(0,0,0,0.1);
    
    &:hover{
     background-color:rgba(0,0,0,0.2)
        
    }
`
const Image=styled.img`
    height:100%;
    width:100%;
    object-fit:cover;
    background-color:'#badfe7';
`
const Info=styled.div`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100px;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;

`
const Title=styled.h1`
    margin:3px;
`
const Button=styled.button`
    background-color: White;
    font-size:20px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
    cursor:pointer;
 `
const CategoryItem = ({item}) => {
  return (
    <Container >
        <Image  src={item.img}/>
        <Info>
            <Title>{item.cat}</Title>
            <Button>Shop Now</Button>
        </Info>
    </Container>
  )
}

export default CategoryItem