import React, { useState } from 'react';
import ChatBody from './chatbody/chatBody';
import Sidebar from './sidebar/sidebar';
import axios from "axios";
import "./stylesheet/style.css"
export default function Homepage(props) {
    
    return (
        <div className="homepage_main_div">

            <Sidebar ChangeRoomName={props.ChangeRoomName} />
            <ChatBody RoomName={props.RoomName} CurUser={props.CurUser} LogOutHandler={props.LogOutHandler} AllChats={props.AllChats} SendMessageHandler={props.SendMessageHandler}/>
        </div>
    );
}
