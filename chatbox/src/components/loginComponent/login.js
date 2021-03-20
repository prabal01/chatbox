import React, { useState } from 'react';
import "./stylesheet/style.css"
import axios from "axios";


export default function LoginPage(props) {
    const [curEmail, setCurEmail] = useState("");
    const [curPassword, setCurPassword] = useState("");
    const [mes, setMes] = useState("");
    const emailChecker = (email) => {
        let atTheRate = false
        let dotAfterAtTheRate = false
        for (let i = 0; i < email.length; i++) {

            if (email[i] === "@") {
                atTheRate = true
            }
            if (email[i] === "." && atTheRate === true) {
                dotAfterAtTheRate = true
            }

        }
        return atTheRate && dotAfterAtTheRate

    }
    const loginHandler = () => {
        let emailCheck = emailChecker(curEmail)
        if (curPassword.length != 0 && curEmail.length != 0 && emailCheck) {
            // if everything filled is correct
            const data = {
                password: curPassword,
                email: curEmail,
            }
            axios.post("http://localhost:5000/login", data).then((res)=>{
                if (res.data.auth===true){
                    console.log(data)
                    props.LoginHandler(res.data)
                    localStorage.setItem("token", "Bearer "+res.data.token)
                    localStorage.setItem("email", res.data.email)
                    localStorage.setItem("userName",res.data.userName)
                }
                else{
                    setMes(res.data.mes)
                }
            })


        }
        else if (!emailCheck) {
            alert("enter a valid email ")
        }
        else {
            alert("email or password can not be empty")
        }



    }


    return (
        <div className="login_page_outer_div">
            <div className="login_page_inner_div">
                <div className="input_fields" >
                    <div className="logo_chatbox" >
                        <h1>ChatBox</h1>
                        <p className="mes">{mes}</p>
                    </div>
                    <input type="email" value={curEmail} onChange={(e) => {
                        setCurEmail(e.target.value)
                    }} placeholder="email" />
                    <input type="password" value={curPassword} onChange={(e) => {
                        setCurPassword(e.target.value)
                    }} placeholder="password" />
                    <div className="button_div">
                        <button onClick={loginHandler} >Login</button>
                        <p className="new_account" onClick={props.RegisterPage}>create a new account</p>
                    </div>
                </div>
            </div>
        </div>

    );
}
