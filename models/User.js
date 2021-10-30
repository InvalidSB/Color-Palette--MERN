const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    Anonymous:{
        type:Boolean,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
    },
    
})

const UserModel = mongoose.model("UserModel",userSchema)
module.exports = UserModel