import React, { useContext } from 'react'
import { LoginContext } from '../../Contexts/LoginContext'

const Information = () => {
    const {loginData}=useContext(LoginContext);
  return (
    <div>
        <h1 className="title">Profile</h1>
        <div className="row">
          <div className="flex-1 text-center padding-20">
            <img className="phot" src={loginData.img} alt="Profile Image"/>
          </div>
          <div className="col justify font-size" >
            <input placeholder={loginData._id} disabled/>
            <input placeholder={loginData.username} disabled/>
            <input placeholder={loginData.email} disabled/>
          </div>
        </div>
    </div>
  )
}

export default Information