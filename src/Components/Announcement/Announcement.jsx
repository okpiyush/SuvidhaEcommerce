import styled from "styled-components"
import "./announcement.css"
import { useEffect } from "react"
import { useState } from "react"
import axios from 'axios'
import Loading from "../Loader/Loading"
const Container = styled.div`
    height:30px;
    background-color:black;
    color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:500;
    font-size:16px;
`


const Announcement = () => {
  const [annos,setAnnos]=useState(null);
  useEffect(()=>{
    const makeRequest=async()=>{
      try {
        const response = await axios.get(`http://localhost:5001/api/announcement/`);
        console.log(response.data.data);
        setAnnos(response.data.data);
      }catch(err){
        console.log(err)
      }
      
    }
    if (!annos) {
      makeRequest();
    }
    },[]);
  return (
    <Container>
        {
          !annos ?(<Loading/>):(
            <div id="scroll-container">
              <div id="scroll-text">
              {annos.map((item,key)=>(
                    <div id="inner" key={key}>  {item} </div>
              ))}
        </div>
            </div>
          )
        }
    </Container>
  )
}

export default Announcement;