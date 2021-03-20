require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");
const { ChatData, UserData } = require("./models/chatSchema")
const jwt = require("jsonwebtoken");
var cors = require('cors')
const app = express();
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

function authenticate(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) return res.json({ auth: false, message: "you are not logged itn" })
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.json("wrong email/password")
        req.user = user
        next()
    })

}


app.get("/chats", authenticate, (req, res) => {
    console.log("req.query.room=="+ req.query.room );
    ChatData.find({roomName:req.query.room}, (err,data) => {
        res.send({ auth: true, data: data })
    })

})


app.post("/chats", authenticate, (req, res) => {
    console.log(req.body);
    const data = {
        text: req.body.text,
        email: req.body.email,
        roomName: req.body.roomName,
        userName:req.body.userName
    }

    ChatData.insertMany(data).then((data) => {
        console.log("inserted = " + data)
        res.sendStatus(200)
    })


})



app.post("/register", (req, res) => {
    const newUser = new UserData({ userName: req.body.userName, email: req.body.email, password: req.body.password })
    newUser.save((err) => {
        if (!err) {
            console.log({res:true,mes:"yeahh!! you can login now"})
            res.send({res:true,mes:"yeahh!! you can login now"})
        } else {
            console.log({res:false, mes: "use a different email"})
            res.send({res:false, mes: "use a different email"})
        }
    })
    

})

app.post("/login", (req, res) => {
    UserData.find({ email: req.body.email }, (err, doc) => {
        console.log("data is here" + doc)
        console.log(doc);
        if (err) {
            console.log(err)
        }
        // authentication
        else if (doc.length!==0) {
            
            if (doc[0].password == req.body.password) {
                const email = req.body.email
                const user = { email: email, name: req.body.userName }
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
                res.json({ auth: true, token: accessToken, email: email, userName: doc[0].userName })

            } else {
                res.send({auth:false ,mes:"wrong email/password"})
            }
        }
        else{
            res.send({auth:false ,mes:"wrong email/password"})
        }

    }
    )
})
app.listen(5000, () => {
    console.log("server is running")
})