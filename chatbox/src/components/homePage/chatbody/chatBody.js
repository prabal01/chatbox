import React from 'react';
import ChatHeader from './chatHeader/chatHeader';
import Chat from './chats/chat';
import InputComponent from './inputComponent/inputComponent';
import "./stylesheet/style.css"
import { useState, useEffect } from "react"
import axios from 'axios';
import ChatRooms from '../sidebar/chatRooms/chatRooms';
export default function ChatBody(props) {

  // states
  const [unsendMes, setUnsendMes] = useState("")
  const [loginMes, setLoginMes] = useState("")



  // handlers
  const typedMessageChangeHandler = (e) => {
    setUnsendMes(e.target.value)
    console.log(unsendMes)
  }


  // view
  return (
    <div className="chat_body_main_div">
      <ChatHeader RoomName={props.RoomName} CurUser={props.CurUser} LogOutHandler={props.LogOutHandler}/>
      <Chat AllChats={props.AllChats} />
      <InputComponent TypedMessageChangeHandler={typedMessageChangeHandler} SendMessage={props.SendMessageHandler} TypedMes={unsendMes}/>
    </div>
  );
}
