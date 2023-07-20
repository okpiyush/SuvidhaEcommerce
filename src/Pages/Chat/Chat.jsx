import React, { useContext } from 'react';
import styled from "styled-components";
import io from 'socket.io-client';
import { useEffect,useState } from 'react';

import { LoginContext } from '../../Contexts/LoginContext';
import ChatText from './ChatText';
const Div=styled.div`
    display:flex;
    width:100%;
    height:100vh;
    overflow:hidden;
`
const Users=styled.ul`
    height:inherit;
    list-style-type:none;
    background-color:rgb(107, 60, 192);
`
const UserLi=styled.li`
    width:90%;
    height:40px;
    text-align:center;
    font-size:20px;
    margin-bottom:10px;
    background-color:rgb(119, 71, 207);
    &:hover{
        background-color:rgb(158, 71, 207);
    }
`
const ChatWindow=styled.div`
    flex:1;
    height:100%;

    background-color:rgb(119, 71, 207);
    width:800px;

`
const Form=styled.form`
    width:100%;
    display:flex;
    
`
const Input=styled.input`
    flex:10;
    height:40px;
    margin:5px;
    border: none;
    border-radius:8px;
    padding-left:10px;
`
const Button=styled.button`
    flex:1;
    height:40px;
    margin:5px;
    border: none;
    border-radius:8px;
    padding-left:10px;
`
const ChatSize= styled.div`
    height:88%;
    
    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background-color: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #888;
        ${'' /* border-radius: 5px; */}
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #555;
    }
    overflow-y:auto;
`
const ChatTitle=styled.div`
    width:100%;
    posistion:absolute;
    z-index:2;
    color:black;
    background-color:RGB(250, 250, 250);
    text-align:center;
    font-size:25px;
    font-weight:500;
`


///socket io connection

const Chat = () => {
  const {loginData}=useContext(LoginContext);
  const [chatStart,setChatStart]=useState(false);
  const [socket,setSocket]=useState(null);
  const [currentMessage,setCurrentMessage]=useState("");

     useEffect(() => {
      // if chat start is mounted
          const newSocket = io.connect("http://localhost:3002");
          setSocket(newSocket);
          //when the state mounts it gets executed
          return () => {
            newSocket.disconnect();
          };
      }, [loginData]);
      
      const sendMessage = async (e) => {
        e.preventDefault();
        if (currentMessage !== "") {
          const mdata = {
            room: "admin",
            author: loginData.username,
            message: currentMessage,
            time: `${new Date().getHours()}:${(new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes()}`,
          };
      
          if (socket) {
            await socket.emit("send_message", mdata);
            console.log("Message sent");
          }
        } else {
          alert("Write something in the text box to send");
          return;
        }
      };
      
    useEffect(() => {
        console.log("emit checked");
      
        const handleReceiveMessage = (data) => {
          console.log("emit worked");
          console.log(data.message);
        };
      
        if (socket) {
          socket.on("receive_message", handleReceiveMessage);
        }
      
        return () => {
          if (socket) {
            socket.off("receive_message", handleReceiveMessage);
          }
        };
      }, [socket]);
      
    //when it unmounts then it disconnect
    const joinRoom=()=>{
      if(loginData!==null){
        socket.emit("join_room","admin");
        return true;
      }else{
        alert("Please Login First");
        return false;
      }
    }
    const Start =()=>{
      var st=joinRoom();
      if(st)setChatStart(!chatStart);
      
    }
  return (
    <Div>
        <ChatWindow>
            <ChatTitle>
                Chat with Admin
            </ChatTitle>
            {
              !chatStart?(<ChatSize cc="true"><Button onClick={()=>Start()}>Start Chat</Button></ChatSize>):(
                <ChatSize>
                    <ChatText body="Hey Suvidha" time="10:41" pos="false"/>
                    
                </ChatSize>
                ) 
            }
            <Form>
              <Input placeholder='Type your message here' onChange={(event)=>setCurrentMessage(event.target.value)}/>
              <Button onClick={sendMessage}>Send</Button>
            </Form>
        </ChatWindow>
    </Div>
  )
}

export default Chat;