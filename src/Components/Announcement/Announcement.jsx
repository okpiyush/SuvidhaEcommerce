import styled from "styled-components"
import "./announcement.css"
import { useEffect } from "react"
import { useState } from "react"
import axios from 'axios'
import Loading from "../Loader/Loading"
import useGetAxios from "../../Hooks/useGetAxios"
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


const Announcement= () => {
  const url = "http://localhost:5001/api/announcement/";
  const temp = useGetAxios(url);
  //checking so that temp.data is not null
  const announcements = !temp?null:temp.data;

  return (
    <Container>
      <div id="scroll-container">
        <div id="scroll-text">
        {!announcements?
        (<Loading />):
        (
          announcements.map((item, key) => (
          <div id="inner" key={key}>{item}</div>
          ))
        )}
        </div>
      </div>
    </Container>
  );
};

export default Announcement;