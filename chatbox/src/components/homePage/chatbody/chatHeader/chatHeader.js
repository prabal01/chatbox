import React from 'react';
import "./stylesheet/style.css"
export default function ChatHeader(props) {
  return (
    <div className="chatheader_main_div">
     <h4 className="chat_name">{props.RoomName}</h4>
     <button className="logout" onClick={props.LogOutHandler}>LogOut</button>
    </div>
  );
}
