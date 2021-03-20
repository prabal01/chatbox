import logo from './logo.svg';
import './App.css';
import LoginPage from './components/loginComponent/login';
import Homepage from './components/homePage/homePage';
import { useState, useEffect } from "react"
const axios = require("axios")

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("")
  const [curRoom, setCurRoom] = useState("Coding Room");
  const [allChats, setAllChats] = useState([]);

  useEffect(() => {
    console.log("=======");
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      console.log("inside if")
      setIsLogin(true)

    }
  }, []);





  // send message handler

  const sendMessageHandler = (unsendMes) => {
    if (unsendMes !== "") {

      const config = {
        headers: {
          authorization: localStorage.getItem("token")
        }
      }
      const newMes = { text: unsendMes, roomName: curRoom, userName: localStorage.getItem("userName"), email: localStorage.getItem("email") }
      const newchats = [...allChats, newMes]
      setAllChats(newchats)
      axios.post("http://localhost:5000/chats", newMes, config).then((res) => {
        console.log(res)
      })
    }


  }

  const roomNameChangeHandler = (roomName) => {

    if (curRoom !== roomName) {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        }
      }
      axios.get(`http://localhost:5000/chats/?room=${roomName}`, config).then((res) => {
        if (res.data.auth) {
          setAllChats(res.data.data)
        }
      })
    }
    setCurRoom(roomName)

  }

  // handling login and logout
  //        LOGIN
  const isLoginHandler = (data) => {
    setIsLogin(true)

  }

  // LOGOUT


  const logOutHandler = () => {
    setIsLogin(false)
    localStorage.setItem("token", "")

  }

  var curDis = <Homepage CurUser={userName} ChangeRoomName={roomNameChangeHandler} RoomName={curRoom} AllChats={allChats} LogOutHandler={logOutHandler} SendMessageHandler={sendMessageHandler} />
  if (isLogin == false) {
    curDis = <LoginPage LoginHandler={isLoginHandler} />
  }


  // inital chat loading
  useEffect(() => {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      }
    }
    axios.get(`http://localhost:5000/chats?room=Coding Room`, config).then((res) => {
      console.log(res)
      if (res.data.auth === true) {
        setAllChats(res.data.data)
      }
      else {
        console.log("res" + res.data.message)
      }
    })
  }, []);







  return (
    <div className="App">
      <div className="body_inner_div">
        {curDis}
      </div>
    </div>
  );
}

export default App;
