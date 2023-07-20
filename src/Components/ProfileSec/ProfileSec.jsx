import React from 'react'
import { useState } from 'react';
import Information from './Information';
import Orders from './Orders';
import Wishlist from './Wishlist';
import "./index.css"

const ProfileSec = () => {
  const [Curr,setCurr]=useState(1);

  return (
    <div className="body row">
      <div className='navbar col'>
        <div className='navbaro '>
        <button onClick={()=>setCurr(1)}>Information</button>
        <button onClick={()=>setCurr(2)}>Orders</button>
        <button onClick={()=>setCurr(3)}>Wishlist</button>
        </div>
      </div>
      <div className='content'>
        {Curr===1?<Information/>:Curr===2?<Orders/>:<Wishlist/>}
      </div>
    </div>
  )
}

export default ProfileSec