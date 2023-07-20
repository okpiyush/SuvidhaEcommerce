import React, { useContext } from 'react'
import styled from 'styled-components'
import ProfileSec from '../../Components/ProfileSec/ProfileSec'
import { LoginContext } from '../../Contexts/LoginContext'

const Page=styled.div` 
    width:inherit;


`
const Profile = () => {
    const {loginData}=useContext(LoginContext);

  return (
    <Page>
      {loginData===null?(<div> <div>Please Login to continue</div>
      <div> <a href="/login">click here to Login</a></div></div>):(<div><ProfileSec data={loginData}/></div>)}
    </Page>  
    
  )
}

export default Profile
