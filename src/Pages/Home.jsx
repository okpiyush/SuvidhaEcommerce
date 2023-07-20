import React from 'react'
import Slider from "../Components/Slider"
import Categories from "../Components/Categories"
import Products from '../Components/Products/Products'
import Discountsubs from '../Components/Discountsubs'
const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <Categories />
      <Products />
      <Discountsubs/>
    </div>
  )
}

export default Home