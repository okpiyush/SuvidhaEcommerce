import React from 'react'
import styled from 'styled-components'

const ChatDiv=styled.div`
    font-weight:700;
    display:flex;
    justify-content:${props=>props.self==="false"?"flex-start":"flex-end"}
`
const Chattext=styled.div`
    width:50%;
    padding:10px 10px 10px 30px;
    border-radius:10px;
    background-color:RGB(178, 211, 119); 
    margin:20px;
`
const Text=styled.div`
`
const Time=styled.div`
    width:100%;
    text-align:right;
    font-size:12px;
`
const ChatText = (props) => {
  return (
    <div>
        <ChatDiv self={props.pos}>
            <Chattext>
                <Text>{props.body}</Text>
                <Time>{props.time}</Time>
            </Chattext>
        </ChatDiv>
    </div>
  )
}

export default ChatText