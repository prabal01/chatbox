import React from 'react';
import "./stylesheet/style.css"


export default function Chat(props) {
    
    const setSenderName=(chat)=>{
        if( localStorage.getItem("email")===chat.email) return "You"
        return chat.userName
    }
    let chats = props.AllChats.map((chat, index) => (


        <div className="chat_message" key={index}>
            <p className="sender_name">{setSenderName(chat)}</p>
            <p className="text">{chat.text}</p>
        </div>

    ))

    return (
        <div className="chat_main_div">

            {chats}

        </div>
    );
}
