import React from 'react';
import "./stylesheet/style.css";
import avtar from "./media/user-circle-solid.svg"
export default function ChatRooms(props) {

    const rooms = ["Coding Room", "Developer Room", "Yoga Room"]
    const chatListcomponent = rooms.map((roomName, index) => (<div onClick={() => props.ChangeRoomName(rooms[index])} key={index} className="chat_room_div">
        <h5 className="chat_room">{roomName}</h5>
    </div>))

    return (
        <div className="chatrooms_main_div">

            {chatListcomponent}

        </div>
    );
}
