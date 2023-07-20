import React,{useContext, useState} from 'react'
import { LoginContext } from '../../Contexts/LoginContext';
import axios from 'axios';
import { useEffect } from 'react';
import CustomProduct from '../Products/CustomProduct';
import Loading from '../Loader/Loading';

const Wishlist = () => {
  const [wishlist,setWishList]=useState(null);
  const [loading,setLoading]=useState(true);
  const{loginData}=useContext(LoginContext);
  const url="http://localhost:5001/api/wishlist/get";
  const headers={
    "token":`Bearer ${loginData.accessToken}`
  }
  const wishdata={
    "wishlist":loginData.wishlist
  }
  console.log(wishdata);
  
  useEffect(()=>{
    const setWishes= async()=>{
      const getwishes= axios.post(url,wishdata,{headers}).then(response=>{
        setWishList(response.data);
        setLoading(false);
      }) 
      console.log(wishlist);
    }
    setWishes();
  },[loginData.wishlist]);
  return (
    <div className='col text-center'>
    
        <h1 className="title">My Wishlist</h1>
        <div>
        {/* if Wishlist is null */}
          {loading ?
          <Loading/>
          :
          !wishlist || wishlist==="None"?
          <div>
            Wishlist Empty
          </div>
          :
          <CustomProduct products={wishlist}/>

          }
          
        </div>
    </div>
  )
}

export default Wishlist