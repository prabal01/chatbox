import React from 'react';
import ChatRooms from './chatRooms/chatRooms';
import Header from "./header/header"
import "./stylesheet/style.css";

export default function Sidebar(props) {
  return (
    <div className="sidebar_main_div">
      <Header />
      <ChatRooms ChangeRoomName={props.ChangeRoomName}/>
    </div>
  );
}
