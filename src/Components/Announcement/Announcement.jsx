import styled from "styled-components";
import "./announcement.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Loading from "../Loader/Loading";
import useGetAxios from "../../Hooks/useGetAxios";
import { API_BASE_URL } from "../../config";
const Container = styled.div`
    height: 34px;
    background-color: var(--accent);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 13px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    box-shadow: inset 0 -1px 0 rgba(0,0,0,0.1);
`


const Announcement = () => {
  const url = `${API_BASE_URL}/announcement/`;
  const temp = useGetAxios(url);
  //checking so that temp.data is not null
  const announcements = !temp ? null : temp.data;

  return (
    <Container>
      <div id="scroll-container">
        <div id="scroll-text">
          {!announcements ?
            (<Loading />) :
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