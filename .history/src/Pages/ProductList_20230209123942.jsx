import styled from "styled-components"
import Announcement from "../Components/Announcement"
import Navbar from "../Components/Navbar"
import Products from "../Components/Products"
import Discountsubs from "../Components/Discountsubs"
import Footer from "../Components/Footer"
const Container=styled.div`

`
const FilterContainer=styled.div`
display: flex;
justify-content:space-between;
`

const Title=styled.h1`
margin:20px;
`
const Filter=styled.div
`
margin:20px;
`
const FilterText=styled.span`
  font-size:20px;
  font-weight:600;
`
const Select=styled.select`
font-size:15px;
border : 1px solid lightgrey;
margin:2px;
`
const Option=styled.option`
`
const ProductList = () => {
  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <FilterContainer>
          <Filter>
            <FilterText>Filter Products :</FilterText>
            <Select>
              <Option disabled selected>
                  type
              </Option>
              <Option>
                Baked Products
              </Option>
              <Option>
                Consumables
              </Option>
              <Option>
                Cooking essentials
              </Option>
            </Select>
            <Select>
              <Option disabled selected>
                  price(in Rs.)
              </Option>
              <Option>
                0 - 500
              </Option>
              <Option>
              500-1000
              </Option>
              <Option>
                1000+
              </Option>
            </Select>
            <Select>
              <Option disabled selected>
                  type
              </Option>
              <Option>
                Baked Products
              </Option>
              <Option>
                Consumables
              </Option>
              <Option>
                Cooking essentials
              </Option>
            </Select>
          </Filter>
          <Filter>
            <FilterText>Sort Products</FilterText>
            <Select>
              <Option disabled selected>
                  type
              </Option>
              <Option>
                Price (High-Low)
              </Option>
              <Option>
                Price (Low-High)
                
              </Option>
              <Option>
                Rating (High-Low)
              </Option>
              <Option>
                Rating(Low-High)
              </Option>
            </Select>
          </Filter>
        </FilterContainer>

        <Products/>
        <Discountsubs/>
        <Footer/>
    </Container>
  )
}

export default ProductList