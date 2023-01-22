import React from 'react'
import Navbar from "../Components/Navbar"
import Announcement from "../Components/Announcement"
import Slider from "../Components/Slider"
import Categories from "../Components/Categories"
import Products from '../Components/Products'
import Discountsubs from '../Components/Discountsubs'
import Footer from '../Components/Footer'
const Home = () => {
  return (
    <div>
      <Announcement/>
      <Navbar/>
      <Slider></Slider>
      <Categories />
      <Products />
      <Discountsubs/>
      <Footer/>
    </div>
  )
}

export default Home