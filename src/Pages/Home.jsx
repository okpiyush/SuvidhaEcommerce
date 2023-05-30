import React from 'react'
import Navbar from "../Components/Navbar"
import Announcement from "../Components/Announcement/Announcement"
import Slider from "../Components/Slider"
import Categories from "../Components/Categories"
import Products from '../Components/Products'
import Discountsubs from '../Components/Discountsubs'
import Footer from '../Components/Footer'
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