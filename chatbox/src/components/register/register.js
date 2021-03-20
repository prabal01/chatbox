import axios from "axios";
import { useState } from "react";
export default function Register(props) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [mes, setMes] = useState("email password and name should be longer than 4 char");
    const regiseterUser = () => {
        if (email.length > 4 && password.length > 4 && name.length > 4) {
            axios.post("http://localhost:5000/register", { email: email, password: password, userName: name }).then((res) => {
                setMes(res.data.mes)
            })
        }else{
            setMes("email password and name should be longer than 4 char")
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
                    <input type="email" placeholder="email" value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                    <input type="text" placeholder="name" value={name} onChange={(e) => {
                        setName(e.target.value)
                    }} />
                    <input type="password"
                        placeholder="password" value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                    <div className="button_div">
                        <button onClick={() => regiseterUser()} >SignUp</button>
                    </div>
                    <p className="new_account" onClick={props.LoginPage}>or signIn</p>
                </div>
            </div>
        </div>

    );
}