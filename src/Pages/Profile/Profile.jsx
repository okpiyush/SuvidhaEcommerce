import React, { useContext } from 'react'
import styled from 'styled-components'
import ProfileSec from '../../Components/ProfileSec/ProfileSec'
import { LoginContext } from '../../Contexts/LoginContext'
import { useNavigate } from 'react-router-dom'

const Page=styled.div` 
    width:inherit;


`
const Profile = () => {

    const {loginData}=useContext(LoginContext);
    const navigate=useNavigate();
  return (
    <Page>
      {loginData===null?(<div> <div>Please Login to continue</div>
      <div> <div onClick={()=>{navigate("/login")}}>click here to Login</div></div></div>):(<div><ProfileSec data={loginData}/></div>)}
    </Page>  
    
  )
}

export default Profile
