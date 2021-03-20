const mongoose = require("mongoose")
// connection string = mongodb+srv://prabalsaxena:prabal12345@cluster0.mwd2w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://prabalsaxena:prabal12345@cluster0.mwd2w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology: true},(err)=>{
    if (err){
        console.log(err)
    }else{
        console.log("connected to mongo")
    }
})
const userSchema= new mongoose.Schema({
    userName: {type:String, required: true, },
    email:{type:String, required:true ,unique:true},
    password:{type:String, required: true}

})
const chatSchema= new mongoose.Schema({
    text: {type:String, required: true,},
    email:{type:String, require:true },
    roomName:{type: String, required: true},
    userName:{type:String, required:true }
})


const ChatData= mongoose.model("chat", chatSchema)
const UserData = mongoose.model("user" , userSchema);
module.exports = {UserData,ChatData}

