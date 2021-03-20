import React from 'react';
import "./stylesheet/style.css"
import envelop from "./media/envelope-solid.svg"
export default function Header() {
    return (
        <div className="header_main_div">
            <div className="logo_div">
                <img className="logo" src={envelop} alt="" />
            </div>
            <div className="header_logo_text_div">
                <h3 className="header_logo_text">ChatBox</h3>
            </div>
        </div>
    );
}
